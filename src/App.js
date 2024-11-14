import Pay from './pages/Pay';
import styled from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PayProcessing from './pages/PayProcessing';
import PayCompleted from './pages/PayCompleted';

function App() {
  return (
    <MainLayout>
      <Router>
        <Routes>
          <Route path="/" element={<Pay />} />
          <Route path="/pay-processing" element={<PayProcessing />} />
          <Route path="/pay-completed" element={<PayCompleted />} />
        </Routes>
      </Router>
    </MainLayout>

  );
}

export default App;

const MainLayout = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
  height: 100vh;

  @media (min-width: 768px) {
    background-color: black;
  }

  & > div {
    width: 100%;
    max-width: 500px;
    background-color: white;
  }
`;
