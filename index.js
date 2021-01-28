
const RLP = require('rlp');
const createKeccakHash = require('keccak');

function keccak(arg) {
    return createKeccakHash('keccak256').update(arg).digest();
}

/**
 * returns ethereum smart contract address
 * @param {*} deployerAddress 
 * @param {*} nonce 
 */
function calcAddress(deployerAddress, nonce = 0) {
    // Encode the details using Recursive Length Prefix encoding (RLP).
    // RLP only supports sequences of bytes and arrays; for numbers
    // we strip leading zeros bytes (i.e. 0 is encoded as '0x')
    var encoded = RLP.encode([deployerAddress, nonce]);//нужно чтоб хэш был без лишних нолей
    //console.log("RLP:", encoded);
    
    // We take the hash of the encoded details
    var encodedHash = keccak(encoded);
    //console.log("keccak:", encodedHash.toString('hex'));

    // Take the last 20 bytes of the hash of the encoded details
    var contractAddress = "0x" + (encodedHash.slice(12)).toString('hex');
    //console.log("ctr:", contractAddress); // "0x3692e198f5aa6ce18a1420bc194d037af2370c17"
    return contractAddress;
}

module.exports = calcAddress;
