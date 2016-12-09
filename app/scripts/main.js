// http://openweathermap.org/current - http://openweathermap.org/weather-conditions
// API KEY: 4b293127355eaa7cf94574d9d0bad2fb
// Code de ville - Québec: 6325494 - Paris: 2988507

var $, moment, Outils;

(function () {
    'use strict';
    
    var ctx = document.querySelector('canvas').getContext('2d'), datedujour = document.querySelector('.date'), maintenant = moment();
    
    // ---------------------------------------------------------------------------------------
    function getMeteo() {
        $.ajax('http://api.openweathermap.org/data/2.5/weather?id=6325494&units=metric&APPID=0c98af945c8169d1e0fb538cd4ff153f', {'type': 'GET',
                'format': 'json',
                'cache': 'false'
            }).done(function (data, textStatus, jqXHR) {
            
             // DONNÉES DE LA JOURNÉE.
			window.console.dir(data);
            
            // VARIABLES
            var imgIcone = new Image(), tendance = data.weather[0].main;

            // data.weather[0].icon;
            imgIcone.onload = function () {
                ctx.drawImage(imgIcone, 0, 0, imgIcone.width * 0.3, imgIcone.height * 0.3);
                // Récupération des infos de l'image pour l'inversion des couleurs.
                var imageData = ctx.getImageData(0, 0, imgIcone.width, imgIcone.height);
                var datax = imageData.data;
                
                for (var i = 0; i < datax.length; i += 4) {
                  datax[i]      = 255 - datax[i];       // red
                  datax[i + 1]  = 255 - datax[i + 1];   // green
                  datax[i + 2]  = 255 - datax[i + 2];   // blue
                }
                // remplacement de l'image originale.
                ctx.putImageData(imageData, 0, 0);
            };
            //imgIcone.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            
			// TENDANCE : var tendance = data.weather[0].main; déclaré plus haut.
            window.console.log("Ville : " + data.name);
			window.console.log("Température : " + data.main.temp);
			window.console.log("Humidité : " + data.main.humidity);
			window.console.log("Tendance : " + tendance);
			window.console.log("ID : " + data.weather[0].id);
			window.console.log("Description : " + data.weather[0].description);
			window.console.log("Vitesse du vent : " + data.wind.speed);
			window.console.log("Icône : " + data.weather[0].icon);
            
            $(".ville strong").html("<h2>" + data.name + "</h2>");
            $("#temperature").html("<h1>" + data.main.temp + "ºC</h1>");
            $("#humidite").html("<h3>Humidité</h3><h2>" + data.main.humidity + "</h2>");
            $("#tendance").html(tendance);
            
            switch (tendance) {
            case "Rain":
				imgIcone.src = "images/rain.svg";
				//tendanceTexte = "Pluvieux";
                break;
			case "Clear":
				imgIcone.src = "images/sunny.svg";
				//tendanceTexte = "Ensoleillé";
                break;
			case "Clouds":
				imgIcone.src = "images/cloudy.svg";
				//tendanceTexte = "Nuageux";
                break;
            case "Snow":
				imgIcone.src = "images/snow.svg";
				//tendanceTexte = "Enneigé";
                break;
			default:
				imgIcone.src = "images/variable.svg";
				//tendanceTexte = "Variable";
			}
            
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                window.console.log('errorThrown : ' + textStatus);
            })
            .always(function (jqXHR, textStatus) {
                window.console.log('Fin de l\'exécution.');
            });
    }
        
    
    // ---------------------------------------------------------------------------------------
    function dateDuJour() {
        window.console.log('moment().format(\'LLLL\') : ' + Outils.capLettre(maintenant.format('LLLL')));
        datedujour.innerHTML = Outils.capLettre(maintenant.format('LLLL'));
    }
    
    // ---------------------------------------------------------------------------------------
    function main() {
        
        dateDuJour();
        
        // Vérifications...
        if (!Outils.isCanvas) {
            $(".msg").html('<p class="msg-canvas">Votre navigateur ne supporte pas la technologie Canvas.</p><h3>Mettez à jour votre navigateur</h3>');
            window.console.log("Canvas non OK");
        }
        
        getMeteo();   
    }
    
    /** * */
    main();
    
}());

// http://geojson.io/#map=17/46.83066/-71.22762