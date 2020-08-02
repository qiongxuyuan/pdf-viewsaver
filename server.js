const express = require('express');
const app = express();
const cors = require('cors');
const dot = require('dotenv');
const path = require('path');

dot.config();

//const {getTestDB} = require('./mongodbOps');
const {fileuploadAWS, getFile, saveFile} = require('./backend/request-handler');

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//app.use(express.static(path.join(__dirname, 'frontend/build')));
app.use('/pdf', express.static(path.join(__dirname, 'frontend/build/pdf')));
app.get('/', express.static(path.join(__dirname, 'frontend/build/index.html')));

//app.get('/testdb', getTestDB);

app.post('/fileupload',  fileuploadAWS);

app.get('/files/:name', getFile);
app.post('/files/:name', saveFile);

app.listen(port, () => console.log(`App listening on port ${port}!`))


//PDF viewer.
app.get('/pdf/web/:name', (req, res) => {
    if(req.path[req.path.length-1] === '/'){
        const newPath = req.path.substring(0, req.path.length-1);
        res.redirect(newPath);
        return;
    }
    res.sendFile(path.join(__dirname, '/frontend/build/pdf/web/viewer.html'));
});
