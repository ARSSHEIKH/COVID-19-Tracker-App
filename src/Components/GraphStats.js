import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';


let dataDeaths = [], dataConfirmed = [], dataRecovered = []
let apiData = []
let date = new Date();
let month = date.getMonth() + 1
let dataIndex = 6
export default function GraphStats() {
  const [dataD, setDataD] = React.useState({
    labels: ['June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'World Data',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: [0, 0, 0, 0, 0, 0, 0]
      }
    ]
  });
  const [dataC, setDataC] = React.useState({
    labels: ['June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Confirmed',
        backgroundColor: 'rgb(16, 174, 183)',
        borderColor: 'rgb(0, 156, 234)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgb(0, 199, 218)',
        hoverBorderColor: 'rgb(36, 174, 206)',
        data: [0, 0, 0, 0, 0, 0, 0]
      }
    ]
  });
  const [dataR, setDataR] = React.useState({
    labels: ['June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
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
  React.useEffect(() => {

    async function GetApiData() {
      try {
        const res = await fetch("https://covid-19-statistics.p.rapidapi.com/reports/total?date=2020-" + month-- + "-" + (date.getDate() - 2), {
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
      catch { }
      --dataIndex;
      if (dataIndex > 3) {
        try {
          GetApiData()
        }
        catch { }
      }
      else {
        setDataD({
          labels: ['June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Deaths',
              backgroundColor: 'rgba(255,99,132,0.2)',
              borderColor: 'rgba(255,99,132,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(255,99,132,0.4)',
              hoverBorderColor: 'rgba(255,99,132,1)',
              data: [0, 0, 0, dataDeaths[3], dataDeaths[4], dataDeaths[5], dataDeaths[6]]
            }
          ]
        })
        setDataC({
          labels: ['June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Confirmed',
              backgroundColor: 'rgb(16, 174, 183)',
              borderColor: 'rgb(0, 156, 234)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgb(0, 199, 218)',
              hoverBorderColor: 'rgb(36, 174, 206)',
              data: [0, 0, 0, dataConfirmed[3], dataConfirmed[4], dataConfirmed[5], dataConfirmed[6]]
            }
          ]
        })
        setDataR({
          labels: ['June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
          datasets: [
            {
              label: 'Recovered',
              backgroundColor: 'rgb(22, 229, 163)',
              borderColor: 'rgb(22, 213, 163)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgb(22, 183, 118)',
              hoverBorderColor: 'rgb(22, 183, 96)',
              data: [0, 0, 0, dataRecovered[3], dataRecovered[4], dataRecovered[5], dataRecovered[6]]
            }
          ]
        })
        return 0
      }
    }
    GetApiData()
  }, [])

  return (
    <div>
      <h1 style={{ color: "White" }}>Global Graph</h1>
      <h4 style={{ color: "White" }}>Date: {(date.getDate() - 2)}</h4>
      <Bar height="80" data={dataC} />
      <Bar height="80" data={dataR} />
      <Bar height="80" data={dataD} />
      <Bar height="80" />
    </div>
  );
}


