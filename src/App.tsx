import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './components/header';
import Loading from './components/loading';
import Message from './components/message';
import CreateTicket from './components/create-ticket';
import Router from './routing';
import { ActionTypes, appSelector } from './redux';
import { useStyles } from './style';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature } from '@fortawesome/free-solid-svg-icons'

function App(props: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const dispatch = useDispatch();

  const path = location.pathname;

  const app = useSelector(appSelector);

  const renderApp = () => {
    return (
      <div className="App">
        <Header/>
        <div className='App-main'>
          <Router />
        </div>
        <Loading />
        <Message />
        <CreateTicket />
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className={classes.initContainer}>
        <div className={classes.logoContainer}>
          <FontAwesomeIcon style={{ color: '#f5f5f5', fontSize: 80 }} icon={faSignature} />
          {/* <Typography className={classes.logo} color='secondary'>Chatster</Typography> */}
        </div>
        {/* <Spinner/> */}
        {/* <CircularProgress color="secondary" className={classes.spinner} thickness={5.0}/> */}
      </div>
    );
  };

  useEffect(() => {
    dispatch({
      type: ActionTypes.INITIALIZE,
      payload: {
        navigate: () => navigate,
        path,
      },
    });
  }, []);

  return app.initialized
    ? renderApp()
    : renderLoading();
}

export default App;
