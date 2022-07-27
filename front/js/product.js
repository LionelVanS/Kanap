// AFFICHAGE DE LA FICHE PRODUIT

//Récupération des données de l'API
fetch("http://localhost:3000/api/products")
.then((res) => res.json())
.then((data) => recuperateData(data))

// Récupération des informations du produit à affiché
function recuperateData(data){
    const UrlId = new URLSearchParams(window.location.search)
    const currentId = UrlId.get("id")

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
        }
    }
}

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
    const productTitle = document.getElementById("title")
    productTitle.textContent = name
}

// Création du prix
function createPrice (price){
    const productPrice = document.getElementById("price")
    productPrice.textContent = price 
}

// Création de la description du produit
function createDescription(description){
    const productDescription = document.getElementById("description")
    productDescription.textContent = description 
};
    
// Création des options
function createOptions(colors){
    const productColors = document.getElementById("colors")
    colors.forEach(color => {
        const option = document.createElement("option")
        option.value = color
        option.textContent = color
        productColors.appendChild(option)
    })
}
