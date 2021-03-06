import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 20,
  },
  topRow: {
    marginBottom: 0,
    display: 'flex',
  },
  status: {
    width: 50,
  },
  name: {
    width: '40%',
  },
  filters: {
    marginLeft: 16,
  },
  filter: {
    width: 200,
    marginTop: 0,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  }
});
