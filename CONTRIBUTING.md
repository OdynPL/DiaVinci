# Contributing to DiaVinci

Thank you for considering contributing to DiaVinci! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/yourusername/diavinci.git
   cd diavinci
   ```

2. **Start development server**
   ```bash
   python -m http.server 8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

## 📋 How to Contribute

### Reporting Issues

Before creating an issue, please:

1. **Search existing issues** to avoid duplicates
2. **Check the FAQ** in README.md
3. **Test in multiple browsers** if possible

When creating an issue, include:

- **Clear description** of the problem or feature request
- **Steps to reproduce** (for bugs)
- **Expected vs actual behavior**
- **Browser version and OS**
- **Console errors** (if any)
- **Screenshots** (if relevant)

### Pull Requests

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our coding standards
3. **Test thoroughly** across different browsers
4. **Commit with clear messages** (see commit format below)
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create Pull Request** with detailed description

## 🏗️ Architecture Guidelines

### Code Organization

```
src/
├── core/           # Infrastructure (DI, Events, Logging)
├── models/         # Data models and business entities
├── services/       # Business logic and external interactions
├── controllers/    # User interaction and application flow
└── factories/      # Object creation patterns
```

### Design Principles

1. **SOLID Principles**
   - Single Responsibility
   - Open/Closed
   - Liskov Substitution
   - Interface Segregation
   - Dependency Inversion

2. **Separation of Concerns**
   - Models: Data structure and validation
   - Services: Business logic
   - Controllers: User interaction
   - Renderers: Drawing and visualization

3. **Dependency Injection**
   - Use DIContainer for all dependencies
   - Avoid tight coupling between components
   - Register all services in app.js

### Adding New Features

#### 1. Create Model (if needed)
```javascript
// src/models/NewFeature.js
class NewFeature {
    constructor(options = {}) {
        this.id = options.id || this.generateId();
        this.x = options.x || 0;
        this.y = options.y || 0;
        // ... other properties
    }

    /**
     * Move element to new position
     */
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * Check if point is within element bounds
     */
    containsPoint(x, y) {
        // Implementation
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return 'feature_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}
```

#### 2. Create Service (if needed)
```javascript
// src/services/NewFeatureService.js
class NewFeatureService {
    constructor(eventBus, errorHandler = null) {
        this.eventBus = eventBus;
        this.errorHandler = errorHandler;
        Logger.info('NewFeatureService initialized');
    }

    /**
     * Public method with error handling
     */
    performAction(data) {
        try {
            Logger.debug('Performing action', data);
            
            // Business logic here
            const result = this.processData(data);
            
            // Emit event for other components
            this.eventBus.emit('feature.action.completed', result);
            
            return result;
        } catch (error) {
            Logger.error('Action failed', error);
            if (this.errorHandler) {
                this.errorHandler.handleError(error, 'Failed to perform action');
            }
            throw error;
        }
    }

    /**
     * Private helper method
     */
    processData(data) {
        // Implementation
    }
}
```

#### 3. Register in DI Container
```javascript
// app.js
container.registerSingleton('newFeatureService', () => 
    new NewFeatureService(
        container.resolve('eventBus'),
        container.resolve('errorHandler')
    )
);
```

#### 4. Add HTML import
```html
<!-- index.html -->
<script src="src/services/NewFeatureService.js"></script>
```

## 📝 Coding Standards

### JavaScript Style

1. **ES6+ Features**
   ```javascript
   // Use const/let instead of var
   const config = { setting: true };
   let counter = 0;

   // Use arrow functions for callbacks
   elements.forEach(element => element.render());

   // Use template literals
   const message = `Processing ${count} elements`;

   // Use destructuring
   const { x, y, width, height } = bounds;
   ```

2. **Naming Conventions**
   ```javascript
   // Classes: PascalCase
   class MultiSelectionManager { }

   // Methods and variables: camelCase
   const selectedElements = [];
   function handleMouseClick() { }

   // Constants: UPPER_SNAKE_CASE
   const MAX_SELECTION_COUNT = 100;

   // Private methods: prefix with _
   _internalHelper() { }
   ```

3. **Documentation**
   ```javascript
   /**
    * Calculate distance between two points
    * @param {number} x1 - First point X coordinate
    * @param {number} y1 - First point Y coordinate
    * @param {number} x2 - Second point X coordinate
    * @param {number} y2 - Second point Y coordinate
    * @returns {number} Distance between points
    */
   calculateDistance(x1, y1, x2, y2) {
       return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
   }
   ```

### Error Handling

1. **Use try-catch blocks** for risky operations
2. **Log errors** with context
3. **Provide user-friendly messages**
4. **Don't suppress errors** silently

```javascript
performOperation(data) {
    try {
        Logger.debug('Starting operation', { data });
        
        const result = this.riskyOperation(data);
        
        Logger.info('Operation completed successfully');
        return result;
    } catch (error) {
        Logger.error('Operation failed', error, { data });
        
        if (this.errorHandler) {
            this.errorHandler.handleError(error, 'Operation failed');
        }
        
        throw error; // Re-throw for caller to handle
    }
}
```

### Event System

1. **Use EventBus** for component communication
2. **Follow naming convention**: `component.action.status`
3. **Include relevant data** in event payload

```javascript
// Emit events
this.eventBus.emit('element.selected', { element, type });
this.eventBus.emit('project.saved', { project, timestamp });

// Listen to events
this.eventBus.on('element.edited', (data) => this.handleElementEdited(data));
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting PR, test:

#### Basic Functionality
- [ ] Drag and drop components from sidebar
- [ ] Double-click editing for all element types
- [ ] Single element dragging
- [ ] Project save/load operations

#### Multi-Selection
- [ ] Rectangle selection on empty canvas
- [ ] Ctrl+click individual selection
- [ ] Group dragging of selected elements
- [ ] Visual feedback (blue highlighting)

#### Edge Cases
- [ ] Very small/large canvas elements
- [ ] Rapid clicking and dragging
- [ ] Keyboard shortcuts during various operations
- [ ] Browser resize during operations

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (if on Mac)
- [ ] Edge (latest)

### Performance Testing

- [ ] Large diagrams (50+ elements)
- [ ] Rapid multi-selection operations
- [ ] Memory usage during extended sessions
- [ ] Smooth animations and transitions

## 📊 Commit Message Format

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Scopes
- `core`: Core infrastructure changes
- `ui`: User interface changes
- `canvas`: Canvas rendering changes
- `selection`: Multi-selection features
- `input`: Text input and editing
- `storage`: Project storage and management
- `export`: Export functionality

### Examples
```bash
feat(selection): add rectangle multi-selection
fix(input): resolve blur event timing issue
docs(readme): update installation instructions
refactor(canvas): extract rendering utilities
chore(deps): update development dependencies
```

## 🔍 Code Review Guidelines

### For Reviewers

1. **Check architecture** - Does it follow SOLID principles?
2. **Verify error handling** - Are errors properly caught and logged?
3. **Test functionality** - Does it work as described?
4. **Review documentation** - Are public methods documented?
5. **Consider edge cases** - What could go wrong?

### For Contributors

1. **Self-review first** - Check your own code before requesting review
2. **Add comments** for complex logic
3. **Update documentation** if adding public APIs
4. **Test edge cases** - Don't just test the happy path
5. **Keep PRs focused** - One feature/fix per PR

## 🐛 Debugging Tips

### Console Logging

```javascript
// Enable debug logging
Logger.setLevel(Logger.logLevel.DEBUG);

// View in console
// [DiaVinci DEBUG] - Detailed operation logs
// [DiaVinci INFO] - General information
// [DiaVinci ERROR] - Errors with stack traces
```

### Common Issues

1. **Element not responding to clicks**
   - Check `containsPoint()` method
   - Verify element is in project arrays
   - Check z-index and rendering order

2. **Events not firing**
   - Verify EventBus registration
   - Check event names for typos
   - Ensure proper this binding

3. **Rendering issues**
   - Check canvas context state
   - Verify coordinate calculations
   - Test with different canvas sizes

## 🎯 Feature Priorities

### High Priority
- Performance optimizations
- Mobile/touch support
- Undo/redo functionality
- Keyboard shortcuts

### Medium Priority
- Additional shape types
- Snap-to-grid functionality
- Export to different formats
- Theme customization

### Low Priority
- Collaborative editing
- Plugin system
- Advanced styling options
- Integration with external services

## 📞 Getting Help

1. **Check documentation** first
2. **Search existing issues** on GitHub
3. **Ask questions** in discussions
4. **Contact maintainers** for major contributions

Thank you for contributing to DiaVinci! 🎨✨
