#!/bin/bash
set -e

nvm install node
nvm use node

npm install
npm install -D vite@latest @vitejs/plugin-react@latest

npm audit fix
npm audit --audit-level=high

curl -o leadyfyscript-move-import-css.js https://raw.githubusercontent.com/leadfyweb/scripts/main/move-import-css.js
node leadyfyscript-move-import-css.js src/index.css
rm leadyfyscript-move-import-css.js

rm bun.lockb

git add .
git commit -m "deploy script"
git push origin HEAD:deploy --force

echo "Deploy bem sucedido"
