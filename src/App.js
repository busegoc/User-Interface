import React from 'react';
import { Container } from 'react-bootstrap';
import UserList from './components/UserList';
import SingleUser from './components/SingleUser';
import UserForm from './components/UserForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <Container>
      <UserList />
      <SingleUser />
      <UserForm />
      <ToastContainer/>
    </Container>
  );
};

export default App;
