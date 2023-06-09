const url = "https://my-json-server.typicode.com/Lugus-Shopify/hiring/product";

async function getData() {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () => {
      if (request.status === 200) {
        const Data = JSON.parse(request.responseText);
        // const titles = Data.title;
        // const price = Data.price;
        // const description = Data.description;
        // const variants = Data.variants;
        // const images = Data.variants.map((variant) => variant.image);

        resolve(Data);
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
    document.getElementById("productPrice").textContent = productPrice + " €";
  })
  .catch((error) => {
    console.error(error);
  });

// Récupération de la description du produit
  getData()
  .then((productData) => {
    const productDescription = productData.description;
    document.getElementById("productDescription").textContent = productDescription;
  })
  .catch((error) => {
    console.error(error);
  });

// Récupération de l'img du produit
  getData()
  .then((productData) => {
    const productColor = productData.variants.map((variant) => variant.color);
    const productSize = productData.variants.map((variant) => variant.size);

    const selectedColor = productColor[0]; 
    const selectedSize = productSize[0]; 

    const matchingVariants = productData.variants.filter(
      (variant) => variant.color === selectedColor && variant.size === selectedSize
    );

    if (matchingVariants.length > 0) {
      const selectedVariant = matchingVariants[0];
      // console.log(matchingVariants);
      
      document.getElementById("productImg").src = selectedVariant.image;
    }
  })
  .catch((error) => {
    console.error(error);
  });

// Récupération des images du produit selon la taille et la couleur
 getData()
 .then((productData) => {
   const colorButtons = document.querySelectorAll(".btn");
   const sizeButtons = document.querySelectorAll(".btn-size");

   colorButtons.forEach((button) => {
     button.addEventListener("click", () => {
      colorButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");

       const selectedColor = button.dataset.color;
      
       const matchingVariants = productData.variants.filter(
         (variant) => variant.color === selectedColor && variant.size === getSelectedSize()
       );

       if (matchingVariants.length > 0) {
         const selectedVariant = matchingVariants[0]; 

         document.getElementById("productImg").src = selectedVariant.image;
        //  console.log(selectedVariant);
       }
     });
   });

   sizeButtons.forEach((button) => {
     button.addEventListener("click", () => {
      sizeButtons.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");

       const selectedSize = button.dataset.size;

       const matchingVariants = productData.variants.filter(
         (variant) => variant.size === selectedSize && variant.color === getSelectedColor()
       );
        
       if (matchingVariants.length > 0) {
         const selectedVariant = matchingVariants[0]; 
         
         document.getElementById("productImg").src = selectedVariant.image;
        //  console.log(selectedVariant);
       }
     });
   });

// Fonction pour obtenir la couleur actuellement sélectionnée
   function getSelectedColor() {
     const selectedColorButton = document.querySelector(".btn.selected");
     return selectedColorButton ? selectedColorButton.dataset.color : null;
   }
// Fonction pour obtenir la taille actuellement sélectionnée
   function getSelectedSize() {
     const selectedSizeButton = document.querySelector(".btn-size.selected");
     return selectedSizeButton ? selectedSizeButton.dataset.size : null;
    }
 })
 .catch((error) => {
   console.error(error);
 });

// Fonction pour la quantité du produit a acheter
async function getQuantity() {
  const decreaseBtn = document.getElementById("decreaseBtn");
  const increaseBtn = document.getElementById("increaseBtn");
  const numberField = document.getElementById("numberField");

  decreaseBtn.addEventListener("click", () => {
    let currentValue = parseInt(numberField.value);
    if (currentValue > 0) {
      numberField.value = --currentValue;
    }
  });

  increaseBtn.addEventListener("click", () => {
    let currentValue = parseInt(numberField.value);
    numberField.value = ++currentValue;
  });
};

// Récupération et affichage des commentaires du produit
getData()
 .then((productData) => {
    const ProductComment = productData.reviews.map((review) => review.comment);
    const CommentRate = productData.reviews.map((review) => review.rate);
    const CommentName = "John Doe";

    const CommentContainer = document.getElementById("CommentContainer");

    ProductComment.forEach((comment, index) => {
      const oneCommentContainer = document.createElement("div");
      oneCommentContainer.classList.add("one-comment");

      const commentElement = document.createElement("p");
      commentElement.id = "comment";
      commentElement.textContent = comment;
      oneCommentContainer.appendChild(commentElement);

      const rateElement = document.createElement("span");
      rateElement.id = "CommentRate";
      rateElement.textContent = CommentRate[index] + "/5";
      oneCommentContainer.appendChild(rateElement);

      const nameElement = document.createElement("span");
      nameElement.id = "CommentName";
      nameElement.textContent = CommentName;
      oneCommentContainer.appendChild(nameElement);

      CommentContainer.appendChild(oneCommentContainer);
    });
      const nbrEval = ProductComment.length; 
      document.getElementById("nbreval").textContent = "(" + nbrEval + " avis)";
      
  });

// Calcul de la moyenne des évaluations du produit
getData()
 .then((productData) => {
    const CommentRate = productData.reviews.map((review) => review.rate);

    const CommentContainer = document.getElementById("meval");

    ProductComment.forEach((comment, index) => {
    
    });
  });