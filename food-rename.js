var fs = require('fs');
let nameIndex = 1;
const testFolder = './food-res';
const destFolder = './food'
fs.readdir(destFolder, (err, files) => {
    files.forEach(name => {
        fs.unlink(destFolder+'/'+name , (err) => {
        });
    })
});
fs.readdir(testFolder, (err, files) => {
    files.forEach(name => {
        let newName = nameIndex+'.'+name.split(".")[1];
        fs.copyFile(testFolder+'/'+name, './food/'+newName, function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });
        nameIndex++;
    });
  });
