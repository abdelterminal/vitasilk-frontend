const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const dirs = [
    'C:\\Users\\Frost\\Desktop\\Next Projets\\vitasilk\\app',
    'C:\\Users\\Frost\\Desktop\\Next Projets\\vitasilk\\components'
];

let filesModified = 0;

for (const dir of dirs) {
    if (fs.existsSync(dir)) {
        walkDir(dir, function (filePath) {
            if (filePath.endsWith('.tsx')) {
                const content = fs.readFileSync(filePath, 'utf-8');
                // This replaces 'italic ' or ' italic' or just 'italic' inside classes.
                // Safer way: replace 'italic' bounded by non-word chars, but handle spacing 
                // Better: replace space-italic-space with space, etc.
                let newContent = content.replace(/\bitalic\b/g, '');
                // Clean up double spaces caused by removal
                newContent = newContent.replace(/  +/g, ' ');

                if (newContent !== content) {
                    fs.writeFileSync(filePath, newContent, 'utf-8');
                    console.log("Modified:", filePath);
                    filesModified++;
                }
            }
        });
    }
}
console.log(`Finished. Modified ${filesModified} files.`);
