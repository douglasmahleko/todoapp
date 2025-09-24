import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/home.tsx';
// import Login from './components/login';
import Register from './components/register.tsx';
import { useContext } from 'react';
import { AuthContext } from './assets/authContext.tsx';
import Login from './components/login.tsx';

function App() {

  const { currentUser } = useContext(AuthContext)

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to='/login' />
    }
    return children
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={<ProtectedRoute>
              <Home />
          </ProtectedRoute>} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
