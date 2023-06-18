const request = require("request");
const fs = require("fs");

const defectDojoURL = getInput('defectdojo-url');
const defectDojoToken = getInput('defectdojo-api-key');

function sendToDefectDojo(productName, engagementName, scanType, scanFile){
    const options = {
        method: "POST",
        url: defectDojoURL.concat('/api/v2/import-scan/'),
        port: 443,
        headers: {
            "Authorization": "Token".concat(' ', defectDojoToken)
        },
        formData : {
            "product_name": productName,
            "engagement_name": engagementName,
            "scan_type": scanType,
            "close_old_findings": "true",
            "close_old_findings_product_scope": "true",
            "file" : fs.createReadStream(scanFile)
        }
    };
    
    request(options, function (err, res, body) {
        if(err) console.log(err);
        console.log(body);
        console.log("Uploaded Successfully to DefectDojo")
    });
}



    // const a1 = getInput('defectdojo-url');
    // console.log(a1)
    // const a2 = getInput('defectdojo-api-key')
    // console.log(a2)
    // console.log(github.repository)