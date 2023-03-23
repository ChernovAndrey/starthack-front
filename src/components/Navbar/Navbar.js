import React from 'react';
import PropTypes from 'prop-types';
import NavbarListItem from '../NavbarListItem/NavbarListItem';
import "./Navbar.css"

const Navbar = () => (
   <div className="navbar">
      <div className="navbar-content">
         <NavbarListItem/>
      </div>
   </div>
);

Navbar.propTypes = {};

Navbar.defaultProps = {};

export default Navbar;
