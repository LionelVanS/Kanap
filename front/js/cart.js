// Récupération du nombre d'article ajouté au panier
numberOfProduct = localStorage.length
const showProduct = []
let pDelete

// Récupération des informations des articles ajoutés au panier
for(let i=0; i < numberOfProduct ;i++){
    // Récupération des données du local storage
    productFromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)))
    const product = {
        quantity: productFromStorage.quantity,
        color: productFromStorage.color,
        id: productFromStorage.id,
        name: productFromStorage.name
    }
    
    // Récupération des données de l'API
    fetch(`http://localhost:3000/api/products/${productFromStorage.id}`)
    .then((res) => res.json())
    .then((data) => {
        
        product.image = data.imageUrl,
        product.altTxt = data.altTxt,
        product.unitPrice = data.price
        
        showProduct.push(product)
        
        showCart(product)
    })
}

function showCart(product){
    
    // Création de l'article classe cart__item
    const articleCartItem = document.createElement("article")
    articleCartItem.classList.add("cart__item")
    articleCartItem.setAttribute("data-id", product.id )
    articleCartItem.setAttribute("data-color", product.color )
    
    // Création de la div classe cart__item__img
    divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")
    
    // Création de l'image
    const image = document.createElement("img")
    image.src = product.image
    image.alt = product.altTxt
    
    // Création de la div classe cart__item__content__description
    const divDescription = document.createElement("div")
    divDescription.classList.add("cart__item__content__description")
    const h2 = document.createElement("h2")
    h2.textContent = product.name
    const pPrice = document.createElement("p")
    pPrice.textContent = product.unitPrice
    const pColor = document.createElement("p")
    pColor.textContent = product.color
    
    // Création de la div classe cart__item__content
    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")
    
    // Création de la div class cart__item__content__settings
    const divSettings = document.createElement("div")
    divSettings.classList.add("cart__item__content__settings")
    
    // Création de la div class cart__item__content__settings__quantity
    const divQuantity = document.createElement("div")
    divQuantity.classList.add("cart__item__content__settings__quantity")
    
    // Création de l'affichage du prix unitaire
    const pQuantity = document.createElement("p")
    pQuantity.textContent = "Quantité :"
    
    // Création de l'input    
    const inputQuantity = document.createElement("input")
    inputQuantity.classList.add("itemQuantity")
    inputQuantity.type = "number"
    inputQuantity.name = "itemQuantity"
    inputQuantity.min = 1
    inputQuantity.max = 100
    inputQuantity.value = product.quantity
    
    // Création de la div classe cart__item__content__settings__delete
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    
    // Création du texte de suppression du produit
    pDelete = document.createElement("p")
    pDelete.classList.add("deleteItem")
    pDelete.textContent = "Supprimer"
    
    const sectionCartItems = document.querySelector("#cart__items")
    sectionCartItems.appendChild(articleCartItem)
    articleCartItem.appendChild(divImg)
    articleCartItem.appendChild(divContent)
    divImg.appendChild(image)
    divContent.appendChild(divDescription)
    divContent.appendChild(divSettings)
    divDescription.appendChild(h2)
    divDescription.appendChild(pColor)
    divDescription.appendChild(pPrice)
    divSettings.appendChild(divQuantity)
    divQuantity.appendChild(pQuantity)
    divQuantity.appendChild(inputQuantity)
    divSettings.appendChild(divDelete)
    divDelete.appendChild(pDelete)
    
    return pDelete
}

// pDelete.addEventListener("click", deleteArticle )

// function deleteArticle(){
//     for(let i=0; i < showProduct.length; i++){
//         let deleteProduct = showProduct[i]
        
//         console.log('showProduct[i] :>> ', showProduct[i]);
//         showProduct.splice(showProduct[i].product)
//     }
// }