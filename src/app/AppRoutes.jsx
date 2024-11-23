import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Register from '../pages/Register/Register.jsx';
import VerifyE from '../pages/VerifyE/VerifyE.jsx';
import VerifyA from '../pages/VerifyA/VerifyA.jsx';
import Login from '../pages/Login/Login.jsx';
import CreateProfile from '../pages/CreateProfile/CreateProfile.jsx';



export default function AppRoutes() {
  return (
<Routes>
  <Route path='/register' element={<Register/>}/>
  <Route path='/verify-email' element={<VerifyE/>}/>
  <Route path='/verify-admin' element={<VerifyA/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/create-user' element={<CreateProfile/>}/>
</Routes>
  )
}
