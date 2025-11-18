import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
  <header className="navbar">
    <div className="brand"><Link to="/" style={{ textDecoration: "none", color: "inherit" }}>UserManager</Link></div>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/users/new" style={{ marginLeft: 12 }}>+ New User</Link>
    </nav>
  </header>
);

export default Navbar;
