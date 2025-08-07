# Contributing to DiaVinci

We love your input! We want to make contributing to DiaVinci as easy and transparent as possible.

## 🚀 Getting Started

### Before You Start
1. **Try the live demo**: [https://odynpl.github.io/DiaVinci/](https://odynpl.github.io/DiaVinci/)
2. **Explore the features**: Use the Developer Terminal (`help` command) to understand the system
3. **Check existing issues**: [GitHub Issues](https://github.com/OdynPL/DiaVinci/issues)

### Development Setup
```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR_USERNAME/DiaVinci.git
cd DiaVinci

# Start local development server
python -m http.server 8000
# Open http://localhost:8000
```

## 🔄 Development Process

### 1. Fork & Clone
- Fork the repository on GitHub
- Clone your fork locally
- Add upstream remote: `git remote add upstream https://github.com/OdynPL/DiaVinci.git`

### 2. Create Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes
- Write clean, readable code
- Follow existing code style
- Test your changes in multiple browsers
- Use the Developer Terminal for debugging

### 4. Test Thoroughly
- Test on desktop and mobile
- Verify in Chrome, Firefox, Safari, Edge
- Test with the live demo for comparison
- Use Developer Terminal commands for validation

### 5. Commit & Push
```bash
git add .
git commit -m "feat: add new feature" # or "fix: resolve bug"
git push origin feature/your-feature-name
```

### 6. Create Pull Request
- Describe your changes clearly
- Reference any related issues
- Include screenshots for UI changes
- Test against the live demo

## 📝 Code Style

### JavaScript
- Use vanilla JavaScript (no frameworks)
- Follow ES6+ standards
- Use meaningful variable names
- Add comments for complex logic
- Maintain existing architecture patterns

### HTML/CSS
- Semantic HTML structure
- Responsive design principles
- Consistent class naming
- Mobile-first approach

### Architecture
Follow the existing structure:
```
src/
├── core/           # EventBus, DI Container, Logger
├── models/         # Data models and business logic
├── services/       # Core services (Canvas, Storage, etc.)
├── controllers/    # Application controllers
├── ui/             # User interface components
└── factories/      # Component factories
```

## 🐛 Bug Reports

### Before Reporting
1. Check if the bug exists in the [live demo](https://odynpl.github.io/DiaVinci/)
2. Search existing issues
3. Try to reproduce consistently

### What to Include
- **Browser**: Version and type
- **Steps**: How to reproduce
- **Expected**: What should happen
- **Actual**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Browser DevTools output

## 💡 Feature Requests

### Guidelines
- Check existing issues first
- Explain the use case clearly
- Consider how it fits with existing features
- Try the Developer Terminal to understand current capabilities

### Propose Changes
1. Create an issue with the "enhancement" label
2. Describe the feature and its benefits
3. Discuss implementation approach
4. Wait for maintainer feedback before starting work

## 🔧 Areas for Contribution

### High Priority
- **Mobile UX improvements**
- **Performance optimizations** 
- **Accessibility enhancements**
- **Browser compatibility fixes**
- **Developer Terminal commands**

### Medium Priority
- **New node types**
- **Export formats**
- **Data Model field types**
- **UI/UX improvements**
- **Documentation**

### Documentation
- **Tutorial videos**
- **API documentation**
- **Use case examples**
- **Translation**

## 📚 Resources

- **Live Demo**: [https://odynpl.github.io/DiaVinci/](https://odynpl.github.io/DiaVinci/)
- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/OdynPL/DiaVinci/issues)
- **Discussions**: [GitHub Discussions](https://github.com/OdynPL/DiaVinci/discussions)

## 🎯 Pull Request Guidelines

### Before Submitting
- [ ] Code follows project style
- [ ] Changes are tested locally
- [ ] Browser compatibility verified
- [ ] Documentation updated if needed
- [ ] No console errors

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari
- [ ] Tested in Edge
- [ ] Mobile testing completed

## Screenshots
If applicable, add screenshots

## Related Issues
Closes #123
```

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🤝 Community

- Be respectful and inclusive
- Help others learn
- Share your knowledge
- Have fun building together!

---

**Thank you for contributing to DiaVinci!** 🎨