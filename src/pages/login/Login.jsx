import "./login.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Container from "../../components/viewerContainer/ViewerContainer"

const Login = () => {
    return (
        <div className="login"> 
            <Sidebar/>
            <div className="homeContainer"> 
                <Navbar/>
                {/* <div >
                    <Container/>
                </div> */}
            </div>          
        </div>
    )
}

export default Login