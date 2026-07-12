import readline from 'readline';
import { srcPath } from './paths.js';
import path from 'path';
import { fileURLToPath } from 'node:url';
import fs from 'fs';
import { exec } from 'child_process';
import http from 'http';

// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Log
export function log(message, type = 'info') {
  const icons = { info: '◦', success: '✓', error: '✗', skip: '−' };
  console.log(`    ${icons[type]} ${message}`);
}

// Confirmation prompt
export function confirm(question) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`  ${question} (y/n): `, answer => {
      rl.close();
      resolve(
        answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes',
      );
    });
  });
}

// Get absolute path from relative parts
export function getSourcePath(...parts) {
  return srcPath(...parts);
}

// Copy template file to destination
export function copyTemplate(folderName, templateName, destPath) {
  const templatesDir = path.join(
    __dirname,
    'setup',
    folderName,
    'templates',
  );

  const src = path.join(templatesDir, templateName);

  if (!fs.existsSync(src)) {
    log(`Template "${templateName}" not found.`, 'error');
    return false;
  }

  if (fs.existsSync(destPath)) {
    log(`${path.basename(destPath)} already exists.`, 'skip');
    return false;
  }

  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.copyFileSync(src, destPath);
  log(`Created ${path.basename(destPath)}.`, 'success');
  return true;
}

// Open browser with given URL
export function openBrowser(url) {
  const cmd =
    process.platform === 'win32'
      ? 'start'
      : process.platform === 'darwin'
        ? 'open'
        : 'xdg-open';
  exec(`${cmd} ${url}`);
}

// Check if server is running
export function isServerRunning(config) {
  return new Promise(resolve => {
    const req = http.get(
      `http://${config.server.host}:${config.server.port}`,
      () => {
        resolve(true);
      },
    );
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

// Reload server via BrowserSync endpoint
export function reloadServer(config) {
  return new Promise(resolve => {
    const url = `http://${config.server.host}:${config.server.port}/__browser_sync__?method=reload`;
    http
      .get(url, () => {
        log('Server reloaded.', 'success');
        resolve();
      })
      .on('error', () => {
        log('Could not reload server.', 'error');
        resolve();
      });
  });
}

// Replace with validation
export const safeReplace = (
  content,
  pattern,
  replacement,
  description,
) => {
  const nextContent = content.replace(pattern, replacement);

  if (nextContent === content) {
    log(
      `Could not ${description} — gulpfile format may have changed.`,
      'error',
    );

    return {
      success: false,
      content,
    };
  }

  return {
    success: true,
    content: nextContent,
  };
};
