import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import MainList from './list';

// NavBar Component
function NavBar() {
  const location = useLocation();  // To get the current path and highlight the active route

  return (
    <nav className="font-[#1B1B1B] text-3xl py-4 ">
      <div className="container mx-auto flex justify-center items-center">
        <div className="flex space-x-8">
          <Link 
            to="/" 
            className={`inline-flex items-center justify-center px-6 py-2  rounded-lg font-semibold transition-colors duration-200 
                ${location.pathname === '/' ? 'bg-[#318CE7] text-[#FFFFFF]' : 'bg-[#F5F5F5]'}`}
          >
            Reading List
          </Link>
          <Link 
            to="/top" 
            className={`inline-flex items-center justify-center px-6 py-2  rounded-lg font-semibold transition-colors duration-200 
                ${location.pathname === '/top' ? 'bg-[#318CE7] text-[#FFFFFF]' : 'bg-[#F5F5F5]'}`}
          >
            Last Month's Top
          </Link>
          <Link 
            to="/history" 
            className={`inline-flex items-center justify-center px-6 py-2  rounded-lg font-semibold transition-colors duration-200 
                ${location.pathname === '/history' ? 'bg-[#318CE7] text-[#FFFFFF]' : 'bg-[#F5F5F5]'}`}
          >
            Reading List History
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      {/* NavBar */}
      <NavBar />
      
      {/* Define the routes */}
      <Routes>
        <Route path="/" element={<MainList />} />
        <Route path="/top" element={<div className="text-center py-10 text-6xl">Last Month's Top <br/> <h1> NO DATA YET! COME BACK NEXT MONTH!</h1></div>} />
        <Route path="/history" element={<div className="text-center py-10 text-6xl">Reading List History <br/> <h1> NO DATA YET! COME BACK NEXT MONTH!</h1></div>} />
      </Routes>
    </Router>
  );
}

export default App;
