import React from 'react';
import "../ComponentsCss/SidebarOptions.css";

function SidebarOptions({text, Icon}) {
  return (
    <>
    <div className="sidebar-option">
        <Icon className="fs-3 mb-4 me-2"/> 
        <h5 className="mb-4 icon-text">{text}</h5>
    </div>

    </>
  )
}

export default SidebarOptions;