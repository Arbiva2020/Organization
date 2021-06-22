import React, { useState, useEffect } from "react";
import { Row, Card, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import employee from "./server/Models/employee";

//we render an object for each employee, one at a time from server
//useParams returns an object of key/value pairs of URL parameters.
function EmployeeDetails(props) {
  const [employees, setEmployees] = useState({});
  //const [manager, setManager] = useState({});
  const [managers, setManagers] = useState({});
  const { id } = useParams();

// const [employee, setEmployee] = useState({}); 
// const [manager, setmanager] = useState({});  
// const employeedb = axios.get(`http://localhost:3001/employees/${id}`)
// const managerdb = axios.get(`http://localhost:3001/managers/${id}`)
// useEffect(() => {
// Promise.all([employeedb, managerdb]).then(result =>{
//    setEmployee()
//      if(employee[0].data.length > 0){
//        setEmployee(employee[0].data)
//      }
//      else{
//        setEmployee(employee[1].data)
//      }
// })}, []);


  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/employees/${id}`
      );
      if(data.length > 0){
        setEmployees(data[0]);
      } else{
        data = await axios.get(
          `http://localhost:3001/managers/${id}`
        );
        setEmployees(data[0]);  
      }
    };
    getData();
    console.log(employees); 
    console.log(managers); 
  }, []);

  //from bootstrap, the Modal functions:
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //onChange - report text:
  const [text, setText] = useState("");
  

  class Report {
    constructor(text, date, sender, reciever) {
      (this.text = text),
        (this.date = new Date().toString()),
        (this.sender = sender),
        (this.reciever = reciever);
    }
  }

  class Task {
    constructor(text, date, dueDate, sender, reciever) {
      (this.text = text),
        (this.date = new Date().toString()),
        (this.dueDate = dueDate),
        (this.sender = sender),
        (this.reciever = reciever);
    }
  }

//we want to put a new report, according to its class:
//defining a new report:
  async function newReport() {
 const report = new Report(
      text,
      new Date().toString(),
      employees._id,
      employees.managerID
    );
    
    //if the employee is not a manager, reports update in "reports":
    if(employees.reports){
      employees.reports.push(report);
      let change = { _id: id, reports: [...employees.reports]}
       let send = await axios.put(`http://localhost:3001/employees/update/`,
      change);}

//if the employee is also a manager, reports update in "reportsSend":
        else if(employees.reportsSend){
        // let employeeMan = await axios.get(
        //   `http://localhost:3001/employees/${employees.managerID}`
        // )
        employees.reportsSend.push(report);
        let changeB = { _id: id, reportsSend: [...employees.reportsSend]}
      let sendB = await axios.put(`http://localhost:3001/managers/update/`,
      changeB);
     }
    //}

  //   if(employees.subordinates){
  //     let boss = await axios.get(
  //     `http://localhost:3001/managers/${employees.subordinates}`
  //   )
  //   setManager(boss[0])
  //   manager.reportsRecieved.push(report)
  //    let changeManager = {managerId: _id, reportsRecieved: [...manager.reportsRecieved]};
  //   manager.reportsRecieved.push(report);
  //  let sendC = await axios.put(`http://localhost:3001/managers/update/`, changeManager);
  // }
  }
//}
useEffect(() => {
  const getData = async() =>{
    const {data} = await axios.get("http://localhost:3001/managers");
    setManagers(data);
  } 
  getData();
}, [])
function ToListSubordinates(item){
return <tr>
  <td>{item.firstName} {item.lastName}</td>
  <td>{item.position}</td>
  <td><button style={{ backgroundColor: "#4a86e8" }}>Assign Task</button></td>
</tr>
}


  return (
    <div
      style={{
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: "2px",
        marginLeft: "50px",
        marginRight: "50px",
      }}
    >
      <div style={{ minHeight: "200px" }}>
        <img
          style={{
            float: "left",
            height: "250px",
            width: "200px",
            marginLeft: "20px",
            marginTop: "20px",
            marginBottom: "20px",
            marginRight: "100px",
          }}
          src={employees.image}
        />
        <p
          style={{
            textAlign: "left",
            marginLeft: "300px",
            marginBottom: "80px",
            borderBottom: "solid",
            width: "1000px",
            height: "100px",
            fontSize: "130%",
          }}
        >
          Name: {`${employees.firstName} ${employees.lastName}`}
          <br />
          <br />
          Position: {`${employees.position}`}
        </p>
        <p style={{ textAlign: "left", marginLeft: "100px", fontSize: "130%" }}>
          Manager:{" "}
          {`${employees.managerFirstName} ${employees.managerLastName}`}
          <span style={{ marginLeft: "200px" }}>
            <button onClick={handleShow} style={{ backgroundColor: "#4a86e8" }}>
              Report
            </button>
          </span>
        </p>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>New Task:</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            <Form.Control
              as="textarea"
              placeholder="Report text:"
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={newReport}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <h3 style={{ textAlign: "left", marginLeft: "50px", marginTop: "80px" }}>
        My Tasks:
      </h3>
      <div
        style={{
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: "2px",
          margin: "50px",
          minHeight: "200px",
        }}
      >

      </div>
      <h3 style={{ textAlign: "left", marginLeft: "50px" }}>
        My Subordinates:
      </h3>
      <div
        style={{
          borderStyle: "solid",
          borderColor: "black",
          borderWidth: "2px",
          margin: "50px",
          minHeight: "200px",
        }}
      >
{/* <table>{managers.map(ToListSubordinates)}</table> */}

      </div>
    </div>
  );
}

export default EmployeeDetails;
