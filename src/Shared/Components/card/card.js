import React from 'react'
import { Card } from 'react-bootstrap';
import "./card.css"

const Cards = ({ text, title, img }) => {

  return (
    <div className='divCards'>
      <Card style={{ width: '18rem', height: '7rem' }} className="shadow-sm p-3 mb-5 bg-white rounded">
        <Card.Body>
          <div className='fleexuucard'>
          <div className='cardimg'>
          <Card.Img variant="to" src={img} />
          </div>
          <div className='textcard'>
          <Card.Title className="cTitle">{title}</Card.Title>
          <Card.Text className='pText'>
            {text}
          </Card.Text>
          </div>
          </div>
        </Card.Body>
      </Card>
    
    </div>
  )
}

export default Cards;