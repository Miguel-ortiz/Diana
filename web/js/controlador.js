// JavaScript Document
var maximo = 10;
var tabs;
var validator;
var nitems = 0;
var ndocumentos = 0;


$(document).ready(function () {
    validador();
    validadorFormDialog();
    validadorBusqueda();
    fechas();
});

function fechas() {
    $(".fecha").datepicker({
        buttonImage: false,
        dateFormat: "dd-mm-yy",
        changeYear: true,
        numberOfMonths: 1
    });
    $(".fechajanium").datepicker({
        buttonImage: false,
        dateFormat: "yymmdd",
        changeYear: true,
        numberOfMonths: 1
    });
}

jQuery.fn.reset = function () {
    $(this).each(function () {
        this.reset();
    });
}

function validador() {
    validator = $("#FormAplication").validate({
        rules: {
        },
        messages: {
        },
        submitHandler: function () {
            try {
                if (ValidarCKEditor('FormAplication')) {
                    return false;
                }
            } catch (ex) {
                alert(ex);
            }
            var cadenaFormulario = $('#FormAplication').serialize();
            var request = $('#FormAplication').attr('action');
            alerta("Mensaje del Sistema", "espera", "dialog");
            //alert(cadenaFormulario);
            //Salert(request);
            $.ajax({
                url: request,
                type: "POST",
                data: cadenaFormulario,
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                //dataType: ($.browser.msie) ? "text" : "xml",
                dataType: "xml",
                success: function (datos) {
                    var xml;
                    /*if (typeof datos == 'string') {
                     xml = new ActiveXObject('Microsoft.XMLDOM');
                     xml.async = false;
                     xml.loadXML(datos);
                     } else {
                     }*/
                    xml = datos;
                    procesarRequest(xml);
                },
                error: function () {
                    alert("Error en el procesamiento");
                }
            });
        },
        success: function (label) {

        }
    });
}


function alerta() {
    $('#contenedor').dialog('open')
}


function procesarRequest(response) {
    var respuesta = "";
    var errores = "";
    var html = "";
    var noprocesado = "";
    var mensaje = "";
    var operacion = "";
    $(response).find("ejecucion").each(function () {
        respuesta += $(this).find("respuesta").text();
        //alert(respuesta);
        errores += $(this).find("errores").text();
        //alert(errores);
        mensaje += $(this).find("mensaje").text();
        //alert(mensaje);
        operacion += $(this).find("operacion").text();
        //alert(operacion);
        html += $(this).find("codigo").text();
    });
    $("#mensaje").dialog("destroy");
    $("#mensaje").remove();
    if (_isNumeric(respuesta)) {
        if (respuesta == 0) {
            if ($.trim(html) != "" || $.trim(errores) != "") {
                if ($.trim(errores) != "") {
                    html += "<br/><a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a></a><div id='errores' style='display:none;'>" + errores + "</div>";
                }
                ModalRequest("Mensaje del Sistema", html, "dialog");
            }
        }
        if (respuesta == 1) {
            if ($.trim(html) != "" || $.trim(errores) != "") {
                if ($.trim(errores) != "") {
                    html += "<br/><a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a></a><div id='errores' style='display:none;'>" + errores + "</div>";
                }
                ModalRequest("Mensaje del Sistema", html, "dialog");
            } else {
                ModalRequest("Mensaje del Sistema", "<center>Ninguna respuesta HTML<br/><br/><input type='button' value = 'Cerrar Mensaje' onclick='$(\"#FormDialog\").dialog(\"destroy\"); $(\"#FormDialog\").remove();'  class='ui-button ui-button-text-only ui-widget ui-state-default ui-corner-all'></center>", "dialog");
            }
        }
        if (respuesta == 2) {
            var pagina = $('#pagina_ocu').val();        ///crear en el formualrio campo oculto con el valor de la pagina a direccionar
            location.href = pagina;
        }
        if (respuesta == 3) {               ///crear en el formualrio campo oculto con el valor del id de la tabla o contenedor html
            var id = $('#panel').val();
            $('#' + id).html(html);
            var error = "";
            if ($.trim(errores) != "") {
                error += "<br/><a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a></a><div id='errores' style='display:none;'>" + errores + "</div>";
                ModalRequest("Mensaje del Sistema", error, "dialog");
            }
            /*var id = $('#iderec_ocu').val();
             LimpiarContenidos();*/
        }
        if (respuesta == 4) {               ///crear en el formualrio campo oculto con el valor del id de la tabla o contenedor html
            //alert(html);
            var id = $('#Form-Dialog #panel').val();
            $('#' + id).append(html);
            SumarClaseHiden('totalhoras', 't_hplan');
            /*var id = $('#iderec_ocu').val();
             LimpiarContenidos();*/
        }

    } else {
        if (errores != "") {
            noprocesado += "El proceso no se ha ejecutado <br/>";
            noprocesado += "<a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a><div id='errores' style='display:none;'>" + errores + "</div>";
            ModalRequest("Mensaje del Sistema", noprocesado, "dialog");
        }
    }
}



function eliminaFunciones(url, id) {
    ///alert(url);
    if (url != "") {
        alerta("Mensaje del Sistema", "espera", "dialog");
        $.ajax({
            url: url + '&tr=' + id,
            type: "POST",
            data: "",
            contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
            dataType: "xml",
            success: function (datos) {
                procesarRequest(datos);
            },
            error: function () {
                alert("Error en el procesamiento");
            }
        });
    }
}


function EliminarFila(ind, url, obj, modulo) {
    var cadenaFormulario = "indexm_ocu=" + ind;
    alerta("Mensaje del Sistema", "espera", "dialog");
    $.ajax({
        url: url,
        type: "POST",
        data: cadenaFormulario,
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: "xml",
        success: function (datos) {
            var xml;
            xml = datos;
            var respuesta = "";
            var errores = "";
            var html = "";
            var noprocesado = "";
            $(xml).find("ejecucion").each(function () {
                respuesta += $(this).find("respuesta").text();
                errores += $(this).find("errores").text();
                html += $(this).find("codigo").text();
            });

            $("#mensaje").dialog("destroy");
            $("#mensaje").remove();
            if (_isNumeric(respuesta)) {
                if (respuesta == 0) {
                    if (html != "" || errores != "") {
                        if (errores != "") {
                            html += "<br/><a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a></a><div id='errores' style='display:none;'>" + errores + "</div>";
                        }
                        ModalRequest("Mensaje del Sistema", html, "dialog");
                    }
                }


                if (respuesta == 1) {
                    if (modulo == 'EliminarModulo') {
                        $($(obj).parent().parent()).remove();
                    }
                    if (html != "") {
                        if (errores != "") {
                            html += "<br/><a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a></a><div id='errores' style='display:none;'>" + errores + "</div>";
                        }
                        ModalRequest("Mensaje del Sistema", html, "dialog");
                    }
                }
            } else {
                if (errores != "") {
                    noprocesado += "El proceso no se ha ejecutado <br/>";
                    noprocesado += "<a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a><div id='errores' style='display:none;'>" + errores + "</div>";
                    ModalRequest("Mensaje del Sistema", noprocesado, "dialog");
                }
            }
        },
        error: function () {
            alert("Error en el procesamiento");
        }
    });
}





function LimpiarContenidos() {
    document.getElementById('Form-Dialog').reset();
    //$('#conten_txt').val('');
    CKEDITOR.instances["conten_txt"].setData('');
    CKEDITOR.instances["conten_txt"].updateElement();
    $('#t-items').html('');
}

function ventanaNueva(url) {
    var opciones = "left=100,top=100,width=800,height=500,toolbar=yes,resizable=yes";
    mi_ventana = window.open(url, "", opciones);
}

function _isNumeric(valor) {
    var _is = false;
    try {
        eval(valor);
        _is = true;
    } catch (ex) {
        _is = false;
    }
    return _is;
}

function cargarLista(id, url, tipo) {
    document.getElementById(id).disabled = "disabled";
    if (url != "") {
        $.ajax({
            url: url,
            type: "POST",
            data: "",
            success: function (datos) {
                if (tipo == 0) {
                    $("#" + id).html("");
                    $("#" + id).append(datos);
                }
                if (tipo == 1) {
                    document.getElementById(id).value = datos;
                }
                document.getElementById(id).disabled = false;
            },
            error: function () {
                alert("Error en el procesamiento");
            }
        });
    }
    $('#' + id).show();
}

function direccionarlink(url) {
    if (url != "") {
        location.href = url;
    }
}

function ModalRequest(titulo, mensaje, id) {
    if (mensaje == "espera") {
        document.getElementById(id).innerHTML = "<div id='mensaje' title='" + titulo + "'><center><img src='images/cargando.gif'></center></div>";
    } else {
        document.getElementById(id).innerHTML = "<div id='mensaje' title='" + titulo + "'>" + mensaje + "</div>";
    }
    $("#mensaje").dialog({
        height: 'auto',
        width: 'auto',
        bgiframe: true,
        closeOnEscape: false,
        overlay: {
            opacity: 0.3,
            background: "black"
        },
        beforeClose: function (event, ui) {
            $("#mensaje").remove();
        },
        hide: "scale",
        modal: true
    });
}


function validadorBusqueda() {
    validator = $("#Form-Buscar").validate({
        rules: {
        },
        messages: {
        },
        submitHandler: function () {
            var cadenaFormulario = $('#Form-Buscar').serialize();
            var request = $('#Form-Buscar #request').val();
            var funcion = $('#Form-Buscar #accion').val();
            var texto = "";
            if ($('#Form-Buscar #validar').val() != '') {
                var campos = $('#Form-Buscar #validar').val();
                if (campos != "") {
                    var vector = campos.split(",");
                    var lleno = 0;
                    for (a = 0; a < vector.length; a++) {
                        //alert($('#' + vector[a]).attr('type'));
                        if ($('#' + vector[a]).attr("type") == 'checkbox') {
                            //alert($('#' + vector[a]).is("checked"));
                            if ($('#' + vector[a]).is(":checked")) {
                                lleno++;
                            }
                        } else {
                            if (document.getElementById(vector[a]).value != "")
                                lleno++;
                        }
                    }
                } else
                    lleno = 1;
                if (lleno == 0) {
                    alert("Digite algun parametro de busqueda");
                    return 0;
                }
            }
            alerta("Mensaje del Sistema", "espera", "dialog");
            $.ajax({
                url: request,
                type: "POST",
                data: cadenaFormulario,
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                success: function (datos) {
                    procesar(funcion, datos);
                },
                error: function () {
                    alert("Error en el procesamiento");
                }
            });
        },
        success: function (label) {

        }
    });
}



function procesar(accion, datos) {
    accion = accion.toString();
    var validarsession = new String(datos);

    try {
        var n = validarsession.match(/exit/gi);
        if (n.length > 0) {
            $("#mensaje").dialog("destroy");
            $("#mensaje").remove();
            alerta("SU SESION A TERMINADO", "LO SENTIMOS SU SESION NO HA PODIDO VERIFICARSE <br/> <br/> <center><input type='button' value = 'Cerrar' onclick='location.href=\"fuera.jsp\"' class='ui-button ui-button-text-only ui-widget ui-state-default ui-corner-all'></center>", "dialog")
            return false;
        }
    } catch (ex) {
    }

    if (accion == 'listar') {
        $("#mensaje").dialog("destroy");
        $("#mensaje").remove();
        $('#panelResultados').html('');
        $('#panelResultados').append(datos);
        //$(".ui-dialog-titlebar-close").show();
    }

    if (accion == 'enviarusuarios') {
        $("#mensaje").dialog("destroy");
        $("#mensaje").remove();
        $('#panelProcesamiento').html('');
        $('#panelProcesamiento').append(datos);
        $("#FormAplicationBuscar").submit();
    }
    return false;
}

function SeleccionarChecks(id, clase) {
    if ($('#' + id).is(':checked')) {
        $("." + clase).prop('checked', true);
    } else {
        $("." + clase).prop('checked', false);
    }
    ContarChecks(clase);
}

function ContarChecks(clase) {
    $("#numsel_txt").val($('input.' + clase + ':checkbox:checked').size());
}

function ProcesarSelecciones(clase, form) {
    if ($("." + clase + ":checked").size() < 1) {
        alert("Ninguna Registro Seleccionado");
        return false;
    }
    if ($("#vigenc_txt").val() == '') {
        alert("El Campo de Vigencia es Obligatorio");
        $("#vigenc_txt").focus();
        return false;
    }
    alerta("Mensaje del Sistema", "espera", "dialog");
    var cadenaFormulario = $('#' + form).serialize();
    //alert(cadenaFormulario);
    $.ajax({
        url: "jan_usu_epr.jsp",
        type: "POST",
        data: cadenaFormulario,
        cache: false,
        success: function (datos) {
            procesar('enviarusuarios', datos);
        },
        error: function () {
            alert("Error en el procesamiento");
        }
    });
}

function ventanaCerrar() {
    if (confirm("Esta seguro de salir de la Aplicacion")) {
        var opciones = "width=260, height=105, screenX=0, screenY=0, top=0, left=0, scrollbars=no, status=no, resizable=no";
        mi_close = window.open("fueraX.jsp", "FUERA", opciones);
        parent.window.close();
    }
}

function ValidarCKEditor(FormId) {
    var respuesta = false;
    try {
        for (var i in CKEDITOR.instances) {
            CKEDITOR.instances[i].updateElement();
            if (CKEDITOR.instances[i].getData() == "") {
                var requerido = 0;
                try {
                    if (FormId != '' && FormId != undefined) {
                        //alert('#' + FormId + ' #' + CKEDITOR.instances[i].name);
                        var clases = $('#' + FormId + ' #' + CKEDITOR.instances[i].name).attr('class').split(/\s+/);
                        //alert("con form id " + clases.length);
                    } else {
                        //alert('#' + CKEDITOR.instances[i].name);
                        var clases = $('#' + CKEDITOR.instances[i].name).attr('class').split(/\s+/);
                        //alert("Sin form id " + clases.length);
                    }
                    for (a = 0; a < clases.length; a++) {
                        if (clases[a] == 'required') {
                            requerido = 1;
                            break;
                        }
                    }
                } catch (ex) {
                    console.log("No soportado CKEDITOR ERROR  : " + ex);
                }
                if (requerido != 0) {
                    alert('No se ha generado Contenido para el campo de texto.')
                    CKEDITOR.instances[i].focus();
                    respuesta = true;
                    break;
                }
            }
        }
    } catch (ex) {
    }
    return respuesta;
}


function ProcesarOpciones(operacion, url) {
    if (operacion == 1) {
        var ind = "";
        if ($("input[name='indarr_rad']:radio").is(':checked')) {
            ind = $("input:radio[name='indarr_rad']:checked").val();
            location.href = url + "?oper=retomar&ind=" + ind;
        } else {
            $("#errores").html("<strong>Debe seleccionar una opcion.</strong>");
        }
    }
    if (operacion == 2) {
        var ind = "";
        if ($("input[name='escala_rad']:radio").is(':checked')) {
            ind = $("input:radio[name='escala_rad']:checked").val();
            $('#FormAplication').submit();
        } else {
            $("#validacion").html("<strong style='color:#F00;'>Debe seleccionar una escala de Evaluaci\xf3n.</strong>");
        }
    }
    if (operacion == 3) {
        if ($.trim($("#respue_txt").val()) != '') {
            $('#FormAplication').submit();
        } else {
            $("#validacion").html("<strong style='color:#F00;'>No se encontro respuesta a esta pregunta de Evaluaci\xf3n.</strong>");
        }
    }
}


function FormDialog(url, widht, height, titulo) {
    CerrarFormDialog();
    $("body").append('<div id="FormDialog"></div>');
    $('#FormDialog').dialog({
        modal: true,
        open: function ()
        {
            $(this).load(url + "&ramdon=" + new Date().getTime());
        },
        close: function (event, ui) {
            CKEDITOR.remove(CKEDITOR.instances['conten_txt']);
        },
        height: height,
        width: widht,
        title: titulo,
        position: 'center top',
        bgiframe: true,
        hide: "scale",
        show: "scale"
    });
}


function validadorFormDialog() {
    validator = $("#Form-Dialog").validate({
        rules: {
        },
        messages: {
        },
        submitHandler: function () {
            try {
                if (ValidarCKEditor()) {
                    return false;
                }
            } catch (ex) {
                alert(ex);
            }
            var cadenaFormulario = $('#Form-Dialog').serialize();
            var request = $('#Form-Dialog #request').val();
            var funcion = $('#Form-Dialog #accion').val();
            //alert(cadenaFormulario);
            alerta("Mensaje del Sistema", "espera", "dialog");
            $.ajax({
                url: request,
                type: "POST",
                data: cadenaFormulario,
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                //dataType: ($.browser.msie) ? "text" : "xml",
                dataType: "xml",
                success: function (datos) {
                    var xml;
                    /*if (typeof datos == 'string') {
                     xml = new ActiveXObject('Microsoft.XMLDOM');
                     xml.async = false;
                     xml.loadXML(datos);
                     } else {
                     }*/
                    xml = datos;
                    procesarRequest(xml);
                },
                error: function () {
                    alert("Error en el procesamiento");
                }
            });
        },
        success: function (label) {

        }
    });
}


function validadorFormTableBuscar() {
    validator = $("#Form-TableBuscar").validate({
        rules: {},
        messages: {},
        submitHandler: function () {
            try {
                if (ValidarCKEditor('Form-TableBuscar')) {
                    return false;
                }
            } catch (ex) {
                alert(ex);
            }
            var cadenaFormulario = $('#Form-TableBuscar').serialize();
            var request = $('#Form-TableBuscar #request').val();
            var funcion = $('#Form-TableBuscar #accion').val();
            alerta("Mensaje del Sistema", "espera", "dialog");
            //alert(request);
            //alert(cadenaFormulario);
            $.ajax({
                url: request,
                type: "POST",
                data: cadenaFormulario,
                contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
                //dataType: ($.browser.msie) ? "text" : "xml",
                dataType: "xml",
                success: function (datos) {
                    var xml;
                    /*if (typeof datos == 'string') {
                     xml = new ActiveXObject('Microsoft.XMLDOM');
                     xml.async = false;
                     xml.loadXML(datos);
                     } else {
                     }*/
                    xml = datos;
                    procesarRequest(xml);
                },
                error: function () {
                    alert("Error en el procesamiento");
                }
            });
        },
        success: function (label) {

        }
    });
}

function PaginaResultadosCantidad(id, count) {
    $("." + id)
            .tablesorter({
                widthFixed: true,
                widgets: ['zebra'],
                headers: {
                    0: {
                        sorter: false
                    }
                }
            })
            .tablesorterPager({
                container: $("#pager"),
                size: count
            });
}


function RegargarTag(id, url, tipo) {
    //alert(url);
    if (url != "") {
        $.ajax({
            url: url,
            type: "POST",
            data: "",
            success: function (datos) {
                //alert(datos);
                if (tipo == 'select') {
                    $("#" + id).html("");
                    $("#" + id).append(datos);
                }
                if (tipo == 'table') {
                    $("#" + id).html("");
                    $("#" + id).append(datos);
                }
                if (tipo == 'div') {
                    $("#" + id).html(datos);
                }
            },
            error: function () {
                alert("Error en el procesamiento");
            }
        });
    }
}


function EnviarOperacion(url, obj, modulo) {
    if (modulo == 'eliminarContenido') {
        if (!confirm("Eliminar El Contenido y Su Intensidad ?")) {
            return false;
        }
    }
    alerta("Mensaje del Sistema", "espera", "dialog");
    $.ajax({
        url: url,
        type: "POST",
        data: "modulo=" + modulo,
        contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
        dataType: "xml",
        success: function (datos) {
            var xml;
            xml = datos;
            var respuesta = "";
            var errores = "";
            var html = "";
            var noprocesado = "";
            $(xml).find("ejecucion").each(function () {
                respuesta += $(this).find("respuesta").text();
                errores += $(this).find("errores").text();
                html += $(this).find("codigo").text();
            });
            $("#mensaje").dialog("destroy");
            $("#mensaje").remove();
            if (_isNumeric(respuesta)) {
                if (respuesta == 1) {
                    if (modulo == 'Enviarplantrabajo') {
                        if ($.trim(html) != "") {
                            if ($.trim(errores) != "") {
                                html += "<br/><a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a></a><div id='errores' style='display:none;'>" + errores + "</div>";
                            }
                            ModalRequest("Mensaje del Sistema", html, "dialog");
                        } else {
                            href.location = 'doc_pla_tra.jsp';
                        }
                    }

                    if (modulo == 'avalarplan' || modulo == 'rechazarplan') {
                        if ($.trim(html) != "") {
                            if ($.trim(errores) != "") {
                                html += "<br/><a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a></a><div id='errores' style='display:none;'>" + errores + "</div>";
                            }
                            ModalRequest("Mensaje del Sistema", html, "dialog");
                        } else {
                            href.location = 'jef_pla_tra.jsp';
                        }
                    }

                    if (modulo == 'revisarsig') {
                        location.reload();
                    }
                }
                if (respuesta == 0) {
                    if (errores != "") {
                        noprocesado += "El proceso no se ha ejecutado <br/>";
                        noprocesado += "<center><input type='button' value = 'Cerrar' onclick='$(\"#mensaje\").dialog(\"destroy\"); $(\"#mensaje\").remove()'  class='ui-button ui-button-text-only ui-widget ui-state-default ui-corner-all'></center> <br/>";
                        noprocesado += "<a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a><div id='errores' style='display:none;'>" + errores + "</div>";
                        ModalRequest("Mensaje del Sistema", noprocesado, "dialog");
                    }
                }
            } else {
                if (errores != "") {
                    noprocesado += "El proceso no se ha ejecutado <br/>";
                    noprocesado += "<a href='javascript:void(null)' onclick='$(\"#errores\").show();'> Mostrar Errores </a><div id='errores' style='display:none;'>" + errores + "</div>";
                    ModalRequest("Mensaje del Sistema", noprocesado, "dialog");
                }
            }
        },
        error: function () {
            alert("Error en el procesamiento");
        }
    });
}

function CerrarFormDialog() {
    $("#FormDialog").dialog("destroy");
    $("#FormDialog").remove();
}


function buscarXML(xml, nodo) {
    var valor = "";
    $(xml).find("ejecucion").each(function () {
        valor += $(this).find(nodo).text();
    });
    return valor;
}


function SumarClase(clase, id) {
    var suma = 0;
    $('.' + clase).each(function () {
        suma += parseInt($(this).text())
    })
    $('#' + id).val(suma);
}


function SumarClaseHiden(clase, id) {
    var suma = 0;
    $('.' + clase).each(function () {
        suma += parseInt($(this).val())
    })
    $('#' + id).html(suma);
}

function validarSeleccion(name, form, campovalue) {
    try {
        var lista = document.getElementsByName(name);
        for (a = 0; a < lista.length; a++) {
            if (lista[a].checked) {
                document.getElementById(campovalue).value = lista[a].value;
            }
        }

        if ($('#' + campovalue).val() != "") {
            document.getElementById(form).submit();
        } else {
            alert("Ninguna seleccion encontrada");
        }
    }
    catch (ex) {
        alert("Ninguna seleccion encontrada");
    }
}

function strTrim(x)
{
    return x.replace(/^\s+|\s+$/gm, '');
}




function addPanel(titulo, url) {
    var tab = $('#tt').tabs('exists', titulo);
    if (tab) {
        $('#tt').tabs('select', titulo);
    } else {
        if (titulo == 'Evaluado') {
            $('#tt').tabs('add', {
                title: titulo,
                content: '<div style="padding:10px;">' +
                        '<iframe src="' + url + '" id="' + titulo + '" style="height: 1000px;"></iframe></div>',
                closable: true
            });
        } else {
            $('#tt').tabs('add', {
                title: titulo,
                content: '<div style="padding:10px;">' +
                        '<iframe src="' + url + '" id="' + titulo + '" onload="autofitIframe(this);"></iframe></div>',
                closable: true
            });
        }
    }
}
function removePanel() {
    var tab = $('#tt').tabs('getSelected');
    if (tab) {
        var index = $('#tt').tabs('getTabIndex', tab);
        $('#tt').tabs('close', index);
    }
}

function autofitIframe(id) {
    if (!window.opera && document.all && document.getElementById) {
        id.style.height = id.contentWindow.document.body.scrollHeight;
    } else if (document.getElementById) {
        id.style.height = id.contentDocument.body.scrollHeight + "px";
    }
}

function EnviarChecksActivos(clase) {
    if ($('input.' + clase + ':checkbox:checked').size() > 0) {
        $('#conten_txt').val('');
        var cadenaFormulario = $('#FormAplication').serialize();
        //alert(cadenaFormulario);
        $.ajax({
            url: "gen_ctr.jsp?modulo=generar",
            type: "POST",
            data: cadenaFormulario,
            success: function (datos) {
                $('#conten_txt').val(datos);
            },
            error: function () {
                alert("Error en el procesamiento");
            }
        });
    } else {
        alert("Ninguna Tabla Seleccionada");
    }
}


function transformar() {
    var valor = document.getElementById('precad_txt').value;
    var cadena = new String(valor);
    var lineas = cadena.split("\n");
    var cadena = "";
    var cierrecade = "";
    if (document.getElementById("sallin_che").checked) {
        cierrecade = " \\n\\t\"); \n";
    } else {
        cierrecade = " \"); \n";
    }
    if (valor != "") {
        for (var nCiclos = 0; nCiclos < lineas.length; nCiclos++) {
            var str = lineas[nCiclos];
            if (str.indexOf('"') != -1) {
                str = str.replace(/"/g, '\\"');
            }
            cadena += document.getElementById('nombre_txt').value + ".append(\"" + str + cierrecade;
        }
    }
    document.getElementById('conten_txt').value = cadena;
}


/*************************************************************/
/****************  IDIOMA CALENDARIO *************************/
/*************************************************************/
jQuery(function ($) {
    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '&#x3c;Ant',
        nextText: 'Sig&#x3e;',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
            'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Mi&eacute;rcoles', 'Jueves', 'Viernes', 'S&aacute;bado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mi&eacute;', 'Juv', 'Vie', 'S&aacute;b'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'S&aacute;'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
});
/*************************************************************/
/****************  IDIOMA CALENDARIO *************************/
/*************************************************************/