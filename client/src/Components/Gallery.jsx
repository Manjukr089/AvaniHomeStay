import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import img1 from '../images/avani/IMG_3723.JPG'
import img2 from '../images/avani/IMG_3725.JPG'
import img3 from '../images/avani/IMG_3743.JPG'
import img4 from '../images/avani/IMG_3728.JPG'
import img5 from '../images/avani/IMG_3730.JPG'
import img6 from '../images/avani/IMG_3731.JPG'
import img7 from '../images/avani/IMG_3732.JPG'
import img8 from '../images/avani/IMG_3733.JPG'
import img9 from '../images/avani/IMG_3734.JPG'
import img10 from '../images/avani/IMG_3735.JPG'
import img11 from '../images/avani/IMG_3739.JPG'
import img12 from '../images/avani/IMG_3741.JPG'
import img13 from '../images/avani/IMG_3727.JPG'
import img14 from '../images/avani/IMG_9806.JPG'
import img15 from '../images/avani/0.jpg'
import img16 from '../images/avani/000.jpg'
import img17 from '../images/avani/01.jpg'
import img18 from '../images/avani/home.jpg'
const Gallery = () => {
  return (
    <Container>
      <Row>
        <Col lg={4} md={12} className='mb-2 mb-lg-0'>
          <img
            src={img1}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Boat on Calm Water'
          />

          <img
            src={img4}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Wintry Mountain Landscape'
          />
        </Col>

        <Col lg={4} className='mb-4 mb-lg-0'>
          <img
            src={img3}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Mountains in the Clouds'
          />

        </Col>

        <Col lg={4} className='mb-4 mb-lg-0'>
          <img
            src={img5}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Waves at Sea'
          />

          <img
            src={img6}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Yosemite National Park'
          />
        </Col>
        <Col lg={4} md={12} className='mb-2 mb-lg-0'>
          <img
            src={img12}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Boat on Calm Water'
          />

          <img
            src={img15}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Wintry Mountain Landscape'
          />
          <img
            src={img16}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Wintry Mountain Landscape'
          />
          <img
            src={img7}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Wintry Mountain Landscape'
          />
          <img
            src={img13}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Wintry Mountain Landscape'
          />
        </Col>

        <Col lg={4} className='mb-4 mb-lg-0'>
          <img
            src={img2}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Mountains in the Clouds'
          />

          <img
            src={img18}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Boat on Calm Water'
          />
          <img
            src={img17}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Boat on Calm Water'
          />
           <img
            src={img11}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Waves at Sea'
          />
        </Col>

        <Col lg={4} className='mb-4 mb-lg-0'>
          <img
            src={img10}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Waves at Sea'
          />
          <img
            src={img9}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Waves at Sea'
          />
         

          <img
            src={img14}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Yosemite National Park'
          />
          
          <img
            src={img8}
            className='w-100 shadow-1-strong rounded mb-4'
            alt='Yosemite National Park'
          />
        </Col>
       
      </Row>
    </Container>
  );
}

export default Gallery;
