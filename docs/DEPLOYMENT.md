# DiaVinci Deployment Guide

## 🌐 GitHub Pages Deployment

DiaVinci is automatically deployed to GitHub Pages and available at:
**[https://odynpl.github.io/DiaVinci/](https://odynpl.github.io/DiaVinci/)**

### Features Available Online
- ✅ Full interactive flowchart editor
- ✅ Drag-and-drop interface
- ✅ Data Model editor with advanced field management
- ✅ Developer terminal with 30+ commands
- ✅ Project save/load functionality (using browser localStorage)
- ✅ Export to PNG and JSON formats
- ✅ Multi-selection and advanced editing tools
- ✅ Responsive design for all devices

### Browser Storage
The online version uses browser localStorage to save your projects:
- Projects are saved locally in your browser
- No data is sent to external servers
- Your projects persist between sessions
- Use Export/Import for backup and sharing

### Performance
- Fast loading with optimized vanilla JavaScript
- No external dependencies or frameworks
- Works offline after initial load (PWA-ready)
- Responsive on mobile and desktop devices

## 🚀 Local Development

### Quick Setup
```bash
git clone https://github.com/OdynPL/DiaVinci.git
cd DiaVinci
python -m http.server 8000
# Open http://localhost:8000
```

### Alternative Servers
```bash
# Node.js
npx serve .

# PHP
php -S localhost:8000

# Python 2
python -m SimpleHTTPServer 8000
```

## 📦 Building for Production

DiaVinci is built with vanilla JavaScript and requires no build step:

1. **Clone repository**
2. **Deploy files** to any static hosting service
3. **Ensure HTTPS** for full PWA functionality

### Hosting Options
- ✅ GitHub Pages (current)
- ✅ Netlify
- ✅ Vercel
- ✅ Firebase Hosting
- ✅ Any static file server

## 🔧 Configuration

### Environment Variables
No environment variables required - DiaVinci runs entirely client-side.

### Custom Domain
To deploy on a custom domain:
1. Update any absolute paths (currently none needed)
2. Configure your hosting service
3. Ensure HTTPS is enabled

## 📊 Analytics & Monitoring

The live deployment includes:
- Client-side error logging
- Performance monitoring via browser DevTools
- User interaction tracking (privacy-focused)

## 🔒 Security

### Client-Side Security
- No server-side code execution
- All data stored locally in browser
- XSS protection through proper sanitization
- No external API calls or data transmission

### Content Security Policy
Recommended CSP headers for production:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;
```

## 🔄 Continuous Deployment

Current setup:
- **Source**: `main` branch
- **Build**: Direct deployment (no build process)
- **Deploy**: Automatic via GitHub Pages
- **URL**: https://odynpl.github.io/DiaVinci/

### Manual Updates
1. Push changes to `main` branch
2. GitHub Pages automatically rebuilds
3. Changes live within minutes

## 📱 PWA Features

DiaVinci is Progressive Web App ready:
- Offline functionality after first load
- Installable on mobile devices
- Responsive design for all screen sizes
- Fast loading with service worker caching

## 🐛 Troubleshooting

### Common Issues
1. **Blank screen**: Check browser console for JavaScript errors
2. **Slow loading**: Ensure good internet connection for first load
3. **Save issues**: Check browser localStorage permissions
4. **Mobile problems**: Ensure touch events are supported

### Browser Requirements
- Modern browser with ES6+ support
- Canvas API support
- localStorage support
- Touch events (for mobile)

---

**Live Demo**: [https://odynpl.github.io/DiaVinci/](https://odynpl.github.io/DiaVinci/)
