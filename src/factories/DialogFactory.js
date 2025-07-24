/**
 * Dialog factory for creating various dialog components
 */
class DialogFactory {
    /**
     * Create save project dialog
     */
    static createSaveDialog(onSave, onCancel) {
        const dialog = this.createBaseDialog('save-dialog', 'Save Project');
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter project name...';
        input.value = this.generateDefaultProjectName();
        input.style.width = '100%';
        input.style.padding = '8px 12px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '4px';
        input.style.fontSize = '14px';
        input.style.marginBottom = '15px';
        input.style.boxSizing = 'border-box';
        
        const buttonContainer = this.createButtonContainer();
        const cancelBtn = this.createButton('Cancel', 'secondary');
        const saveBtn = this.createButton('Save', 'primary');
        
        const handleSave = () => {
            const projectName = input.value.trim();
            if (projectName) {
                const success = onSave(projectName);
                if (success !== false) {
                    dialog.remove();
                }
            } else {
                alert('Please enter a project name');
            }
        };
        
        const handleCancel = () => {
            dialog.remove();
            if (onCancel) onCancel();
        };
        
        cancelBtn.addEventListener('click', handleCancel);
        saveBtn.addEventListener('click', handleSave);
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleSave();
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });
        
        buttonContainer.appendChild(cancelBtn);
        buttonContainer.appendChild(saveBtn);
        dialog.appendChild(input);
        dialog.appendChild(buttonContainer);
        
        document.body.appendChild(dialog);
        input.focus();
        input.select();
        
        return dialog;
    }

    /**
     * Create load project dialog
     */
    static createLoadDialog(projects, onLoad, onDelete, onClose) {
        const dialog = this.createBaseDialog('load-dialog', 'Load Project', {
            minWidth: '400px',
            maxHeight: '500px'
        });
        
        const projectList = document.createElement('div');
        projectList.style.maxHeight = '300px';
        projectList.style.overflowY = 'auto';
        projectList.style.border = '1px solid #eee';
        projectList.style.borderRadius = '4px';
        projectList.style.marginBottom = '15px';
        
        // Function to refresh project list
        const refreshProjectList = () => {
            // Get updated projects list
            const updatedProjects = window.container ? 
                Object.values(window.container.resolve('storageService').getAllProjects()) : 
                [];
            
            // Clear current list
            projectList.innerHTML = '';
            
            if (updatedProjects.length === 0) {
                const noProjects = document.createElement('div');
                noProjects.textContent = 'No saved projects found';
                noProjects.style.padding = '20px';
                noProjects.style.textAlign = 'center';
                noProjects.style.color = '#666';
                projectList.appendChild(noProjects);
            } else {
                updatedProjects.forEach(project => {
                    const projectItem = this.createProjectItem(project, onLoad, onDelete, dialog, refreshProjectList);
                    projectList.appendChild(projectItem);
                });
            }
        };
        
        // Initial population
        if (projects.length === 0) {
            const noProjects = document.createElement('div');
            noProjects.textContent = 'No saved projects found';
            noProjects.style.padding = '20px';
            noProjects.style.textAlign = 'center';
            noProjects.style.color = '#666';
            projectList.appendChild(noProjects);
        } else {
            projects.forEach(project => {
                const projectItem = this.createProjectItem(project, onLoad, onDelete, dialog, refreshProjectList);
                projectList.appendChild(projectItem);
            });
        }
        
        const closeBtn = this.createButton('Close', 'secondary');
        closeBtn.style.width = '100%';
        closeBtn.addEventListener('click', () => {
            dialog.remove();
            if (onClose) onClose();
        });
        
        dialog.appendChild(projectList);
        dialog.appendChild(closeBtn);
        document.body.appendChild(dialog);
        
        return dialog;
    }

    /**
     * Create export options menu
     */
    static createExportMenu(onExportProject, onExportWhite, onExportTransparent) {
        const menu = document.createElement('div');
        menu.id = 'export-options-menu';
        menu.style.position = 'absolute';
        menu.style.right = '20px';
        menu.style.bottom = '60px';
        menu.style.background = '#fff';
        menu.style.border = '1px solid #ccc';
        menu.style.borderRadius = '6px';
        menu.style.padding = '12px';
        menu.style.zIndex = '1000';
        menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        menu.style.minWidth = '200px';
        
        // Project export section
        const projectTitle = this.createMenuTitle('Export Project');
        const exportProjectBtn = this.createMenuButton('💾 Export as .lcp File', '#3498db', () => {
            onExportProject();
            menu.remove();
        });
        
        const separator = document.createElement('hr');
        separator.style.margin = '12px 0';
        separator.style.border = 'none';
        separator.style.borderTop = '1px solid #eee';
        
        // Image export section
        const imageTitle = this.createMenuTitle('Export Image');
        const whiteBtn = this.createMenuButton('🖼️ White Background', '#27ae60', () => {
            onExportWhite();
            menu.remove();
        });
        const transparentBtn = this.createMenuButton('🖼️ Transparent Background', '#9b59b6', () => {
            onExportTransparent();
            menu.remove();
        });
        
        menu.appendChild(projectTitle);
        menu.appendChild(exportProjectBtn);
        menu.appendChild(separator);
        menu.appendChild(imageTitle);
        menu.appendChild(whiteBtn);
        menu.appendChild(transparentBtn);
        
        document.body.appendChild(menu);
        
        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', function closeMenu(e) {
                if (!menu.contains(e.target) && e.target.id !== 'export-btn') {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            });
        }, 100);
        
        return menu;
    }

    /**
     * Create color picker menu
     */
    static createColorPicker(node, x, y, onColorChange) {
        const menu = document.createElement('div');
        menu.id = 'color-picker-menu';
        menu.style.position = 'absolute';
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.style.background = '#fff';
        menu.style.border = '1px solid #ccc';
        menu.style.borderRadius = '6px';
        menu.style.padding = '8px';
        menu.style.zIndex = '1000';
        menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        menu.style.display = 'flex';
        menu.style.flexWrap = 'wrap';
        menu.style.width = '180px';
        
        const colors = [
            '#b3d1ff', '#ffb3b3', '#b3ffb3', '#ffdfb3', '#ffb3ff', '#b3ffff',
            '#d1b3ff', '#fff3b3', '#ffc1cc', '#c1ffc1', '#c1c1ff', '#ffc1e1',
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b',
            '#6c5ce7', '#a29bfe', '#fd79a8', '#e17055', '#00b894', '#00cec9',
            '#2d3436', '#636e72', '#74b9ff', '#81ecec', '#00b894', '#fdcb6e',
            '#ffffff', '#000000', '#c0c0c0', '#808080', '#dfe6e9', '#b2bec3'
        ];
        
        colors.forEach(color => {
            const colorBox = this.createColorBox(color, () => {
                onColorChange(color);
                menu.remove();
            });
            menu.appendChild(colorBox);
        });
        
        // Custom color picker
        const customContainer = this.createCustomColorPicker(node, onColorChange, () => menu.remove());
        menu.appendChild(customContainer);
        
        document.body.appendChild(menu);
        
        // Remove when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', function removeColorPicker() {
                menu.remove();
                document.removeEventListener('click', removeColorPicker);
            });
        }, 100);
        
        return menu;
    }

    /**
     * Create IF node options menu
     */
    static createIFOptionsMenu(node, x, y, onRotateClockwise, onRotateCounterClockwise, onChangeColor) {
        const menu = document.createElement('div');
        menu.id = 'if-options-menu';
        menu.style.position = 'absolute';
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.style.background = '#fff';
        menu.style.border = '1px solid #ccc';
        menu.style.borderRadius = '6px';
        menu.style.padding = '8px';
        menu.style.zIndex = '1000';
        menu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
        menu.style.minWidth = '120px';
        
        const rotateRightBtn = this.createMenuItem('Rotate Right (90°)', () => {
            onRotateClockwise();
            menu.remove();
        });
        
        const rotateLeftBtn = this.createMenuItem('Rotate Left (90°)', () => {
            onRotateCounterClockwise();
            menu.remove();
        });
        
        const colorBtn = this.createMenuItem('Change Color', () => {
            menu.remove();
            onChangeColor();
        });
        
        menu.appendChild(rotateRightBtn);
        menu.appendChild(rotateLeftBtn);
        menu.appendChild(colorBtn);
        document.body.appendChild(menu);
        
        // Remove when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', function removeMenu() {
                menu.remove();
                document.removeEventListener('click', removeMenu);
            });
        }, 100);
        
        return menu;
    }

    // Helper methods
    
    static createBaseDialog(id, title, extraStyles = {}) {
        const existing = document.getElementById(id);
        if (existing) existing.remove();
        
        const dialog = document.createElement('div');
        dialog.id = id;
        dialog.style.position = 'fixed';
        dialog.style.top = '50%';
        dialog.style.left = '50%';
        dialog.style.transform = 'translate(-50%, -50%)';
        dialog.style.background = '#fff';
        dialog.style.border = '1px solid #ccc';
        dialog.style.borderRadius = '8px';
        dialog.style.padding = '20px';
        dialog.style.zIndex = '2000';
        dialog.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
        dialog.style.minWidth = extraStyles.minWidth || '300px';
        
        if (extraStyles.maxHeight) {
            dialog.style.maxHeight = extraStyles.maxHeight;
        }
        
        const titleElement = document.createElement('h3');
        titleElement.textContent = title;
        titleElement.style.margin = '0 0 15px 0';
        titleElement.style.color = '#333';
        dialog.appendChild(titleElement);
        
        return dialog;
    }

    static createButtonContainer() {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '10px';
        container.style.justifyContent = 'flex-end';
        return container;
    }

    static createButton(text, type) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.padding = '8px 16px';
        button.style.border = type === 'primary' ? 'none' : '1px solid #ddd';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        
        if (type === 'primary') {
            button.style.background = '#3498db';
            button.style.color = '#fff';
        } else {
            button.style.background = '#f8f9fa';
        }
        
        return button;
    }

    static createProjectItem(project, onLoad, onDelete, dialog, refreshList) {
        const item = document.createElement('div');
        item.style.padding = '12px';
        item.style.borderBottom = '1px solid #eee';
        item.style.cursor = 'pointer';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        
        item.addEventListener('mouseenter', () => {
            item.style.background = '#f8f9fa';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.background = '#fff';
        });
        
        const projectInfo = document.createElement('div');
        projectInfo.style.flex = '1';
        
        const nameDiv = document.createElement('div');
        nameDiv.textContent = project.name;
        nameDiv.style.fontWeight = 'bold';
        nameDiv.style.marginBottom = '4px';
        
        const dateDiv = document.createElement('div');
        dateDiv.textContent = new Date(project.timestamp).toLocaleString();
        dateDiv.style.fontSize = '12px';
        dateDiv.style.color = '#666';
        
        projectInfo.appendChild(nameDiv);
        projectInfo.appendChild(dateDiv);
        
        // Add click handler to load project on item click
        projectInfo.addEventListener('click', (e) => {
            e.stopPropagation();
            const success = onLoad(project.name);
            if (success !== false && dialog) {
                dialog.remove();
            }
        });
        
        projectInfo.style.cursor = 'pointer';
        projectInfo.style.userSelect = 'none';
        
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '8px';
        
        const loadBtn = this.createSmallButton('Load', '#27ae60', (e) => {
            e.stopPropagation();
            const success = onLoad(project.name);
            if (success !== false && dialog) {
                dialog.remove();
            }
        });
        
        const deleteBtn = this.createSmallButton('Delete', '#e74c3c', (e) => {
            e.stopPropagation();
            if (confirm(`Are you sure you want to delete project "${project.name}"?`)) {
                const success = onDelete(project.name);
                if (success !== false && refreshList) {
                    refreshList();
                }
            }
        });
        
        buttonContainer.appendChild(loadBtn);
        buttonContainer.appendChild(deleteBtn);
        item.appendChild(projectInfo);
        item.appendChild(buttonContainer);
        
        return item;
    }

    static createSmallButton(text, color, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.padding = '4px 12px';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.background = color;
        button.style.color = '#fff';
        button.style.cursor = 'pointer';
        button.style.fontSize = '12px';
        button.addEventListener('click', onClick);
        return button;
    }

    static createMenuTitle(text) {
        const title = document.createElement('div');
        title.textContent = text;
        title.style.fontWeight = 'bold';
        title.style.marginBottom = '8px';
        title.style.color = '#2a3a4d';
        title.style.fontSize = '14px';
        return title;
    }

    static createMenuButton(text, color, onClick) {
        const button = document.createElement('button');
        button.textContent = text;
        button.style.width = '100%';
        button.style.padding = '8px 12px';
        button.style.margin = '4px 0';
        button.style.background = color;
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.fontWeight = 'bold';
        button.addEventListener('click', () => {
            onClick();
        });
        return button;
    }

    static createColorBox(color, onClick) {
        const colorBox = document.createElement('div');
        colorBox.style.width = '20px';
        colorBox.style.height = '20px';
        colorBox.style.backgroundColor = color;
        colorBox.style.border = '1px solid #666';
        colorBox.style.margin = '2px';
        colorBox.style.cursor = 'pointer';
        colorBox.style.borderRadius = '3px';
        colorBox.addEventListener('click', onClick);
        return colorBox;
    }

    static createCustomColorPicker(node, onColorChange, onClose) {
        const container = document.createElement('div');
        container.style.width = '100%';
        container.style.marginTop = '8px';
        container.style.borderTop = '1px solid #ddd';
        container.style.paddingTop = '8px';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        
        const label = document.createElement('span');
        label.textContent = 'Custom:';
        label.style.fontSize = '12px';
        label.style.marginRight = '6px';
        label.style.color = '#333';
        
        const input = document.createElement('input');
        input.type = 'color';
        input.style.width = '30px';
        input.style.height = '25px';
        input.style.border = 'none';
        input.style.cursor = 'pointer';
        input.style.borderRadius = '3px';
        input.value = node.color || '#b3d1ff';
        
        input.addEventListener('change', (e) => {
            onColorChange(e.target.value);
            onClose();
        });
        
        container.appendChild(label);
        container.appendChild(input);
        return container;
    }

    static createMenuItem(text, onClick) {
        const item = document.createElement('div');
        item.innerHTML = text;
        item.style.padding = '8px 12px';
        item.style.cursor = 'pointer';
        item.style.borderBottom = '1px solid #eee';
        item.style.fontSize = '14px';
        item.addEventListener('click', onClick);
        return item;
    }

    /**
     * Create context menu with multiple options
     */
    static createContextMenu(x, y, options) {
        // Remove any existing context menu
        const existingMenu = document.getElementById('context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        const menu = document.createElement('div');
        menu.id = 'context-menu';
        menu.style.position = 'fixed';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.style.backgroundColor = '#fff';
        menu.style.border = '1px solid #ccc';
        menu.style.borderRadius = '6px';
        menu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        menu.style.zIndex = '10000';
        menu.style.minWidth = '180px';
        menu.style.overflow = 'hidden';

        options.forEach((option, index) => {
            const item = document.createElement('div');
            item.textContent = option.text;
            item.style.padding = '10px 15px';
            item.style.cursor = 'pointer';
            item.style.fontSize = '14px';
            item.style.borderBottom = index < options.length - 1 ? '1px solid #eee' : 'none';
            
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#f0f8ff';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'transparent';
            });
            
            item.addEventListener('click', () => {
                option.action();
                menu.remove();
            });
            
            menu.appendChild(item);
        });

        // Position menu to stay within viewport
        document.body.appendChild(menu);
        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        if (rect.right > viewportWidth) {
            menu.style.left = (x - rect.width) + 'px';
        }
        
        if (rect.bottom > viewportHeight) {
            menu.style.top = (y - rect.height) + 'px';
        }

        // Close menu when clicking outside
        const closeMenu = (e) => {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        
        // Delay adding the click listener to prevent immediate closure
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
        }, 100);

        return menu;
    }

    static generateDefaultProjectName() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `Project_${year}${month}${day}_${hours}${minutes}${seconds}`;
    }
}
