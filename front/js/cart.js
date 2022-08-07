const showProduct = []

// Récupération des données du local storage
function getDataFromStorage(){
    const numberOfProduct = localStorage.length
    for(let i=0; i < numberOfProduct ;i++){
        const productFromStorage = JSON.parse(localStorage.getItem(localStorage.key(i)))
        const product = {
            quantity: productFromStorage.quantity,
            color: productFromStorage.color,
            id: productFromStorage.id,
        }
        getDataFromAPI(product, productFromStorage)
    }
}

// Récupération des données de l'API
function getDataFromAPI(product, productFromStorage){
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
    .catch(() => {
        alert("Il semblerait qu'il y ait un problème")
    })
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
    
    pDelete.addEventListener("click",() => deleteArticle(product))
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
function changeTotalPriceQuantity(id, newInputQuantityValue, color, unitPrice){
    const productToChange = showProduct.find((product) => product.id === id && product.color === color)
    productToChange.quantity = Number(newInputQuantityValue)
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
    // Suppression de l'article dans le tableau showProduct
    const id = product.id
    const color = product.color
    const productToDelete = showProduct.findIndex((productToDelete) => productToDelete.id === id && productToDelete.color === color)
    
    showProduct.splice(productToDelete, 1)
    
    // Suppression du produit dans le localStorage
    const key = `${id}:${color}`
    localStorage.removeItem(key)
    
    deleteArticleFromDocument(id, color)
}

// Suppression du produit sur la page
function deleteArticleFromDocument(id, color){
    const articleToDelete = document.querySelector(`article[data-id="${id}"][data-color="${color}"]`)
    articleToDelete.remove()
    
    totalQuantityCart()
    totalPriceCart(showProduct)
}

// FORMULAIRE //

// Vérification de l'input du prénom
function isFirstNameIsValid(){
    const firstName = document.querySelector("#firstName")
    const error = document.querySelector("#firstNameErrorMsg")
    const regex = /^[a-zA-Z ]+$/

        if (firstName.value.length < 3){
            error.textContent = "Veuillez saisir un prénom de plus de 3 lettres"
            return false
        } else if(firstName.value.length === 0){
            error.textContent = "Veuillez saisir un prénom"
            return false
        } else if(firstName.value.match(regex)){
            error.textContent = " "
            return true
        } else {
            error.textContent = "Le champ ne peut contenir que des lettres et des espaces"
            return false
        }
    }

// Vérification de l'input du nom
function isLastNameIsValid(){
    const lastName = document.querySelector("#lastName")
    const error = document.querySelector("#lastNameErrorMsg")
    const regex = /^[a-zA-Z ]+$/

        if(lastName.value.length == 0){
            error.textContent = "Veuillez saisir un nom"
            return false
        } else if(lastName.value.match(regex)){
            error.textContent = " "
            return true
        } else {
            error.textContent = "Le champ ne peut contenir que des lettres et des espaces"
            return false
    }
    }

// Vérification de l'input de l'adresse
function isAddressIsValid(){
    const address = document.querySelector("#address")
    const error = document.querySelector("#addressErrorMsg")
    const regex = /^[0-9]+ ([a-zA-Z, ]+)/

        if(address.value.length < 10){
            error.textContent = "Veuillez saisir une adresse correcte"
            return false
        } else if(address.value.match(regex)) {
            error.textContent = " "
            return true
        } else {
            error.textContent = "Le champ ne peut contenir que des lettres, des chiffres et des espaces"
            return false
        }
    }

// Vérification de l'input de la ville
function isCityIsValid(){
    const city = document.querySelector("#city")
    const error = document.querySelector("#cityErrorMsg")
    const regex = /^[a-zA-Z ]+$/

        if(city.value.length == 0){
            error.textContent = "Veuillez saisir une ville"
            return false
        } else if(city.value.match(regex)){
            error.textContent = " "
            return true
        } else {
            error.textContent = "Le champ ne peut contenir que des lettres et des espaces"
            return false
        }
    }

// Vérification de l'input de l'email
function isEmailIsValid(){
    const email = document.querySelector("#email")
    const error = document.querySelector("#emailErrorMsg")
    const regex = /^[0-9a-zA-Z._-]+@{1}[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,5}$/

        if(email.value.length === 0){
            error.textContent = "Veuillez saisir une adresse mail"
            return false
        } else if(email.value.match(regex)){
            error.textContent = " "
            return true
        } else {
        error.textContent = "Ceci n'est pas une adresse mail valide"
        return false
        }
    }

// BOUTON COMMANDER !

// Récupération et écoute du bouton
function getCommandButton(){
    const orderButton = document.querySelector("#order")
    orderButton.addEventListener("click",() => getFormData())
}

// Création de l'objet à envoyer a l'API
// En vérifiant les inputs et le panier
function getFormData(){
    if(showProduct.length !== 0){
            if(isFirstNameIsValid() && isLastNameIsValid() && isAddressIsValid() && isCityIsValid() && isEmailIsValid()){ 
                const orderForm = document.querySelector(".cart__order__form")
                const formElements = orderForm.elements
                const body = {
                    contact : {
                        firstName : formElements.firstName.value,
                        lastName : formElements.lastName.value,
                        address : formElements.address.value,
                        city :formElements.city.value,
                        email : formElements.email.value
                    },
                        products: getIdFromStorage()
                }
                postRequestToAPI(body)
            } else {
                alert("Il y a un problème au niveau du formulaire")
            }
    } else {
        alert("Votre panier est vide.")
    }
}

// Récupération de l'id des articles commandés
function getIdFromStorage(){
    const arrayFromId = []
    
    showProduct.forEach(product => {
        const id = product.id
        arrayFromId.push(id)
    })
    return arrayFromId
}   

function postRequestToAPI(body) {
        fetch("http://localhost:3000/api/products/order", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(body)
        })
        .then((res) => res.json())
        .then((data) => {
            window.location.href = "./confirmation.html" + "?id=" + data.orderId
        })
        .catch(() => alert("Il y a un soucis avec la base de donnée"))
}

getCommandButton()
getDataFromStorage()