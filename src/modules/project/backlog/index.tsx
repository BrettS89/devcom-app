import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'

import { projectSelector, ActionTypes, filterSelector } from '../../../redux';
import { useStyles } from './styles';
import { getProject } from '../../../utilities'
import { getRows } from './utilities';
import { priority } from '../../../config';
import Filters from './components/filters';
import TypeIcon from './components/ticket-types';

const Backlog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const project = useSelector(projectSelector);
  const filter = useSelector(filterSelector);
  const [componentInitialized, setComponentInitialized] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const rows = getRows(window.innerHeight);

  const onPageChange = (e: any, newPage: number) => {
    setPage(newPage);

    if (newPage > page) {
      dispatch({
        type: ActionTypes.FETCH_MORE_TICKETS,
        payload: rows,
      });
    }
  };

  React.useEffect(() => {
    if (componentInitialized) {
      dispatch({
        type: ActionTypes.FETCH_BACKLOG,
      });
    } else {
      setComponentInitialized(true);
    }
  }, [filter.backlog]);

  const renderTable = () => {
    const firstTicket = rows * page;
    const lastTicket = firstTicket + rows;
    const tickets = project.backlog.data.slice(firstTicket, lastTicket);

    return (
      <TableContainer>
        <Table size='medium'>
          <TableBody>
            {tickets.map(ticket => {
              const ticketPriority = priority.find(p => p.value === ticket.priority);
              const ticketProject = getProject(ticket, project.project)

              return (
                <TableRow key={ticket._id}>
                  <TableCell align="left" className={classes.status}>
                    <TypeIcon type={ticket?.type?.name || 'Feature'} />
                  </TableCell>
                  <TableCell align="left" className={classes.name}>
                    <Typography>
                      {ticketProject?.code}-{ticket?.number} {ticket.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="left"><Typography>{ticketProject?.name || 'No Project'}</Typography></TableCell>
                  <TableCell align="left"><Typography>{ticket.sprint?.name}</Typography></TableCell>
                  <TableCell align="left"><Typography>{ticket.status?.name}</Typography></TableCell>
                  <TableCell align="left"><Typography>{ticketPriority?.label}</Typography></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter style={{ width: 500, borderBottom: 'hidden' }}>
            <TablePagination
              count={project.backlog.count}
              page={page}
              rowsPerPage={rows}
              rowsPerPageOptions={[]}
              onPageChange={onPageChange}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.topRow}>
        <Typography className='bold' variant='h5'>
          Tickets
        </Typography>
        <Filters />
      </div>
      
      {renderTable()}
    </div>
  );
};

export default Backlog;
