
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'YOUR_SERVER_IP', // change to your server IP
  port: 25565,       // change if needed
  username: 'AntiAFKBot' // Change The Name (If You Want
})

bot.on('spawn', () => {
  console.log('Bot spawned! Starting movement loop...')
  startMovementLoop()
})

bot.on('death', () => {
  console.log('Bot died! Respawning and restarting loop...')
  setTimeout(() => {
    startMovementLoop()
  }, 3000)
})

let movementInterval
let jumpInterval

function startMovementLoop() {
  // Clear previous intervals if any
  if (movementInterval) clearInterval(movementInterval)
  if (jumpInterval) clearInterval(jumpInterval)

  const actions = [
    'forward',
    'right',
    'back',
    'left'
  ]

  let index = 0

  movementInterval = setInterval(() => {
    // Stop all movement
    bot.setControlState('forward', false)
    bot.setControlState('back', false)
    bot.setControlState('left', false)
    bot.setControlState('right', false)

    const action = actions[index]
    bot.setControlState(action, true)

    index = (index + 1) % actions.length
  }, 2000)

  // Jump every 2 seconds
  jumpInterval = setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(() => {
      bot.setControlState('jump', false)
    }, 300)
  }, 2000)
}

bot.on('end', () => {
  console.log('Bot disconnected. Reconnecting...')
  setTimeout(() => {
    process.exit(1)
  }, 5000)
})
