import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Admin from "../Components/Admin/Admin";

function AdminPage(){
    return (<div>
        <Navbar tab="admin"/>
        <Admin />
    </div>)
}

export default AdminPage;