# Changelog

All notable changes to DiaVinci will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Complete object-oriented architecture refactor
- Multi-selection functionality with rectangle selection
- Ctrl+click for individual element selection
- Group dragging of selected elements
- Enhanced text editing with auto-save
- **Comprehensive Auto-Save System** - Real-time saving with crash recovery
- **Debounced Auto-Save** - 500ms delay prevents excessive storage operations
- **Dual Storage Auto-Save** - Both temporary and named project preservation
- **Smart Project Naming** - Automatic switching to named project storage
- **Advanced Transition Styling** - Convert straight transitions to curved/elliptical style
- **Transition Break Points** - Add custom routing points to transition lines
- **Right-Click Context Menu** - Quick access to transition styling options
- **Smooth Curved Rendering** - Bezier curves for professional-looking diagrams
- **Break Point Management** - Add, remove, and clear break points with visual feedback
- Comprehensive error handling system
- Event-driven architecture with EventBus
- Dependency injection container
- Advanced logging system
- Professional project documentation

### Changed
- Migrated from procedural to OOP architecture
- Improved canvas rendering performance
- Enhanced user interaction responsiveness
- Better separation of concerns across modules
- **Auto-Save Integration** - Seamlessly integrated with all modification operations
- **Project Management** - Enhanced save/load workflows with auto-naming
- **Storage Architecture** - Dual-layer storage for maximum data protection

### Fixed
- Text editing auto-save on blur events
- Dialog closing issues
- Image export functionality
- Memory leaks in event handling
- Canvas state management issues
- **Data Loss Prevention** - Comprehensive auto-save eliminates unsaved work loss
- **Browser Crash Recovery** - Automatic restoration of work after unexpected closure
- Memory leaks in event handling
- Canvas state management issues

## [1.0.0] - 2024-01-XX - Initial Release

### Added
- Basic flowchart creation functionality
- Drag and drop interface
- Shape library (rectangles, diamonds, circles, arrows)
- Text editing capabilities
- Project save/load functionality
- Image export (PNG format)
- Responsive canvas interface

### Core Features
- **Element Creation**: Drag shapes from sidebar to canvas
- **Text Editing**: Double-click any element to edit text
- **Project Management**: Save/load projects as JSON
- **Export Capabilities**: Export diagrams as PNG images
- **Interactive Canvas**: Zoom, pan, and navigate large diagrams

### Architecture
- HTML5 Canvas for rendering
- Vanilla JavaScript implementation
- Modular code structure
- Event-driven interactions

---

## Version Numbering

- **Major**: Breaking changes or significant new features
- **Minor**: New features that are backward compatible
- **Patch**: Bug fixes and small improvements

## Contribution Guidelines

Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## Support

For questions, issues, or feature requests, please check the [GitHub Issues](https://github.com/yourusername/diavinci/issues) page.
