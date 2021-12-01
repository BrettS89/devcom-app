import { Route, Routes } from 'react-router-dom';

import Landing from '../modules/info/landing';
import Chat from '../modules/communication/chat';
// import Signin from '../modules/auth/signin';

export default () => {
  return (
    <Routes>
      <Route path='chat' element={<Chat />} />
      <Route path='/' element={<Landing />} />
    </Routes>
  );
};
