const express = require('express');
const app = express();
const cors = require('cors');
const dot = require('dotenv');
dot.config();
//const fileUpload = require('express-fileupload');
const multer = require('multer');
const multerUpload = multer({dest: 'frontend/public/uploads/'});

const port = process.env.PORT;

const {getTestDB} = require('./mongodbOps');

//app.use(express.urlencoded());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/testdb', getTestDB);

app.use(cors());
//app.use(fileUpload());
app.post('/fileupload', multerUpload.fields([{name: 'pdf', maxCount: 1}]),  (req, res) => {
    //console.log(req.files);
    console.log(req.files);
    
    res.send(
        {message: 'file uploaded'}
    );
});




app.listen(port, () => console.log(`Example app listening on port ${port}!`))