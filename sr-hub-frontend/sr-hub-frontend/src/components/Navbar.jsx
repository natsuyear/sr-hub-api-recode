import "./Navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>SR HUB</h1>
      <ul>
        <li><NavLink to="/vagas">Vagas</NavLink></li>
        <li><NavLink to="/cursos">Cursos</NavLink></li>
        <li><NavLink to="/candidaturas">Minhas candidaturas</NavLink></li>
        <li><NavLink to="/usuarios">Usuárias</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;