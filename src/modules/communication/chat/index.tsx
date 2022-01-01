import { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faCommentAlt, faFileCode, faImage, faPaperclip, faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons'
import { communicationSelector, ActionTypes, projectSelector } from '../../../redux';
import { getProject } from '../../../utilities';
import { useStyles } from './styles';
import { getActiveConversation } from './utility';
import Message from './components/message';
import Ticket from './components/ticket';

const Chat = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const communication = useSelector(communicationSelector);
  const project = useSelector(projectSelector);
  let chatEnd = useRef();
  const [messageText, setMessageText] = useState('');
  const [enterPressed, setEnterPressed] = useState<boolean>(false);
  
  const activeConversation = getActiveConversation(communication, communication.active.value);

  const setActive = (type: string, value: string, label?: string) => {
    dispatch({
      type: ActionTypes.SET_COMMUNICATION_ACTIVE,
      payload: {
        type,
        value,
        label,
      },
    });
  };

  const sendMessage = () => {
    if (!messageText) return;

    const text = messageText;
    setEnterPressed(false);

    setMessageText('');

    dispatch({
      type: ActionTypes.SEND_MESSAGE,
      payload: {
        text,
      },
    });
  };

  const patchTicket = (id: string, patch: { ['string']: any }) => {
    dispatch({
      type: ActionTypes.PATCH_TICKET,
      payload: {
        id,
        patch,
      }
    });
  };

  const renderChannels = () => {
    return communication.channels.map(channel => (
      <div className={classes.channel} onClick={() => setActive('channel', channel._id!, channel.name)}>
        <FontAwesomeIcon style={{ color: '#f9f9f9', marginRight: 10 }} icon={faCommentAlt} />
        <Typography color='secondary'>{channel.name}</Typography>
      </div>
    ));
  };

  const renderTickets = () => {
    return communication.tickets.map(ticket => {
      const ticketProject = getProject(ticket, project.project);

      return (
        <div className={classes.channel} key={ticket._id} onClick={() => setActive('ticket', ticket._id!)}>
          <FontAwesomeIcon style={{ color: '#f9f9f9', marginRight: 10 }} icon={faCommentAlt} />
          <Typography color='secondary'>{ticketProject?.code}-{ticket.number}</Typography>
        </div>
      )
    });
  };

  const renderDms = () => {
    return communication.dms.map(dm => (
      <div className={classes.channel} key={dm._id} onClick={() => setActive('dm', dm._id!, dm.username)}>
        <FontAwesomeIcon style={{ color: '#f9f9f9', marginRight: 10 }} icon={faUser} />
        <Typography color='secondary'>{dm.username}</Typography>
      </div>
    ));
  };

  const renderMessages = () => {
    return activeConversation?.messages?.map(message => {
      return (
        <Message key={message._id} message={message} />
      );
    });
  };

  const scrollToBottom = () => {
    //@ts-ignore
    chatEnd.current.scrollIntoView({  });
  };

  useEffect(() => {
    scrollToBottom();

  }, [activeConversation?.messages]);

  return (
    <div className={classes.container}>
      <div className={classes.leftPannel}>
        <div className={classes.channels}>
          <Typography className={classes.generalTitle} color='secondary'>Channels</Typography>
          {renderChannels()}
        </div>

        <div className={classes.channels}>
          <Typography className={classes.generalTitle} color='secondary'>Tickets</Typography>
          {renderTickets()}
        </div>

        <div className={classes.channels}>
          <Typography className={classes.generalTitle} color='secondary'>Direct Messages</Typography>
          {renderDms()}
        </div>
      </div>

      <div className={classes.chatWindow}>
        <div className={classes.chatContent}>
          {renderMessages()}
          <div
            style={{ float:"left", clear: "both" }}
            //@ts-ignore
            ref={chatEnd}
          ></div>
        </div>
        <div style={{ padding: 20, paddingTop: 0 }}>
          <div className={classes.chatInput}>
            <div className={classes.chatInputInput}>
              {/* <Input /> */}
              <TextField
                fullWidth
                placeholder="Type your message..."
                InputProps={{ disableUnderline: true }}
                multiline
                value={messageText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (enterPressed) {
                    sendMessage();
                  } else {
                    setMessageText(e.target.value);
                  }
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setEnterPressed(true);
                  }
                }}
              />
            </div>
            <div className={classes.sendSection}>
              <FontAwesomeIcon icon={faPaperclip} className={classes.icon} />
              <FontAwesomeIcon icon={faImage} className={classes.icon} />
              <FontAwesomeIcon icon={faCode} className={classes.icon} />
              <FontAwesomeIcon icon={faFileCode} className={classes.icon} />
              <div className={classes.icon} onClick={() => sendMessage()!}>
                <FontAwesomeIcon icon={faPaperPlane} />
              </div>
              
            </div>
          </div>
        </div>
      </div>

      <Ticket
        active={communication.active}
        ticket={activeConversation}
        patchTicket={patchTicket}
        project={project}
      />
    </div>
  )
};

export default Chat;
