import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Aux from "../../../hoc/Auxilary/Auxilary";

class Modal extends Component {
  render() {
    const countryName = this.props.country
      ? this.props.country.country_name
      : "No Data Available";

    const numberOfCases = this.props.country
      ? this.props.country.cases
        ? this.props.country.cases
        : this.props.country.total_cases
      : null;

    const numberOfDeaths = this.props.country
      ? this.props.country.deaths
        ? this.props.country.deaths
        : this.props.country.total_deaths
      : null;

    const numberOfRecovery = this.props.country
      ? this.props.country.total_recovered
      : null;

    const activeCases = this.props.country
      ? this.props.country.active_cases
      : null;

    const testCarried = this.props.country
      ? this.props.country.total_tests
      : null;

    return (
      <Aux>
        <Dialog open={this.props.showModal} onClose={this.props.onCloseModal}>
          <DialogTitle id="alert-dialog-title">
            Corona virus cases at <b>{countryName}</b>
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Current number of cases <b>{numberOfCases}</b>
            </Typography>
            <Typography gutterBottom>
              Number of deaths <b>{numberOfDeaths}</b>
            </Typography>
            <Typography gutterBottom>
              Total number of recovery <b>{numberOfRecovery}</b>
            </Typography>
            <Typography gutterBottom>
              Active number of cases <b>{activeCases}</b>
            </Typography>
            <Typography gutterBottom>
              Amount of tests carried <b>{testCarried}</b>
            </Typography>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.props.onCloseModal} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Aux>
    );
  }
}

export default Modal;
