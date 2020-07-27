import React, {useState} from 'react';
import {InputGroup, Button, FormControl, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import FormData from 'form-data';
import {Grid, Paper, CircularProgress} from '@material-ui/core'
import {Alert} from '@material-ui/lab';
import {ServerHostUrl, ViewFilePath} from '../constants'

const axios = require('axios');
//const ServerHostUrl = 'http://localhost:55000';

function UploadPage() {
  const [uploadFile, setUploadFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);
  //const [awsFilename, setAwsFilename] = useState(null);

  const handleClick = (event) => {
    if(!uploadFile){
        return;
    }
    setIsLoading(true);
    setToastMsg(null);
    saveFile(uploadFile);
  }

//   const setSuccessUpload = () => {
//     setIsLoading(false);
//     //setMsg('file saved at ' + ServerHostUrl + '/files/' + awsFilename, false);
//   }

  const setMsg = (msg, isSuccess=true) => {
    if(!msg){
        setToastMsg(null);
        return;
    }
    let msgLevel = 'success';
    if(!isSuccess){
        msgLevel = 'error';
    }
    setToastMsg(
        <Alert variant='filled' severity={msgLevel}>
            {msg}
        </Alert>
    );
  }

  const saveFileData = (response, filesUrl) => {
    //save file data to DB.
    //notify user file uploaded.
    const awsFilename = response.data.uploadName;
    axios.post(filesUrl + '/' + awsFilename).then(postServerResponse => {
      //alert('file saved at ' + ServerHostUrl + '/files/' + awsFilename);
      setMsg(
          <span>file saved at <a className='text-break' href={ServerHostUrl + ViewFilePath + encodeURIComponent(awsFilename)}>{ServerHostUrl + ViewFilePath + encodeURIComponent(awsFilename)}</a></span>
      );
      setUploadFile(null);
    }).catch( err => {
      console.log(err);
    }).finally( ()=> {
        setIsLoading(false);
    });
  }

  const saveFile = (file) => {
    const url = ServerHostUrl + '/fileupload';
    const filesUrl = ServerHostUrl + '/files';
    const ContentType = 'application/pdf';
    const fileType = file.type;
    if(fileType !== ContentType){
      //alert('The file is not PDF');
      setMsg('The file is not PDF', false);
      setIsLoading(false);
      return;
    }

    axios.post(
      url + '?name=' + file.name 
    ).then( response => {
      console.log(response.data);
      //upload file to AWS
      const signedUrl = response.data.signedUrl;
      if(!signedUrl){
        //alert();
        setMsg('Error on upload file - can not get signed url', false);
        setIsLoading(false);
        return;
      }
      axios.put(
        signedUrl,
        file,
        {
          headers:{
            'Content-Type': ContentType,
          }
        }
      ).then(awsResponse => {

        console.log(awsResponse.data);
        saveFileData(response, filesUrl);

      }).catch(err => {
        console.log(err);
        setIsLoading(false);
      });
    }).catch( err => {
      console.log(err);
      setIsLoading(false);
    });
  }

  const handleChange = (event) => {
    setMsg(null);
    const file = event.target.files[0];
    if(!file) return;
    const ContentType = 'application/pdf';
    const fileType = file.type;
    if(fileType !== ContentType){
      //alert('The file is not PDF');
      setMsg('The file is not PDF', false);
      setIsLoading(false);
      return;
    }

    const reader = new FileReader();
    setIsLoading(true);

    

    reader.readAsBinaryString(file);
    reader.onload = function (evt){
      const data = evt.target.result;
      const formData = new FormData();
      formData.append('pdf', file);

      //saveFile(file);
      setUploadFile(file);
      setIsLoading(false);
    };
  }

  const getTruncatedName = (name) => {
    if(name.length > 14){
        return name.substring(0, 14) + '...'
    }
    return name;
  }

  return (
    <div className='m-3'>
        <Grid container spacing={3}>
            <Grid item xs={8}>
                <Paper>
                    <Form.File 
                        id="inputFile"
                        label={uploadFile ? getTruncatedName(uploadFile.name) : 'Choose File'}
                        name='pdf'
                        custom
                        onChange={handleChange}
                    ></Form.File>
                </Paper>
            </Grid>
            <Grid item xs={1}>
                {isLoading ? <CircularProgress /> : null}
            </Grid>
            <Grid item xs={3}>
                <Button onClick={handleClick}>Submit</Button>
            </Grid>
            <Grid item xs={12}>
                {toastMsg ? toastMsg : null}
            </Grid>
        </Grid>
    </div>
  );
}

export default UploadPage;
