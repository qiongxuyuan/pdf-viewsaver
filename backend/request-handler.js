const uuid  = require('uuid');

const {getSignedUrlS3PUT, getSignedUrlS3GET} = require('./aws-s3');
const {getRecord, saveRecord, deleteRecord, getConnTable, FilesTable} = require('./mongodbOps');

const fileuploadAWS = (req, res) => {
    if(!req.query.name){
        res.status(400).send({message: 'bad request'});
        return;
    }
    const nameParts = req.query.name.split('.');
    let fileNameTemp = req.query.name;
    let fileExtension = '';
    if(nameParts.length > 0){
        fileExtension = nameParts[nameParts.length - 1];
        fileNameTemp = nameParts.slice(0, nameParts.length-1).join('.');
    }
    const awsFilename = fileNameTemp + '-' + uuid.v4() + '.' + fileExtension;
    const signedUrl = getSignedUrlS3PUT(awsFilename);
    res.send(
        {signedUrl: signedUrl, uploadName: awsFilename}
    );
};

const getFile = (req, res) => {
    const fileName = req.params.name;
    getRecord(FilesTable, {name: fileName}).then( result => {
        console.log(result);
        if(!result){
            res.status(404).json({message: 'file not found'});
            return;
        }
        const awsFileName = result.name;
        const url = getSignedUrlS3GET(awsFileName);
        res.json({message: 'OK', file: result, url: url});
    }).catch(err => {
        console.log(err);
    });
}

const saveFile = (req, res) => {
    saveRecord(FilesTable, {name: req.params.name}).then( result => {
        if(result && result.insertedId){
            res.json({message: 'OK', ID: result.insertedId});
            return;
        }
        res.status(500).json({message: 'error, can not save file name in the database.'});
        
    }).catch(err => {
        console.log(err);
    });
}



exports.fileuploadAWS = fileuploadAWS;
exports.getFile = getFile;
exports.saveFile = saveFile;