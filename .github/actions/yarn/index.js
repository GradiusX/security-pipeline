const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

// Report only this level and above: info|low|moderate|high|critical
const severityLevel = core.getInput('severity-level');

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
        await exec.exec('yarn', ['audit', '--level', severityLevel], options);
        console.log("No Security Issues found")
    }catch(error){
        console.log(commandOutput)
        core.setFailed(error.message)
    }
})();