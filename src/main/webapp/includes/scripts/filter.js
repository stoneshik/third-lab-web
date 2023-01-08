function writeText(element, text) {
    if (element == null) {
        return;
    }
    if (typeof element.innerText !== 'undefined') {
        // IE8
        element.innerText = text;
    } else {
        // Остальные браузеры
        element.textContent = text;
    }
}

function cleanTextInElement(element) {
    writeText(element, '');
}

function writeErrorMessages(elementError, stringForOneError, stringForManyErrors, args) {
    let stringArr = [];
    for (let key in args) {
        if (args[key] === '' || args[key] == null) {
            stringArr.push(key);
        }
    }
    let stringArrCount = stringArr.length;
    if (stringArrCount === 1) {
        writeText(elementError, stringForOneError + stringArr[0]);
        return;
    }
    let stringErr = stringForManyErrors;
    for (let i=0; i < stringArrCount; i++) {
        if (i > 0) {
            stringErr += ",";
        }
        stringErr += " " + stringArr[i];
    }
    writeText(elementError, stringErr);
}

function findValueFromFieldset(fieldset) {
    if (fieldset == null || fieldset.elements == null) {
        return '';
    }
    for (let i=0; i < fieldset.elements.length - 1; i++) {
        let input = fieldset.elements[i];
        if (input.checked) {
            return input.value.trim();
        }
    }
    return '';
}

function getValuesStringFromFieldForForm(fieldX, fieldY, fieldR, formError) {
    let valueX = fieldX.value.trim();
    let valueY = fieldY.value.trim();
    let valueR = fieldR.value.trim();

    if (valueX === '' || valueY === '' || valueR === '') {
        writeErrorMessages(
            formError,
            'Передан пустой аргумент: ',
            'Переданы пустые аргументы:',
            {'X': valueX, 'Y': valueY, 'R': valueR}
        );
        return null;
    }
    return {'x': valueX, 'y': valueY, 'r': valueR};
}

function parseValuesFromStringForForm(valueX, valueY, valueR, formError) {
    const regex = '^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$';
    let resultX = valueX.match(regex);
    let resultY = valueY.match(regex);
    let resultR = valueR.match(regex);

    if (resultX == null || resultY == null || resultR == null) {
        writeErrorMessages(
            formError,
            'Неправильный формат аргумента: ',
            'Неправильный формат аргументов:',
            {'X': resultX, 'Y': resultY, 'R': resultR}
        );
        return null;
    }
    valueX = parseFloat(valueX);
    valueY = parseFloat(valueY);
    valueR = parseFloat(valueR);
    return {'x': valueX, 'y': valueY, 'r': valueR};
}

function filterForm(valueX, valueY, valueR, formError) {
    if ((valueX < -4.0 || valueX > 4.0) ||
        (valueY < -5.0 || valueY > 3.0) ||
        (valueR < 1.0 || valueR > 4.0)) {
        if (valueX < -4.0 || valueX > 4.0) {
            valueX = '';
        }
        if (valueY < -5.0 || valueY > 3.0) {
            valueY = '';
        }
        if (valueR < 1.0 || valueR > 4.0) {
            valueR = '';
        }
        writeErrorMessages(
            formError,
            'Значение выходит за допустимый диапазон: ',
            'Значения выходят за допустимый диапазон:',
            {'X': valueX, 'Y': valueY, 'R': valueR}
        );
        return false;
    }
    return true;
}

function submitForm(valueX, valueY, valueR, actionAddress) {
    $.post(
        actionAddress,
        {'x': valueX, 'y': valueY, 'r': valueR},
    );
}
