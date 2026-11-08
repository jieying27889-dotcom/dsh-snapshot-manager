// Whale Snapshot v1.1 — portable DeepSeek Harness Host plugin.
// Launches bundled Windows helper silently; React UI is registered by ./client.js.
// No slash-command registration or machine-specific absolute paths.
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

export const name = 'dsh-snapshot-manager'
const PACKAGE_DIR = dirname(fileURLToPath(import.meta.url))
const HELPER = join(PACKAGE_DIR, 'bin', 'WhaleSnapshot.exe')

export function apply() {
  if (process.platform !== 'win32') {
    console.warn('[dsh-snapshot-manager] Current release supports Windows only')
    return
  }
  if (!existsSync(HELPER)) {
    console.warn('[dsh-snapshot-manager] Missing helper executable:', HELPER)
    return
  }
  try {
    const child = spawn(HELPER, ['--no-browser'], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true
    })
    child.on('error', error => console.warn('[dsh-snapshot-manager] Launch error:', error.message))
    child.unref()
  } catch (error) {
    console.warn('[dsh-snapshot-manager] Launch error:', error.message)
  }
}
