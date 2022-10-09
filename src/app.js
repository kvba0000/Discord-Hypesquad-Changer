import axios from "axios";
import { readFileSync } from "node:fs";
import {createInterface} from "node:readline";
(async()=>{
    console.clear();
    process.title = "why am i even putting title to this"

    var config = JSON.parse(readFileSync("../config.json").toString()), // config
        rl = createInterface(process.stdin, process.stdout), // readline interface
        /**
         * Sends a question to the user and returns the answer.
         * @param {string} question - question
         * @returns {Promise<string>} - answer
         */
        q = async (p) => {
            return new Promise((resolve, reject) => {
                rl.question(p, (answer) => {
                    resolve(answer);
                    rl.pause();
                });
            });
        }

        // checking if the token is valid
    if(!config.token || new RegExp(/[\w]{24}\.[\w]{6}\.[\w-_]{27}/).test(config.token) === false) {
        console.log("\x1b[31mNo token provided!\x1b[0m");
        process.exit(1);
    }

    var houses = [
        "Bravery", "Brilliance", "Balance"
    ]

    //loop until user chooses correct house
    while(true){
        console.clear();
        console.log(`
        \x1b[34m
        Discord Hypesquad Changer
        Created by: kob\x1b[0m
            
        \x1b[36mPick Hypesquad House:\n${houses.map((h,i) => `       ${i+1}.${h}`).join("\n")}`);
        
    var answer = await q("      > ");
    if(Number(answer) > 0 && Number(answer) < 4){
        break;
    }
    }

    console.log(`\n\nChanging to ${houses[Number(answer)]}...\x1b[0m`);
    axios.post("https://discord.com/api/v9/hypesquad/online", { // sending request to discord about house change
        "house_id": answer
    },{
        "headers": {
            "Authorization": config.token,
        }
    }).then(r => { // respnonse handler
        console.log("\n\n\x1b[32mChanged!\x1b[0m");
        process.exit(0);
    }).catch(e => { // error handling
        var error = "";
        switch(e.response.status){
            case 400:
                error = "Bad request error, probably script is outdated, check if you have the latest version of the script, and if yes, wait for it to be updated.";
                break;
            case 401:
                error = "Unauthorized error, probably you have provided an invalid token.";
                break;
            case 403:
                error = "Forbidden error.";
                break;
            case 429:
                var time = e.response.data.retry_after;
                error = `Too many requests error, try again in a few seconds (${time}), because you got rate limitted.`;
                break;
        }
        console.log(`\n\n\x1b[31mError!\n${error}\x1b[0m`);
        process.exit(1);
    })
    





    
})()
