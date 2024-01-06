import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import About from './components/About';
import AccountSettings from './components/AccountSettings';
import Contact from './components/Contact';
import ProposalClient from './components/ProposalClient';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/contact/:freelancerId" element={<Contact />} />
        <Route path="/proposal/:clientId" element={<ProposalClient />} />
        
      </Routes>
    </Router>
  );
}

export default App;