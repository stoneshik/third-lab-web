<%@ page import="com.lab.models.wrappers.ListDotWrapper" %>
<%@ page import="com.lab.models.wrappers.DotWrapper" %>
<%@ page import="com.lab.models.dot.Dot" %>
<%@ page import="java.time.format.DateTimeFormatter" %>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%! private double roundDouble(double value, int places) {
    double scale = Math.pow(10, places);
    return Math.round(value * scale) / scale;
} %>
<jsp:include page="includes/header-configuration.xhtml"/>
    <div id="wrapper" class="container">
        <div id="left_col">
            <canvas id="canvas" height="600" width="600"
            <% ListDotWrapper listDotWrapper = (ListDotWrapper) request.getSession().getAttribute("list_dot_wrapper");
                if (listDotWrapper == null) { %>
                    x="0" y="0" r="0"
                <% } else { %>
                <%= listDotWrapper.getAllParamsInString() %>
                <% } %>
                    ></canvas>
            <p id="canvas-error" class="error"></p>
        </div>
        <div>
            <form action="/controller-servlet" method="GET" class="ui-form" id="dot-form">
                <h3>Проверка попадания точки</h3>
                <fieldset id="x">
                    <label>X:</label>
                    <input type="radio" value="-4" name="x">-4
                    <input type="radio" value="-3" name="x">-3
                    <input type="radio" value="-2" name="x">-2
                    <input type="radio" value="-1" name="x">-1
                    <input type="radio" value="0" name="x" checked>0
                    <input type="radio" value="1" name="x">1
                    <input type="radio" value="2" name="x">2
                    <input type="radio" value="3" name="x">3
                    <input type="radio" value="4" name="x">4
                </fieldset>
                <div class="form-row">
                    <input type="text" id="y" name="y" required autocomplete="off">
                    <label for="y" class="text-input-label">Y:</label>
                </div>
                <div class="form-row">
                    <label for="r">R:</label>
                    <select id="r" name="r" size="3" class="select">
                        <option selected value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <p><input type="submit" value="отправить"></p>
                <p id="form-error" class="error"></p>
            </form>
        </div>
        <div id="right_col">
            <h2>Результаты проверки</h2>
            <table id="results" class="results">
                <tbody>
                <% if (listDotWrapper == null) { %>
                    <tr class="response neutral single-column"><td colspan="3">Пока здесь пусто</td></tr>
                <% } else {
                    for (DotWrapper dotWrapper : listDotWrapper.getListDotWrapper()) {
                        if (dotWrapper.getNumberPlane().checkPointHitInArea((Dot) dotWrapper.getDot())) { %>
                <tr id="last-response" class="response success triple-column">
                    <td>Точка попала</td>
                    <% } else { %>
                <tr class="response fail triple-column">
                    <td>Точка не попала</td>
                    <% } %>
                    <td><%= String.format("%.4f", dotWrapper.getTimeLead() * 0.001) %> мкс</td>
                    <td class="time per-last">
                        <%= dotWrapper.getTimeDispatch().format(DateTimeFormatter.ofPattern("HH:mm:ss"))%>
                    </td>
                    <td class="last">Параметры: <%=
                    String.format(
                        "x=%s, y=%s, r=%s",
                        roundDouble(dotWrapper.getDot().getX(), 6),
                        roundDouble(dotWrapper.getDot().getY(), 6),
                        roundDouble(dotWrapper.getNumberPlane().getR(), 6)
                    )
                    %></td>
                </tr>
                <% }
                } %>
                </tbody>
            </table>
        </div>
    </div>
    <script type="text/javascript" src="includes/scripts/jquery.min.js"></script>
    <script type="text/javascript" src="includes/scripts/filter.js"></script>
    <script type="text/javascript" src="includes/scripts/canvas.js"></script>
    <script type="text/javascript" src="includes/scripts/main.js"></script>
<jsp:include page="includes/footer.xhtml"/>

<div id="center_col">
    <form action="/controller-servlet" method="POST" class="ui-form" id="dot-form">
        <h3>Проверка попадания точки</h3>
        <fieldset id="x">
            <label>X:</label>
            <input type="radio" value="-4" name="x"/>-4
            <input type="radio" value="-3" name="x"/>-3
            <input type="radio" value="-2" name="x"/>-2
            <input type="radio" value="-1" name="x"/>-1
            <input type="radio" value="0" name="x"/>0
            <input type="radio" value="1" name="x"/>1
            <input type="radio" value="2" name="x"/>2
            <input type="radio" value="3" name="x"/>3
            <input type="radio" value="4" name="x"/>4
        </fieldset>
        <div class="form-row">
            <input type="text" id="y" name="y" autocomplete="off"/>
            <label for="y" class="text-input-label">Y:</label>
        </div>
        <div class="form-row">
            <label for="r">R:</label>
            <select id="r" name="r" size="3" class="select">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <p><input type="submit" value="отправить"/></p>
        <p id="form-error" class="error"></p>
    </form>
    <h3><h:link value="Перейти на стартовую страницу" outcome="back-to-startpage" /></h3>
</div>