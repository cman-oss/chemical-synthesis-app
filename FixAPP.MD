# GitHub Pages Deployment Guide
> Quick fixes for common deployment issues

## 1. Configuration Files Setup

### Update vite.config.js
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/chemical-synthesis-app/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Update package.json
```json
{
  "name": "chemical-synthesis-app",
  "homepage": "https://[your-username].github.io/chemical-synthesis-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## 2. Routing Setup

### Create 404.html
Create a new file at `public/404.html` for GitHub Pages routing:
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Chemical Synthesis App</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
    Redirecting...
  </body>
</html>
```

### Add _redirects file
Create `public/_redirects`:
```plaintext
/* /index.html 200
```

## 3. Deployment Steps

1. **Clean Install Dependencies**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Build the Project**
```bash
npm run build
```

3. **Deploy to GitHub Pages**
```bash
npm run deploy
```

## 4. Common Issues & Solutions

### Blank Page After Deployment
- Check if `base` in vite.config.js matches your repository name
- Verify homepage in package.json is correct
- Ensure all routes use the correct basename

### Build Errors
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall
- Check for environment variables in .env file

### Routing Issues
- Add basename to Router:
```jsx
<Router basename="/chemical-synthesis-app">
```
- Ensure all asset paths include the base URL

## 5. Environment Setup

Create `.env` file:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## Need Help?
- Check GitHub Pages settings in your repository
- Verify deployment workflow in Actions tab
- Review build logs for specific errors

