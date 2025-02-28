#!/bin/bash

# Run font optimization
echo "🔍 Optimizing fonts..."
node scripts/optimize-fonts.mjs

# Run the regular build
echo "🏗️ Building application..."
next build
