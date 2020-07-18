import React, { Component } from "react";
import CountryComponent from "../../Components/CountryComponent/CountryComponent";
import axios from "../../Axios";
import ShowIconComponent from "../../Components/ShowIconComponent/ShowIconComponent";
import Modal from "../../Components/UI/Modal/Modal";
import Spinner from "../../Components/UI/Spinner/Spinner";
import classes from "../../App.css";

class NewsComponent extends Component {
  state = {
    countries: null,
    searchCountry: "",
    showAll: false,
    showModal: false,
    selectedCountry: null,
    loading: false,
    countriesStyle: null,
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.countries !== nextState.countries ||
      this.state.showAll !== nextState.showAll ||
      this.state.searchCountry !== nextState.searchCountry ||
      this.state.selectedCountry !== nextState.selectedCountry ||
      this.state.loading !== nextState.loading ||
      this.state.showModal !== nextState.showModal
    ) {
      return true;
    }
    return false;
  }

  onCountryClickHandler = (country) => {
    let showModalState = this.state.showModal;
    this.setState({ showModal: !showModalState, selectedCountry: country });
  };

  searchCountry = (countryName) => {
    const params = {
      country: countryName,
    };
    this.setState({ loading: !this.state.loading });
    const countries = axios
      .get("latest_stat_by_country.php", { params })
      .then((res) => {
        console.log("check -- " + res.data.latest_stat_by_country);
        let countriesStyle = null;
        if (res.data.latest_stat_by_country) {
          console.log(res.data);
          countriesStyle = classes.AppHeader;
        }
        this.setState({
          countries: res.data.latest_stat_by_country,
          loading: !this.state.loading,
          countriesStyle: countriesStyle,
        });
      })
      .catch((err) => {
        this.setState({
          countries: null,
          loading: !this.state.loading,
          countriesStyle: null,
        });
        console.log(err.message);
      });
  };

  searchCountryHandler = (event) => {
    const value = event.target.value;
    this.setState({ searchCountry: value, countriesStyle: null });
    event.preventDefault();
    this.searchCountry(value);
  };

  toggleShowAllCountryHandler = () => {
    let showState = this.state.showAll;
    this.setState({ showAll: !showState });
    this.setState({ countriesStyle: null });
    if (!this.state.showAll) {
      this.setState({ loading: !this.state.loading });
      const countries = axios
        .get("cases_by_country.php")
        .then((res) => {
          this.setState({
            countries: res.data.countries_stat,
            loading: !this.state.loading,
            countriesStyle: classes.AppHeader,
          });
          //console.log(res.data);
        })
        .catch((err) => {
          this.setState({
            countries: null,
            loading: !this.state.loading,
            countriesStyle: null,
          });
          console.log(err.message);
        });
    } else {
      this.setState({
        countries: null,
        countriesStyle: null,
      });
      if (this.state.searchCountry) {
        this.searchCountry(this.state.searchCountry);
      }
    }
  };

  closeModalHandler = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  render() {
    let countries = <Spinner></Spinner>;
    if (!this.state.loading) {
      if (this.state.countries) {
        countries = this.state.countries.map((country) => {
          let countryComp;
          let searchCountry = this.state.searchCountry.toLowerCase();
          let countryName = country.country_name.toLowerCase();
          if (
            this.state.showAll ||
            (!this.state.showAll && countryName.includes(searchCountry))
          ) {
            countryComp = (
              <CountryComponent
                key={country.country_name}
                country={country.country_name}
                clicked={() => this.onCountryClickHandler(country)}
              ></CountryComponent>
            );
          }

          return countryComp;
        });
      } else {
        if (!this.state.countries) {
          countries = <p>Enter the full country name...</p>;
        }
      }
    }

    //rendering JSX

    return (
      <div>
        <h3>Search through the corona virus cases by country</h3>
        <input
          value={this.state.searchCountry}
          onChange={this.searchCountryHandler}
        ></input>

        <ShowIconComponent
          showIcon={this.state.showAll}
          clicked={this.toggleShowAllCountryHandler}
        />
        <hr></hr>
        <div className={this.state.countriesStyle}>{countries}</div>

        <Modal
          showModal={this.state.showModal}
          onCloseModal={this.closeModalHandler}
          country={this.state.selectedCountry}
        ></Modal>
      </div>
    );
  }
}

export default NewsComponent;
