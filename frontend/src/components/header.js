import React from 'react';
import { AppBar, Toolbar, IconButton, Typography, InputBase} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ViewFileInput from './view-file-input'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'block',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
      color: '#fff',
      textDecoration: 'none',
    },
    titleLink: {
        color: 'white',
        textDecoration: 'none',
        '&:hover': {
            color: 'white',
            textDecoration: 'none',
        }
    },
    fileView: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    fileIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from fileIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const Header = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position='static'>
                <Toolbar variant='regular'>
                    {/* <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <Typography className={classes.title} variant='h6'>
                        <a className={classes.titleLink} href="/">QXY PDF</a>
                    </Typography>
                    <div className={classes.fileView}>
                        <div className={classes.fileIcon} >
                            <FileCopyIcon />
                        </div>
                        <ViewFileInput 
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}>
                        </ViewFileInput>
                        {/* <InputBase 
                            placeholder='File Name..'
                            classes={}
                              inputProps={{ 'aria-label': 'search' }}
                        >
                        </InputBase> */}
                    </div>
                    
                </Toolbar>
            </AppBar>
            
        </div>
    );

}

export default Header;