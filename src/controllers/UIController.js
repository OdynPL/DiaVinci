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
        this.createActionButtons();
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

        // Event bus listeners
        this.eventBus.on('selection.changed', (data) => this.updateRemoveButton(data));
        this.eventBus.on('project.loaded', (project) => this.handleProjectLoaded(project));
        this.eventBus.on('project.created', () => this.handleProjectCreated());
        this.eventBus.on('project.cleared', () => this.handleProjectCleared());
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
     * Create action buttons
     */
    createActionButtons() {
        this.createButton('remove-btn', '✕ Remove', '#e74c3c', 'left: 20px', false, () => {
            this.removeSelectedElement();
        });

        this.createButton('export-btn', '💾 Export', '#27ae60', 'right: 20px', true, () => {
            this.showExportOptions();
        });

        this.createButton('clear-btn', '🗑️ Clear', '#e74c3c', 'right: 140px', true, () => {
            this.clearProject();
        });

        this.createButton('save-btn', '💾 Save', '#3498db', 'right: 260px', true, () => {
            this.showSaveDialog();
        });

        this.createButton('load-btn', '📁 Load', '#9b59b6', 'right: 380px', true, () => {
            this.showLoadDialog();
        });

        this.createButton('new-btn', '📄 New', '#2ecc71', 'right: 500px', true, () => {
            this.newProjectWithAutoSave();
        });

        this.createButton('import-btn', '📥 Import', '#9b59b6', 'right: 620px', true, () => {
            this.showImportDialog();
        });
    }

    /**
     * Create button element
     */
    createButton(id, text, color, position, visible, onClick) {
        const button = document.createElement('button');
        button.id = id;
        button.innerHTML = `<span style="font-size:1.1rem;vertical-align:middle;">${text.split(' ')[0]}</span> <span style="font-size:0.85rem;vertical-align:middle;">${text.split(' ')[1]}</span>`;
        button.style.position = 'absolute';
        button.style.bottom = '12px';
        button.style.padding = '9px 19px';
        button.style.background = color;
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '6px';
        button.style.fontWeight = 'bold';
        button.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
        button.style.cursor = 'pointer';
        button.style.display = visible ? 'block' : 'none';
        button.style.zIndex = '30';
        
        // Parse position
        const [side, value] = position.split(': ');
        button.style[side] = value;
        
        button.addEventListener('click', onClick);
        document.body.appendChild(button);
        
        return button;
    }

    /**
     * Update remove button visibility
     */
    updateRemoveButton(selectionData) {
        const removeBtn = document.getElementById('remove-btn');
        if (removeBtn) {
            removeBtn.style.display = selectionData.element ? 'block' : 'none';
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
            noProjects.className = 'no-recent';
            noProjects.textContent = searchTerm ? 'No projects found matching your search' : 'No saved projects';
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
        item.className = 'recent-item';
        
        // Highlight current project
        if (this.currentProject === project.name) {
            item.classList.add('current-project');
        }

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'recent-item-delete';
        deleteBtn.innerHTML = '×';
        deleteBtn.title = 'Delete project';

        // Content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'recent-item-content';

        const nameDiv = document.createElement('div');
        nameDiv.className = 'recent-item-name';
        nameDiv.textContent = project.name;

        const dateDiv = document.createElement('div');
        dateDiv.className = 'recent-item-date';
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
        paginationContainer.className = 'pagination-container';

        const pageInfo = document.createElement('div');
        pageInfo.className = 'pagination-info';
        const startProject = ((currentPageNum - 1) * this.projectsPerPage) + 1;
        const endProject = Math.min(currentPageNum * this.projectsPerPage, totalProjects);
        pageInfo.textContent = `${startProject}-${endProject} of ${totalProjects}`;

        const controls = document.createElement('div');
        controls.className = 'pagination-controls';

        if (totalPages > 1) {
            const prevBtn = this.createPaginationButton('‹', 'Previous page', currentPageNum === 1, () => {
                if (this.currentPage > 1) {
                    this.currentPage--;
                    this.updateRecentProjectsList();
                }
            });

            const pageIndicator = document.createElement('span');
            pageIndicator.className = 'pagination-info';
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
            pageIndicator.className = 'pagination-info';
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
        button.className = 'pagination-btn';
        button.innerHTML = text;
        button.title = title;
        button.disabled = disabled;
        button.addEventListener('click', onClick);
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
}
