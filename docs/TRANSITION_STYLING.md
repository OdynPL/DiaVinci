# Transition Styling System

## Overview

The DiaVinci transition styling system provides advanced visual customization for diagram connections, allowing users to create professional-looking flowcharts with curved transitions and custom routing paths.

## Features

### Transition Styles

#### Straight Transitions (Default)
- Direct line connections between nodes
- Minimal visual complexity
- Best for simple, clear diagrams

#### Curved Transitions
- Smooth elliptical curves between nodes
- Professional appearance
- Better visual flow for complex diagrams
- Automatic curve calculation based on distance

### Break Point System

#### What are Break Points?
Break points are custom routing points that allow you to control the exact path a transition takes between nodes.

#### Break Point Features
- **Custom Routing**: Create complex paths around obstacles
- **Visual Feedback**: Break points appear as small circles on transitions
- **Dynamic Insertion**: Automatically placed at optimal positions
- **Easy Management**: Add, remove, or clear all break points

## User Interface

### Right-Click Context Menu

When you right-click on any transition, a context menu appears with the following options:

1. **Convert to Curved/Straight**: Toggle between transition styles
2. **Add Break Point**: Insert a new routing point at the click location
3. **Remove Break Point**: Delete the nearest break point (only appears when near one)
4. **Clear All Break Points**: Remove all break points from the transition

### Visual Indicators

- **Selected Transitions**: Highlighted in golden yellow (#e6b800)
- **Break Points**: Small circles with white borders
- **Selected Break Points**: Golden color when transition is selected

## Technical Implementation

### Transition Model Enhancements

The `Transition` class now includes:

```javascript
{
    style: 'straight' | 'curved',    // Transition visual style
    breakPoints: [{x, y}, ...]      // Array of routing points
}
```

### New Methods

#### Style Management
- `toggleStyle()`: Switch between straight and curved
- `setStyle(style)`: Set specific style

#### Break Point Management
- `addBreakPoint(x, y)`: Add routing point
- `removeBreakPoint(x, y)`: Remove nearest point
- `clearBreakPoints()`: Remove all points
- `isNearBreakPoint(x, y)`: Check proximity to break point
- `getPathPoints()`: Get complete path including break points

### Rendering System

#### Curved Path Algorithms

**Simple Curves**: Uses quadratic Bezier curves for transitions without break points
```javascript
// Perpendicular offset for natural curve
const curvature = Math.min(distance * 0.2, 50);
ctx.quadraticCurveTo(controlX, controlY, endX, endY);
```

**Multi-Point Curves**: Uses multiple Bezier segments for smooth paths through break points
```javascript
// Smooth curves through multiple points
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pointX, pointY);
```

#### Break Point Rendering
- 4px radius circles
- White stroke for contrast
- Color matches transition selection state

## Data Persistence

### JSON Serialization

Transitions now serialize with complete styling information:

```json
{
    "fromId": "node1",
    "toId": "node2", 
    "label": "Connection",
    "type": "arrow",
    "style": "curved",
    "breakPoints": [
        {"x": 150, "y": 200},
        {"x": 250, "y": 150}
    ]
}
```

### Auto-Save Integration

All styling changes trigger the auto-save system:
- Style conversions
- Break point additions/removals
- Complete break point clearing

## Usage Examples

### Converting to Curved Style
1. Right-click any straight transition
2. Select "Convert to Curved"
3. Transition immediately renders as smooth curve

### Adding Custom Routing
1. Right-click transition where you want a break point
2. Select "Add Break Point"
3. Break point appears as small circle
4. Transition now routes through this point

### Complex Path Creation
1. Add multiple break points along desired path
2. Convert to curved style for smooth routing
3. Adjust break points by removing and re-adding as needed

## Best Practices

### When to Use Curved Transitions
- Complex diagrams with many connections
- Professional presentations
- When visual flow is important
- Reducing visual clutter

### When to Use Break Points
- Avoiding overlaps with other elements
- Creating specific routing requirements
- Improving diagram readability
- Separating parallel connections

### Performance Considerations
- Curved rendering is slightly more expensive than straight lines
- Break points increase rendering complexity
- Recommended to use judiciously in very large diagrams

## Keyboard Shortcuts

Currently no keyboard shortcuts are implemented for transition styling. All operations use the right-click context menu for intuitive discovery and use.

## Future Enhancements

Potential future features:
- Drag-and-drop break point repositioning
- Keyboard shortcuts for style conversion
- Custom curve tension controls
- Transition style templates
- Automatic curve optimization
- Snap-to-grid for break points

---

*This document describes the transition styling system implemented in DiaVinci v2.0+*
