import React, { useEffect, useState } from 'react';
import './homeCard.css';
import $ from 'jquery'
import { SRLWrapper } from 'simple-react-lightbox';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';



const App = ({image})=> {
	

	return (
 <Card className="image-card">
	<Card.Img src={image.url} alt="Card image" />
  <Card.ImgOverlay>
    <Card.Title></Card.Title>
  </Card.ImgOverlay>
     </Card>		
								
)
}



export default App;
