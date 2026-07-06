const sharp = require('sharp');
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="10" fill="#0f1014"/>
  <text x="32" y="49"
    font-family="Georgia, 'Times New Roman', serif"
    font-size="42"
    font-weight="700"
    text-anchor="middle"
    fill="#EDE8DF"
    letter-spacing="-1">VS</text>
</svg>`;
sharp(Buffer.from(SVG), { density: 300 })
  .resize(256, 256)
  .png()
  .toFile('C:/Users/abdel/AppData/Local/Temp/vs-preview.png')
  .then(() => console.log('Preview saved → C:/Users/abdel/AppData/Local/Temp/vs-preview.png'))
  .catch(console.error);
