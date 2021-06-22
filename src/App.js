import logo from "./logo.svg";
import "./App.css";
import EmployeeList from "./EmployeeList";
import EmployeeDetails from "./EmployeeDetails";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom"; //for routing between components

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Switch>
       <Route path="/" exact component={EmployeeList} />
       <Route path="/employeeDetails/:id" exact component={EmployeeDetails} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
