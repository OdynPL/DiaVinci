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
            new InputService(canvas, container.resolve('eventBus'))
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
                container.resolve('errorHandler')
            )
        );
        
        container.registerSingleton('uiController', () => 
            new UIController(
                container.resolve('eventBus'),
                container.resolve('diagramController'),
                container.resolve('storageService'),
                container.resolve('notificationService')
            )
        );
        
        // Initialize controllers
        diagramController = container.resolve('diagramController');
        uiController = container.resolve('uiController');
        
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
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        // Trigger redraw through diagram controller
        if (diagramController) {
            diagramController.render();
        }
    }
}
