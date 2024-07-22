import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const CreateOrUpdateEmployeeComponent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id !== "_add" && id !== "-1") {
      EmployeeService.getEmployeeById(id)
        .then((res) => {
          const employee = res.data;
          setFirstName(employee.firstName);
          setLastName(employee.lastName);
          setEmailId(employee.emailId);
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
          setError("An error occurred while fetching employee data.");
        });
    }
  }, [id]);

  const saveOrUpdateEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = { firstName, lastName, emailId };

    try {
      if (id === "_add" || id === "-1") {
        await EmployeeService.createEmployee(newEmployee);
        console.log("Employee created");
      } else {
        await EmployeeService.updateEmployee(id, newEmployee);
        console.log("Employee updated");
      }
      navigate("/employees");
    } catch (error) {
      console.error("Error saving employee:", error);
      setError(error.message || "An error occurred while saving the employee.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <h3 className="text-center">
            {id === "_add" || id === "-1" ? "Add Employee" : "Update Employee"}
          </h3>
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
                  onChange={(e) => setFirstName(e.target.value)}
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
                  onChange={(e) => setLastName(e.target.value)}
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
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <br />
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Save
              </button>
              <button
                className="btn btn-danger"
                onClick={() => navigate("/employees")}
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
};

export default CreateOrUpdateEmployeeComponent;
