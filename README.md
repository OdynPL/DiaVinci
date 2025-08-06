# DiaVinci - Interactive Flowchart Editor

Modern web-based flowchart editor built with vanilla JavaScript. Create, edit, and manage diagrams with drag-and-drop interface and real-time collaboration features.

## ✨ Features

- **Interactive Canvas** - HTML5 Canvas with smooth drag-and-drop
- **Multi-selection** - Rectangle selection and Ctrl+click for multiple elements
- **Auto-Save** - Automatic project saving with crash recovery
- **Export Options** - PNG images (white/transparent) and JSON files
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Project Management** - Save, load, and organize multiple projects
- **🆕 Data Model Editor** - Advanced field management with JSON Schema support

### Components
- **Nodes** - Process boxes, Start/Stop, Decision diamonds
- **🆕 Data Model Node** - Define data structures with fields, types, and validation
- **Text Elements** - Standalone labels and annotations  
- **Transitions** - Arrows, lines, and curved connections
- **Break Points** - Advanced routing for complex diagrams

### 🆕 Data Model Features
- **Field Management** - Create, edit, and validate data fields
- **Type Support** - 30+ data types including String, Number, Integer, Float, Boolean, Date, DateTime, Email, URL, UUID, Password, Color, IPv4/IPv6, JSON, Binary, and more
- **Smart Input Controls** - Currency with dropdown selection, Country/Language/Timezone code pickers, Percentage slider
- **Field Properties** - Required, Nullable, ReadOnly attributes
- **JSON Schema** - Bi-directional sync between visual fields and JSON Schema
- **Real-time Validation** - Live error detection and highlighting
- **Auto-synchronization** - Intelligent sync between field editor and JSON view

## 🚀 Quick Start

1. **Clone and run locally**
   ```bash
   git clone https://github.com/OdynPL/DiaVinci.git
   cd diavinci
   python -m http.server 8000  # or any local server
   ```

2. **Open in browser**: `http://localhost:8000`

3. **Start creating**:
   - Drag components from left sidebar to canvas
   - Double-click elements to edit text
   - Use bottom navigation for save/load/export

## 🎮 Usage

### Basic Operations
- **Add Elements**: Drag from sidebar to canvas
- **Edit Text**: Double-click any element
- **🆕 Edit Data Model**: Double-click Data Model node to open advanced editor
- **Multi-select**: Drag rectangle or Ctrl+click
- **Remove**: Select elements, click Remove button
- **Save Project**: Bottom navigation → Save → Enter name

### 🆕 Data Model Editor
- **Fields Tab**: Visual field editor with drag-and-drop reordering and smart input controls
- **JSON Tab**: Direct JSON Schema editing with syntax highlighting and Accept JSON functionality
- **Settings Tab**: Model-wide configuration options
- **Field Types**: Comprehensive type system with validation and smart inputs
- **Smart Controls**: Currency selector with 16 currencies, Country/Language/Timezone dropdowns, Interactive percentage slider
- **Expanded UI**: Wider modal (90% viewport width) for better usability
- **Real-time Sync**: Changes automatically sync between visual and JSON views
- **Accept JSON**: Apply JSON Schema changes to visual field editor

### Export Options
- **Export Image**: White or transparent background PNG
- **Export File**: JSON format for sharing/backup
- **Import File**: Load JSON projects

### Navigation
- **New Project**: Creates auto-named project (New_YYYY-MM-DD...)
- **Load Project**: Browse recent projects in right sidebar
- **Search**: Filter projects by name

## 🛠️ Architecture

```
src/
├── core/           # EventBus, DI Container, Logger
├── models/         # Node, Transition, Project classes  
│   └── DataModelNode.js    # Advanced data model with field validation
├── services/       # Canvas, Storage, Export services
├── controllers/    # Diagram and UI controllers
├── ui/             # User interface components
│   └── DataModelEditor.js  # Advanced modal editor for data models
└── factories/      # Dialog and component factories
```

### Key Components

#### DataModelNode
- Dynamic field management system
- Type validation and constraints
- JSON Schema generation
- Field uniqueness and naming validation

#### DataModelEditor
- Multi-tab interface (Fields, JSON, Settings)
- Real-time JSON Schema validation
- Bi-directional synchronization
- Drag-and-drop field reordering
- Visual error highlighting with line numbers

## 📚 Documentation

- **[Data Model System](docs/DataModel.md)** - Comprehensive guide to the Data Model editor
- **[API Reference](docs/API.md)** - Detailed API documentation (coming soon)
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the project (coming soon)

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "feat: add new feature"`
4. Push and create Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Happy Diagramming!** 🎨
