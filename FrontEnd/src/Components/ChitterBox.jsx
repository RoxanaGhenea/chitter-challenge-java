import React, { useState} from 'react';
import "../ComponentsCss/ChitterBox.css";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineCompass } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";

const ChitterBox = () => {
const [peepContent, setPeepContent] = useState("");
const [imageURL, setImageURL] = useState("");
// const [avatar, setAvatar] = useState("");

const handleContentChange = (event) => {
  setPeepContent(event.target.value);
};

const handleImageURL = (event) => {
  setImageURL(event.target.value);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const userId = null;
    const avatarUrl = "";

    const response = await fetch("http://127.0.0.1:3000/peep/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userId,
        avatar: avatarUrl,
        content: peepContent,
        image: imageURL,
      }),
    });
    
    if (response.ok) {
      setPeepContent("");
      setImageURL("");
    }
  } catch (e) {
      console.error("Error adding peep", error);
  }
}

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
          <form onSubmit={handleSubmit}>
            <div className="chitter-box-input">
              <textarea className="peep-textbox" placeholder="Your peep to the peeps.." value={peepContent} onChange={handleContentChange} />
            </div>
            <input className="peep-image-share mb-3" placeholder='Optional: Post image URL' type="text" value={imageURL} onChange={handleImageURL} />
            <button className="custom-button-peep" type="submit">Peep</button>
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