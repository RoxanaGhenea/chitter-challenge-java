import React from 'react';
import "../ComponentsCss/SidebarOptions.css";

function SidebarOptions({text, Icon}) {
  return (
    <>
    <div className="sidebar-option">
        <Icon className="fs-3 mb-5 me-1"/> 
        <h5 className='mb-5'>{text}</h5>
    </div>

    </>
  )
}

export default SidebarOptions;