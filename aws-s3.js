

const AWS = require("aws-sdk");
//const uuid = require('uuid');
const dot = require('dotenv');
dot.config();
const uuid  = require('uuid');

const AWS_KEY = process.env.AWS_SECRET_KEY_ID;
const AWS_SECRET = process.env.AWS_SECRET_ACCESS_KEY;
console.log(AWS_KEY);
const AWS_BUCKET = 'qxy-pdf';

console.log("test credential");


AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
    console.log("Secret access key:", 'AWS.config.credentials.secretAccessKey');
  }
});


const s3Obj = new AWS.S3();
const filename = uuid.v4()  + '.txt';
console.log(filename);

// s3Obj.upload({
//     Bucket: 'qxy-pdf',
//     Key: filename,
//     Body: Buffer.from('hello world'),
// }, function(err, data){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data, "uploaded");
//     }
// });

const ContentType = 'application/pdf';
console.log(ContentType);

exports.getSignedUrlS3 = function(filename) {
    const params = {
        Bucket: AWS_BUCKET, 
        Key: '36901330-1202-41fd-ac44-b2bb68e55657.txt',//uuid.v4() + '-' + filename, 
        Expires: 300, //in seconds
        ContentType: ContentType,
        };
    const url = s3Obj.getSignedUrl('putObject', params);
    console.log('The URL is', url); // expires in 60 seconds
    return url;
}