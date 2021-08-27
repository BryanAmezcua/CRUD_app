import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Material UI and React-Router-Dom
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
// Custom Components
import AppDrawer from './AppDrawer';
// API functions
import { getUsers, deleteUser, getRecordCount } from '../APIfunctions';

const useStyles = makeStyles({
  table: {
    width: '90%',
    margin: '50px 0 0 50px'
  },
  thead: {
    '& > *': {
        fontSize: 20,
        background: '#000000',
        color: '#FFFFFF'
    }
  }
});

const PaginationUsers = () => {
  let history = useHistory();
  const classes = useStyles();
  const [userList, setUserList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  //let token = sessionStorage.getItem('token');

  useEffect(() => {
    getAllUsers();
  }, [pageNumber]);

  // Sometimes the API returns an object, other times an array. Handling is in place. It should work regardless now.
  const getAllUsers = async () => {
    let allUsers = await getUsers(pageNumber);
    if (allUsers.data !== undefined) {
      console.log('IT IS AN OBJECT');
      console.log(allUsers.data.users);
      let users = allUsers.data.users;
      let finalArray = [];
      users.forEach(user => {
        finalArray.push(user);
      });
      setUserList(finalArray);
    } else {
      console.log('IT IS AN ARRAY');
      setUserList(allUsers);
    }

    let recordCount = await getRecordCount();
    recordCount.forEach(header => {
      if (header[0] === "x-total-count") {
        let total = header[1];
        setTotalUsers(total);
        setTotalPages(Math.ceil(totalUsers / 5));
        return;
      }
    });
  };

  const deleteUserData = async (id) => {
    await deleteUser(id);
    getAllUsers();
  };

  const editUser = (id) => {
    sessionStorage.setItem('editID', id);
    history.push(`/profile/${id}`);
  };

  const leftArrowClick = () => {
    let newPage = pageNumber - 1
    setPageNumber(newPage);
  };

  const rightArrowClick = () => {
    let newPage = pageNumber + 1;
    setPageNumber(newPage);
  };

  return (
    <>
      <AppDrawer />
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className={classes.headers} align="center">User ID</TableCell>
            <TableCell className={classes.headers} align="center">Email</TableCell>
            <TableCell className={classes.headers} align="center">First Name</TableCell>
            <TableCell className={classes.headers} align="center">Age</TableCell>
            <TableCell className={classes.headers} align="center">Occupation</TableCell>
            <TableCell className={classes.headers} align="center">Edit or Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell style={{ fontSize: '18px' }} align="center">{user.id}</TableCell>
              <TableCell style={{ fontSize: '18px' }} align="center">{user.email}</TableCell>
              <TableCell style={{ fontSize: '18px' }} align="center">{user.first_name}</TableCell>
              <TableCell style={{ fontSize: '18px' }} align="center">{user.age}</TableCell>
              <TableCell style={{ fontSize: '18px' }} align="center">{user.job}</TableCell>
              <TableCell>
                <Button color="primary" variant="contained" style={{marginRight:10}} onClick={() => editUser(user.id)}>Edit</Button>
                <Button color="secondary" variant="contained" onClick={() => deleteUserData(user.id)}>Delete</Button> 
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <IconButton onClick={leftArrowClick} disabled={pageNumber === 1 ? true : false}>
          <ArrowLeftIcon fontSize='large'/>
        </IconButton>
        <IconButton onClick={rightArrowClick} disabled={pageNumber === totalPages ? true : false}>
          <ArrowRightIcon fontSize='large'/>
        </IconButton>
      </div>
    </>
  );
}

export default PaginationUsers;