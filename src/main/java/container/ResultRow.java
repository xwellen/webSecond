package container;

public class ResultRow {
    private Double xCell;
    private Double yCell;
    private Double rCell;
    private String resultCell;

    public ResultRow(Double xCell, Double yCell, Double rCell, String resultCell) {
        this.xCell = xCell;
        this.yCell = yCell;
        this.rCell = rCell;
        this.resultCell = resultCell;
    }

    public Double getxCell() {
        return xCell;
    }

    public void setxCell(Double xCell) {
        this.xCell = xCell;
    }

    public Double getyCell() {
        return yCell;
    }

    public void setyCell(Double yCell) {
        this.yCell = yCell;
    }

    public Double getrCell() {
        return rCell;
    }

    public void setrCell(Double rCell) {
        this.rCell = rCell;
    }

    public String getResultCell() {
        return resultCell;
    }

    public void setResultCell(String resultCell) {
        this.resultCell = resultCell;
    }
}
