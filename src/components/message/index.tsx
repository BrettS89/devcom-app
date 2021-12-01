import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { appSelector } from '../../redux';
import { ActionTypes } from '../../redux/actions';

const useStyles = makeStyles({
  snackysnack: {
  },
});

const Message = () => {
  const dispatch = useDispatch();
  const app = useSelector(appSelector);
  const classes = useStyles();

  const handleClose = () => {
    dispatch({ type: ActionTypes.CLOSE_SNACKBAR });
  };

  const renderMessage = () => {
    if (app.info.message.length) {
      return (
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
        >
        {app.info.message}
        </MuiAlert>
      );
    } else if (app.error.message.length) {
      return (
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
        >
          {app.error.message}
        </MuiAlert>
      );
    } 
  };

  return (
    <Snackbar
      className={classes.snackysnack}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={app.snackbarOpen}
      onClose={handleClose}
      autoHideDuration={5000}
      key={'top' + 'center'}
    >
      {renderMessage()}
    </Snackbar>
  )
};

export default Message;
