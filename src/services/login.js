import { BehaviorSubject } from 'rxjs';
import config from '../helpers/config';
import { user } from '../helpers/users';
//import axios from 'axios';
let item;
if (typeof window !== 'undefined') {
    item = localStorage.getItem('currentUser')
}

const currentUserSubject = new BehaviorSubject(item);
const url = config.baseURL + config.path;

const login = async (data, setMessage) => {

    user.users.filter(u => {
        console.log(u)
        if (data.email === u.email) {
            localStorage.setItem('currentUser', u);
            currentUserSubject.next(u);
            setMessage(u)
            console.log(u, 'ting')
            return u
        } else {
            const error = { "error": true, "message": "Wrong password or no user" }
            //console.log(error)
            setMessage(error)
            throw error
        }
        //return u
    })

    /*const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: data
    };
    let res;

    await axios(`${url}login`, requestOptions).then(response => {
        res = response.data
        return res
    }).catch((error) => {
        if (error.response) {
            res = error.response.data;
            console.log(res)
            throw res;
        } else if (error.request) {
            console.log(error.request + ' request')
            res = error.request;
            throw res
        } else {
            console.log(error + ' else')
            res = error.message;
            throw res
        }
    }).finally(() => {
        localStorage.setItem('currentUser', res);
        currentUserSubject.next(res);
        setMessage(res)
        console.log(res, 'ting')
        return res
    });*/

}

export const authentication = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function logout() {
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}