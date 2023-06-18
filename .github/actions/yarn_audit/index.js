import { getInput, setFailed } from '@actions/core';
// import { sendToDefectDojo } from '../utils/defectdojo';
import github from '@actions/github';
import { exec as _exec } from '@actions/exec';
const fs = require("fs");

const severityLevelConst = {
    INFO        : 1,
    LOW         : 2,
    MODERATE    : 4,
    HIGH        : 8,
    CRITICAL    :16
}

// Report only this level and above: info|low|moderate|high|critical
const severityLevel = getInput('severity-level');
const severityLevelNum = severityLevelConst[severityLevel.toUpperCase()];

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
    fs.writeFile('yarn_audit.json', commandOutput, err => {
        if (err) {
          console.log(err);
        }
        console.log("successfully wrote yarn_audit.json")
    });

    // const a1 = getInput('defectdojo-url');
    // console.log(a1)
    // const a2 = getInput('defectdojo-api-key')
    // console.log(a2)
    // console.log(github.repository)


    // reset Output and Error and re-run tool for CI/CD output
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