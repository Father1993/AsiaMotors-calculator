document.addEventListener('DOMContentLoaded', function () {
    // Добавляю копейки к курсу на цену в Китае
    const plusCurs = Number(0.2)

    // Добавляю копейки к расходам по Китаю
    const chinaPlus = Number(0.35)

    // Добавляю 2%
    const percent = Number(1.02)

    let sumBtn = document.getElementById('sumBtn')
    let checkboxNew = document.getElementById('newCars')
    let taxChina = document.getElementById('taxChina')
    let returnMoney = document.getElementById('returnMoney')

    let textInput = document.getElementById('taxChinaExp')
    let textInputTwo = document.getElementById('taxChinaNew')

    // Задаю начальные значения
    taxChina.value = 0
    returnMoney.value = 0

    // Добавляю инпуты если нажат чекбокс Новый авто
    checkboxNew.addEventListener('change', function () {
        if (checkboxNew.checked) {
            taxChina.style.display = 'block'
            returnMoney.style.display = 'block'
            textInput.style.display = 'block'
            textInputTwo.style.display = 'block'

            taxChina.value = '' // пользователь должен вписать значение сам
            returnMoney.value = '' // пользователь должен вписать значение сам
        } else {
            taxChina.style.display = 'none'
            returnMoney.style.display = 'none'
            textInput.style.display = 'none'
            textInputTwo.style.display = 'none'

            taxChina.value = 0
            returnMoney.value = 0
        }
    })

    // Функция расчета полной стоимости
    function calculate() {
        let curs = document.getElementById('exchange')
        let errorMessage = document.getElementById('error-message')
        if (!curs.value) {
            curs.style.outline = '2px solid red'
            errorMessage.textContent = 'Введите курс!'
            return
        } else {
            curs.style.outline = '' // Убираем красное обводку, если поле было заполнено
            errorMessage.textContent = '' // Очищаем сообщение об ошибке, если поле было заполнено
        }
        let price = document.getElementById('price')
        let expensesChina = document.getElementById('expensesChina')
        let taxRus = document.getElementById('taxRus')
        let expensesRus = document.getElementById('expensesRus')
        let commission = document.getElementById('commission')
        let totalPrice = document.getElementById('totalPrice')

        // Получаю значение чекбокса
        let isNewCar = checkboxNew.checked

        // Рассчитываю значение налога и возврата денег
        let taxChinaVal = 0
        let returnMoneyVal = 0
        if (isNewCar) {
            // Курс для расчета нового авто + 0.35к
            let newCarCursPlus = parseFloat(curs.value) + chinaPlus
            taxChinaVal = taxChina.value
                ? parseFloat(taxChina.value)
                : (parseFloat(price.value) / 11.3) * newCarCursPlus
            console.log(
                'Налог на приобретения нового авто в рублях: ',
                taxChinaVal
            )

            returnMoneyVal = parseFloat(price.value) * 0.08 * newCarCursPlus
            console.log(
                'Возврат НДС при покупке нового авто в рублях: ',
                returnMoneyVal
            )
        }

        // Курс + 0.20 по НЕМУ нужно считать
        let cursPlus = parseFloat(curs.value) + plusCurs
        console.log('Курс + 0.20 копеек:', cursPlus)

        let plusChina = parseFloat(curs.value) + chinaPlus
        console.log('Курс + 0.35 копеек:', plusChina)

        // Цена в рублях в Китае
        let priceRus = parseFloat(price.value) * cursPlus
        console.log('Цена в рублях: ', priceRus)

        // Расходы по Китаю в рублях
        let expensesInChina = parseFloat(expensesChina.value) * plusChina
        console.log('Расходы по китаю в рублях: ', expensesInChina)

        // Пошлина в РФ + 2%
        let dutyWithInterest = parseFloat(taxRus.value) * percent
        // Округляю значение до 2 знаков после запятой
        dutyWithInterest = dutyWithInterest.toFixed(2)
        // Из строки в число
        dutyWithInterest = Number(dutyWithInterest)
        console.log('Пошлина + 2%: ', dutyWithInterest)

        // Расходы в РФ в рублях
        let expensesRusInRub = parseFloat(expensesRus.value)
        console.log('Расходы в РФ в рублях: ', expensesRusInRub)

        // Комиссия компании в рублях
        let commissionCompany = parseFloat(commission.value)
        console.log('Комиссия компании в рублях: ', commissionCompany)

        let totalResult =
            priceRus + // Цена в рублях + 0.20к
            taxChinaVal + // Налог на новый авто (Цена в Китае / 11,3 * курс + 0.35к), если чекбокс отмечен
            expensesInChina + // Расходы по китаю + 0.35к
            dutyWithInterest + // Пошлина в РФ + 2%
            expensesRusInRub + // Расходы в РФ (фикс 95.000р)
            commissionCompany - // Комиссия компании
            returnMoneyVal // отнимает от ИТОГО возврат НДС, если чекбокс отмечен

        console.log('Окончательная ЦЕНА В РУБЛЯХ ', totalResult)

        // Вывожу результат в ИТОГО
        let totalResultFormatted = Number(
            totalResult.toFixed(2)
        ).toLocaleString('ru-RU')
        totalPrice.value = totalResultFormatted + ' ' + '₽'
    }

    sumBtn.addEventListener('click', calculate)
})
