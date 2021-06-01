import React from "react";

import { checkString } from "../utils/stringUtils";

export class Job extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameJob: "",
      company: {
        companyName: "",
        city: {
          cityName: "",
          country: {
            countryName: "",
          },
        },
      },
      companies: [],
    };
  }

  // Función estandar de react (ciclo de vida) para cargar el objeto companies con los datos almacenados en LocalStorage.
  componentDidMount() {
    let prevCities = localStorage.getItem("companies");
    if (prevCities != null) {
      this.setState({
        companies: JSON.parse(prevCities),
      });
    }
  }

  // Función para enviar los datos del formulario al componente padre.
  submitForm = (e) => {
    e.preventDefault();

    const {
      nameJob,
      company: { nameCompany },
      company: {
        city: { nameCity },
      },
      company: {
        city: {
          country: { nameCountry },
        },
      },
    } = this.state;

    if (
      checkString(nameJob) &&
      checkString(nameCompany) &&
      checkString(nameCity) &&
      checkString(nameCountry)
    ) {
      const newJob = {
        nameJob: nameJob,
        company: this.state.company,
      };

      this.props.addJob(newJob);

      this.setState({
        nameJob: "",
        company: {
          nameCompany: "",
          city: {
            nameCity: "",
            country: {
              nameCountry: "",
            },
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
      company: JSON.parse(e.target.value),
    });
  };

  render() {
    return (
      <div className="contenedor-principal">
        <h1>BOLSA DE TRABAJOS</h1>
        <hr />
        <p>
          La vista "Jobs" permite dar de alta y eliminar un elemento relacionado
          a un puesto de trabajo.
        </p>

        <div className="contenedor-alta">
          <form onSubmit={(e) => this.submitForm(e)}>
            <h3>AGREGAR UN TRABAJO</h3>
            <input
              type="text"
              className="jobs-form-nombre"
              id="jobs-form-nombre-input"
              name="nameJob"
              placeholder="Ingresar nombre de la empresa..."
              onChange={(e) => this.handleInput(e)}
              value={this.state.nameJob}
            />

            <select
              className="jobs-form-select-company"
              id="jobs-form-companias-select"
              onChange={(e) => this.handleSelect(e)}
              value={JSON.stringify(this.state.company)}
            >
              <option value={JSON.stringify({})}>Seleccionar Empresa</option>
              {this.state.companies.map((company, index) => (
                <option key={index + 1} value={JSON.stringify(company)}>
                  {company.nameCompany} ({company.city.nameCity} -{" "}
                  {company.city.country.nameCountry})
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
          <h3>LISTADO DE TRABAJOS</h3>
          <table className="table-countries">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">PUESTO</th>
                <th scope="col">EMPRESA</th>
                <th scope="col">CIUDAD</th>
                <th scope="col">PAÍS</th>
                <th scope="col">ACCIÓN</th>
              </tr>
            </thead>
            <tbody>
              {this.props.jobs.map((job, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{job.nameJob}</td>
                  <td>{job.company.nameCompany}</td>
                  <td>{job.company.city.nameCity}</td>
                  <td>{job.company.city.country.nameCountry}</td>
                  <td>
                    <button
                      type="button"
                      className="Eliminar"
                      onClick={() => this.props.deleteJob(index)}
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
