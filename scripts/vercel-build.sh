#!/bin/bash

# Run font optimization
echo "🔍 Optimizing fonts..."
node scripts/optimize-fonts.mjs

#formatting the code with prettier and eslint
echo "🧹 Formating the code..."
npm run fix-all

# Run the regular build
echo "🏗️ Building application..."
next build
