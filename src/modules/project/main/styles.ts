import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { colors } from '../../../styles/colors';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flex: 1,
    borderTop: `1px solid ${colors.border}`,
  },
  leftNav: {
    display: 'flex',
    width: 180,
    backgroundColor: theme.palette.primary.main,
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
}));
