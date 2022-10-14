import "./login.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Container from "../../components/container/Container"
import LoadLocalIFC from "../../components/loadLocalIFC/loadLocalIFC"

const Login = () => {
    return (
        <div className="login"> 
            <Sidebar/>
            <div className="homeContainer"> 
                <Navbar/>
                <div component>
                    <LoadLocalIFC/>
                </div>
            </div>          
        </div>
    )
}

export default Login