# Auto-Save Functionality 

## 🔄 Overview

DiaVinci now includes comprehensive auto-save functionality that automatically saves your work as you make changes to your diagrams. This ensures that your progress is never lost and provides seamless project management.

## ✨ Features

### 🚀 **Automatic Saving**
- **Real-time auto-save** after every modification
- **Debounced saving** (500ms delay) to prevent excessive storage operations
- **Both temporary and named project saving**

### 📝 **What Triggers Auto-Save**
1. **Creating Elements**
   - Adding nodes (regular, start, stop, IF)
   - Creating text elements
   - Drawing transitions/arrows

2. **Editing Elements**
   - Text editing (auto-save on blur, Enter, Escape, click-outside)
   - Moving elements (single or group drag)

3. **Deleting Elements**
   - Removing nodes, text, or transitions

4. **Project Management**
   - Setting project name
   - Loading projects

### 🏗️ **How It Works**

#### **Dual Storage System:**
1. **Temporary Auto-Save** (`diaVinciAutoSave`)
   - Continuously saves all changes
   - Used for recovery if browser crashes
   - Available even for unnamed projects

2. **Named Project Auto-Save**
   - When project has a name, also saves to named project storage
   - Keeps named projects up-to-date automatically
   - Accessible through project list

#### **Debouncing Logic:**
```javascript
triggerAutoSave() {
    // Clear previous timeout to prevent excessive saves
    if (this.autoSaveTimeout) {
        clearTimeout(this.autoSaveTimeout);
    }
    
    // Wait 500ms after last change before saving
    this.autoSaveTimeout = setTimeout(() => {
        this.autoSave();
    }, 500);
}
```

## 🎯 **Implementation Details**

### **DiagramController Changes**
- Added `autoSaveTimeout` for debouncing
- New `triggerAutoSave()` method for delayed saving
- Enhanced `autoSave()` method for dual storage
- New `setProjectName()` method for project naming

### **Auto-Save Integration Points**
```javascript
// Element creation
createElement(type, x, y) {
    // ... create element logic
    this.triggerAutoSave();
}

// Element editing
handleElementEdited(data) {
    this.render();
    this.triggerAutoSave();
}

// Element deletion
deleteSelectedElement() {
    // ... deletion logic
    this.triggerAutoSave();
}

// Element movement
handleMouseUp(e) {
    // ... handle drag end
    if (wasModified) {
        this.triggerAutoSave();
    }
}
```

### **StorageService Enhancements**
- Enhanced logging for auto-save operations
- Better error handling for storage failures
- Detailed debug information about save operations

## 🎮 **User Experience**

### **Visual Feedback**
- Debug console shows auto-save operations
- Includes project statistics (node count, transitions, etc.)
- Timestamps for all save operations

### **Recovery Features**
- Automatic loading of last session on startup
- No data loss between browser sessions
- Seamless transition between unnamed and named projects

## 🔧 **Configuration**

### **Debug Logging**
```javascript
// Enable debug logging to see auto-save in action
Logger.setLevel(Logger.logLevel.DEBUG);
```

### **Auto-Save Timing**
- **Debounce delay**: 500ms (configurable)
- **Immediate save**: When project gets a name
- **Load on startup**: Automatic recovery

## 📊 **Storage Structure**

### **Auto-Save Data Format**
```json
{
    "name": "Project Name or null",
    "nodes": [...],
    "transitions": [...],
    "texts": [...],
    "nodeCounter": 5,
    "timestamp": "2024-07-24T10:30:00.000Z",
    "version": "1.0"
}
```

### **Storage Keys**
- `diaVinciAutoSave`: Temporary auto-save data
- `diaVinciProjects`: Named projects collection

## 🚨 **Error Handling**

### **Graceful Degradation**
- Auto-save failures don't interrupt user workflow
- Detailed error logging for debugging
- Fallback to manual save if auto-save fails

### **Debug Information**
```javascript
// Example debug output
[DiaVinci DEBUG] - Auto-save triggered after modification
[DiaVinci DEBUG] - Auto-save completed {
    projectName: "My Flowchart",
    nodeCount: 5,
    transitionCount: 4,
    textCount: 2,
    timestamp: "2024-07-24T10:30:00.000Z"
}
```

## 🔮 **Future Enhancements**

### **Planned Features**
- Configurable auto-save intervals
- Version history/snapshots
- Cloud storage integration
- Collaborative real-time editing
- Conflict resolution for concurrent edits

### **Optimization Opportunities**
- Selective saving (only changed elements)
- Compression for large projects
- Background worker for heavy saves
- Storage quota management

## ✅ **Testing**

### **Manual Test Scenarios**
1. **Create elements** → Check console for auto-save logs
2. **Edit text** → Verify save on blur/Enter/Escape
3. **Move elements** → Confirm save after drag end
4. **Delete elements** → Ensure save after deletion
5. **Name project** → Verify immediate save to named storage
6. **Refresh browser** → Check automatic recovery

### **Expected Console Output**
```
[DiaVinci DEBUG] - Auto-save triggered after modification
[DiaVinci DEBUG] - Auto-save completed { projectName: "Untitled", nodeCount: 1, ... }
[DiaVinci INFO] - Project name set { projectName: "My Project" }
[DiaVinci DEBUG] - Auto-saved to named project { projectName: "My Project" }
```

---

**Note**: This auto-save system provides robust data protection while maintaining smooth user experience. All changes are preserved automatically, giving users confidence that their work is always safe.
