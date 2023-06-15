const url = "https://my-json-server.typicode.com/Lugus-Shopify/hiring/product";

async function getData() {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = () => {
      if (request.status === 200) {
        const Data = JSON.parse(request.responseText);
        
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
};

// async function getProductId() {
//   return getData().then((productData) => {
//     const productId = productData.id;
//     return productId;
//   });
// }

// Fonction pour la quantité du produit a acheter
document.addEventListener("DOMContentLoaded", () => {
  const decreaseBtn = document.getElementById("decreaseBtn");
  const increaseBtn = document.getElementById("increaseBtn");
  const numberField = document.getElementById("numberField");
  let currentValue = parseInt(numberField.value);
  console.log(currentValue);

  decreaseBtn.addEventListener("click", () => {
    if (currentValue > 1) {
      numberField.value = --currentValue;
    }
  });

  increaseBtn.addEventListener("click", () => {
    if (currentValue < 10) {
      numberField.value = ++currentValue;
    }
  });
});

getData()
  .then(productData => {
    const productTitle = productData.title;
    const productPrice = productData.price;
    const productDescription = productData.description;
    const productVariants = productData.variants;

    document.getElementById("productTitle").textContent = productTitle;
    document.getElementById("productPrice").textContent = productPrice + " €";
    document.getElementById("productDescription").textContent = productDescription;

    const colorButtons = document.querySelectorAll(".btn");
    const sizeButtons = document.querySelectorAll(".btn-size");

    colorButtons.forEach(button => {
      button.addEventListener("click", () => {
        colorButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");

        updateProductImage();
      });
    });

    sizeButtons.forEach(button => {
      button.addEventListener("click", () => {
        sizeButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");

        updateProductImage();
      });
    });

    // Récupération de l'image du produit en fonction de la couleur et de la taille sélectionnée
    function updateProductImage() {
      const selectedColor = getSelectedColor();
      const selectedSize = getSelectedSize();

      const matchingVariant = productVariants.find(
        variant => variant.color === selectedColor && variant.size === selectedSize
      );

      if (matchingVariant) {
        document.getElementById("productImg").src = matchingVariant.image;
      }
    }

    updateProductImage();

    // Récupération de la couleur et de la taille sélectionnée
    function getSelectedColor() {
      const selectedColorButton = document.querySelector(".btn.selected");
      return selectedColorButton ? selectedColorButton.dataset.color : null;
    }

    function getSelectedSize() {
      const selectedSizeButton = document.querySelector(".btn-size.selected");
      return selectedSizeButton ? selectedSizeButton.dataset.size : null;
    }
});

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

      document.getElementById("meval").textContent = (CommentRate.reduce((a, b) => a + b, 0) / CommentRate.length).toFixed(1) + "/5";
    });
      const nbrEval = ProductComment.length; 
      document.getElementById("nbreval").textContent = "(" + nbrEval + " avis)";
});