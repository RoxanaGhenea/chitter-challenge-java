import React from 'react';
import "../ComponentsCss/Feed.css";
import ChitterBox from './ChitterBox';
import Peep from "./Peep.jsx";

const Feed = () => {
  return (
    <div className="col-9" > 
      <div className="feed-positioning">
        <div className="feed">
        </div>
        <ChitterBox />
        <Peep />
        {/* <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep /> */}
      </div>
    </div>
  )
}

export default Feed;