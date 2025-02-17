// src/index.tsx
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './style/global';
import styled from 'styled-components';
import WelcomePage from './pages/WelcomePage';
import MainPage from './pages/MainPage';
import ResultsPage from './pages/ResultsPage';
import MatrixPage from './pages/MatrixPage';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

function AppRoot() {
  const [vitalSigns, setVitalSigns] = useState<object>({});

  const setVitalSignsHandler = (newVitalSigns: object) => {
    //console.log('newVitalSigns', newVitalSigns);
    setVitalSigns(newVitalSigns);
  };

  return (
    <React.StrictMode>
      <Wrapper>
        <GlobalStyle />
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route
              path="/main"
              element={<MainPage setVitalSigns={setVitalSignsHandler} />}
            />
            <Route
              path="/matrix"
              element={<MatrixPage vitalSigns={vitalSigns} />}
            />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </Router>
      </Wrapper>
    </React.StrictMode>
  );
}

// Create the root
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(<AppRoot />);
