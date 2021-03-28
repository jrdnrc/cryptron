require('dotenv').config()
const client = require ('./lib/auth')
const notifier      = require('node-notifier')

const MESSAGE_TRANSLATIONS = {
  'received': 'Order Received',
  'done': 'Order Filled'
}

const channel = {
  name: 'user',
  product_ids: ['BTC-GBP'],
};

client.ws.on('WebSocketEvent.ON_MESSAGE', message => {
    console.info(`Received message of type "${message.type}".`, message);

    if (!MESSAGE_TRANSLATIONS.hasOwnProperty(message.type)) {
      return
    }

    client
      .rest
      .order
      .getOrder(message.order_id)
      .then(order => {
        notifier.notify({
          title: message.type,
          message: `Order of £${Number.parseFloat(order.funds).toFixed(2)} ${message.type}.`,
          wait: false
        })

        console.log(order)
      })
});

client.ws.on('WebSocketEvent.ON_MESSAGE_ERROR', errorMessage => {
  throw new Error(`${errorMessage.message}: ${errorMessage.reason}`);
});

client.ws.on('WebSocketEvent.ON_OPEN', () => {
  client.ws.subscribe(channel);
});

client.ws.connect();