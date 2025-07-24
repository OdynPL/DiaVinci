/**
 * UI Controller managing user interface interactions
 */
class UIController {
    constructor(eventBus, diagramController, storageService, notificationService) {
        this.eventBus = eventBus;
        this.diagramController = diagramController;
        this.storageService = storageService;
        this.notificationService = notificationService;
        
        this.currentProject = null;
        this.currentPage = 1;
        this.projectsPerPage = 8;
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
            saveProjectBtn.addEventListener('click', () => this.saveProject());
        }

        // Load Project
        const loadProjectBtn = document.getElementById('load-project-btn');
        if (loadProjectBtn) {
            loadProjectBtn.addEventListener('click', () => this.showLoadDialog());
        }

        // Export Image
        const exportImageBtn = document.getElementById('export-image-btn');
        if (exportImageBtn) {
            exportImageBtn.addEventListener('click', () => this.exportImage());
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
     * Export image
     */
    async exportImage(whiteBackground) {
        try {
            const success = await this.diagramController.exportAsImage(whiteBackground);
            if (success) {
                this.notificationService.success('Image exported successfully!');
            }
        } catch (error) {
            this.notificationService.error('Error exporting image. Please try again.');
        }
    }

    /**
     * Show save dialog
     */
    showSaveDialog() {
        DialogFactory.createSaveDialog(
            (projectName) => this.saveProject(projectName),
            () => {}
        );
    }

    /**
     * Save project
     */
    saveProject(projectName) {
        // Check if project exists
        if (this.storageService.projectExists(projectName)) {
            const overwrite = confirm(`A project named "${projectName}" already exists. Do you want to overwrite it?`);
            if (!overwrite) return false;
        }

        // Set project name and auto-save
        this.diagramController.setProjectName(projectName);
        
        // Show success notification
        this.notificationService.success('Project saved successfully!');
        
        // Refresh project list
        this.updateRecentProjectsList();
        
        return true;
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
        if (project) {
            this.currentProject = projectName;
            this.diagramController.loadProject(project);
            setTimeout(() => this.updateRecentProjectsList(), 100);
            this.notificationService.success(`Project "${projectName}" loaded successfully!`);
            return true;
        } else {
            this.notificationService.error('Project not found or corrupted.');
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
            
            // Ask for confirmation if canvas is not empty
            const currentProject = this.diagramController.getCurrentProject();
            const hasContent = currentProject.nodes.length > 0 || 
                             currentProject.transitions.length > 0 || 
                             currentProject.texts.length > 0;
            
            if (hasContent) {
                const confirmed = confirm('Importing will replace the current project. Do you want to continue?');
                if (!confirmed) return;
            }

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
            this.notificationService.error('Error importing project. Please check the file format.');
        }
    }

    /**
     * Create new project
     */
    newProject() {
        const currentProject = this.diagramController.getCurrentProject();
        const hasContent = currentProject.nodes.length > 0 || 
                         currentProject.transitions.length > 0 || 
                         currentProject.texts.length > 0;

        if (hasContent) {
            const confirmed = confirm('Are you sure you want to create a new project? All unsaved changes will be lost.');
            if (!confirmed) return;
        }

        this.diagramController.newProject();
        this.currentProject = null;
        this.updateProjectNameDisplay();
        this.updateRecentProjectsList();
        this.notificationService.success('New project created!');
    }

    /**
     * Create new project and automatically save it with generated name
     */
    newProjectWithAutoSave() {
        const currentProject = this.diagramController.getCurrentProject();
        const hasContent = currentProject.nodes.length > 0 || 
                         currentProject.transitions.length > 0 || 
                         currentProject.texts.length > 0;

        if (hasContent) {
            const confirmed = confirm('Are you sure you want to create a new project? All unsaved changes will be lost.');
            if (!confirmed) return;
        }

        // Generate unique project name
        const projectName = this.storageService.generateUniqueProjectName();
        
        // Create new project
        this.diagramController.newProject();
        
        // Set the generated name and save immediately
        this.diagramController.setProjectName(projectName);
        this.currentProject = this.diagramController.getCurrentProject();
        
        // Update UI
        this.updateProjectNameDisplay();
        this.updateRecentProjectsList();
        
        this.notificationService.success(`New project "${projectName}" created and saved!`);
    }

    /**
     * Clear project
     */
    clearProject() {
        const confirmed = confirm('Are you sure you want to clear all elements from the canvas? This action cannot be undone.');
        if (confirmed) {
            this.diagramController.clearProject();
            this.currentProject = null;
            this.updateProjectNameDisplay();
            this.updateRecentProjectsList();
            this.notificationService.success('Canvas cleared successfully!');
        }
    }

    /**
     * Clear all projects
     */
    clearAllProjects() {
        const confirmed = confirm('Are you sure you want to delete ALL saved projects and clear the canvas? This action cannot be undone!');
        
        if (confirmed) {
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
        }
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

        const dateDiv = document.createElement('div');
        dateDiv.className = 'text-xs text-gray-500';
        const date = new Date(project.timestamp);
        dateDiv.textContent = date.toLocaleDateString() + ' ' + 
            date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

        contentDiv.appendChild(nameDiv);
        contentDiv.appendChild(dateDiv);

        // Event handlers
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            if (confirm(`Are you sure you want to delete project "${project.name}"?`)) {
                this.deleteProject(project.name);
            }
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
     * Update project name display
     */
    updateProjectNameDisplay() {
        const projectNameElement = document.getElementById('current-project-name');
        if (projectNameElement) {
            if (this.currentProject) {
                projectNameElement.textContent = this.currentProject;
                projectNameElement.style.color = '#2a3a4d';
                projectNameElement.style.fontWeight = '600';
            } else {
                projectNameElement.textContent = 'No Project Loaded';
                projectNameElement.style.color = '#999';
                projectNameElement.style.fontWeight = '500';
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
        try {
            const fileData = this.diagramController.exportAsFile();
            if (fileData) {
                this.notificationService.showSuccess('Project exported successfully!');
            }
        } catch (error) {
            this.errorHandler.handleError(error, 'Failed to export project');
        }
    }

    /**
     * Import project from file
     */
    importFile() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.json';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const projectData = JSON.parse(event.target.result);
                    const project = Project.fromJSON(projectData);
                    
                    this.diagramController.loadProject(project);
                    this.currentProject = project.name;
                    this.updateProjectNameDisplay();
                    this.updateRecentProjectsList();
                    
                    this.notificationService.showSuccess(`Project "${project.name}" imported successfully!`);
                } catch (error) {
                    this.errorHandler.handleError(error, 'Failed to import project file');
                }
            };
            reader.readAsText(file);
            
            // Clean up
            document.body.removeChild(fileInput);
        });
        
        // Trigger file selection
        document.body.appendChild(fileInput);
        fileInput.click();
    }
}
