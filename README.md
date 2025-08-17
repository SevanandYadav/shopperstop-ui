# ShopperStop - Electronics Store

A modern e-commerce web application built with React for electronics shopping.

## Features

- 🛍️ Product browsing with categories
- 🛒 Shopping cart functionality
- 💳 Payment processing with QR code
- 📱 Responsive design
- 🎯 Amazon-inspired UI/UX

## Live Demo

Deploy this project on Netlify by connecting your GitHub repository.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Deployment on Netlify

1. **Connect GitHub Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub account
   - Select this repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `build`
   - (These are auto-configured via `netlify.toml`)

3. **Deploy**
   - Click "Deploy site"
   - Your site will be live at `https://your-site-name.netlify.app`

## Environment Variables

No environment variables required for basic functionality.

## Tech Stack

- React 19
- CSS3 (Amazon-inspired design)
- Fetch API for data
- Netlify for deployment

## API

Uses external API: `https://shopperstop-nlqi.onrender.com/products`

## Project Structure

```
src/
├── components/     # React components
├── services/       # API services
├── pages/          # Page components
└── utils/          # Utility functions
```