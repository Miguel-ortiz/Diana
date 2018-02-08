package unicundi.ddl.fachada;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Calendar;

public class ManejadorFechas {

    public Date getFechaHora() {
        Calendar calendar = Calendar.getInstance();
        return calendar.getTime();
    }

    public Calendar retornaCalendar(String cadena) {
        Calendar cal = null;
        try {
            DateFormat formatter;
            Date date;
            formatter = new SimpleDateFormat("dd-MM-yyyy");
            date = (Date) formatter.parse(cadena);
            cal = Calendar.getInstance();
            cal.setTime(date);
        } catch (ParseException e) {
        }
        return cal;
    }

    public Date retornaDate(String cadena) {
        Date date = null;
        try {
            DateFormat formatter;

            formatter = new SimpleDateFormat("dd-mm-yyyy");
            date = (Date) formatter.parse(cadena);
        } catch (ParseException e) {
        }
        return date;
    }

    public Timestamp retornaTimeStamp(String cadena) {
        Calendar cal = this.retornaCalendar(cadena);
        long date = cal.getTime().getTime();
        Timestamp timeStamp = new Timestamp(date);
        return timeStamp;
    }

    public Timestamp getFechaHoraTimeStamp() {
        Calendar calendar = Calendar.getInstance();
        long date = calendar.getTime().getTime();
        Timestamp timeStamp = new Timestamp(date);
        return timeStamp;
    }

    public String DevuelveFormato(Timestamp t) {
        String s = "";
        //if(t.toString().compareTo("") != 0){
        if (t != null) {
            s = new SimpleDateFormat("dd-MM-yyyy").format(t);
        }
        return s;
    }

    public String DevuelveAnio(Timestamp t) {
        String s = "";
        //if(t.toString().compareTo("") != 0){
        if (t != null) {
            s = new SimpleDateFormat("yyyy").format(t);
        }
        return s;
    }

    public String FechaLetras(Timestamp t) {
        String s = "";
        //if(t.toString().compareTo("") != 0){
        if (t != null) {
            s = new SimpleDateFormat("dd 'de' MMMM 'de' yyyy").format(t);
        }
        return s;
    }

    public Timestamp StringToTimeStamp(String cadena) {
        Calendar cal = this.retornaCalendar(cadena);
        long date = cal.getTime().getTime();
        Timestamp timeStamp = new Timestamp(date);
        return timeStamp;
    }

    public String FechaLetras(String t) {
        String s = "";
        //if(t.toString().compareTo("") != 0){
        if (t != null) {
            s = new SimpleDateFormat("dd 'de' MMMM 'de' yyyy").format(StringToTimeStamp(t));
        }
        return s;
    }

    public String getCadenaArchivo() {
        String nombre = this.getFechaHoraTimeStamp().toString().replace("-", "").replace(":", "").replace(".", "").replace(" ", "");
        nombre = nombre.substring(0, 8);
        return nombre;
    }

    public int compare(Timestamp t1, Timestamp t2) {

        long l1 = t1.getTime();
        long l2 = t2.getTime();
        if (l2 > l1) {
            return 1;
        } else if (l1 > l2) {
            return -1;
        } else {
            return 0;
        }
    }

}
