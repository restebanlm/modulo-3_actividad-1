import React from "react";

import { Company } from "../components/Company";

export class CompaniesView extends React.Component {
  constructor() {
    super();
    this.state = {
      companies: [],
    };
  }

  // Función estandar de react (ciclo de vida) para cargar el objeto companies con los datos almacenados en LocalStorage.
  componentDidMount() {
    let prevCompanies = localStorage.getItem("companies");
    if (prevCompanies != null) {
      this.setState({
        companies: JSON.parse(prevCompanies),
      });
    }
  }

  // Función para guardar los datos en el objeto.
  addCompany = (company) => {
    this.setState({
      companies: [...this.state.companies, company],
    });
  };

  //Función para eliminar un objeto.
  deleteCompany = (indexCompany) => {
    const filteredCompanies = this.state.companies.filter(
      (_, index) => index !== indexCompany
    );
    this.setState({
      companies: filteredCompanies,
    });
  };

  // Función para guardar en el LocalStorage.
  saveData = () => {
    window.localStorage.setItem(
      "companies",
      JSON.stringify(this.state.companies)
    );
  };

  // Función estandar de React (Ciclo de vida) en cada actualización ejecuto otra función.
  componentDidUpdate() {
    this.saveData();
  }

  render() {
    return (
      <>
        <Company
          companies={this.state.companies}
          addCompany={this.addCompany}
          deleteCompany={this.deleteCompany}
        />
      </>
    );
  }
}
