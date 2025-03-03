import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import PhoneNumberPage from './PhoneNumberPage';
    import PinPage from './PinPage';

    function App() {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<PhoneNumberPage />} />
            <Route path="/pin" element={<PinPage />} />
          </Routes>
        </Router>
      );
    }

    export default App;
