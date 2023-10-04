import { FC } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';

export const AppRouter:FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Navigate to="/boards" /> }/>
        <Route path='/boards' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
