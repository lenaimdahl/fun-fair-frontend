import {useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {GlobalContext} from '../context/global.context';

const Protected = ({children}) => {
  const context = useContext(GlobalContext);
  const isLoggedIn = !!context.isLoggedIn;
  return isLoggedIn ? children : <Navigate replace to="/login" />;
};

export default Protected;