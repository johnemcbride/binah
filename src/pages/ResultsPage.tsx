// src/pages/ResultsPage.tsx
import React from 'react';
import { Container, Header } from 'nhsuk-react-components';

const ResultsPage = () => {
  // For a real app, you'd fetch results from context, props, or route state
  const heartRate = 72; // Example placeholder
  const respiratoryRate = 16;

  return (
    <Container>
      <Header>
        <h1>Your Results</h1>
      </Header>
      <p>
        <strong>Heart Rate:</strong> {heartRate} bpm
      </p>
      <p>
        <strong>Respiratory Rate:</strong> {respiratoryRate} breaths/min
      </p>
      <p>
        This data is provided by an AI mockup. It illustrates how an app like
        this might provide immediate health insights to both individuals and
        healthcare providers in the future.
      </p>
    </Container>
  );
};

export default ResultsPage;
