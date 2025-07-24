/**
 * Storage service for project persistence
 */
class StorageService {
    constructor(errorHandler = null) {
        this.errorHandler = errorHandler;
        this.storageKey = 'diaVinciProjects';
        this.autoSaveKey = 'diaVinciAutoSave';
        Logger.info('StorageService initialized');
    }

    /**
     * Save a project
     */
    saveProject(project) {
        return this.errorHandler ? 
            this.errorHandler.executeSync(
                () => this._saveProject(project),
                'Failed to save project'
            ) : this._saveProject(project);
    }

    _saveProject(project) {
        try {
            const savedProjects = this.getAllProjects();
            savedProjects[project.name] = project.toJSON();
            localStorage.setItem(this.storageKey, JSON.stringify(savedProjects));
            Logger.info('Project saved successfully', { projectName: project.name });
            return true;
        } catch (error) {
            Logger.error('Error saving project', error, { projectName: project.name });
            return false;
        }
    }

    /**
     * Load a project by name
     */
    loadProject(projectName) {
        try {
            const savedProjects = this.getAllProjects();
            const projectData = savedProjects[projectName];
            if (!projectData) {
                throw new Error(`Project '${projectName}' not found`);
            }
            return Project.fromJSON(projectData);
        } catch (error) {
            console.error('Error loading project:', error);
            return null;
        }
    }

    /**
     * Get all saved projects
     */
    getAllProjects() {
        try {
            const data = localStorage.getItem(this.storageKey) || '{}';
            return JSON.parse(data);
        } catch (error) {
            console.error('Error getting projects:', error);
            return {};
        }
    }

    /**
     * Delete a project
     */
    deleteProject(projectName) {
        try {
            const savedProjects = this.getAllProjects();
            delete savedProjects[projectName];
            localStorage.setItem(this.storageKey, JSON.stringify(savedProjects));
            return true;
        } catch (error) {
            console.error('Error deleting project:', error);
            return false;
        }
    }

    /**
     * Check if project exists
     */
    projectExists(projectName) {
        const savedProjects = this.getAllProjects();
        return savedProjects.hasOwnProperty(projectName);
    }

    /**
     * Clear all projects
     */
    clearAllProjects() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.autoSaveKey);
            return true;
        } catch (error) {
            console.error('Error clearing projects:', error);
            return false;
        }
    }

    /**
     * Auto-save project state
     */
    autoSave(project) {
        try {
            const autoSaveData = {
                ...project.toJSON(),
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(this.autoSaveKey, JSON.stringify(autoSaveData));
            Logger.debug('Auto-save completed', { 
                projectName: project.name || 'Untitled',
                nodeCount: project.nodes.length,
                transitionCount: project.transitions.length,
                textCount: project.texts.length,
                timestamp: autoSaveData.timestamp
            });
            return true;
        } catch (error) {
            Logger.error('Auto-save failed', error);
            return false;
        }
    }

    /**
     * Load auto-saved state
     */
    loadAutoSave() {
        try {
            const autoSaveData = localStorage.getItem(this.autoSaveKey);
            if (!autoSaveData) return null;

            const data = JSON.parse(autoSaveData);
            
            // Only load if there's actual content
            if (data.nodes && data.nodes.length > 0 || 
                data.transitions && data.transitions.length > 0 || 
                data.texts && data.texts.length > 0) {
                return Project.fromJSON(data);
            }
            return null;
        } catch (error) {
            console.warn('Failed to load auto-save:', error);
            return null;
        }
    }

    /**
     * Export project to file
     */
    exportProject(project) {
        try {
            const projectData = project.toJSON();
            const jsonString = JSON.stringify(projectData, null, 2);
            
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `${projectData.name}.lcp`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('Error exporting project:', error);
            return false;
        }
    }

    /**
     * Import project from file
     */
    async importProjectFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const projectData = JSON.parse(e.target.result);
                    
                    if (!projectData.nodes || !projectData.transitions) {
                        throw new Error('Invalid project file format');
                    }
                    
                    const project = Project.fromJSON(projectData);
                    resolve(project);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                reject(new Error('Error reading file'));
            };
            
            reader.readAsText(file);
        });
    }
}
