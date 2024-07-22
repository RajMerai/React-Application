import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import withRouter from "./withRouter";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //step:- 2
      id: this.props.router.params.id || null,
      firstName: "",
      lastName: "",
      emailId: "",
      error: null, // State to hold error message
    };

    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id == -1) {
      return;
    } else {
      EmployeeService.getEmployeeById(this.state.id).then((res) => {
        let employee = res.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
        });
      });
    }
  }

  async saveOrUpdateEmployee(e) {
    e.preventDefault();
    const { firstName, lastName, emailId, id } = this.state;
    const newEmployee = { firstName, lastName, emailId };

    try {
      let response;

      // step 5

      if (id === "_add") {
        response = await EmployeeService.createEmployee(newEmployee);
        console.log("Employee created:", response.data);
      } else {
        response = await EmployeeService.updateEmployee(id, newEmployee);
        console.log("Employee updated:", response.data);
      }

      // Redirect to the employees list page after successful creation or update
      this.props.router.navigate("/employees");
    } catch (error) {
      console.error("Error saving employee:", error);
      this.setState({
        error: error.message || "An error occurred while saving the employee.",
      });
    }
  }

  changeFirstNameHandler(event) {
    this.setState({ firstName: event.target.value });
  }

  changeLastNameHandler(event) {
    this.setState({ lastName: event.target.value });
  }

  changeEmailHandler(event) {
    this.setState({ emailId: event.target.value });
  }

  cancel() {
    this.props.router.navigate("/employees");
  }

  render() {
    const { firstName, lastName, emailId, error } = this.state;

    return (
      <div>
        <div className="container">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">Add Employee</h3>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={this.changeFirstNameHandler}
                  />
                </div>
                <br />

                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={this.changeLastNameHandler}
                  />
                </div>
                <br />

                <div className="form-group">
                  <label> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={emailId}
                    onChange={this.changeEmailHandler}
                  />
                </div>
                <br />

                <button className="btn btn-success" onClick={this.saveEmployee}>
                  Save
                </button>

                <button
                  className="btn btn-danger"
                  onClick={this.cancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateEmployeeComponent);
