import axios from 'axios';

// Variables
const BASE_URL = process.env.URL || '';

// <--------Functions------->
// getCards
// getUsers
// handleLogin
// handleSignup
// logout
// updateAssignee
// updateDescTitle
// updatePriority
// updateReporter
// updateStatus


// Taskboard.js
export const getCards = function (setCards) {
    axios.get(`${BASE_URL}/task/all`, {
        headers: {
            'x-auth': sessionStorage.getItem('x-auth')
        }
    })
        .then((res) => {
            setCards(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}
// Home.js
export const getUsers = function (setWorkers) {
    axios.get(`${BASE_URL}/user/getUsers`, {
        headers: {
            'x-auth': sessionStorage.getItem('x-auth')
        }
    })
        .then(res => {
            setWorkers(res.data.map(worker => {
                return {
                    'title': worker.name,
                    'id': worker.id
                }
            }));
        })
        .catch(err => {
            console.log(err);
        })
}
// Login.js
export const handleLogin = function (data, setMessage, setSeverity, setOpen) {
    axios.post(`${BASE_URL}/user/login`,
        {
            email: data.get('email'),
            password: data.get('password'),
        })
        .then((res) => {
            const header = res.headers['x-auth']
            sessionStorage.setItem('x-auth', header);
            setMessage("Login Successful.");
            setSeverity("success");
            setOpen(true);
            window.location.href = "/home"; // Successful Login
        })
        .catch(err => {
            console.clear();
            if (err.response) {

                setMessage(err.response.data.message);
                setSeverity("error");
                setOpen(true);
            }
        })
}
//Signup.js
export const handleSignup = function (data, desig, setMessage, setSeverity, setOpen) {
    axios.post(`${BASE_URL}/user/signup`, {

        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        contact: data.get('phone'),
        desig: desig

    }).then((res, err) => {
        setSeverity("success");
        setMessage(res.data.message);
        setOpen(true);
    }).catch(err => {
        console.clear();
        if (err.response && err.response.status === 409) {
            setMessage("Error: Email Address Already Registered!");
        }
        else {
            setMessage("Error: Cannot Connect to Server!");
        }
        setSeverity("error");
        setOpen(true);
    })
}

// home.js
export const logout = function () {
    axios.delete(`${BASE_URL}/user/logout`, {
        headers: {
            'x-auth': sessionStorage.getItem('x-auth')
        }
    })
        .then((res) => {
            sessionStorage.clear();
            window.location.href = '/';
        })
        .catch(err => {
        })
}

// TaskCard.js, TaskCardLV.js
export const updateAssignee = function (assignee, id) {
    axios.patch(`${BASE_URL}/task/assignworker`,
        {
            assignee: assignee,
            id: id
        },
        {
            headers: {
                'x-auth': sessionStorage.getItem('x-auth')
            }
        }
    ).then((res) => {
    })
        .catch(err => {
        })
}
// Desc.js
export const updateDescTitle = function (title, description, id) {
    axios.patch(`${BASE_URL}/task/updatedesctitle`,
        {
            title: title,
            description: description,
            id: id
        },
        {
            headers: {
                'x-auth': sessionStorage.getItem('x-auth')
            }
        }
    ).then((res) => {
    })
        .catch(err => {
        })
}
// Info.js
export const updatePriority = function (priority, id) {

    axios.patch(`${BASE_URL}/task/updatepriority`,
        {
            priority: priority,
            id: id
        },
        {
            headers: {
                'x-auth': sessionStorage.getItem('x-auth')
            }
        }
    ).then((res) => {

    })
        .catch(err => {
        })
}
// TaskCard.js, TaskCardLV.js
export const updateReporter = function (reporter, id) {

    axios.patch(`${BASE_URL}/task/updatereporter`,
        {
            reporter: reporter,
            id: id
        },
        {
            headers: {
                'x-auth': sessionStorage.getItem('x-auth')
            }
        }
    ).then((res) => {

    })
        .catch(err => {
        })
}
// Info.js
export const updateStatus = function (status, id) {

    axios.patch(`${BASE_URL}/task/updatestatus`,
        {
            status: status,
            id: id
        },
        {
            headers: {
                'x-auth': sessionStorage.getItem('x-auth')
            }
        }
    ).then((res) => {

    })
        .catch(err => {
        })
}