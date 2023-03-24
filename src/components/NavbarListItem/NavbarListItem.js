import React from 'react';
import './NavbarListItem.css'
import { Component } from 'react';

class NavbarListItem extends Component {
   constructor(props) {
     super(props);
     console.log('NavbarListItem constructor');
   }

   onClick() {
      console.log('list item clicked');
      this.props.onSelection(this.props.data.id);
   }

   isActive() {
      return this.props.selectedNavbarListItemId === this.props.data.id;
    }

   render() {
      return (
         <li className={`navbar-list-item ${
            this.isActive() ? 'active' : 'inactive'
          }`}
          onClick={this.onClick.bind(this)}
          >
            <span className="navbar-list-item-name">{this.props.data}</span>
         </li>
      )
   }
}

// const NavbarListItem = () => (
//    <li className="navbar-list-item">
//       <span className="navbar-list-item-name">1</span>
//    </li>
// );

// NavbarListItem.propTypes = {};

// NavbarListItem.defaultProps = {};

export default NavbarListItem;
