import React from 'react';
import { useDispatch } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons'

import { ActionTypes } from '../../../../redux';
import { Sprint } from '../../../../types/services';
import { useStyles } from '../styles';
import DatePickerButton from './date-picker-button';

interface Props {
  sprint: Sprint;
}

const SprintRow: React.FC<Props> = ({ sprint }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const updateDate = (date: Date, field: 'startAt' | 'endAt') => {
    dispatch({
      type: ActionTypes.PATCH_SPRINT,
      payload: {
        _id: sprint._id,
        data: {
          [field]: date,
        },
      },
    });
  };

  return (
    <TableRow key={sprint._id}>
      <TableCell align="left" className={classes.sprintIcon}>
        <FontAwesomeIcon icon={faFeatherAlt} style={{ fontSize: 20, color: '#505999' }} />
      </TableCell>
      <TableCell align="left"><Typography>{sprint.name}</Typography></TableCell>
      <TableCell align="left"><Typography>Project</Typography></TableCell>
      <TableCell align="left">
        <div className={classes.dateField}>
          <Typography className={classes.dateAt}>Start at </Typography>
          <DatePicker
            selected={sprint.startAt ? new Date(sprint.startAt) : new Date()}
            //@ts-ignore
            onChange={(date) => updateDate(date, 'startAt')}
            //@ts-ignore
            customInput={<DatePickerButton />}
          />
        </div>
        
      </TableCell>
      <TableCell align="left">
        <div className={classes.dateField}>
          <Typography className={classes.dateAt}>End at </Typography>
          <DatePicker
            selected={sprint.endAt ? new Date(sprint.endAt) : new Date()}
            //@ts-ignore
            onChange={(date) => updateDate(date, 'endAt')}
            //@ts-ignore
            customInput={<DatePickerButton />}
          />
        </div>
      </TableCell>
      <TableCell align="left"><Typography>Status</Typography></TableCell>
    </TableRow>
  );
};

export default SprintRow;
