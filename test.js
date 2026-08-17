import fs from 'fs';
const html = fs.readFileSync('index.html', 'utf8');

// Find all elements with id
let match;
const idRegex = /id="([^"]+)"/g;
const htmlLines = html.split('\n');

const lineNumberOfInitCachimbo = htmlLines.findIndex(line => line.includes('function initCachimbo() {'));
const lineNumberOfCreationView = htmlLines.findIndex(line => line.includes('id="gameCreationView"'));
console.log('initCachimbo line', lineNumberOfInitCachimbo);
console.log('gameCreationView line', lineNumberOfCreationView);
