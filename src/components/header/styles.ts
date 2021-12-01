import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
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
    alignItems: 'center'
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
    color: '#3a48b3',
    marginLeft: 10,
    // fontWeight: 700,
  },
  userIcon: {
    marginLeft: 25,
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
});
