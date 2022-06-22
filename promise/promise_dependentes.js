/**
 * @author Ziyi WANG
 * Exemple de chainage de promises
 */

/**
 * Collecter suffisament d'argent
 * @param : vide
 * @return : vide
 */

let promiseToCollectFund = new Promise((resolve, reject) => {
    let isEnough = true
    if (isEnough){
        resolve("amount reached ==> ")
    }else{
        reject("not enough ==> ")
    }
})


/**
 * Affichage une console
 * @param : data {string} > données renvoyées par la promise précédente
 * @return : vide
 */

let buyConsole = function (data) {
    return new Promise((resolve, reject) => {
        //événement ...
        let consoleBought = true
        if (consoleBought){
            resolve(data + "Yes, ")
        }else{
            reject("No, i can't")
        }
    })
}


/**
 * Jouer à Call oof Duty
 * @param : data {string} > données renvoyées par la promise précédente
 * @return : vide
 */

let playCall = (data) => {
    return new Promise((resolve, reject) => {
        //événement ...
        let didIPlay = true
        if (didIPlay){
            resolve(data + "==> Yes i played")
        }else{
            reject("==> No, i  don't played")
        }
    })
}


// -----------------------MAIN-----------------------
document.addEventListener("DOMContentLoaded", function (){
    promiseToCollectFund
        //.then(function (dataFromResolve) { showWeatherData(dataFromResolve) })
        //.catch(function (dataFromReject){ console.log(dataFromReject) })

        .then((message) => { return buyConsole(message) })
        .then((message) => { return playCall(message) })
        .then(message => console.log(message))
        .catch((error) => { console.log(error) })
})

// On veut executer toutes les promises en parallele et celles doivent
// toutes entre satisfaites (elles ne sont pas dépendantes)
Promise.all([promiseToCollectFund, buyConsole(), playCall()])
    .then(() => {console.log("Toutes les promises sont terminées et ok")})
    .catch(() => {console.log("Au minimum une des promises n'a pas abouti")})


Promise.race([promiseToCollectFund, buyConsole(), playCall()])
    .then(() => {console.log("Au moins une des promises est terminée et ok")})
    .catch(() => {console.log("Toutes les promises ont échoués")})
