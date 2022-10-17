import "./test.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"

const Login = () => {
    return (
        <div className="test"> 
            <Sidebar />
            <div className="testContainer" > 
                <Navbar/>
                <div >
                    <p>test test</p>
                </div>
                {/* <div >
                    <Container/>
                </div> */}
            </div>          
        </div>
    )
}

export default Login