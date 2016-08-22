const fs = require('fs');
function getFilesRecursive(folder, files = []) {
    const fileContents = fs.readdirSync(folder),
        fileTree = [];
    let stats;

    fileContents.forEach(function (fileName) {
        stats = fs.lstatSync(folder + '/' + fileName);

        if (stats.isDirectory()) {
            getFilesRecursive(folder + '/' + fileName, files)
        } else {
            files.push(folder + '/' + fileName)
            fileTree.push({
                name: fileName
            });
        }
    });

    return files;
}
module.exports = { getFilesRecursive }
