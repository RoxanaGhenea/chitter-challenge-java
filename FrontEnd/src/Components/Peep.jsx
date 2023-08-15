import React from 'react';

const Peep = ({displayName, username, text, image, avatar}) => {
  return (
      <>
          <div className="peep">
              <div className='peep-body'>
                  <div className='d-flex peep-header'>
                      <div className='peep-avatar me-2'>
                          <img className="avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStt8Ue2ZBqbY1HGhCxwV_G6bh5-E3-ggkXAQ&usqp=CAU" alt="Your Image" />
                      </div>
                      <div className='header-text'>
                          <h3>Header text</h3>
                      </div>
                  </div>
                  <div className='header-description'>
                        <p>Chitter in progress!</p>
                  </div>
                  <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExamQ3YnhpbmpmZm54cG5hM3ZrY2x2bTl6cGZldWNxb3M3MXAyemt2bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cjnErkOZtvq5sHTM7c/200.gif" alt="Your image" />
              </div>
          </div>
      </>
  )
}

export default Peep