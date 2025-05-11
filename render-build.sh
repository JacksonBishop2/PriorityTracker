#!/usr/bin/env bash

echo "Installing ALL dependencies (including dev)..."
npm install --include=dev

echo "Running TypeScript compiler..."
npm run build
