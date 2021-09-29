import React from "react";
import { sortDataByCases } from "../../utils/sort-data/SortData";
import { useStateValue } from "../../utils/redux/StateProvider";
import "./Table.css";
import { Card, CardContent } from "@mui/material";
import numeral from "numeral";

function Table() {
  const [allCountriesCovidData] = useStateValue();

  return (
    <Card>
      <CardContent>
        <h3>Live Cases by Country</h3>
        <div className="table">
          <table>
            <tbody>
              {allCountriesCovidData.allCountriesCovidData?.length > 0 &&
                sortDataByCases(
                  allCountriesCovidData.allCountriesCovidData
                ).map((country, index) => (
                  <tr key={index}>
                    <td>{country.country}</td>
                    <td>
                      <strong>{numeral(country.cases).format("0,0")}</strong>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default Table;
