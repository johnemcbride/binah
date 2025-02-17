// src/pages/WelcomePage.tsx
import React from 'react';
import { Button, Container, Hero, Header } from 'nhsuk-react-components';
import { Link } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <Container>
      <Hero>
        <Hero.Heading>Welcome to the Vital Signs AI Demo</Hero.Heading>
        <Hero.Text>
          This is a mockup showing how an AI-driven camera app could measure your
          vital signs in real-time. Imagine how this could be used in the future
          for public health screenings, remote diagnostics, and more!
        </Hero.Text>
      </Hero>

      <Header>
        <h1>About This Demo</h1>
      </Header>
      <p>
        We are demonstrating how artificial intelligence might measure your
        heart rate and other vital signs through a standard camera. Please note,
        <strong> this is not a medical device</strong>, but rather a concept
        design showing future possibilities for healthcare.
      </p>

      <Button as="a" href="/main">
        Start the Demo
      </Button>
    </Container>
  );
};

export default WelcomePage;
