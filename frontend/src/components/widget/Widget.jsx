import "./widget.scss";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';

const Widget = ({type}) => {
    let data;

    switch (type) {
        case "active":
        data = {
            title: "Active",
            isMoney: false,
            link: "See details",
            KanbanID: "151120WA",
            Issue:"Type of walls do not match ",
            GlobalID: "0_hOL88mb9qRxG3TrLuNhs",
            Date:"27.02.20",
            img: process.env.PUBLIC_URL +"/issue_active.png",
            icon: (
            <NotificationsActiveOutlinedIcon
                className="icon"
                style={{
                color: "crimson",
                backgroundColor: "rgba(255, 0, 0, 0.2)",
                }}
            />
            ),
        };
        break;
        case "inprocess":
        data = {
            title: "In Process",
            isMoney: false,
            link: "See details",
            KanbanID: "171120WA",
            Issue:"Element types does not match with 3D model",
            GlobalID: "1_hOL88mb9qRxG3TrLuNhs",
            Date:"15.02.20",
            img: process.env.PUBLIC_URL +"/issue_inprocess.png",
            icon: (
            <DonutLargeOutlinedIcon
                className="icon"
                style={{
                backgroundColor: "rgba(218, 165, 32, 0.2)",
                color: "goldenrod",
                }}
            />
            ),
        };
        break;

        case "solved":
        data = {
            title: "Solved",
            isMoney: true,
            link: "See details",
            KanbanID: "251120WA",
            Issue:"Window Height correction to 130cm",
            GlobalID: "2_hOL88mb9qRxG3TrLugdfs",
            Date:"10.03.20",
            img: process.env.PUBLIC_URL +"/issue_solved.png",
            icon: (
            <CheckCircleOutlinedIcon
                className="icon"
                style={{
                backgroundColor: "rgba(131, 208, 142, 0.2)",
                color: "rgba(85, 202, 101, 1)",
                }}
            />
            ),
        };
        break;
        default:
        break;
    }
    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <img src={data.img} className="image"
                alt=""
                /> 
                <hr ></hr>
                <p className="text">Kanban ID: {data.KanbanID} <br></br>
                Issue: {data.Issue} <br></br>
                Global ID: {data.GlobalID} <br></br>
                Date: {data.Date}
                </p>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                {data.icon}
            </div>
        </div>
    )
}

export default Widget