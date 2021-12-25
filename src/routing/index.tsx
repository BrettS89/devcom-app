import { Route, Routes } from 'react-router-dom';

import Landing from '../modules/info/landing';
import Chat from '../modules/communication/chat';
import ProjectMain from '../modules/project/main';
// import Signin from '../modules/auth/signin';

export default () => {
  return (
    <Routes>
      <Route path='project' element={<ProjectMain />} />
      <Route path='chat' element={<Chat />} />
      <Route path='/' element={<Landing />} />
    </Routes>
  );
};
