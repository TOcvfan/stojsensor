import axios from 'axios';
import config from '../helpers/config';
/*const https = require('https');

// Disable SSL certificate verification
const agent = new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
    agent: false,
});*/
const url = config.baseURL + config.path

const hent = async (setMessage, setError, sti) => {
    let res;
    //console.log(data)
    const hent = await axios({
        url: url + sti,
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }).then(d => {
        //console.log(d);
        setMessage(d)
        return d
    }).catch((error) => {
        if (error.response) {
            res = error.response.data;
            setMessage(res)
            setError(true)
            throw res;
        } else if (error.request) {
            res = error.request
            setError(true)
            setMessage(res)
            throw res
        } else {
            res = error.message
            setError(true)
            setMessage(res)
            throw res
        }
    })

    setMessage(hent.data)
    return hent.data
}

export default hent;