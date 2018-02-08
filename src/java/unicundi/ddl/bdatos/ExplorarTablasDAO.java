package unicundi.ddl.bdatos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import unicundi.ddl.conexion.ManejadorConexiones;
import unicundi.ddl.fachada.Errores;
import unicundi.ddl.fachada.ProcesaCadenas;
import unicundi.ddl.valueobjects.TablasVO;




public class ExplorarTablasDAO {

    private ProcesaCadenas o = null;
    private Errores Errores = null;

    public ExplorarTablasDAO(Errores Errores) {
        this.o = new ProcesaCadenas();
        this.Errores = Errores;
    }

    public Object BuscarTablas(String Esquema) throws Exception {
        System.out.println("ESQUEMA ::: " + Esquema);
        PreparedStatement ps = null;
        ResultSet rs = null;
        ArrayList<TablasVO> tablas = null;
        ManejadorConexiones ManejadorConexiones = new ManejadorConexiones();
        Connection con = null;
        con = ManejadorConexiones.getCon();
        System.out.println("ESQUEMA ::: 1");
        StringBuffer sql = new StringBuffer();
        sql.append("SELECT  OWNER, TABLE_NAME \n\t");
        sql.append("FROM    ALL_TABLES TABLES, \n\t");
        sql.append("        (   \n\t");
        sql.append("            SELECT  MAX(A.TIMESTAMP) FECHA, \n\t");
        sql.append("                    A.OBJECT_NAME  \n\t");
        sql.append("            FROM    DBA_OBJECTS A, \n\t");
        sql.append("                    ALL_OBJECTS B \n\t");
        sql.append("            WHERE   A.OBJECT_NAME = B.OBJECT_NAME \n\t");
        sql.append("                    AND A.OBJECT_TYPE = 'TABLE' \n\t");
        sql.append("                    AND A.OWNER = '").append(Esquema).append("'   \n\t");
        sql.append("            GROUP BY A.OBJECT_NAME  \n\t");
        sql.append("        )FTABLES   \n\t");
        sql.append("WHERE   OWNER LIKE  '").append(Esquema).append("' \n\t");
        sql.append("        AND TABLES.TABLE_NAME = FTABLES.OBJECT_NAME(+)  \n\t");
        sql.append("GROUP BY OWNER, TABLE_NAME, FTABLES.FECHA  \n\t");
        sql.append("ORDER BY FTABLES.FECHA DESC,  TABLE_NAME ASC");
        System.out.println("SQL:::" + sql.toString());
        try {
            ps = con.prepareStatement(sql.toString());
            //ps.setString(1, Esquema);
            rs = ps.executeQuery();
            if (rs.isBeforeFirst()) {
                tablas = new ArrayList<TablasVO>();
                while (rs.next()) {
                    TablasVO TablasVO = new TablasVO();
                    TablasVO.setEsquema(rs.getString("OWNER"));
                    TablasVO.setTabla(rs.getString("TABLE_NAME"));
                    tablas.add(TablasVO);
                }
            }
        } catch (Exception ex) {
            Errores.ImprimirError(ex.getMessage());
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
            try {
                if (rs != null) {
                    rs.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
            try {
                if (con != null) {
                    con.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
        }
        return tablas;
    }

    public Object AtributosTablas(ArrayList<TablasVO> seleccion, String Esquema) throws Exception {
        PreparedStatement ps = null;
        ResultSet rs = null;
        ArrayList<TablasVO> columnas = null;
        ManejadorConexiones ManejadorConexiones = new ManejadorConexiones();
        Connection con = null;
        con = ManejadorConexiones.getCon();
        StringBuffer sql = null;
        try {
            if (seleccion != null) {
                for (TablasVO tablas : seleccion) {
                    sql = new StringBuffer();
                    sql.append("SELECT  ATC.OWNER, \n\t");
                    sql.append("        ATC.TABLE_NAME,  \n\t");
                    sql.append("        ATC.COLUMN_NAME, \n\t");
                    sql.append("        TCONSTRAINT.CONSTRAINT_TYPE \n\t");
                    sql.append("FROM    ALL_TAB_COLUMNS ATC, \n\t");
                    sql.append("        ( \n\t");
                    sql.append("            SELECT  COLS.TABLE_NAME, \n\t");
                    sql.append("                    COLS.COLUMN_NAME, \n\t");
                    sql.append("                    COLS.POSITION, \n\t");
                    sql.append("                    CONS.STATUS, \n\t");
                    sql.append("                    CONS.OWNER,\n\t");
                    sql.append("                    CONS.CONSTRAINT_TYPE\n\t");
                    sql.append("            FROM    ALL_CONSTRAINTS CONS, ALL_CONS_COLUMNS COLS\n\t");
                    sql.append("            WHERE   CONS.CONSTRAINT_TYPE = 'P'\n\t");
                    sql.append("                    AND CONS.CONSTRAINT_NAME = COLS.CONSTRAINT_NAME\n\t");
                    sql.append("                    AND CONS.OWNER = COLS.OWNER\n\t");
                    sql.append("                    AND COLS.TABLE_NAME = '" + tablas.getTabla() + "' \n\t");
                    sql.append("                    AND COLS.OWNER = '" + tablas.getEsquema() + "' \n\t");
                    sql.append("        ) TCONSTRAINT \n\t");
                    sql.append("WHERE   ATC.TABLE_NAME = '" + tablas.getTabla() + "' \n\t");
                    sql.append("        AND ATC.OWNER = '" + tablas.getEsquema() + "' \n\t");
                    sql.append("        AND ATC.COLUMN_NAME = TCONSTRAINT.COLUMN_NAME(+) \n\t");
                    sql.append("ORDER BY TCONSTRAINT.CONSTRAINT_TYPE ASC \n\t");

                    System.out.println("SQL:::" + sql.toString());
                    ps = null;
                    ps = con.prepareStatement(sql.toString());
                    rs = ps.executeQuery();
                    if (rs.isBeforeFirst()) {
                        columnas = new ArrayList<TablasVO>();
                        System.out.println("RESULTADOS PARA " + tablas.getTabla() + " ENCONTRADOS");
                        while (rs.next()) {
                            TablasVO TablasVO = new TablasVO();
                            TablasVO.setEsquema(rs.getString("OWNER"));
                            TablasVO.setTabla(rs.getString("TABLE_NAME"));
                            TablasVO.setColumna(rs.getString("COLUMN_NAME"));
                            TablasVO.setPk(rs.getString("CONSTRAINT_TYPE"));
                            columnas.add(TablasVO);
                        }
                        tablas.setColumnas(columnas);
                    }
                }
            }
        } catch (Exception ex) {
            Errores.ImprimirError(ex.getMessage());
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
            try {
                if (rs != null) {
                    rs.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
            try {
                if (con != null) {
                    con.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
        }
        return seleccion;
    }

    public List<TablasVO> Esquemas() throws Exception {
        PreparedStatement ps = null;
        ResultSet rs = null;
        List<TablasVO> esquemas = null;
        ManejadorConexiones ManejadorConexiones = new ManejadorConexiones();
        Connection con = null;
        con = ManejadorConexiones.getCon();

        StringBuffer sql = new StringBuffer();
        try {

            sql.append("SELECT  A.OWNER, ");
            sql.append("        COUNT( A.OBJECT_NAME) ");
            sql.append(" FROM    DBA_OBJECTS A,  ");
            sql.append("         ALL_OBJECTS B  ");
            sql.append(" WHERE   A.OBJECT_NAME = B.OBJECT_NAME  ");
            sql.append("         AND A.OBJECT_TYPE = 'TABLE'  ");
            sql.append("         AND A.OWNER IN( SELECT USERNAME  ");
            sql.append("                        FROM DBA_USERS  ");
            sql.append("                        ) ");
            sql.append(" GROUP BY A.OWNER  ");
            sql.append("ORDER BY A.OWNER   ");

                     
            ps = con.prepareStatement(sql.toString());
            rs = ps.executeQuery();
            if (rs.isBeforeFirst()) {
                esquemas = new ArrayList<TablasVO>();
                while (rs.next()) {
                    TablasVO TablasVO = new TablasVO();
                    TablasVO.setEsquema(rs.getString("OWNER"));
                    
                    esquemas.add(TablasVO);
                }

            }
           

        } catch (Exception ex) {
            Errores.ImprimirError(ex.getMessage());
 
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
            try {
                if (rs != null) {
                    rs.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
            try {
                if (con != null) {
                    con.close();
                }
            } catch (Exception ex) {
                Errores.ImprimirError(ex.getMessage());
            }
        }
        return esquemas;
    }

}
