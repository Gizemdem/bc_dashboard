
import React, { useEffect } from "react"
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./account.scss"
import TotalCostFromContract from "./TotalCostFromContract";
import ElementTable from "../../components/elementTable/ElementTable";
import { useState } from "react";

const Account = ()=>{
    const [completedElements, setCompletedElements] = useState(null);
    useEffect(()=>{
        const doneElements=JSON.parse(localStorage.getItem("elements"));
        console.log(doneElements);
        setCompletedElements(doneElements);
    },[])

    return(
        <div className="accounting">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar />
                <div className="section1">
                    <div className="section1a">
                        <p >PROGRESS PAYMENT</p>
                        <label>Approve:</label>
                        <TotalCostFromContract className="table"/>
                        <label>Disapprove:</label>
                        <form className="form">
                            <input 
                                type="text"
                                placeholder="Write the disapprove reason"
                                className="formInputAccount"
                                width="600px"
                            />
                            <button className="formButton">Confirm</button>
                        </form>
                    </div>
                    <div className="section1b">
                        <p>this is for graph</p>
                    </div>
                </div>
                <div className="section2">
                    <p>ELEMENT LIST TABLE</p>
                    {completedElements? <ElementTable data={completedElements}/> : null}
                </div>
            </div>
        </div>
    )
}

export default Account;