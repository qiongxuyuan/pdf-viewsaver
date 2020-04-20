import React from 'react';
import logo from './logo.svg';
import {InputGroup, Button, FormControl, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FormData from 'form-data';

const axios = require('axios');

function App() {
  const handleChange = (event) => {
    console.log('handle change', event.target.files);
    const file = event.target.files[0];
    const reader = new FileReader();
    const url = 'http://localhost:55000/fileupload';
    reader.readAsBinaryString(file);
    reader.onload = function (evt){
      console.log(evt.target.result);
      const data = evt.target.result;
      const formData = new FormData();
      formData.append('pdf', file);
      axios.post(
        url,
       formData,
        {
          headers:{
            //'Content-Type': 'application/json'
            'Content-Type': 'multipart/form-data',
          }
        }
        ).then(function(response) {
          console.log(response.data);
        }).catch(function (err){
          console.log(err);
        });
    };
  }

  return (
    <div className="App">
      <Form className="col-6">
          <Form.File 
            id="inputFile"
            label="Choose File"
            name='pdf'
            custom
            onChange={handleChange}
          ></Form.File>
          <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default App;
