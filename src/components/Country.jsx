import React from "react";

import { checkString } from "../utils/stringUtils";

export class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameCountry: "",
    };
  }

  // Función para enviar los datos del formulario al componente padre.
  submitForm = (e) => {
    e.preventDefault();
    const { nameCountry } = this.state;

    if (checkString(nameCountry)) {
      const newCountry = {
        nameCountry: nameCountry,
      };

      this.props.addCountry(newCountry);

      this.setState({
        nameCountry: "",
      });
    } else {
      alert("Complete el campo vacío.");
    }
  };

  // Función para obtener datos del input.
  handleInput = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className="contenedor-principal">
        <h1>PAISES</h1>
        <hr />
        <p>
          La vista "Countries" permite dar de alta y eliminar un elemento
          relacionado a un país.
        </p>

        <div className="contenedor-alta">
          <form onSubmit={(e) => this.submitForm(e)}>
            <h3>AGREGAR UN PAÍS</h3>
            <input
              type="text"
              className="countries-form-nombre"
              id="countries-form-name-input"
              name="nameCountry"
              placeholder="Ingresar nombre del país..."
              onChange={(e) => this.handleInput(e)}
              value={this.state.nameCountry}
            />
            <br />
            <button type="submit" className="Agregar">
              AGREGAR
            </button>
          </form>
        </div>

        <div className="contenedor-listado">
          <h3>LISTADO DE PAISES</h3>
          <table className="table-countries">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">PAÍS</th>
                <th scope="col">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {this.props.countries.map((country, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">{country.nameCountry}</th>
                    <td>
                      <button
                        type="button"
                        className="Eliminar"
                        onClick={() => this.props.deleteCountry(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
