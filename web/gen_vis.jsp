
<%@page import="unicundi.ddl.fachada.RespuestaXML"%>
<%@page import="unicundi.ddl.valueobjects.ObjetoRespuestaVO"%>
<%@page import="unicundi.ddl.fachada.ProcesaCadenas"%>
<%@page import="java.util.ArrayList"%>
<%@page import="unicundi.ddl.valueobjects.TablasVO"%>
<%
    ObjetoRespuestaVO ObjetoRespuestaVO = (ObjetoRespuestaVO) request.getAttribute("ObjetoRespuestaVO");
    ProcesaCadenas o = new ProcesaCadenas();
    String modulo = o.notNull(request.getParameter("modulo"), "");
    System.out.println("Modulo = " + modulo);
    boolean respuestaxml = false;
    if (o.Compara(modulo, "listar")) {
        ArrayList<TablasVO> Tablas = (ArrayList<TablasVO>) session.getAttribute("ResultadosTabla");
        StringBuffer html = new StringBuffer();
        html.append("<div style='max-height: 250px; min-height: 100px; overflow: auto;'>");
        html.append("   <table class=\"tablesorter\">");
        html.append("       <thead>");
        html.append("           <tr>");
        html.append("               <th style=\"width:5%\">#</th>");
        html.append("               <th style=\"width:20%\">ESQUEMA</th>");
        html.append("               <th style=\"width:21%\">TABLA</th>");
        html.append("           </tr>");
        html.append("       </thead>");
        html.append("       <tbody>");
        int ind = 0;
        if (Tablas != null) {
            for (TablasVO TablasVO : Tablas) {
                html.append("   <tr>");
                html.append("       <td><input type=\"checkbox\" name=\"indtab_che\" id=\"indtab_che\" value=\"" + ind + "\" class=\"tablas\"/></td>");
                html.append("       <td>" + o.notNull(TablasVO.getEsquema(), "") + "</td>");
                html.append("       <td>" + o.notNull(TablasVO.getTabla(), "") + "</td>");
                html.append("   </tr>");
                ind++;
            }
        }
        html.append("       </tbody>");
        html.append("   </table>");
        html.append("</div>");
        html.append("<div style='padding:10px 0;'>");
        html.append("<label><input type=\"checkbox\" name=\"secuen_che\" checked=\"checked\" id=\"secuen_che\" value=\"1\">SECU</label>");
        html.append("<label><input type=\"checkbox\" name=\"proced_che\" checked=\"checked\" id=\"proced_che\" value=\"1\">PROC</label>");
        html.append("<label><input type=\"checkbox\" name=\"audito_che\" checked=\"checked\" id=\"audito_che\" value=\"1\">AUD</label>");
        html.append("<label><input type=\"checkbox\" name=\"values_che\" checked=\"checked\" id=\"values_che\" value=\"1\">VO's</label>");
        html.append("</div>");
        html.append("<br/>");
        html.append("<input type='button' name='genera_btn' onclick='EnviarChecksActivos(\"tablas\")' id='genera_btn' value='GENERAR DDL'>");
        ObjetoRespuestaVO.setRespuesta("3");
        ObjetoRespuestaVO.setHtml(html.toString());
        respuestaxml = true;
    }

    if (o.Compara(modulo, "ddl")) {
        ArrayList<TablasVO> Tablas = (ArrayList<TablasVO>) session.getAttribute("ResultadosSeleccion");
        StringBuffer ddl = new StringBuffer();
        StringBuffer html = new StringBuffer();
        StringBuffer columns = null;
        StringBuffer variables = null;
        StringBuffer secuencias = null;
        StringBuffer auditora_campos = null;
        StringBuffer auditora_valores = null;
        StringBuffer procedi_cabecera = null;
        StringBuffer campos_vos = null;
        StringBuffer auditora_atributos = null;
        String secuencia = o.notNull(request.getParameter("secuen_che"), "");
        String auditoras = o.notNull(request.getParameter("audito_che"), "");
        String valueobje = o.notNull(request.getParameter("values_che"), "");
        String procedi = o.notNull(request.getParameter("proced_che"), "");
        String retorno = "";
        String nombre_objeto = "";
        int l_objetos = 30;
        if (Tablas != null) {
            for (TablasVO TablasVO : Tablas) {
                columns = new StringBuffer();
                variables = new StringBuffer();
                secuencias = new StringBuffer();
                html = new StringBuffer();
                auditora_campos = new StringBuffer();
                auditora_valores = new StringBuffer();
                auditora_atributos = new StringBuffer();
                campos_vos = new StringBuffer();
                procedi_cabecera = new StringBuffer();
                retorno = "";
                if (TablasVO.getColumnas() != null) {
                    int lon = TablasVO.getColumnas().size();
                    int cont = 0;
                    String nombrePK = "";
                    String registradopor = "";
                    for (TablasVO columnas : TablasVO.getColumnas()) {
                        int resultado = o.notNull(columnas.getColumna(), "").indexOf("REGISTRADOPOR");
                        if (resultado != -1) {
                            registradopor = columnas.getColumna();
                        }
                        campos_vos.append("private String " + columnas.getColumna().toLowerCase() + "; \n");
                        auditora_campos.append("     " + columnas.getColumna().toUpperCase() + ", \n");
                        auditora_valores.append("     :NEW." + columnas.getColumna().toUpperCase() + ", \n");

                        if (o.Compara(o.notNull(columnas.getPk(), ""), "P")) {
                            nombrePK = columnas.getColumna();
                        } else {
                            if (cont == lon - 1) {
                                procedi_cabecera.append("   P_" + columnas.getColumna().toUpperCase() + " IN " + columnas.getEsquema() + "." + columnas.getTabla().toUpperCase() + "." + columnas.getColumna().toUpperCase() + "%TYPE, \n");
                                procedi_cabecera.append("   P_RETORNO OUT NUMBER \n");
                                columns.append("     " + columnas.getColumna().toUpperCase() + " \n");
                                variables.append("     P_" + columnas.getColumna().toUpperCase() + " \n");
                            } else {
                                procedi_cabecera.append("   P_" + columnas.getColumna().toUpperCase() + " IN " + columnas.getEsquema() + "." + columnas.getTabla().toUpperCase() + "." + columnas.getColumna().toUpperCase() + "%TYPE, \n");
                                columns.append("     " + columnas.getColumna().toUpperCase() + ", \n");
                                variables.append("     P_" + columnas.getColumna().toUpperCase() + ", \n");
                            }
                            if (o.notNull(columnas.getColumna(), "").indexOf("REGISTRADOPOR") == -1 && o.notNull(columnas.getColumna(), "").indexOf("FECHACAMBIO") == -1) {
                                nombre_objeto = "";
                                nombre_objeto = "AUD_" + TablasVO.getTabla();
                                if (nombre_objeto.length() > l_objetos) {
                                    nombre_objeto = nombre_objeto.substring(0, l_objetos);
                                }
                                auditora_atributos.append("ALTER TABLE " + TablasVO.getEsquema() + "." + nombre_objeto + " MODIFY " + columnas.getColumna() + " NULL; \n");
                            }
                        }
                        cont++;
                    }

                    if (o.Compara(registradopor, "")) {
                        registradopor = "UDEC_REGISTRADOPOR";
                    }

                    if (!o.Compara(nombrePK, "")) {
                        secuencias.append("---SECUENCIA PARA LA TABLA " + TablasVO.getEsquema() + "." + TablasVO.getTabla() + " \n");
                        secuencias.append("\n\n");
                        secuencias.append("CREATE SEQUENCE " + TablasVO.getEsquema() + ".S_" + nombrePK + " INCREMENT BY 1 START WITH 1 MAXVALUE 999999999 MINVALUE 1 NOCYCLE NOCACHE ORDER; \n / \n");
                        nombre_objeto = "";
                        nombre_objeto = "TRO_INC_" + TablasVO.getTabla();
                        if (nombre_objeto.length() > l_objetos) {
                            nombre_objeto = nombre_objeto.substring(0, l_objetos);
                        }
                        secuencias.append("CREATE OR REPLACE TRIGGER " + TablasVO.getEsquema() + "." + nombre_objeto + " \n");
                        secuencias.append("    BEFORE \n");
                        secuencias.append("INSERT ON " + TablasVO.getEsquema() + "." + TablasVO.getTabla() + " FOR EACH ROW WHEN (NEW." + nombrePK + " IS NULL) BEGIN :NEW." + nombrePK + " := " + TablasVO.getEsquema() + ".S_" + nombrePK + ".NEXTVAL; \n");
                        secuencias.append("END; \n");
                        secuencias.append(" /  \n");
                        retorno = "SELECT S_" + nombrePK + ".CURRVAL INTO P_RETORNO FROM DUAL; \n";

                    }

                    if (!o.Compara(procedi, "")) {
                        html.append("---PROCEDIMIENTOS ALMACENADO PARA LA TABLA " + TablasVO.getEsquema() + "." + TablasVO.getTabla() + " \n");
                        nombre_objeto = "";
                        nombre_objeto = "PR_" + TablasVO.getEsquema().toUpperCase() + "_I_" + TablasVO.getTabla().toUpperCase();
                        if (nombre_objeto.length() > l_objetos) {
                            nombre_objeto = nombre_objeto.substring(0, l_objetos);
                        }
                        html.append("CREATE OR REPLACE PROCEDURE " + TablasVO.getEsquema() + "." + nombre_objeto + "( \n");
                        html.append(procedi_cabecera.toString());
                        html.append(") \n");
                        html.append("AS \n");
                        html.append("E_ERROR EXCEPTION; \n");
                        html.append("BEGIN \n");
                        html.append("INSERT INTO " + TablasVO.getEsquema().toUpperCase() + "." + TablasVO.getTabla().toUpperCase() + "( \n");
                        html.append(columns);
                        html.append(") \n");
                        html.append("VALUES( \n");
                        html.append(variables);
                        html.append("); \n");
                        html.append(retorno);
                        html.append("END \n");
                        html.append("; \n");
                        html.append(" / \n");
                    }

                    if (!o.Compara(auditoras, "")) {
                        html.append("\n\n");
                        html.append("---AUDITORAS PARA LA TABLA " + TablasVO.getEsquema() + "." + TablasVO.getTabla() + " \n");
                        html.append("\n\n");

                        nombre_objeto = "";
                        nombre_objeto = "AUD_" + TablasVO.getTabla();
                        if (nombre_objeto.length() > l_objetos) {
                            nombre_objeto = nombre_objeto.substring(0, l_objetos);
                        }
                        String nombre_trigg = "";
                        nombre_trigg = "TR_" + TablasVO.getEsquema() + "_I_" + TablasVO.getTabla();
                        if (nombre_trigg.length() > l_objetos) {
                            nombre_trigg = nombre_trigg.substring(0, l_objetos);
                        }

                        html.append("CREATE TABLE " + TablasVO.getEsquema() + "." + nombre_objeto + " AS SELECT * FROM " + TablasVO.getEsquema() + "." + TablasVO.getTabla() + "; \n");
                        html.append("ALTER TABLE " + TablasVO.getEsquema() + "." + nombre_objeto + " ADD " + registradopor.substring(0, 4) + "_OPERACION VARCHAR(1) DEFAULT 'I' NOT NULL; \n");
                        html.append(auditora_atributos.toString());
                        html.append("\n");
                        html.append(" / ");
                        html.append("\n\n");

                        html.append("CREATE OR REPLACE TRIGGER " + TablasVO.getEsquema() + "." + nombre_trigg + " AFTER \n");
                        html.append("INSERT ON " + TablasVO.getEsquema() + "." + TablasVO.getTabla() + " FOR EACH ROW BEGIN  \n");
                        html.append("INSERT INTO " + TablasVO.getEsquema() + "." + nombre_objeto + "(  \n");
                        html.append(auditora_campos);
                        html.append("     " + registradopor.substring(0, 4) + "_OPERACION \n");
                        html.append(") \n");
                        html.append("VALUES( \n");
                        html.append(auditora_valores);
                        html.append("     'I' \n");
                        html.append("); \n");
                        html.append("END; \n");

                        nombre_trigg = "";
                        nombre_trigg = "TR_" + TablasVO.getEsquema() + "_U_" + TablasVO.getTabla();
                        if (nombre_trigg.length() > l_objetos) {
                            nombre_trigg = nombre_trigg.substring(0, l_objetos);
                        }

                        html.append("\n");
                        html.append(" / ");
                        html.append("\n\n");
                        html.append("CREATE OR REPLACE TRIGGER " + TablasVO.getEsquema() + "." + nombre_trigg + " AFTER \n");
                        html.append("UPDATE ON " + TablasVO.getEsquema() + "." + TablasVO.getTabla() + " FOR EACH ROW BEGIN  \n");
                        html.append("INSERT INTO " + TablasVO.getEsquema() + "." + nombre_objeto + "(  \n");
                        html.append(auditora_campos);
                        html.append("     " + registradopor.substring(0, 4) + "_OPERACION \n");
                        html.append(") \n");
                        html.append("VALUES( \n");
                        html.append(auditora_valores);
                        html.append("     'U' \n");
                        html.append("); \n");
                        html.append("END; \n");

                        html.append(" / ");
                        html.append("\n\n");
                    }
                    if (!o.Compara(valueobje, "")) {
                        html.append("---VALUEOBJECTS PARA LA TABLA " + TablasVO.getEsquema() + "." + TablasVO.getTabla() + " \n");
                        html.append("\n\n");
                        html.append(campos_vos.toString());
                    }
                }
                if (!o.Compara(secuencia, "")) {
                    ddl.append(secuencias);
                    ddl.append("\n\n");
                }
                ddl.append(html);

            }
        } else {
            html.append("No se encontro lista de seleccion a generar.");
        }
        ObjetoRespuestaVO.setRespuesta("3");
        ObjetoRespuestaVO.setHtml(ddl.toString());
        respuestaxml = false;
    }
    out.clear();
    if (respuestaxml) {
        RespuestaXML RespuestaXML = new RespuestaXML();
        out.print(RespuestaXML.GenerarXML(ObjetoRespuestaVO));
    } else {
        out.print(ObjetoRespuestaVO.getHtml());
    }
%>
