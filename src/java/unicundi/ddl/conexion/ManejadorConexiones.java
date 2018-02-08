package unicundi.ddl.conexion;

import java.sql.Connection;
import java.sql.SQLException;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;


public class ManejadorConexiones {
    
 
    private Context initCtx;
    private Context envCtx;
    private DataSource ds;
    private Connection con;

    public ManejadorConexiones() throws SQLException, Exception {
        initCtx = null;
        envCtx = null;
        ds = null;
        con = null;
        try {
            initCtx = new InitialContext();
            envCtx = (Context) initCtx.lookup("java:comp/env");
            ds = (DataSource) envCtx.lookup("jdbc/Regafectados");
            con = ds.getConnection();
        } catch (SQLException e) {
            System.out.println("Error no se puedo cargar el driver en Regafectados --> Regafectados"
                     + e.getMessage());
            con = null;
            throw e;
        } catch (Exception e) {
            System.out.println("Error no se puedo cargar el driver en Regafectados --> Regafectados" + e.getMessage());
            con = null;
            throw e;
        }
    }

    public void setCon(Connection con) {
        this.con = con;
    }

    public Connection getCon() {
        return con;
    }

    public void close() throws SQLException, Exception {
        try {
            if (this.con != null) {
                this.con.close();
                this.con = null;
            }
        } catch (SQLException e) {
            System.out.println("Error -->Regafectados ::> Regafectados ::> CONEXION Regafectados::> Regafectados ::> close()" + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}