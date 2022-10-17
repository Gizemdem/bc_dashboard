import Home from "./pages/home/Home";
import Test from "./pages/test/Test";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
              <Route path="/" >
                  <Route index element = {<Home/>}/>
                  <Route path="test" element = {<Test/>}/>
                  <Route path="users"> 
                    <Route index element = {<List/>}/>
                    <Route path=":userId" element = {<Single/>}/>
                    <Route path="new" element = {<New/>}/>
                  </Route>
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
