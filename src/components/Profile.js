import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import { FormGroup, FormControl, InputLabel, Input, Button, Typography } from '@material-ui/core';

// Custom Components & API functions
import AppDrawer from './AppDrawer';
import { getUser, updateUser } from '../APIfunctions'

const useStyles = makeStyles(theme => ({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
}));

const ProfilePage = (props) => {
    const classes = useStyles();
    let history = useHistory();
    const [userInfo, setUserInfo] = useState({});
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [newUserJob, setNewUserJob] = useState('');
    const [newUserAge, setNewUserAge] = useState(0);

    const goBack = () => {
        history.goBack();
    };

    const getOldInfo = async () => {
        let editID = sessionStorage.getItem('editID');
        let usersInfo = await getUser(editID).then(response => response.json());
        setUserInfo(usersInfo);
    };

    const saveNewInfo = async () => {
        let data = {
            userID: sessionStorage.getItem('editID'),
            email: newUserEmail,
            first_name: newUserName,
            job: newUserJob,
            age: newUserAge
        }
        let result = await updateUser(data);
        getOldInfo();
    };

    const getNewEmail = (e) => {
        let email = e.target.value;
        setNewUserEmail(email);
    };

    const getNewName = (e) => {
        let name = e.target.value;
        setNewUserName(name);
    };

    const getNewJob = (e) => {
        let job = e.target.value;
        setNewUserJob(job);
    };

    const getNewAge = (e) => {
        let age = e.target.value;
        setNewUserAge(age);
    };

    useEffect(() => {
        getOldInfo();
    }, []);

    return (
        <>
            <AppDrawer/>
            <FormGroup className={classes.container}>
                <Typography variant="h4" style={{ textAlign: 'center' }}>Edit Information</Typography>
                <FormControl>
                    <InputLabel>{userInfo.email}</InputLabel>
                    <Input onChange={getNewEmail}id="my-input"/>
                </FormControl>
                <FormControl>
                    <InputLabel>{userInfo.first_name}</InputLabel>
                    <Input onChange={getNewName}id="my-input"/>
                </FormControl>
                <FormControl>
                    <InputLabel>{userInfo.job}</InputLabel>
                    <Input onChange={getNewJob} id="my-input" />
                </FormControl>
                <FormControl>
                    <InputLabel>{userInfo.age}</InputLabel>
                    <Input onChange={getNewAge} id="my-input"/>
                </FormControl>
                <FormControl>
                    <Button variant="contained" color="primary" onClick={saveNewInfo}>Edit User</Button>
                    <Button variant="contained" color="secondary" style={{marginTop: '2%'}} onClick={goBack}>Go Back to All Users</Button>
                </FormControl>
            </FormGroup>
        </>
    );
};

export default ProfilePage;