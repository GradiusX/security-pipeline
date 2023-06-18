import { getInput, setFailed } from '@actions/core';
import { exec as _exec } from '@actions/exec';
const fs = require("fs");

const severityLevelConst = {
    INFO        : 1,
    LOW         : 2,
    MODERATE    : 4,
    HIGH        : 8,
    CRITICAL    : 16
}

// Report only this level and above: info|low|moderate|high|critical
const severityLevel = getInput('severity-level');
const severityLevelNum = severityLevelConst[severityLevel.toUpperCase()];

const outputFile = getInput('output-filename');

(async () => {
    // Run the tool and upload files to DefectDojo
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
        //cwd : './test'
    }

    await _exec('yarn', ['audit', '--json'], options);
    fs.writeFile(outputFile, commandOutput, err => {
        if (err) {
          console.log(err);
        }
        console.log("successfully wrote yarn_audit.json")
    });

    // reset Output and Error Streams and re-run tool for CI/CD output
    commandOutput = '';
    commandError = '';

    const exitCode = await _exec('yarn', ['audit', '--level', severityLevel], options);
    if (exitCode >= severityLevelNum){
        console.log(commandOutput)
        setFailed("Update the above vulnerable dependencies!");
    }
    else{
        console.log("All good here!!")
    }
})();