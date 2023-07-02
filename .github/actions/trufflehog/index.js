import { getInput, setFailed } from '@actions/core';
import { exec as _exec } from '@actions/exec';
const fs = require("fs");

const outputFile = getInput('output-filename');
const exclusionString = getInput('trufflehog-exclusion-list');
const exclusionList = exclusionString.split();
console.log(exclusionList);
console.log(typeof(exclusionList));

(async () => {

    // Create a file with a list of ignored files, .git is always ignored
    fs.writeFile('trufflehogignore', '^\.git/.*', err => {
        if (err) {
            console.log(err);
        }
    });

    let commandOutput = '';
    let commandError = '';

    const options = {
        listeners : {
            stdout: (data) => {
                commandOutput += data.toString();
            },
            stderr: (data) => {
                commandError += data.toString();
            }
        },
        silent: true,
        ignoreReturnCode: true
    }

    if ( typeof outputFile !== 'undefined' && outputFile ){
        // if an output file has been defined, save json output to it
        await _exec('trufflehog', ['filesystem','.', '--only-verified','--exclude-paths=trufflehogignore', '--json'], options);
        fs.writeFile(outputFile, commandOutput, err => {
            if (err) {
              console.log(err);
            }
            console.log("Successfully wrote".concat(' ', outputFile))
        });
    }
    else{
        // if an output file has NOT been defined, display output
        const exitCode =  await _exec('trufflehog', ['filesystem','.', '--only-verified','--exclude-paths=trufflehogignore','--fail'], options);
        if (exitCode){
            console.log(commandOutput)
            setFailed("Potentially leaked secrets! Remove if not required, else whitelist them via the 'excluded-file-regex' workflow input");
        }
        else{
            console.log("All good here!!")
        }
    }
})();