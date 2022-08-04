// RECUPERATION DES DONNEES DE LA PAGE D'ACCUEIL

//Récupération des données de l'API
fetch("http://localhost:3000/api/products/")
.then((res) => res.json())
.then((data) => getData(data))
.catch((e) => {
    window.alert("Il semblerait qu'il y ait un probleme")
})

// Message d'erreur
function errorMessage(e){

}
// Récupération de l'id du produit sélectionné
const url = new URLSearchParams(window.location.search)
const currentId = url.get("id")

// Récupération des informations du produit sélectionné
function getData(data){

    for(let i = 0; i < data.length; i++){
        let id = data[i]._id
        if(currentId === id){
            
            const imageUrl = data[i].imageUrl
            const altTxt = data[i].altTxt
            const name = data[i].name
            const price = data[i].price
            const description = data[i].description
            const colors = data[i].colors
            
            createImage(imageUrl, altTxt)
            createTitle(name)
            createPrice(price)
            createDescription(description) 
            createOptions(colors)
            
            addToCart()
        } 
    }
}

// AFFICHAGE DE LA FICHE PRODUIT

// Création de l'image
function createImage (imageUrl, altTxt){
    const productImage = document.createElement("img")
    productImage.src = imageUrl
    productImage.alt = altTxt

    const classItemImage = document.querySelector(".item__img")
    classItemImage.appendChild(productImage)
}
    
// Création du nom du produit
function createTitle(name){
    const productTitle = document.querySelector("#title")
    productTitle.textContent = name
}

// Création du prix
function createPrice (price){
    const productPrice = document.querySelector("#price")
    productPrice.textContent = price 
}

// Création de la description du produit
function createDescription(description){
    const productDescription = document.querySelector("#description")
    productDescription.textContent = description 
}
    
// Création des options
function createOptions(colors){
    const productColors = document.querySelector("#colors")
    colors.forEach(color => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        productColors.appendChild(option)
    })
}

// AJOUT AU PANIER

// Ecoute du clic sur le bouton Ajouter au panier
function addToCart(){
    const button = document.querySelector("#addToCart")
    button.addEventListener("click", addParams) 
}

// Création d'un objet avec les parametres à sauvegarder
function addParams(){
    const params = {
        id : currentId,
        color : document.querySelector("#colors").value,
        quantity : document.querySelector("#quantity").value,
    }
    const keys = `${params.id}:${params.color}`
    saveParams(params, keys)
}

// Vérification de l'existence de l'article au panier
// Sauvegarde dans le localStorage
function saveParams(params, keys){    
    let dataFromStorage = JSON.parse(localStorage.getItem(keys))
    if(params.color != "" && params.quantity > 0){
        window.location.href = "./cart.html"
        if(dataFromStorage != null && keys === `${dataFromStorage.id}:${dataFromStorage.color}`){
            let dataFromStorageNumber = parseInt(dataFromStorage.quantity, 10)
            let paramsQuantity = parseInt(params.quantity, 10)
            dataFromStorageNumber += paramsQuantity
            dataFromStorage.quantity = dataFromStorageNumber
            localStorage.setItem(keys, JSON.stringify(dataFromStorage))
        } else {
            localStorage.setItem(keys, JSON.stringify(params))
        }
    } else {
        window.alert("Veuillez renseigner une couleur et une quantité.")
    }
}

