var os = require('os');
var executeCmds = require('./executeCmds.js');

if (os.platform() !== 'win32') {
  throw new Error('The script can only run on windows platform');
}

var cmds = [
  { cmd: 'chcp 850' },//to avoid https://github.com/npm/npm/issues/6438
  { cmd: 'npm install'},
  { cmd: 'npm install grunt-cli -g'},
  { cmd: 'grunt generateCode'},
];

var updatePackageVersion = process.argv[2] && (process.argv[2].indexOf('updatePackageVersion') === 0);
var removeExistingSpecPackages = process.argv[3] && (process.argv[3].indexOf('removeExistingSpecPackages') === 0);

console.log('***********');
console.log('*Info: Please make sure spec version was updated in <repository-root>\\packages.config');
if (updatePackageVersion) {
  console.log('*Info: Please make sure the version was updated in <repository-root>\\gruntfile.js');
}
console.log('*After you commit changes to remote, you can access tarball using link such as ' +
            'https://github.com/Azure/azure-sdk-for-node/tarball/dev/lib/services/computeManagement/');
console.log('***********');

if (updatePackageVersion) {
  cmds.push({ cmd: 'grunt updateVersions' });
}

if (removeExistingSpecPackages) {
  var packagesFolder = '"' + __dirname + '\\..\\packages' + '"';
  cmds.unshift({ cmd: 'if exist ' + packagesFolder + ' rmdir /s /q ' + packagesFolder });
}

executeCmds.execute(cmds);