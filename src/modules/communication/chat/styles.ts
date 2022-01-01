import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { colors } from '../../../styles/colors';

export const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flex: 1,
  },
  leftPannel: {
    display: 'flex',
    width: 180,
    backgroundColor: theme.palette.primary.main,
    flexDirection: 'column',
    padding: 20,
  },
  channels: {
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.secondary.main,
    marginBottom: 30,
  },
  generalTitle: {
    fontWeight: 700,
    marginBottom: 10,
  },
  channel: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
    cursor: 'pointer',
  },
  chatWindow: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: `1px solid ${colors.border}`,
    flex: 1,
  },
  chatContent: {
    padding: 20,
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'auto',
    height: 10,
  },
  message: {
    display: 'flex',
    paddingBottom: 10,
  },
  messageIcon: {
    minHeight: 45,
    minWidth: 45,
    color: theme.palette.primary.main
    // color: colors.green
  },
  chatInput: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid lightgray',
    backgroundColor: '#ededed',
    borderRadius: 4,
  },
  chatInputInput: {
    display: 'flex',
    flex: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sendSection: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    // borderTop: '1px solid lightgray',
    fontSize: 18,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
    cursor: 'pointer',
    color: 'gray'
  },
  ticketWindow: {
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid lightgray',
    backgroundColor: '#e0e0e0',
    width: 500,
  },
  generalConversation: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  generalValue: {
    fontSize: 26,
    marginTop: 10,
    color: 'gray'
  },
  ticketWindowContent: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflowY: 'auto',
    height: 10,
  },
  ticketStatus: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 25,
  },
  statusDropdown: {
    // width: 175,
  },
  ticketTitle: {
    // fontWeight: 600,
    marginBottom: 20,
  },
  ticketUser: {
    display: 'flex',
    alignItems: 'center',
  },
  ticketAssign: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
  },
  ticketAssignLabel: {
    fontWeight: 700,
    width: 100,
  },
  description: {
    marginTop: 10,
  }
}));
