import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { firebaseConfig } from '../firebase-config'

let bigDataCountry = "none"
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
export default function AllCountries({ text, userId }) {
  const [covidData, setCovidData] = useState({});
  const [totalData, setTotalData] = useState({});
  const [Loading, setLoading] = React.useState('');
  const [invalidText, setInvalidText] = React.useState('');
  let data;
  let country
  async function GetAPi() {
    const resq = await fetch('https://api.ipify.org?format=json')
    const resApi = await resq.json()
    const res2 = await fetch('https://extreme-ip-lookup.com/json/')
    const getCountry = await res2.json()
    text = getCountry.country

    if (checker === 'incomplete') {
      const user = {
        ip: resApi.ip,
        loc: getCountry
      }
      firebaseConfig.database().ref('/userid' + (userId)).update(user)
      checker = 'complete'
    }
    else {
      return
    }
  }
  GetAPi();
  useEffect(() => {
    async function getData() {
      setLoading(<img alt="Loading" src="https://images.squarespace-cdn.com/content/v1/5c6c465377889723ef956c9c/1550783471043-359YMMSMZIVV26DVY53E/ke17ZwdGBToddI8pDm48kJ2qNPoyi7ZzABItbu6s8sNZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7UmFirIhnfOLi74fyVphn1aiKi4I-UYyejs7p5Cj_dRo_HEJWfYW9eKDr9nyb3YnuQ/globe-earth-animation-15-2.gif
      "></img>)
      setCovidData("");
      text = text.toLowerCase();
      country = text.charAt(0).toUpperCase() + text.slice(1);
      if(bigDataCountry === "done"){
        alert("Please wait, US Data will takes few seconds to remove.")
        bigDataCountry = "none"
      }
      if (country === "United kingdom" || country === "Uk") {
        country = "United Kingdom"
      }
      else if (country === "United arab emirates" || country === "Uae" || country === "United arab Emirates" || country === "United Arab emirates") {
        country = "United Arab Emirates"
      }
      else if (country === "United states" || country === "Usa" || country === "Us") {
        country = "US"
      }
      const res1 = await fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=" + country, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
        }
      })
      const totalCases = await res1.json()
      if(totalCases.data.location === "Global"){
        setTotalData("")
        setCovidData("")
        setInvalidText("Above Country not found")
        setLoading("")
        return
      }
      setTotalData(totalCases.data);
      const res = await fetch("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=" + country, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
          "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
        }
      })
      data = await res.json()
      if(!data.data.covid19Stats.length){
        return setLoading(
          <img alt="Loading" src="https://images.squarespace-cdn.com/content/v1/5c6c465377889723ef956c9c/1550783471043-359YMMSMZIVV26DVY53E/ke17ZwdGBToddI8pDm48kJ2qNPoyi7ZzABItbu6s8sNZw-zPPgdn4jUwVcJE1ZvWhcwhEtWJXoshNdA9f1qD7UmFirIhnfOLi74fyVphn1aiKi4I-UYyejs7p5Cj_dRo_HEJWfYW9eKDr9nyb3YnuQ/globe-earth-animation-15-2.gif
        "></img>
        )
      }
      setLoading()
      setCovidData(data.data.covid19Stats);
    }
    getData()
  }, [text])

  const classes = useStyles();
  let color = "white"
  let title;
  return (
    <div className={classes.root}>
      <h2 style={{ textAlign: 'center', color: '#fff' }}>{text.charAt(0).toUpperCase() + text.slice(1)}</h2>
      <h3 style={{color:"red", textAlign:"center"}}>{invalidText}</h3>
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
      
      <h2 style={{ textAlign: 'center', color: '#fff' }}>City & Province Stats</h2>
      <center>{Loading}</center>
      <Grid container spacing={3} id="gridCountry">
        {Object.keys(covidData).map((key, ind) => {
          if (covidData[key].country === "US") {
            bigDataCountry = "done"
            title = covidData[key].city + " of " + covidData[key].province
            if ('keyId' && key === 'lastUpdate') {
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
          }
          else if (covidData[key].province === "null" && covidData[key].city === "null") {
            return 
          }
          else {
            title = covidData[key].province            
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
          }
          return (
            <Grid item xs={12} sm={4} key={ind}>
              <Paper className={classes.paper} elevation={3}>
                <h3>{title}</h3>
                <Grid container spacing={0}>
                  <Paper className={classes.paper} elevation={3} style={{ background: '#D3D3D3' }}>
                    <h4 style={{ color: "DodgerBlue" }} > confirmed </h4>
                    <p> {covidData[key].confirmed}</p>
                  </Paper>
                  <Paper className={classes.paper} elevation={3} style={{ background: '#D3D3D3' }}>
                    <h4 style={{ color: "#228B22" }} > recovered </h4>
                    <p> {covidData[key].recovered}</p>
                  </Paper>
                  <Paper className={classes.paper} elevation={3} style={{ background: '#D3D3D3' }}>
                    <h4 style={{ color: "#FA8072" }} > deaths</h4>
                    <p> {covidData[key].deaths}</p>
                  </Paper>
              </Grid>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </div>
  );
}
