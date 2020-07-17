import React, { Component } from "react";
import CountryComponent from "../../Components/CountryComponent/CountryComponent";
import axios from "../../Axios";

class NewsComponent extends Component {
  state = {
    countries: null,
  };

  componentWillMount() {
    const countries = axios
      .get("cases_by_country.php")
      .then((res) => {
        this.setState({ countries: res.data.countries_stat });
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  onCountryClickHandler = (country) => {
    alert(country.cases);
  };

  render() {
    let countries = <p>Loading...</p>;
    if (this.state.countries) {
      countries = this.state.countries.map((country) => {
        return (
          <CountryComponent
            country={country.country_name}
            clicked={() => this.onCountryClickHandler(country)}
          ></CountryComponent>
        );
      });
    }
    return (
      <div>
        <h3>Search through the corona virus cases by country</h3>
        <input></input>
        <hr></hr>
        {countries}
      </div>
    );
  }
}

export default NewsComponent;
