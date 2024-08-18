import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './components/login';
import Register from './components/register';
import { useEffect, useState } from 'react';
import { auth } from './components/firebase';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  });

  return (
    <div>
      <div className='bg-slate-900'>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={user ? <Navigate to='/home' /> : <Login />} />
        <Route path='/login' element={!user ? <Login /> : <Navigate to='/home' />} />
        <Route path='/register' element={!user ? <Register /> : <Navigate to='/home' />} />
        <Route path='/home' element={<ProtectedRoute element={<Home />} user={user} />} />
        <Route path='/cart' element={<ProtectedRoute element={<Cart />} user={user} />} />
      </Routes>
    </div>
  );
};

export default App;

