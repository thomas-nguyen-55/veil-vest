# Vercel Deployment Guide for Veil Vest

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Connect to Vercel

1. **Visit Vercel Dashboard**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account

2. **Import Project**
   - Click "New Project" or "Add New..." → "Project"
   - Select "Import Git Repository"
   - Find and select `thomas-nguyen-55/veil-vest`
   - Click "Import"

### 3. Configure Project Settings

1. **Project Name**
   - Set project name: `veil-vest`
   - Framework Preset: `Vite`
   - Root Directory: `./` (default)

2. **Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### 4. Environment Variables Configuration

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```env
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=YOUR_WALLET_CONNECT_PROJECT_ID

# Infura Configuration (Optional)
VITE_INFURA_API_KEY=YOUR_INFURA_API_KEY
VITE_ALTERNATIVE_RPC_URL=https://1rpc.io/sepolia
```

**Important**: Add these variables for all environments (Production, Preview, Development).

### 5. Deploy

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for the build process to complete (usually 2-3 minutes)

2. **Monitor Deployment**
   - Watch the build logs for any errors
   - Check the deployment status in the dashboard

### 6. Post-Deployment Configuration

1. **Custom Domain (Optional)**
   - Go to **Settings** → **Domains**
   - Add your custom domain if desired
   - Configure DNS settings as instructed

2. **Analytics (Optional)**
   - Enable Vercel Analytics in **Settings** → **Analytics**
   - This provides insights into your app's performance

### 7. Verify Deployment

1. **Test the Application**
   - Visit your deployed URL
   - Test wallet connection functionality
   - Verify all features work correctly

2. **Check Console**
   - Open browser developer tools
   - Look for any JavaScript errors
   - Verify environment variables are loaded

## Environment-Specific Configurations

### Production Environment
- Use production RPC URLs
- Ensure all environment variables are set
- Test with real wallet connections

### Preview Environment
- Automatically created for pull requests
- Uses the same environment variables as production
- Perfect for testing before merging

### Development Environment
- For local development
- Uses local environment variables
- Hot reloading enabled

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Environment Variables Not Loading**
   - Ensure variables start with `VITE_`
   - Check variable names match exactly
   - Redeploy after adding new variables

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches Sepolia (11155111)

4. **Contract Interaction Failures**
   - Verify contract is deployed on Sepolia
   - Check contract address in configuration
   - Ensure user has Sepolia ETH for gas

### Performance Optimization

1. **Build Optimization**
   - Enable Vercel's automatic optimizations
   - Use dynamic imports for large components
   - Optimize images and assets

2. **Caching**
   - Configure appropriate cache headers
   - Use Vercel's edge caching
   - Implement service worker if needed

## Security Considerations

1. **Environment Variables**
   - Never commit sensitive keys to repository
   - Use Vercel's environment variable system
   - Rotate keys regularly

2. **HTTPS**
   - Vercel automatically provides HTTPS
   - Ensure all external requests use HTTPS
   - Configure proper CORS settings

3. **Content Security Policy**
   - Implement CSP headers
   - Restrict external resource loading
   - Use nonce-based CSP for inline scripts

## Monitoring and Maintenance

1. **Performance Monitoring**
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Set up alerts for performance issues

2. **Error Tracking**
   - Implement error boundary components
   - Use services like Sentry for error tracking
   - Monitor console errors

3. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Test updates in preview environment first

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created and connected
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Wallet connection tested
- [ ] Contract interactions verified
- [ ] Performance optimized
- [ ] Security measures implemented
- [ ] Monitoring configured

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs
3. Test locally first
4. Contact Vercel support if needed

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs/installation)
- [Wagmi Documentation](https://wagmi.sh/)
