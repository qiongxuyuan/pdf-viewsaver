import React from 'react';
import {Grid, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        color: 'grey',
    }
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <Grid className={classes.footer} container spacing={3}>
            <Grid className='p-3 text-center' item xs={10}>
                    <span>Copyright &copy; QXY PDF 2020</span>
            </Grid>
        </Grid>
    );

}

export default Footer;