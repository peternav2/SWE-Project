import { useState, useEffect } from 'react';
import { User } from '../stores/User';

const useUserState = (): [User | null, (userState: User) => void] => {
  const [userState, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const handleSetUserState = (newUserState: User) => {
    setUserState(newUserState);
    localStorage.setItem('user', JSON.stringify(newUserState));
  };

  return [userState, handleSetUserState];
};

export default useUserState;
