import { useSelector, useDispatch } from 'react-redux';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { useStyles } from '../styles';
import { ActionTypes, filterSelector, projectSelector } from '../../../../redux';
import { priority } from '../../../../config';

const Filters = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const project = useSelector(projectSelector);
  const filter = useSelector(filterSelector);

  const sprints = [];

  const findPriorityLabel = (n: number): string => {
    return priority.find(p => p.value === n)?.label || ' ';
  }

  const filterSprints = () => {
    return project.sprints.filter(sprint => {
      return sprint.endAt! > new Date().toISOString() || sprint.active;
    });
  };

  const onChange = (name: string, field: string, value?: string, ) => {
    dispatch({
      type: ActionTypes.UPDATE_BACKLOG_FILTER,
      payload: {
        field,
        value,
        name,
      },
    });
  };

  const onPriorityChange = (value: number) => {
    dispatch({
      type: ActionTypes.UPDATE_BACKLOG_FILTER,
      payload: {
        field: 'priority',
        value,
      },
    });
  };

  return (
    <div className={classes.filters}>
      <FormControl style={{ width: 200, marginTop: 0 }} margin='dense' variant='outlined'>
        <InputLabel id="type-backlog-filter" margin='dense'>Type</InputLabel>
        <Select
          labelId="type-backlog-filter"
          label='Type'
          multiple
          value={filter.backlog.sprint}
          input={<OutlinedInput margin='dense' label='Type' />}
          //@ts-ignore
          renderValue={(selected) => selected.map(s => s.name).join(', ')}
        >
          {project.ticketType.map((type) => (
            <MenuItem key={type._id} value={type._id}>
              <Checkbox
                onChange={() => onChange(type.name, 'type', type._id)}
                checked={!!filter.backlog.type.find(s => s._id === type._id)}
                color='primary' name={type.name}
              />
              <ListItemText primary={type.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ width: 200, marginTop: 0, marginLeft: 10 }} margin='dense' variant='outlined'>
        <InputLabel id="sprint-backlog-filter" margin='dense'>Sprint</InputLabel>
        <Select
          labelId="sprint-backlog-filter"
          label='Sprint'
          multiple
          value={filter.backlog.sprint}
          input={<OutlinedInput margin='dense' label='Sprint' />}
          //@ts-ignore
          renderValue={(selected) => selected.map(s => s.name).join(', ')}
        >
          {filterSprints().map((sprint) => (
            <MenuItem key={sprint._id} value={sprint._id}>
              <Checkbox
                onChange={() => onChange(sprint.name, 'sprint', sprint._id)}
                checked={!!filter.backlog.sprint.find(s => s._id === sprint._id)}
                color='primary' name={sprint.name}
              />
              <ListItemText primary={sprint.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ width: 200, marginTop: 0, marginLeft: 10 }} margin='dense' variant='outlined'>
        <InputLabel id="status-backlog-filter" margin='dense'>Status</InputLabel>
        <Select
          labelId="status-backlog-filter"
          label='Status'
          multiple
          value={filter.backlog.status}
          input={<OutlinedInput margin='dense' label='Status' />}
          //@ts-ignore
          renderValue={(selected) => selected.map(s => s.name).join(', ')}
        >
          {project.workflow.map((status) => (
            <MenuItem key={status._id} value={status._id}>
              <Checkbox
                onChange={() => onChange(status.name, 'status', status._id)}
                checked={!!filter.backlog.status.find(s => s._id === status._id)}
                color='primary' name={status.name}
              />
              <ListItemText primary={status.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl style={{ width: 200, marginTop: 0, marginLeft: 10 }} margin='dense' variant='outlined'>
        <InputLabel id="priority-backlog-filter" margin='dense'>Priority</InputLabel>
        <Select
          labelId="priority-backlog-filter"
          label='Priority'
          multiple
          value={filter.backlog.priorities}
          input={<OutlinedInput margin='dense' label='Priority' />}
          //@ts-ignore
          renderValue={(selected) => {
            //@ts-ignore
            return selected.map(s => findPriorityLabel(s)).join(', ')
          }}
        >
          {priority.map((p) => (
            <MenuItem key={p.value} value={p.value}>
              <Checkbox
                onChange={() => onPriorityChange(p.value)}
                checked={!!filter.backlog.priorities.includes(p.value)}
                color='primary' name={p.label}
              />
              <ListItemText primary={p.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
