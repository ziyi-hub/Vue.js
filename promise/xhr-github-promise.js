/**
 * envoie une requête XHR
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
 * Affichez les données des utilisateura
 * @param {json} data : contient la réponse de l'API au format json
 *  * @param {json} rang : contient la réponse de l'API au format json
 * @return void
 */
function showUserRespo(data, rang){
    return new Promise((resolve, reject) => {
        let isShow = true
        if (isShow){
            let user = data[rang];
            sendXhrPromise(user.repos_url)
                .then(data => {
                    let html =
                        "<table class='table'>" +
                        "<thead class='thead-dark'>" +
                        "    <tr>" +
                        "        <th>nom du repo</th>" +
                        "        <th>description</th>" +
                        "        <th>homepage</th>" +
                        "        <th>updated_at</th>" +
                        "    </tr> " +
                        "</thead><tbody>"
                    data.forEach(function (element) {
                        //console.log(element)
                        html +=
                            "<tr>"+
                                "<td>"+ element["name"] +"</td>"+
                                "<td>"+ element["description"] +"</td>"+
                                "<td>"+ element["homepage"] +"</td>"+
                                "<td>"+ element["updated_at"] +"</td>"+
                            "</tr>"
                    })
                    html += "</tbody></table>"
                    document.querySelector("#repos").innerHTML = html
                    return data
                })
            resolve("Liste de repos est réussi")
        }else{
            reject("Liste de repos est échoué")
        }
    })
}


/**
 * Affichez les données des repos
 * @param {json} respoliste : contient la réponse de l'API au format json
 * @return void
 */
function displayUserRespo(respoliste){
    return new Promise((resolve, reject) => {
        let isDisplay = true
        if (isDisplay){
            getUserPromise(respoliste)
                .then((user) => {
                    return showUserRespo(user)
                })
            resolve("display de repos est réussi")
        }else{
            reject("Impossible de display les informations de repos")
        }
    })

}


/**
 * Gettez liste de l'utilisateur
 * @param {string} userRang : le rang d'utilisateur
 * @return : vide
 */
function getUserPromise(userRang){
    let url = "https://api.github.com/users";
    return new Promise((resolve, reject) => {
        sendXhrPromise(url)
            .then(data => {
                showUserRespo(data, userRang)
                document.querySelector("#users").innerHTML = "<table class='table'>" +
                    "<thead class='thead-dark'>" +
                    "            <tr>" +
                    "                <th scope=\"col\">avatar</th>" +
                    "                <th>id</th>" +
                    "                <th>login</th>" +
                    "            </tr>" +
                    "</thead>" +
                    "<tbody>" +
                    "            <tr>" +
                    "                <td><img src=" + data[userRang]['avatar_url'] + "></td>" +
                    "                <td>" + data[userRang]["id"] + "</td>" +
                    "                <td>" + data[userRang]["login"] + "</td>" +
                    "            </tr>" +
                    "</tbody>" +
                    "</table>"
                //resolve(data)
                resolve("Obtenir avec succès les informations de l'utilisateur")
            })
            .catch(error => {
                reject(error)
                console.log("Erreur! pas d'accès aux services")
            })
    })
}


// -----------------------MAIN-----------------------
document.addEventListener("DOMContentLoaded", function (){
    document.querySelector(".button").addEventListener("click", ()=>{
        let val = document.querySelector("#userRang").value
        getUserPromise(val)
            .then(function (dataFromResolve) {
                console.log(dataFromResolve)
            })
            .catch(error => { console.log(error) })
    })
})

