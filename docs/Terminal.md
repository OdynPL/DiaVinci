# Developer Terminal Documentation

The DiAVinci Developer Terminal provides a powerful command-line interface for project management, debugging, and system analysis. Access it by clicking the terminal icon in the UI.

## 🚀 Quick Start

1. **Open Terminal**: Click the terminal icon in the bottom navigation
2. **Type Commands**: Start typing any command
3. **Use TAB**: Press TAB for auto-completion
4. **Get Help**: Type `help` to see all available commands

## ⌨️ Key Features

### TAB Auto-Completion
- Press **TAB** to auto-complete commands
- Shows multiple matches when available
- Automatically adds space for commands requiring parameters
- Smart prefix completion for faster typing

### Command History
- Use **Arrow Up/Down** to navigate command history
- Stores last 50 commands
- Access with `history` command

### Professional Output
- Unicode box formatting for all results
- Detailed element information with structured display
- Color-coded messages (info, warning, error, success)
- Intelligent text truncation for readability

## 📋 Command Reference

### 🔧 Basic Commands

| Command | Description | Example |
|---------|-------------|---------|
| `help` | Show complete command reference | `help` |
| `clear` | Clear terminal output | `clear` |
| `status` | Show system status | `status` |
| `export` | Export logs to file | `export` |
| `version` | Show application version | `version` |
| `time` | Show current time | `time` |
| `history` | Show command history | `history` |
| `reset` | Reset application state | `reset confirm` |

### 🔍 Search & Inspect Commands

| Command | Description | Example |
|---------|-------------|---------|
| `find <id>` | Find element by ID | `find 123` |
| `search <text>` | Search elements by text content | `search "user data"` |
| `inspect <id>` | Show detailed element information | `inspect 456` |
| `list elements` | List all project elements | `list elements` |
| `list nodes` | List only nodes | `list nodes` |
| `list texts` | List only text elements | `list texts` |
| `list trans` | List only transitions | `list trans` |
| `count` | Count all project elements | `count` |

### 📊 Analytics Commands

| Command | Description | Example |
|---------|-------------|---------|
| `stats` | Show detailed project statistics | `stats` |
| `memory` | Show memory usage information | `memory` |
| `performance` | Show performance metrics | `performance` |
| `validate` | Validate project integrity | `validate` |

### 🛠️ Debugging Commands

| Command | Description | Example |
|---------|-------------|---------|
| `debug on` | Enable debug logging | `debug on` |
| `debug off` | Disable debug logging | `debug off` |
| `debug project` | Show project debug info | `debug project` |
| `logs <type>` | Filter logs by type | `logs error` |
| `trace <id>` | Trace element relationships | `trace 789` |
| `errors` | Show recent error logs | `errors` |

### ⚙️ System Commands

| Command | Description | Example |
|---------|-------------|---------|
| `config` | Show system configuration | `config` |
| `backup` | Create project backup | `backup` |
| `cleanup` | Clean temporary data | `cleanup` |
| `ping` | Test system responsiveness | `ping` |

### 📋 Data Model Commands

| Command | Description | Example |
|---------|-------------|---------|
| `models` | List all data model nodes | `models` |
| `fields <id>` | List all fields of data model | `fields 123` |
| `field <id> <name>` | Get specific field value | `field 123 username` |

## 🎯 Usage Examples

### Finding Elements
```bash
# Find specific element by ID
find 123

# Search elements containing "user"
search user

# Get detailed inspection of element
inspect 456
```

### Project Analysis
```bash
# Get project overview
count

# Detailed statistics
stats

# List all nodes with details
list nodes

# Validate project integrity
validate
```

### Debugging Workflow
```bash
# Check for errors
errors

# Trace element relationships
trace 123

# Debug project structure
debug project

# Validate everything is correct
validate
```

### System Maintenance
```bash
# Check system health
ping

# Clean up temporary data
cleanup

# Create backup
backup

# Check configuration
config
```

### Data Model Management
```bash
# List all data model nodes
models

# Show all fields of data model with ID 123
fields 123

# Get specific field value
field 123 username

# Get field with spaces in name
field 123 "full name"
```

## 📖 Command Output Format

### Element Information Display
All element commands (find, inspect, search, list) show information in formatted boxes:

```
╔══════════════════════════════════════════════════╗
║                 ✅ ELEMENT FOUND                ║
╠══════════════════════════════════════════════════╣
║ Type: Node                                       ║
║ ID: 123                                          ║
║ Label: User Registration                         ║
║ Position: (100, 200)                            ║
║ Size: 150×80                                     ║
║ Color: #3498db                                   ║
╚══════════════════════════════════════════════════╝
```

### Search Results
Search commands display each result in its own detailed box with match information:

```
╔══════════════════════════════════════════════════╗
║ 1. MATCH DETAILS                                 ║
╠══════════════════════════════════════════════════╣
║ Type: Node                                       ║
║ ID: 123                                          ║
║ Label: User Registration                         ║
║ Position: (100, 200)                            ║
║ Matched in: label                                ║
╚══════════════════════════════════════════════════╝
```

### Project Statistics
Statistical commands show comprehensive breakdowns:

```
╔══════════════════════════════════════════════════╗
║               📊 PROJECT STATISTICS             ║
╠══════════════════════════════════════════════════╣
║ Total Nodes:        15                          ║
║ Total Fields:       42                          ║
║ Avg Fields/Node:    2.8                         ║
║ Total Transitions:  23                          ║
║ Total Text Elements: 8                          ║
╚══════════════════════════════════════════════════╝
```

### Data Model Information
Data model commands display comprehensive field information:

```
╔══════════════════════════════════════════════════╗
║               📋 DATA MODEL FIELDS             ║
╠══════════════════════════════════════════════════╣
║ Model ID: 123                                    ║
║ Model Label: User Registration                   ║
║ Total Fields: 5                                  ║
╚══════════════════════════════════════════════════╝

╔══════════════════════════════════════════════════╗
║ 1. FIELD                                         ║
╠══════════════════════════════════════════════════╣
║ Name: username                                   ║
║ Type: String                                     ║
║ Required: Yes                                    ║
║ Nullable: No                                     ║
║ Read Only: No                                    ║
║ Value: john_doe                                  ║
╚══════════════════════════════════════════════════╝
```

### Field Value Display
Field value commands show detailed field information with the actual value:

```
╔══════════════════════════════════════════════════╗
║               💎 FIELD VALUE FOUND              ║
╠══════════════════════════════════════════════════╣
║ Data Model: User Registration                    ║
║ Model ID: 123                                    ║
║ Field Name: username                             ║
║ Field Type: String                               ║
╠══════════════════════════════════════════════════╣
║                    📄 VALUE                     ║
╠══════════════════════════════════════════════════╣
║ john_doe                                         ║
╠══════════════════════════════════════════════════╣
║ Value Type: string                               ║
╚══════════════════════════════════════════════════╝
```

## 🔧 Advanced Features

### Element Relationship Tracing
The `trace <id>` command shows complete relationship maps for nodes:
- Incoming transitions (what connects TO this node)
- Outgoing transitions (what connects FROM this node)
- Related elements and their properties

### Project Validation
The `validate` command performs comprehensive checks:
- Orphaned elements detection
- Broken transition references
- Duplicate ID detection
- Missing required properties
- Performance warnings

### Smart Error Reporting
The terminal intelligently suggests solutions:
- Similar ID matches when element not found
- Helpful commands for next steps
- Quick action suggestions
- Context-aware tips

## 🎨 Terminal Interface

### Visual Elements
- **Unicode Boxes**: Professional formatting for all output
- **Color Coding**: Different message types have distinct colors
- **Icons**: Emojis and symbols for better visual recognition
- **Spacing**: Proper spacing between elements for readability

### Responsive Design
- **Auto-resize**: Terminal adapts to window size changes
- **Mobile Support**: Touch-friendly resize handles
- **Content Scrolling**: Auto-scroll to latest output
- **Command Focus**: Auto-focus on command input

## 🚨 Troubleshooting

### Common Issues

**Terminal not responding**
```bash
ping  # Test system responsiveness
```

**Can't find elements**
```bash
debug project  # Check project structure
list elements  # See all available elements
```

**Performance issues**
```bash
performance  # Check metrics
cleanup      # Clean temporary data
memory       # Check memory usage
```

**Project validation errors**
```bash
validate  # Run full validation
errors    # See recent errors
```

## 🎯 Best Practices

1. **Use TAB completion** - Save time and avoid typos
2. **Start with `help`** - Familiarize yourself with all commands
3. **Use `find` before `inspect`** - Quickly locate elements first
4. **Regular `validate`** - Check project integrity frequently
5. **Use `stats`** - Monitor project growth and complexity
6. **Check `errors`** - Address issues as they arise
7. **Use `cleanup`** - Maintain system performance

## 🔮 Future Enhancements

- **Custom Commands** - User-defined command shortcuts
- **Script Execution** - Run sequences of commands
- **Export Reports** - Generate project reports
- **API Integration** - Connect with external tools
- **Plugin System** - Extend functionality

---

**Happy Terminal Usage!** 💻
