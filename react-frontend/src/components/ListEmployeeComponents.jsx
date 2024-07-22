import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

const ListEmployeeComponents = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    EmployeeService.getEmployees().then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const deleteEmployee = (employeeId) => {
    EmployeeService.deleteEmployee(employeeId)
      .then((res) => {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee.id !== employeeId)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the employee!", error);
      });
  };

  const viewEmployee = (id) => {
    navigate(`/view-employee/${id}`);
  };

  const addEmployee = () => {
    navigate("/add-employee/-1");
  };

  const editEmployee = (id) => {
    navigate(`/update-employee/${id}`);
  };

  return (
    <div>
      <h2 className="text-center">Employees List</h2>
      <div className="row">
        <button
          className="btn btn-primary"
          style={{ width: "150px" }}
          onClick={addEmployee}
        >
          Add Employee
        </button>
      </div>
      <br />
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Employee First Name</th>
              <th>Employee Last Name</th>
              <th>Employee Email Id</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.emailId}</td>
                <td>
                  <button
                    onClick={() => editEmployee(employee.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "12px" }}
                    onClick={() => deleteEmployee(employee.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "12px" }}
                    onClick={() => viewEmployee(employee.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br></br>
      </div>
    </div>
  );
};

export default ListEmployeeComponents;
