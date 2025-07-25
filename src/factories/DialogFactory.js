/**
 * Dialog factory for creating various dialog components
 */
class DialogFactory {
    /**
     * Create save project dialog
     */
    static createSaveDialog(onSave, onCancel) {
        const dialog = this.createBaseDialog('save-dialog', 'Save Project', {
            maxWidth: '450px'
        });
        
        // Project name input
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Project Name:';
        nameLabel.style.display = 'block';
        nameLabel.style.marginBottom = '6px';
        nameLabel.style.fontWeight = 'bold';
        nameLabel.style.color = '#333';
        
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter project name...';
        input.value = this.generateDefaultProjectName();
        input.maxLength = 200; // Limit project name length
        input.style.width = '100%';
        input.style.padding = '10px 12px';
        input.style.border = '2px solid #e1e8ed';
        input.style.borderRadius = '8px';
        input.style.fontSize = '14px';
        input.style.marginBottom = '8px';
        input.style.boxSizing = 'border-box';
        input.style.transition = 'border-color 0.2s ease';
        
        input.addEventListener('focus', () => {
            input.style.borderColor = '#3498db';
            errorMsg.style.display = 'none';
        });
        
        input.addEventListener('blur', () => {
            input.style.borderColor = '#e1e8ed';
        });
        
        input.addEventListener('input', () => {
            const currentValue = input.value;
            const sanitizedValue = InputValidator.sanitize(currentValue, 'text');
            const isValid = InputValidator.validateLength(sanitizedValue, 'text') && InputValidator.isSafe(currentValue, 'text');
            
            if (currentValue !== sanitizedValue) {
                input.value = sanitizedValue;
            }
            
            if (sanitizedValue.trim()) {
                errorMsg.style.display = 'none';
                if (isValid) {
                    input.style.borderColor = '#27ae60'; // Green for valid
                } else {
                    input.style.borderColor = '#f39c12'; // Orange for warnings
                }
            } else {
                input.style.borderColor = '#e1e8ed';
            }
            
            // Show character count for long names
            if (currentValue.length > 20) {
                input.title = `${currentValue.length}/200 characters`;
            } else {
                input.title = '';
            }
        });
        
        // Error message for save dialog
        const errorMsg = document.createElement('div');
        errorMsg.style.color = '#e74c3c';
        errorMsg.style.fontSize = '12px';
        errorMsg.style.marginBottom = '12px';
        errorMsg.style.display = 'none';
        errorMsg.style.backgroundColor = '#fdf2f2';
        errorMsg.style.border = '1px solid #fcc2c3';
        errorMsg.style.borderRadius = '4px';
        errorMsg.style.padding = '6px 8px';
        errorMsg.style.fontWeight = '500';
        
        // Privacy checkbox
        const privacyContainer = document.createElement('div');
        privacyContainer.style.display = 'flex';
        privacyContainer.style.alignItems = 'center';
        privacyContainer.style.marginBottom = '15px';
        privacyContainer.style.padding = '12px';
        privacyContainer.style.backgroundColor = '#f8f9fa';
        privacyContainer.style.borderRadius = '8px';
        privacyContainer.style.border = '1px solid #e9ecef';
        
        const privacyCheckbox = document.createElement('input');
        privacyCheckbox.type = 'checkbox';
        privacyCheckbox.id = 'save-private-checkbox';
        privacyCheckbox.style.marginRight = '10px';
        privacyCheckbox.style.transform = 'scale(1.2)';
        privacyCheckbox.style.cursor = 'pointer';
        
        const privacyLabel = document.createElement('label');
        privacyLabel.htmlFor = 'save-private-checkbox';
        privacyLabel.textContent = 'Save as private project';
        privacyLabel.style.cursor = 'pointer';
        privacyLabel.style.fontWeight = '500';
        privacyLabel.style.color = '#495057';
        
        privacyContainer.appendChild(privacyCheckbox);
        privacyContainer.appendChild(privacyLabel);
        
        // Password input (initially hidden)
        const passwordContainer = document.createElement('div');
        passwordContainer.style.display = 'none';
        passwordContainer.style.marginBottom = '20px';
        
        const passwordLabel = document.createElement('label');
        passwordLabel.textContent = 'Project Password:';
        passwordLabel.style.display = 'block';
        passwordLabel.style.marginBottom = '6px';
        passwordLabel.style.fontWeight = 'bold';
        passwordLabel.style.color = '#333';
        
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter password for private project...';
        passwordInput.style.width = '100%';
        passwordInput.style.padding = '10px 12px';
        passwordInput.style.border = '2px solid #e1e8ed';
        passwordInput.style.borderRadius = '8px';
        passwordInput.style.fontSize = '14px';
        passwordInput.style.boxSizing = 'border-box';
        passwordInput.style.transition = 'border-color 0.2s ease';
        
        passwordInput.addEventListener('focus', () => {
            passwordInput.style.borderColor = '#e74c3c';
            passwordError.style.display = 'none';
        });
        
        passwordInput.addEventListener('blur', () => {
            passwordInput.style.borderColor = '#e1e8ed';
        });
        
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.trim()) {
                passwordError.style.display = 'none';
                passwordInput.style.borderColor = '#e74c3c';
            }
        });
        
        const passwordNote = document.createElement('div');
        passwordNote.textContent = '⚠️ Remember this password - it cannot be recovered!';
        passwordNote.style.fontSize = '12px';
        passwordNote.style.color = '#e67e22';
        passwordNote.style.marginTop = '6px';
        passwordNote.style.fontStyle = 'italic';
        
        // Error message for password validation
        const passwordError = document.createElement('div');
        passwordError.style.color = '#e74c3c';
        passwordError.style.fontSize = '12px';
        passwordError.style.marginTop = '6px';
        passwordError.style.display = 'none';
        passwordError.style.backgroundColor = '#fdf2f2';
        passwordError.style.border = '1px solid #fcc2c3';
        passwordError.style.borderRadius = '4px';
        passwordError.style.padding = '6px 8px';
        passwordError.style.fontWeight = '500';
        
        passwordContainer.appendChild(passwordLabel);
        passwordContainer.appendChild(passwordInput);
        passwordContainer.appendChild(passwordNote);
        passwordContainer.appendChild(passwordError);
        
        // Show/hide password field based on checkbox
        privacyCheckbox.addEventListener('change', () => {
            if (privacyCheckbox.checked) {
                passwordContainer.style.display = 'block';
                passwordInput.focus();
            } else {
                passwordContainer.style.display = 'none';
                passwordInput.value = '';
                passwordError.style.display = 'none';
            }
        });
        
        const buttonContainer = this.createButtonContainer();
        const cancelBtn = this.createButton('Cancel', 'secondary');
        const saveBtn = this.createButton('Save', 'primary');
        
        const handleSave = () => {
            const projectName = input.value.trim();
            
            // Clear any previous errors
            errorMsg.style.display = 'none';
            passwordError.style.display = 'none';
            input.style.borderColor = '#e1e8ed';
            passwordInput.style.borderColor = '#e1e8ed';
            
            if (!projectName) {
                errorMsg.textContent = '⚠️ Project name is required';
                errorMsg.style.display = 'block';
                input.style.borderColor = '#e74c3c';
                input.focus();
                return;
            }
            
            const isPrivate = privacyCheckbox.checked;
            const password = isPrivate ? passwordInput.value.trim() : null;
            
            if (isPrivate && !password) {
                passwordError.textContent = '⚠️ Password is required for private projects';
                passwordError.style.display = 'block';
                passwordInput.style.borderColor = '#e74c3c';
                passwordInput.focus();
                return;
            }
            
            const success = onSave(projectName, isPrivate, password);
            if (success !== false) {
                dialog.remove();
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
                if (!privacyCheckbox.checked) {
                    handleSave();
                } else {
                    passwordInput.focus();
                }
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });
        
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleSave();
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });
        
        buttonContainer.appendChild(cancelBtn);
        buttonContainer.appendChild(saveBtn);
        
        dialog.appendChild(nameLabel);
        dialog.appendChild(input);
        dialog.appendChild(errorMsg);
        dialog.appendChild(privacyContainer);
        dialog.appendChild(passwordContainer);
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
        let closeMenuHandler = null;
        const setupCloseHandler = () => {
            closeMenuHandler = function closeMenu(e) {
                if (!menu.contains(e.target) && e.target.id !== 'export-btn') {
                    menu.remove();
                    if (closeMenuHandler) {
                        document.removeEventListener('click', closeMenuHandler);
                        closeMenuHandler = null;
                    }
                }
            };
            document.addEventListener('click', closeMenuHandler);
        };
        setTimeout(setupCloseHandler, 100);
        
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
        let removeColorPickerHandler = null;
        const setupRemoveHandler = () => {
            removeColorPickerHandler = function removeColorPicker() {
                menu.remove();
                if (removeColorPickerHandler) {
                    document.removeEventListener('click', removeColorPickerHandler);
                    removeColorPickerHandler = null;
                }
            };
            document.addEventListener('click', removeColorPickerHandler);
        };
        setTimeout(setupRemoveHandler, 100);        return menu;
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
        let removeMenuHandler = null;
        const setupRemoveHandler = () => {
            removeMenuHandler = function removeMenu() {
                menu.remove();
                if (removeMenuHandler) {
                    document.removeEventListener('click', removeMenuHandler);
                    removeMenuHandler = null;
                }
            };
            document.addEventListener('click', removeMenuHandler);
        };
        setTimeout(setupRemoveHandler, 100);        return menu;
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
        
        const bottomRow = document.createElement('div');
        bottomRow.style.display = 'flex';
        bottomRow.style.justifyContent = 'space-between';
        bottomRow.style.alignItems = 'center';
        bottomRow.style.gap = '8px';
        
        const dateDiv = document.createElement('div');
        dateDiv.textContent = new Date(project.timestamp).toLocaleString();
        dateDiv.style.fontSize = '12px';
        dateDiv.style.color = '#666';
        
        const statusDiv = document.createElement('div');
        const isPrivate = project.isPrivate || false;
        statusDiv.textContent = isPrivate ? 'PRIVATE' : 'PUBLIC';
        statusDiv.style.fontSize = '12px';
        statusDiv.style.fontWeight = 'normal';
        statusDiv.style.padding = '2px 6px';
        statusDiv.style.borderRadius = '3px';
        statusDiv.style.marginLeft = '8px';
        if (isPrivate) {
            statusDiv.style.color = '#e74c3c';
            statusDiv.style.backgroundColor = '#fdf2f2';
            statusDiv.style.border = '1px solid #fcc2c3';
        } else {
            statusDiv.style.color = '#27ae60';
            statusDiv.style.backgroundColor = '#f1f8ff';
            statusDiv.style.border = '1px solid #c3e6cb';
        }
        
        const dateStatusContainer = document.createElement('div');
        dateStatusContainer.style.display = 'flex';
        dateStatusContainer.style.alignItems = 'center';
        dateStatusContainer.appendChild(dateDiv);
        dateStatusContainer.appendChild(statusDiv);
        
        bottomRow.appendChild(dateStatusContainer);
        
        projectInfo.appendChild(nameDiv);
        projectInfo.appendChild(bottomRow);
        
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
            DialogFactory.createConfirmDialog(
                'Delete Project',
                `Are you sure you want to delete project <strong>"${project.name}"</strong>?<br><br>This action cannot be undone.`,
                () => {
                    const success = onDelete(project.name);
                    if (success !== false && refreshList) {
                        refreshList();
                    }
                },
                null,
                'Delete',
                'Cancel'
            );
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

    /**
     * Create new project dialog with privacy options
     */
    static createNewProjectDialog(onConfirm, onCancel) {
        const dialog = this.createBaseDialog('new-project-dialog', 'Create New Project', {
            maxWidth: '450px'
        });
        
        // Project name input
        const nameLabel = document.createElement('label');
        nameLabel.textContent = 'Project Name:';
        nameLabel.style.display = 'block';
        nameLabel.style.marginBottom = '6px';
        nameLabel.style.fontWeight = 'bold';
        nameLabel.style.color = '#333';
        
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Enter project name...';
        nameInput.value = this.generateDefaultProjectName();
        nameInput.maxLength = 200; // Limit project name length
        nameInput.style.width = '100%';
        nameInput.style.padding = '10px 12px';
        nameInput.style.border = '2px solid #e1e8ed';
        nameInput.style.borderRadius = '8px';
        nameInput.style.fontSize = '14px';
        nameInput.style.marginBottom = '8px';
        nameInput.style.boxSizing = 'border-box';
        nameInput.style.transition = 'border-color 0.2s ease';
        
        nameInput.addEventListener('focus', () => {
            nameInput.style.borderColor = '#3498db';
            nameError.style.display = 'none'; // Hide error on focus
        });
        
        nameInput.addEventListener('blur', () => {
            nameInput.style.borderColor = '#e1e8ed';
        });
        
        nameInput.addEventListener('input', () => {
            const currentValue = nameInput.value;
            const sanitizedValue = InputValidator.sanitize(currentValue, 'text');
            const isValid = InputValidator.validateLength(sanitizedValue, 'text') && InputValidator.isSafe(currentValue, 'text');
            
            if (currentValue !== sanitizedValue) {
                nameInput.value = sanitizedValue;
            }
            
            if (sanitizedValue.trim()) {
                nameError.style.display = 'none'; // Hide error when user types
                if (isValid) {
                    nameInput.style.borderColor = '#27ae60'; // Green for valid
                } else {
                    nameInput.style.borderColor = '#f39c12'; // Orange for warnings
                }
            } else {
                nameInput.style.borderColor = '#e1e8ed';
            }
            
            // Show character count for long names
            if (currentValue.length > 20) {
                nameInput.title = `${currentValue.length}/200 characters`;
            } else {
                nameInput.title = '';
            }
        });
        
        // Error message for name validation
        const nameError = document.createElement('div');
        nameError.style.color = '#e74c3c';
        nameError.style.fontSize = '12px';
        nameError.style.marginBottom = '12px';
        nameError.style.display = 'none';
        nameError.style.backgroundColor = '#fdf2f2';
        nameError.style.border = '1px solid #fcc2c3';
        nameError.style.borderRadius = '4px';
        nameError.style.padding = '6px 8px';
        nameError.style.fontWeight = '500';
        
        // Privacy checkbox
        const privacyContainer = document.createElement('div');
        privacyContainer.style.display = 'flex';
        privacyContainer.style.alignItems = 'center';
        privacyContainer.style.marginBottom = '15px';
        privacyContainer.style.padding = '12px';
        privacyContainer.style.backgroundColor = '#f8f9fa';
        privacyContainer.style.borderRadius = '8px';
        privacyContainer.style.border = '1px solid #e9ecef';
        
        const privacyCheckbox = document.createElement('input');
        privacyCheckbox.type = 'checkbox';
        privacyCheckbox.id = 'is-private-checkbox';
        privacyCheckbox.style.marginRight = '10px';
        privacyCheckbox.style.transform = 'scale(1.2)';
        privacyCheckbox.style.cursor = 'pointer';
        
        const privacyLabel = document.createElement('label');
        privacyLabel.htmlFor = 'is-private-checkbox';
        privacyLabel.textContent = 'Make this project private';
        privacyLabel.style.cursor = 'pointer';
        privacyLabel.style.fontWeight = '500';
        privacyLabel.style.color = '#495057';
        
        privacyContainer.appendChild(privacyCheckbox);
        privacyContainer.appendChild(privacyLabel);
        
        // Password input (initially hidden)
        const passwordContainer = document.createElement('div');
        passwordContainer.style.display = 'none';
        passwordContainer.style.marginBottom = '20px';
        
        const passwordLabel = document.createElement('label');
        passwordLabel.textContent = 'Project Password:';
        passwordLabel.style.display = 'block';
        passwordLabel.style.marginBottom = '6px';
        passwordLabel.style.fontWeight = 'bold';
        passwordLabel.style.color = '#333';
        
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter password for private project...';
        passwordInput.style.width = '100%';
        passwordInput.style.padding = '10px 12px';
        passwordInput.style.border = '2px solid #e1e8ed';
        passwordInput.style.borderRadius = '8px';
        passwordInput.style.fontSize = '14px';
        passwordInput.style.boxSizing = 'border-box';
        passwordInput.style.transition = 'border-color 0.2s ease';
        
        passwordInput.addEventListener('focus', () => {
            passwordInput.style.borderColor = '#e74c3c';
            passwordError.style.display = 'none'; // Hide error when user focuses on input
        });
        
        passwordInput.addEventListener('blur', () => {
            passwordInput.style.borderColor = '#e1e8ed';
        });
        
        passwordInput.addEventListener('input', () => {
            if (passwordInput.value.trim()) {
                passwordError.style.display = 'none'; // Hide error when user types
                passwordInput.style.borderColor = '#e74c3c';
            }
        });
        
        const passwordNote = document.createElement('div');
        passwordNote.textContent = '⚠️ Remember this password - it cannot be recovered!';
        passwordNote.style.fontSize = '12px';
        passwordNote.style.color = '#e67e22';
        passwordNote.style.marginTop = '6px';
        passwordNote.style.fontStyle = 'italic';
        
        // Error message for password validation
        const passwordError = document.createElement('div');
        passwordError.style.color = '#e74c3c';
        passwordError.style.fontSize = '12px';
        passwordError.style.marginTop = '6px';
        passwordError.style.display = 'none';
        passwordError.style.backgroundColor = '#fdf2f2';
        passwordError.style.border = '1px solid #fcc2c3';
        passwordError.style.borderRadius = '4px';
        passwordError.style.padding = '6px 8px';
        passwordError.style.fontWeight = '500';
        
        passwordContainer.appendChild(passwordLabel);
        passwordContainer.appendChild(passwordInput);
        passwordContainer.appendChild(passwordNote);
        passwordContainer.appendChild(passwordError);
        
        // Show/hide password field based on checkbox
        privacyCheckbox.addEventListener('change', () => {
            if (privacyCheckbox.checked) {
                passwordContainer.style.display = 'block';
                passwordInput.focus();
            } else {
                passwordContainer.style.display = 'none';
                passwordInput.value = '';
                passwordError.style.display = 'none'; // Hide error when unchecking
            }
        });
        
        // Button container
        const buttonContainer = this.createButtonContainer();
        const cancelBtn = this.createButton('Cancel', 'secondary');
        const createBtn = this.createButton('Create Project', 'primary');
        
        const handleCreate = () => {
            const projectName = nameInput.value.trim();
            
            // Clear any previous errors
            nameError.style.display = 'none';
            passwordError.style.display = 'none';
            nameInput.style.borderColor = '#e1e8ed';
            passwordInput.style.borderColor = '#e1e8ed';
            
            if (!projectName) {
                nameError.textContent = '⚠️ Project name is required';
                nameError.style.display = 'block';
                nameInput.style.borderColor = '#e74c3c';
                nameInput.focus();
                return;
            }
            
            const isPrivate = privacyCheckbox.checked;
            const password = isPrivate ? passwordInput.value.trim() : null;
            
            if (isPrivate && !password) {
                passwordError.textContent = '⚠️ Password is required for private projects';
                passwordError.style.display = 'block';
                passwordInput.style.borderColor = '#e74c3c';
                passwordInput.focus();
                return;
            }
            
            const success = onConfirm(projectName, isPrivate, password);
            if (success !== false) {
                dialog.remove();
            }
        };
        
        const handleCancel = () => {
            dialog.remove();
            if (onCancel) onCancel();
        };
        
        cancelBtn.addEventListener('click', handleCancel);
        createBtn.addEventListener('click', handleCreate);
        
        // Enter key handling
        nameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                if (!privacyCheckbox.checked) {
                    handleCreate();
                } else {
                    passwordInput.focus();
                }
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });
        
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleCreate();
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });
        
        buttonContainer.appendChild(cancelBtn);
        buttonContainer.appendChild(createBtn);
        
        dialog.appendChild(nameLabel);
        dialog.appendChild(nameInput);
        dialog.appendChild(nameError);
        dialog.appendChild(privacyContainer);
        dialog.appendChild(passwordContainer);
        dialog.appendChild(buttonContainer);
        
        document.body.appendChild(dialog);
        nameInput.focus();
        nameInput.select();
        
        return dialog;
    }

    /**
     * Create password verification dialog
     */
    static createPasswordDialog(projectName, onConfirm, onCancel) {
        const dialog = this.createBaseDialog('password-dialog', 'Enter Password', {
            maxWidth: '400px'
        });
        
        const message = document.createElement('div');
        message.innerHTML = `Please enter the password for project:<br><strong>"${projectName}"</strong>`;
        message.style.marginBottom = '20px';
        message.style.textAlign = 'center';
        message.style.color = '#333';
        message.style.lineHeight = '1.5';
        
        const passwordInput = document.createElement('input');
        passwordInput.type = 'password';
        passwordInput.placeholder = 'Enter password...';
        passwordInput.style.width = '100%';
        passwordInput.style.padding = '10px 12px';
        passwordInput.style.border = '2px solid #e1e8ed';
        passwordInput.style.borderRadius = '8px';
        passwordInput.style.fontSize = '14px';
        passwordInput.style.marginBottom = '8px';
        passwordInput.style.boxSizing = 'border-box';
        passwordInput.style.transition = 'border-color 0.2s ease';
        
        passwordInput.addEventListener('focus', () => {
            passwordInput.style.borderColor = '#e74c3c';
            errorMessage.style.display = 'none'; // Hide error on focus
        });
        
        passwordInput.addEventListener('blur', () => {
            passwordInput.style.borderColor = '#e1e8ed';
        });
        
        // Error message container
        const errorMessage = document.createElement('div');
        errorMessage.style.color = '#e74c3c';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.marginBottom = '12px';
        errorMessage.style.display = 'none';
        errorMessage.style.backgroundColor = '#fdf2f2';
        errorMessage.style.border = '1px solid #fcc2c3';
        errorMessage.style.borderRadius = '4px';
        errorMessage.style.padding = '8px 10px';
        errorMessage.style.fontWeight = '500';
        
        const buttonContainer = this.createButtonContainer();
        const cancelBtn = this.createButton('Cancel', 'secondary');
        const unlockBtn = this.createButton('Unlock', 'primary');
        
        const showError = (message) => {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            passwordInput.style.borderColor = '#e74c3c';
            passwordInput.focus();
        };
        
        const handleUnlock = () => {
            const password = passwordInput.value.trim();
            if (!password) {
                showError('⚠️ Password cannot be empty');
                return;
            }
            
            const success = onConfirm(password);
            if (success !== false) {
                dialog.remove();
            } else {
                showError('❌ Incorrect password. Please try again.');
                passwordInput.value = '';
            }
        };
        
        const handleCancel = () => {
            dialog.remove();
            if (onCancel) onCancel();
        };
        
        cancelBtn.addEventListener('click', handleCancel);
        unlockBtn.addEventListener('click', handleUnlock);
        
        passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleUnlock();
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });
        
        buttonContainer.appendChild(cancelBtn);
        buttonContainer.appendChild(unlockBtn);
        
        dialog.appendChild(message);
        dialog.appendChild(passwordInput);
        dialog.appendChild(errorMessage);
        dialog.appendChild(buttonContainer);
        
        document.body.appendChild(dialog);
        passwordInput.focus();
        
        return dialog;
    }

    /**
     * Create confirmation dialog
     */
    static createConfirmDialog(title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel') {
        const dialog = this.createBaseDialog('confirm-dialog', title, {
            maxWidth: '450px'
        });
        
        const messageDiv = document.createElement('div');
        messageDiv.innerHTML = message;
        messageDiv.style.marginBottom = '20px';
        messageDiv.style.color = '#333';
        messageDiv.style.lineHeight = '1.5';
        messageDiv.style.textAlign = 'center';
        
        const buttonContainer = this.createButtonContainer();
        const cancelBtn = this.createButton(cancelText, 'secondary');
        const confirmBtn = this.createButton(confirmText, 'primary');
        
        // Style confirm button as warning if it's destructive action
        if (confirmText.toLowerCase().includes('delete') || 
            confirmText.toLowerCase().includes('clear') || 
            confirmText.toLowerCase().includes('overwrite')) {
            confirmBtn.style.background = '#e74c3c';
        }
        
        const handleConfirm = () => {
            dialog.remove();
            document.removeEventListener('keydown', handleKeydown);
            if (onConfirm) onConfirm();
        };
        
        const handleCancel = () => {
            dialog.remove();
            document.removeEventListener('keydown', handleKeydown);
            if (onCancel) onCancel();
        };
        
        cancelBtn.addEventListener('click', handleCancel);
        confirmBtn.addEventListener('click', handleConfirm);
        
        // ESC to cancel
        const handleKeydown = (e) => {
            if (e.key === 'Escape') {
                handleCancel();
            }
        };
        document.addEventListener('keydown', handleKeydown);
        
        buttonContainer.appendChild(cancelBtn);
        buttonContainer.appendChild(confirmBtn);
        
        dialog.appendChild(messageDiv);
        dialog.appendChild(buttonContainer);
        
        document.body.appendChild(dialog);
        
        // Focus confirm button for destructive actions, cancel for others
        if (confirmBtn.style.background === '#e74c3c') {
            cancelBtn.focus();
        } else {
            confirmBtn.focus();
        }
        
        return dialog;
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
