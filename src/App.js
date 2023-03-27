
import './App.css';
import "./style.css"
import Login from './pages/Login';
//import  Register  from "./pages/Register.jsx"
import { BrowserRouter , Routes, Route} from "react-router-dom"
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
