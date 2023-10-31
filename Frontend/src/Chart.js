import React, { useState } from "react";
import Highcharts from "highcharts";
import { useEffect } from "react";
import axios from "axios";


function Chart() {
  const jwtToken = localStorage.getItem('token');
    const [total, setTotal] = useState([]);
    const [close, setClose] = useState([]);
    useEffect(() => {
       
      axios.get('http://localhost:8081/chart',{
        headers: {
          'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
        }
      },)
        .then((response) => {
          // const apiDataArray = response.data;
          const {charttotal,chartclose} = response.data;
          setTotal(charttotal);
          setClose(chartclose)
          console.log(response.data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
       }, []); 
       
    // useEffect(() => {
       
    //     axios.get('http://localhost:8081/chartotal',{
    //       headers: {
    //         'Authorization': `Bearer ${jwtToken}`, // Set the JWT as an 'Authorization' header
    //       }
    //     })
    //       .then((response) => {
    //         // const apiDataArray = response.data;
    //         const {chartotal,charclose} = response.data;
    //         setTotal(chartotal);
    //         setClose(charclose)
    //         console.log(response.data)
    //       })
        //   .catch((error) => {
        //     console.error('Error fetching data:', error);
        //   });
        //  }, []); 

  useEffect(() => {
    Highcharts.chart("container", {
      chart: {
        type: "column",
      },
      title: {
        text: " ",
      },
      subtitle: {
        text: " ",
      },
      xAxis: {
        categories: ["FIN", "QUA", "STR", "MAN", "STO", "HR"],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: " ",
        },
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      series: [
        
        {
          name: "Total",
          data: total
        },
        {
          name: "Close",
          data: close
        },
      ],
    });
  }, [total,close]);
  
  return (
    <figure className="highcharts-figure">
      <div id="container"></div>
      <p className="highcharts-description"></p>
    </figure>
  );
}

export default Chart;
