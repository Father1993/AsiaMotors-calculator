document.addEventListener('DOMContentLoaded', function () {
    // Добавляю к курсу
    const plusCurs = Number(0.35)

    // Добавляю 1.5%
    const percent = Number(1.015)

    let sumBtn = document.getElementById('sumBtn')
    let checkboxNew = document.getElementById('newCars')
    let taxChina = document.getElementById('taxChina')
    let returnMoney = document.getElementById('returnMoney')

    // Задаю начальные значения
    taxChina.value = 0
    returnMoney.value = 0

    // Добавляю инпуты если нажат чекбокс Новый авто
    checkboxNew.addEventListener('change', function () {
        if (checkboxNew.checked) {
            taxChina.style.display = 'block'
            returnMoney.style.display = 'block'
            taxChina.value = '' // пользователь должен вписать значение сам
            returnMoney.value = '' // пользователь должен вписать значение сам
        } else {
            taxChina.style.display = 'none'
            returnMoney.style.display = 'none'
            taxChina.value = 0
            returnMoney.value = 0
        }
    })

    // Функция расчета полной стоимости
    function calculate() {
        let curs = document.getElementById('exchange')
        let price = document.getElementById('price')
        let expensesChina = document.getElementById('expensesChina')
        let taxRus = document.getElementById('taxRus')
        let expensesRus = document.getElementById('expensesRus')
        let commission = document.getElementById('commission')
        let taxRefund = document.getElementById('returnMoney')
        let totalPrice = document.getElementById('totalPrice')

        // Получаю значение чекбокса
        let isNewCar = checkboxNew.checked

        // Рассчитываю значение налога и возврата денег
        let taxChinaVal =
            isNewCar && taxChina.style.display !== 'none'
                ? parseFloat(taxChina.value) || 0
                : 0
        let returnMoneyVal =
            isNewCar && returnMoney.style.display !== 'none'
                ? parseFloat(returnMoney.value) || 0
                : 0

        // Вычисляю общую стоимость

        // Курс + 0.35 по НЕМУ нужно считать
        let cursPlus = parseFloat(curs.value) + plusCurs
        console.log('Курс + 0.35 копеек:', cursPlus)

        // Цена в рублях
        let priceRus = parseFloat(price.value) * cursPlus
        console.log('Цена в рублях: ', priceRus)

        // Расходы по китаю в рублях
        let expensesInChina = parseFloat(expensesChina.value) * cursPlus
        console.log('Расходы по китаю в рублях: ', expensesInChina)

        // Пошлина в РФ + 1.5%
        let dutyWithInterest = parseFloat(taxRus.value) * percent
        // Округляю значение до 2 знаков после запятой
        dutyWithInterest = dutyWithInterest.toFixed(2)
        // Из строки в число
        dutyWithInterest = Number(dutyWithInterest)
        console.log('Пошлина + 1.5%: ', dutyWithInterest)

        // Расходы в РФ в рублях
        let expensesRusInRub = parseFloat(expensesRus.value)
        console.log('Расходы в РФ в рублях: ', expensesRusInRub)

        // Комиссия компании в рублях
        let commissionCompany = parseFloat(commission.value)
        console.log('Комиссия компании в рублях: ', commissionCompany)

        let totalResult =
            priceRus + dutyWithInterest + expensesRusInRub + commissionCompany
        console.log('Окончательная ЦЕНА В РУБЛЯХ ', totalResult)

        // Вывожу результат в ИТОГО
        totalPrice.value = totalResult.toFixed(2)
    }

    sumBtn.addEventListener('click', calculate)
})
