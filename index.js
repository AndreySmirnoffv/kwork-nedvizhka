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
    let user = db.find(user => user.username === msg.from.username)

    switch(msg.data){
        case "location":
            await bot.sendMessage(msg.message.chat.id, "Выбери локаицю: ", locationKeyboard)
            break
        case "bukit":
            await bot.sendMessage(msg.message.chat.id, "Выбери место:", placeKeyboard)
            user.location = "Букит"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case 'sanur':
            await bot.sendMessage(msg.message.chat.id, "Выбери место:", placeKeyboard)
            user.location = "Санур"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case 'kuta':
            await bot.sendMessage(msg.message.chat.id, "Выбери место:", placeKeyboard)
            user.location = "Кута"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case 'ubud':
            await bot.sendMessage(msg.message.chat.id, "Выбери место:", placeKeyboard)
            user.location = "Убуд"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
        case 'islands':
            await bot.sendMessage(msg.message.chat.id, "Выбери место:", placeKeyboard)
            user.location = "Острова"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case "listhold":
            await bot.sendMessage(msg.message.chat.id, "Выбери недвижимость: ", typekeyboard)
            user.place = "Листхолд"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case 'frihold':
            await bot.sendMessage(msg.message.chat.id, "Выбери недвижимость: ", typekeyboard)
            user.place = "Фрихолд"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case "hotel":
            user.type = "Гостинечный комеплекс"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case "villa":
            user.type = "Вилла"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case 'appartments':
            user.type = "appartments"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case 'ground': 
            user.type = "Земля"
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
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
        case 'all':
            user.location = ["Букит", "Санур", "Кута", "Убуд"]
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case 'alltwo':
            user.place = ["Листхолд", "Фрихолд"]
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
        case "allthree":
            user.place = ["Гостинечный комеплекс", "Вилла", "Аппартаменты", "Земля"]
            fs.writeFileSync('./assets/db/db.json', JSON.stringify(db, null, '\t'))
            break
    }
})

bot.on('polling_error', console.log)