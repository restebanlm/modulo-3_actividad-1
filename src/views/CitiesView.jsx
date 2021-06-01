import React from "react";

import { City } from "../components/City";

export class CitiesView extends React.Component {
  constructor() {
    super();
    this.state = {
      cities: [],
    };
  }

  // Función estandar de react (ciclo de vida) para cargar el objeto cities con los datos almacenados en LocalStorage.
  componentDidMount() {
    let prevCities = localStorage.getItem("cities");
    if (prevCities != null) {
      this.setState({
        cities: JSON.parse(prevCities),
      });
    }
  }

  // Función para guardar los datos en el objeto.
  addCity = (city) => {
    this.setState({
      cities: [...this.state.cities, city],
    });
  };

  //Función para eliminar un objeto.
  deleteCity = (indexCity) => {
    const filteredCity = this.state.cities.filter(
      (_, index) => index !== indexCity
    );
    this.setState({
      cities: filteredCity,
    });
  };

  // Función para guardar en el LocalStorage.
  saveData = () => {
    window.localStorage.setItem("cities", JSON.stringify(this.state.cities));
  };

  // Función estandar de React (Ciclo de vida) en cada actualización ejecuto otra función.
  componentDidUpdate() {
    this.saveData();
  }

  render() {
    return (
      <>
        <City
          cities={this.state.cities}
          addCity={this.addCity}
          deleteCity={this.deleteCity}
        />
      </>
    );
  }
}
