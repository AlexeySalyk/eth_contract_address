# eth_contract_address_recovery v1.1.0

Recovers ethereum smart contract address deployed by a create opcode (create2 is not supported)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install eth_contract_address_recovery.

```bash
npm install eth_contract_address_recovery
```

## Usage

```js
const ctrAddressRecovery = require('eth_contract_address_recovery');
let contractAddress = ctrAddressRecovery('0x36928500Bc1dCd7af6a2B4008875CC336b927D57',6);
console.log(contractAddress); //0xdAC17F958D2ee523a2206206994597C13D831ec7

```

## License

[MIT](https://choosealicense.com/licenses/mit/)