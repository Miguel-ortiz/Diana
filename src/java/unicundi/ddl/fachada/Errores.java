package unicundi.ddl.fachada;


import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import unicundi.ddl.valueobjects.ObjetoRespuestaVO;


public class Errores {

    ObjetoRespuestaVO ObjetoRespuestaVO;

    public Errores(ObjetoRespuestaVO ObjetoRespuestaVO) {
        this.ObjetoRespuestaVO = ObjetoRespuestaVO;
    }

    public void ImprimirError(String msg, ObjetoRespuestaVO ObjetoRespuestaVO) {
        if (ObjetoRespuestaVO.getErrores() != null) {
            ObjetoRespuestaVO.getErrores().add("PROCESAMIENTO : " + msg + "<br />");
        } else {
            ArrayList lista = new ArrayList();
            lista.add("PROCESAMIENTO : " + msg);
            ObjetoRespuestaVO.setErrores(lista);
        }
        System.out.println("APLICACION BIENESTAR : " + msg);
        try {
            if (ObjetoRespuestaVO.getRutaLogs() != null) {
                Logs Logs = new Logs();
                Logs.RegistrarLogs(ObjetoRespuestaVO, msg);
            }
        } catch (Exception ex) {
            System.out.println("APLICACION BIENESTAR : " + ex.getMessage());
        }
    }

    public void ImprimirError(String msg) {
        if (this.ObjetoRespuestaVO.getErrores() != null) {
            this.ObjetoRespuestaVO.getErrores().add("PROCESAMIENTO : " + msg + "<br />");
        } else {
            ArrayList lista = new ArrayList();
            lista.add("PROCESAMIENTO : " + msg);
            this.ObjetoRespuestaVO.setErrores(lista);
        }
        System.out.println("APLICACION BIENESTAR : " + msg);
        try {
            if (this.ObjetoRespuestaVO.getRutaLogs() != null) {
                Logs Logs = new Logs();
                Logs.RegistrarLogs(this.ObjetoRespuestaVO, msg);
            }
        } catch (Exception ex) {
            System.out.println("APLICACION BIENESTAR : " + ex.getMessage());
        }
    }

    public void logger(String mensaje) {
        try {
            String separador = System.getProperty("file.separator");
            String ruta = System.getProperty("user.dir") + separador + "logs" + separador;
            Calendar c = Calendar.getInstance();
            String sFichero = ruta + "fichero" + c.get(Calendar.YEAR) + c.get(Calendar.DAY_OF_YEAR) + ".txt";
            System.out.println(sFichero);
            File fichero = new File(sFichero);
            if (fichero.exists()) {
                System.out.println("ruta de creacion : " + fichero.getCanonicalPath());
                FileWriter TextOut = new FileWriter(fichero, true);
                TextOut.write(mensaje + "\r\n");
                TextOut.close();
            } else {
                try {
                    BufferedWriter bw = new BufferedWriter(new FileWriter(sFichero));
                    bw.write(mensaje + "\r\n");
                    bw.close();
                } catch (IOException ex) {
                    System.out.println(ex.getMessage());
                }
            }
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
    }
}
