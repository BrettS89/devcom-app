import { useStyles } from './styles';
import NavRow from './components/nav-row';

import Backlog from '../backlog';

const ProjectMain = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.leftNav}>
        <NavRow name='Backlog' />
        <NavRow name='Board' />
        <NavRow name='Active Sprint' />
        <NavRow name='Sprints' />
      </div>
      
      <div className={classes.mainContent}>
        <Backlog />
      </div>
    </div>
  );
};

export default ProjectMain;
