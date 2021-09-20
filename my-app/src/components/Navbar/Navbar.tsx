import "./Navbar.scss";
import { NavLink } from "react-router-dom";

export const navbar = () => {
  return (
    <div className="navbar">
      <NavLink to="/tachicardia">
        {" "}
        <div className="nav-button">Tachyarrhythmia</div>
      </NavLink>
      <NavLink to="/bradicardia">
        {" "}
        <div className="nav-button">Bradyarrhythmia</div>
      </NavLink>
    </div>
  );
};

export default navbar;
