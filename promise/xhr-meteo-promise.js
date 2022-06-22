// Affichage  de la météo avec OpenWeatherMap
//https://loading.io/css/

/**
 * envoie une requête XHR
 * @param {String} urlSend = URL ou route de l'API
 * @param {function} success = function à appeler en cas succès
 * @return : inutilisable
 */

function sendXhr(urlSend, success){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', urlSend);
    xhr.responseType = 'json';
    xhr.send();

    //Les données arrivent correctement
    xhr.addEventListener("load", function (response){
        success(response.target.response)
    })

    //On a un code d'erreur du serveur
    xhr.addEventListener("error", function (response){
        console.log("data transfert error : " + response)
    })
}


/**
 * envoie une requête XHR à l'aide une Promise
 * @param {String} urlSend = URL ou route de l'API
 * @return : inutilisable
 */
function sendXhrPromise(urlSend){
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', urlSend);
        xhr.responseType = 'json';
        xhr.send();

        //Les données arrivent correctement
        xhr.addEventListener("load", function (response){
            resolve(response.target.response)
        })

        //On a un code d'erreur du serveur
        xhr.addEventListener("error", function (response){
            reject("data transfert error : " + response)
        })
    })
}


/**
 * Affichez les données météo d'un ville
 * @param {json} data : contient la réponse de l'API au format json
 * @return void
 */

function showWeatherData(data){
    //console.log(data)
    document.querySelector("#info").innerHTML = "<p>Tempeérature : " + data.main.temp + "</p>"
        + "<p>Humidité : " + data.main.humidity + "</p>"
        + "<p>Tendance : " + data.weather[0].description + "</p>"
        + "<p>Pression : " + data.main.pressure + "</p>";
}

// -----------------------MAIN-----------------------
document.addEventListener("DOMContentLoaded", function (){

    //Processus général
    let apiKey = "a750ec831916f9ca9829d3b04bc3aad9";
    let city = "Paris";
    let option = "&units=metric" + "&lang=fr";
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey + option;
    console.log("API URL : " + url)


    sendXhrPromise(url)
        .then(function (dataFromResolve) {
            //effectuer le traitement de l'événement qui est réussi
            showWeatherData(dataFromResolve)
        })

        .catch(function (dataFromReject){
            //effectuer le traitement de l'événement qui n'a pas abouti
            console.log(dataFromReject)
        })
})


