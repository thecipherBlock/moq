const { LogicFactory } = require("moi.js/packages/moi-logic");
const manifest = require("./api/manifests/moq.json");
/**
 *
 * @param {JsonRpcProvider} provider RPC provioder
 * @param {String} signer Signer address
 * @returns logicID
 */
module.exports = async function(provider, signer) {
    const deployerOptions = {
        builderName: "MOQ!",
        arguments: [
            100
        ]
    }
    const _lFactory = new LogicFactory(manifest, provider);
    return new Promise((resolve, reject) => {
        _lFactory.deploy(
            deployerOptions, 
            (err) => reject(err)
        ).send({
            sender: signer,
            fuelPrice: "0x130D41",
            fuelLimit: "0x130D41"
        }).then(async ixResponse => {
            try {
                const logicObject = await ixResponse.result(ixResponse.hash);
                resolve(logicObject.logic_id);
            }catch(e) {
                reject(e);
            }
        }).catch(err => reject(err))
    })
}
