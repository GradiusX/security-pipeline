import { getInput, setFailed } from '@actions/core';
import { exec as _exec } from '@actions/exec';
const fs = require("fs");

//const outputFile = getInput('output-filename');


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
    }

    await _exec('trufflehog', ['filesystem','.'], options);
    console.log(commandOutput)

    // if ( typeof outputFile !== 'undefined' && outputFile ){
    //     // if an output file has been defined, save json output to it
    //     await _exec('yarn', ['audit', '--json'], options);
    //     console.log(commandOutput)
    //     fs.writeFile(outputFile, commandOutput, err => {
    //         if (err) {
    //           console.log(err);
    //         }
    //         console.log("Successfully wrote yarn_audit.json")
    //     });
    // }
    // else{
    //     // if an output file has NOT been defined, display output
    //     const exitCode = await _exec('yarn', ['audit', '--level', severityLevel], options);
    //     if (exitCode >= severityLevelNum){
    //         console.log(commandOutput)
    //         setFailed("Update the above vulnerable dependencies!");
    //     }
    //     else{
    //         console.log("All good here!!")
    //     }
    // }
})();