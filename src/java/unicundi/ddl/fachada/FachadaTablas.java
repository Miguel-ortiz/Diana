package unicundi.ddl.fachada;

import java.util.ArrayList;
import java.util.List;
import unicundi.ddl.bdatos.ExplorarTablasDAO;
import unicundi.ddl.valueobjects.TablasVO;




public class FachadaTablas {

    Errores Errores = null;

    public FachadaTablas(Errores Errores) {
        this.Errores = Errores;
    }

    public Object BuscarTablas(String Esquema) throws Exception {
        ExplorarTablasDAO ExplorarTablasDAO = new ExplorarTablasDAO(Errores);
        return ExplorarTablasDAO.BuscarTablas(Esquema);
    }

    public Object AtributosTablas(ArrayList<TablasVO> seleccion, String esquema) throws Exception {
        ExplorarTablasDAO ExplorarTablasDAO = new ExplorarTablasDAO(Errores);
        return ExplorarTablasDAO.AtributosTablas(seleccion, esquema);
    }
    /**
     * Lista los esquemas de la base
     * @return
     * @throws Exception 
     */
    public List<TablasVO> Esquemas() throws Exception {
        System.out.println("Esquemas DB");
       return new ExplorarTablasDAO(Errores).Esquemas();
    }
}
