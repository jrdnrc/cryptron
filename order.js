require('dotenv').config()
const client = require ('./lib/auth')
const argv = require('yargs')(process.argv.slice(2))
    .number('purchase')
    .option('exact', {
        alias: 'e',
        default: false,
        type: 'boolean'
    })
    .demandOption('purchase')
    .argv


const funds = argv.exact
    ? Number.parseFloat(argv.purchase * (1+(.005/.995))).toFixed(2)
    : argv.purchase

!(async () => {
    try {
        const order = await client.rest.order.placeOrder({
            product_id: 'BTC-GBP',
            type: 'market',
            side: 'buy',
            funds,
        })

        console.log(order)
    } catch (err) {
        console.error(err.message)
    }
})()