package container;

import java.util.ArrayList;
import java.util.List;

public class ResultArray {
    private List<ResultRow> resultRows;

    public ResultArray(){
        resultRows = new ArrayList<>();
    }

    public void add(ResultRow resultRow){
        resultRows.add(resultRow);
    }

    public List<ResultRow> getResultRows(){
        return resultRows;
    }
}
