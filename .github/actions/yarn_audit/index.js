import { getInput, setFailed } from '@actions/core';
import github from '@actions/github';
import { exec as _exec } from '@actions/exec';

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
    const exitCode = await _exec('yarn', ['--group','dependencies','audit', '--level', severityLevel], options);

    if (exitCode >= severityLevelNum){
        console.log(commandOutput)
        setFailed("Update the above vulnerable dependencies!");
    }
    else{
        console.log("All good here!!")
    }
})();