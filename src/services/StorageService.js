/**
 * Storage service for project persistence
 */
class StorageService {
    constructor(errorHandler = null) {
        this.errorHandler = errorHandler;
        this.storageKey = 'diaVinciProjects';
        this.autoSaveKey = 'diaVinciAutoSave';
        Logger.info(t('storageServiceInitialized'));
    }

    /**
     * Save a project
     */
    saveProject(project) {
        return this.errorHandler ? 
            this.errorHandler.executeSync(
                () => this._saveProject(project),
                t('failedToSaveProject')
            ) : this._saveProject(project);
    }

    _saveProject(project) {
        try {
            const savedProjects = this.getAllProjects();
            savedProjects[project.name] = project.toJSON();
            localStorage.setItem(this.storageKey, JSON.stringify(savedProjects));
            Logger.info(t('projectSavedSuccessfully'), { projectName: project.name });
            return true;
        } catch (error) {
            Logger.error(t('errorSavingProject'), error, { projectName: project.name });
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
                throw new Error(`${t('projectNotFound')} '${projectName}'`);
            }
            return Project.fromJSON(projectData);
        } catch (error) {
            Logger.error(t('errorLoadingProject'), error, { projectName });
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
            Logger.error(t('errorGettingProjects'), error);
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
            Logger.error(t('errorDeletingProject'), error, { projectName });
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
     * Generate unique project name with New_ prefix
     */
    generateUniqueProjectName() {
        const now = new Date();
        const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19); // Format: YYYY-MM-DDTHH-MM-SS
        let baseName = `New_${timestamp}`;
        let projectName = baseName;
        let counter = 1;

        // Ensure uniqueness by adding counter if needed
        while (this.projectExists(projectName)) {
            projectName = `${baseName}_${counter}`;
            counter++;
        }

        return projectName;
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
            Logger.error(t('errorClearingProjects'), error);
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
            Logger.debug(t('autoSaveCompleted'), { 
                projectName: project.name || t('untitled'),
                nodeCount: project.nodes.length,
                transitionCount: project.transitions.length,
                textCount: project.texts.length,
                timestamp: autoSaveData.timestamp
            });
            return true;
        } catch (error) {
            Logger.error(t('autoSaveFailed'), error);
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
            Logger.warn(t('failedToLoadAutoSave'), error);
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
            Logger.error(t('errorExportingProject'), error, { projectName: project.name });
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
                        throw new Error(t('invalidProjectFileFormat'));
                    }
                    
                    const project = Project.fromJSON(projectData);
                    resolve(project);
                } catch (error) {
                    reject(error);
                }
            };
            
            reader.onerror = () => {
                reject(new Error(t('errorReadingFile')));
            };
            
            reader.readAsText(file);
        });
    }
}
