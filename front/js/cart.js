numberOfProduct = localStorage.length
const showProduct = []
// let pDelete

// Récupération des informations des articles ajoutés au panier
for(let i=0; i < numberOfProduct ;i++){
    // Récupération des données du local storage
    productFromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)))
    const product = {
        quantity: productFromStorage.quantity,
        color: productFromStorage.color,
        id: productFromStorage.id,
    }
    
    // Récupération des données de l'API
    fetch(`http://localhost:3000/api/products/${productFromStorage.id}`)
    .then((res) => res.json())
    .then((data) => {
        
        product.image = data.imageUrl,
        product.altTxt = data.altTxt,
        product.unitPrice = data.price
        product.name = data.name
        
        showProduct.push(product)
        
        showCart(product)
        totalQuantityCart(showProduct)
        totalPriceCart(showProduct)
    })
}

// Création de l'affichage de l'article ajouté
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
    inputQuantity.setAttribute("type", "number") 
    inputQuantity.setAttribute("name", "itemQuantity")
    inputQuantity.setAttribute("min", 1)
    inputQuantity.setAttribute("max", 100)
    inputQuantity.setAttribute("value", product.quantity)
    
    // Ecoute des modifications sur la quantité d'un article
    inputQuantity.addEventListener("input",() => changeTotalPriceQuantity(product.id, inputQuantity.value, product.color))
    
    // Création de la div classe cart__item__content__settings__delete
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    
    // Création du texte de suppression du produit
    pDelete = document.createElement("p")
    pDelete.classList.add("deleteItem")
    pDelete.textContent = "Supprimer"
    
    // Ecoute du bouton "SUPPRIMER"
    // pDelete.addEventListener("click", deleteArticle )
    
    // Assemblage de la structure HTML
    const sectionCartItems = document.querySelector("#cart__items")
    sectionCartItems.appendChild(articleCartItem)
    
    articleCartItem.appendChild(divImg)
    divImg.appendChild(image)
    
    articleCartItem.appendChild(divContent)
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
}


// CALCUL DU TOTAL D'ARTICLE
function totalQuantityCart(){
    let total = 0;
    
    showProduct.forEach(product => {
        const totalUnitQuantity = parseFloat(product.quantity)
        total += totalUnitQuantity 
    })
    document.querySelector("#totalQuantity").textContent = total
}

// CALCUL DU PRIX TOTAL

function totalPriceCart(){
    let totalPrice = 0;
    
    showProduct.forEach(product => {
        const totalUnitPrice = product.unitPrice * product.quantity    
        totalPrice += totalUnitPrice
    })
    document.querySelector("#totalPrice").textContent = totalPrice
}

// Modification des totaux d'articles et du prix
function changeTotalPriceQuantity(id, newValue, color){
    const productToChange = showProduct.find((product) => product.id === id && product.color === color)
    productToChange.quantity = Number(newValue)
    totalQuantityCart()
    totalPriceCart()
    newData(productToChange)
}

// Modification du localStorage avec les nouvelles quantités
function newData(productToChange){
    const keys = `${productToChange.id}:${productToChange.color}`
    const newDataToSave = JSON.stringify(productToChange)
    localStorage.setItem(keys, newDataToSave)    
}

// function deleteArticle(){
//     for(let i=0; i < showProduct.length; i++){
//         let deleteProduct = showProduct[i]
        
//         console.log('showProduct[i] :>> ', showProduct[i]);
//         showProduct.splice(showProduct[i].product)
//     }
// }


// FORMULAIRE //

// const firstName = document.querySelector("#firstName")
// const error = document.querySelector("#firstNameErrorMsg")

// firstName.addEventListener("submit", (e) => {
    //     if(! ){
        //         error.textContent = "Veuillez saisir un prénom correct"
        //         e.preventDefault
        //     }
        // })
        
        
        
// form.addEventListener("submit", function (event) {
//     // Chaque fois que l'utilisateur tente d'envoyer les données
//     // on vérifie que le champ email est valide.
//     if (!email.validity.valid) {
  
//       // S'il est invalide, on affiche un message d'erreur personnalisé
//       error.innerHTML = "J'attends une adresse e-mail correcte, mon cher&nbsp;!";
//       error.className = "error active";
//       // Et on empêche l'envoi des données du formulaire
//       event.preventDefault();
//     }
//   }, false);