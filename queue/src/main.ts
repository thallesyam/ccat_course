import amqp from 'amqplib'

async function init() {
  const connection = await amqp.connect("amqp://localhost")
  const channel = await connection.createChannel()
  await channel.assertExchange('checkout', 'direct', { durable: true })
  await channel.assertQueue('checkout.a', { durable: true })
  await channel.assertQueue('checkout.b', { durable: true })
  await channel.bindQueue('checkout.a', 'checkout', 'payment')
  await channel.bindQueue('checkout.b', 'checkout', 'stock')
  const event = { orderItems: [{ idItem: 1, quantity: 1 }] }
  await channel.consume('checkout.a', (msg: any) => {
    console.log('a', msg.content.toString());
    channel.ack(msg)
  })
  await channel.consume('checkout.b', (msg: any) => {
    console.log('b', msg.content.toString());
    channel.ack(msg)
  })
  channel.publish('checkout', 'payment', Buffer.from(JSON.stringify(event)))
  setTimeout(() => { connection.close() }, 500)
}

init()