import axios from 'axios';

// Taskboard.js
export const getCards = function (setCards) {
    axios.get('/task/all', {
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
    axios.get('/user/getUsers', {
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