
import './App.css';
import "./style.css"
import Login from './pages/Login';
import { BrowserRouter , Routes, Route} from "react-router-dom"
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';
import ProtectedRoute from './pages/Protected';

function App() {

  
  
  
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path="/" element={
        <ProtectedRoute>
        <Dashboard/>
        </ProtectedRoute>
     }/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
