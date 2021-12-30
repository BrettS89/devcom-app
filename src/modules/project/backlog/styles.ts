import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 20,
  },
  topRow: {
    marginBottom: 10,
    display: 'flex',
  },
  status: {
    width: 50,
  },
  name: {
    width: '40%',
  },
  filters: {
    marginLeft: 30,
  },
});
