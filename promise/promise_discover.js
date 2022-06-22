//Présentations des promises

let promiseToCleanKitchen = new Promise(function (resolve, reject) {
    //Créer un événement dont la réponse arrive à un moment inconnu
    //...


    let isDone = true;

    if (isDone){
        //l'événement s'est bien passé
        resolve("Oui c'est fait")
    }else{
        //l'événement n'est pas abouti
        reject("Non, je procrastine")
    }
})


// -----------------------MAIN-----------------------
document.addEventListener("DOMContentLoaded", function (){
    promiseToCleanKitchen
        .then(function (dataFromResolve) {
            //effectuer le traitement de l'événement qui est réussi
            console.log(dataFromResolve)
        })
        .catch(function (dataFromReject){
            //effectuer le traitement de l'événement qui n'a pas abouti
            console.log(dataFromReject)
        })
})