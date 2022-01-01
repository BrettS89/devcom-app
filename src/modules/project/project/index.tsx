import Typography from '@material-ui/core/Typography';
import { useStyles } from './styles';

const Projects = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
      <Typography className='bold' variant='h5'>
        Projects
      </Typography>
      </div>

    </div>
  )
};

export default Projects;
