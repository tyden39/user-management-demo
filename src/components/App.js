import { Route, Routes } from 'react-router-dom';
import AddUser from './AddUser';
import './App.css';
import Home from './Home';
import ModifyUser from './ModifyUser';

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
