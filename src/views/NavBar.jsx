import React from "react";

import { Links } from "../components/Links";

export const NavBar = () => (
  <nav className="navbar">
    <Links clase="-importante" nombre="JOBS" ruta="/" />
    <Links clase="" nombre="Countries" ruta="/Countries" />
    <Links clase="" nombre="Cities" ruta="/Cities" />
    <Links clase="" nombre="Companies" ruta="/Companies" />
  </nav>
);
