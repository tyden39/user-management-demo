import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './users';
import AddUser from './users/AddUser';
import ModifyUser from './users/ModifyUser';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="add" element={<AddUser />} />
      <Route path="modify/:username" element={<ModifyUser />} />
    </Routes>
  );
}

export default App;
