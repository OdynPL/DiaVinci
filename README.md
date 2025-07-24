# DiaVinci - Interactive Flowchart Editor

DiaVinci is a modern, web-based flowchart and diagram editor built with vanilla JavaScript. It provides an intuitive interface for creating, editing, and managing flowcharts with advanced features like multi-selection, drag-and-drop, and real-time editing.

![DiaVinci Logo](Resources/branding/logo.svg)

## ✨ Features

### Core Functionality
- **Interactive Canvas** - HTML5 Canvas-based drawing with smooth interactions
- **Drag & Drop** - Easy component placement from the sidebar
- **Real-time Editing** - Double-click any element to edit text labels
- **Project Management** - Save, load, import, and export projects
- **Auto-Save System** - Comprehensive automatic saving with crash recovery

### Advanced Features
- **Multi-selection** - Rectangle selection and Ctrl+click for multiple elements
- **Group Operations** - Move multiple selected elements together
- **Visual Feedback** - Different highlight colors for single vs multi-selection
- **Debounced Auto-save** - Smart 500ms delay prevents excessive storage operations
- **Dual Storage** - Both temporary auto-save and named project preservation
- **No Data Loss** - Automatic restoration after browser crashes or unexpected closure

### Component Types
- **Nodes** - Regular process nodes with customizable colors
- **Start/Stop** - Special terminal nodes for flow control
- **Decision (IF)** - Diamond-shaped decision nodes with TRUE/FALSE branches
- **Text Elements** - Standalone text labels
- **Transitions** - Arrows and lines connecting components

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for file access)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/diavinci.git
   cd diavinci
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Python 2
   python -m SimpleHTTPServer 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000` in your web browser

## 🎮 Usage Guide

### Basic Operations

#### Adding Components
1. Drag components from the left sidebar onto the canvas
2. Components include: Node, Text, Start, Stop, IF, and various arrow types

#### Editing Text
1. **Double-click** any component to edit its label
2. Type your new text and press **Enter** to save
3. Press **Escape** to cancel editing
4. Click outside the text field to auto-save

#### Moving Elements
1. **Single element**: Click and drag any component
2. **Multiple elements**: Use multi-selection techniques (see below)

### Multi-Selection

#### Rectangle Selection
1. Click and drag on empty canvas area
2. All elements within the rectangle will be selected
3. Selected elements appear with blue highlighting

#### Ctrl+Click Selection
1. Hold **Ctrl** and click on individual elements
2. Click again while holding **Ctrl** to deselect
3. Mix with rectangle selection for complex selections

#### Group Operations
1. Select multiple elements using any method above
2. Click and drag any selected element to move the entire group
3. All selected elements maintain their relative positions

### Project Management

#### Saving Projects
- Projects auto-save to localStorage
- Use **Save Project** button for manual save
- Enter project name when prompted

#### Loading Projects
- Recent projects appear in the right sidebar
- Click any project to load it
- Search projects using the search bar

#### Import/Export
- **Export Image**: Save current diagram as PNG image
- **Export JSON**: Save project data as JSON file
- **Import JSON**: Load project from JSON file

### Transitions and Connections

#### Creating Transitions
1. Drag arrow components from sidebar
2. Click on source node, then target node
3. Transitions automatically route between nodes

#### IF Node Connections
- IF nodes support TRUE/FALSE branching
- Different connection points for logical flow
- Automatic label assignment for decision branches

### Auto-Save Features

#### Automatic Saving
- **Real-time protection** - Every change is automatically saved
- **Crash recovery** - Work is restored after unexpected browser closure
- **No manual save needed** - Named projects are continuously updated

#### How Auto-Save Works
1. **Modification triggers** - Creating, editing, moving, or deleting elements
2. **Debounced delay** - 500ms wait after last change to prevent excessive saves
3. **Dual storage** - Both temporary auto-save and named project storage
4. **Instant naming** - When you save a project with a name, auto-save switches to named storage

#### Visual Feedback
- Debug console shows auto-save operations (F12 → Console)
- Project statistics logged with each save
- Timestamp tracking for all operations

## 🏗️ Architecture

### Design Patterns
- **Object-Oriented Design** with SOLID principles
- **Dependency Injection** for loose coupling
- **Event-Driven Architecture** for component communication
- **Factory Pattern** for object creation
- **Service Layer** for business logic separation

### Core Components

#### Models
- `Node.js` - Flowchart nodes with different types
- `TextElement.js` - Standalone text components
- `Transition.js` - Connections between nodes
- `Project.js` - Container for entire diagram

#### Services
- `CanvasRenderer.js` - All drawing and rendering logic
- `InputService.js` - Text editing and input handling
- `StorageService.js` - Project persistence and management
- `ExportService.js` - Image and data export functionality
- `MultiSelectionManager.js` - Advanced selection features

#### Controllers
- `DiagramController.js` - Main application logic and event handling
- `UIController.js` - User interface and sidebar management

#### Core Infrastructure
- `DIContainer.js` - Dependency injection container
- `EventBus.js` - Event system for component communication
- `Logger.js` - Comprehensive logging and debugging
- `ErrorHandler.js` - Centralized error management

## 🛠️ Development

### Project Structure
```
diavinci/
├── src/
│   ├── core/           # Core infrastructure
│   ├── models/         # Data models
│   ├── services/       # Business logic services
│   ├── controllers/    # Application controllers
│   └── factories/      # Object factories
├── Resources/
│   └── Images/         # Application assets
├── styles.css          # Application styles
├── index.html          # Main application page
└── app.js             # Application entry point
```

### Adding New Features

1. **Create Model** (if needed)
   ```javascript
   // src/models/NewFeature.js
   class NewFeature {
       constructor(options) {
           // Implementation
       }
   }
   ```

2. **Create Service** (if needed)
   ```javascript
   // src/services/NewFeatureService.js
   class NewFeatureService {
       constructor(dependencies) {
           // Implementation
       }
   }
   ```

3. **Register in DI Container**
   ```javascript
   // app.js
   container.registerSingleton('newFeatureService', () => 
       new NewFeatureService(/* dependencies */)
   );
   ```

4. **Add to HTML imports**
   ```html
   <!-- index.html -->
   <script src="src/services/NewFeatureService.js"></script>
   ```

### Debugging

The application includes comprehensive logging:

```javascript
// Set logging level in Logger.js
Logger.setLevel(Logger.logLevel.DEBUG); // For detailed debugging
Logger.setLevel(Logger.logLevel.INFO);  // For normal operation
```

View logs in browser console:
- `[DiaVinci DEBUG]` - Detailed operation logs
- `[DiaVinci INFO]` - General information
- `[DiaVinci WARN]` - Warnings
- `[DiaVinci ERROR]` - Errors with stack traces

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/new-feature-name
   ```
3. **Make changes** following the established architecture
4. **Test thoroughly** in multiple browsers
5. **Commit with descriptive messages**
   ```bash
   git commit -m "feat: add new selection feature"
   ```
6. **Push and create Pull Request**

### Coding Standards

- Use **ES6+** features where appropriate
- Follow **camelCase** naming convention
- Add **JSDoc comments** for public methods
- Maintain **separation of concerns**
- Write **self-documenting code**

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
```bash
git commit -m "feat(selection): add multi-element rectangle selection"
git commit -m "fix(input): resolve text editing blur event issue"
git commit -m "docs(readme): update installation instructions"
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with vanilla JavaScript for maximum compatibility
- Inspired by modern diagramming tools
- Uses HTML5 Canvas for high-performance rendering

## 📞 Support

For questions, issues, or contributions:

1. **Check existing issues** on GitHub
2. **Create new issue** with detailed description
3. **Include browser version** and steps to reproduce
4. **Provide console logs** if applicable

---

**Happy Diagramming!** 🎨✨
