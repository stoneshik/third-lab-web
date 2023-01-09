// Фильтрация и обработка формы
//const nameIdForm = 'dot-form';
// объекты форм
const mainForm = {
    name: 'dot-form',
    form: undefined,
    fields: {x: undefined, y: undefined, r: undefined},
    formError: document.getElementById('form-error'),
};
const hiddenForm = {
    name: 'canvas_hidden_form',
    form: undefined,
    fields: {x: undefined, y: undefined, r: undefined},
};
function setMainFormData(mainForm) {
    mainForm.form = document.getElementById(mainForm.name);
    mainForm.fields = {
        x: document.getElementById(mainForm.name + ':x'),
        y: document.getElementById(mainForm.name + ':y'),
        r: document.getElementById(mainForm.name + ':r'),
    };
}
function setHiddenFormData(hiddenForm) {
    hiddenForm.form = document.getElementById(hiddenForm.name);
    hiddenForm.fields = {
        x: document.getElementById(hiddenForm.name + ':x_hidden'),
        y: document.getElementById(hiddenForm.name + ':y_hidden'),
        r: document.getElementById(hiddenForm.name + ':r_hidden'),
    };
}

// вспомогательные функции
function setAttr(element, valueName, value) {
    element.setAttribute(valueName, value);
}
function removeAttr(element, nameAttr) {
    element.removeAttribute(nameAttr);
}
function removeClass(element, className) {
    element.classList.remove(className);
}
function addClass(element, nameClass) {
    element.classList.add(nameClass);
}

/*function canvasHandler(e) {
    cleanTextInElement(canvasError);
    const regex = '^[-+]?[0-9]{0,9}(?:[.,][0-9]{1,9})*$';
    let valueR = fieldR.value.trim();
    if (valueR === '') {
        writeText(canvasError, "Параметр R не задан");
        return 0;
    }
    let resultR = valueR.match(regex);
    if (resultR == null) {
        writeText(canvasError, "Параметр R не правильный");
        return 0;
    }
    valueR = parseFloat(valueR);
    if (valueR < 1.0 || valueR > 5.0) {
        writeText(canvasError, "Параметр R выходит за допустимый диапазон");
        return 0;
    }
    let xy = calcCoordinates(canvasObj, e.offsetX, e.offsetY, valueR);
    if (!filterForm(xy['x'], xy['y'], valueR, formError)) {
        return 0;
    }
    /*$.post(
        '/ControllerServlet',
        {'x': xy['x'], 'y': xy['y'], 'r': valueR},
        function() {
            location.reload();
        }
    );*/
    //submitForm(xy['x'], xy['y'], valueR);
//}

function canvasHandler(e) {
    canvas.setAttribute('x', e.offsetX);
    canvas.setAttribute('y', e.offsetY);
}

// Отображение времени в соотвествии с временным поясом у клиента
const results = document.getElementById("results");

function parseTime(t) {
    const regexp = /(\d+)(?::(\d\d))?\s*(p?)/;
    let date = new Date();
    let time = t.match(regexp);
    date.setUTCHours(parseInt(time[1]) + (time[3] ? 12 : 0));
    date.setUTCMinutes(parseInt(time[2]) || 0);
    return date;
}

function timeReduction(times) {
    let timeDate;
    for (let i=0; i < times.length; i++) {
        timeDate = parseTime(times[i].textContent);
        writeText(
            times[i].textContent,
            timeDate.getHours() + ':' + timeDate.getMinutes() + ':' + timeDate.getSeconds()
        );
    }
}

function updateCanvasByAjax(onEvent) {
    if (onEvent.status === 'success') {
        updateCanvas();
    }
}

function handlerHiddenFormForCanvas(onEvent) {
    if (onEvent.status === 'begin') {
        setTimeout(
            () => {
                //console.log('r');
                const offsetX = parseInt(canvas.getAttribute('x').trim());
                const offsetY = parseInt(canvas.getAttribute('y').trim());
                if (offsetX === undefined || offsetY === undefined || isNaN(offsetX) || isNaN(offsetY)
                    || offsetX == null || offsetY == null) {
                    return;
                }
                const r = parseFloat(mainForm.fields.r.value.trim());
                if (r === undefined || isNaN(r) || r == null) {
                    return;
                }
                const xy = calcCoordinates(canvasObj, offsetX, offsetY, r);
                const x = xy['x'].toFixed(4);
                const y = xy['y'].toFixed(4);
                if (x === undefined || y === undefined || x == null || y == null) {
                    return;
                }
                setAttr(hiddenForm.fields.x, 'value', x);
                setAttr(hiddenForm.fields.y, 'value', y);
                setAttr(hiddenForm.fields.r, 'value', r);
            }, 100
        );
        /*const offsetX = parseInt(canvas.getAttribute('x').trim());
        const offsetY = parseInt(canvas.getAttribute('y').trim());
        if (offsetX === undefined || offsetY === undefined || isNaN(offsetX) || isNaN(offsetY)
            || offsetX == null || offsetY == null) {
            return;
        }
        const r = parseFloat(mainForm.fields.r.value.trim());
        if (r === undefined || isNaN(r) || r == null) {
            return;
        }
        const xy = calcCoordinates(canvasObj, offsetX, offsetY, r);
        const x = xy['x'];
        const y = xy['y'];
        if (x === undefined || y === undefined || x == null || y == null) {
            return;
        }
        setAttr(hiddenForm.fields.x, 'value', x);
        setAttr(hiddenForm.fields.y, 'value', y);
        setAttr(hiddenForm.fields.r, 'value', r);*/
    } else if (onEvent.status === 'success') {
        //console.log(onEvent);
        updateCanvas();
    }
}

// Вызов всех функций
window.onload = function() {
    //form.addEventListener('submit', formHandler);
    setMainFormData(mainForm);
    setHiddenFormData(hiddenForm);
    updateCanvas();
    //drawCanvas(canvas, canvasObj);
    canvas.addEventListener('click', canvasHandler);
    //if (times.length > 0) {timeReduction(times);}
}


// Функции вызываются из шаблона
function cleanAllCommandLink() {
    const elements = document.querySelectorAll('.option-command-link-selected');
    for (let i=0; i < elements.length; i++) {
        removeAttr(elements[i], 'class');
    }
}
function selectCommandLink(element, num, idSelect) {
    cleanAllCommandLink();
    const commandLink = document.getElementById(idSelect);
    addClass(commandLink, 'option-command-link-selected');
    setAttr(element, 'value', num);
}
function selectX(num, idSelect) {
    selectCommandLink(mainForm.fields.x, num, idSelect);
}