import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flex: 1,
    borderTop: '1px solid lightgray',
  },
  leftNav: {
    display: 'flex',
    width: 200,
    backgroundColor: '#3a48b3',
    flexDirection: 'column',
    padding: 20,
    color: '#f5f5f5',
  },
  navRow: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginBottom: 15,
  },
  mainContent: {
    display: 'flex',
    flex: 1,
  }
});
