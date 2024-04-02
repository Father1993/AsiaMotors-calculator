let url = 'http://www.cbr.ru/DailyInfoWebServ/DailyInfo.asmx/GetCursOnDate'
let date = new Date() // текущая дата
let params = {
    On_date: date.toISOString(),
}

fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/soap+xml; charset=utf-8',
    },
    body: JSON.stringify(params),
})
    .then((response) => response.text())
    .then((data) => parseData(data))
    .catch((error) => console.error('Error:', error))

function parseData(xml) {
    let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(xml, 'text/xml')
    let table = xmlDoc.getElementsByTagName('ValuteCursOnDate')
    for (let i = 0; i < table.length; i++) {
        let row = table[i]
        let vcode = row.getElementsByTagName('Vcode')[0].childNodes[0].nodeValue
        if (vcode == '156') {
            // код юаня
            let vcurs =
                row.getElementsByTagName('Vcurs')[0].childNodes[0].nodeValue
            console.log('Курс юаня: ' + vcurs)
        }
    }
}
