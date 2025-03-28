#!/usr/bin/env bash
# Force install both dependencies and devDependencies
echo "Installing all dependencies, including devDependencies..."
npm install --include=dev

# Run TypeScript build
echo "Running TypeScript build..."
npm run build
