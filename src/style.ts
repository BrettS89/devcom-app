import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  initContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a48b3',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontWeight: 600,
    fontSize: 60,
    marginLeft: 12,
    letterSpacing: 1,
  },
  spinner: {
    marginTop: 95,
  }
});
