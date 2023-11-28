import React from 'react';
import '../ComponentsCss/Peep.css';

const Peep = ({ content, peepImage, date, username }) => {
    const image = React.useMemo(() => {
        if (peepImage && peepImage.length > 0) {
            return peepImage;
        }
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStt8Ue2ZBqbY1HGhCxwV_G6bh5-E3-ggkXAQ&usqp=CAU";
    },[peepImage]);

    const dateString = React.useMemo(() => new Date(date).toDateString(), [date]);
    

    return (
        <>
            <div className="peep">
                <div className='peep-title'>
                    <div className='avatar-peep'>
                        <img className="avatar-peep" src={ image } alt="Your Image" />
                    </div>
                    <div>
                        <h5 className='username'>{ username }</h5>
                        <div className='d-flex'>
                            <div className='date-text'>{ dateString }</div>
                        </div>
                        
                    </div>
                </div>
                <div className='content-text'> { content } </div>
            </div>
        </>
    )
}

export default Peep;