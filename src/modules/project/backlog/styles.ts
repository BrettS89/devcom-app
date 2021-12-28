import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 20,
  },
  pageTitle: {
    marginBottom: 10,
  },
  status: {
    width: 50,
  },
  name: {
    width: '40%',
  }
});
