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
// getBranch
// getCards
// getCategories
// getTask
// getUser
// getUsers
// getUserTasks
// handleLogin
// handleSignup
// logout
// publishComment
// updateAssignee
// updateBranchData
// updateDate
// updateDescTitle
// updatePriority
// updateReporter
// updateStatus
// updateUser
// submitReview


//CreateRequest.js
export const createRequest = function (title, description, location, branch, category, subCat, type) {
    axios.post(`${BASE_URL}/task/add`, {
        type: type,
        title: title,
        description: description,
        location: location,
        category: category,
        branch: branch,
        subCategory: subCat
    },
        { headers: headers })
        .then(res => {
            window.location.reload();
        })
}
// Branch.js
export const getBranch = function (setBranches, id) {
    if (!id)
        id = 3;
    axios.get(`${BASE_URL}/user/getbranch/${id}`, {
        headers: headers
    }).then(res => {
        setBranches(res.data);
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

// CardSearch.js
export const findTask = function (setData, tId) {
    axios.get(`${BASE_URL}/task/findtask/${tId || 0}`, {
        headers: headers
    })
        .then((res) => {
            setData(res.data)
        })
        .catch(err => console.log(err))
}

// Dashboard.js
export const getUser = function (setUser, uId) {
    const params = {}
    if (uId) {
        params['id'] = uId;
    }
    axios.get(`${BASE_URL}/user/getUser/${uId || '1'}`, {
        headers: headers
    })
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            // console.log(err);
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

export const getUserTasks = function (setCards, setLoading, uId) {
    if (!setLoading)
        setLoading = () => { }
    axios.get(`${BASE_URL}/task/usertasks/${uId || '2'}`, {
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
export const handleSignup = function (data, desig, branch, setMessage, setSeverity, setOpen) {
    axios.post(`${BASE_URL}/user/signup`, {

        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        contact: data.get('phone'),
        desig: desig,
        Branch: branch

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
            headers: headers
        }
    ).then((res) => {
    })
        .catch(err => {
        })
}

// Branch.js
export const updateBranchData = function (name, branch) {
    branch.name = name;
    axios.patch(`${BASE_URL}/user/updateBranch`, {
        branch
    },
        { headers: headers })
        .then((res) => {
            console.log(res.data);
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
        })
        .catch(err => {
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
            headers: headers
        })
        .then((res) => {
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
            headers: headers
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
            headers: headers
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
            headers: headers
        }
    ).then((res) => {

    })
        .catch(err => {
        })
}
// EditProfileCard.js
export const updateUser = function (data) {
    console.log(data)
    axios.patch(`${BASE_URL}/user/updateUser`,
        {
            Branch: data.branch,
            name: data.name,
            contact: data.contact
        },
        {
            headers: headers
        }).then((res) => {
        }).catch(err => { })
}
// CompletedCard.js
export const submitReview = function (stars, id, text, setRefresh, refresh) {
    axios.post(`${BASE_URL}/task/submitrating`,
        {
            stars: stars,
            id: id,
            text: text
        },
        { headers: headers }
    ).then(res => {
        let temp = refresh.current;
        setRefresh(!temp);
    })
        .catch(err => {
            // console.log(err);
        })
}