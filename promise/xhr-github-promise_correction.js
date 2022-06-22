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
 * @param {int} uid = id du user dnt on veut  recuperer les repos
 * @return : infos d'un user dans le then de la promise
 */
let getListUsers = uid => {
    return new Promise(function (resolve, reject) {
        let urlSend = "https://api.github.com/users";
        sendXhrPromise(urlSend)
            .then(result => {
                let user = result.find(item => item.id = uid)
                resolve("" + user)
            })
            .catch(error => {
                reject("BUG users list" + error)
            })
    })
}



/**
 * gere les taches à effectuer pour affichier les repos d'un user
 * @param {int} user_id = id du user
 * @return : vide
 */
//let displayUserRespos = user_id => {}

function displayUserRespos(user_id){
    getListUsers(user_id)
        .then( user_info => {
            showUserInfo(user_info)
            return getUserRepos(user_info)
        })
        .then(userRepos => {
            showUserRepos(userRepos)
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

