import React from 'react';
import { Carousel } from 'react-bootstrap';

const AdvertisementCarousel = () => {
  return (
    <div style={{ padding: '50px 0' }}>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Advertisement+1"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First Advertisement</h3>
            <p>Description for the first advertisement.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/800x400?text=Advertisement+2"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second Advertisement</h3>
            <p>Description for the second advertisement.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default AdvertisementCarousel;
