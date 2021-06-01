import React from "react";

import { checkString } from "../utils/stringUtils";

export class City extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCity: "",
      country: {
        nameCountry: "",
      },
      countries: [],
    };
  }

  // Función estandar de react (ciclo de vida) para cargar el objeto countries con los datos almacenados en LocalStorage.
  componentDidMount() {
    let prevCountries = localStorage.getItem("countries");
    if (prevCountries != null) {
      this.setState({
        countries: JSON.parse(prevCountries),
      });
    }
  }

  // Función para enviar los datos del formulario al componente padre.
  submitForm = (e) => {
    e.preventDefault();

    const {
      nameCity,
      country: { nameCountry },
    } = this.state;

    if (checkString(nameCity) && checkString(nameCountry)) {
      const newCity = {
        nameCity: nameCity,
        country: this.state.country,
      };

      this.props.addCity(newCity);

      this.setState({
        nameCity: "",
        country: {
          nameCountry: "",
        },
      });
    } else {
      alert("Complete todos los campos.");
    }
  };

  // Función para obtener datos del input.
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // Función para obtener datos de un select.
  handleSelect = (e) => {
    e.preventDefault();
    this.setState({
      country: JSON.parse(e.target.value),
    });
  };

  render() {
    return (
      <div className="contenedor-principal">
        <h1>CIUDADES</h1>
        <hr />
        <p>
          La vista "Cities" permite dar de alta y eliminar un elemento
          relacionado a una ciudad.
        </p>

        <div className="contenedor-alta">
          <form onSubmit={(e) => this.submitForm(e)}>
            <h3>AGREGAR UNA CIUDAD</h3>
            <input
              type="text"
              className="cities-form-nombre"
              id="cities-form-nombre-input"
              name="nameCity"
              placeholder="Ingresar nombre de la ciudad..."
              onChange={(e) => this.handleInput(e)}
              value={this.state.nameCity}
            />

            <select
              className="cities-form-select"
              id="cities-form-pais-select"
              onChange={(e) => this.handleSelect(e)}
              value={JSON.stringify(this.state.country)}
            >
              <option value={JSON.stringify({})}>Seleccionar un País</option>
              {this.state.countries.map((country, index) => (
                <option key={index + 1} value={JSON.stringify(country)}>
                  {country.nameCountry}
                </option>
              ))}
            </select>
            <br />
            <button type="submit" className="Agregar">
              AGREGAR
            </button>
          </form>
        </div>

        <div className="contenedor-listado">
          <h3>LISTADO DE CIUDADES</h3>
          <table className="table-cities">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">CIUDAD</th>
                <th scope="col">PAÍS</th>
                <th scope="col">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {this.props.cities.map((city, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{city.nameCity}</td>
                  <td>{city.country.nameCountry}</td>
                  <td>
                    <button
                      type="button"
                      className="Eliminar"
                      onClick={() => this.props.deleteCity(index)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
