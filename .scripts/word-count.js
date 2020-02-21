var fs = require('fs');
var path = require('path');

var matchPattern = /\b\w+\b/g;
// var matchPattern = /\S+/g;

var roomFiles = walk('./src/Rooms/')
  .filter(fn => fn.indexOf('room-index') == -1);

var dict = {};

var total = roomFiles.reduce((acc, item) => {
  if (item.indexOf('room-index') > -1) {
    return acc;
  }

  let count = 0;
  try {
    var text = fs.readFileSync('.\\' + item, 'utf8');
    count = (text.match(matchPattern) || "").length;
    dict[item] = count;
  } catch (err) {
    console.log(err);
    throw err;
  }


  return acc + count;
}, 0);

var counts = Object.keys(dict)
  .map(x => ({ file: x.replace('src\\Rooms\\',''), count: dict[x] }))
  .sort((a, b) => a.count < b.count ? 1 : -1);

console.log("=============================================");
console.log("WORD COUNTS:");
console.log("");
console.log(counts);
console.log("Total Word Count: " + total);

function walk(dir) {
  let files = fs.readdirSync(dir);
  files = files.map(file => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) return walk(filePath);
    else if (stats.isFile()) return filePath;
  });

  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}