import axios from 'axios';

const headers = {
    // 'Cache-Control': 'private',
    // 'Pragma': 'no-cache',
    // 'Expires': '0',
    'x-auth': sessionStorage.getItem('x-auth')
}
// Variables
const BASE_URL = process.env.URL || '';


// <--------Functions------->
// Create Request
// getCards
// getCategories
// getUsers
// getUserTasks
// handleLogin
// handleSignup
// logout
// publishComment
// updateAssignee
// updateDate
// updateDescTitle
// updatePriority
// updateReporter
// updateStatus


//CreateRequest.js
export const createRequest = function (title, description, location, category) {
    axios.post(`${BASE_URL}/task/add`, {
        title: title,
        description: description,
        location: location,
        category: category
    },
        { headers: headers })
        .then(res => {
            console.log(res);
        })
}
// Taskboard.js
export const getCards = function (setCards, setLoading) {
    if (!setLoading) {
        setLoading = () => { }
    }
    axios.get(`${BASE_URL}/task/all`, {
        headers: headers
    })
        .then((res) => {
            setCards(res.data);
            setLoading(false);
        })
        .catch(err => {
            setLoading(false);
        })
}
// Signup.js
export const getCategories = function (setCategories) {
    axios.get(`${BASE_URL}/user/getCategories`, {
        headers: headers,
    })
        .then(res => {
            setCategories(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}
// Home.js
export const getUsers = function (setWorkers) {
    axios.get(`${BASE_URL}/user/getUsers`, {
        headers: headers
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

export const getUserTasks = function (setCards, setLoading) {
    axios.get(`${BASE_URL}/task/usertasks`, {
        headers: headers
    }).then(res => {
        setCards(res.data);
        setLoading(false);
    })
        .catch(err => {
            setLoading(false);
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
export const handleSignup = function (data, desig, category, setMessage, setSeverity, setOpen) {
    axios.post(`${BASE_URL}/user/signup`, {

        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        contact: data.get('phone'),
        desig: desig,
        category: (data.get('category') || category || '')

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
        headers: headers
    })
        .then((res) => {
            sessionStorage.clear();
            window.location.href = '/';
        })
        .catch(err => {
        })
}

// Comments.js
export const publishComment = function (message, id, setComment) {
    axios.post(`${BASE_URL}/task/addComment`,
        {
            message: message,
            tId: id
        },
        {
            headers: headers
        })
        .then((res) => {
            setComment(res.data);
        })
        .catch(err => {
            console.log(err);
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
// Info.js
export const updateDate = function (date, tId) {
    axios.patch(`${BASE_URL}/task/updatedate`,
        {
            tId: tId,
            date: date
        },
        {
            headers: headers
        })
        .then((res) => {
            console.log(res)
        })
        .catch(err => {
            console.log(err);
        })
}
// Desc.js
export const updateDescTitle = function (title, description, location, id) {
    axios.patch(`${BASE_URL}/task/updatedesctitle`,
        {
            title: title,
            description: description,
            location: location,
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