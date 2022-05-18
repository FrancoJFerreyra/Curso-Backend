const socket = io();

const productForm = document.querySelector("#productsForm");
const productName = document.querySelector("#productName");
const productDescription = document.querySelector("#description");
const productPrice = document.querySelector("#productPrice");
const productImg = document.querySelector("#productImg");
const productStock = document.querySelector("#stock");
const tbody = document.querySelector("#tbody");

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("envio data el client");
  socket.emit("client:newProduct", {
    title: productName.value,
    description: productDescription.value,
    price: productPrice.value, 
    img: productImg.value,
    stock: productStock.value,
  });
  productName.value = "";
  productDescription.value = "";
  productPrice.value = "";
  productImg.value = "";
  productStock.value = "";
});
socket.on("server:newProduct", (data) => {
  console.log("llego data al client");
  tbody.innerHTML += `   
  <tr>
      <td>${data.title}</td>
      <td>${data.description}</td>
      <td>${data.price}</td>
      <td><img src='${data.img}'></td>
      <td>${data.stock}</td>
  </tr>`;
});
