<%@page import="unicundi.ddl.valueobjects.TablasVO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="unicundi.ddl.fachada.Errores"%>
<%@page import="unicundi.ddl.valueobjects.ObjetoRespuestaVO"%>
<%@page import="unicundi.ddl.fachada.FachadaTablas"%>
<%@page import="unicundi.ddl.fachada.ProcesaCadenas"%>
<%!
    HttpSession _session = null;
    HttpServletRequest _request = null;
    HttpServletResponse _response = null;
    String _url = null;
%>
<%
    this._session = session;
    this._request = request;
    this._response = response;
    ProcesaCadenas o = new ProcesaCadenas();
    String modulo = o.notNull(request.getParameter("modulo"), "");
    ObjetoRespuestaVO ObjetoRespuestaVO = new ObjetoRespuestaVO();
    System.out.println(modulo);
    Errores Errores = new Errores(ObjetoRespuestaVO);
    boolean redireccionar = false;
    if (o.Compara(modulo, "tablas")) {
        String _esquema = o.notNull(request.getParameter("esquem_sel"), "");
        this.BuscarTablas(_esquema, Errores);
        redireccionar = true;
    }
    if (o.Compara(modulo, "generar")) {
        String _esquema = o.notNull(request.getParameter("esquem_sel"), "");
        ArrayList<TablasVO> Tablas = (ArrayList<TablasVO>) session.getAttribute("ResultadosTabla");
        if (request.getParameterValues("indtab_che") != null) {
            if (Tablas != null) {
                ArrayList<TablasVO> Seleccion = new ArrayList<TablasVO>();
                for (int a = 0; a < request.getParameterValues("indtab_che").length; a++) {
                    Seleccion.add(Tablas.get(Integer.parseInt(request.getParameterValues("indtab_che")[a])));
                }
                GenararDDL(Seleccion, _esquema, Errores);
                redireccionar = true;
            } else {
                out.clear();
                out.print("No se encontro listado de Tablas");
            }
        } else {
            out.clear();
            out.print("No se encontro listados de Selecciones");
        }
    }
    if (redireccionar) {
        request.removeAttribute("ObjetoRespuestaVO");
        request.setAttribute("ObjetoRespuestaVO", ObjetoRespuestaVO);
        System.out.println("URL : :: " + this._url);
        RequestDispatcher dispatcher = application.getRequestDispatcher("/" + this._url);
        dispatcher.forward(request, response);
    }
%>
<%!
    private void BuscarTablas(String esquema, Errores Errores) {
        try {
            FachadaTablas FachadaTablas = new FachadaTablas(Errores);
            ArrayList<TablasVO> Tablas = (ArrayList<TablasVO>) FachadaTablas.BuscarTablas(esquema);
            this._session.setAttribute("ResultadosTabla", Tablas);
            this._url = "gen_vis.jsp?modulo=listar";
        } catch (Exception ex) {
            Errores.ImprimirError(ex.getMessage());
        }
    }

    private void GenararDDL(ArrayList<TablasVO> seleccion, String esquema, Errores Errores) {
        try {
            FachadaTablas FachadaTablas = new FachadaTablas(Errores);
            ArrayList<TablasVO> Tablas = (ArrayList<TablasVO>) FachadaTablas.AtributosTablas(seleccion, esquema);
            this._session.setAttribute("ResultadosSeleccion", Tablas);
            this._url = "gen_vis.jsp?modulo=ddl";
        } catch (Exception ex) {
            Errores.ImprimirError(ex.getMessage());
        }
    }
%>