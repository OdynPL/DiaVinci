/**
 * Export service for saving diagrams as images and files
 */
class ExportService {
    constructor(canvas, canvasRenderer, errorHandler = null) {
        this.canvas = canvas;
        this.canvasRenderer = canvasRenderer;
        this.errorHandler = errorHandler;
        Logger.info('ExportService initialized');
    }

    /**
     * Export canvas as image
     */
    async exportAsImage(project, whiteBackground = true) {
        const startTime = performance.now();
        Logger.userAction('Export Image Started', { whiteBackground });
        
        try {
            if (!project) {
                throw new Error('No project provided for export');
            }

            const exportCanvas = document.createElement('canvas');
            exportCanvas.width = this.canvas.width;
            exportCanvas.height = this.canvas.height;
            const exportCtx = exportCanvas.getContext('2d');
            
            if (!exportCtx) {
                throw new Error('Failed to get 2D context for export canvas');
            }
            
            Logger.debug('Export canvas created', { 
                width: exportCanvas.width, 
                height: exportCanvas.height 
            });

            // Render project to export canvas (with background option)
            this.canvasRenderer.exportToCanvas(exportCtx, project, whiteBackground);

            let success = false;
            
            // Try modern File System Access API first
            if ('showSaveFilePicker' in window) {
                try {
                    await this.saveWithFilePicker(exportCanvas);
                    success = true;
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        Logger.warn('File System Access API failed, falling back', err);
                        success = this.fallbackSave(exportCanvas);
                    } else {
                        Logger.info('Export cancelled by user');
                        success = false;
                    }
                }
            } else {
                Logger.info('Using fallback save method');
                success = this.fallbackSave(exportCanvas);
            }
            
            Logger.performance('Export Image', startTime);
            Logger.info('Image export completed', { success, whiteBackground });
            return success;
            
        } catch (error) {
            Logger.error('Failed to export image', error, { whiteBackground });
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to export image');
            }
            return false;
        }
    }

    /**
     * Save using modern File System Access API
     */
    async saveWithFilePicker(canvas) {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: `diagram-${timestamp}.png`,
            types: [{
                description: 'PNG images',
                accept: { 'image/png': ['.png'] }
            }]
        });
        
        const blob = await this.canvasToBlob(canvas);
        const writable = await fileHandle.createWritable();
        await writable.write(blob);
        await writable.close();
    }

    /**
     * Fallback save method for older browsers
     */
    fallbackSave(canvas) {
        try {
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            let filename = prompt('Enter filename (without extension):', `diagram-${timestamp}`);
            
            if (filename === null) return false;
            
            if (filename.trim() === '') {
                filename = `diagram-${timestamp}`;
            }
            
            // Clean filename
            filename = filename.replace(/[<>:"/\\|?*]/g, '-');
            
            if (!filename.toLowerCase().endsWith('.png')) {
                filename += '.png';
            }
            
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            return true;
        } catch (error) {
            console.error('Error in fallback export:', error);
            
            // Last resort
            const fallbackFilename = `diagram-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
            const link = document.createElement('a');
            link.download = fallbackFilename;
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            return true;
        }
    }

    /**
     * Convert canvas to blob
     */
    canvasToBlob(canvas) {
        return new Promise(resolve => {
            canvas.toBlob(resolve, 'image/png');
        });
    }
}
