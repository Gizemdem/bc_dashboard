import "./home.scss";
import Sidebar  from "../../components/sidebar/Sidebar" ;
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import ViewerContainer from "../../components/viewerContainer/ViewerContainer";
import CommitContainer from "../../components/commitContainer/CommitContainer"
import Table from "../../components/table/Table";   

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
                <div className="commit-viewer-containers">
                    <ViewerContainer />
                    <CommitContainer  />
                </div>
                <div className="listContainer">
                    <div className="listTitle"> Project Collaboration</div>      
                    <Table />
                </div>               
            </div>          
        </div>
    )
}

export default Home