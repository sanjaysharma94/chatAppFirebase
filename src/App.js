
import './App.css';
import "./style.css"
import Login from './pages/Login';
import { BrowserRouter , Routes, Route} from "react-router-dom"
import Register from './pages/Register';
import { useSelector } from "react-redux"
import Dashboard from './pages/Dashboard';

function App() {

  const userToken = useSelector((store) => store.credential.user?.accessToken)

     console.log(userToken)
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        {userToken ?<Route path='/' element={<Dashboard/>}/>:null}
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
