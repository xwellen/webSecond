
import container.ResultArray;
import container.ResultRow;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


public class AreaCheckServlet extends HttpServlet {
    public double parse(String val){
        return Double.parseDouble(val.replace(",", "."));
    }

    private boolean isValid(double x, double y, double r){
        return (x>=-7 && x<=7) && (y>=-7 && y<=7) && (r>=1 && r<=5);
    }

    private String check(double x, double y, double r){
        if (isValid(x, y, r)){
            if (x>0 && y>0 && y<(-2)*x+r) return "IN";
            if (x<0 && y>0) return "OUT";
            if (x<0 && y<0 && x>-r && y>-r) return "IN";
            if (x>0 && y<0 && x*x+y*y<r*r/4) return "IN";
        }
        return "OUT";
    }

    private String print_response(double x, double y, double r){
        String response = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "    <meta charset=\"UTF-8\">" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">" +
                "    <title>Result</title>" +
                "    <link rel=\"icon\" type=\"image/png\" href=\"img/favicon.png\">" +
                "    <link rel=\"stylesheet\" href=\"css/result_style.css\">" +
                "</head>" +
                "<body>" +
                "    <div class=\"stage\">" +
                "    <h1>Результат запроса</h1>" +
                "        <table>" +
                "            <tr>" +
                "                <th>X_value</th>" +
                "                <th>Y_value</th>" +
                "                <th>R_value</th>" +
                "                <th>Result</th>" +
                "            </tr>" +
                "            <tr>" +
                "                <td>" + x + "</td>" +
                "                <td>" + y + "</td>" +
                "                <td>" + r + "</td>" +
                "                <td>" + check(x, y, r) + "</td>" +
                "            </tr>" +
                "        </table>" +
                "        <a href=\"/webSecond-1.0\">Go back</a>" +
                "    </div>" +
                "</body>" +
                "</html>";
        return response;
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setCharacterEncoding("UTF-8");
        double x, y, r;

        try{
            x = parse(req.getParameter("X"));
            y = parse(req.getParameter("Y"));
            r = parse(req.getParameter("R"));

            PrintWriter printWriter = resp.getWriter();
            ResultRow resultRow = new ResultRow(x, y, r, check(x, y, r));
            ServletContext servletContext = getServletContext();
            ResultArray resultArray = (ResultArray) servletContext.getAttribute("resultArray");
            if (resultArray == null){
                resultArray = new ResultArray();
            }
            resultArray.add(resultRow);
            servletContext.setAttribute("resultArray",resultArray);
            printWriter.print(print_response(x, y, r));
            printWriter.flush();
            printWriter.close();
        } catch (NullPointerException | NumberFormatException ex){
            PrintWriter printWriter = resp.getWriter();
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            printWriter.print(resp.getStatus());
            printWriter.close();
        }
    }
}