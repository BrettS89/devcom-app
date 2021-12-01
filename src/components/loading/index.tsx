import { useSelector } from 'react-redux';
import { appSelector } from '../../redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../spinner';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: theme.zIndex.drawer + 1000000,
    color: '#fff',
    height: '100%',
  },
  spinner: {
    marginBottom: 10,
  },
  message: {

  }
}));

const LoadingBackdrop = () => {
  const app = useSelector(appSelector);
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={app.loading.status}>
      <Spinner/>
      {/* <CircularProgress color="inherit" className={classes.spinner} /> */}
      {app.loading.message && (
        <Typography className={classes.message}>
          {app.loading.message}
        </Typography>
      )}
    </Backdrop>
  );
};

export default LoadingBackdrop;
