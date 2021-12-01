//@ts-nocheck
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useStyles } from './styles';
import Autocomplete from '../autocomplete';
import api from '../../api';
import { Users, User } from '../../types/services';
import { appSelector, userSelector, ActionTypes } from '../../redux';

const CreateTicket = () => {
  const devRef = useRef();
  const testerRef = useRef();
  const managerRef = useRef();
  
  const app = useSelector(appSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedDev, setAssignedDev] = useState('');
  const [assignedTester, setAssignedTester] = useState('');
  const [assignedManager, setAssignedManager] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const closeModal = () => {
    dispatch({
      type: ActionTypes.SET_CREATE_TICKET_MODAL_OPEN,
      payload: false,
    })
  }

  const searchUsers = _.debounce(async (term: string) => {
    setLoading(true)

    const foundUsers: Users = await api
      .service('security/user')
      .find({
        query: {
          accountId: user?.details?.accountId,
          $or: [
            { firstName: term },
            { lastName: term },
          ],
        },
      });

    setUsers(foundUsers.data);
    setLoading(false);
}, 300)

  return (
    <Dialog
      open={app.createTicketModalOpen}
      fullWidth
      maxWidth="md"
    >
      <div className={classes.modal}>
        <div className={classes.modalContent}>
          <div className={classes.header}>
            <Typography variant='h5' className='bold'>
              Create a Ticket
            </Typography>
            <FontAwesomeIcon icon={faTimes} className='hover' onClick={closeModal} />
          </div>
          
          <TextField
            variant='outlined'
            placeholder='Name'
            className={classes.field}
            size='small'
          />
          <TextField
            multiline
            variant='outlined'
            placeholder='Description'
            rows={20}
            // style={{backgroundColor: 'gray' }}
            className={classes.field}
          />
  
          <div className={classes.assignAndFiles}>
            <div className={classes.assignSection}>
            <Autocomplete
              autoRef={devRef}
              open={users.length && document.activeElement === devRef.current}
              onInput={(e: any) => searchUsers(e.target.value)}
              options={users}
              getOptionLabel={(option: User) => `${option.firstName} ${option.lastName}`}
              loading={loading}
              label='Assign developer'
              className={classes.assignField}
              onClose={() => setUsers([])}
              onChange={(e, value) => {
                setAssignedDev(value?._id);
                setUsers([]);
              }}
            />
            <Autocomplete
              autoRef={testerRef}
              open={users.length && document.activeElement === testerRef.current}
              onInput={(e: any) => searchUsers(e.target.value)}
              options={users}
              getOptionLabel={(option: User) => `${option.firstName} ${option.lastName}`}
              loading={loading}
              label='Assign tester'
              className={classes.assignField}
              onClose={() => setUsers([])}
              onChange={(e, value) => {
                setAssignedTester(value?._id);
                setUsers([]);
              }}
            />
            <Autocomplete
              autoRef={managerRef}
              open={users.length && document.activeElement === managerRef.current}
              onInput={(e: any) => searchUsers(e.target.value)}
              options={users}
              getOptionLabel={(option: User) => `${option.firstName} ${option.lastName}`}
              loading={loading}
              label='Assign manager'
              className={classes.assignField}
              onClose={() => setUsers([])}
              onChange={(e, value) => {
                setAssignedManager(value?._id);
                setUsers([]);
              }}
            />
            </div>
            <div className={classes.filesSection}>
              <Typography className='bold'>Add Files</Typography>
            </div>
          </div>
          
          <div>
          <Button variant='contained' color='primary' disableElevation>
            Create Ticket
          </Button>
          </div>
          

        </div>
      </div>
    </Dialog>
  );
};

export default CreateTicket;
