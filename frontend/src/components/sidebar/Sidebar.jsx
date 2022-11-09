import "./sidebar.scss";
import ConnectWallet from "./Wallet";
//import icons
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CropIcon from '@mui/icons-material/Crop';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


import {Link} from "react-router-dom";


const Sidebar = (props) =>{
    return(
        <div className="sidebar">
            <div className="top">
                <Link to="/" style= {{textDecoration:"none"}} className="logo">
                    <span > Goldbeck </span> 
                </Link>
            </div>
            <hr className="hr"/>
            <div className="center"> 
                <ul>
                    <Link to="/projects" style = {{textDecoration:"none"}}>
                        <p className="title">PROJECTS</p>
                    </Link>
                    <li>
                        <FolderOpenIcon onClick={props.openDoc} className="icon" />
                        <span>Access</span>
                    </li>
                    <li>
                        <GroupsOutlinedIcon className="icon"/>
                        <span>Collaborators</span>
                    </li>
                    <Link to ="/dashboard" style= {{textDecoration:"none"}}>
                        <p className="title">DASHBOARD</p>
                    </Link>
                    <li>
                        <PageviewOutlinedIcon className="icon"/>
                        <span>Model Viewer</span>
                    </li>
                    <li>
                        <CropIcon className="icon"/>
                        <span>Clipping Plane</span>
                    </li>
                    <li>
                        <DashboardOutlinedIcon className="icon"/>
                        <span>Element Database</span>
                    </li>
                    <Link to="/account" style={{textDecoration:"none"}}>
                    <p className="title">ACCOUNTING</p>
                    </Link>
                    <li>                        
                        <AccountBalanceWalletOutlinedIcon onClick={ConnectWallet} className="icon" />
                        <span>Payment</span>
                    </li>
                    <p className="title">USER</p>
                    <li>
                        <PersonOutlineOutlinedIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                    <li>
                        <LogoutOutlinedIcon className="icon"/>
                        <span>Logout</span>
                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOption"></div>
                <div className="colorOption"></div>
            </div>        
        </div>
    )
}

export default Sidebar