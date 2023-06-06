import { getInput, setFailed } from '@actions/core';
import github from '@actions/github';
import { exec as _exec } from '@actions/exec';

// Report only this level and above: info|low|moderate|high|critical
const severityLevel = getInput('severity-level');

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
        //ignoreReturnCode: true,
        //cwd : './test'
    }
    try{
        await _exec('yarn', ['audit', '--level', severityLevel], options);
        console.log("No Security Issues found")
    }catch(error){
        console.log(commandOutput)
        setFailed(error.message)
    }
})();