const fs = require('fs');
const { argv } = require("yargs");
const envfile = require('envfile');
const { JsonRpcProvider } = require("moi.js/packages/moi-providers");

const deployContract = require("./deployLogic");

const encContent = fs.readFileSync(".env");
let parsedEnvContent = envfile.parse(encContent.toString());

let provider;
if(parsedEnvContent.RPC_PROVIDER) {
    provider = new JsonRpcProvider(parsedEnvContent.RPC_PROVIDER);
}else {
    throw new Error("no provider found");
}

if(argv.deployContract) {
    let logicID = await deployContract(provider, parsedEnvContent.SIGNER_ADDRESS);
    parsedEnvContent.MOQ_LOGIC_ID = logicID
    return fs.writeFileSync('.env', envfile.stringify(parsedEnvContent)) 
}

console.log("Other case coming soon...!");