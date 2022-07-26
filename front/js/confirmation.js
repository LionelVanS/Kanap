// Suppression du localStorage
window.localStorage.clear()

// Récupération de l'orderId via les parametres d'url
function getOrderId(){
    const currentUrl = window.location.search
    const orderIdFromUrl = new URLSearchParams(currentUrl)
    
    for(let params of orderIdFromUrl){
        id = params[1]
    }
    
    showOrderId(id)
}

function showOrderId(id){
    const orderId = document.querySelector("#orderId")
    orderId.textContent = id
}

getOrderId()