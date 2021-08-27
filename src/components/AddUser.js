import { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Material UI Components
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography, Divider } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
// Custom Componentss
import AppDrawer from './AppDrawer';
import { addUser } from '../APIfunctions';
const useStyles = makeStyles({
  headers: {
    fontSize: '24px'
  },
  container: {
    width: '50%',
    margin: '5% 0 0 25%',
    '& > *': {
        marginTop: 20
    }
  }
});

const AddUser = () => {
  // History State
  let history = useHistory();
  const classes = useStyles();
  const [addedUsersEmail, setNewEmail] = useState('');
  const [addedUsersName, setNewName] = useState('');
  const [addedUsersJob, setNewJob] = useState('');
  const [addedUsersAge, setNewAge] = useState(0);
  const [snackBar, snackBarStatus] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');

  const onClose = () => {
    snackBarStatus(false);
  };
  const setEmail = (e) => {
    let email = e.target.value;
    setNewEmail(email);
    return email;
  };
  const setName = (e) => {
    let name = e.target.value;
    setNewName(name);
    return name;
  };
  const setJob = (e) => {
    let job = e.target.value;
    setNewJob(job);
    return job;
  };
  const setAge = (e) => {
    let age = e.target.value;
    setNewAge(age);
    return age;
  };

  const userDetails = {
    "email": addedUsersEmail,
    "first_name": addedUsersName,
    "job": addedUsersJob,
    "age": addedUsersAge
  };

  const addUserDetails = async () => {
    console.log(userDetails);
    await addUser(userDetails);
    history.push('/PaginationUsers');
  }

  return (
    <>
      <AppDrawer />
      <FormGroup className={classes.container}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>Add User</Typography>
        <FormControl>
            <InputLabel>Email</InputLabel>
            <Input id="email" onChange={setEmail}/>
        </FormControl>
        <FormControl>
            <InputLabel>Name</InputLabel>
            <Input id="name" onChange={setName} />
        </FormControl>
        <FormControl>
            <InputLabel>Occupation</InputLabel>
            <Input id="job" onChange={setJob}/>
        </FormControl>
        <FormControl>
            <InputLabel>Age</InputLabel>
            <Input id="age" onChange={setAge}/>
        </FormControl>
        <FormControl>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={addUserDetails}>
                Add User
            </Button>
            <Snackbar 
              message={snackBarMessage} 
              anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
              open={snackBar} 
              autoHideDuration={4000}
              onClose={onClose}
            />
        </FormControl>
      </FormGroup>
      <Divider style={{ marginTop: '5%' }}/>
    </>
  );
}

export default AddUser;