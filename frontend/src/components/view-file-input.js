import React, {useState} from 'react';
import {InputBase, Button, Grid, makeStyles} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import {ServerHostUrl, ViewFilePath, GetFilePath} from '../constants';

const useStyles = makeStyles((theme) => ({
    error: {
        border: '1px solid red',
    }
}));

const ViewFileInput = (props) => {
    const [fileName, setFileName] = useState('');
    const [hasError, setHasError] = useState(false);
    const [toast, setToast] = useState(null);

    const classes = useStyles();

    const handleInputChange = (event) => {
        setFileName(event.target.value);
    }

    const handleChange = (event) => {
        event.preventDefault();
        if(!fileName){
            //popup 
            // setToast(
            //     <Alert variant='filled' serverity='error' >
            //         Please enter a file name
            //     </Alert>
            // );
            setHasError(true);
            return;
        }
        setHasError(false);
        console.log('file:', fileName);
        const fileViewUrl = ServerHostUrl + ViewFilePath + fileName;
        const fileGetUrl = ServerHostUrl + GetFilePath + fileName;
        axios.get(fileGetUrl).then(response => {
            console.log(response.data);
            const awsFileRes = response.data;
            if(awsFileRes.file && awsFileRes.url){
                document.location = fileViewUrl;
                //console.log(awsFileRes.url);
                //redirect to awsFile.url
            }
            else{
                setHasError(true);
            }
        }).catch( error => {
            console.log('Error on fetching file url from server', error);
            setHasError(true);
        });;
    }

    return(
        <div>
            <Form onSubmit={handleChange} className={hasError ? classes.error : ''}>
                <Grid container>
                    <Grid item xs={10}>
                        <InputBase 
                            placeholder={hasError ? 'Please enter File Name' : 'File Name..'}
                            classes={props.classes}
                                inputProps={{ 'aria-label': 'search' }}
                            onChange={handleInputChange}
                            fullWidth={true}
                            value={fileName}
                        >
                        </InputBase>
                    </Grid>
                    <Grid item xs={2}>
                        <Button className='float-right' type='submit' variant='contained' color='primary'>View</Button>
                    </Grid>
                </Grid>
            </Form>
            <div className='position-absolute'>
                {toast}
            </div>
            
        </div>
    );
}

export default ViewFileInput;