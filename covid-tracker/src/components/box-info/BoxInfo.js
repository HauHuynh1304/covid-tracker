import React from "react";
import "./BoxInfo.css";
import CardContent from "@mui/material/CardContent";
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";

function BoxInfo({ title, cases, total, active, isRed, ...props }) {
  return (
    <div className="info__Box__Container">
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && "infoBox--selected"} ${
          isRed && "infoBox--red"
        }`}
      >
        <CardContent>
          <Typography
            color="textSecondary"
            gutterBottom
            className="infoBox__title"
          >
            {title}
          </Typography>
          <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
            {cases}
          </h2>

          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default BoxInfo;
