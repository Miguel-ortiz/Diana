package unicundi.ddl.valueobjects;

import java.util.ArrayList;


public class ObjetoRespuestaVO {

    private ArrayList errores;
    private String respuesta;
    private String html;
    private StringBuffer xml;
    private String rutaLogs;

    public StringBuffer getXml() {
        return xml;
    }

    public void setXml(StringBuffer xml) {
        this.xml = xml;
    }

    public String getRutaLogs() {
        return rutaLogs;
    }

    public void setRutaLogs(String rutaLogs) {
        this.rutaLogs = rutaLogs;
    }

    public ArrayList getErrores() {
        return errores;
    }

    public void setErrores(ArrayList errores) {
        this.errores = errores;
    }

    public String getHtml() {
        return html;
    }

    public void setHtml(String html) {
        this.html = html;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }
}
