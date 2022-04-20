import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import './App.css';
import AddUser from './AddUser'
import ModifyUser from './ModifyUser';
import userEvent from '@testing-library/user-event';

function App() {

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="add" element={<AddUser />} />
        <Route path="modify" element={<ModifyUser />} />
    </Routes>
  );
}

export default App;
