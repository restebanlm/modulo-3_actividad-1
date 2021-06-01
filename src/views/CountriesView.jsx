import React from "react";

import { Country } from "../components/Country";

export class CountriesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }

  // Función estandar de react (ciclo de vida) para cargar el objeto countries con los datos almacenados en LocalStorage.
  componentDidMount() {
    let prevCountry = localStorage.getItem("countries");
    if (prevCountry != null) {
      this.setState({
        countries: JSON.parse(prevCountry),
      });
    }
  }

  // Función para guardar los datos en el objeto.
  addCountry = (country) => {
    this.setState({
      countries: [...this.state.countries, country],
    });
  };

  //Función para eliminar un objeto.
  deleteCountry = (indexCountry) => {
    const filteredCountry = this.state.countries.filter(
      (_, index) => index !== indexCountry
    );
    this.setState({
      countries: filteredCountry,
    });
  };

  // Función para guardar en el LocalStorage.
  saveData = () => {
    window.localStorage.setItem(
      "countries",
      JSON.stringify(this.state.countries)
    );
  };

  // Función estandar de React (Ciclo de vida) en cada actualización ejecuto otra función.
  componentDidUpdate() {
    this.saveData();
  }

  render() {
    return (
      <>
        <Country
          countries={this.state.countries}
          addCountry={this.addCountry}
          deleteCountry={this.deleteCountry}
        />
      </>
    );
  }
}
