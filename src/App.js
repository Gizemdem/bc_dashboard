import Home from "./pages/home/Home";
import Test from "./pages/test/Test";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Welcome from "./pages/welcome/Welcome";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" >
                  <Route index element = {<Home/>}/>
                  <Route path="test" element = {<Test/>}/>
                  <Route path="welcome" element = {<Welcome/>}/>
                  <Route path="register" element = {<Register/>}/>
                  <Route path="login" element = {<Login/>}/>
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
