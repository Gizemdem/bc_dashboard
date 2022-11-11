import "./sidebar.scss";
import ConnectWallet from "./Wallet";
//import icons
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';

import CropIcon from '@mui/icons-material/Crop';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined';
import ViewKanbanOutlinedIcon from '@mui/icons-material/ViewKanbanOutlined';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';


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
                        <li>
                            <FolderOpenIcon onClick={props.openDoc} className="icon" />
                            <span>Access</span>
                        </li>
                        <li>
                            <GroupsOutlinedIcon className="icon"/>
                            <span>Collaborators</span>
                        </li>
                    </Link>
                    {/* dashboard */}
                    <Link to ="/dashboard" style= {{textDecoration:"none"}}>
                        <p className="title">DASHBOARD</p>                    
                        <li>
                            <PageviewOutlinedIcon className="icon"/>
                            <span>Model Viewer</span>
                        </li>
                        <li>
                            <CropIcon className="icon"/>
                            <span>Clipping Plane</span>
                        </li>
                        <li>
                            <TableChartOutlinedIcon className="icon"/>
                            <span>Element Database</span>
                        </li>
                        <li>
                            <ViewInArOutlinedIcon className="icon"/>
                            <span>AR Control</span>
                        </li>
                        <li>
                            <ViewKanbanOutlinedIcon className="icon"/>
                            <span>Issue Kanban</span>
                        </li>
                    </Link>

                    <Link to="/account" style={{textDecoration:"none"}}>
                        <p className="title">ACCOUNTING</p>
                        <li>                        
                            <AccountBalanceWalletOutlinedIcon onClick={ConnectWallet} className="icon" />
                            <span>Payment</span>
                        </li>
                        <li>                        
                            <ReceiptLongOutlinedIcon onClick={ConnectWallet} className="icon" />
                            <span>Transaction History</span>
                        </li>
                    </Link>
                    
                    <p className="title">USER</p>
                    <li>
                        <PersonOutlineOutlinedIcon className="icon"/>
                        <span>Profile</span>
                    </li>
                    <Link to="/welcome" style={{textDecoration:"none"}}>
                        <li>
                            <LogoutOutlinedIcon className="icon"/>
                            <span>Logout</span>
                        </li>
                    </Link>
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