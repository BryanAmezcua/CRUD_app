const usersEndPoint = 'http://localhost:8000/users';

export const getUsers = async (pageNum) => {       
    return await fetch(`${usersEndPoint}/?_page=${pageNum}&_limit=5`, {
        headers: {
            'Content-Type': 'application/json',
            'contentType': 'application/json'
        }
    }).then(response => response.json());  
};

export const getRecordCount = async () => {
    return fetch(`${usersEndPoint}/?_page=1&_limit=1`, {
        headers: {
            'Content-Type': 'application/json',
            'contentType': 'application/json'
        }
    }).then(response => {
        let headers = [];
        for (let entry of response.headers.entries()) {
            headers.push(entry);
        }
        return headers;
    });
};

export const addUser = async (user) => {
    return await fetch(usersEndPoint, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

export const deleteUser = async (id) => {
    return await fetch(`${usersEndPoint}/${id}`, {
        method: 'DELETE'
    })
};

export const getUser = async (id) => {
    return await fetch(`${usersEndPoint}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'contentType': 'application/json'
        }
    });
};

export const updateUser = async (user) => {
    return await fetch(`${usersEndPoint}/${user.userID}`, {method: 'PUT', body: JSON.stringify(user), headers:{'Content-Type': 'application/json'}}).then(response => response.json());
};