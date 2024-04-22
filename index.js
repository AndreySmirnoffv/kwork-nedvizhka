require('dotenv').config({path: './assets/modules/.env'})
const TelegramApi = require('node-telegram-bot-api')
const bot = new TelegramApi(process.env.devStatus ? process.env.TEST_TOKEN : process.env.DEFAULT_TOKEN, {polling: true})
const fs = require('fs')
const { startKeyboard, locationKeyboard, placeKeyboard, typekeyboard } = require('./assets/keyboard/keyboard')
const commands = JSON.parse(fs.readFileSync('./assets/db/commands/commands.json'))
const db = require('./assets/db/db.json')

bot.setMyCommands(commands)

bot.on('message', async msg => {
    let user = db.find(user => user.username === msg.from.username)
    if (msg.text === '/start'){
        if(!user){
            db.push({
                username: msg.from.username,
                location: "",
                place: "",
                type: ""
            })
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
        }
        await bot.sendMessage(msg.chat.id, "Здравствуйте, я Бот по поиску недвижимости на о. Бали", startKeyboard)
    }
})

bot.on('callback_query', async msg => {
    const usernameToFind = msg.message.from.username
    let user = db.find(user => user.username === msg.message.from.username)

    switch(msg.data){
        case "location":
            await bot.sendMessage(msg.message.chat.id, "Выбери локаицю: ", locationKeyboard)
            user.location = msg.data
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case "bukit" || "sanur" || "kuta" || "ubud" || "islands":
            await bot.sendMessage(msg.message.chat.id, "Выбери место:", placeKeyboard)
            break
        case "listhold" || "frihold":
            await bot.sendMessage(msg.message.chat.id, "Выбери недвижимость: ", typekeyboard)
            break
        case "back":
            await bot.sendMessage(msg.message.chat.id, "Выбери локаицю: ", locationKeyboard)
            break
        case "backtwo":
            await bot.sendMessage(msg.message.chat.id, "Выбери место:", placeKeyboard)
            break
        case "backthree":
            await bot.sendMessage(msg.message.chat.id, "Выбери локаицю: ", locationKeyboard)
            break
    }
})

bot.on('polling_error', console.log)