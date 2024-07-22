import React from 'react';
import { Container } from 'reactstrap';
import '../style/AboutUs.css';

const AboutUs = () => {
  return (
     <div className="jumbotron text-center" style={{ backgroundColor: '#B4E380', padding: '50px 20px' }}>
      <h1 style={{ color: '#333', fontSize: '3rem' }}>About Us</h1>
      <p style={{ color: '#333', fontSize: '1.5rem' }}>Welcome to MyRecipes, your go-to place for discovering and sharing delicious recipes! Our platform is designed to help food enthusiasts and home cooks find and share recipes from around the world. Whether you're looking for quick weeknight dinners, indulgent desserts, or healthy meal ideas, we have something for everyone.</p>
      <p style={{ color: '#333', fontSize: '1.5rem' }}>Our mission is to make cooking easier and more enjoyable for everyone. We believe that cooking should be a fun and creative experience, not a stressful one. That's why we've created a user-friendly platform where you can easily browse, save, and share recipes with your friends and family.</p>
      <Container>
      <p style={{ color: '#333', fontSize: '1.5rem' }}>Thank you for visiting MyRecipes. We hope you find inspiration and joy in every recipe you try!</p>
      </Container>
    </div>
  );
};

export default AboutUs;
