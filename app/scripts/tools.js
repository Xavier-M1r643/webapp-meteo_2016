/** -----------------------------------------------------------------------------------------  */
/**                             FN UTILITAIRES ET POLYFILLS                                    */
/** -----------------------------------------------------------------------------------------  */

var Outils = (function () {
    'use strict';
    
    var _annee = '2016';

    function _getAnnee(args) {
        return _annee;
    }
    
    return {
        publicAuthor: 'xm',
        publicAnnee: function (args) {
            return _getAnnee(args);
        },
        capLettre: function (str) {
            return str.replace(/(^|\s)[a-z]/g, function (x) { return x.toUpperCase(); });
        },
        isCanvas: function () {
            var element = document.createElement('canvas');
            return !!(element.getContext && element.getContext('2d'));
        }
    };
}());