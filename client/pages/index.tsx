import React, { useState } from 'react';
import UserName from '../Components/UserName';
import Chat from '../Components/Chat';
import { User } from '../interface/types';

const main: React.FC = () => {
  const [user, setUser] = useState<User>({ id: '', userName: '', icon: '' });

  return (
    <>
      {!user.userName ? (
        <UserName setUser={setUser} />
      ) : (
        <Chat user={user} />
      )}
    </>
  );
};

export default main;
