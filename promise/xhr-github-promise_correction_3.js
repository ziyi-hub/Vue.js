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
 * envoie la requete pour recuperer la liste de user
 * @param {int} uid = id du user dont on veut  recuperer les repos
 * @return : infos d'un user dans le then de la promise
 */
let getListUsers = uid => {
    return new Promise(function (resolve, reject) {
        let urlSend = "https://api.github.com/users";
        sendXhrPromise(urlSend)
            .then(result => {
                let user = result.find(item => item.id = uid)
                resolve("getListUsers s'est bien passé" + user)
            })
            .catch(error => {
                reject("BUG users list" + error)
            })
    })
}


/**
 * Affichez les données des utilisateura
 * @param {json} data : contient la réponse de l'API au format json
 * @param {int} rang = rang du user
 * @return void
 */
function showUserRepos(data, rang){
    let url = data[rang].repos_url
    sendXhrPromise(url)
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
    })
}


/**
 * @param userRang
 * @param {int} userRang = rang dont on veut  recuperer les infos de users
 * @return inutilisable
 */
function showUserInfo(userRang){
    let url = "https://api.github.com/users";
    return new Promise((resolve, reject) => {
        sendXhrPromise(url)
            .then(data => {
                showUserRepos(data, userRang)
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
                    "                <td>" + data[userRang]['id'] + "</td>" +
                    "                <td>" + data[userRang]['login'] + "</td>" +
                    "            </tr>" +
                    "</tbody>" +
                    "</table>"
                resolve("Obtenir avec succès les informations de l'utilisateur")
            })
            .catch(error => {
                reject(error)
                console.log("Erreur! pas d'accès aux services")
            })
    })
}


/**
 * gere les taches à effectuer pour affichier les repos d'un user
 * @param {int} user_id = id du user
 * @return : vide
 */
function displayUserRespos(user_id){
    getListUsers(user_id)
        .then(user_info => {
            showUserInfo(user_id)
        })
        .then(userRepos => {
            showUserRepos(userRepos, user_id)
        })
        .catch(erreur => console.log("Erreur de transfert" + erreur))
}


// -----------------------MAIN-----------------------
document.addEventListener("DOMContentLoaded", function (){
    document.querySelector(".button").addEventListener("click", ()=>{
        let val = document.querySelector("#userRang").value
        displayUserRespos(val)
        console.log("github Xhr promise sent")
    })
})

