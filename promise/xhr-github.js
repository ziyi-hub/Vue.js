
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
 * Affichez les données météo d'un ville
 * @param {json} data : contient la réponse de l'API au format json
 *  * @param {json} rang : contient la réponse de l'API au format json
 * @return void
 */

function showUser(data, rang){
    //console.log(data)
    let user = data[rang];
    //console.log(user.repos_url)
    sendXhr(user.repos_url, displayUserRespo)
}


function displayUserRespo(respoliste){
    respoliste.forEach(function (element){
        console.log(element)
    })
}


function getUser(userRang){
    let url = "https://api.github.com/users";
    sendXhr(url, function (data){
        showUser(data, userRang)
    });
}


document.addEventListener("DOMContentLoaded", function (){
    getUser(4)
})