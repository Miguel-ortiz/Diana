<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
        <title>GENERADOR DDL'S</title>
        <link rel="stylesheet" type="text/css" href="css/reset.css" media="screen" />
        <link rel="stylesheet" type="text/css" href="css/forms.css" media="screen" />
        <script src="js/jquery.js" type="text/javascript"></script>
        <script src="js/controlador.js" type="text/javascript" ></script>
        <script src="js/jquery.validate.js" type="text/javascript" ></script>
        <script src="js/jquery.easyui.min.js" type="text/javascript" ></script>
        <script src="js/jquery.tabs.js" type="text/javascript" ></script>
        <script>
            
        </script>
    </head>
    <body>
        <div class="container_12">
            <div style="clear:both;"></div>
            <div class="grid_12">
                <div class="module">
                    <h2><span>CONTRUIR CADENAS</span></h2>
                    <div class="module-body">
                        <form class="form-aplication" method="post" action="gen_ctr.jsp?modulo=tablas" autocomplete="off" id="FormAplication" name="FormAplication">
                            <fieldset class="form-fieldset">
                                <legend>Buscador de Tablas</legend>
                                <div class="form-div">
                                    <label for="">NOMBRE VARIABLE : </label>
                                    <input name="nombre_txt" id="nombre_txt" value="sql" onblur="transformar()" />
                                </div>
                                <div class="form-div">
                                    <label for="">SALTO DE LINEA : </label>
                                    <input type="checkbox" name="sallin_che" id="sallin_che" onclick="transformar()" value="1" checked onblur="transformar()" />
                                </div>
                            </fieldset>                            
                            <fieldset class="form-fieldset">
                                <legend>Resultados</legend>
                                <div style="padding: 0 5px;">
                                    <div id="resultados" style="float: left; width: 49%;">
                                        <textarea name="precad_txt" onblur="transformar()" id="precad_txt" style="width: 98%; margin-left: 10px;" rows="15"></textarea>
                                    </div>
                                    <div style="float:left; width: 49%;">
                                        <textarea name="conten_txt" id="conten_txt" style="width: 98%; margin-left: 10px;" rows="15"></textarea>
                                    </div>
                                    <div style="clear:both;"></div>
                                </div>
                            </fieldset>
                            <div id="dialog"></div>
                            <div class="">
                                <input type="hidden" name="validar" id="validar" value="" />
                                <input type="hidden" name="panel" id="panel" value="resultados" />
                            </div>
                            <div class="clear"></div>
                        </form>
                    </div> 

                </div>  
                <input type="button" onclick="location.href = 'index.jsp';
                        return false;" value="DLL BASE"  title="DLL"/>
                <div style="clear:both;"></div>
            </div> 
            <div style="clear:both;"></div>
        </div> 
    </body>
</html>
