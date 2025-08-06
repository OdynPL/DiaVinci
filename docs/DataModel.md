# Data Model System Documentation

The Data Model System in DiaVinci provides advanced data structure definition capabilities with visual field management and JSON Schema integration.

## Overview

The Data Model System consists of two main components:
- **DataModelNode**: The data model entity with field management
- **DataModelEditor**: Advanced modal editor for visual field editing

## Features

### 🎯 Core Capabilities

#### Field Management
- Create, edit, and delete data fields
- Drag-and-drop field reordering
- Real-time validation and error highlighting
- Duplicate field name prevention

#### Type System
| Type | Description | Validation |
|------|-------------|------------|
| `String` | Text values | Length and format validation |
| `Number` | Numeric values | NaN and range checking |
| `Boolean` | True/false values | Accepts: true, false, 1, 0, yes, no |
| `Date` | Date/time values | ISO format and date validity |
| `Email` | Email addresses | RFC-compliant email validation |
| `URL` | Web addresses | Valid URL format checking |
| `Phone` | Phone numbers | International format validation |
| `Currency` | Monetary values | Numeric with currency formatting |
| `Object` | JSON objects | Valid JSON object syntax |
| `Array` | JSON arrays | Valid JSON array syntax |

#### Field Properties
- **Required**: Field must have a value
- **Nullable**: Field can accept null values
- **ReadOnly**: Field cannot be modified after creation

### 🔄 JSON Schema Integration

#### Bi-directional Synchronization
The system automatically synchronizes between:
- Visual field editor ↔ JSON Schema
- Field properties ↔ JSON Schema properties
- Validation rules ↔ JSON Schema constraints

#### JSON Schema Features
- **Draft-07 Compliance**: Full JSON Schema specification support
- **Nullable Types**: Proper handling of `["string", "null"]` array types
- **Format Validation**: Email, URL, date-time format constraints
- **Required Fields**: Automatic required array management
- **Metadata**: Generation timestamps and field statistics

### 🎨 User Interface

#### Multi-tab Editor
1. **Fields Tab**: Visual field management
   - Add/remove fields
   - Edit field properties
   - Drag-and-drop reordering
   - Real-time validation

2. **JSON Tab**: Direct JSON Schema editing
   - Syntax highlighting
   - Line numbers
   - Error highlighting with precise positioning
   - Real-time validation

3. **Settings Tab**: Model configuration
   - Model description
   - Validation rules
   - Model type classification

#### Visual Features
- **Expanded Modal**: Large modal interface (max-w-7xl)
- **Error Highlighting**: Visual indicators with above/below line markers
- **Scroll Synchronization**: Error highlights follow scroll position
- **Real-time Feedback**: Immediate validation as you type

## Usage Guide

### Creating a Data Model

1. **Add Data Model Node**
   ```javascript
   // Drag Data Model from sidebar to canvas
   // Or programmatically:
   const dataModel = new DataModelNode({
       x: 100, y: 100,
       label: "User Model"
   });
   ```

2. **Open Editor**
   - Double-click the Data Model node
   - Editor modal opens with three tabs

3. **Add Fields**
   - Click "Add Field" button in Fields tab
   - Configure field name, type, and properties
   - Fields auto-validate as you type

### Working with JSON Schema

#### Import Existing Schema
```javascript
// Paste JSON Schema in JSON tab and click "Import JSON"
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "User name"
    },
    "email": {
      "type": ["string", "null"],
      "format": "email"
    }
  },
  "required": ["name"]
}
```

#### Export Schema
- Switch to JSON tab to see generated schema
- Click "Copy JSON" to copy to clipboard
- Schema automatically updates when fields change

### Advanced Features

#### Auto-synchronization
The system intelligently syncs changes:
- **Safe Sync**: Preserves existing data when possible
- **Change Detection**: Only syncs when changes are detected
- **Conflict Resolution**: Handles naming conflicts automatically

#### Validation System
- **Field Level**: Individual field validation
- **Model Level**: Overall model consistency
- **JSON Level**: JSON syntax and schema validation
- **Cross-tab**: Validation across all editor tabs

#### Debug Tools
Access debug information in console:
```javascript
// If DataModelEditor is open
window.debugDataModel = editor.debugState;
```

## API Reference

### DataModelNode

#### Constructor
```javascript
new DataModelNode({
    x: number,           // X position
    y: number,           // Y position
    r: number,           // Radius (default: 40)
    id: string,          // Unique ID (auto-generated)
    label: string,       // Model name
    color: string,       // Node color
    fields: Array        // Initial fields
})
```

#### Methods

##### Field Management
- `addField(fieldData)` - Add new field
- `updateField(fieldId, updates)` - Update existing field
- `removeField(fieldId)` - Remove field
- `getField(fieldId)` - Get field by ID
- `getAllFields()` - Get all fields

##### Validation
- `validateField(field)` - Validate single field
- `validateFieldName(name)` - Validate field name
- `validateInitialValue(value, type)` - Validate field value
- `isValidForSave()` - Check if model can be saved
- `isFieldNameUnique(name, excludeId)` - Check name uniqueness

##### Utilities
- `generateUniqueFieldName(baseName)` - Generate unique field name
- `getSupportedTypes()` - Get list of supported types

### DataModelEditor

#### Constructor
```javascript
new DataModelEditor(eventBus)
```

#### Methods

##### Editor Control
- `open(dataModelNode)` - Open editor for node
- `close()` - Close editor with validation check
- `switchTab(tabName)` - Switch between tabs

##### JSON Operations
- `generateJSONSchema()` - Generate JSON Schema from fields
- `updateJSONContent()` - Update JSON editor content
- `importFromJSON()` - Import fields from JSON Schema
- `validateJSON()` - Validate current JSON content
- `copyJSONToClipboard()` - Copy JSON to clipboard

##### Synchronization
- `attemptJSONSync(jsonText)` - Attempt auto-sync from JSON
- `performSafeJSONSync(schema)` - Perform safe synchronization

##### Debugging
- `debugState()` - Get current editor state for debugging

## Error Handling

### Common Errors and Solutions

#### "Field name is required"
- **Cause**: Empty or whitespace-only field name
- **Solution**: Provide a valid field name

#### "Field name 'X' is already in use"
- **Cause**: Duplicate field name (case-insensitive)
- **Solution**: Use a unique field name

#### "Invalid JSON syntax"
- **Cause**: Malformed JSON in JSON tab
- **Solution**: Fix JSON syntax errors (highlighted in editor)

#### "Schema must contain a 'properties' object"
- **Cause**: Invalid JSON Schema structure
- **Solution**: Ensure schema has proper structure with properties object

### Error Display
- **Visual Highlighting**: Errors shown with red borders and highlighting
- **Precise Location**: JSON errors highlighted at exact line and column
- **Detailed Messages**: Clear descriptions of validation issues
- **Real-time Feedback**: Errors appear immediately as you type

## Best Practices

### Field Naming
- Use descriptive, camelCase names: `firstName`, `emailAddress`
- Avoid reserved words: `id`, `type`, `class`, `function`
- Keep names under 25 characters
- Use meaningful prefixes for related fields: `user_name`, `user_email`

### Type Selection
- Use specific types when possible: `Email` instead of `String` for email fields
- Consider `nullable` for optional fields
- Use `required` for essential data
- Set appropriate `initialValue` for better UX

### JSON Schema
- Always validate before importing
- Use standard JSON Schema Draft-07 format
- Include meaningful descriptions
- Test with small schemas first

### Performance
- Limit fields to reasonable numbers (< 50 per model)
- Use efficient field names (no special characters)
- Validate incrementally rather than all at once
- Cache validation results when possible

## Troubleshooting

### Common Issues

#### Editor Won't Open
- Check if node is actually a DataModelNode
- Verify node.type === 'datamodel'
- Check browser console for errors

#### Changes Not Saving
- Check validation errors in Fields tab
- Verify all required fields have names
- Look for duplicate field names
- Check JSON syntax if edited manually

#### JSON Import Fails
- Validate JSON syntax first
- Ensure schema has 'properties' object
- Check for unsupported property types
- Verify required fields exist in properties

#### Synchronization Issues
- Switch tabs to trigger sync
- Use "Import JSON" button for manual sync
- Check for validation errors preventing sync
- Clear browser cache if persistent

### Debug Information

Enable detailed logging:
```javascript
// In browser console
Logger.setLevel('DEBUG');

// Check editor state
editor.debugState();

// Inspect current node
console.log(editor.currentNode);
```

## Version History

### v2.0.0 (Current)
- Initial Data Model System release
- Multi-tab editor interface
- Bi-directional JSON Schema sync
- Comprehensive validation system
- Visual error highlighting

---

For more information, see the main [README.md](README.md) and [CHANGELOG.md](CHANGELOG.md).
