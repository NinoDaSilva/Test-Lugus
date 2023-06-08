const url = "https://my-json-server.typicode.com/Lugus-Shopify/hiring/product";

async function getData() {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () => {
      if (request.status === 200) {
        const Data = JSON.parse(request.responseText);
        const titles = Data.title;
        const price = Data.price;
        const description = Data.description;

        resolve(Data, titles, price, description);
      } else {
        reject("Erreur lors de la récupération des données du produit");
      }
    };
    request.onerror = () => {
      reject("Erreur");
    };
    request.send();
  });
}

// Test //
// getData()
//   .then((Data) => {
//     console.log(Data);
    
//   })
//   .catch((error) => {
//     console.error(error);
//   });

async function getProductId() {
  return getData().then((productData) => {
    const productId = productData.id;
    return productId;
  });
}

const productId = getProductId();

// Récupération du titre du produit
  getData()
  .then((productData) => {
    const productTitle = productData.title;
    document.getElementById("productTitle").textContent = productTitle;
  })
  .catch((error) => {
    console.error(error);
  });

// Récupération du prix du produit
  getData()
  .then((productData) => {
    const productPrice = productData.price;
    document.getElementById("productPrice").textContent = productPrice;
  })
  .catch((error) => {
    console.error(error);
  });

// Récupération du prix du produit
  getData()
  .then((productData) => {
    const productDescription = productData.description;
    document.getElementById("productDescription").textContent = productDescription;
  })
  .catch((error) => {
    console.error(error);
  });