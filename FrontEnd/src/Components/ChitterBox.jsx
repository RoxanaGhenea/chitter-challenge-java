import React from 'react';
import "../ComponentsCss/ChitterBox.css";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineCompass } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";

const ChitterBox = () => {
  return (
    <>
      <div className="chitter-box">
        <div className="d-flex align-items-center border-bottom">
          <div className="d-flex flex-column align-items-center me-5">
            <img className="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStt8Ue2ZBqbY1HGhCxwV_G6bh5-E3-ggkXAQ&usqp=CAU" alt="Your Image" />
            <h3>Your Name</h3>
            <div className='fs-1 icon-styling mb-2'>
              <RxAvatar className='me-3' />
              <AiOutlineCompass className='me-3' />
              <TfiWrite />
            </div>
          </div>
          <form>
            <div className="chitter-box-input">
              <textarea className="peep-textbox" placeholder="Your peep to the peeps.." />
            </div>
            <input className="peep-image-share mb-3" placeholder='Optional: Post image URL' type="text" />
            <button className="custom-button-peep" type="button">Peep</button>
          </form>
        </div>
        <div className="mt-2">
            <h2>Latest Peeps ...</h2>
        </div>
      </div>
    </>
  )
}

export default ChitterBox;