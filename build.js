const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 NextHire Universal Build Runner...');

if (fs.existsSync('./client/package.json')) {
  console.log('📁 Building from workspace root (client subfolder detected)...');
  execSync('cd client && npm install && npm run build', { stdio: 'inherit' });
} else if (fs.existsSync('./src/main.jsx') || fs.existsSync('./vite.config.js')) {
  console.log('📁 Building from client root directly...');
  execSync('npx vite build', { stdio: 'inherit' });
} else {
  console.log('📁 Running standard vite build...');
  execSync('npx vite build', { stdio: 'inherit' });
}

console.log('✅ NextHire build finished successfully.');
