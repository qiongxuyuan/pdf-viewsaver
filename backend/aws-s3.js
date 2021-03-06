

const AWS = require("aws-sdk");
// const dot = require('dotenv');
// dot.config();
const uuid  = require('uuid');

const AWS_KEY = process.env.AWS_SECRET_KEY_ID;
const AWS_SECRET = process.env.AWS_SECRET_ACCESS_KEY;
//console.log(AWS_KEY);
const AWS_BUCKET = 'qxy-pdf';

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log('got AWS Credentials');
  //  console.log("Access key:", AWS.config.credentials.accessKeyId);
  //  console.log("Secret access key:", 'AWS.config.credentials.secretAccessKey');
  }
});

const s3Obj = new AWS.S3();

const ContentType = 'application/pdf';

const getSignedUrlS3PUT = function(awsFilename) {
    const params = {
        Bucket: AWS_BUCKET, 
        Key: awsFilename, 
        Expires: 300, //in seconds
        ContentType: ContentType,
        };
    const url = s3Obj.getSignedUrl('putObject', params);
    //console.log('The URL is', url); // expires in 300 seconds
    return url;
}

const getSignedUrlS3GET = function(awsFilename) {
    const params = {
        Bucket: AWS_BUCKET, 
        Key: awsFilename, 
        Expires: 600, //in seconds
    };
    const url = s3Obj.getSignedUrl('getObject', params);
    //console.log('The URL is', url); // expires in 600 seconds
    return url;
}

exports.getSignedUrlS3GET = getSignedUrlS3GET;
exports.getSignedUrlS3PUT = getSignedUrlS3PUT;
