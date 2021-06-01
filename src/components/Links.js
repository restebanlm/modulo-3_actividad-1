import React from "react";
import { Link } from "react-router-dom";

export const Links = ({ clase, ruta, nombre }) => (
  <Link className={"enlace" + clase} to={ruta}>
    {nombre}
  </Link>
);
