import axios from "axios";
import {createInterface} from "readline";




let validToken = false, token = null;

/**
 * 
 * @param {string} t Token to check if it's valid 
 * @returns 
 */
export const checkToken = async (t) => {
    const url = 'https://discord.com/api/v9/users/@me',
        headers = {
            'Authorization': t
        },
        resp = await axios.get(url, { headers }).catch(err => err.response);

    validToken = resp.status === 200, token = t;

    return [resp.status === 200, resp.data];
}

/**
 * 
 * @param {number} ms Time to wait in milliseconds 
 * @returns 
 */
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/**
 * 
 * @param {string} question  Question to ask to the user
 * @returns 
 */
export const promptQ = (question) => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => rl.question(question, ans => {
        rl.close();
        resolve(ans);
    }))
}

/**
 * 
 * @param {number} house House to change to 
 */
export const changeHypesquad = async (house) => {
    if(!validToken) throw new Error("Invalid token, check your config.js file.");

    const url = 'https://discord.com/api/v9/hypesquad/online',
        headers = {
            'Authorization': token
        },
        data = {
            "house_id": house
        },
        resp = await axios.post(url, data, { headers }).catch(err => err.response);

    return [resp.status === 204, resp.data];
}

export const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",
    
    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[90m",
        crimson: "\x1b[38m" // Scarlet
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
        gray: "\x1b[100m",
        crimson: "\x1b[48m"
    }
};