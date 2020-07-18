import React, { Component } from "react";
import CountryComponent from "../../Components/CountryComponent/CountryComponent";
import axios from "../../Axios";
import ShowIconComponent from "../../Components/ShowIconComponent/ShowIconComponent";
import Modal from "../../Components/UI/Modal/Modal";
import Spinner from "../../Components/UI/Spinner/Spinner";

class NewsComponent extends Component {
  state = {
    countries: null,
    searchCountry: "",
    showAll: false,
    showModal: false,
    selectedCountry: null,
    loading: false,
  };

  componentDidMount() {
    if (!this.state.showAll) {
      this.setState({ loading: !this.state.loading });
      const countries = axios
        .get("cases_by_country.php")
        .then((res) => {
          this.setState({
            countries: res.data.countries_stat,
            loading: !this.state.loading,
          });
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }

  onCountryClickHandler = (country) => {
    let showModalState = this.state.showModal;
    this.setState({ showModal: !showModalState, selectedCountry: country });
  };

  searchCountryHandler = (event) => {
    const value = event.target.value;
    this.setState({ searchCountry: value });
    event.preventDefault();
    const params = {
      country: value,
    };
    axios.create;
    this.setState({ loading: !this.state.loading });
    const countries = axios
      .get("latest_stat_by_country.php", { params })
      .then((res) => {
        this.setState({
          countries: res.data.latest_stat_by_country,
          loading: !this.state.loading,
        });
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  toggleShowAllCountryHandler = () => {
    let showState = this.state.showAll;
    this.setState({ showAll: !showState });
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
            !this.state.showAll &&
            searchCountry &&
            countryName.includes(searchCountry)
          ) {
            countryComp = (
              <CountryComponent
                key={country.country_name}
                country={country.country_name}
                clicked={() => this.onCountryClickHandler(country)}
              ></CountryComponent>
            );
          } else if (this.state.showAll) {
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
        {countries}

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
