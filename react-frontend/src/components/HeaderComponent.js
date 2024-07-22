import React, { Component } from "react";
import CreateOrUpdateEmployeeComponent from "./CreateOrUpdateEmployeeComponent";

class HeaderComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div>
              <a href="https://javaguides.net" className="navbar-brand">
                Employee Management App
              </a>
            </div>
          </nav>
          <br></br>
        </header>
      </div>
    );
  }
}

export default HeaderComponent;
