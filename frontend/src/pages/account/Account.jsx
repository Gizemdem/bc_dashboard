
import React from "react"
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./account.scss"

const Account = ()=>{;

    return(
        <div className="accounting">
            <Sidebar/>
            <div className="homeContainer">
                <Navbar />
                <div className="transactionContainer">
                    <p>SENT TRANSACTIONS</p>
                    <form className="form">
                        <input 
                            type="text"
                            placeholder="GBT Amount"
                            className="formInputAmount"
                            width="300px"
                        />
                        <input 
                            type="text"
                            placeholder="Account Address"
                            className="formInputAccount"
                            width="600px"
                        />
                        <button className="formButton">Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Account;