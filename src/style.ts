import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  initContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
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
}));
