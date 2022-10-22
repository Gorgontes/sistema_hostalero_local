const path = require('path')
const concurrently = require('concurrently');
const { result } = concurrently(
  [
    { command: 'npm run dev:vite', name: 'vite', prefixColor: 'magenta'},
    { command: 'npm run dev:electron', name: 'electron', prefixColor: 'blue'}
  ],
  {
    prefix: 'name',
    cwd: path.resolve(__dirname, '..')
  }
)