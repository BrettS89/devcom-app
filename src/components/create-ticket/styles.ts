import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  modal: {
    display: 'flex',
    flex: 1,
    padding: 30,
  },
  modalContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    height: 780,
  },
  header: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
  },
  field: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  assignField: {
    width: '100%',
    marginBottom: 20,
  },
  assignAndFiles: {
    display: 'flex',
    marginBottom: 10,
  },
  assignSection: {
    width: '50%',
    paddingLeft: 10,
  },
  filesSection: {
    width: '50%',
    paddingRight: 10,
  }
});
