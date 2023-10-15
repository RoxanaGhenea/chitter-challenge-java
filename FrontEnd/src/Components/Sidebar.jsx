import React from 'react';
import "../ComponentsCss/Sidebar.css";
import { FaTwitter } from "react-icons/fa";
import SidebarOptions from './SidebarOptions';
import { AiFillHome } from "react-icons/ai";
import { GiLetterBomb } from "react-icons/gi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdTravelExplore } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import SignUpInPage from './SignUpInPage';

const Sidebar = () => {
  return (
    <div className="col-3">
      <div className="d-flex flex-column padding-sidebar">
        <div className="elements-gap">
          <FaTwitter className='peep-logo fs-1 mb-5' />
          <SidebarOptions active Icon={AiFillHome} text="Home" />
          <SidebarOptions Icon={GiLetterBomb} text="Messages" />
          <SidebarOptions Icon={IoIosNotificationsOutline} text="Notifications" />
          <SidebarOptions Icon={MdTravelExplore} text="Explore" />
          <SidebarOptions Icon={FiMoreHorizontal} text="More" />
        </div>
        <div><SignUpInPage /></div>
      </div>
    </div>
  )
}

export default Sidebar;