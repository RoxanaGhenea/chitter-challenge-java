import React from 'react';
import "../ComponentsCss/Sidebar.css";
import { FaTwitter } from "react-icons/fa";
import SidebarOptions from './SidebarOptions';
import { AiFillHome } from "react-icons/ai";
import { GiLetterBomb } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdTravelExplore } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";

const Sidebar = () => {
  return (
    <>
      <div className="section-separator">
        <div className="sidebar">
          <FaTwitter className='peep-styling fs-1 mb-5' />
          <SidebarOptions active Icon={AiFillHome} text="Home" />
          <SidebarOptions Icon={GiLetterBomb} text="Messages" />
          <SidebarOptions Icon={IoIosNotificationsOutline} text="Notifications" />
          <SidebarOptions Icon={MdTravelExplore} text="Explore" />
          <SidebarOptions Icon={FiMoreHorizontal} text="More" />
          <button className="button-styling" type="button">Peep</button>
        </div>
      </div> 
    </>
  )
}

export default Sidebar