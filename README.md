# DiaVinci - Interactive Flowchart Editor

Modern web-based flowchart editor built with vanilla JavaScript. Create, edit, and manage diagrams with drag-and-drop interface and real-time collaboration features.

## ✨ Features

- **Interactive Canvas** - HTML5 Canvas with smooth drag-and-drop
- **Multi-selection** - Rectangle selection and Ctrl+click for multiple elements
- **Auto-Save** - Automatic project saving with crash recovery
- **Export Options** - PNG images (white/transparent) and JSON files
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Project Management** - Save, load, and organize multiple projects

### Components
- **Nodes** - Process boxes, Start/Stop, Decision diamonds
- **Text Elements** - Standalone labels and annotations  
- **Transitions** - Arrows, lines, and curved connections
- **Break Points** - Advanced routing for complex diagrams

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
- **Multi-select**: Drag rectangle or Ctrl+click
- **Remove**: Select elements, click Remove button
- **Save Project**: Bottom navigation → Save → Enter name

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
├── services/       # Canvas, Storage, Export services
├── controllers/    # Diagram and UI controllers
└── factories/      # Dialog and component factories
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "feat: add new feature"`
4. Push and create Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Happy Diagramming!** 🎨
