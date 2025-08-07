// Initialize dependency injection container and application
let container;
let diagramController;
let uiController;

// Initialize application
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize dependency injection container
        container = new DIContainer();
        
        // Set debug logging to see auto-save in action
        Logger.setLevel(Logger.logLevel.DEBUG);
        
        // Register core services
        container.registerSingleton('eventBus', () => new EventBus());
        
        // Register services
        container.registerSingleton('notificationService', () => new NotificationService());
        container.registerSingleton('terminalService', () => new TerminalService());
        container.registerSingleton('errorHandler', () => 
            new ErrorHandler(container.resolve('notificationService'))
        );
        container.registerSingleton('storageService', () => 
            new StorageService(container.resolve('errorHandler'))
        );
        
        // Get canvas element
        const canvas = document.getElementById('drawCanvas');
        
        // Register canvas-dependent services
        container.registerSingleton('canvasRenderer', () => 
            new CanvasRenderer(canvas, container.resolve('eventBus'), container.resolve('errorHandler'))
        );
        container.registerSingleton('exportService', () => 
            new ExportService(canvas, container.resolve('canvasRenderer'), container.resolve('errorHandler'))
        );
        container.registerSingleton('inputService', () => 
            new InputService(canvas, container.resolve('eventBus'), container.resolve('errorHandler'))
        );
        
        // Register factories
        container.registerTransient('nodeFactory', () => 
            new NodeFactory(container.resolve('eventBus'))
        );
        container.registerTransient('dialogFactory', () => new DialogFactory());
        
        // Register break point service first (needed by MultiSelectionManager)
        container.registerSingleton('breakPointService', () => 
            new BreakPointService(
                container.resolve('eventBus'),
                container.resolve('errorHandler')
            )
        );
        
        // Register grid service
        container.registerSingleton('gridService', () => 
            new GridService(
                canvas,
                container.resolve('eventBus'),
                container.resolve('errorHandler')
            )
        );
        
        // Register multi-selection manager
        container.registerSingleton('multiSelectionManager', () => 
            new MultiSelectionManager(
                container.resolve('eventBus'),
                container.resolve('breakPointService'),
                container.resolve('errorHandler')
            )
        );
        
        // Register controllers
        container.registerSingleton('diagramController', () => 
            new DiagramController(
                canvas,
                container.resolve('eventBus'),
                container.resolve('canvasRenderer'),
                container.resolve('storageService'),
                container.resolve('exportService'),
                container.resolve('inputService'),
                container.resolve('nodeFactory'),
                container.resolve('dialogFactory'),
                container.resolve('multiSelectionManager'),
                container.resolve('breakPointService'),
                container.resolve('gridService'),
                container.resolve('errorHandler')
            )
        );
        
        container.registerSingleton('uiController', () => 
            new UIController(
                container.resolve('eventBus'),
                container.resolve('diagramController'),
                container.resolve('storageService'),
                container.resolve('notificationService'),
                container.resolve('errorHandler')
            )
        );
        
        // Initialize controllers
        diagramController = container.resolve('diagramController');
        uiController = container.resolve('uiController');
        
        // Initialize terminal service
        const terminalService = container.resolve('terminalService');
        window.terminalService = terminalService; // Make globally accessible
        
        // Make container globally accessible for dialogs
        window.container = container;
        
        // Setup sidebar toggle
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const content = document.querySelector('.content');
        
        if (menuToggle && sidebar && content) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                content.classList.toggle('expanded');
            });
        }
        
        // Initialize canvas size
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        Logger.info('DiaVinci application initialized successfully!');
        
    } catch (error) {
        Logger.error('Error initializing application', error);
        alert('Error starting application. Please refresh the page.');
    }
});

// Canvas resizing
function resizeCanvas() {
    const canvas = document.getElementById('drawCanvas');
    if (canvas) {
        const container = canvas.parentElement;
        if (container) {
            // Set minimum dimensions for mobile
            const minWidth = 320;
            const minHeight = 400;
            
            // Calculate available space
            const containerRect = container.getBoundingClientRect();
            const availableWidth = Math.max(containerRect.width - 32, minWidth); // 32px for padding
            const availableHeight = Math.max(
                window.innerHeight - 250, // Account for headers and margins
                minHeight
            );
            
            canvas.width = availableWidth;
            canvas.height = availableHeight;
            
            // Update canvas style for responsive display
            canvas.style.maxWidth = '100%';
            canvas.style.height = 'auto';
        }
        
        // Trigger redraw through diagram controller
        if (diagramController) {
            diagramController.render();
            
            // Update grid canvas size if grid service exists
            if (diagramController.gridService) {
                diagramController.gridService.updateGridCanvasSize();
            }
        }
    }
}
