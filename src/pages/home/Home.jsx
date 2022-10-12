import "./home.scss";
import Sidebar  from "../../components/sidebar/Sidebar" ;
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Container from "../../components/container/Container"   

const Home = () => {
    return (
        <div className="home"> 
            <Sidebar/>
            <div className="homeContainer"> 
                <Navbar/>
                <div className="widgets">
                    <Widget/>
                    <Widget/>
                    <Widget/>
                    <Widget/>
                </div>
                <div className="containers">
                    <Container/>
                    <Container/>
                </div>
            </div>          
        </div>
    )
}

export default Home