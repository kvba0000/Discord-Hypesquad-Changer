import config from "./config.js";
import { changeHypesquad, checkToken, colors, promptQ } from "./helper.js";
import { existsSync } from "fs";

const houses = ["Bravery", "Brilliance", "Balance"]

/**
 * Main function
 */
const main = async () => {

    let missingFiles = []; // Check if needed files are missing
    if(["./config.js"].some(file => {
        const notExisting = !existsSync(file)
        if(notExisting) missingFiles.push(file);
        return notExisting;
    })) return console.log(`${colors.fg.red}[-] Missing files: ${missingFiles.join(", ")}, please check your files or re-download the project.${colors.reset}`);

    // Check if token is valid
    const [isValidToken, tokenData] = await checkToken(config.token);
    if(!isValidToken) return console.log(`${colors.fg.red}[-] Invalid token, set your token if you didn't yet.${colors.reset}`);


    // Ask user for hypesquad house
    let house = null;
    while(house == null){
        console.log([
            `\n\n${colors.bg.blue}[🏠] Welcome ${tokenData.username}#${tokenData.discriminator} (${tokenData.id})${colors.reset}`,
            `${colors.fg.blue}[🏠] Choose your hypesquad house (check repo site for how they look like):`,
            houses.map((h,i) => `    ${i+1}. ${h}`).join("\n")
        ].join("\n"));
        house = Number(await promptQ("House: "))

        if(house > houses.length || house < 1 || isNaN(house)) house = null;
        if(house == null) console.log(colors.fg.red + "\nPlease provide a valid number!");
    }


    // Change hypesquad house
    console.log(`${colors.fg.yellow}[?] Changing to ${houses[house-1]}...${colors.reset}`);
    let [success, data] = await changeHypesquad(house);

    if(success) console.log(`${colors.fg.green}[✅] Successfully changed to ${houses[house-1]}!${colors.reset}`);
    else console.log(`${colors.fg.red}[-] Failed to change to ${houses[house-1]}, please try again later!${colors.reset}`);

}

main();