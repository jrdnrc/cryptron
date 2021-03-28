const {CoinbasePro} = require('coinbase-pro-node');

const auth = {
    apiKey: process.env.COINBASE_API_KEY,
    apiSecret: process.env.COINBASE_API_SECRET,
    passphrase: process.env.COINBASE_API_PASSPHRASE,
    useSandbox: true,
}

const client = new CoinbasePro(auth)

module.exports = client