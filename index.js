
const RLP = require('rlp');
const createKeccakHash = require('keccak');

function keccak(arg) {
    return createKeccakHash('keccak256').update(arg).digest();
}

/**
 * Converts to a checksum address
 *
 * @method toChecksumAddress
 * @param {String} address the given HEX address
 * @return {String}
 */
function toChecksumAddress(address) {
    if (typeof address === 'undefined') return '';

    if(!/^(0x)?[0-9a-f]{40}$/i.test(address))
        throw new Error('Given address "'+ address +'" is not a valid Ethereum address.');



    address = address.toLowerCase().replace(/^0x/i,'');
    var addressHash = keccak(address).toString('hex').replace(/^0x/i,'');
    var checksumAddress = '0x';

    for (var i = 0; i < address.length; i++ ) {
        // If ith character is 8 to f then make it uppercase
        if (parseInt(addressHash[i], 16) > 7) {
            checksumAddress += address[i].toUpperCase();
        } else {
            checksumAddress += address[i];
        }
    }
    return checksumAddress;
};

/**
 * returns ethereum smart contract address
 * @param {*} deployerAddress 
 * @param {*} nonce 
 */
function calcAddress(deployerAddress, nonce = 0) {
    // Encode the details using Recursive Length Prefix encoding (RLP).
    // RLP only supports sequences of bytes and arrays; for numbers
    // we strip leading zeros bytes (i.e. 0 is encoded as '0x')
    var encoded = RLP.encode([deployerAddress, nonce]);
    //console.log("RLP:", encoded);
    
    // We take the hash of the encoded details
    var encodedHash = keccak(encoded);
    //console.log("keccak:", encodedHash.toString('hex'));

    // Take the last 20 bytes of the hash of the encoded details
    var contractAddress = "0x" + (encodedHash.slice(12)).toString('hex');
    //console.log("ctr:", contractAddress); // "0x3692e198f5aa6ce18a1420bc194d037af2370c17"
    
   return toChecksumAddress(contractAddress);
}

module.exports = calcAddress;
