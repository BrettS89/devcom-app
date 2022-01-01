//@ts-nocheck
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { priority } from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useStyles } from './styles';
import Autocomplete from '../autocomplete';
import api from '../../api';
import { Users, User } from '../../types/services';
import { appSelector, userSelector, ActionTypes, projectSelector } from '../../redux';

const CreateTicket = () => {
  const devRef = useRef();
  const testerRef = useRef();
  const managerRef = useRef();
  
  const app = useSelector(appSelector);
  const project = useSelector(projectSelector);
  const user = useSelector(userSelector);

  const dispatch = useDispatch();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [assignedDev, setAssignedDev] = useState(undefined);
  const [assignedTester, setAssignedTester] = useState(undefined);
  const [assignedManager, setAssignedManager] = useState('');
  const [ticketPriority, setTicketPriority] = useState(undefined);
  const [ticketStatus, setTicketStatus] = useState(undefined);
  const [ticketSprint, setTicketSprint] = useState(undefined);
  const [ticketType, setTicketType] = useState(undefined); 
  const [projectAssigned, setProjectAssigned] = useState(undefined);

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setName('');
    setDescription('');
    setAssignedTester(undefined);
    setAssignedManager(undefined);
    setAssignedDev(undefined);
    setTicketPriority(undefined);
    setTicketStatus(undefined);
    setTicketSprint(undefined);
    setTicketType(undefined);
    setProjectAssigned(undefined);
  };

  const closeModal = () => {
    dispatch({
      type: ActionTypes.SET_CREATE_TICKET_MODAL_OPEN,
      payload: false,
    });

    clearForm();
  }

  const searchUsers = _.debounce(async (term: string) => {
    if (!term) {
      setUsers([]);
      return;
    }

    const regex = `\\b${term}`

    setLoading(true)

    const foundUsers: Users = await api
      .service('security/user')
      .find({
        query: {
          accountId: user?.details?.accountId,
          fullName: { $regex: regex, $options: 'i' }
        },
      });

    setUsers(foundUsers.data);
    setLoading(false);
  }, 400);

  const createTicket = () => {
    dispatch({
      type: ActionTypes.CREATE_TICKET,
      payload: {
        name,
        description,
        assigneeUserId: assignedDev,
        testerUserId: assignedTester,
        priority: ticketPriority || project.workflow[0]._id,
        statusId: ticketStatus,
        sprintId: ticketSprint,
        typeId: ticketType,
        projectId: projectAssigned,
      },
    });

    clearForm();
  };

  const filterSprints = () => {
    return project.sprints.filter(sprint => {
      return sprint.endAt > new Date().toISOString();
    });
  };

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
            onChange={e => setName(e.target.value)}
            value={name}
          />
          <TextField
            multiline
            minRows={3}
            variant='outlined'
            placeholder='Description'
            size='small'
            className={classes.field}
            onChange={e => setDescription(e.target.value)}
            name={description}
          />

          <div className={classes.assignAndFiles}>
            <div className={classes.filesSection}>
              <div className={classes.label}>
                <Typography className='bold'>Ticket Details</Typography>
              </div>

              <TextField
                select
                variant='outlined'
                size='small'
                className={classes.assignField}
                label='Project'
                value={projectAssigned}
                onChange={e => setProjectAssigned(e.target.value)}
              >
                {project.project.map(p => (
                  <MenuItem value={p._id}>{p.name}</MenuItem>
                ))}
              </TextField>

              <TextField
                select
                variant='outlined'
                size='small'
                className={classes.assignField}
                label='Type'
                value={ticketType}
                onChange={e => setTicketType(e.target.value)}
              >
                {project.ticketType.map(p => (
                  <MenuItem value={p._id}>{p.name}</MenuItem>
                ))}
              </TextField>
              
              <TextField
                select
                variant='outlined'
                size='small'
                className={classes.assignField}
                label='Priority'
                value={ticketPriority}
                onChange={e => setTicketPriority(e.target.value)}
              >
                {priority.map(p => (
                  <MenuItem value={p.value}>{p.label}</MenuItem>
                ))}
              </TextField>

              <TextField
                select
                variant='outlined'
                size='small'
                label='Status'
                className={classes.assignField}
                value={ticketStatus}
                onChange={e => setTicketStatus(e.target.value)}
              >

                {project.workflow.map(status => (
                  <MenuItem value={status._id}>{status.name}</MenuItem>
                ))}

              </TextField>

              <TextField
                select
                variant='outlined'
                size='small'
                label='Sprint'
                className={classes.assignField}
                value={ticketSprint}
                onChange={e => setTicketSprint(e.target.value)}
              >

                {filterSprints(project.sprints).map(sprint => (
                  <MenuItem value={sprint._id}>{sprint.name}</MenuItem>
                ))}

              </TextField>
            </div>
            <div className={classes.assignSection}>
              <div className={classes.label}>
                <Typography className='bold'>Assign</Typography>
              </div>
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
          </div>
          
          <div>
          <Button
            variant='contained'
            color='primary'
            disableElevation
            onClick={createTicket}
          >
            Create Ticket
          </Button>
          </div>

        </div>
      </div>
    </Dialog>
  );
};

export default CreateTicket;
