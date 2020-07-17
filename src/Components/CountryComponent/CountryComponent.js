import React from "react";
import { Card } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

const countryComponent = (props) => {
  return (
    <Card style={{ width: "275px", display: "inline-block", margin: "10px" }}>
      <CardContent>
        <Typography>
          <h3>{props.country}</h3>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.clicked}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default countryComponent;
