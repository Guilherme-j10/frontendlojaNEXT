import React, { useEffect, useState, createContext } from 'react';
import api from '../service/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const log = (value) => console.log(value);
  const [ Update, setUpdate ] = useState(0);

  const [ loged, setLoged ] = useState(false);

  const checkLoged = async () => {
    try {
      const response = await api.get('validateUser', {
        headers: {
          token: localStorage.getItem('TokenHirokiToys')
        }
      });
      setLoged(response.data);
    } catch (error) {
      log(error);
    }
  }

  useEffect(() => {

    checkLoged();

    setTimeout(() => {
      setUpdate(Update + 1);
    }, 10000)
  }, [Update])

  return(
    <AuthContext.Provider value={[loged, setLoged]}>
      {children}
    </AuthContext.Provider>
  );
}