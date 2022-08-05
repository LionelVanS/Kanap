const showProduct = []

// Récupération des informations des articles ajoutés au panier
function getData(){
    numberOfProduct = localStorage.length
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
        
        createArticle(product)
        
        totalQuantityCart(showProduct)
        totalPriceCart(showProduct)
    })
}
}

// Création de l'article classe cart__item
function createArticle(product){
    const articleCartItem = document.createElement("article")
    articleCartItem.classList.add("cart__item")
    articleCartItem.setAttribute("data-id", product.id)
    articleCartItem.setAttribute("data-color", product.color)
    
    const sectionCartItems = document.querySelector("#cart__items")
    
    createDivImg(product, articleCartItem)
    createDivContent(product, articleCartItem)
    
    sectionCartItems.appendChild(articleCartItem)
    
    return articleCartItem
}

// Création de la div classe cart__item__img 
// et de l'image du produit
function createDivImg(product, articleCartItem){
    const divImg = document.createElement("div")
    divImg.classList.add("cart__item__img")
    
    const image = document.createElement("img")
    image.src = product.image
    image.alt = product.altTxt
    
    articleCartItem.appendChild(divImg)
    divImg.appendChild(image)
}

// Création de la div classe cart__item__content
function createDivContent(product, articleCartItem){
    const divContent = document.createElement("div")
    divContent.classList.add("cart__item__content")
    
    createDivDescription(product, divContent)
    createDivSettings(product, divContent)
    
    articleCartItem.appendChild(divContent)
    
    return divContent
}

// Création de la div classe cart__item__content__description
// et des éléments interieur (h2 et p)
function createDivDescription(product, divContent){
    const divDescription = document.createElement("div")
    divDescription.classList.add("cart__item__content__description")
    
    const h2 = document.createElement("h2")
    h2.textContent = product.name
    
    const pPrice = document.createElement("p")
    pPrice.textContent = product.unitPrice + " €"
    
    const pColor = document.createElement("p")
    pColor.textContent = product.color
    
    divContent.appendChild(divDescription)
    
    divDescription.appendChild(h2)
    divDescription.appendChild(pColor)
    divDescription.appendChild(pPrice)
    
    return divDescription
}    

//Creation de la div classe cart__item__content__settings
function createDivSettings(product, divContent){
    const divSettings = document.createElement("div")
    divSettings.classList.add("cart__item__content__settings")
    
    createDivQuantity(product, divSettings)
    createDeleteButton(product, divSettings)
    
    divContent.appendChild(divSettings)

    return divSettings
}

// Création de la div class cart__item__content__settings__quantity
function createDivQuantity(product, divSettings){
    const divQuantity = document.createElement("div")
    divQuantity.classList.add("cart__item__content__settings__quantity")
    
    createPQuantity(divQuantity)
    createInputQuantity (product, divQuantity)
    
    divSettings.appendChild(divQuantity)
    
    return divQuantity
}

// Création du paragraphe quantité
function createPQuantity(divQuantity){
    const pQuantity = document.createElement("p")
    pQuantity.textContent = "Quantité :"
    
    divQuantity.appendChild(pQuantity)
}  

// Création de l'input    
function createInputQuantity (product, divQuantity){
    const inputQuantity = document.createElement("input")
    inputQuantity.classList.add("itemQuantity")
    inputQuantity.setAttribute("type", "number") 
    inputQuantity.setAttribute("name", "itemQuantity")
    inputQuantity.setAttribute("min", 1)
    inputQuantity.setAttribute("max", 100)
    inputQuantity.setAttribute("value", product.quantity)
    
    divQuantity.appendChild(inputQuantity)
    
    // Ecoute des modifications sur la quantité d'un article
    inputQuantity.addEventListener("input",() => changeTotalPriceQuantity(product.id, inputQuantity.value, product.color, product.unitPrice))
    
    return inputQuantity
}

// Création de la div classe cart__item__content__settings__delete
function createDeleteButton(product, divSettings){
    const divDelete = document.createElement("div")
    divDelete.classList.add("cart__item__content__settings__delete")
    
    pDelete = document.createElement("p")
    pDelete.classList.add("deleteItem")
    pDelete.textContent = "Supprimer"
    
    divSettings.appendChild(divDelete)
    divDelete.appendChild(pDelete)
    
    // keys = `${productToChange.id}:${productToChange.color}`
    pDelete.addEventListener("click",() => deleteArticle(product) )
}

// Calcul du total d'article
function totalQuantityCart(){
    let total = 0;
    
    showProduct.forEach(product => {
        const totalUnitQuantity = parseFloat(product.quantity)
        total += totalUnitQuantity 
    })
    
    document.querySelector("#totalQuantity").textContent = total
}

// Calcul du prix total
function totalPriceCart(showProduct){
    let totalPrice = 0;
    
    showProduct.forEach(product => {
        const totalUnitPrice = product.unitPrice * product.quantity
        totalPrice += totalUnitPrice
    }) 
   
    document.querySelector("#totalPrice").textContent = totalPrice

    return totalPrice
}


// Modification des totaux d'articles et du prix
function changeTotalPriceQuantity(id, newValue, color, unitPrice){
    const productToChange = showProduct.find((product) => product.id === id && product.color === color)
    productToChange.quantity = Number(newValue)
    productToChange.unitPrice = unitPrice
    
    newData(productToChange)
    totalQuantityCart()
    totalPriceCart(showProduct)
}

// Modification du localStorage avec les nouvelles quantités
function newData(productToChange){
    const keys = `${productToChange.id}:${productToChange.color}`
    const newDataToSave = JSON.stringify(productToChange)
    localStorage.setItem(keys, newDataToSave)    
}

// Suppression d'un article
function deleteArticle(product){
    const id = product.id
    const color = product.color
    const productToDelete = showProduct.findIndex((productToDelete) => productToDelete.id === id && productToDelete.color === color)

    showProduct.splice(productToDelete, 1)
    
    const key = `${id}:${color}`
    localStorage.removeItem(key)

    deleteArticleFromDocument(id, color)
}

function deleteArticleFromDocument(id, color){
    const articleToDelete = document.querySelector(`article[data-id="${id}"][data-color="${color}"]`)
    articleToDelete.remove()

    totalQuantityCart()
    totalPriceCart(showProduct)
}

// FORMULAIRE //

// Vérification de l'input du prénom
const firstName = document.querySelector("#firstName")
firstName.addEventListener("input", (e) => {
    const error = document.querySelector("#firstNameErrorMsg")
    if(firstName.value.length == 0){
        error.textContent = "Veuillez saisir un prénom"
    } else if (firstName.value.length <3){
        error.textContent = "Veuillez saisir un prénom de plus de 3 lettres"
    } else if(allLetter(firstName)){
        error.textContent = " "
    } else {
        error.textContent = "Le champ ne peut contenir que des lettres et des espaces"
    }
})

// Vérification de l'input du nom
const lastName = document.querySelector("#lastName")
lastName.addEventListener("input", (e) => {
    const error = document.querySelector("#lastNameErrorMsg")
    if(lastName.value.length == 0){
        error.textContent = "Veuillez saisir un nom"
    } else if(allLetter(lastName)){
        error.textContent = " "
    } else {
        error.textContent = "Le champ ne peut contenir que des lettres et des espaces"
    }
})

// Vérification de l'input de l'adresse
const address = document.querySelector("#address")
address.addEventListener("input", (e) => {
    const error = document.querySelector("#addressErrorMsg")
    if(address.value.length < 10){
        error.textContent = "Veuillez saisir une adresse correcte"
    } else if(lettersAndNumbers(address)) {
        error.textContent = " "
    } else {
        error.textContent = "Le champ ne peut contenir que des lettres, des chiffres et des espaces"
    }
})

// Vérification de l'input de la ville
const city = document.querySelector("#city")
city.addEventListener("input", (e) => {
    const error = document.querySelector("#cityErrorMsg")
    if(city.value.length == 0){
        error.textContent = "Veuillez saisir une ville"
    } else if(allLetter(city)){
        error.textContent = " "
    } else {
        error.textContent = "Le champ ne peut contenir que des lettres et des espaces"
    }
})

// Vérification de l'input de l'email
const email = document.querySelector("#email")
email.addEventListener("input", (e) => {
    const error = document.querySelector("#emailErrorMsg")
    if(email.value.length == 0){
        error.textContent = "Veuillez saisir une adresse mail"
    } else if(addressMail(email)){
        error.textContent = " "
    } else {
        error.textContent = "Ceci n'est pas une adresse mail valide"
    }
})

// Fonction pour vérifier si l'input ne comporte que des lettres (espaces autorisés)
function allLetter(inputtxt){ 
    const letters = /^[a-zA-Z ]+$/
    if(inputtxt.value.match(letters)){
        return true
    } else {
        return false
    }
}

// Fonction pour vérifier si l'input ne comporte que des lettres et des chiffres (espaces autorisés)
function lettersAndNumbers(inputtxt){
    const numbersAndLetters = /^[0-9]* ([a-zA-Z, ]*)/
    if(inputtxt.value.match(numbersAndLetters)){
        return true
    } else {
        return false
    }
}

function addressMail(inputTxt){
    const addressMail = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/
    if(inputTxt.value.match(addressMail)){
        return true
    } else {
        return false
    }
}

// BOUTON COMMANDER !

// Récupération et écoute du bouton
// function getButton(){
//     const orderButton = document.querySelector("#order")
//     orderButton.addEventListener("click", verificationOfCart)
// }

// function verificationOfCart(){

// }


// getButton()
getData()