import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faUser, faSignature } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../redux';

import { useStyles } from './styles';

const Header = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const token = localStorage.getItem('token');

  const notLoggedIn = () => {
    if (token) return;

    return (
      <div className={classes.rightItems}>
        <Button
          className={classes.link}
          onClick={() => navigate('/pricing')}
        >
          Pricing
        </Button>
        <Button
          className={classes.link}
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
        <Button
          className={classes.link}
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </Button>
      </div>
    );
  };

  const loggedIn = () => {
    if (!token) return;

    return (
      <div className={classes.rightItems}>
        <Button
          className={classes.link}
          onClick={() => navigate('/chat')}
          size='large'
        >
          Chat
        </Button>

        <Button
          className={classes.link}
          onClick={() => navigate('/chat')}
          size='large'
        >
          Tickets
        </Button>
        <Button
          className={classes.link}
          onClick={() => dispatch({ type: ActionTypes.SET_CREATE_TICKET_MODAL_OPEN, payload: true })}
          size='large'
        >
          Create Ticket +
        </Button>
        <Button
          className={classes.link}
          onClick={() => navigate('/chat')}
          size='large'
        >
          <FontAwesomeIcon icon={faUser} style={{ fontSize: 22, color: '#3a48b3' }} />
        </Button>

        {/* <div
          className={`hover ${classes.userIcon}`}
          onClick={() => navigate('/chat')}
        >
          <FontAwesomeIcon icon={faUser} style={{ fontSize: 20, color: '#3a48b3' }} />
        </div> */}
      </div>
    )
  };

  return (
    <AppBar elevation={0} color="secondary" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={`${classes.leftItems} hover`} onClick={() => navigate('/')}>
          <FontAwesomeIcon style={{ color: '#ff535c', fontSize: 36 }} icon={faSignature} />
          {/* <Typography className={classes.logo} color='secondary'>
            Live
          </Typography> */}
        </div>

        {loggedIn()}
        {notLoggedIn()}
        
      </Toolbar>
    </AppBar>
  );
};

export default Header;