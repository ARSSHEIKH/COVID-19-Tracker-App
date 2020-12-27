import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: 'none',
    color: '#B22222',
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:'#012'}}>
        <Toolbar>
          
          <Typography className={classes.title} variant="h6">
            <a href="./" className={classes.title}>
              <img src="https://themefire.pro/wp-content/uploads/2020/03/03.png" width="50" height="50" style={{display:'inline-block'}}/>
              COVID'19 Tracker</a>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
