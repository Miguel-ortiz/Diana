package unicundi.ddl.fachada;

import java.io.UnsupportedEncodingException;


public class ProcesaCaracEspeciales {

    public static String quitarEspeciales(String str, int a) throws UnsupportedEncodingException {
        String res = "";

        if (str != null) {
            //res = str;

            res = res.replaceAll("&aacute;", "a");
            res = res.replaceAll("&eacute;", "e");
            res = res.replaceAll("&iacute;", "i");
            res = res.replaceAll("&oacute;", "o");
            res = res.replaceAll("&uacute;", "u");
            res = res.replaceAll("&Aacute;", "A");
            res = res.replaceAll("&Eacute;", "E");
            res = res.replaceAll("&Iacute;", "I");
            res = res.replaceAll("&Oacute;", "O");
            res = res.replaceAll("&Uacute;", "U");

            res = res.replaceAll("&auml;", "a");
            res = res.replaceAll("&euml;", "e");
            res = res.replaceAll("&iuml;", "i");
            res = res.replaceAll("&ouml;", "o");
            res = res.replaceAll("&uuml;", "u");
            res = res.replaceAll("&Auml;", "A");
            res = res.replaceAll("&Euml;", "E");
            res = res.replaceAll("&Iuml;", "I");
            res = res.replaceAll("&Ouml;", "O");
            res = res.replaceAll("&Uuml;", "U");

            res = res.replaceAll("&Ntilde;", "N");
            res = res.replaceAll("&ntilde;", "n");
            res = res.replaceAll("&deg;", "_");

            res = res.replaceAll("&iquest;", "_");
            res = res.replaceAll("&iexcl;", "_");

            res = res.replaceAll("&acirc;", "a");
            res = res.replaceAll("&ecirc;", "e");
            res = res.replaceAll("&icirc;", "i");
            res = res.replaceAll("&ocirc;", "o");
            res = res.replaceAll("&ucirc;", "u");

            res = res.replaceAll("&Acirc;", "A");
            res = res.replaceAll("&Ecirc;", "E");
            res = res.replaceAll("&Icirc;", "I");
            res = res.replaceAll("&Ocirc;", "O");
            res = res.replaceAll("&Ucirc;", "U");

            res = res.replaceAll("&agrave;", "a");
            res = res.replaceAll("&egrave;", "e");
            res = res.replaceAll("&igrave;", "i");
            res = res.replaceAll("&ograve;", "o");
            res = res.replaceAll("&ugrave;", "u");

            res = res.replaceAll("&Agrave;", "A");
            res = res.replaceAll("&Egrave;", "E");
            res = res.replaceAll("&Igrave;", "I");
            res = res.replaceAll("&Ograve;", "O");
            res = res.replaceAll("&Ugrave;", "U");

            res = res.replaceAll("&ccedil;", "c");
            res = res.replaceAll("&Ccedil;", "C");

            res = res.replaceAll("á", "a");

            res = res.replaceAll("á", "a");
            res = res.replaceAll("é", "e");
            res = res.replaceAll("í", "i");
            res = res.replaceAll("ó", "o");
            res = res.replaceAll("ú", "u");
            res = res.replaceAll("Á", "A");
            res = res.replaceAll("É", "E");
            res = res.replaceAll("Í", "I");
            res = res.replaceAll("Ó", "O");
            res = res.replaceAll("Ú", "U");

            res = res.replaceAll("ä", "a");
            res = res.replaceAll("ë", "e");
            res = res.replaceAll("ï", "i");
            res = res.replaceAll("ö", "o");
            res = res.replaceAll("ü", "u");
            res = res.replaceAll("Ä", "A");
            res = res.replaceAll("Ë", "E");
            res = res.replaceAll("Ï", "I");
            res = res.replaceAll("Ö", "O");
            res = res.replaceAll("Ü", "U");

            res = res.replaceAll("Ñ", "N");
            res = res.replaceAll("ñ", "n");
            res = res.replaceAll("º", "_");

            res = res.replaceAll("¿", "_");
            res = res.replaceAll("¡", "_");

            res = res.replaceAll("â", "a");
            res = res.replaceAll("ê", "e");
            res = res.replaceAll("î", "i");
            res = res.replaceAll("ô", "o");
            res = res.replaceAll("û", "u");

            res = res.replaceAll("Â", "A");
            res = res.replaceAll("Ê", "E");
            res = res.replaceAll("Î", "I");
            res = res.replaceAll("Ô", "O");
            res = res.replaceAll("Û", "U");

            res = res.replaceAll("à", "a");
            res = res.replaceAll("è", "e");
            res = res.replaceAll("ì", "i");
            res = res.replaceAll("ò", "o");
            res = res.replaceAll("ù", "u");

            res = res.replaceAll("À", "A");
            res = res.replaceAll("È", "E");
            res = res.replaceAll("Ì", "I");
            res = res.replaceAll("Ò", "O");
            res = res.replaceAll("Ù", "U");

            res = res.replaceAll("ç", "c");
            res = res.replaceAll("Ç", "C");
            res = new String(str.getBytes(), "UTF-8");
        }

        return res;
    }

    public static String quitarEspeciales(String input) throws UnsupportedEncodingException {
        // Cadena de caracteres original a sustituir.
        String original = "áàäéèëíìïóòöúùuñÁÀÄÉÈËÍÌÏÓÒÖÚÙÜÑçÇñÑ";
        // Cadena de caracteres ASCII que reemplazarán los originales.
        String ascii = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcCnN";
        String output = input;
        for (int i = 0; i < original.length(); i++) {
            // Reemplazamos los caracteres especiales.
            output = output.replace(original.charAt(i), ascii.charAt(i));
        }//for i
        return output;
    }
}
