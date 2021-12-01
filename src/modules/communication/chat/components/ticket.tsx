//@ts-nocheck
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { useStyles } from '../styles';
import { Ticket as TicketType, Channel, DM } from '../../../../types/services';

interface Props {
  active: {
    type: string;
    value: string;
    label?: string;
  }
  ticket?: TicketType | Channel | DM;
  patchTicket(id: string, payload: { ['string']: any }): void;
}

const Ticket: React.FC<Props> = ({ active, patchTicket, ticket }) => {
  const classes = useStyles();

  const renderNoTicket = () => {
    const label = active.type === 'channel'
      ? active.label
      : `Conversation with ${active.label}`;

    return (
      <div className={classes.ticketWindow}>
        <div className={classes.generalConversation}>
         <FontAwesomeIcon style={{ color: 'gray', fontSize: 40 }} icon={faCommentAlt} />
          <Typography className={classes.generalValue}>
            {label}
          </Typography>
        </div>
      </div>
    );
  };

  const renderTicket = () => {
    return (
      <div className={classes.ticketWindow}>
        <div className={classes.ticketWindowContent}>
          <Typography variant='h6' className={classes.ticketTitle}>{ticket?.name}</Typography>

          <div className={classes.ticketStatus}>
            {/* <Typography>Status</Typography> */}
            <TextField select
              variant='outlined'
              size='small'
              value={ticket.status}
              className={classes.statusDropdown}
              onChange={e => {
                patchTicket(ticket?._id, { status: e.target.value });
                  e.currentTarget.blur();                
              }}
            >
              <MenuItem value='Ready to Begin'>Ready to begin</MenuItem>
              <MenuItem value='In Progress'>In Progress</MenuItem>
              <MenuItem value='Complete'>Complete</MenuItem>
            </TextField>
          </div>

          <div className={classes.ticketAssign}>
            <Typography className='bold'>Assigner</Typography>
            <div className={classes.ticketUser}>
              <FontAwesomeIcon style={{ color: '#ff535c', marginRight: 10 }} icon={faUser} />
              <Typography>{ticket?.assigner?.firstName} {ticket?.assigner?.lastName}</Typography>
            </div>
          </div>

          <div className={classes.ticketAssign}>
            <Typography className='bold'>Assignee</Typography>
            <div className={classes.ticketUser}>
              <FontAwesomeIcon style={{ color: '#ff535c', marginRight: 10 }} icon={faUser} />
              <Typography>{ticket?.assignee?.firstName} {ticket?.assignee?.lastName}</Typography>
            </div>
          </div>

          <div className={classes.ticketAssign}>
            <Typography className='bold'>Tester</Typography>
            <div className={classes.ticketUser}>
              <FontAwesomeIcon style={{ color: '#ff535c', marginRight: 10 }} icon={faUser} />
              <Typography>{ticket?.tester?.firstName} {ticket?.tester?.lastName}</Typography>
            </div>
          </div>

          <div className={classes.description}>
            <Typography className='bold'>Description</Typography>
            <Typography>
              {ticket?.description}
            </Typography>
          </div>
        </div>
      </div>
    );
  };

  return active.type === 'ticket' ? renderTicket() : renderNoTicket();

};

export default Ticket;