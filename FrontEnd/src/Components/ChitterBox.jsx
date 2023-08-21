import React, { useState} from 'react';
import "../ComponentsCss/ChitterBox.css";

const ChitterBox = ({user}) => {
  const [peepContent, setPeepContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  console.log(user);

  const isPostDisabled = React.useMemo(() => user == null, [user]);
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
      const response = await fetch("http://127.0.0.1:3000/peep/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user != null ? user._id : null,
          content: peepContent,
        }),
      });
      
      if (response.ok) {
        setPeepContent("");
        setImageURL("");
        window.confirm("Peep posted successfully.");
      } else {
        window.alert("Failed to post peep. Please try again.")
      }
    } catch (e) {
        console.error("Error adding peep", error);
    }
  }

  return (
    <>
      <div className="chitter-box">
        <div>
            <h4>Share something with your friends!</h4>
        </div>
        <form onSubmit={handleSubmit} className="chitter-box-input">
          <div className="chitter-box-input">
            <textarea className="peep-textbox" placeholder="Your peep to the peeps.." value={peepContent} onChange={handleContentChange} />
          </div>
          <div className='post-button-wrapper'>
            <button disabled={isPostDisabled} className="btn custom-button-peep post-button" type="submit">Post</button>
          </div>
        </form>
        <div className='catch-up-text'>
            <h4>Or catch up with their posts!</h4>
        </div>
      </div>
    </>
  )
}

export default ChitterBox;