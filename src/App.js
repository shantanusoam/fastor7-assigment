import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllRoutes from './pages/AllRoutes';
function App() {
  return (
    <div className="App">
      <AllRoutes />
      <ToastContainer style={{ width: '90%', left: 'auto', top: '0.5rem' }} />
    </div>
  );
}

export default App;
