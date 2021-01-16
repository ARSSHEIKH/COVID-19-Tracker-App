import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Box } from '@material-ui/core/';
import Rating from '@material-ui/lab/Rating';
import { firebaseConfig } from '../firebase-config'

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
const labels = {
  0.5: '10%',
  1: '20%',
  1.5: '30%',
  2: '40%',
  2.5: '50%',
  3: '60%',
  3.5: '70%',
  4: '80%',
  4.5: '90%',
  5: '100%',
};
export default function NavBar({userId}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(4);
  const [hover, setHover] = React.useState(-1);
 
  let date = new Date()
  useEffect(()=>{
    firebaseConfig.database().ref('/userid' + (userId)).update({
      rating: value,
      date: date.getDate() + " - " +  (date.getMonth()+1) + " - " +  date.getFullYear(),
      time: date.getHours() + " : " + date.getMinutes() + " : " + date.getSeconds()
    })
  })
// #012
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{background:' rgb(30, 56, 82)'}}>
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            <a href="./" className={classes.title}>
              <img alt="app-logo" src="https://themefire.pro/wp-content/uploads/2020/03/03.png" width="50" height="50" style={{display:'inline-block'}}/>
              COVID'19 Tracker</a>
          </Typography>
          {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
        </Toolbar>
      </AppBar>
    </div>
  );
}

