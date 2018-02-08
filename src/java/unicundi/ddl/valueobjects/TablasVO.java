package unicundi.ddl.valueobjects;

import java.sql.Timestamp;
import java.util.ArrayList;


public class TablasVO {

    private String esquema;
    private String tabla;
    private String columna;
    private String pk;
    private Timestamp tabla_fecha;
    private ArrayList<TablasVO> columnas;

    public Timestamp getTabla_fecha() {
        return tabla_fecha;
    }

    public void setTabla_fecha(Timestamp tabla_fecha) {
        this.tabla_fecha = tabla_fecha;
    }

    public String getEsquema() {
        return esquema;
    }

    public void setEsquema(String esquema) {
        this.esquema = esquema;
    }

    public String getTabla() {
        return tabla;
    }

    public void setTabla(String tabla) {
        this.tabla = tabla;
    }

    public String getColumna() {
        return columna;
    }

    public void setColumna(String columna) {
        this.columna = columna;
    }

    public String getPk() {
        return pk;
    }

    public void setPk(String pk) {
        this.pk = pk;
    }

    public ArrayList<TablasVO> getColumnas() {
        return columnas;
    }

    public void setColumnas(ArrayList<TablasVO> columnas) {
        this.columnas = columnas;
    }
}
