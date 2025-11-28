# Deployment Guide

This guide covers how to deploy the Sign Language to Text Recognition application to various hosting platforms.

## Prerequisites

Before deploying, ensure you have:

1. Completed local setup and testing
2. A Supabase account with your database configured
3. All environment variables ready
4. A production build tested locally

## Building for Production

### 1. Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 2. Test Production Build Locally

```bash
npm run preview
```

Open `http://localhost:4173` to test the production build.

### 3. Verify Build

Check that:
- All routes work correctly
- Camera permissions function
- Gesture recognition operates properly
- Supabase connection is active
- No console errors appear

## Environment Variables

All platforms require these environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides automatic deployments with excellent performance.

#### Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Add environment variables in Vercel dashboard:
   - Go to Project Settings
   - Navigate to Environment Variables
   - Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

5. Redeploy with environment variables:
```bash
vercel --prod
```

#### Deploy via GitHub

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Configure environment variables
6. Click "Deploy"

### Option 2: Netlify

Netlify offers similar features to Vercel with drag-and-drop deployment.

#### Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Initialize and deploy:
```bash
netlify init
netlify deploy --prod
```

4. Set environment variables:
```bash
netlify env:set VITE_SUPABASE_URL "your_url"
netlify env:set VITE_SUPABASE_ANON_KEY "your_key"
```

#### Deploy via Drag and Drop

1. Build the project: `npm run build`
2. Go to [app.netlify.com](https://app.netlify.com)
3. Drag the `dist` folder to the deployment area
4. Configure environment variables in Site Settings
5. Trigger a new deployment

### Option 3: GitHub Pages

GitHub Pages is free for public repositories.

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/your-repo-name",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... rest of config
})
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repository settings

**Note:** Environment variables must be handled differently for GitHub Pages since it's static hosting. Consider using Netlify or Vercel instead.

### Option 4: AWS S3 + CloudFront

For enterprise deployments with AWS infrastructure.

1. Create S3 bucket:
```bash
aws s3 mb s3://your-bucket-name
```

2. Configure bucket for static hosting:
```bash
aws s3 website s3://your-bucket-name --index-document index.html
```

3. Build and upload:
```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name
```

4. Create CloudFront distribution for HTTPS and CDN

5. Set appropriate CORS headers for camera access

### Option 5: Firebase Hosting

Google's hosting solution with easy setup.

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

Select:
- Public directory: `dist`
- Single-page app: `Yes`
- Automatic builds: `No`

4. Build and deploy:
```bash
npm run build
firebase deploy
```

## Post-Deployment Configuration

### 1. Update Supabase Allowed Origins

In your Supabase dashboard:
1. Go to Authentication > URL Configuration
2. Add your production URL to allowed origins
3. Save changes

### 2. Configure CORS Headers

Ensure your hosting platform serves proper CORS headers for camera access:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

### 3. Enable HTTPS

Camera access requires HTTPS. Most platforms (Vercel, Netlify) provide this automatically.

### 4. Set Security Headers

Recommended security headers:

```
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(self)
```

## Domain Configuration

### Custom Domain Setup

#### Vercel
1. Go to Project Settings > Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for SSL certificate generation

#### Netlify
1. Go to Domain Settings
2. Add custom domain
3. Update DNS or transfer domain to Netlify
4. Enable HTTPS

## Monitoring and Analytics

### 1. Supabase Dashboard

Monitor:
- Database usage
- API calls
- Storage usage
- Active connections

### 2. Platform Analytics

Enable analytics in your hosting platform:
- Vercel Analytics
- Netlify Analytics
- Google Analytics (add to `index.html`)

### 3. Error Tracking

Consider adding error tracking:
- Sentry
- LogRocket
- Rollbar

Add to `src/main.tsx`:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production"
});
```

## Performance Optimization

### 1. Enable Compression

Most platforms enable gzip/brotli automatically, but verify in headers.

### 2. CDN Configuration

Ensure static assets are served from CDN:
- Images
- JavaScript bundles
- CSS files

### 3. Cache Headers

Set appropriate cache headers:
- HTML: `Cache-Control: no-cache`
- JS/CSS: `Cache-Control: public, max-age=31536000, immutable`
- Assets: `Cache-Control: public, max-age=31536000`

### 4. Lazy Loading

The app already uses React lazy loading, but verify it's working in production.

## Troubleshooting Deployment

### Camera Not Working in Production

- Verify HTTPS is enabled
- Check Permissions-Policy header
- Test on different browsers
- Review browser console for errors

### Environment Variables Not Working

- Confirm variables are prefixed with `VITE_`
- Rebuild after adding variables
- Check variable names match exactly
- Verify no trailing spaces in values

### Build Fails

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version matches local development
- Run `npm run typecheck` to identify errors
- Review build logs for specific errors

### Supabase Connection Issues

- Verify environment variables are set correctly
- Check Supabase project is active
- Confirm allowed origins include production URL
- Test connection in browser console

### 404 Errors on Refresh

Configure your hosting for SPA routing:

**Vercel:** Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify:** Create `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Maintenance

### Regular Tasks

1. **Monitor Usage:** Check Supabase and hosting platform usage weekly
2. **Update Dependencies:** Run `npm update` monthly
3. **Security Patches:** Apply security updates immediately
4. **Database Backups:** Enable automatic Supabase backups
5. **Performance Monitoring:** Review load times and error rates

### Updating the Application

1. Make changes locally
2. Test thoroughly
3. Build production version: `npm run build`
4. Test production build: `npm run preview`
5. Deploy to production
6. Verify deployment
7. Monitor for errors

## Rollback Strategy

### Quick Rollback

Most platforms support instant rollback:

**Vercel:**
```bash
vercel rollback
```

**Netlify:**
- Go to Deploys
- Click on previous deployment
- Click "Publish deploy"

**Firebase:**
```bash
firebase hosting:rollback
```

### Manual Rollback

1. Checkout previous git commit
2. Build: `npm run build`
3. Deploy: Follow deployment steps above

## Cost Considerations

### Free Tiers (Hobby/Personal Use)

- **Vercel:** 100GB bandwidth/month
- **Netlify:** 100GB bandwidth/month
- **Firebase:** 10GB storage, 360MB/day bandwidth
- **Supabase:** 500MB database, 1GB file storage

### Paid Plans (Production Use)

Consider upgrading if you experience:
- High traffic volumes (>1000 users/day)
- Frequent database operations
- Large file storage needs
- Need for team collaboration

## Security Best Practices

1. **Never commit `.env` file** to version control
2. **Rotate Supabase keys** if exposed
3. **Use Row Level Security** in Supabase
4. **Enable 2FA** on hosting platform accounts
5. **Regular security audits:** Run `npm audit`
6. **Monitor access logs** for suspicious activity
7. **Use HTTPS only** for all connections

## Support and Resources

### Documentation Links

- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)

### Getting Help

1. Check hosting platform status pages
2. Review browser console errors
3. Check Supabase project logs
4. Consult platform-specific documentation
5. Search community forums

## Checklist Before Going Live

- [ ] Production build tested locally
- [ ] All environment variables configured
- [ ] Supabase database schema applied
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS enabled
- [ ] Camera permissions working
- [ ] Gesture recognition functioning
- [ ] Database connections active
- [ ] Error tracking setup
- [ ] Analytics configured
- [ ] Security headers set
- [ ] CORS properly configured
- [ ] SPA routing configured
- [ ] Backup strategy in place
- [ ] Monitoring enabled

---

**Ready to deploy?** Choose your platform and follow the steps above. Good luck!
