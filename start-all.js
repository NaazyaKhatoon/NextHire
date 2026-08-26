const { spawn } = require('child_process');
const path = require('path');

console.log('🌟 Starting ResumeAI Microservices & Frontend...\n');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';
const pythonCmd = isWindows ? 'python' : 'python3';

// 1. Start Node.js Express Server (Port 5000)
console.log('🚀 Launching Backend REST API on Port 5000...');
const serverProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true,
});

// 2. Start Python FastAPI AI Microservice (Port 8000)
console.log('🧠 Launching Python AI Engine on Port 8000...');
const aiProcess = spawn(pythonCmd, ['-m', 'uvicorn', 'main:app', '--port', '8000'], {
  cwd: path.join(__dirname, 'ai-service'),
  stdio: 'inherit',
  shell: true,
});

// 3. Start React / Vite Client (Port 5173)
console.log('🎨 Launching Vite Frontend on Port 5173...');
const clientProcess = spawn(npmCmd, ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true,
});

process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down all ResumeAI processes...');
  serverProcess.kill();
  aiProcess.kill();
  clientProcess.kill();
  process.exit(0);
});
