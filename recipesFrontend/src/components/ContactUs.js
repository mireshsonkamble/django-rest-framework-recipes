import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, FormText } from 'reactstrap';
import '../style/ContactUs.css'; // Ensure you create this CSS file if needed

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    alert('Message sent successfully!');
  };

  return (
    <Container className="contact-us-container">
      <Row>
        <Col md="8" className="offset-md-2">
          <h2 className="text-center">Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="message">Message</Label>
              <Input
                type="textarea"
                name="message"
                id="message"
                placeholder="Enter your message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary">Send</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactUs;
