import React, { useState, useEffect } from "react";
import { Row, Card, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import {Link} from 'react-router-dom'
import "./EmployeeList.css"

function EmployeeList(props) {
//we neen an array of all employees, that changes and getting data from server:
const [employees, setEmployees] = useState([]);
const [managers, setManagers] = useState([]);

useEffect(() => {
  const getData = async() =>{
    const {data} = await axios.get("http://localhost:3001/employees");
    setEmployees(data);
  } 
  getData();
}, [])

useEffect(() => {
  const getData = async() =>{
    const {data} = await axios.get("http://localhost:3001/managers");
    setManagers(data);
  } 
  getData();
}, [])

//listing employees in a table:
function ToList(item){
return <tr>
  <td>{item.firstName} {item.lastName}</td>
  <td>{item.position}</td>
  <td><Link to={`/employeeDetails/${item._id}`}><button style={{ backgroundColor: "#4a86e8" }}>View</button></Link></td>
</tr>
}

  return (
    <div>
      <div id="listDiv" style={{border:"solid", borderColor:"black", width:"600px"}}>
        <h2>Employee List:</h2>
        <table id="tableList" style={{textAlign:"left", marginLeft:"10px"}}>
          {employees.concat(managers).map(ToList)} 
        </table>
      </div>
    </div>
  );
}
export default EmployeeList;
