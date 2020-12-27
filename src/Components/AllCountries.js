import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { firebaseConfig } from '../firebase-config'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: '0 auto',
    marginTop: 50,
    height: 1000
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    wordWrap: 'breakWord'
  },
}));
let checker = 'incomplete';
export default function AllCountries({ currentScreen, text }) {
  const [covidData, setCovidData] = useState({});
  const [totalData, setTotalData] = useState({});

  let data;

  async function GetAPi() {
    const resq = await fetch('https://api.ipify.org?format=json')
    const resApi = await resq.json()

    const res2 = await fetch('https://extreme-ip-lookup.com/json/')
    const getCountry = await res2.json()
    text = getCountry.country;
    
    if(checker === 'incomplete'){
      const user ={
        ip : resApi.ip,
        loc : getCountry
      }
      let temp = Math.floor(Math.random() * 1000000); 
      firebaseConfig.database().ref('/userid' + (temp)).set(user)
      checker='complete'
    }
    else{
      return
    }
  }
  GetAPi();
  useEffect(() => {
    async function getData() {
      const res1 = await fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=" + text, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
        }
      })
      const totalCases = await res1.json()
      setTotalData(totalCases.data);

      const res = await fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=" + text, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
        }
      })
      data = await res.json()
      setCovidData(data.data.covid19Stats);
      // firebaseConfig.database().ref('user/'+userIpAdd+'/'+ind + "/").set(databaseValues)

      // console.log(firebaseConfig);
    }
    getData()
  }, [text])

  const classes = useStyles();
  let color = "white"
  return (
    <div className={classes.root}>
      <h2 style={{ textAlign: 'center', color: '#fff' }}>{text}</h2>

      <Grid container spacing={3}>
        {Object.keys(totalData).map((key, ind) => {

          if (key.toUpperCase() === "CONFIRMED") {
            color = "DodgerBlue"
          }
          else if (key.toUpperCase() === "RECOVERED") {
            color = "#228B22"
          }
          if (key.toUpperCase() === "DEATHS") {
            color = "#FA8072"
          }
          if (ind > 2) {
            return
          }
          return (
            <Grid item xs={6} sm={6} key={ind}>
              <Paper className={classes.paper} style={{ color: color }} elevation={3}>
                <h3>{key.toUpperCase()}</h3>
                <p>{totalData[key]}</p>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
      <hr />
      <h2 style={{ textAlign: 'center', color: '#fff' }}>State Stats</h2>
      <Grid container spacing={3}>
        {Object.keys(covidData).map((key, ind) => {

          if (key === 'city' && key === 'keyId' && key === 'lastUpdate') {
            return
          }
          if (covidData[key].confirmed === "confirmed") {
            color = "DodgerBlue"
          }
          else if (covidData[key].recovered === "recovered") {
            color = "#228B22"
          }
          if (covidData[key].deaths === "deaths") {
            color = "#FA8072"
          }
          return (
            <Grid item xs={12} sm={4} key={ind}>
              <Paper className={classes.paper} elevation={3}>
                <h3>{covidData[key].province}</h3>
                <Grid container spacing={0}>
                  <Paper className={classes.paper} elevation={3} style={{ background: '#D3D3D3' }}>
                    <h4 style={{ color: "DodgerBlue" }} > confirmed </h4>
                    <p> {covidData[key].confirmed}</p>
                  </Paper>
                  <Paper className={classes.paper} elevation={3} style={{ background: '#D3D3D3' }}>
                    <h4 style={{ color: "#228B22" }} > recovered </h4>
                    <p> {covidData[key].confirmed}</p>
                  </Paper>
                  <Paper className={classes.paper} elevation={3} style={{ background: '#D3D3D3' }}>
                    <h4 style={{ color: "#FA8072" }} > deaths</h4>
                    <p> {covidData[key].confirmed}</p>
                  </Paper></Grid>
                {/* <p style={{ color: "DodgerBlue" }} > confirmed : {covidData[key].confirmed}</p>
                <p style={{ color: "#228B22" }}> recovered : {covidData[key].recovered} </p>
                <p style={{ color: "#FA8072" }} > deaths : {covidData[key].deaths}</p> */}

              </Paper>
            </Grid>
          )

        })}
      </Grid>
    </div>
  );
}
