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
      case 'tickets':
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
        <NavRow name='Tickets' setComponent={() => setComponent('tickets')} />
        <NavRow name='Board' setComponent={() => setComponent('tickets')} />
        {/* <NavRow name='Active Sprints' setComponent={() => setComponent('tickets')} /> */}
        <NavRow name='Projects' setComponent={() => setComponent('project')} />
        <NavRow name='Sprints' setComponent={() => setComponent('sprint')} />
      </div>
      
      <div className={classes.mainContent}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProjectMain;
