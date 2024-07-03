import { Route, Routes } from 'react-router-dom'; // Import Routes
import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Routes> {/* Use Routes to wrap Route components */}
    {/* The idea behind an index route is to render a specific component when the root path (base URL) of your application is accessed.  */}
      <Route index element={<IndexPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;