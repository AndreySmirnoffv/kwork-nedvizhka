const fs = require('fs')
const {google} = require('googleapis')

const auth = new google.auth.GoogleAuth({
    keyFile: "../../kwork-nedvizhka-4f021c2d96c0.json",
    scopes: ['https://googleapis.com/auth/spreadsheets']
})

async function readData(){
    const sheets = google.sheets({version: "v4",  auth})
    const spreadSheetId = '1yPFwg-ubjXRjGBPaQrIw_IItRaLF8Y64WfjfX_aHQbo'
    const range = 'Sheet1!A1:J20'
    try{
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: spreadSheetId, 
            range
        })
        console.log(response)
        const rows = response.data.values
        return rows
    }catch(error){
        console.log(error)
    }
}

(async () => {
    const data = await readData()
    console.log(data)
})

(async () => {
    const data = await readData()
    console.log(data)
})


module.exports = {
    readData: readData
}