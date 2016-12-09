function getDonnees()
{
    // Nouvelle méthode.
    $.ajax( "data-meteo.php", {
        "type": "GET",
        "dataType": "json"
    })
    .done( function( data, textStatus, jqXHR ) {
        console.log("Température : " + data.temp);

        //$("#temperature").html(data.temp+"°C");
        //$("#humidite").html(data.hum+"%");
        //$("#tendance").html(data.baro);

    })
    .fail( function( jqXHR, textStatus, errorThrown ) {
        console.log("errorThrown : " + textStatus);
    })
    .always( function( jqXHR, textStatus ) {
        console.log("Fin de l'exécution.");
    });

}