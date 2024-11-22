import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Adventure from './pages/Adventure';
import Status from './pages/Status';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </Router>
  );
}

export default App;
