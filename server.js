const express = require('express');
const app = express();
const cors = require('cors');
const dot = require('dotenv');
const uuid  = require('uuid');
dot.config();
//const fileUpload = require('express-fileupload');
const multer = require('multer');
const multerUpload = multer({dest: 'frontend/public/uploads/'});
const {getSignedUrlS3PUT, getSignedUrlS3GET} = require('./aws-s3');
const {getRecord, saveRecord, deleteRecord, getConnTable, FilesTable} = require('./mongodbOps');

const port = process.env.PORT;

const {getTestDB} = require('./mongodbOps');

//app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/testdb', getTestDB);

app.use(cors());
//app.use(fileUpload());
// app.post('/fileupload', multerUpload.fields([{name: 'pdf', maxCount: 1}]),  (req, res) => {
//     //console.log(req.files);
//     console.log(req.files);
    
//     res.send(
//         {message: 'file uploaded'}
//     );
// });
app.post('/fileupload',  (req, res) => {
    const awsFilename = uuid.v4() + '-' + req.query.name;
    const signedUrl = getSignedUrlS3PUT(awsFilename);
    res.send(
        {signedUrl: signedUrl, uploadName: awsFilename}
    );
});

app.post('/files/:name', (req, res) => {
    saveRecord(FilesTable, {name: req.params.name}).then( result => {
        if(result && result.insertedId){
            res.json({message: 'OK', ID: result.insertedId});
            return;
        }
        res.status(500).json({message: 'error, can not save file name in the database.'});
        
    }).catch(err => {
        console.log(err);
    });
});

app.get('/files/:name', (req, res) => {
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
});






app.listen(port, () => console.log(`Example app listening on port ${port}!`))