import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: '0 auto',
    marginTop: 50
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    wordWrap: 'breakWord'
  },
}));

export default function GlobalStats({currentScreen}) {
  const [covidData, setCovidData] = useState({});
  let data;
  
  useEffect(()=>{
    async function getCovidData(){
      const res = await fetch("https://covid-19-data.p.rapidapi.com/totals", {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
          "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
        }
      })
      data = await res.json()
      setCovidData(data[0])
    }
    getCovidData()
  }, [data])
  const classes = useStyles();
  let color = "white"
  let index = 0;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(covidData).map((key, ind) => {
          if(index >= 4){
            return
          }
          index++;
          if(key.toUpperCase() === "CONFIRMED"){
            color = "DodgerBlue"
          }
          else if(key.toUpperCase() === "RECOVERED"){
            color = "#228B22"
          }
          if(key.toUpperCase() === "CRITICAL"){
            color = "#FF0000"
          }
          if(key.toUpperCase() === "DEATHS"){
            color = "#FA8072"
          }
          return(
            <Grid item xs={6} sm={6} key={ind}>
              <Paper className={classes.paper} style={{color: color}} elevation={3}>
                
                <h3>{key.toUpperCase()}</h3>
                <b>{covidData[key]}</b>
              </Paper>
            </Grid>
          )
        })}
        
      </Grid>
    </div>
  );
}
