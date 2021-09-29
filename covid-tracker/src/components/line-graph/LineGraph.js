import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { useStateValue } from "../../utils/redux/StateProvider";
import "./LineGraph.css";
import { Card, CardContent } from "@mui/material";

const options = {
  plugins: {
    legend: {
      display: false,
    },

    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
  maintainAspectRatio: true,
};

let buildChartDataWorldwide = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

let buildChartDataCountry = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.timeline.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data.timeline[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data.timeline[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType, ...props }) {
  const [data, setData] = useState({});
  const [{ countryState }] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      if (countryState == "Worldwide" || !countryState) {
        await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
        )
          .then((res) => res.json())
          .then((data) => {
            let chartData = buildChartDataWorldwide(data, casesType);
            setData(chartData);
          })
          .catch((e) => {
            setData("");
          });
      } else {
        await fetch(
          `https://disease.sh/v3/covid-19/historical/${countryState?.name}?lastdays=30`
        )
          .then((res) => res.json())
          .then((data) => {
            let chartData = buildChartDataCountry(data, casesType);
            setData(chartData);
          })
          .catch((e) => {
            setData("");
          });
      }
    };
    fetchData();
  }, [casesType, countryState?.name]);

  return (
    <Card>
      <CardContent>
        <div>
          {data?.length > 0 ? (
            <Line
              data={{
                datasets: [
                  {
                    fill: true,
                    backgroundColor: "rgba(75,192,192,0.2)",
                    borderColor: "rgba(75,192,192,1)",
                    data: data,
                  },
                ],
              }}
              options={options}
            />
          ) : (
            <div>
              <h4 className="LineGraph__No_Data">No Data</h4>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default LineGraph;
