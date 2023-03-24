import React from 'react';
import NavbarListItem from '../NavbarListItem/NavbarListItem';
import "./Navbar.css"
import { Component } from 'react';

class Navbar extends Component {
   constructor(props) {
     super(props);
     console.log('Navbar constructor');
   }

   onNavbarListItemSelection(id) {
      this.props.onNavbarListItemSelection(id);
    }

   render() {
      return (
         <div className="navbar">
            <div className="navbar-content">
               <NavbarListItem 
                  data={1} 
                  selectedNavbarListItemId={this.props.selectedNavbarListItemId}
                  onSelection={this.onNavbarListItemSelection.bind(this)}
               />
               <NavbarListItem 
                  data={2} 
                  selectedNavbarListItemId={this.props.selectedNavbarListItemId}
                  onSelection={this.onNavbarListItemSelection.bind(this)}
               />
            </div>
         </div>
      )
   }
}

// const Navbar = () => (
//    <div className="navbar">
//       <div className="navbar-content">
//          <NavbarListItem data={1}/>
//          <NavbarListItem data={2}/>
//          <NavbarListItem data={3}/>
//       </div>
//    </div>
// );

// Navbar.propTypes = {};

// Navbar.defaultProps = {};

export default Navbar;
