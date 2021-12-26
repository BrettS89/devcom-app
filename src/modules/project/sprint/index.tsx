import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';

import SprintRow from './components/sprint-row';

import { getRows } from '../backlog/utilities';
import { useStyles } from './styles';
import { projectSelector } from '../../../redux';

const Sprint = () => {
  const classes = useStyles();
  const project = useSelector(projectSelector);
  const [page, setPage] = React.useState(0);
  const rows = getRows(window.innerHeight);

  const onPageChange = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const renderTable = () => {
    const firstTicket = rows * page;
    const lastTicket = firstTicket + rows;
    const tickets = project.sprints.slice(firstTicket, lastTicket);

    return (
      <TableContainer>
        <Table size='medium'>
          <TableBody>
            {tickets.map(sprint => {
              return (
                <SprintRow key={sprint._id} sprint={sprint} />
              );
            })}
          </TableBody>
          <TableFooter style={{ width: 500, borderBottom: 'hidden' }}>
            <TablePagination
              count={project.sprints.length}
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
      <Typography className={`bold ${classes.pageTitle}`} variant='h5'>
        Sprints
      </Typography>
      
      <div className={classes.content}>
      {renderTable()}
        {/* <div>
          Sprint details
        </div> */}
      </div>
    </div>
  );
};

export default Sprint;
