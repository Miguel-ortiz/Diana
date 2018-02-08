package unicundi.ddl.fachada;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Calendar;
import unicundi.ddl.valueobjects.ObjetoRespuestaVO;


public class Logs {

    FileWriter archivo;

    public boolean RegistrarLogs(ObjetoRespuestaVO ObjetoRespuestaVO, String mensaje) throws IOException {
        boolean exito = false;
        if (ObjetoRespuestaVO != null) {
            if (ObjetoRespuestaVO.getRutaLogs() != null) {
                ManejadorFechas f = new ManejadorFechas();
                String ruta = ObjetoRespuestaVO.getRutaLogs() + f.getCadenaArchivo() + ".txt";
                //Pregunta el archivo existe, caso contrario crea uno con el nombre log.txt
                if (new File(ruta).exists() == false) {
                    archivo = new FileWriter(new File(ruta), false);
                }
                archivo = new FileWriter(new File(ruta), true);
                Calendar fechaActual = Calendar.getInstance(); //Para poder utilizar el paquete calendar    
                //Empieza a escribir en el archivo
                archivo.write((String.valueOf(fechaActual.get(Calendar.DAY_OF_MONTH))
                        + "/" + String.valueOf(fechaActual.get(Calendar.MONTH) + 1)
                        + "/" + String.valueOf(fechaActual.get(Calendar.YEAR))
                        + ";" + String.valueOf(fechaActual.get(Calendar.HOUR_OF_DAY))
                        + ":" + String.valueOf(fechaActual.get(Calendar.MINUTE))
                        + ":" + String.valueOf(fechaActual.get(Calendar.SECOND))) + ";" + mensaje + "\r\n");
                archivo.close(); //Se cierra el archivo
            }
        }
        return exito;
    }
}
