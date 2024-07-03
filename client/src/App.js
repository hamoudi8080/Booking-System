import { Route, Routes } from 'react-router-dom'; // Import Routes
import './App.css';
import IndexPage from './pages/IndexPage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000'; // Set the base URL for the axios instance


function App() {
  return (
    <Routes> {/* Use Routes to wrap Route components */}
      {/* The idea behind an index route is to render a specific component when the root path (base URL) of your application is accessed.  */}
      <Route path="/" element={<Layout />} >
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

    </Routes>
  );
}

export default App;