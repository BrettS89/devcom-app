import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  modal: {
    display: 'flex',
    flex: 1,
    padding: 30,
    // height: 800,
  },
  modalContent: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    height: 780,
  },
  header: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  field: {
    marginBottom: 20,
  },
  assignField: {
    // width: '50%',
    marginBottom: 20,
  },
  assignAndFiles: {
    display: 'flex',
    marginBottom: 10,
  },
  assignSection: {
    width: '50%',
    paddingRight: 10,
  },
  filesSection: {
    width: '50%',
    paddingLeft: 10,
  }
});
