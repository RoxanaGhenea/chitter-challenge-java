import React from 'react';
import "../ComponentsCss/Feed.css";
import ChitterBox from './ChitterBox';
import Peep from "./Peep.jsx";

const Feed = () => {
  return (
    <> 
      <div className="section-separator">
        <div className="feed">
          <h2>Home</h2>
        </div>
        <ChitterBox />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
        <Peep />
      </div>
    </>
  )
}

export default Feed;