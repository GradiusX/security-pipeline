import { getInput, setFailed } from '@actions/core';
import github from '@actions/github';
const request = require("request");
const fs = require("fs");

const defectDojoURL = getInput('defectdojo-url');
const defectDojoToken = getInput('defectdojo-api-key');
const productName = getInput('product-name');
const engagementName = getInput('engagement-name');
const scanType = getInput('scan-type');
const scanFile = getInput('scan-filename');

(async () => {
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
        if (res.statusCode != 201){
            console.log(res.statusCode);
            setFailed(body);
        }
        else{
            console.log(body);
            console.log("Uploaded Successfully to DefectDojo");
        }
    });
})();