// src/pages/WelcomePage.tsx
import React from 'react';
import { Button, Container, Hero, Header, Row, Col, Card } from 'nhsuk-react-components';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <>
  <Header>
    <Header.Container>
      <Header.Logo href="/" />
    </Header.Container>
  </Header>
        <Hero>
          <Hero.Heading>Welcome to the Vital Signs AI Demo</Hero.Heading>
          <Hero.Text>
            This is a mockup showing how an AI-driven camera app could measure your
            vital signs in real-time. Imagine how this could be used in the future
            for public health screenings, remote diagnostics, and more!
          </Hero.Text>
        </Hero>
        <Container>
  <Row>
    <Col width="full">
    <Card>
      <Card.Content>
          <Card.Heading>About This Demo</Card.Heading>
          <Card.Description>We are demonstrating how artificial intelligence might measure your
            heart rate and other vital signs through a standard camera. Please note,
            <strong> this is not a medical device</strong>, but rather a concept
            design showing future possibilities for healthcare.</Card.Description>
        </Card.Content>
      </Card>
        <Button as="a" href="/main">
          Start the Demo
        </Button>
    </Col>

 
  </Row>
</Container>



          
 
      
    </>
  );
};

export default WelcomePage;
