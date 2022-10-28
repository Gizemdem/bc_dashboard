import "./navbar.scss";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const Navbar = () =>{
    return(
        <div className="navbar"> 
            <div className="wrapper">
                {/* searchbar */}
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchRoundedIcon/>
                </div>
                {/* items */}
                <div className="items">
                    <div className="item">
                        <LanguageOutlinedIcon className="icon"/>
                        English
                    </div>
                    <div className="item">
                        <NotificationsActiveOutlinedIcon className="icon"/>
                        {/* add notification counter */}
                        <div className="counter">1</div>
                    </div>
                    <div className="item">
                        <SettingsOutlinedIcon className="icon"/>                        
                    </div>
                    {/* add image */}
                    <div className="item">
                        <img
                            src="https://oxygenna.com/wp-content/uploads/2014/08/avatar3.jpg"
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
                
            </div>        
        </div>
    );
};



export default Navbar