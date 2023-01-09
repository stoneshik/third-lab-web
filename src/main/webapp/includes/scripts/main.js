// Объекты форм
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

// Вспомогательные функции
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


// Запись координат клика мыши по канвасу в атрибуты x и y канваса
function canvasHandler(e) {
    canvas.setAttribute('x', e.offsetX);
    canvas.setAttribute('y', e.offsetY);
}
// Обновление значений формы при клике на канвас
function clickOnCanvasHandler() {
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
}

// Вызов всех функций
window.onload = function() {
    setMainFormData(mainForm);
    setHiddenFormData(hiddenForm);
    canvas.addEventListener('click', canvasHandler);
    updateCanvas();
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