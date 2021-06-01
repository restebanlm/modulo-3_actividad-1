import React from "react";

import { Job } from "../components/Job";

export class JobsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  // Función estandar de react (ciclo de vida) para cargar el objeto jobs con los datos almacenados en LocalStorage.
  componentDidMount() {
    let prevJobs = localStorage.getItem("jobs");
    if (prevJobs != null) {
      this.setState({
        jobs: JSON.parse(prevJobs),
      });
    }
  }

  // Función para guardar los datos de un job en el objeto jobs.
  addJob = (job) => {
    this.setState({
      jobs: [...this.state.jobs, job],
    });
  };

  //Función para eliminar un objeto de jobs.
  deleteJob = (indexJob) => {
    const filteredJobs = this.state.jobs.filter(
      (_, index) => index !== indexJob
    );
    this.setState({
      jobs: filteredJobs,
    });
  };

  // Función para guardar en el LocalStorage.
  saveData = () => {
    window.localStorage.setItem("jobs", JSON.stringify(this.state.jobs));
  };

  // Función estandar de React (Ciclo de vida) en cada actualización ejecuto otra función.
  componentDidUpdate() {
    this.saveData();
  }

  render() {
    return (
      <Job
        jobs={this.state.jobs}
        addJob={this.addJob}
        deleteJob={this.deleteJob}
      />
    );
  }
}
