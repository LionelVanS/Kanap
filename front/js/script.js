//Récupération des données de l'API
fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .then((data) => createProductsCard(data))

// Création des cartes produits
function createProductsCard(data){
    for (let i=0; i< data.length;i++){   

    // Récupère les éléments de la carte pour chaque objet trouvé dans le tableau 
    const id = data[i]._id
    const imageUrl = data[i].imageUrl
    const altTxt = data[i].altTxt
    const name = data[i].name
    const description = data[i].description
    
    // Fabrique le squelette HTML des cartes
    const anchor = createAnchor(id)
    const article = createArticle(imageUrl, altTxt, name, description)
    createStructureHtml(anchor, article)
    }
}

// Création du lien de la carte avec le href
function createAnchor(id) {
    const anchor = document.createElement("a")
    anchor.href = "./product.html?id=" + id
    return anchor
}

// Création de l'article complet avec l'image, le nom du produit et la description
function createArticle(imageUrl, altTxt, name, description){
    const article = document.createElement("article")

    // Création de l'image
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt

    // Création du nom du produit
    const h3 = document.createElement("h3")
    h3.textContent = name
    h3.classList.add("productName")

    // Création de la description
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    
    // Ajout de l'image, du nom du produit et de la descritpion à l'article
    article.appendChild(image)
    article.appendChild(h3)
    article.appendChild(p)
    return article
}

// Création du squelette HTML
function createStructureHtml(anchor, article){ 
    const items = document.getElementById("items")
    items
        .appendChild(anchor)
        .appendChild(article)
}