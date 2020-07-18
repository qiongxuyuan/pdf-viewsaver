import React from 'react';
import logo from './logo.svg';
import {InputGroup, Button, FormControl, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormData from 'form-data';

const axios = require('axios');
const ServerHost = 'http://localhost:55000';

function App() {
  return (<div>app page</div>);
  // const saveFileData = (response, filesUrl) => {
  //   //save file data to DB.
  //   //notify user file uploaded.
  //   const awsFilename = response.data.uploadName;
  //   axios.post(filesUrl + '/' + awsFilename).then(postServerResponse => {
  //     alert('file saved at ' + ServerHost + '/files/' + awsFilename);
  //   }).catch( err => {
  //     console.log(err);
  //   });
  // }

  // const saveFile = (file) => {
  //   const url = ServerHost + '/fileupload';
  //   const filesUrl = ServerHost + '/files';
  //   const ContentType = 'application/pdf';
  //   const fileType = file.type;
  //   if(fileType !== ContentType){
  //     alert('The file is not PDF');
  //     return;
  //   }

  //   axios.post(
  //     url + '?name=' + file.name 
  //   ).then( response => {
  //     console.log(response.data);
  //     //upload file to AWS
  //     const signedUrl = response.data.signedUrl;
  //     if(!signedUrl){
  //       alert('Error on upload file - can not get signed url');
  //       return;
  //     }
  //     axios.put(
  //       signedUrl,
  //       file,
  //       {
  //         headers:{
  //           'Content-Type': ContentType,
  //         }
  //       }
  //     ).then(awsResponse => {

  //       console.log(awsResponse.data);
  //       saveFileData(response, filesUrl);

  //     }).catch(err => {
  //       console.log(err);
  //     });
  //   }).catch( err => {
  //     console.log(err);
  //   });
  // }

  // const handleChange = (event) => {
  //   const file = event.target.files[0];
  //   if(!file) return;
  //   const reader = new FileReader();
    

  //   reader.readAsBinaryString(file);
  //   reader.onload = function (evt){
  //     const data = evt.target.result;
  //     const formData = new FormData();
  //     formData.append('pdf', file);

  //     saveFile(file);
  //   };
  // }

  // return (
  //   <div className="App">
  //     <Form className="col-6">
  //         <Form.File 
  //           id="inputFile"
  //           label="Choose File"
  //           name='pdf'
  //           custom
  //           onChange={handleChange}
  //         ></Form.File>
  //         <Button>Submit</Button>
  //     </Form>
  //   </div>
  // );
}

export default App;
