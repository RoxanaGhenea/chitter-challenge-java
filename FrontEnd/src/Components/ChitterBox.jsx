import React from 'react';
import "../ComponentsCss/ChitterBox.css";

const ChitterBox = () => {
  return (
    <>
        <div className="chitter-box">
          <form>
            <div className="chitter-box-input">
              <img className="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStt8Ue2ZBqbY1HGhCxwV_G6bh5-E3-ggkXAQ&usqp=CAU" alt="Your Image"/>
              <input placeholder="Your peep to the peeps.."/>
            </div>
            <input className="peep-image-share" placeholder='Optional: Post image URL' type="text" />
            <button className="feed-peep-button" type="button">Peep</button>
          </form>
        </div>
    </>
  )
}

export default ChitterBox;