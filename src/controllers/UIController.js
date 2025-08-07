/**
 * UI Controller managing user interface interactions
 */
class UIController {
    constructor(eventBus, diagramController, storageService, notificationService, errorHandler = null) {
        this.eventBus = eventBus;
        this.diagramController = diagramController;
        this.storageService = storageService;
        this.notificationService = notificationService;
        this.errorHandler = errorHandler;
        
        this.currentProject = null;
        this.currentPage = 1;
        this.projectsPerPage = 7;
        this.initialLoad = true;
        
        this.initializeUI();
        this.setupEventListeners();
    }

    /**
     * Initialize UI components
     */
    initializeUI() {
        this.setupDragAndDrop();
        this.updateRecentProjectsList();
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Clear all projects button
        const clearAllProjectsBtn = document.getElementById('clear-all-projects-btn');
        if (clearAllProjectsBtn) {
            clearAllProjectsBtn.addEventListener('click', () => this.clearAllProjects());
        }

        // Project search
        const projectSearchInput = document.getElementById('project-search');
        if (projectSearchInput) {
            projectSearchInput.addEventListener('input', () => {
                this.currentPage = 1;
                this.updateRecentProjectsList();
            });
        }

        // Bottom navigation buttons
        this.setupBottomNavigation();

        // Event bus listeners
        this.eventBus.on('selection.changed', (data) => this.updateRemoveButton(data));
        this.eventBus.on('project.loaded', (project) => this.handleProjectLoaded(project));
        this.eventBus.on('project.created', () => this.handleProjectCreated());
        this.eventBus.on('project.cleared', () => this.handleProjectCleared());
    }

    /**
     * Setup bottom navigation event listeners
     */
    setupBottomNavigation() {
        // New Project
        const newProjectBtn = document.getElementById('new-project-btn');
        if (newProjectBtn) {
            newProjectBtn.addEventListener('click', () => this.newProject());
        }

        // Save Project
        const saveProjectBtn = document.getElementById('save-project-btn');
        if (saveProjectBtn) {
            saveProjectBtn.addEventListener('click', () => this.showSaveDialog());
        }

        // Load Project
        const loadProjectBtn = document.getElementById('load-project-btn');
        if (loadProjectBtn) {
            loadProjectBtn.addEventListener('click', () => this.showLoadDialog());
        }

        // Export Image
        const exportImageBtn = document.getElementById('export-image-btn');
        if (exportImageBtn) {
            exportImageBtn.addEventListener('click', () => this.showImageExportDialog());
        }

        // Export File
        const exportFileBtn = document.getElementById('export-file-btn');
        if (exportFileBtn) {
            exportFileBtn.addEventListener('click', () => this.exportFile());
        }

        // Import File
        const importFileBtn = document.getElementById('import-file-btn');
        if (importFileBtn) {
            importFileBtn.addEventListener('click', () => this.importFile());
        }

        // Remove Button
        const removeBtn = document.getElementById('remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => this.removeSelectedElement());
        }

        // Clear All Button
        const clearAllBtn = document.getElementById('clear-all-btn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.clearProject());
        }

        // Grid Toggle Button
        const gridToggleBtn = document.getElementById('grid-toggle-btn');
        if (gridToggleBtn) {
            gridToggleBtn.addEventListener('click', () => this.toggleGrid());
        }

        // Rulers Toggle Button
        const rulersToggleBtn = document.getElementById('rulers-toggle-btn');
        if (rulersToggleBtn) {
            rulersToggleBtn.addEventListener('click', () => this.toggleRulers());
        }
    }

    /**
     * Setup drag and drop for components
     */
    setupDragAndDrop() {
        const components = [
            {id: 'node', type: 'node'},
            {id: 'start', type: 'start'},
            {id: 'stop', type: 'stop'},
            {id: 'if', type: 'if'},
            {id: 'datamodel', type: 'datamodel'},
            {id: 'text', type: 'text'},
            {id: 'arrow-right', type: 'transition', transitionType: 'right'},
            {id: 'arrow-both', type: 'transition', transitionType: 'both'},
            {id: 'line', type: 'transition', transitionType: 'line'}
        ];

        components.forEach(component => {
            const element = document.getElementById(component.id);
            if (element) {
                element.addEventListener('dragstart', () => {
                    this.eventBus.emit('drag.started', {
                        type: component.type,
                        transitionType: component.transitionType
                    });
                });
            }
        });
    }

    /**
     * Update remove button visibility
     */
    updateRemoveButton(selectionData) {
        const removeBtn = document.getElementById('remove-btn');
        if (removeBtn) {
            if (selectionData.element) {
                removeBtn.classList.remove('hide');
                removeBtn.classList.add('show');
            } else {
                removeBtn.classList.remove('show');
                removeBtn.classList.add('hide');
            }
        }
    }

    /**
     * Remove selected element
     */
    removeSelectedElement() {
        const selection = this.diagramController.getCurrentSelection();
        if (selection.element) {
            this.diagramController.deleteSelectedElement();
        }
    }

    /**
     * Show export options
     */
    showExportOptions() {
        DialogFactory.createExportMenu(
            () => this.exportProject(),
            () => this.exportImage(true),
            () => this.exportImage(false)
        );
    }

    /**
     * Export project
     */
    exportProject() {
        const success = this.diagramController.exportAsFile();
        if (success) {
            const projectName = this.currentProject || 'Exported_Project';
            this.notificationService.success(`Project "${projectName}" exported successfully!`);
        } else {
            this.notificationService.error('Error exporting project. Please try again.');
        }
    }

    /**
     * Show image export dialog
     */
    showImageExportDialog() {
        DialogFactory.createExportMenu(
            () => this.exportFile(),
            () => this.exportImage(true),
            () => this.exportImage(false)
        );
    }

    /**
     * Export image
     */
    async exportImage(whiteBackground) {
        if (this.errorHandler) {
            return await this.errorHandler.executeWithErrorHandling(async () => {
                const success = await this.diagramController.exportAsImage(whiteBackground);
                if (success) {
                    const bgType = whiteBackground ? 'white background' : 'transparent background';
                    this.notificationService.success(`Image exported successfully with ${bgType}!`);
                }
                return success;
            }, 'Error exporting image. Please try again.');
        } else {
            // Fallback without error handler
            try {
                const success = await this.diagramController.exportAsImage(whiteBackground);
                if (success) {
                    const bgType = whiteBackground ? 'white background' : 'transparent background';
                    this.notificationService.success(`Image exported successfully with ${bgType}!`);
                }
                return success;
            } catch (error) {
                this.notificationService.error('Error exporting image. Please try again.');
                Logger.error('Export image error', error);
                return false;
            }
        }
    }

    /**
     * Show save dialog
     */
    showSaveDialog() {
        DialogFactory.createSaveDialog(
            (projectName, isPrivate, password) => this.saveProject(projectName, isPrivate, password),
            () => {}
        );
    }

    /**
     * Save project
     */
    saveProject(projectName, isPrivate = false, password = null) {
        // Check if project exists
        if (this.storageService.projectExists(projectName)) {
            DialogFactory.createConfirmDialog(
                'Project Already Exists',
                `A project named <strong>"${projectName}"</strong> already exists.<br><br>Do you want to overwrite it?`,
                () => {
                    this.performSave(projectName, isPrivate, password);
                },
                null,
                'Overwrite',
                'Cancel'
            );
            return true; // Return true to keep dialog open until user decides
        } else {
            this.performSave(projectName, isPrivate, password);
            return true;
        }
    }

    /**
     * Perform the actual save operation
     */
    performSave(projectName, isPrivate = false, password = null) {
        try {
            // Get current project and set privacy settings
            const project = this.diagramController.getCurrentProject();
            project.isPrivate = isPrivate;
            if (isPrivate && password) {
                project.passwordHash = this.hashPassword(password);
            } else {
                // Clear password if saving as public
                project.passwordHash = null;
            }
            
            // Set project name and save
            this.diagramController.setProjectName(projectName);
            
            // Force save again to ensure privacy settings are persisted
            this.storageService.saveProject(project);
            
            this.currentProject = projectName;
            
            // Show success notification
            const statusText = isPrivate ? 'private' : 'public';
            this.notificationService.success(`${statusText.charAt(0).toUpperCase() + statusText.slice(1)} project saved successfully!`);
            
            // Update UI
            this.updateProjectNameDisplay();
            this.updateRecentProjectsList();
        } catch (error) {
            this.notificationService.error('Error saving project: ' + error.message);
        }
    }

    /**
     * Show load dialog
     */
    showLoadDialog() {
        const savedProjects = this.storageService.getAllProjects();
        const projectList = Object.keys(savedProjects).map(name => savedProjects[name]);
        
        DialogFactory.createLoadDialog(
            projectList,
            (projectName) => this.loadProject(projectName),
            (projectName) => this.deleteProject(projectName),
            () => {}
        );
    }

    /**
     * Load project
     */
    loadProject(projectName) {
        const project = this.storageService.loadProject(projectName);
        if (!project) {
            this.notificationService.error('Project not found or corrupted.');
            return false;
        }

        // Check if project is private and requires password
        if (project.isPrivate && project.passwordHash) {
            this.promptForPasswordAndLoad(projectName, project);
            return true; // Return true to indicate dialog was shown
        } else {
            // Load public project directly
            return this.loadProjectDirectly(projectName, project);
        }
    }

    /**
     * Prompt for password and load private project
     */
    promptForPasswordAndLoad(projectName, project) {
        DialogFactory.createPasswordDialog(
            projectName,
            (password) => {
                const hashedPassword = this.hashPassword(password);
                if (hashedPassword === project.passwordHash) {
                    this.loadProjectDirectly(projectName, project);
                    return true; // Password correct
                } else {
                    return false; // Password incorrect - error will be shown in dialog
                }
            },
            () => {
                // User cancelled password dialog
            }
        );
    }

    /**
     * Load project directly without password check
     */
    loadProjectDirectly(projectName, project) {
        try {
            this.currentProject = projectName;
            this.diagramController.loadProject(project);
            setTimeout(() => this.updateRecentProjectsList(), 100);
            
            const statusText = project.isPrivate ? 'private' : 'public';
            this.notificationService.success(`${statusText.charAt(0).toUpperCase() + statusText.slice(1)} project "${projectName}" loaded successfully!`);
            return true;
        } catch (error) {
            this.notificationService.error('Error loading project: ' + error.message);
            return false;
        }
    }

    /**
     * Delete project
     */
    deleteProject(projectName) {
        const success = this.storageService.deleteProject(projectName);
        if (success) {
            if (this.currentProject === projectName) {
                this.currentProject = null;
            }
            
            // Adjust pagination
            const remainingProjects = Object.keys(this.storageService.getAllProjects()).length;
            const maxPage = Math.ceil(remainingProjects / this.projectsPerPage);
            if (this.currentPage > maxPage && maxPage > 0) {
                this.currentPage = maxPage;
            } else if (remainingProjects === 0) {
                this.currentPage = 1;
            }
            
            this.updateRecentProjectsList();
            this.notificationService.success(`Project "${projectName}" deleted successfully!`);
            return true;
        } else {
            this.notificationService.error('Error deleting project. Please try again.');
            return false;
        }
    }

    /**
     * Show import dialog
     */
    showImportDialog() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.lcp,.json';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.importProject(file);
            }
        });

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    /**
     * Import project
     */
    async importProject(file) {
        try {
            const project = await this.storageService.importProjectFromFile(file);
            
            // Check if project is private and requires password
            if (project.isPrivate && project.passwordHash) {
                DialogFactory.createPasswordDialog(
                    project.name,
                    (enteredPassword) => {
                        const hashedEnteredPassword = this.hashPassword(enteredPassword);
                        if (hashedEnteredPassword === project.passwordHash) {
                            // Password correct, proceed with import
                            this.proceedWithImport(project);
                        } else {
                            this.notificationService.error('Incorrect password. Import cancelled.');
                        }
                    },
                    () => {
                        // User cancelled password dialog
                        this.notificationService.info('Import cancelled.');
                    }
                );
                return;
            }
            
            // For non-private projects, proceed normally
            this.proceedWithImport(project);
        } catch (error) {
            this.notificationService.error('Error importing project. Please check the file format.');
        }
    }

    /**
     * Proceed with import after password verification (if needed)
     */
    proceedWithImport(project) {
        // Ask for confirmation if canvas is not empty
        const currentProject = this.diagramController.getCurrentProject();
        const hasContent = currentProject.nodes.length > 0 || 
                         currentProject.transitions.length > 0 || 
                         currentProject.texts.length > 0;
        
        if (hasContent) {
            DialogFactory.createConfirmDialog(
                'Import Project',
                'Importing will replace the current project.<br><br>Do you want to continue?',
                () => {
                    this.performImport(project);
                },
                null,
                'Continue',
                'Cancel'
            );
            return;
        } else {
            this.performImport(project);
        }
    }

    /**
     * Perform the actual import operation
     */
    performImport(project) {
        try {
            // Save to local storage
            const projectName = project.name.replace(/\.lcp$/, '');
            project.name = projectName;
            this.storageService.saveProject(project);
            
            this.currentProject = projectName;
            this.diagramController.loadProject(project);
            this.updateRecentProjectsList();
            this.updateProjectNameDisplay();
            
            this.notificationService.success(`Project "${projectName}" imported successfully!`);
        } catch (error) {
            this.notificationService.error('Error importing project: ' + error.message);
        }
    }

    /**
     * Create new project
     */
    newProject() {
        // Show enhanced new project dialog directly
        DialogFactory.createNewProjectDialog(
            (projectName, isPrivate, password) => {
                return this.createProject(projectName, isPrivate, password);
            },
            () => {
                // User cancelled - nothing to do
            }
        );
    }

    /**
     * Create project with privacy settings
     */
    createProject(projectName, isPrivate = false, password = null) {
        try {
            // Check if current project has content and warn user
            const currentProject = this.diagramController.getCurrentProject();
            const hasContent = currentProject.nodes.length > 0 || 
                             currentProject.transitions.length > 0 || 
                             currentProject.texts.length > 0;

            if (hasContent) {
                DialogFactory.createConfirmDialog(
                    'Clear Current Project',
                    'Creating a new project will clear the current canvas.<br><br>Do you want to continue?',
                    () => {
                        this.performCreateProject(projectName, isPrivate, password);
                    },
                    null,
                    'Continue',
                    'Cancel'
                );
                return true;
            } else {
                this.performCreateProject(projectName, isPrivate, password);
                return true;
            }
        } catch (error) {
            this.notificationService.error('Error creating project: ' + error.message);
            return false;
        }
    }

    /**
     * Perform the actual project creation
     */
    performCreateProject(projectName, isPrivate = false, password = null) {
        // Create new project
        this.diagramController.newProject();
        
        // Get the project instance and set privacy settings FIRST
        const project = this.diagramController.getCurrentProject();
        project.isPrivate = isPrivate;
        if (isPrivate && password) {
            // Store hashed password (simple hash for this demo)
            project.passwordHash = this.hashPassword(password);
        }
        
        // NOW set the project name and save (this will save with privacy settings)
        this.diagramController.setProjectName(projectName);
        
        // Force save again to ensure privacy settings are persisted
        this.storageService.saveProject(project);
        
        this.currentProject = projectName;
        
        // Update UI
        this.updateProjectNameDisplay();
        this.updateRecentProjectsList();
        
        const statusText = isPrivate ? 'private' : 'public';
        this.notificationService.success(`New ${statusText} project "${projectName}" created and saved!`);
    }

    /**
     * Simple password hashing (for demo purposes - in production use proper hashing)
     */
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    /**
     * Clear project
     */
    clearProject() {
        DialogFactory.createConfirmDialog(
            'Clear Canvas',
            'Are you sure you want to clear all elements from the canvas?<br><br><strong>This action cannot be undone.</strong>',
            () => {
                this.diagramController.clearProject();
                this.currentProject = null;
                this.updateProjectNameDisplay();
                this.updateRecentProjectsList();
                this.notificationService.success('Canvas cleared successfully!');
            },
            null,
            'Clear Canvas',
            'Cancel'
        );
    }

    /**
     * Clear all projects
     */
    clearAllProjects() {
        DialogFactory.createConfirmDialog(
            'Delete All Projects',
            'Are you sure you want to delete <strong>ALL</strong> saved projects and clear the canvas?<br><br><strong>This action cannot be undone!</strong>',
            () => {
                const success = this.storageService.clearAllProjects();
                if (success) {
                    this.diagramController.clearProject();
                    this.currentProject = null;
                    this.currentPage = 1;
                    this.updateRecentProjectsList();
                    this.updateProjectNameDisplay();
                    this.notificationService.success('All projects and canvas cleared successfully!');
                } else {
                    this.notificationService.error('Error clearing projects. Please try again.');
                }
            },
            null,
            'Delete All',
            'Cancel'
        );
    }

    /**
     * Update recent projects list
     */
    updateRecentProjectsList() {
        const recentList = document.getElementById('recent-projects-list');
        const searchInput = document.getElementById('project-search');
        
        if (!recentList) return;

        const savedProjects = this.storageService.getAllProjects();
        let projectNames = Object.keys(savedProjects);

        // Apply search filter
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (searchTerm) {
            projectNames = projectNames.filter(name => 
                name.toLowerCase().includes(searchTerm)
            );
        }

        // Clear existing list
        recentList.innerHTML = '';

        if (projectNames.length === 0) {
            const noProjects = document.createElement('div');
            noProjects.className = 'flex flex-col items-center justify-center p-8 text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg';
            noProjects.innerHTML = `
                <svg class="w-12 h-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <p class="text-gray-500 font-medium">${searchTerm ? 'No projects found matching your search' : 'No saved projects'}</p>
                <p class="text-gray-400 text-sm mt-1">Create your first diagram to get started</p>
            `;
            recentList.appendChild(noProjects);
            return;
        }

        // Sort projects by timestamp
        const allSortedProjects = projectNames
            .map(projectName => savedProjects[projectName])
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        // Calculate pagination
        const totalProjects = allSortedProjects.length;
        const totalPages = Math.ceil(totalProjects / this.projectsPerPage);

        // Ensure current page is valid
        if (this.currentPage > totalPages) this.currentPage = totalPages;
        if (this.currentPage < 1) this.currentPage = 1;

        // Get projects for current page
        const startIndex = (this.currentPage - 1) * this.projectsPerPage;
        const endIndex = startIndex + this.projectsPerPage;
        const currentPageProjects = allSortedProjects.slice(startIndex, endIndex);

        // Render projects
        currentPageProjects.forEach(project => {
            const item = this.createProjectItem(project);
            recentList.appendChild(item);
        });

        // Auto-select first project on initial load
        if (this.initialLoad && !this.currentProject && allSortedProjects.length > 0) {
            const firstProject = allSortedProjects[0];
            this.currentProject = firstProject.name;
            this.updateProjectNameDisplay();
            
            const projectObject = Project.fromJSON(firstProject);
            this.diagramController.loadProject(projectObject);
            this.initialLoad = false;
            
            // Highlight first item
            const firstRecentItem = recentList.querySelector('.recent-item');
            if (firstRecentItem) {
                firstRecentItem.classList.add('current-project');
            }
        }

        // Add pagination controls
        this.createPaginationControls(recentList, this.currentPage, totalPages, totalProjects);
    }

    /**
     * Create project item element
     */
    createProjectItem(project) {
        const item = document.createElement('div');
        item.className = 'project-item group bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all duration-200 relative';
        
        // Highlight current project
        if (this.currentProject === project.name) {
            item.classList.add('ring-2', 'ring-blue-500', 'border-blue-500', 'bg-blue-50');
        }

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn absolute top-2 right-2 w-6 h-6 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-full flex items-center justify-center transition-all duration-200 text-sm font-bold';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Delete project';

        // Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'pr-8';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'font-semibold text-gray-800 text-sm mb-1 truncate';
        nameDiv.textContent = project.name;
        nameDiv.title = project.name; // Show full name on hover

        // Bottom row with date and status
        const bottomRow = document.createElement('div');
        bottomRow.className = 'flex justify-between items-center';

        const dateDiv = document.createElement('div');
        dateDiv.className = 'text-xs text-gray-500';
        const date = new Date(project.timestamp);
        dateDiv.textContent = date.toLocaleDateString() + ' ' + 
            date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        // Privacy status badge
        const statusDiv = document.createElement('div');
        const isPrivate = project.isPrivate || false;
        statusDiv.textContent = isPrivate ? 'PRIVATE' : 'PUBLIC';
        statusDiv.className = 'text-xs px-2 py-1 rounded ml-2';
        
        if (isPrivate) {
            statusDiv.className += ' text-red-600 bg-red-50 border border-red-200';
        } else {
            statusDiv.className += ' text-green-600 bg-green-50 border border-green-200';
        }

        const dateStatusContainer = document.createElement('div');
        dateStatusContainer.className = 'flex items-center';
        dateStatusContainer.appendChild(dateDiv);
        dateStatusContainer.appendChild(statusDiv);

        bottomRow.appendChild(dateStatusContainer);

        contentDiv.appendChild(nameDiv);
        contentDiv.appendChild(bottomRow);

        // Event handlers
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            DialogFactory.createConfirmDialog(
                'Delete Project',
                `Are you sure you want to delete project <strong>"${project.name}"</strong>?<br><br>This action cannot be undone.`,
                () => {
                    this.deleteProject(project.name);
                },
                null,
                'Delete',
                'Cancel'
            );
        });

        contentDiv.addEventListener('click', (event) => {
            event.stopPropagation();
            this.currentProject = project.name;
            this.currentPage = 1;
            this.loadProject(project.name);
            setTimeout(() => this.updateRecentProjectsList(), 100);
        });

        contentDiv.style.cursor = 'pointer';
        contentDiv.style.userSelect = 'none';

        item.appendChild(deleteBtn);
        item.appendChild(contentDiv);

        return item;
    }

    /**
     * Create pagination controls
     */
    createPaginationControls(recentList, currentPageNum, totalPages, totalProjects) {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'flex items-center justify-between mt-4 pt-4 border-t border-gray-200';

        const pageInfo = document.createElement('div');
        pageInfo.className = 'text-sm text-gray-600 font-medium';
        const startProject = ((currentPageNum - 1) * this.projectsPerPage) + 1;
        const endProject = Math.min(currentPageNum * this.projectsPerPage, totalProjects);
        pageInfo.textContent = `${startProject}-${endProject} of ${totalProjects}`;

        const controls = document.createElement('div');
        controls.className = 'flex items-center space-x-2';

        if (totalPages > 1) {
            const prevBtn = this.createPaginationButton('‹', 'Previous page', currentPageNum === 1, () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updateRecentProjectsList();
                }
            });

            const pageIndicator = document.createElement('span');
            pageIndicator.className = 'px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded';
            pageIndicator.textContent = `${currentPageNum}/${totalPages}`;

            const nextBtn = this.createPaginationButton('›', 'Next page', currentPageNum === totalPages, () => {
                if (this.currentPage < totalPages) {
                    this.currentPage++;
                    this.updateRecentProjectsList();
                }
            });

            controls.appendChild(prevBtn);
            controls.appendChild(pageIndicator);
            controls.appendChild(nextBtn);
        } else {
            const pageIndicator = document.createElement('span');
            pageIndicator.className = 'px-3 py-1 text-sm font-medium text-gray-600 bg-gray-100 rounded';
            pageIndicator.textContent = `${currentPageNum}/${totalPages}`;
            controls.appendChild(pageIndicator);
        }

        paginationContainer.appendChild(pageInfo);
        paginationContainer.appendChild(controls);
        recentList.appendChild(paginationContainer);
    }

    /**
     * Create pagination button
     */
    createPaginationButton(text, title, disabled, onClick) {
        const button = document.createElement('button');
        button.className = disabled 
            ? 'w-8 h-8 flex items-center justify-center text-sm font-medium text-gray-400 bg-gray-100 rounded cursor-not-allowed'
            : 'w-8 h-8 flex items-center justify-center text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded transition-colors duration-200 hover:shadow-sm';
        button.innerHTML = text;
        button.title = title;
        button.disabled = disabled;
        if (!disabled) {
            button.addEventListener('click', onClick);
        }
        return button;
    }

    /**
     * Truncate text with ellipsis if too long
     */
    truncateText(text, maxLength = 30) {
        if (!text || text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength - 3) + '...';
    }

    /**
     * Update project name display
     */
    updateProjectNameDisplay() {
        const projectNameElement = document.getElementById('current-project-name');
        if (projectNameElement) {
            if (this.currentProject) {
                const fullName = this.currentProject;
                const truncatedName = this.truncateText(fullName, 120); // Limit to 120 chars for header
                const wasTruncated = fullName !== truncatedName;
                
                projectNameElement.textContent = truncatedName;
                projectNameElement.title = wasTruncated ? `Full name: ${fullName}` : fullName; // Show full name on hover
                projectNameElement.style.color = '#2a3a4d';
                projectNameElement.style.fontWeight = '600';
                
                // Add visual indicator if truncated
                if (wasTruncated) {
                    projectNameElement.style.cursor = 'help';
                } else {
                    projectNameElement.style.cursor = 'default';
                }
            } else {
                projectNameElement.textContent = 'No Project Loaded';
                projectNameElement.title = '';
                projectNameElement.style.color = '#999';
                projectNameElement.style.fontWeight = '500';
                projectNameElement.style.cursor = 'default';
            }
        }
    }

    /**
     * Handle project loaded event
     */
    handleProjectLoaded(project) {
        this.currentProject = project.name;
        this.updateProjectNameDisplay();
    }

    /**
     * Handle project created event
     */
    handleProjectCreated() {
        this.currentProject = null;
        this.updateProjectNameDisplay();
        this.updateRecentProjectsList();
    }

    /**
     * Handle project cleared event
     */
    handleProjectCleared() {
        this.updateRecentProjectsList();
    }

    /**
     * Export project as file
     */
    exportFile() {
        if (this.errorHandler) {
            this.errorHandler.executeSync(() => {
                const currentProject = this.diagramController.getCurrentProject();
                if (!currentProject || (currentProject.nodes.length === 0 && currentProject.transitions.length === 0 && currentProject.texts.length === 0)) {
                    this.notificationService.error('No content to export. Please create some elements first.');
                    return;
                }

                const success = this.diagramController.exportAsFile();
                if (success) {
                    this.notificationService.success('Project exported successfully!');
                } else {
                    this.notificationService.error('Failed to export project. Please try again.');
                }
            }, 'Failed to export project. Please try again.');
        } else {
            // Fallback without error handler
            try {
                const currentProject = this.diagramController.getCurrentProject();
                if (!currentProject || (currentProject.nodes.length === 0 && currentProject.transitions.length === 0 && currentProject.texts.length === 0)) {
                    this.notificationService.error('No content to export. Please create some elements first.');
                    return;
                }

                const success = this.diagramController.exportAsFile();
                if (success) {
                    this.notificationService.success('Project exported successfully!');
                } else {
                    this.notificationService.error('Failed to export project. Please try again.');
                }
            } catch (error) {
                this.notificationService.error('Failed to export project. Please try again.');
                Logger.error('Export error', error);
            }
        }
    }

    /**
     * Import project from file
     */
    importFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json,.lcp';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            // Use the updated importProject method that handles private projects
            this.importProject(file);
            
            // Clean up
            document.body.removeChild(fileInput);
        });
        
        // Trigger file selection
        document.body.appendChild(fileInput);
        fileInput.click();
    }

    /**
     * Toggle grid visibility and snap functionality
     */
    toggleGrid() {
        // Access grid service through diagram controller
        if (this.diagramController && this.diagramController.gridService) {
            this.diagramController.gridService.toggleGrid();
            this.updateGridButtonState();
        }
    }

    /**
     * Toggle rulers visibility and measurement display
     */
    toggleRulers() {
        // Access grid service through diagram controller
        if (this.diagramController && this.diagramController.gridService) {
            this.diagramController.gridService.toggleRulers();
            this.updateRulersButtonState();
        }
    }

    /**
     * Update rulers button visual state
     */
    updateRulersButtonState() {
        const rulersBtn = document.getElementById('rulers-toggle-btn');
        if (rulersBtn && this.diagramController && this.diagramController.gridService) {
            const gridState = this.diagramController.gridService.getState();
            
            if (gridState.rulersVisible) {
                rulersBtn.classList.remove('rulers-off');
                rulersBtn.classList.add('rulers-on');
                rulersBtn.title = 'Hide Rulers';
            } else {
                rulersBtn.classList.remove('rulers-on');
                rulersBtn.classList.add('rulers-off');
                rulersBtn.title = 'Show Rulers';
            }
        }
    }

    /**
     * Update grid button visual state
     */
    updateGridButtonState() {
        const gridBtn = document.getElementById('grid-toggle-btn');
        if (gridBtn && this.diagramController && this.diagramController.gridService) {
            const gridState = this.diagramController.gridService.getState();
            
            if (gridState.gridVisible) {
                gridBtn.classList.remove('grid-off');
                gridBtn.classList.add('grid-on');
                gridBtn.title = 'Hide Grid';
            } else {
                gridBtn.classList.remove('grid-on');
                gridBtn.classList.add('grid-off');
                gridBtn.title = 'Show Grid';
            }
        }
    }
}
