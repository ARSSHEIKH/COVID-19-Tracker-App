import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'

let dataDeaths = [], dataConfirmed = [], dataRecovered = []
let apiData = []
let date = new Date();
let month = date.getMonth() + 1
let dataIndex = 7
let title;
let usingDate = date.getDate() - 2;
let year = date.getFullYear();
let dateDash = "-";

export default function GraphStats({ text }) {

  let country
  const [value, setValue] = React.useState('global');
  const [Loading, setLoading] = React.useState('');
  const [error, setError] = React.useState('');
  const [ability, setAbility] = React.useState(false)

  const monthName = ['June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan']
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [dataR, setDataR] = React.useState({
    labels: [monthName[0], monthName[1], monthName[2], monthName[3], monthName[4], monthName[5], monthName[6], monthName[7]],
    datasets: [
      {
        label: 'Recovered',
        backgroundColor: 'rgb(22, 229, 163)',
        borderColor: 'rgb(22, 213, 163)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(22, 183, 118)',
        hoverBorderColor: 'rgb(22, 183, 96)',
        data: [0, 0, 0, 0, 0, 0, 0]
      }
    ]
  });


  useEffect(() => {

    async function GetApiData() {
      text = text.toLowerCase();
      country = text.charAt(0).toUpperCase() + text.slice(1);
      if (country === "United kingdom" || country === "Uk") {
        country = "United Kingdom"
      }
      else if (country === "United arab emirates" || country === "Uae" || country === "United arab Emirates" || country === "United Arab emirates") {
        country = "United Arab Emirates"
      }
      else if (country === "United states" || country === "Usa" || country === "Us") {
        country = "US"
      }
      if (month === 0) {
        // usingDate = 29
        month = 12
        year = year-1
      }
      if (value === "global") {
        setError(``);
        setAbility(true)
        setLoading("Loading ....")
        setDataR({
          labels: [monthName[0], monthName[1], monthName[2], monthName[3], monthName[4], monthName[5], monthName[6], monthName[7]],
          datasets: [
            {
              label: 'Deaths',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [0,0,0,0,0,0,0]
            },
            {
              label: 'Recovered',
              backgroundColor: 'rgb(22, 229, 163)',
              borderColor: 'rgb(22, 213, 163)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgb(22, 183, 118)',
              hoverBorderColor: 'rgb(22, 183, 96)',
              data: [0,0,0,0,0,0,0]
            },
            {
              label: 'Confirmed',
              backgroundColor: 'rgb(16, 174, 183)',
              borderColor: 'rgb(0, 156, 234)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgb(0, 199, 218)',
              hoverBorderColor: 'rgb(36, 174, 206)',
              data: [0,0,0,0,0,0,0]
            }
          ]
        })
        title = "Global Stats"
        if (month < 10) {
          if(usingDate<10){
            dateDash = dateDash
          }
          else if(usingDate>=10){
            dateDash = "-"
          }
          try {
            const res = await fetch("https://covid-19-statistics.p.rapidapi.com/reports/total?date="+year+"-0" + month-- + dateDash + usingDate, {
              "method": "GET",
              "headers": {
                "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
                "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
              }
            })

            apiData[dataIndex] = await res.json()
            dataDeaths[dataIndex] = apiData[dataIndex].data.deaths
            dataConfirmed[dataIndex] = apiData[dataIndex].data.confirmed
            dataRecovered[dataIndex] = apiData[dataIndex].data.recovered
          }
          catch {
            setError(`Something went wrong, 
                  Maybe Internet Connection Failed`);
          }
        }
        else {
          if(usingDate<10){
            dateDash = "-0"
          }
          else if(usingDate>=10){
            dateDash = "-"
          }
          try {
            const res = await fetch("https://covid-19-statistics.p.rapidapi.com/reports/total?date="+year+"-" + month-- + dateDash + usingDate, {
              "method": "GET",
              "headers": {
                "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
                "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com"
              }
            })
            apiData[dataIndex] = await res.json()
            dataDeaths[dataIndex] = apiData[dataIndex].data.deaths
            dataConfirmed[dataIndex] = apiData[dataIndex].data.confirmed
            dataRecovered[dataIndex] = apiData[dataIndex].data.recovered
          }
          catch {
            setError(`Something went wrong, 
                  Maybe Internet Connection Failed`);
          }
        }
        --dataIndex;
        if (dataIndex >= 0) {
          try {
            GetApiData()
          }
          catch { }
        }
        else {
          setAbility(false)
          setLoading("")
          dataIndex = 7
          month = date.getMonth() + 1
          year = date.getFullYear();
          setDataR({
            labels: [monthName[0], monthName[1], monthName[2], monthName[3], monthName[4], monthName[5], monthName[6], monthName[7]],
            datasets: [
              {
                label: 'Deaths',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [dataDeaths[0], dataDeaths[1], dataDeaths[2], dataDeaths[3], dataDeaths[4], dataDeaths[5], dataDeaths[6], dataDeaths[7]]
              },
              {
                label: 'Recovered',
                backgroundColor: 'rgb(22, 229, 163)',
                borderColor: 'rgb(22, 213, 163)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(22, 183, 118)',
                hoverBorderColor: 'rgb(22, 183, 96)',
                data: [dataRecovered[0], dataRecovered[1], dataRecovered[2], dataRecovered[3], dataRecovered[4], dataRecovered[5], dataRecovered[6], dataRecovered[7]]
              },
              {
                label: 'Confirmed',
                backgroundColor: 'rgb(16, 174, 183)',
                borderColor: 'rgb(0, 156, 234)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(0, 199, 218)',
                hoverBorderColor: 'rgb(36, 174, 206)',
                data: [dataConfirmed[0], dataConfirmed[1], dataConfirmed[2], dataConfirmed[3], dataConfirmed[4], dataConfirmed[5], dataConfirmed[6], dataConfirmed[7]]
              }
            ]
          })
          return 0
        }
      }
      else if (value === "country") {
        setError(``);
        setAbility(true)
        setLoading("Loading ....")
        setDataR({
          labels: [monthName[0], monthName[1], monthName[2], monthName[3], monthName[4], monthName[5], monthName[6], monthName[7]],
          datasets: [
            {
              label: 'Deaths',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [0,0,0,0,0,0,0]
            },
            {
              label: 'Recovered',
              backgroundColor: 'rgb(22, 229, 163)',
              borderColor: 'rgb(22, 213, 163)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgb(22, 183, 118)',
              hoverBorderColor: 'rgb(22, 183, 96)',
              data: [0,0,0,0,0,0,0]
            },
            {
              label: 'Confirmed',
              backgroundColor: 'rgb(16, 174, 183)',
              borderColor: 'rgb(0, 156, 234)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgb(0, 199, 218)',
              hoverBorderColor: 'rgb(36, 174, 206)',
              data: [0,0,0,0,0,0,0]
            }
          ]
        })
        title = text.toUpperCase()
        if (month < 10) {
          if(usingDate<10){
            dateDash = "-0"
          }
          else if(usingDate>=10){
            dateDash = "-"
          }
          try {
            try {
              const resConf = await fetch("https://covid1910.p.rapidapi.com/data/confirmed/country/" + country + "/date/0" + month + dateDash + usingDate + "-"+year, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
                  "x-rapidapi-host": "covid1910.p.rapidapi.com"
                }
              })
              const countryResConf = await resConf.json()
              dataConfirmed[dataIndex] = countryResConf[0].confirmed
            }
            catch {
              setError(`Something went wrong, 
                    Maybe Internet Connection Failed`);
            }
            try {
              const resRecov = await fetch("https://covid1910.p.rapidapi.com/data/recovered/country/" + country + "/date/0" + month + dateDash + usingDate + "-"+year, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
                  "x-rapidapi-host": "covid1910.p.rapidapi.com"
                }
              })
              const countryResRecov = await resRecov.json()
              dataRecovered[dataIndex] = countryResRecov[0].recovered
            }
            catch {
              setError(`Something went wrong, 
                    Maybe Internet Connection Failed`);
            }
            try {
              const resDeath = await fetch("https://covid1910.p.rapidapi.com/data/death/country/" + country + "/date/0" + month-- + dateDash + usingDate + "-"+year, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
                  "x-rapidapi-host": "covid1910.p.rapidapi.com"
                }
              })
              const countryResDeath = await resDeath.json()
              dataDeaths[dataIndex] = countryResDeath[0].death
            }
            catch {
              setError(`Something went wrong, 
                    Maybe Internet Connection Failed`);
            }
          }
          catch { }
        }
        else {
          try {
            try {
              const resConf = await fetch("https://covid1910.p.rapidapi.com/data/confirmed/country/" + country + "/date/" + month + dateDash + usingDate + "-"+year, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
                  "x-rapidapi-host": "covid1910.p.rapidapi.com"
                }
              })
              const countryResConf = await resConf.json()
              dataConfirmed[dataIndex] = countryResConf[0].confirmed
            }
            catch {
              setError(`Something went wrong, 
                    Maybe Internet Connection Failed`);
            }
            try {
              const resRecov = await fetch("https://covid1910.p.rapidapi.com/data/recovered/country/" + country + "/date/" + month + dateDash + usingDate + "-"+year, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
                  "x-rapidapi-host": "covid1910.p.rapidapi.com"
                }
              })
              const countryResRecov = await resRecov.json()
              dataRecovered[dataIndex] = countryResRecov[0].recovered
            }
            catch {
              setError(`Something went wrong, 
                    Maybe Internet Connection Failed`);
            }
            try {
              const resDeath = await fetch("https://covid1910.p.rapidapi.com/data/death/country/" + country + "/date/" + month-- + dateDash + usingDate + "-"+year, {
                "method": "GET",
                "headers": {
                  "x-rapidapi-key": "008f2c29aamshe451c7d286c4d43p1fc2a8jsna64e71f494d5",
                  "x-rapidapi-host": "covid1910.p.rapidapi.com"
                }
              })
              const countryResDeath = await resDeath.json()
              dataDeaths[dataIndex] = countryResDeath[0].death
            }
            catch {
              setError(`Something went wrong, 
                    Maybe Internet Connection Failed`);
            }
          }
          catch { }
        }
        --dataIndex;
        if (dataIndex >= 0) {
          try {
            GetApiData()
          }
          catch { }
        }
        else {
          setAbility(false)
          setLoading("")
          dataIndex = 7
          month = date.getMonth() + 1
          year = date.getFullYear();
          setDataR({
            labels: [monthName[0], monthName[1], monthName[2], monthName[3], monthName[4], monthName[5], monthName[6], monthName[7]],
            datasets: [
              {
                label: 'Deaths',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [dataDeaths[0], dataDeaths[1], dataDeaths[2], dataDeaths[3], dataDeaths[4], dataDeaths[5], dataDeaths[6], dataDeaths[7]]
              },
              {
                label: 'Recovered',
                backgroundColor: 'rgb(22, 229, 163)',
                borderColor: 'rgb(22, 213, 163)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(22, 183, 118)',
                hoverBorderColor: 'rgb(22, 183, 96)',
                data: [dataRecovered[0], dataRecovered[1], dataRecovered[2], dataRecovered[3], dataRecovered[4], dataRecovered[5], dataRecovered[6], dataRecovered[7]]
              },
              {
                label: 'Confirmed',
                backgroundColor: 'rgb(16, 174, 183)',
                borderColor: 'rgb(0, 156, 234)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgb(0, 199, 218)',
                hoverBorderColor: 'rgb(36, 174, 206)',
                data: [dataConfirmed[0], dataConfirmed[1], dataConfirmed[2], dataConfirmed[3], dataConfirmed[4], dataConfirmed[5], dataConfirmed[6], dataConfirmed[7]]
              }
            ]
          })
          return 0
        }
      }
    }
    GetApiData()

  }, [value, text])
  return (
    <div>
      <FormControl component="fieldset" style={{ color: "White" }}>
        <FormLabel component="legend" style={{ color: "White", display: "inline-block" }}>Data: </FormLabel>
        <RadioGroup aria-label="statsOptions" name="statsOptions" value={value} onChange={handleChange} style={{ color: "White", display: "inline-block" }}>
          <FormControlLabel value="global" control={<Radio />} label="Global Data" disabled={ability} style={{ color: "White" }} />
          <FormControlLabel value="country" control={<Radio />} label="Country" disabled={ability} style={{ color: "White" }} />
        </RadioGroup>
      </FormControl>
      <h1 style={{ color: "White", textAlign: "center" }}>{title}</h1>
      <h4 style={{ color: "White" }}>Date: {usingDate}</h4>
      <h4 style={{ color: "White", textAlign: "center", color: "green" }}>{Loading}</h4>
      <h4 style={{ textAlign: "center", color: "red" }}>{error}</h4>
      <Bar height="100" data={dataR} />
      <Bar height="80" />
    </div>
  );
}


