import React, {Component} from 'react';
import { ipcMain, ipcRenderer } from 'electron';
import moment from 'moment';
// Material UI imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Queue styling from Material UI
const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class Queue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
    };
  }

  componentDidMount() {

    ipcRenderer.on('q', (event, arg) => {
      const jobs = this.state.jobs.slice();
      jobs.unshift(arg);
      this.setState({jobs: jobs});
    });

    ipcRenderer.on('error', (event, name) => {
      window.alert('There was an error running the job.' 
        + ' Please make a new job and retry the process with fixes.');
      const jobs = [];
      this.state.jobs.map(job => {
        if (job.name === name) {
          job.end = 'error';
          job.status = 'An error occurred';
          return '';
        }
        return jobs.push(job);
      });
      this.setState(jobs);
    });

    ipcRenderer.on('done', (event, name) => {
      window.alert(name + ' has completed!');
      const jobs = [];
      this.state.jobs.forEach((job) => {
        if (job.name === name) {
          job.end = moment().format('MM-DD-YY HH:mm:ss');
          job.status = 'Finished';
          return '';
        }
        return jobs.push(job);
      });
      this.setState(jobs);
    });
  }

  render() {
    const { classes } = this.props;
    const { jobs } = this.state;
    const rows = [];

    if (jobs.length === 0) {
      const defaultQueue = {
        name: 'There is currently nothing to display in the queue.',
        start: 'n/a',
        end: 'n/a',
        status: 'n/a'
      }
      rows.unshift(defaultQueue);
    } else {
      jobs.forEach((job) => {
        const { name, end, status } = job;
        const now = moment();
        const start = now.format('MM-DD-YY HH:mm:ss');
        rows.unshift({ name, start, end, status });
      });
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Job Name</CustomTableCell>
              <CustomTableCell align="right">Start Time</CustomTableCell>
              <CustomTableCell align="right">End Time</CustomTableCell>
              <CustomTableCell align="right">Status</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow className={classes.row} key={row.id}>
                  <CustomTableCell component="th" scope="row">
                    {row.name}
                  </CustomTableCell>
                  <CustomTableCell align="right">{row.start}</CustomTableCell>
                  <CustomTableCell align="right">{row.end}</CustomTableCell>
                  <CustomTableCell align="right">{row.status}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(Queue);
