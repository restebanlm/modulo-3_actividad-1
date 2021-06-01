import React from "react";
import { Switch, Route } from "react-router-dom";

import { NavBar } from "./views/NavBar";
import { JobsView } from "./views/JobsView";
import { CountriesView } from "./views/CountriesView";
import { CitiesView } from "./views/CitiesView";
import { CompaniesView } from "./views/CompaniesView";
import { NotFoundView } from "./views/NotFoundView";

const App = () => (
  <div className="App">
    <NavBar />
    <Switch>
      <Route path="/" exact component={JobsView} />
      <Route path="/countries" exact component={CountriesView} />
      <Route path="/cities" exact component={CitiesView} />
      <Route path="/companies" exact component={CompaniesView} />
      <Route component={NotFoundView} />
    </Switch>
  </div>
);

export default App;
