import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 20,
  },
  pageTopRow: {
    marginBottom: 5,
    display: 'flex',
    justifyContent: 'space-between'
  },
  sprintIcon: {
    width: 50,
  },
  content: {
    display: 'flex',
  },
  dateField: {
    display: 'flex',
    alignItems: 'center',
    width: 250,
  },
  dateAt: {
    width: 80,
  },
  projectField: {
    width: 200,
  }
});
