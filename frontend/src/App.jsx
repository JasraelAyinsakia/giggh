import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Browse from './pages/Browse';
import PerformerProfile from './pages/PerformerProfile';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import Contact from './pages/Contact';
import PerformerDashboard from './pages/PerformerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/performer/:id" element={<PerformerProfile />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard/performer" element={<PerformerDashboard />} />
              <Route path="/dashboard/customer" element={<CustomerDashboard />} />
            </Routes>
          </main>
          <Footer />
      </div>
      </Router>
    </AppProvider>
  );
}

export default App;
