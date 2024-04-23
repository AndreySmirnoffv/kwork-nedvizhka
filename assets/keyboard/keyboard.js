const { callbackify } = require("util");

module.exports = {
    startKeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Локация", callback_data: "location"}]
            ]
        })
    },
    locationKeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Букит", callback_data: "bukit"}, {text: "Санур", callback_data: "sanur"}, {text: "Кута", callback_data: "kuta"}, {text: "Убуд", callback_data: "ubud"}, {text: "Острова", callback_data: "islands"}],
                [{text: "Все", callback_data: "all"}],
                [{text: "Назад", callback_data: "back"}]
            ]
        })
    },
    placeKeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Листхолд", callback_data: "listhold"}, {text: "Фрихолд", callback_data: "frihold"}],
                [{text: "Все", callback_data: "alltwo"}],
                [{text: "Назад", callback_data: "backtwo"}],
            ]
        })
    },
    typekeyboard: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Гостинечный комплекс", callback_data: "hotel"}, {text: "Вилла", callback_data: "villa"}, {text: "Аппартаменты", callback_data: "appartments"}, {text: "Земля", callback_data: "ground"}],
                [{text: "Все", callback_data: "allthree"}],
                [{text: "Назад", callback_data: "backthree"}]
            ]
        })
    }
}