document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('drawCanvas');
    const ctx = canvas.getContext('2d');

    let nodes = [];
    let nodeCounter = 1;
    let transitions = [];
    let draggingType = null;
    let isDrawingTransition = false;
    let isDraggingNode = false;
    let dragOffset = {x:0, y:0};
    let selectedNode = null;
    let selectedElement = null;
    let selectedType = null;
    let editingNode = null;
    let editingText = null;
    let transitionType = 'right'; // 'right', 'both', 'line'

// Add event listener for clear all projects button
const clearAllProjectsBtn = document.getElementById('clear-all-projects-btn');
if (clearAllProjectsBtn) {
    clearAllProjectsBtn.addEventListener('click', () => {
        clearAllProjects();
    });
}

// Add event listener for project search
const projectSearchInput = document.getElementById('project-search');
if (projectSearchInput) {
    projectSearchInput.addEventListener('input', () => {
        currentPage = 1; // Reset to first page when searching
        updateRecentProjectsList();
    });
}

// Drag start for options
const nodeOption = document.getElementById('node');
const arrowRightOption = document.getElementById('arrow-right');
const arrowBothOption = document.getElementById('arrow-both');
const lineOption = document.getElementById('line');
const startOption = document.getElementById('start');
const stopOption = document.getElementById('stop');
const ifOption = document.getElementById('if');

nodeOption.addEventListener('dragstart', (e) => {
    draggingType = 'node';
});
arrowRightOption.addEventListener('dragstart', (e) => {
    draggingType = 'transition';
    transitionType = 'right';
});
arrowBothOption.addEventListener('dragstart', (e) => {
    draggingType = 'transition';
    transitionType = 'both';
});
lineOption.addEventListener('dragstart', (e) => {
    draggingType = 'transition';
    transitionType = 'line';
});
startOption.addEventListener('dragstart', (e) => {
    draggingType = 'start';
});
stopOption.addEventListener('dragstart', (e) => {
    draggingType = 'stop';
});
ifOption.addEventListener('dragstart', (e) => {
    draggingType = 'if';
});

canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (draggingType === 'node') {
        nodes.push({x, y, r:30, id:Date.now(), label: `Node ${nodeCounter++}`, color: '#b3d1ff'});
        requestAnimationFrame(() => {
            draw();
        });
    } else if (draggingType === 'start') {
        nodes.push({x, y, r:30, id:Date.now(), label: 'START', color: '#27ae60', type: 'start'});
        requestAnimationFrame(() => {
            draw();
        });
    } else if (draggingType === 'stop') {
        nodes.push({x, y, r:30, id:Date.now(), label: 'STOP', color: '#e74c3c', type: 'stop'});
        requestAnimationFrame(() => {
            draw();
        });
    } else if (draggingType === 'if') {
        const ifNode = {x, y, r:35, id:Date.now(), label: 'IF', color: '#f39c12', type: 'if', rotation: 0}; // Dodaj rotation: 0 (poziomo), 90 (pionowo)
        nodes.push(ifNode);
        
        // Automatycznie stwórz węzły TRUE i FALSE - pozycja zależy od rotacji
        let trueNode, falseNode;
        if (ifNode.rotation === 90) {
            // Rotacja pionowa: TRUE na górze, FALSE na dole
            trueNode = {x: x, y: y - 120, r:30, id:Date.now() + 1, label: 'TRUE', color: '#27ae60', type: 'node'};
            falseNode = {x: x, y: y + 120, r:30, id:Date.now() + 2, label: 'FALSE', color: '#e74c3c', type: 'node'};
        } else {
            // Rotacja pozioma (domyślna): TRUE po lewej, FALSE po prawej
            trueNode = {x: x - 120, y: y - 60, r:30, id:Date.now() + 1, label: 'TRUE', color: '#27ae60', type: 'node'};
            falseNode = {x: x + 120, y: y + 60, r:30, id:Date.now() + 2, label: 'FALSE', color: '#e74c3c', type: 'node'};
        }
        
        nodes.push(trueNode);
        nodes.push(falseNode);
        
        // Stwórz przejścia IF -> TRUE i IF -> FALSE z określonymi punktami wyjścia
        const trueCorner = ifNode.rotation === 90 ? 'top' : 'left';
        const falseCorner = ifNode.rotation === 90 ? 'bottom' : 'right';
        
        transitions.push({
            from: ifNode,
            to: trueNode,
            label: 'TRUE',
            type: 'right',
            fromCorner: trueCorner // Wyjście z odpowiedniego rogu w zależności od rotacji
        });
        
        transitions.push({
            from: ifNode,
            to: falseNode,
            label: 'FALSE',
            type: 'right',
            fromCorner: falseCorner // Wyjście z odpowiedniego rogu w zależności od rotacji
        });
        
        requestAnimationFrame(() => {
            draw();
        });
    } else if (draggingType === 'transition') {
        isDrawingTransition = true;
        showTransitionMode(true);
    } else if (draggingType === 'text') {
        texts.push({x, y, label: 'placeholder1', id: Date.now()});
        requestAnimationFrame(draw);
    }
    draggingType = null;
});

const textOption = document.getElementById('text');
let texts = [];
let selectedText = null;
let isDraggingText = false;

textOption.addEventListener('dragstart', (e) => {
    draggingType = 'text';
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    selectedNode = nodes.find(node => {
        if (node.type === 'start' || node.type === 'stop') {
            // Check ellipse collision for start/stop nodes
            const dx = (x - node.x) / (node.r * 1.5);
            const dy = (y - node.y) / (node.r * 0.8);
            return (dx * dx + dy * dy) <= 1;
        } else if (node.type === 'if') {
            // Check diamond collision for if nodes
            const dx = Math.abs(x - node.x);
            const dy = Math.abs(y - node.y);
            return (dx / node.r + dy / node.r) <= 1;
        } else {
            // Check circle collision for regular nodes
            return Math.hypot(node.x - x, node.y - y) < node.r;
        }
    });
    if (selectedNode) {
        isDraggingNode = true;
        dragOffset.x = x - selectedNode.x;
        dragOffset.y = y - selectedNode.y;
        selectedElement = selectedNode;
        selectedType = 'node';
        draw();
    } else {
        selectedText = texts.find(text => {
            ctx.font = '18px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            const width = ctx.measureText(text.label).width;
            return (
                x >= text.x - width / 2 - 8 &&
                x <= text.x + width / 2 + 8 &&
                y >= text.y - 16 &&
                y <= text.y + 16
            );
        });
        if (selectedText) {
            isDraggingText = true;
            dragOffset.x = x - selectedText.x;
            dragOffset.y = y - selectedText.y;
            selectedElement = selectedText;
            selectedType = 'text';
            draw();
        } else {
            // Check for transition selection (line proximity)
            let foundTransition = null;
            transitions.forEach(tr => {
                // Calculate distance from mouse to line segment
                const dist = pointToSegmentDistance(x, y, tr.from.x, tr.from.y, tr.to.x, tr.to.y);
                if (dist < 10) foundTransition = tr;
            });
            if (foundTransition) {
                selectedElement = foundTransition;
                selectedType = 'transition';
                draw();
            } else {
                selectedElement = null;
                selectedType = null;
                draw();
            }
        }
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDraggingNode && selectedNode) {
        const rect = canvas.getBoundingClientRect();
        selectedNode.x = e.clientX - rect.left - dragOffset.x;
        selectedNode.y = e.clientY - rect.top - dragOffset.y;
        
        // If moving an IF node, update associated TRUE/FALSE nodes positions
        if (selectedNode.type === 'if') {
            updateIFNodeConnections(selectedNode);
        }
        
        draw();
    } else if (isDraggingText && selectedText) {
        const rect = canvas.getBoundingClientRect();
        selectedText.x = e.clientX - rect.left - dragOffset.x;
        selectedText.y = e.clientY - rect.top - dragOffset.y;
        draw();
    }
});

canvas.addEventListener('mouseup', () => {
    isDraggingNode = false;
    selectedNode = null;
    isDraggingText = false;
    selectedText = null;
});

// Right-click context menu for changing node colors
canvas.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const node = nodes.find(node => {
        if (node.type === 'start' || node.type === 'stop') {
            // Check ellipse collision for start/stop nodes
            const dx = (x - node.x) / (node.r * 1.5);
            const dy = (y - node.y) / (node.r * 0.8);
            return (dx * dx + dy * dy) <= 1;
        } else if (node.type === 'if') {
            // Check diamond collision for if nodes
            const dx = Math.abs(x - node.x);
            const dy = Math.abs(y - node.y);
            return (dx / node.r + dy / node.r) <= 1;
        } else {
            // Check circle collision for regular nodes
            return Math.hypot(node.x - x, node.y - y) < node.r;
        }
    });
    if (node) {
        if (node.type === 'if') {
            showIFOptions(node, e.clientX, e.clientY);
        } else {
            showColorPicker(node, e.clientX, e.clientY);
        }
    }
});

function showColorPicker(node, x, y) {
    // Remove existing color picker if any
    const existing = document.getElementById('color-picker-menu');
    if (existing) existing.remove();
    
    const colorMenu = document.createElement('div');
    colorMenu.id = 'color-picker-menu';
    colorMenu.style.position = 'absolute';
    colorMenu.style.left = `${x}px`;
    colorMenu.style.top = `${y}px`;
    colorMenu.style.background = '#fff';
    colorMenu.style.border = '1px solid #ccc';
    colorMenu.style.borderRadius = '6px';
    colorMenu.style.padding = '8px';
    colorMenu.style.zIndex = '1000';
    colorMenu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    colorMenu.style.display = 'flex';
    colorMenu.style.flexWrap = 'wrap';
    colorMenu.style.width = '180px';
    
    const colors = [
        // Pastelowe kolory (pierwsza linia)
        '#b3d1ff', '#ffb3b3', '#b3ffb3', '#ffdfb3', '#ffb3ff', '#b3ffff',
        // Kolejne pastelowe (druga linia)
        '#d1b3ff', '#fff3b3', '#ffc1cc', '#c1ffc1', '#c1c1ff', '#ffc1e1',
        // Intensywne kolory (trzecia linia)
        '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b',
        // Kolejne intensywne (czwarta linia)
        '#6c5ce7', '#a29bfe', '#fd79a8', '#e17055', '#00b894', '#00cec9',
        // Ciemne kolory (piąta linia)
        '#2d3436', '#636e72', '#74b9ff', '#81ecec', '#00b894', '#fdcb6e',
        // Podstawowe (szósta linia)
        '#ffffff', '#000000', '#c0c0c0', '#808080', '#dfe6e9', '#b2bec3'
    ];
    
    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.style.width = '20px';
        colorBox.style.height = '20px';
        colorBox.style.backgroundColor = color;
        colorBox.style.border = '1px solid #666';
        colorBox.style.margin = '2px';
        colorBox.style.cursor = 'pointer';
        colorBox.style.borderRadius = '3px';
        
        colorBox.addEventListener('click', () => {
            node.color = color;
            draw();
            colorMenu.remove();
        });
        
        colorMenu.appendChild(colorBox);
    });
    
    // Add custom color picker
    const customColorContainer = document.createElement('div');
    customColorContainer.style.width = '100%';
    customColorContainer.style.marginTop = '8px';
    customColorContainer.style.borderTop = '1px solid #ddd';
    customColorContainer.style.paddingTop = '8px';
    customColorContainer.style.display = 'flex';
    customColorContainer.style.alignItems = 'center';
    
    const customLabel = document.createElement('span');
    customLabel.textContent = 'Custom:';
    customLabel.style.fontSize = '12px';
    customLabel.style.marginRight = '6px';
    customLabel.style.color = '#333';
    
    const customColorInput = document.createElement('input');
    customColorInput.type = 'color';
    customColorInput.style.width = '30px';
    customColorInput.style.height = '25px';
    customColorInput.style.border = 'none';
    customColorInput.style.cursor = 'pointer';
    customColorInput.style.borderRadius = '3px';
    customColorInput.value = node.color || '#b3d1ff';
    
    customColorInput.addEventListener('change', (e) => {
        node.color = e.target.value;
        draw();
        colorMenu.remove();
    });
    
    customColorContainer.appendChild(customLabel);
    customColorContainer.appendChild(customColorInput);
    colorMenu.appendChild(customColorContainer);
    
    document.body.appendChild(colorMenu);
    
    // Remove color picker when clicking elsewhere
    setTimeout(() => {
        document.addEventListener('click', function removeColorPicker() {
            colorMenu.remove();
            document.removeEventListener('click', removeColorPicker);
        });
    }, 100);
}

function showIFOptions(node, x, y) {
    // Remove existing menu if any
    const existing = document.getElementById('if-options-menu');
    if (existing) existing.remove();
    
    const optionsMenu = document.createElement('div');
    optionsMenu.id = 'if-options-menu';
    optionsMenu.style.position = 'absolute';
    optionsMenu.style.left = `${x}px`;
    optionsMenu.style.top = `${y}px`;
    optionsMenu.style.background = '#fff';
    optionsMenu.style.border = '1px solid #ccc';
    optionsMenu.style.borderRadius = '6px';
    optionsMenu.style.padding = '8px';
    optionsMenu.style.zIndex = '1000';
    optionsMenu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    optionsMenu.style.minWidth = '120px';
    
    // Rotation button
    const rotateBtn = document.createElement('div');
    rotateBtn.innerHTML = node.rotation === 90 ? 'Rotate to Horizontal' : 'Rotate to Vertical';
    rotateBtn.style.padding = '8px 12px';
    rotateBtn.style.cursor = 'pointer';
    rotateBtn.style.borderBottom = '1px solid #eee';
    rotateBtn.style.fontSize = '14px';
    
    rotateBtn.addEventListener('click', () => {
        rotateIFNode(node);
        optionsMenu.remove();
    });
    
    // Color picker option
    const colorBtn = document.createElement('div');
    colorBtn.innerHTML = 'Change Color';
    colorBtn.style.padding = '8px 12px';
    colorBtn.style.cursor = 'pointer';
    colorBtn.style.fontSize = '14px';
    
    colorBtn.addEventListener('click', () => {
        optionsMenu.remove();
        showColorPicker(node, x, y);
    });
    
    optionsMenu.appendChild(rotateBtn);
    optionsMenu.appendChild(colorBtn);
    document.body.appendChild(optionsMenu);
    
    // Remove menu when clicking elsewhere
    setTimeout(() => {
        document.addEventListener('click', function removeMenu() {
            optionsMenu.remove();
            document.removeEventListener('click', removeMenu);
        });
    }, 100);
}

function rotateIFNode(ifNode) {
    // Toggle rotation between 0 (horizontal) and 90 (vertical)
    ifNode.rotation = ifNode.rotation === 90 ? 0 : 90;
    
    // Find associated TRUE and FALSE nodes and transitions
    const trueTransition = transitions.find(tr => tr.from === ifNode && tr.label === 'TRUE');
    const falseTransition = transitions.find(tr => tr.from === ifNode && tr.label === 'FALSE');
    
    if (trueTransition && falseTransition) {
        const trueNode = trueTransition.to;
        const falseNode = falseTransition.to;
        
        // Reposition nodes based on new rotation
        if (ifNode.rotation === 90) {
            // Vertical: TRUE on top, FALSE on bottom
            trueNode.x = ifNode.x;
            trueNode.y = ifNode.y - 120;
            falseNode.x = ifNode.x;
            falseNode.y = ifNode.y + 120;
            trueTransition.fromCorner = 'top';
            falseTransition.fromCorner = 'bottom';
        } else {
            // Horizontal: TRUE on left, FALSE on right
            trueNode.x = ifNode.x - 120;
            trueNode.y = ifNode.y - 60;
            falseNode.x = ifNode.x + 120;
            falseNode.y = ifNode.y + 60;
            trueTransition.fromCorner = 'left';
            falseTransition.fromCorner = 'right';
        }
    }
    
    draw();
}

function updateIFNodeConnections(ifNode) {
    // Find all transitions going from the IF node
    const outgoingTransitions = transitions.filter(tr => tr.from === ifNode);
    
    if (outgoingTransitions.length >= 2) {
        // Take the first two transitions (should be TRUE and FALSE or equivalent)
        const firstTransition = outgoingTransitions[0];
        const secondTransition = outgoingTransitions[1];
        
        const firstNode = firstTransition.to;
        const secondNode = secondTransition.to;
        
        // Reposition nodes based on current rotation, maintaining the same relative positions
        if (ifNode.rotation === 90) {
            // Vertical: first node on top, second node on bottom
            firstNode.x = ifNode.x;
            firstNode.y = ifNode.y - 120;
            secondNode.x = ifNode.x;
            secondNode.y = ifNode.y + 120;
        } else {
            // Horizontal: first node on left, second node on right
            firstNode.x = ifNode.x - 120;
            firstNode.y = ifNode.y - 60;
            secondNode.x = ifNode.x + 120;
            secondNode.y = ifNode.y + 60;
        }
    }
}

// Transition drawing: after dropping Transition, click two nodes to draw a line
let transitionStart = null;
canvas.addEventListener('click', (e) => {
    if (isDrawingTransition) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const node = nodes.find(node => {
            if (node.type === 'start' || node.type === 'stop') {
                // Check ellipse collision for start/stop nodes
                const dx = (x - node.x) / (node.r * 1.5);
                const dy = (y - node.y) / (node.r * 0.8);
                return (dx * dx + dy * dy) <= 1;
            } else if (node.type === 'if') {
                // Check diamond collision for if nodes
                const dx = Math.abs(x - node.x);
                const dy = Math.abs(y - node.y);
                return (dx / node.r + dy / node.r) <= 1;
            } else {
                // Check circle collision for regular nodes
                return Math.hypot(node.x - x, node.y - y) < node.r;
            }
        });
        if (node) {
            if (!transitionStart) {
                transitionStart = node;
            } else if (transitionStart !== node) {
                transitions.push({
                    from: transitionStart, 
                    to: node, 
                    label: 'relation',
                    type: transitionType
                });
                transitionStart = null;
                draw();
                isDrawingTransition = false;
                showTransitionMode(false);
            }
        }
    }
});

// Info about transition mode
function showTransitionMode(show) {
    let info = document.getElementById('transition-info');
    if (!info) {
        info = document.createElement('div');
        info.id = 'transition-info';
        info.style.position = 'absolute';
        info.style.top = '10px';
        info.style.right = '30px';
        info.style.background = '#ffe0e0';
        info.style.color = '#a00';
        info.style.padding = '8px 16px';
        info.style.borderRadius = '6px';
        info.style.zIndex = '10';
        info.style.fontWeight = 'bold';
        info.innerText = 'Tryb rysowania relacji: kliknij dwa węzły';
        document.body.appendChild(info);
    }
    info.style.display = show ? 'block' : 'none';
}

// Node label editing (inline input)
canvas.addEventListener('dblclick', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const node = nodes.find(node => {
        if (node.type === 'start' || node.type === 'stop') {
            // Check ellipse collision for start/stop nodes
            const dx = (x - node.x) / (node.r * 1.5);
            const dy = (y - node.y) / (node.r * 0.8);
            return (dx * dx + dy * dy) <= 1;
        } else if (node.type === 'if') {
            // Check diamond collision for if nodes
            const dx = Math.abs(x - node.x);
            const dy = Math.abs(y - node.y);
            return (dx / node.r + dy / node.r) <= 1;
        } else {
            // Check circle collision for regular nodes
            return Math.hypot(node.x - x, node.y - y) < node.r;
        }
    });
    if (node) {
        editingNode = node;
        showNodeInput(node);
        selectedElement = node;
        selectedType = 'node';
        draw();
        return;
    }
    const text = texts.find(text => {
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const width = ctx.measureText(text.label).width;
        return (
            x >= text.x - width / 2 - 8 &&
            x <= text.x + width / 2 + 8 &&
            y >= text.y - 16 &&
            y <= text.y + 16
        );
    });
    if (text) {
        editingText = text;
        showTextInput(text);
        selectedElement = text;
        selectedType = 'text';
        draw();
        return;
    }
    // Check for transition (line or label proximity)
    let foundTransition = null;
    transitions.forEach(tr => {
        // Check line proximity
        const distLine = pointToSegmentDistance(x, y, tr.from.x, tr.from.y, tr.to.x, tr.to.y);
        // Check label proximity
        const midX = (tr.from.x + tr.to.x) / 2;
        const midY = (tr.from.y + tr.to.y) / 2 - 18;
        const distLabel = Math.hypot(x - midX, y - midY);
        if (distLine < 10 || distLabel < 40) foundTransition = tr;
    });
    if (foundTransition) {
        editingTransition = foundTransition;
        showTransitionInput(foundTransition);
        selectedElement = foundTransition;
        selectedType = 'transition';
        draw();
    }
});

function showNodeInput(node) {
    let input = document.getElementById('node-label-input');
    if (!input) {
        input = document.createElement('input');
        input.type = 'text';
        input.id = 'node-label-input';
        input.style.position = 'absolute';
        input.style.zIndex = '20';
        input.style.fontSize = '16px';
        input.style.textAlign = 'center';
        input.style.padding = '2px 6px';
        input.style.borderRadius = '4px';
        input.style.border = '1px solid #888';
        document.body.appendChild(input);
    }
    input.value = node.label;
    input.style.display = 'block';
    // Position input above node
    const canvasRect = canvas.getBoundingClientRect();
    input.style.left = `${canvasRect.left + node.x - 60}px`;
    input.style.top = `${canvasRect.top + node.y - node.r - 32}px`;
    input.style.width = '120px';
    input.focus();
    input.onblur = () => {
        if (editingNode) {
            editingNode.label = input.value.trim() || editingNode.label;
            editingNode = null;
            input.style.display = 'none';
            draw();
        }
    };
    input.onkeydown = (ev) => {
        if (ev.key === 'Enter') {
            input.blur();
        }
    };
}

function showTextInput(text) {
    let input = document.getElementById('text-label-input');
    if (!input) {
        input = document.createElement('input');
        input.type = 'text';
        input.id = 'text-label-input';
        input.style.position = 'absolute';
        input.style.zIndex = '20';
        input.style.fontSize = '18px';
        input.style.textAlign = 'center';
        input.style.padding = '2px 6px';
        input.style.borderRadius = '4px';
        input.style.border = '1px solid #888';
        document.body.appendChild(input);
    }
    input.value = text.label;
    input.style.display = 'block';
    // Position input centered on text
    const canvasRect = canvas.getBoundingClientRect();
    input.style.left = `${canvasRect.left + text.x - 60}px`;
    input.style.top = `${canvasRect.top + text.y - 22}px`;
    input.style.width = '120px';
    input.focus();
    input.onblur = () => {
        if (editingText) {
            editingText.label = input.value.trim() || editingText.label;
            editingText = null;
            input.style.display = 'none';
            draw();
        }
    };
    input.onkeydown = (ev) => {
        if (ev.key === 'Enter') {
            input.blur();
        }
    };
}

let editingTransition = null;
function showTransitionInput(tr) {
    let input = document.getElementById('transition-label-input');
    if (!input) {
        input = document.createElement('input');
        input.type = 'text';
        input.id = 'transition-label-input';
        input.style.position = 'absolute';
        input.style.zIndex = '20';
        input.style.fontSize = '16px';
        input.style.textAlign = 'center';
        input.style.padding = '2px 6px';
        input.style.borderRadius = '4px';
        input.style.border = '1px solid #888';
        document.body.appendChild(input);
    }
    input.value = tr.label || '';
    input.style.display = 'block';
    // Position input above the midpoint of the transition
    const canvasRect = canvas.getBoundingClientRect();
    const midX = (tr.from.x + tr.to.x) / 2;
    const midY = (tr.from.y + tr.to.y) / 2 - 28;
    input.style.left = `${canvasRect.left + midX - 60}px`;
    input.style.top = `${canvasRect.top + midY - 22}px`;
    input.style.width = '120px';
    input.focus();
    input.onblur = () => {
        if (editingTransition) {
            editingTransition.label = input.value.trim() || editingTransition.label;
            editingTransition = null;
            input.style.display = 'none';
            draw();
        }
    };
    input.onkeydown = (ev) => {
        if (ev.key === 'Enter') {
            input.blur();
        }
    };
}

// Helper: distance from point to line segment
function pointToSegmentDistance(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    let param = -1;
    if (len_sq !== 0) param = dot / len_sq;
    let xx, yy;
    if (param < 0) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }
    const dx = px - xx;
    const dy = py - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

// Add Remove button on the left side
const removeBtn = document.createElement('button');
removeBtn.id = 'remove-btn';
removeBtn.innerHTML = '<span style="font-size:1.1rem;vertical-align:middle;">&#10006;</span> <span style="font-size:0.85rem;vertical-align:middle;">Remove</span>';
removeBtn.style.position = 'absolute';
removeBtn.style.left = '20px'; // Position on the left side
removeBtn.style.bottom = '12px';
removeBtn.style.padding = '9px 19px';
removeBtn.style.background = '#e74c3c';
removeBtn.style.color = '#fff';
removeBtn.style.border = 'none';
removeBtn.style.borderRadius = '6px';
removeBtn.style.fontWeight = 'bold';
removeBtn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
removeBtn.style.cursor = 'pointer';
removeBtn.style.display = 'none';
removeBtn.style.zIndex = '30';
document.body.appendChild(removeBtn);

// Add Export button - always visible
const exportBtn = document.createElement('button');
exportBtn.id = 'export-btn';
exportBtn.innerHTML = '<span style="font-size:1.1rem;vertical-align:middle;">💾</span> <span style="font-size:0.85rem;vertical-align:middle;">Export</span>';
exportBtn.style.position = 'absolute';
exportBtn.style.right = '20px';
exportBtn.style.bottom = '12px';
exportBtn.style.padding = '9px 19px';
exportBtn.style.background = '#27ae60';
exportBtn.style.color = '#fff';
exportBtn.style.border = 'none';
exportBtn.style.borderRadius = '6px';
exportBtn.style.fontWeight = 'bold';
exportBtn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
exportBtn.style.cursor = 'pointer';
exportBtn.style.display = 'block';
exportBtn.style.zIndex = '30';
document.body.appendChild(exportBtn);

// Add Clear button next to Export button
const clearBtn = document.createElement('button');
clearBtn.id = 'clear-btn';
clearBtn.innerHTML = '<span style="font-size:1.1rem;vertical-align:middle;">🗑️</span> <span style="font-size:0.85rem;vertical-align:middle;">Clear</span>';
clearBtn.style.position = 'absolute';
clearBtn.style.right = '140px'; // Position to the left of Export button
clearBtn.style.bottom = '12px';
clearBtn.style.padding = '9px 19px';
clearBtn.style.background = '#e74c3c';
clearBtn.style.color = '#fff';
clearBtn.style.border = 'none';
clearBtn.style.borderRadius = '6px';
clearBtn.style.fontWeight = 'bold';
clearBtn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
clearBtn.style.cursor = 'pointer';
clearBtn.style.display = 'block';
clearBtn.style.zIndex = '30';
document.body.appendChild(clearBtn);

// Add Save button
const saveBtn = document.createElement('button');
saveBtn.id = 'save-btn';
saveBtn.innerHTML = '<span style="font-size:1.1rem;vertical-align:middle;">💾</span> <span style="font-size:0.85rem;vertical-align:middle;">Save</span>';
saveBtn.style.position = 'absolute';
saveBtn.style.right = '260px'; // Position to the left of Clear button
saveBtn.style.bottom = '12px';
saveBtn.style.padding = '9px 19px';
saveBtn.style.background = '#3498db';
saveBtn.style.color = '#fff';
saveBtn.style.border = 'none';
saveBtn.style.borderRadius = '6px';
saveBtn.style.fontWeight = 'bold';
saveBtn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
saveBtn.style.cursor = 'pointer';
saveBtn.style.display = 'block';
saveBtn.style.zIndex = '30';
document.body.appendChild(saveBtn);

// Add Load button
const loadBtn = document.createElement('button');
loadBtn.id = 'load-btn';
loadBtn.innerHTML = '<span style="font-size:1.1rem;vertical-align:middle;">📁</span> <span style="font-size:0.85rem;vertical-align:middle;">Load</span>';
loadBtn.style.position = 'absolute';
loadBtn.style.right = '380px'; // Position to the left of Save button
loadBtn.style.bottom = '12px';
loadBtn.style.padding = '9px 19px';
loadBtn.style.background = '#9b59b6';
loadBtn.style.color = '#fff';
loadBtn.style.border = 'none';
loadBtn.style.borderRadius = '6px';
loadBtn.style.fontWeight = 'bold';
loadBtn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
loadBtn.style.cursor = 'pointer';
loadBtn.style.display = 'block';
loadBtn.style.zIndex = '30';
document.body.appendChild(loadBtn);

// Add New Project button
const newBtn = document.createElement('button');
newBtn.id = 'new-btn';
newBtn.innerHTML = '<span style="font-size:1.1rem;vertical-align:middle;">📄</span> <span style="font-size:0.85rem;vertical-align:middle;">New</span>';
newBtn.style.position = 'absolute';
newBtn.style.right = '500px'; // Position to the left of Load button
newBtn.style.bottom = '12px';
newBtn.style.padding = '9px 19px';
newBtn.style.background = '#2ecc71';
newBtn.style.color = '#fff';
newBtn.style.border = 'none';
newBtn.style.borderRadius = '6px';
newBtn.style.fontWeight = 'bold';
newBtn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
newBtn.style.cursor = 'pointer';
newBtn.style.display = 'block';
newBtn.style.zIndex = '30';
document.body.appendChild(newBtn);

// Add Import button
const importBtn = document.createElement('button');
importBtn.id = 'import-btn';
importBtn.innerHTML = '<span style="font-size:1.1rem;vertical-align:middle;">📥</span> <span style="font-size:0.85rem;vertical-align:middle;">Import</span>';
importBtn.style.position = 'absolute';
importBtn.style.right = '620px'; // Position further left with more space from New button
importBtn.style.bottom = '12px';
importBtn.style.padding = '9px 19px';
importBtn.style.background = '#9b59b6';
importBtn.style.color = '#fff';
importBtn.style.border = 'none';
importBtn.style.borderRadius = '6px';
importBtn.style.fontWeight = 'bold';
importBtn.style.boxShadow = '0 1px 6px rgba(0,0,0,0.10)';
importBtn.style.cursor = 'pointer';
importBtn.style.display = 'block';
importBtn.style.zIndex = '30';
document.body.appendChild(importBtn);

removeBtn.addEventListener('click', () => {
    if (selectedElement) {
        if (selectedType === 'node') {
            nodes = nodes.filter(n => n !== selectedElement);
            transitions = transitions.filter(tr => tr.from !== selectedElement && tr.to !== selectedElement);
        } else if (selectedType === 'text') {
            texts = texts.filter(t => t !== selectedElement);
        } else if (selectedType === 'transition') {
            transitions = transitions.filter(tr => tr !== selectedElement);
        }
        selectedElement = null;
        selectedType = null;
        draw();
        updateRemoveBtn();
    }
});

exportBtn.addEventListener('click', () => {
    showExportOptions();
});

importBtn.addEventListener('click', () => {
    showImportDialog();
});

clearBtn.addEventListener('click', () => {
    // Show confirmation dialog before clearing
    const confirmed = confirm('Are you sure you want to clear all elements from the canvas? This action cannot be undone.');
    if (confirmed) {
        // Clear all arrays
        nodes = [];
        transitions = [];
        texts = [];
        
        // Reset counters
        nodeCounter = 1;
        
        // Clear current project
        currentProject = null;
        
        // Clear any selections
        selectedElement = null;
        selectedType = null;
        selectedNode = null;
        selectedText = null;
        editingNode = null;
        editingText = null;
        editingTransition = null;
        
        // Clear any active input fields
        const nodeInput = document.getElementById('node-label-input');
        const textInput = document.getElementById('text-label-input');
        const transitionInput = document.getElementById('transition-label-input');
        if (nodeInput) nodeInput.style.display = 'none';
        if (textInput) textInput.style.display = 'none';
        if (transitionInput) transitionInput.style.display = 'none';
        
        // Redraw empty canvas
        draw();
        
        // Update button states
        updateRemoveBtn();
        
        // Update recent projects list to remove highlighting
        updateRecentProjectsList();
    }
});

saveBtn.addEventListener('click', () => {
    showSaveDialog();
});

loadBtn.addEventListener('click', () => {
    showLoadDialog();
});

newBtn.addEventListener('click', () => {
    // Show confirmation dialog before creating new project if canvas is not empty
    const hasContent = nodes.length > 0 || transitions.length > 0 || texts.length > 0;
    
    if (hasContent) {
        const confirmed = confirm('Are you sure you want to create a new project? All unsaved changes will be lost.');
        if (!confirmed) {
            return;
        }
    }
    
    // Clear all arrays
    nodes = [];
    transitions = [];
    texts = [];
    
    // Reset counters
    nodeCounter = 1;
    
    // Clear current project
    currentProject = null;
    
    // Clear any selections
    selectedElement = null;
    selectedType = null;
    selectedNode = null;
    selectedText = null;
    editingNode = null;
    editingText = null;
    editingTransition = null;
    
    // Clear any active input fields
    const nodeInput = document.getElementById('node-label-input');
    const textInput = document.getElementById('text-label-input');
    const transitionInput = document.getElementById('transition-label-input');
    if (nodeInput) nodeInput.style.display = 'none';
    if (textInput) textInput.style.display = 'none';
    if (transitionInput) transitionInput.style.display = 'none';
    
    // Redraw empty canvas
    draw();
    
    // Update button states
    updateRemoveBtn();
    
    // Update project name display
    updateProjectNameDisplay();
    
    // Update recent projects list to remove highlighting
    updateRecentProjectsList();
    
    // Show notification
    showNotification('New project created!', 'success');
});

// Load auto-saved state after all UI elements are initialized
loadAutoSave();

// Auto-save functionality
function autoSave() {
    try {
        const autoSaveData = {
            nodes: nodes,
            transitions: transitions,
            texts: texts,
            nodeCounter: nodeCounter,
            currentProject: currentProject,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('diaVinciAutoSave', JSON.stringify(autoSaveData));
    } catch (error) {
        console.warn('Auto-save failed:', error);
    }
}

function loadAutoSave() {
    try {
        const autoSaveData = localStorage.getItem('diaVinciAutoSave');
        if (autoSaveData) {
            const data = JSON.parse(autoSaveData);
            
            // Only load if there's actual content
            if (data.nodes && data.nodes.length > 0 || data.transitions && data.transitions.length > 0 || data.texts && data.texts.length > 0) {
                nodes = data.nodes || [];
                transitions = data.transitions || [];
                texts = data.texts || [];
                nodeCounter = data.nodeCounter || 1;
                currentProject = data.currentProject || null;
                
                // Fix object references in transitions after loading
                fixTransitionReferences();
                
                draw();
                updateProjectNameDisplay();
            }
        }
    } catch (error) {
        console.warn('Failed to load auto-save:', error);
    }
}

function showSaveDialog() {
    // Remove existing dialog if any
    const existing = document.getElementById('save-dialog');
    if (existing) existing.remove();
    
    const dialog = document.createElement('div');
    dialog.id = 'save-dialog';
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
    dialog.style.minWidth = '300px';
    
    const title = document.createElement('h3');
    title.textContent = 'Save Project';
    title.style.margin = '0 0 15px 0';
    title.style.color = '#333';
    
    const input = document.createElement('input');
    input.type = 'text';
    
    // Generate default project name with current date and time
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    const defaultName = `Project_${year}${month}${day}_${hours}${minutes}${seconds}`;
    
    input.placeholder = 'Enter project name...';
    input.value = defaultName; // Set default value
    input.style.width = '100%';
    input.style.padding = '8px 12px';
    input.style.border = '1px solid #ddd';
    input.style.borderRadius = '4px';
    input.style.fontSize = '14px';
    input.style.marginBottom = '15px';
    input.style.boxSizing = 'border-box';
    
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.justifyContent = 'flex-end';
    
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.style.padding = '8px 16px';
    cancelBtn.style.border = '1px solid #ddd';
    cancelBtn.style.borderRadius = '4px';
    cancelBtn.style.background = '#f8f9fa';
    cancelBtn.style.cursor = 'pointer';
    
    const saveProjectBtn = document.createElement('button');
    saveProjectBtn.textContent = 'Save';
    saveProjectBtn.style.padding = '8px 16px';
    saveProjectBtn.style.border = 'none';
    saveProjectBtn.style.borderRadius = '4px';
    saveProjectBtn.style.background = '#3498db';
    saveProjectBtn.style.color = '#fff';
    saveProjectBtn.style.cursor = 'pointer';
    
    cancelBtn.addEventListener('click', () => {
        dialog.remove();
    });
    
    saveProjectBtn.addEventListener('click', () => {
        const projectName = input.value.trim();
        if (projectName) {
            // Check if project with this name already exists
            const savedProjects = JSON.parse(localStorage.getItem('diaVinciProjects') || '{}');
            if (savedProjects[projectName]) {
                // Show confirmation dialog for overwrite
                const overwrite = confirm(`A project named "${projectName}" already exists. Do you want to overwrite it?`);
                if (overwrite) {
                    saveProject(projectName);
                    dialog.remove();
                }
                // If user cancels, keep the dialog open
            } else {
                saveProject(projectName);
                dialog.remove();
            }
        } else {
            alert('Please enter a project name');
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const projectName = input.value.trim();
            if (projectName) {
                // Check if project with this name already exists
                const savedProjects = JSON.parse(localStorage.getItem('diaVinciProjects') || '{}');
                if (savedProjects[projectName]) {
                    // Show confirmation dialog for overwrite
                    const overwrite = confirm(`A project named "${projectName}" already exists. Do you want to overwrite it?`);
                    if (overwrite) {
                        saveProject(projectName);
                        dialog.remove();
                    }
                    // If user cancels, keep the dialog open
                } else {
                    saveProject(projectName);
                    dialog.remove();
                }
            } else {
                alert('Please enter a project name');
            }
        } else if (e.key === 'Escape') {
            cancelBtn.click();
        }
    });
    
    buttonContainer.appendChild(cancelBtn);
    buttonContainer.appendChild(saveProjectBtn);
    dialog.appendChild(title);
    dialog.appendChild(input);
    dialog.appendChild(buttonContainer);
    document.body.appendChild(dialog);
    
    input.focus();
    input.select(); // Select all text for easy replacement
}

function saveProject(projectName) {
    const projectData = {
        name: projectName,
        timestamp: new Date().toISOString(),
        nodes: nodes,
        transitions: transitions,
        texts: texts,
        nodeCounter: nodeCounter
    };
    
    try {
        const savedProjects = JSON.parse(localStorage.getItem('diaVinciProjects') || '{}');
        const isOverwrite = savedProjects[projectName] !== undefined;
        
        savedProjects[projectName] = projectData;
        localStorage.setItem('diaVinciProjects', JSON.stringify(savedProjects));
        
        // Set as current project
        currentProject = projectName;
        
        // Reset pagination to first page when saving a project
        currentPage = 1;
        
        // Update recent projects list after saving
        updateRecentProjectsList();
        
        // Update project name display
        updateProjectNameDisplay();
        
        // Show success message with appropriate text
        const message = isOverwrite 
            ? `Project "${projectName}" updated successfully!` 
            : `Project "${projectName}" saved successfully!`;
        showNotification(message, 'success');
    } catch (error) {
        console.error('Error saving project:', error);
        showNotification('Error saving project. Please try again.', 'error');
    }
}

function showLoadDialog() {
    // Remove existing dialog if any
    const existing = document.getElementById('load-dialog');
    if (existing) existing.remove();
    
    const dialog = document.createElement('div');
    dialog.id = 'load-dialog';
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
    dialog.style.minWidth = '400px';
    dialog.style.maxHeight = '500px';
    
    const title = document.createElement('h3');
    title.textContent = 'Load Project';
    title.style.margin = '0 0 15px 0';
    title.style.color = '#333';
    
    const projectList = document.createElement('div');
    projectList.style.maxHeight = '300px';
    projectList.style.overflowY = 'auto';
    projectList.style.border = '1px solid #eee';
    projectList.style.borderRadius = '4px';
    projectList.style.marginBottom = '15px';
    
    try {
        const savedProjects = JSON.parse(localStorage.getItem('diaVinciProjects') || '{}');
        const projectNames = Object.keys(savedProjects);
        
        if (projectNames.length === 0) {
            const noProjects = document.createElement('div');
            noProjects.textContent = 'No saved projects found';
            noProjects.style.padding = '20px';
            noProjects.style.textAlign = 'center';
            noProjects.style.color = '#666';
            projectList.appendChild(noProjects);
        } else {
            projectNames.forEach(projectName => {
                const project = savedProjects[projectName];
                const projectItem = document.createElement('div');
                projectItem.style.padding = '12px';
                projectItem.style.borderBottom = '1px solid #eee';
                projectItem.style.cursor = 'pointer';
                projectItem.style.display = 'flex';
                projectItem.style.justifyContent = 'space-between';
                projectItem.style.alignItems = 'center';
                
                projectItem.addEventListener('mouseenter', () => {
                    projectItem.style.background = '#f8f9fa';
                });
                
                projectItem.addEventListener('mouseleave', () => {
                    projectItem.style.background = '#fff';
                });
                
                const projectInfo = document.createElement('div');
                projectInfo.style.flex = '1';
                
                const nameDiv = document.createElement('div');
                nameDiv.textContent = projectName;
                nameDiv.style.fontWeight = 'bold';
                nameDiv.style.marginBottom = '4px';
                
                const dateDiv = document.createElement('div');
                dateDiv.textContent = new Date(project.timestamp).toLocaleString();
                dateDiv.style.fontSize = '12px';
                dateDiv.style.color = '#666';
                
                projectInfo.appendChild(nameDiv);
                projectInfo.appendChild(dateDiv);
                
                const buttonContainer = document.createElement('div');
                buttonContainer.style.display = 'flex';
                buttonContainer.style.gap = '8px';
                
                const loadProjectBtn = document.createElement('button');
                loadProjectBtn.textContent = 'Load';
                loadProjectBtn.style.padding = '4px 12px';
                loadProjectBtn.style.border = 'none';
                loadProjectBtn.style.borderRadius = '4px';
                loadProjectBtn.style.background = '#27ae60';
                loadProjectBtn.style.color = '#fff';
                loadProjectBtn.style.cursor = 'pointer';
                loadProjectBtn.style.fontSize = '12px';
                
                const deleteProjectBtn = document.createElement('button');
                deleteProjectBtn.textContent = 'Delete';
                deleteProjectBtn.style.padding = '4px 12px';
                deleteProjectBtn.style.border = 'none';
                deleteProjectBtn.style.borderRadius = '4px';
                deleteProjectBtn.style.background = '#e74c3c';
                deleteProjectBtn.style.color = '#fff';
                deleteProjectBtn.style.cursor = 'pointer';
                deleteProjectBtn.style.fontSize = '12px';
                
                loadProjectBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    loadProject(projectName);
                    // Update recent projects list to show highlighting
                    setTimeout(() => updateRecentProjectsList(), 100);
                    dialog.remove();
                });
                
                deleteProjectBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (confirm(`Are you sure you want to delete project "${projectName}"?`)) {
                        deleteProject(projectName);
                        dialog.remove();
                        showLoadDialog(); // Refresh the dialog
                    }
                });
                
                buttonContainer.appendChild(loadProjectBtn);
                buttonContainer.appendChild(deleteProjectBtn);
                projectItem.appendChild(projectInfo);
                projectItem.appendChild(buttonContainer);
                projectList.appendChild(projectItem);
            });
        }
    } catch (error) {
        console.error('Error loading projects:', error);
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Error loading projects';
        errorDiv.style.padding = '20px';
        errorDiv.style.textAlign = 'center';
        errorDiv.style.color = '#e74c3c';
        projectList.appendChild(errorDiv);
    }
    
    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Close';
    closeBtn.style.padding = '8px 16px';
    closeBtn.style.border = '1px solid #ddd';
    closeBtn.style.borderRadius = '4px';
    closeBtn.style.background = '#f8f9fa';
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.width = '100%';
    
    closeBtn.addEventListener('click', () => {
        dialog.remove();
    });
    
    dialog.appendChild(title);
    dialog.appendChild(projectList);
    dialog.appendChild(closeBtn);
    document.body.appendChild(dialog);
}

function showExportOptions() {
    // Remove existing export menu if any
    const existing = document.getElementById('export-options-menu');
    if (existing) existing.remove();
    
    const exportMenu = document.createElement('div');
    exportMenu.id = 'export-options-menu';
    exportMenu.style.position = 'absolute';
    exportMenu.style.right = '20px';
    exportMenu.style.bottom = '60px';
    exportMenu.style.background = '#fff';
    exportMenu.style.border = '1px solid #ccc';
    exportMenu.style.borderRadius = '6px';
    exportMenu.style.padding = '12px';
    exportMenu.style.zIndex = '1000';
    exportMenu.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    exportMenu.style.minWidth = '200px';
    
    // Project Export Section
    const projectTitle = document.createElement('div');
    projectTitle.textContent = 'Export Project';
    projectTitle.style.fontWeight = 'bold';
    projectTitle.style.marginBottom = '8px';
    projectTitle.style.color = '#2a3a4d';
    projectTitle.style.fontSize = '14px';
    
    const exportProjectBtn = document.createElement('button');
    exportProjectBtn.textContent = '💾 Export as .lcp File';
    exportProjectBtn.style.width = '100%';
    exportProjectBtn.style.padding = '8px 12px';
    exportProjectBtn.style.margin = '4px 0';
    exportProjectBtn.style.background = '#3498db';
    exportProjectBtn.style.color = '#fff';
    exportProjectBtn.style.border = 'none';
    exportProjectBtn.style.borderRadius = '4px';
    exportProjectBtn.style.cursor = 'pointer';
    exportProjectBtn.style.fontWeight = 'bold';
    
    // Separator
    const separator = document.createElement('hr');
    separator.style.margin = '12px 0';
    separator.style.border = 'none';
    separator.style.borderTop = '1px solid #eee';
    
    // Image Export Section  
    const imageTitle = document.createElement('div');
    imageTitle.textContent = 'Export Image';
    imageTitle.style.fontWeight = 'bold';
    imageTitle.style.marginBottom = '8px';
    imageTitle.style.color = '#2a3a4d';
    imageTitle.style.fontSize = '14px';
    
    const whiteBtn = document.createElement('button');
    whiteBtn.textContent = '🖼️ White Background';
    whiteBtn.style.width = '100%';
    whiteBtn.style.padding = '8px 12px';
    whiteBtn.style.margin = '4px 0';
    whiteBtn.style.background = '#27ae60';
    whiteBtn.style.color = '#fff';
    whiteBtn.style.border = 'none';
    whiteBtn.style.borderRadius = '4px';
    whiteBtn.style.cursor = 'pointer';
    whiteBtn.style.fontWeight = 'bold';
    
    const transparentBtn = document.createElement('button');
    transparentBtn.textContent = '🖼️ Transparent Background';
    transparentBtn.style.width = '100%';
    transparentBtn.style.padding = '8px 12px';
    transparentBtn.style.margin = '4px 0';
    transparentBtn.style.background = '#9b59b6';
    transparentBtn.style.color = '#fff';
    transparentBtn.style.border = 'none';
    transparentBtn.style.borderRadius = '4px';
    transparentBtn.style.cursor = 'pointer';
    transparentBtn.style.fontWeight = 'bold';
    
    exportProjectBtn.addEventListener('click', () => {
        exportProject();
        exportMenu.remove();
    });
    
    whiteBtn.addEventListener('click', () => {
        exportCanvas(true);
        exportMenu.remove();
    });
    
    transparentBtn.addEventListener('click', () => {
        exportCanvas(false);
        exportMenu.remove();
    });
    
    // Add elements to menu
    exportMenu.appendChild(projectTitle);
    exportMenu.appendChild(exportProjectBtn);
    exportMenu.appendChild(separator);
    exportMenu.appendChild(imageTitle);
    exportMenu.appendChild(whiteBtn);
    exportMenu.appendChild(transparentBtn);
    
    document.body.appendChild(exportMenu);
    
    // Close menu when clicking outside
    document.addEventListener('click', function closeMenu(e) {
        if (!exportMenu.contains(e.target) && e.target !== document.getElementById('export-btn')) {
            exportMenu.remove();
            document.removeEventListener('click', closeMenu);
        }
    });
}

function exportProject() {
    try {
        // Create project data object
        const projectData = {
            name: currentProject || 'Exported_Project',
            nodes: nodes,
            transitions: transitions,
            texts: texts,
            nodeCounter: nodeCounter,
            timestamp: new Date().toISOString(),
            version: '1.0',
            exported: true
        };
        
        // Convert to JSON string
        const jsonString = JSON.stringify(projectData, null, 2);
        
        // Create blob and download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectData.name}.lcp`; // .lcp = DiaVinci Project
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up
        URL.revokeObjectURL(url);
        
        showNotification(`Project "${projectData.name}" exported successfully!`, 'success');
    } catch (error) {
        console.error('Error exporting project:', error);
        showNotification('Error exporting project. Please try again.', 'error');
    }
}

function showImportDialog() {
    try {
        // Create file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.lcp,.json';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                importProject(file);
            }
        });
        
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    } catch (error) {
        console.error('Error showing import dialog:', error);
        showNotification('Error opening import dialog. Please try again.', 'error');
    }
}

function importProject(file) {
    const reader = new FileReader();
    
    reader.onload = (e) => {
        try {
            const projectData = JSON.parse(e.target.result);
            
            // Validate project data
            if (!projectData.nodes || !projectData.transitions) {
                throw new Error('Invalid project file format');
            }
            
            // Ask for confirmation if canvas is not empty
            const hasContent = nodes.length > 0 || transitions.length > 0 || texts.length > 0;
            if (hasContent) {
                const confirmed = confirm('Importing will replace the current project. Do you want to continue?');
                if (!confirmed) {
                    return;
                }
            }
            
            // Load project data
            nodes = projectData.nodes || [];
            transitions = projectData.transitions || [];
            texts = projectData.texts || [];
            nodeCounter = projectData.nodeCounter || 1;
            
            // Fix transition references
            fixTransitionReferences();
            
            // Set current project name (remove .lcp extension if present)
            const projectName = projectData.name.replace(/\.lcp$/, '');
            currentProject = projectName;
            
            // Save to Recent Projects
            const savedProjects = JSON.parse(localStorage.getItem('diaVinciProjects') || '{}');
            savedProjects[projectName] = {
                name: projectName,
                nodes: nodes,
                transitions: transitions,
                texts: texts,
                nodeCounter: nodeCounter,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('diaVinciProjects', JSON.stringify(savedProjects));
            
            // Update UI
            draw();
            updateRemoveBtn();
            updateProjectNameDisplay();
            updateRecentProjectsList();
            autoSave();
            
            showNotification(`Project "${projectName}" imported successfully!`, 'success');
        } catch (error) {
            console.error('Error importing project:', error);
            showNotification('Error importing project. Please check the file format.', 'error');
        }
    };
    
    reader.onerror = () => {
        showNotification('Error reading file. Please try again.', 'error');
    };
    
    reader.readAsText(file);
}

async function exportCanvas(whiteBackground = true) {
    // Create a new canvas for export
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext('2d');
    
    // Set background
    if (whiteBackground) {
        exportCtx.fillStyle = '#ffffff';
        exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    }
    // If transparent background, don't fill anything
    
    // Temporarily clear selection for clean export
    const tempSelectedElement = selectedElement;
    const tempSelectedType = selectedType;
    selectedElement = null;
    selectedType = null;
    
    // Copy the canvas content by drawing directly to export canvas
    drawContentToCanvas(exportCtx);
    selectedElement = tempSelectedElement;
    selectedType = tempSelectedType;
    
    // Try File System Access API first (modern browsers with file picker)
    if ('showSaveFilePicker' in window) {
        try {
            const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
            const fileHandle = await window.showSaveFilePicker({
                suggestedName: `diagram-${timestamp}.png`,
                types: [{
                    description: 'PNG images',
                    accept: { 'image/png': ['.png'] }
                }]
            });
            
            // Convert canvas to blob and save to chosen location
            exportCanvas.toBlob(async (blob) => {
                const writable = await fileHandle.createWritable();
                await writable.write(blob);
                await writable.close();
            }, 'image/png');
            
        } catch (err) {
            if (err.name !== 'AbortError') {
                // If error is not user cancellation, try fallback
                fallbackExport(exportCanvas);
            }
        }
    } else {
        // Fallback for older browsers
        fallbackExport(exportCanvas);
    }
}

function fallbackExport(canvas) {
    try {
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        
        let filename = prompt('Enter filename (without extension):', `diagram-${timestamp}`);
        
        if (filename !== null) { // User didn't cancel
            if (filename.trim() === '') {
                filename = `diagram-${timestamp}`;
            }
            
            // Clean filename - remove invalid characters
            filename = filename.replace(/[<>:"/\\|?*]/g, '-');
            
            // Add .png extension if not present
            if (!filename.toLowerCase().endsWith('.png')) {
                filename += '.png';
            }
            
            // Create and trigger download
            const link = document.createElement('a');
            link.download = filename;
            link.href = canvas.toDataURL('image/png');
            
            // Add link to body, click it, then remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error('Error in fallbackExport:', error);
        // Last resort - direct download without prompt
        const fallbackFilename = `diagram-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
        const link = document.createElement('a');
        link.download = fallbackFilename;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function drawContentToCanvas(targetCtx) {
    // Draw transitions
    transitions.forEach(tr => {
        // Determine start and end points based on node types
        let startX, startY, endX, endY;
        
        // Calculate start point
        if (tr.from.type === 'if' && tr.fromCorner) {
            // Start from specific corner of diamond
            if (tr.fromCorner === 'top') {
                startX = tr.from.x;
                startY = tr.from.y - tr.from.r;
            } else if (tr.fromCorner === 'bottom') {
                startX = tr.from.x;
                startY = tr.from.y + tr.from.r;
            } else if (tr.fromCorner === 'right') {
                startX = tr.from.x + tr.from.r;
                startY = tr.from.y;
            } else { // left
                startX = tr.from.x - tr.from.r;
                startY = tr.from.y;
            }
        } else {
            startX = tr.from.x;
            startY = tr.from.y;
        }
        
        // Calculate end point (connection to target node edge)
        if (tr.from.type === 'if' && tr.fromCorner && (tr.label === 'TRUE' || tr.label === 'FALSE')) {
            // Dla przejść IF z ramionami robota
            if (tr.label === 'TRUE' && tr.fromCorner === 'left') {
                // Pozioma orientacja: TRUE ostatni segment w prawo → zatrzymaj przed lewą krawędzią
                endX = tr.to.x - tr.to.r;
                endY = tr.to.y;
            } else if (tr.label === 'FALSE' && tr.fromCorner === 'right') {
                // Pozioma orientacja: FALSE ostatni segment → zatrzymaj przed lewą krawędzią  
                endX = tr.to.x - tr.to.r;
                endY = tr.to.y;
            } else if (tr.label === 'TRUE' && tr.fromCorner === 'top') {
                // Pionowa orientacja: TRUE ostatni segment w dół → zatrzymaj przed górną krawędzią
                endX = tr.to.x;
                endY = tr.to.y - tr.to.r;
            } else if (tr.label === 'FALSE' && tr.fromCorner === 'bottom') {
                // Pionowa orientacja: FALSE ostatni segment w górę → zatrzymaj przed dolną krawędzią
                endX = tr.to.x;
                endY = tr.to.y + tr.to.r;
            } else {
                // Fallback dla innych przypadków IF
                const dx = tr.to.x - startX;
                const dy = tr.to.y - startY;
                const angle = Math.atan2(dy, dx);
                endX = tr.to.x - Math.cos(angle) * tr.to.r;
                endY = tr.to.y - Math.sin(angle) * tr.to.r;
            }
        } else {
            // Standardowe obliczenie dla zwykłych przejść
            const dx = tr.to.x - startX;
            const dy = tr.to.y - startY;
            const angle = Math.atan2(dy, dx);
            
            if (tr.to.type === 'start' || tr.to.type === 'stop') {
                const a = tr.to.r * 1.5;
                const b = tr.to.r * 0.8;
                const cosAngle = Math.cos(angle);
                const sinAngle = Math.sin(angle);
                const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
                endX = tr.to.x - cosAngle * distance;
                endY = tr.to.y - sinAngle * distance;
            } else if (tr.to.type === 'if') {
                endX = tr.to.x - Math.cos(angle) * tr.to.r;
                endY = tr.to.y - Math.sin(angle) * tr.to.r;
            } else {
                endX = tr.to.x - Math.cos(angle) * tr.to.r;
                endY = tr.to.y - Math.sin(angle) * tr.to.r;
            }
        }
        
        // Draw curved line for IF transitions, straight line for others
        if (tr.from.type === 'if' && tr.fromCorner) {
            // Draw robot arm-like lines (square/rectangular paths)
            targetCtx.beginPath();
            targetCtx.moveTo(startX, startY);
            
            const armLength = 60; // Długość "ramienia robota"
            
            // Różnicuj ścieżki w zależności od orientacji IF
            if (tr.label === 'TRUE' && tr.fromCorner === 'left') {
                // Pozioma orientacja: TRUE z lewej strony
                const cornerX = startX - armLength;
                const cornerY = endY;
                targetCtx.lineTo(cornerX, startY); // poziomo w lewo
                targetCtx.lineTo(cornerX, cornerY); // pionowo do wysokości celu
                targetCtx.lineTo(endX, endY); // poziomo do celu
            } else if (tr.label === 'FALSE' && tr.fromCorner === 'right') {
                // Pozioma orientacja: FALSE z prawej strony
                const cornerX = startX + armLength;
                const cornerY = endY;
                targetCtx.lineTo(cornerX, startY); // poziomo w prawo
                targetCtx.lineTo(cornerX, cornerY); // pionowo do wysokości celu
                targetCtx.lineTo(endX, endY); // poziomo do celu
            } else if (tr.label === 'TRUE' && tr.fromCorner === 'top') {
                // Pionowa orientacja: TRUE z góry
                const cornerX = endX;
                const cornerY = startY - armLength;
                targetCtx.lineTo(startX, cornerY); // pionowo w górę
                targetCtx.lineTo(cornerX, cornerY); // poziomo do pozycji celu
                targetCtx.lineTo(endX, endY); // pionowo do celu
            } else if (tr.label === 'FALSE' && tr.fromCorner === 'bottom') {
                // Pionowa orientacja: FALSE z dołu
                const cornerX = endX;
                const cornerY = startY + armLength;
                targetCtx.lineTo(startX, cornerY); // pionowo w dół
                targetCtx.lineTo(cornerX, cornerY); // poziomo do pozycji celu
                targetCtx.lineTo(endX, endY); // pionowo do celu
            } else {
                // Domyślna ścieżka dla innych przypadków
                if (tr.fromCorner === 'top' || tr.fromCorner === 'bottom') {
                    const cornerX = startX;
                    const cornerY = startY + (tr.fromCorner === 'top' ? -armLength : armLength);
                    targetCtx.lineTo(cornerX, cornerY);
                    targetCtx.lineTo(endX, cornerY);
                    targetCtx.lineTo(endX, endY);
                } else {
                    // Prosta linia jako fallback
                    targetCtx.lineTo(endX, endY);
                }
            }
            
            targetCtx.strokeStyle = '#888';
            targetCtx.lineWidth = 2;
            targetCtx.stroke();
        } else {
            // Draw straight line
            targetCtx.beginPath();
            targetCtx.moveTo(startX, startY);
            targetCtx.lineTo(endX, endY);
            targetCtx.strokeStyle = '#888';
            targetCtx.lineWidth = 2;
            targetCtx.stroke();
        }
        
        // Draw arrowhead(s) based on transition type - skip arrows for IF transitions
        const arrowLen = 18;
        const transType = tr.type || 'right';
        
        if (!(tr.from.type === 'if' && tr.fromCorner)) {
            targetCtx.fillStyle = '#888';
            
            if (transType === 'right') {
                // Right arrow only
                let arrowAngle;
                
                // Standardowy kąt dla zwykłych przejść
                arrowAngle = Math.atan2(endY - startY, endX - startX);
                
                const base1X = endX - arrowLen * Math.cos(arrowAngle - Math.PI / 6);
                const base1Y = endY - arrowLen * Math.sin(arrowAngle - Math.PI / 6);
                const base2X = endX - arrowLen * Math.cos(arrowAngle + Math.PI / 6);
                const base2Y = endY - arrowLen * Math.sin(arrowAngle + Math.PI / 6);
                targetCtx.beginPath();
                targetCtx.moveTo(endX, endY);
                targetCtx.lineTo(base1X, base1Y);
                targetCtx.lineTo(base2X, base2Y);
                targetCtx.closePath();
                targetCtx.fill();
            } else if (transType === 'both') {
                // Both arrows - need to recalculate start and end points for proper arrow positioning
                const dx = tr.to.x - tr.from.x;
                const dy = tr.to.y - tr.from.y;
                const angle = Math.atan2(dy, dx);
                
                // Calculate proper start point from edge of source node
                let properStartX, properStartY;
                if (tr.from.type === 'start' || tr.from.type === 'stop') {
                    const a = tr.from.r * 1.5;
                    const b = tr.from.r * 0.8;
                    const cosAngle = Math.cos(angle);
                    const sinAngle = Math.sin(angle);
                    const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
                    properStartX = tr.from.x + cosAngle * distance;
                    properStartY = tr.from.y + sinAngle * distance;
                } else {
                    properStartX = tr.from.x + Math.cos(angle) * tr.from.r;
                    properStartY = tr.from.y + Math.sin(angle) * tr.from.r;
                }
                
                // Calculate proper end point from edge of target node
                let properEndX, properEndY;
                if (tr.to.type === 'start' || tr.to.type === 'stop') {
                    const a = tr.to.r * 1.5;
                    const b = tr.to.r * 0.8;
                    const cosAngle = Math.cos(angle);
                    const sinAngle = Math.sin(angle);
                    const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
                    properEndX = tr.to.x - cosAngle * distance;
                    properEndY = tr.to.y - sinAngle * distance;
                } else {
                    properEndX = tr.to.x - Math.cos(angle) * tr.to.r;
                    properEndY = tr.to.y - Math.sin(angle) * tr.to.r;
                }
                
                // Right arrow
                let arrowAngle = Math.atan2(properEndY - properStartY, properEndX - properStartX);
                
                const base1X1 = properEndX - arrowLen * Math.cos(arrowAngle - Math.PI / 6);
                const base1Y1 = properEndY - arrowLen * Math.sin(arrowAngle - Math.PI / 6);
                const base2X1 = properEndX - arrowLen * Math.cos(arrowAngle + Math.PI / 6);
                const base2Y1 = properEndY - arrowLen * Math.sin(arrowAngle + Math.PI / 6);
                
                targetCtx.beginPath();
                targetCtx.moveTo(properEndX, properEndY);
                targetCtx.lineTo(base1X1, base1Y1);
                targetCtx.lineTo(base2X1, base2Y1);
                targetCtx.closePath();
                targetCtx.fill();
                
                // Left arrow
                const reverseAngle = arrowAngle + Math.PI;
                const base1X2 = properStartX - arrowLen * Math.cos(reverseAngle - Math.PI / 6);
                const base1Y2 = properStartY - arrowLen * Math.sin(reverseAngle - Math.PI / 6);
                const base2X2 = properStartX - arrowLen * Math.cos(reverseAngle + Math.PI / 6);
                const base2Y2 = properStartY - arrowLen * Math.sin(reverseAngle + Math.PI / 6);
                
                targetCtx.beginPath();
                targetCtx.moveTo(properStartX, properStartY);
                targetCtx.lineTo(base1X2, base1Y2);
                targetCtx.lineTo(base2X2, base2Y2);
                targetCtx.closePath();
                targetCtx.fill();
            }
        }
        
        // Draw label
        if (tr.label && !(tr.from.type === 'if' && tr.fromCorner)) {
            let midX, midY;
            
            // Position label on straight line
            midX = (startX + endX) / 2;
            midY = (startY + endY) / 2 - 18;
            
            targetCtx.save();
            targetCtx.translate(midX, midY);
            targetCtx.fillStyle = '#333';
            targetCtx.font = '15px Arial';
            targetCtx.textAlign = 'center';
            targetCtx.textBaseline = 'bottom';
            targetCtx.fillText(tr.label, 0, 0);
            targetCtx.restore();
        }
    });
    
    // Draw nodes
    nodes.forEach(node => {
        // Draw different shapes based on node type
        if (node.type === 'start' || node.type === 'stop') {
            targetCtx.beginPath();
            targetCtx.ellipse(node.x, node.y, node.r * 1.5, node.r * 0.8, 0, 0, 2 * Math.PI);
        } else if (node.type === 'if') {
            targetCtx.beginPath();
            targetCtx.moveTo(node.x, node.y - node.r);
            targetCtx.lineTo(node.x + node.r, node.y);
            targetCtx.lineTo(node.x, node.y + node.r);
            targetCtx.lineTo(node.x - node.r, node.y);
            targetCtx.closePath();
        } else {
            targetCtx.beginPath();
            targetCtx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
        }
        
        targetCtx.fillStyle = node.color || '#b3d1ff';
        targetCtx.fill();
        targetCtx.strokeStyle = '#333';
        targetCtx.lineWidth = 2;
        targetCtx.stroke();
        
        // Draw label
        if (node.type === 'start' || node.type === 'stop' || node.type === 'if') {
            targetCtx.fillStyle = '#fff';
        } else {
            targetCtx.fillStyle = '#333';
        }
        targetCtx.font = '16px Arial';
        targetCtx.textAlign = 'center';
        targetCtx.textBaseline = 'middle';
        
        if (node.type === 'start' || node.type === 'stop' || node.type === 'if') {
            targetCtx.fillText(node.label || 'Node', node.x, node.y);
        } else {
            targetCtx.fillStyle = '#333';
            targetCtx.textBaseline = 'bottom';
            targetCtx.fillText(node.label || 'Node', node.x, node.y - node.r - 8);
        }
    });
    
    // Draw texts
    texts.forEach(text => {
        targetCtx.fillStyle = '#333';
        targetCtx.font = '18px Arial';
        targetCtx.textAlign = 'center';
        targetCtx.textBaseline = 'middle';
        targetCtx.fillText(text.label, text.x, text.y);
    });
}

function updateRemoveBtn() {
    removeBtn.style.display = selectedElement ? 'block' : 'none';
}

// Update button visibility on selection changes
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set white background
    ctx.fillStyle = '#fafafa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw transitions
    transitions.forEach(tr => {
        // Determine start and end points based on node types
        let startX, startY, endX, endY;
        
        // Calculate start point
        if (tr.from.type === 'if' && tr.fromCorner) {
            // Start from specific corner of diamond
            if (tr.fromCorner === 'top') {
                startX = tr.from.x;
                startY = tr.from.y - tr.from.r;
            } else if (tr.fromCorner === 'bottom') {
                startX = tr.from.x;
                startY = tr.from.y + tr.from.r;
            } else if (tr.fromCorner === 'right') {
                startX = tr.from.x + tr.from.r;
                startY = tr.from.y;
            } else { // left
                startX = tr.from.x - tr.from.r;
                startY = tr.from.y;
            }
        } else {
            startX = tr.from.x;
            startY = tr.from.y;
        }
        
        // Calculate end point (connection to target node edge)
        if (tr.from.type === 'if' && tr.fromCorner && (tr.label === 'TRUE' || tr.label === 'FALSE')) {
            // Dla przejść IF z ramionami robota
            if (tr.label === 'TRUE' && tr.fromCorner === 'left') {
                // Pozioma orientacja: TRUE z lewej, ostatni segment w prawo
                endX = tr.to.x - tr.to.r; // Zatrzymaj przed lewą krawędzią węzła
                endY = tr.to.y;
            } else if (tr.label === 'FALSE' && tr.fromCorner === 'right') {
                // Pozioma orientacja: FALSE ostatni segment → zatrzymaj przed lewą krawędzią  
                endX = tr.to.x - tr.to.r;
                endY = tr.to.y;
            } else if (tr.label === 'TRUE' && tr.fromCorner === 'top') {
                // Pionowa orientacja: TRUE z góry, ostatni segment w dół
                endX = tr.to.x;
                endY = tr.to.y - tr.to.r; // Zatrzymaj przed górną krawędzią węzła
            } else if (tr.label === 'FALSE' && tr.fromCorner === 'bottom') {
                // Pionowa orientacja: FALSE z dołu, ostatni segment w górę
                endX = tr.to.x;
                endY = tr.to.y + tr.to.r; // Zatrzymaj przed dolną krawędzią węzła
            } else {
                // Fallback dla innych przypadków IF
                const dx = tr.to.x - startX;
                const dy = tr.to.y - startY;
                const angle = Math.atan2(dy, dx);
                endX = tr.to.x - Math.cos(angle) * tr.to.r;
                endY = tr.to.y - Math.sin(angle) * tr.to.r;
            }
        } else {
            // Standardowe obliczenie dla zwykłych przejść
            const dx = tr.to.x - startX;
            const dy = tr.to.y - startY;
            const angle = Math.atan2(dy, dx);
            
            if (tr.to.type === 'start' || tr.to.type === 'stop') {
                const a = tr.to.r * 1.5;
                const b = tr.to.r * 0.8;
                const cosAngle = Math.cos(angle);
                const sinAngle = Math.sin(angle);
                const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
                endX = tr.to.x - cosAngle * distance;
                endY = tr.to.y - sinAngle * distance;
            } else if (tr.to.type === 'if') {
                endX = tr.to.x - Math.cos(angle) * tr.to.r;
                endY = tr.to.y - Math.sin(angle) * tr.to.r;
            } else {
                endX = tr.to.x - Math.cos(angle) * tr.to.r;
                endY = tr.to.y - Math.sin(angle) * tr.to.r;
            }
        }
        
        // Highlight if selected
        if (selectedElement === tr && selectedType === 'transition') {
            ctx.save();
            ctx.beginPath();
            if (tr.from.type === 'if' && tr.fromCorner) {
                ctx.moveTo(startX, startY);
                const midX = (startX + endX) / 2;
                const midY = (startY + endY) / 2;
                const controlOffset = 60;
                let controlX, controlY;
                // Różnicuj krzywe dla TRUE (góra) i FALSE (dół)
                if (tr.label === 'TRUE') {
                    controlX = midX + controlOffset;
                    controlY = midY - controlOffset; // Krzywa w górę
                } else if (tr.label === 'FALSE') {
                    controlX = midX + controlOffset;
                    controlY = midY + controlOffset; // Krzywa w dół
                } else {
                    // Domyślna krzywa dla innych przypadków
                    if (tr.fromCorner === 'top') {
                        controlX = midX - controlOffset;
                        controlY = startY;
                    } else if (tr.fromCorner === 'bottom') {
                        controlX = midX - controlOffset;
                        controlY = startY;
                    } else {
                        controlX = midX;
                        controlY = midY - controlOffset;
                    }
                }
                ctx.quadraticCurveTo(controlX, controlY, endX, endY);
            } else {
                ctx.moveTo(startX, startY);
                ctx.lineTo(endX, endY);
            }
            ctx.strokeStyle = '#e6b800';
            ctx.lineWidth = 6;
            ctx.stroke();
            ctx.restore();
        }
        
        // Draw curved line for IF transitions, straight line for others
        ctx.beginPath();
        if (tr.from.type === 'if' && tr.fromCorner) {
            // Draw robot arm-like lines (square/rectangular paths)
            ctx.moveTo(startX, startY);
            
            const armLength = 60; // Długość "ramienia robota"
            
            // Różnicuj ścieżki w zależności od orientacji IF
            if (tr.label === 'TRUE' && tr.fromCorner === 'left') {
                // Pozioma orientacja: TRUE z lewej strony
                const cornerX = startX - armLength;
                const cornerY = endY;
                ctx.lineTo(cornerX, startY); // poziomo w lewo
                ctx.lineTo(cornerX, cornerY); // pionowo do wysokości celu
                ctx.lineTo(endX, endY); // poziomo do celu
            } else if (tr.label === 'FALSE' && tr.fromCorner === 'right') {
                // Pozioma orientacja: FALSE z prawej strony
                const cornerX = startX + armLength;
                const cornerY = endY;
                ctx.lineTo(cornerX, startY); // poziomo w prawo
                ctx.lineTo(cornerX, cornerY); // pionowo do wysokości celu
                ctx.lineTo(endX, endY); // poziomo do celu
            } else if (tr.label === 'TRUE' && tr.fromCorner === 'top') {
                // Pionowa orientacja: TRUE z góry
                const cornerX = endX;
                const cornerY = startY - armLength;
                ctx.lineTo(startX, cornerY); // pionowo w górę
                ctx.lineTo(cornerX, cornerY); // poziomo do pozycji celu
                ctx.lineTo(endX, endY); // pionowo do celu
            } else if (tr.label === 'FALSE' && tr.fromCorner === 'bottom') {
                // Pionowa orientacja: FALSE z dołu
                const cornerX = endX;
                const cornerY = startY + armLength;
                ctx.lineTo(startX, cornerY); // pionowo w dół
                ctx.lineTo(cornerX, cornerY); // poziomo do pozycji celu
                ctx.lineTo(endX, endY); // pionowo do celu
            } else {
                // Domyślna ścieżka dla innych przypadków
                if (tr.fromCorner === 'top' || tr.fromCorner === 'bottom') {
                    const cornerX = startX;
                    const cornerY = startY + (tr.fromCorner === 'top' ? -armLength : armLength);
                    ctx.lineTo(cornerX, cornerY);
                    ctx.lineTo(endX, cornerY);
                    ctx.lineTo(endX, endY);
                } else {
                    // Prosta linia jako fallback
                    ctx.lineTo(endX, endY);
                }
            }
        } else {
            // Draw straight line
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
        }
        ctx.strokeStyle = selectedElement === tr && selectedType === 'transition' ? '#e6b800' : '#888';
        ctx.lineWidth = selectedElement === tr && selectedType === 'transition' ? 4 : 2;
        ctx.stroke();
        
        // Draw arrowhead(s) based on transition type - skip arrows for IF transitions
        const arrowLen = 18;
        const transType = tr.type || 'right';
        
        if (!(tr.from.type === 'if' && tr.fromCorner)) {
            ctx.fillStyle = selectedElement === tr && selectedType === 'transition' ? '#e6b800' : '#888';
            
            if (transType === 'right') {
                // Right arrow only
                let arrowAngle = Math.atan2(endY - startY, endX - startX);
                
                const base1X = endX - arrowLen * Math.cos(arrowAngle - Math.PI / 6);
                const base1Y = endY - arrowLen * Math.sin(arrowAngle - Math.PI / 6);
                const base2X = endX - arrowLen * Math.cos(arrowAngle + Math.PI / 6);
                const base2Y = endY - arrowLen * Math.sin(arrowAngle + Math.PI / 6);
                ctx.beginPath();
                ctx.moveTo(endX, endY);
                ctx.lineTo(base1X, base1Y);
                ctx.lineTo(base2X, base2Y);
                ctx.closePath();
                ctx.fill();
            } else if (transType === 'both') {
                // Both arrows - need to recalculate start and end points for proper arrow positioning
                const dx = tr.to.x - tr.from.x;
                const dy = tr.to.y - tr.from.y;
                const angle = Math.atan2(dy, dx);
                
                // Calculate proper start point from edge of source node
                let properStartX, properStartY;
                if (tr.from.type === 'start' || tr.from.type === 'stop') {
                    const a = tr.from.r * 1.5;
                    const b = tr.from.r * 0.8;
                    const cosAngle = Math.cos(angle);
                    const sinAngle = Math.sin(angle);
                    const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
                    properStartX = tr.from.x + cosAngle * distance;
                    properStartY = tr.from.y + sinAngle * distance;
                } else {
                    properStartX = tr.from.x + Math.cos(angle) * tr.from.r;
                    properStartY = tr.from.y + Math.sin(angle) * tr.from.r;
                }
                
                // Calculate proper end point from edge of target node
                let properEndX, properEndY;
                if (tr.to.type === 'start' || tr.to.type === 'stop') {
                    const a = tr.to.r * 1.5;
                    const b = tr.to.r * 0.8;
                    const cosAngle = Math.cos(angle);
                    const sinAngle = Math.sin(angle);
                    const distance = (a * b) / Math.sqrt((b * cosAngle) ** 2 + (a * sinAngle) ** 2);
                    properEndX = tr.to.x - cosAngle * distance;
                    properEndY = tr.to.y - sinAngle * distance;
                } else {
                    properEndX = tr.to.x - Math.cos(angle) * tr.to.r;
                    properEndY = tr.to.y - Math.sin(angle) * tr.to.r;
                }
                
                // Right arrow
                let arrowAngle = Math.atan2(properEndY - properStartY, properEndX - properStartX);
                
                const base1X1 = properEndX - arrowLen * Math.cos(arrowAngle - Math.PI / 6);
                const base1Y1 = properEndY - arrowLen * Math.sin(arrowAngle - Math.PI / 6);
                const base2X1 = properEndX - arrowLen * Math.cos(arrowAngle + Math.PI / 6);
                const base2Y1 = properEndY - arrowLen * Math.sin(arrowAngle + Math.PI / 6);
                
                ctx.beginPath();
                ctx.moveTo(properEndX, properEndY);
                ctx.lineTo(base1X1, base1Y1);
                ctx.lineTo(base2X1, base2Y1);
                ctx.closePath();
                ctx.fill();
                
                // Left arrow
                const reverseAngle = arrowAngle + Math.PI;
                const base1X2 = properStartX - arrowLen * Math.cos(reverseAngle - Math.PI / 6);
                const base1Y2 = properStartY - arrowLen * Math.sin(reverseAngle - Math.PI / 6);
                const base2X2 = properStartX - arrowLen * Math.cos(reverseAngle + Math.PI / 6);
                const base2Y2 = properStartY - arrowLen * Math.sin(reverseAngle + Math.PI / 6);
                
                ctx.beginPath();
                ctx.moveTo(properStartX, properStartY);
                ctx.lineTo(base1X2, base1Y2);
                ctx.lineTo(base2X2, base2Y2);
                ctx.closePath();
                ctx.fill();
            }
        }
        
        // Draw label above the midpoint
        if (tr.label && !(tr.from.type === 'if' && tr.fromCorner)) {
            let midX, midY;
            
            // Position label on straight line
            midX = (startX + endX) / 2;
            midY = (startY + endY) / 2 - 18;
            
            ctx.save();
            ctx.translate(midX, midY);
            ctx.fillStyle = '#333';
            ctx.font = '15px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText(tr.label, 0, 0);
            ctx.restore();
        }
    });
    // Draw nodes
    nodes.forEach(node => {
        // Draw different shapes based on node type
        if (node.type === 'start' || node.type === 'stop') {
            // Draw oval/ellipse for start/stop nodes
            ctx.beginPath();
            ctx.ellipse(node.x, node.y, node.r * 1.5, node.r * 0.8, 0, 0, 2 * Math.PI);
        } else if (node.type === 'if') {
            // Draw diamond/rhombus for if nodes
            ctx.beginPath();
            ctx.moveTo(node.x, node.y - node.r);      // top
            ctx.lineTo(node.x + node.r, node.y);      // right
            ctx.lineTo(node.x, node.y + node.r);      // bottom
            ctx.lineTo(node.x - node.r, node.y);      // left
            ctx.closePath();
        } else {
            // Draw circle for regular nodes
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, 2 * Math.PI);
        }
        
        if (selectedElement === node && selectedType === 'node') {
            ctx.fillStyle = '#ffe066'; // highlight color
        } else {
            ctx.fillStyle = node.color || '#b3d1ff';
        }
        ctx.fill();
        ctx.strokeStyle = selectedElement === node && selectedType === 'node' ? '#e6b800' : '#333';
        ctx.lineWidth = selectedElement === node && selectedType === 'node' ? 4 : 2;
        ctx.stroke();
        
        // Draw label above the node
        if (node.type === 'start' || node.type === 'stop' || node.type === 'if') {
            ctx.fillStyle = '#fff';
        } else {
            ctx.fillStyle = '#333';
        }
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        if (node.type === 'start' || node.type === 'stop' || node.type === 'if') {
            // Draw text inside the shape for start/stop/if
            ctx.fillText(node.label || 'Node', node.x, node.y);
        } else {
            // Draw text above regular nodes
            ctx.fillStyle = '#333';
            ctx.textBaseline = 'bottom';
            ctx.fillText(node.label || 'Node', node.x, node.y - node.r - 8);
        }
    });
    // Draw texts
    texts.forEach(text => {
        if (selectedElement === text && selectedType === 'text') {
            ctx.save();
            ctx.beginPath();
            ctx.rect(text.x - 60, text.y - 22, 120, 32);
            ctx.fillStyle = '#ffe066';
            ctx.fill();
            ctx.restore();
        }
        ctx.fillStyle = '#333';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text.label, text.x, text.y);
    });
    // Hide input if not editing
    const nodeInput = document.getElementById('node-label-input');
    if (nodeInput && !editingNode) {
        nodeInput.style.display = 'none';
    }
    const textInput = document.getElementById('text-label-input');
    if (textInput && !editingText) {
        textInput.style.display = 'none';
    }
    const transitionInput = document.getElementById('transition-label-input');
    if (transitionInput && !editingTransition) {
        transitionInput.style.display = 'none';
    }
    updateRemoveBtn();
    
    // Auto-save current state
    autoSave();
}

// Delete selected element on Delete key
window.addEventListener('keydown', (e) => {
    if (e.key === 'Delete' && selectedElement) {
        if (selectedType === 'node') {
            nodes = nodes.filter(n => n !== selectedElement);
            transitions = transitions.filter(tr => tr.from !== selectedElement && tr.to !== selectedElement);
        } else if (selectedType === 'text') {
            texts = texts.filter(t => t !== selectedElement);
        } else if (selectedType === 'transition') {
            // Prevent deletion of IF transitions (robot arms)
            if (selectedElement.from.type === 'if' && selectedElement.fromCorner) {
                return;
            }
            transitions = transitions.filter(tr => tr !== selectedElement);
        }
        selectedElement = null;
        selectedType = null;
        draw();
    }
});

    draw();

    // Create global bridge function for loading projects from Recent Projects
    function fixTransitionReferences() {
        // After loading from JSON, transitions have serialized node objects instead of references
        // We need to replace them with references to actual nodes in the nodes array
        transitions.forEach(transition => {
            // Find the actual 'from' node by id
            const fromNode = nodes.find(node => node.id === transition.from.id);
            if (fromNode) {
                transition.from = fromNode;
            }
            
            // Find the actual 'to' node by id
            const toNode = nodes.find(node => node.id === transition.to.id);
            if (toNode) {
                transition.to = toNode;
            }
        });
    }

    window.loadProjectData = function(project) {
        // Clear current state
        nodes = [];
        transitions = [];
        texts = [];
        selectedElement = null;
        selectedType = null;
        
        // Load project data
        nodes = project.nodes || [];
        transitions = project.transitions || [];
        texts = project.texts || [];
        nodeCounter = project.nodeCounter || 1;
        
        // Set current project
        currentProject = project.name;
        
        // Fix object references in transitions after loading
        fixTransitionReferences();
        
        // Clear any active input fields
        const nodeInput = document.getElementById('node-label-input');
        const textInput = document.getElementById('text-label-input');
        const transitionInput = document.getElementById('transition-label-input');
        if (nodeInput) nodeInput.style.display = 'none';
        if (textInput) textInput.style.display = 'none';
        if (transitionInput) transitionInput.style.display = 'none';
        
        // Redraw canvas
        draw();
        
        updateRemoveBtn();
        updateProjectNameDisplay();
        
        // Auto-save the loaded project
        autoSave();
    };

    // Function to update project name display
    function updateProjectNameDisplay() {
        const projectNameElement = document.getElementById('current-project-name');
        if (projectNameElement) {
            if (currentProject) {
                projectNameElement.textContent = currentProject;
                projectNameElement.style.color = '#2a3a4d';
                projectNameElement.style.fontWeight = '600';
            } else {
                projectNameElement.textContent = 'No Project Loaded';
                projectNameElement.style.color = '#999';
                projectNameElement.style.fontWeight = '500';
            }
        }
    }

    // Make updateProjectNameDisplay globally accessible
    window.updateProjectNameDisplay = updateProjectNameDisplay;

    // Global function for clearing canvas (accessible from clearAllProjects)
    window.clearCanvas = function() {
        // Clear all arrays
        nodes = [];
        transitions = [];
        texts = [];
        selectedElement = null;
        selectedType = null;
        nodeCounter = 1;
        currentProject = null;
        
        // Update the canvas and UI
        draw();
        updateRemoveBtn();
        updateProjectNameDisplay();
    };

    // Load recent projects list when DOM is ready
    updateRecentProjectsList();

});

// Global function for loading projects (accessible from Recent Projects)
function loadProject(projectName) {
    try {
        const savedProjectsRaw = localStorage.getItem('diaVinciProjects') || '{}';
        const savedProjects = JSON.parse(savedProjectsRaw);
        const project = savedProjects[projectName];
        
        if (project) {
            // Get references to global variables from the main scope
            const canvas = document.getElementById('drawCanvas');
            const ctx = canvas.getContext('2d');
            
            // We need to access the global variables, but they are in the DOMContentLoaded scope
            // We'll need to create a global bridge function
            window.loadProjectData(project);
            
            showNotification(`Project "${projectName}" loaded successfully!`, 'success');
        } else {
            showNotification('Project not found', 'error');
        }
    } catch (error) {
        console.error('Error loading project:', error);
        showNotification('Error loading project. Please try again.', 'error');
    }
}

// Global notification function
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.getElementById('notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 20px';
    notification.style.borderRadius = '6px';
    notification.style.color = '#fff';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '3000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.3s ease';
    
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);
    
    // Fade out and remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Recent Projects Management
let currentProject = null; // Track the currently loaded project name
let currentPage = 1; // Current page for pagination
const projectsPerPage = 8; // Number of projects per page
let initialLoad = true; // Flag to track initial application load

function deleteProject(projectName) {
    console.log('deleteProject called with:', projectName);
    try {
        const savedProjects = JSON.parse(localStorage.getItem('diaVinciProjects') || '{}');
        console.log('Before deletion:', Object.keys(savedProjects));
        
        // Check if project exists before deletion
        if (!savedProjects[projectName]) {
            console.log('Project not found in localStorage');
            showNotification('Project not found', 'error');
            return;
        }
        
        delete savedProjects[projectName];
        localStorage.setItem('diaVinciProjects', JSON.stringify(savedProjects));
        console.log('After deletion:', Object.keys(savedProjects));
        
        // If we're deleting the currently loaded project, clear the current project reference
        if (currentProject === projectName) {
            currentProject = null;
            console.log('Cleared currentProject');
        }
        
        // Update recent projects list after deletion
        console.log('Calling updateRecentProjectsList...');
        
        // Reset to first page if current page would be empty after deletion
        const remainingProjects = Object.keys(savedProjects).length;
        const maxPage = Math.ceil(remainingProjects / projectsPerPage);
        if (currentPage > maxPage && maxPage > 0) {
            currentPage = maxPage;
        } else if (remainingProjects === 0) {
            currentPage = 1;
        }
        
        updateRecentProjectsList();
        
        showNotification(`Project "${projectName}" deleted successfully!`, 'success');
    } catch (error) {
        console.error('Error deleting project:', error);
        showNotification('Error deleting project. Please try again.', 'error');
    }
}

function updateRecentProjectsList() {
    console.log('updateRecentProjectsList called');
    const recentList = document.getElementById('recent-projects-list');
    const searchInput = document.getElementById('project-search');
    
    if (!recentList) {
        console.log('recent-projects-list element not found!');
        return;
    }
    
    try {
        const savedProjects = JSON.parse(localStorage.getItem('diaVinciProjects') || '{}');
        let projectNames = Object.keys(savedProjects);
        console.log('Projects in localStorage:', projectNames);
        
        // Apply search filter if search input exists and has value
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
        if (searchTerm) {
            projectNames = projectNames.filter(name => 
                name.toLowerCase().includes(searchTerm)
            );
            console.log('Filtered projects by search term "' + searchTerm + '":', projectNames);
        }
        
        // Clear existing list
        recentList.innerHTML = '';
        console.log('Cleared recent list HTML');
        
        if (projectNames.length === 0) {
            const noProjects = document.createElement('div');
            noProjects.className = 'no-recent';
            noProjects.textContent = searchTerm ? 'No projects found matching your search' : 'No saved projects';
            recentList.appendChild(noProjects);
            console.log('Added no-recent message');
            return;
        }
        
        // Sort filtered projects by timestamp (newest first)
        const allSortedProjects = projectNames
            .map(projectName => ({
                name: projectName,
                ...savedProjects[projectName]
            }))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Calculate pagination
        const totalProjects = allSortedProjects.length;
        const totalPages = Math.ceil(totalProjects / projectsPerPage);
        
        // Ensure current page is valid
        if (currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;
        
        // Get projects for current page
        const startIndex = (currentPage - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        const currentPageProjects = allSortedProjects.slice(startIndex, endIndex);
        
        currentPageProjects.forEach(project => {
            const item = document.createElement('div');
            item.className = 'recent-item';
            
            // Highlight current project
            if (currentProject === project.name) {
                item.classList.add('current-project');
            }
            
            // Create delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'recent-item-delete';
            deleteBtn.innerHTML = '×';
            deleteBtn.title = 'Delete project';
            
            // Create content container
            const contentDiv = document.createElement('div');
            contentDiv.className = 'recent-item-content';
            
            const nameDiv = document.createElement('div');
            nameDiv.className = 'recent-item-name';
            nameDiv.textContent = project.name;
            
            const dateDiv = document.createElement('div');
            dateDiv.className = 'recent-item-date';
            const date = new Date(project.timestamp);
            dateDiv.textContent = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            contentDiv.appendChild(nameDiv);
            contentDiv.appendChild(dateDiv);
            
            item.appendChild(deleteBtn);
            item.appendChild(contentDiv);
            
            // Add delete handler
            deleteBtn.addEventListener('click', function(event) {
                console.log('Delete button clicked for project:', project.name);
                event.stopPropagation();
                event.preventDefault();
                
                if (confirm(`Are you sure you want to delete project "${project.name}"?`)) {
                    console.log('User confirmed deletion');
                    deleteProject(project.name);
                    // Force refresh the list after a short delay
                    setTimeout(() => {
                        console.log('Forcing list refresh after deletion');
                        updateRecentProjectsList();
                    }, 50);
                } else {
                    console.log('User cancelled deletion');
                }
            });
            
            // Add click handler for loading project
            contentDiv.addEventListener('click', function(event) {
                event.stopPropagation();
                event.preventDefault();
                const projectName = project.name;
                
        // Set current project
        currentProject = projectName;
        
        // Reset pagination to first page when loading a project
        currentPage = 1;                loadProject(projectName);
                
                // Refresh highlighting after a short delay
                setTimeout(() => updateRecentProjectsList(), 100);
            });
            
            // Make sure content is clickable
            contentDiv.style.cursor = 'pointer';
            contentDiv.style.userSelect = 'none';
            
            recentList.appendChild(item);
        });
        
        console.log('Added', currentPageProjects.length, 'projects to recent list');
        
        // Auto-select first project only on initial load if no current project is set and there are projects available
        if (initialLoad && !currentProject && allSortedProjects.length > 0) {
            const firstProject = allSortedProjects[0];
            currentProject = firstProject.name;
            console.log('Auto-selected first project:', currentProject);
            window.updateProjectNameDisplay();
            
            // Load the first project's data automatically
            window.loadProjectData(firstProject);
            initialLoad = false; // Prevent auto-selection on subsequent list updates
            
            // Add current-project class to the first item in the list
            const firstRecentItem = recentList.querySelector('.recent-item');
            if (firstRecentItem) {
                firstRecentItem.classList.add('current-project');
            }
        }
        
        // Add pagination controls (always show, even for single page)
        createPaginationControls(recentList, currentPage, totalPages, totalProjects);
        
    } catch (error) {
        console.error('Error updating recent projects list:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'no-recent';
        errorDiv.textContent = 'Error loading projects';
        recentList.appendChild(errorDiv);
    }
}

function createPaginationControls(recentList, currentPageNum, totalPages, totalProjects) {
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    
    // Info about current page
    const pageInfo = document.createElement('div');
    pageInfo.className = 'pagination-info';
    const startProject = ((currentPageNum - 1) * projectsPerPage) + 1;
    const endProject = Math.min(currentPageNum * projectsPerPage, totalProjects);
    pageInfo.textContent = `${startProject}-${endProject} of ${totalProjects}`;
    
    // Navigation controls
    const controls = document.createElement('div');
    controls.className = 'pagination-controls';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn';
    prevBtn.innerHTML = '‹';
    prevBtn.title = 'Previous page';
    prevBtn.disabled = currentPageNum === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateRecentProjectsList();
        }
    });
    
    // Page indicator
    const pageIndicator = document.createElement('span');
    pageIndicator.className = 'pagination-info';
    pageIndicator.textContent = `${currentPageNum}/${totalPages}`;
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn';
    nextBtn.innerHTML = '›';
    nextBtn.title = 'Next page';
    nextBtn.disabled = currentPageNum === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updateRecentProjectsList();
        }
    });
    
    // Only add navigation buttons if there are multiple pages
    if (totalPages > 1) {
        controls.appendChild(prevBtn);
        controls.appendChild(pageIndicator);
        controls.appendChild(nextBtn);
    } else {
        // For single page, just show the page indicator
        controls.appendChild(pageIndicator);
    }
    
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(controls);
    
    recentList.appendChild(paginationContainer);
}

// Clear all projects function
function clearAllProjects() {
    const confirmed = confirm('Are you sure you want to delete ALL saved projects and clear the canvas? This action cannot be undone!');
    
    if (confirmed) {
        try {
            // Clear all saved projects
            localStorage.removeItem('diaVinciProjects');
            
            // Clear auto-save
            localStorage.removeItem('diaVinciAutoSave');
            
            // Clear canvas using global function
            window.clearCanvas();
            
            // Reset pagination
            currentPage = 1;
            
            // Update the recent projects list
            updateRecentProjectsList();
            
            // Show success notification
            showNotification('All projects and canvas cleared successfully!', 'success');
            
        } catch (error) {
            console.error('Error clearing projects:', error);
            showNotification('Error clearing projects. Please try again.', 'error');
        }
    }
}
