import React from "react";

import { checkString } from "../utils/stringUtils";

export class Company extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCompany: "",
      city: {
        nameCity: "",
        country: {
          nameCountry: "",
        },
      },
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

  // Función para enviar los datos del formulario al componente padre.
  submitForm = (e) => {
    e.preventDefault();

    const {
      nameCompany,
      city: { nameCity },
      city: {
        country: { nameCountry },
      },
    } = this.state;

    if (
      checkString(nameCompany) &&
      checkString(nameCity) &&
      checkString(nameCountry)
    ) {
      const newCompany = {
        nameCompany: nameCompany,
        city: this.state.city,
      };

      this.props.addCompany(newCompany);

      this.setState({
        nameCompany: "",
        city: {
          nameCity: "",
          country: {
            nameCountry: "",
          },
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
      city: JSON.parse(e.target.value),
    });
  };

  render() {
    return (
      <div className="contenedor-principal">
        <h1>COMPAÑIAS</h1>
        <hr />
        <p>
          La vista "Companies" permite dar de alta y eliminar un elemento
          relacionado a una compañia.
        </p>

        <div className="contenedor-alta">
          <form onSubmit={(e) => this.submitForm(e)}>
            <h3>AGREGAR EMPRESA</h3>
            <input
              type="text"
              className="companies-form-nombre"
              id="companies-form-nombre-input"
              name="nameCompany"
              placeholder="Ingresar nombre de la empresa..."
              onChange={(e) => this.handleInput(e)}
              value={this.state.nameCompany}
            />

            <select
              className="companies-form-select-city"
              id="companies-form-ciudad-select"
              onChange={(e) => this.handleSelect(e)}
              value={JSON.stringify(this.state.city)}
            >
              <option value={JSON.stringify({})}>
                Seleccionar un Ciudad-País
              </option>
              {this.state.cities.map((city, index) => (
                <option key={index + 1} value={JSON.stringify(city)}>
                  {city.nameCity} - {city.country.nameCountry}
                </option>
              ))}
            </select>
            <br />

            <button type="submit" className="Agregar">
              Agregar
            </button>
          </form>
        </div>

        <div className="contenedor-listado">
          <h3>Listado de Empresas</h3>
          <table className="table-countries">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">EMPRESA</th>
                <th scope="col">CIUDAD</th>
                <th scope="col">PAÍS</th>
                <th scope="col">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {this.props.companies.map((company, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{company.nameCompany}</td>
                  <td>{company.city.nameCity}</td>
                  <td>{company.city.country.nameCountry}</td>
                  <td>
                    <button
                      type="button"
                      className="Eliminar"
                      onClick={() => this.props.deleteCompany(index)}
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
