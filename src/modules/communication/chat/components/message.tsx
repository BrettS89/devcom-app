import Typography from '@material-ui/core/Typography'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useStyles } from '../styles';
import { Message as MessageType } from '../../../../types/services';

interface Props {
  message: MessageType;
}

const Message: React.FC<Props> = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.message}>
      <div className={classes.messageIcon}>
        <FontAwesomeIcon icon={faUser} style={{ fontSize: 34, color: '#3a48b3', paddingTop: 4 }} />
      </div>

      <div>
        <Typography className='bold'>
          {message.user?.firstName} {message.user?.lastName}
        </Typography>
        <Typography>
          {message.text}
        </Typography>
      </div>
    </div>
  );
};

export default Message;
