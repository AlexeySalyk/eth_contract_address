# eth_contract_address
Recovers ethereum smart contract address

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install eth_contract_address.

```bash
npm install eth_contract_address
```

## Usage

```js
const ctrAddressRecovery = require('./index');
let contractAddress = ctrAddressRecovery('0x36928500Bc1dCd7af6a2B4008875CC336b927D57',6);
console.log(contractAddress); //0xdac17f958d2ee523a2206206994597c13d831ec7

```

## License

[MIT](https://choosealicense.com/licenses/mit/)