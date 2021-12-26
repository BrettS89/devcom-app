import { useState } from 'react';
import { useStyles } from './styles';
import NavRow from './components/nav-row';

import Backlog from '../backlog';
import Sprint from '../sprint';

const ProjectMain = () => {
  const classes = useStyles();
  const [component, setComponent] = useState('backlog');

  const renderComponent = () => {
    switch(component) {
      case 'backlog':
        return <Backlog />;

      case 'sprint':
        return <Sprint />;

      default:
        return <Backlog />;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.leftNav}>
        <NavRow name='Backlog' setComponent={() => setComponent('backlog')} />
        <NavRow name='Board' setComponent={() => setComponent('backlog')} />
        <NavRow name='Active Sprint' setComponent={() => setComponent('backlog')} />
        <NavRow name='Sprints' setComponent={() => setComponent('sprint')} />
      </div>
      
      <div className={classes.mainContent}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProjectMain;
