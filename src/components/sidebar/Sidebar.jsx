import "./sidebar.scss";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ConnectWallet from "./Wallet";
import { IconButton } from "@mui/material";



const Sidebar = (props) =>{
    return(
        <div className="sidebar">
            <div className="top">
                <span className="logo"> Goldbeck </span> 
            </div>
            <hr className="hr"/>
            <div className="center"> 
                <ul>
                    <p className="title">PROJECTS</p>
                    <li>
                        <FolderOpenIcon onClick={props.openDoc} className="icon" />
                        <span>Access</span>
                    </li>
                    <li>
                        <GroupsOutlinedIcon className="icon"/>
                        <span>Collaboration</span>
                    </li>
                    <p className="title">DASHBOARD</p>
                    <li>
                        <PageviewOutlinedIcon className="icon"/>
                        <span>Check</span>
                    </li>
                    <li>
                        <DashboardOutlinedIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>
                    <p className="title">CONFIRM</p>
                    <li>                        
                        <AccountBalanceWalletOutlinedIcon onClick={ConnectWallet} className="icon" />
                        <span>Wallet</span>
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