const express = require('express');
const app = express();
const cors = require('cors');
const dot = require('dotenv');

dot.config();

//const {getTestDB} = require('./mongodbOps');
const {fileuploadAWS, getFile, saveFile} = require('./backend/request-handler');

const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//app.get('/testdb', getTestDB);

app.post('/fileupload',  fileuploadAWS);

app.get('/files/:name', getFile);
app.post('/files/:name', saveFile);

app.listen(port, () => console.log(`App listening on port ${port}!`))
