// Initialize dependency injection container and application
let container;
let diagramController;
let uiController;

// Initialize application
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Initialize dependency injection container
        container = new DIContainer();
        
        // Register core services
        container.registerSingleton('eventBus', () => new EventBus());
        
        // Register services
        container.registerSingleton('storageService', () => new StorageService());
        container.registerSingleton('notificationService', () => new NotificationService());
        
        // Get canvas element
        const canvas = document.getElementById('drawCanvas');
        
        // Register canvas-dependent services
        container.registerSingleton('canvasRenderer', () => 
            new CanvasRenderer(canvas, container.resolve('eventBus'))
        );
        container.registerSingleton('exportService', () => 
            new ExportService(canvas)
        );
        container.registerSingleton('inputService', () => 
            new InputService(canvas, container.resolve('eventBus'))
        );
        
        // Register factories
        container.registerTransient('nodeFactory', () => 
            new NodeFactory(container.resolve('eventBus'))
        );
        container.registerTransient('dialogFactory', () => new DialogFactory());
        
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
                container.resolve('dialogFactory')
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
        
        console.log('DiaVinci application initialized successfully!');
        
    } catch (error) {
        console.error('Error initializing application:', error);
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
            diagramController.redraw();
        }
    }
}
