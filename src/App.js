import Home from "./pages/home/Home";
import Check from "./pages/check/Check";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Welcome from "./pages/welcome/Welcome";
import Payment from "./pages/payment/Payment";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
    
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" >
                  <Route index element = {<Home/>}/>
                  <Route path="check" element = {<Check/>}/>
                  <Route path="welcome" element = {<Welcome/>}/>
                  <Route path="register" element = {<Register/>}/>
                  <Route path="login" element = {<Login/>}/>
                  <Route path="payment" element= {<Payment/>}/>
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
