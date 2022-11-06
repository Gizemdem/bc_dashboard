import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Welcome from "./pages/welcome/Welcome";
import Account from "./pages/account/Account";
import Projects from "./pages/projects/Projects";
import { HashRouter, Route, Routes } from "react-router-dom";


function App() {
    
  return (
    <div className="App">
        <HashRouter>
          <Routes>
              <Route path="/" >
                  <Route index element = {<Home/>}/>
              </Route>
              <Route path="/projects" element={<Projects/>}/>
              <Route path="/dashboard" element = {<Dashboard/>}/>
              <Route path="/welcome" element = {<Welcome/>}/>
              <Route path="/register" element = {<Register/>}/>
              <Route path="/login" element = {<Login/>}/>
              <Route path="/account" element= {<Account/>}/>
          </Routes>
        </HashRouter>
    </div>
  );
}

export default App;
