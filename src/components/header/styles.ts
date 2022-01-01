import { makeStyles, createStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  appBar: {
    height: 47
  },
  logo: {
    fontWeight: 600,
    fontSize: 20,
    marginLeft: 7,
    letterSpacing: 1,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 47,
    // borderBottom: '1px solid lightgray'
  },
  leftItems: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.secondary.main,
  },
  rightItems: {
    display: 'flex',
    alignItems: 'center',
  },
  beta: {
    marginLeft: 10,
    fontSize: 14,
  },
  link: {
    color: theme.palette.primary.main,
    marginLeft: 10,
    // fontWeight: 700,
  },
  userIcon: {
    marginLeft: 25,
    color: theme.palette.primary.main,
  },
  planText: {
    paddingLeft: 8,
    paddingRight: 8,
    // paddingBottom: 8,
    fontWeight: 700,
    // paddingTop: 1,
    marginLeft: 10,
    // fontSize: 13,
    color: '#f5f5f5'
  },
  planName: {
    fontStyle: 'italic',
  }
}));
