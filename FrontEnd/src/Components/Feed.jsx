// import React from 'react';
// import "../ComponentsCss/Feed.css";
// import ChitterBox from './ChitterBox';
// import Peep from "./Peep.jsx";

// const Feed = ({user, allUsers, allPeeps}) => {
//   const peepsInfo = React.useMemo(() => {
//     return allPeeps.map(peep => {
//       const content = peep.content;
//       const date = peep.date;
//       const peepUser = allUsers.find(currentUser => currentUser._id == peep.user);
//       if (peepUser == null) {
//         return null;
//       }
//       return {
//         content: content,
//         date: date,
//         peepImage: peepUser.avatar,
//         username: peepUser.username
//       };
//     })
//   }, [allUsers, allPeeps]);
//   return (
//     <div className="feed-positioning">
//       <div className="feed">
//       </div>
//       <ChitterBox user={user} />
//       {peepsInfo.filter(peepInfo => peepInfo != null).map((peepInfo, index) => <Peep username={peepInfo.username} date={peepInfo.date} content={peepInfo.content} peepImage={peepInfo.peepImage} key={index}></Peep>)}
//     </div>
//   )
// }

// export default Feed;

import React from 'react';
import "../ComponentsCss/Feed.css";
import ChitterBox from './ChitterBox';
import Peep from "./Peep.jsx";

const Feed = ({ user, allUsers, allPeeps }) => {
  const getUsernameFromUserId = (userId) => {
    const user = allUsers.find(user => user.id === userId);
    return user ? user.username : 'Unknown User'; // Return username or a default value if not found
  };

  const peepsWithUsername = React.useMemo(() => {
    return allPeeps.map(peep => {
      const content = peep.content;
      const date = peep.date;
      const username = getUsernameFromUserId(peep.user_id);
      const peepImage = ''; // Add logic to get peep image

      return {
        content: content,
        date: date,
        peepImage: peepImage,
        username: username
      };
    }).filter(peepInfo => peepInfo.username !== 'Unknown User');
  }, [allPeeps, allUsers]);

  return (
    <div className="feed-positioning">
      <div className="feed">
        {/* Your feed content goes here */}
      </div>
      <ChitterBox user={user} />
      {peepsWithUsername.map((peepInfo, index) => (
        <Peep
          username={peepInfo.username}
          date={peepInfo.date}
          content={peepInfo.content}
          peepImage={peepInfo.peepImage}
          key={index}
        />
      ))}
    </div>
  );
};

export default Feed;