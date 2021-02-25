<%--
  Created by IntelliJ IDEA.
  User: xwellen
  Date: 18.02.2021
  Time: 17:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page isELIgnored="false" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="container.ResultRow" %>
<%@ page import="container.ResultArray" %>
<%@ page import="java.util.List" %>

<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>lab02</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="icon" type="image/png" href="img/favicon.png">
</head>
<body>

<div class="head">
    <div class="inherit-wrap"><p>Лабораторная работа №2</p></div>
    <p>Убоженко Сергей Дмитриевич P3212</p>
    <p>Вариант 53477</p>
</div>
<div class="stage">
    <canvas id="imageCanvas">
        <img src="img/area.png" alt="area.png" id="area"/>
    </canvas>
    <div class="form">
            <br>
            <label>Введите X</label>
            <p id="whatX"></p>
            <div class="xButtons">
                <input type="button" id="x1" value="-4" onclick="checkX()">
                <input type="button" id="x2" value="-3" onclick="checkX()">
                <input type="button" id="x3" value="-2" onclick="checkX()">
                <input type="button" id="x4" value="-1" onclick="checkX()">
                <input type="button" id="x5" value="0" onclick="checkX()">
                <input type="button" id="x6" value="1" onclick="checkX()">
                <input type="button" id="x7" value="2" onclick="checkX()">
                <input type="button" id="x8" value="3" onclick="checkX()">
                <input type="button" id="x9" value="4" onclick="checkX()"><br><br>
            </div>

            <label for="ChangeYText">Введите Y (-3..5)</label><br>
            <input type="text" id="ChangeYText" name="ChangeYText" autocomplete="off" onchange="checkY()"><br>

            <p id="NoRChoosed"></p>
            <label>Введите R</label><br>

            <input type="checkbox" name="r1" id="r1" onchange="clickR()">
            <label>1</label>
            <input type="checkbox" name="r2" id="r2" onchange="clickR()">
            <label>2</label>
            <input type="checkbox" name="r3" id="r3" onchange="clickR()">
            <label>3</label>
            <input type="checkbox" name="r4" id="r4" onchange="clickR()">
            <label>4</label>
            <input type="checkbox" name="r5" id="r5" onchange="clickR()">
            <label>5</label><br>

        <input type="button" id="sbutton" value="Проверка" onclick="sendPOST();">
    </div>
</div>

<div class="resultTable">
    <table>
        <tr>
            <th>X_value</th>
            <th>Y_value</th>
            <th>R_value</th>
            <th>Result</th>
        </tr>
        <%
                ResultArray resultArray = (ResultArray) request.getServletContext().getAttribute("resultArray");
                if (resultArray != null) {
                    for (ResultRow resultRow : resultArray.getResultRows()) {
            %>
        <tr>
            <td>
                <%=resultRow.getxCell() %>
            </td>
            <td>
                <%=resultRow.getyCell() %>
            </td>
            <td>
                <%=resultRow.getrCell() %>
            </td>
            <td>
                <%=resultRow.getResultCell() %>
            </td>
        </tr>
        <%      }
                }
            %>

    </table>
</div>

<script src="js/check.js"></script>
<script src="js/canvas.js"></script>
</body>
</html>
