
const products = [
  { id: 1, name: "P1", desc:"This is description of product 1",price: 25 },
  { id: 2, name: "P2", desc:"This is description of product 2",price: 45 },
  { id: 3, name: "P3", desc:"This is description of product 3",price: 30 },
];
const cart = {};
const addToCart = (id) => {
  if(cart[id]>=1)cart[id] = cart[id];
  else cart[id]=1;
  console.log(cart);
  showCart();
  display();
};

const showCart = () => {
  let str = "";
  products.map((value) => {
    if (cart[value.id] >= 1) {
      str += `
      <li>${value.name}-$${value.price}-<button onclick="removeItem(${
        value.id
      })">-</button>${cart[value.id]}<button onclick="addItem(${
        value.id
      })">+</button>${value.price * cart[value.id]}</li>
      `;
    }
  });
  sum = 0;
  // products.map((value)=>{
  //     if(cart[value.id]){
  //         sum+=value.price*cart[value.id];
  //         console.log(value.price);

  //   console.log(sum);
  //     }});
  let total = products.reduce((sum, value) => {
    if (cart[value.id]) {
      return sum + value.price * cart[value.id];
    }
    return sum;
  }, 0);
  console.log();
  Total.innerHTML = "Total: $" + total;
  divCart.innerHTML = str;
};
const addItem = (a) => {
  cart[a] += 1;
  showCart();
  display();
};
const removeItem = (b) => {
  cart[b] -= 1;
  showCart();
  display();
};
const display = () => {
  let sum = 0;
  products.map((value) => {
    if(cart[value.id]) {
      sum += 1;
    } else {
      sum += 0;
    }
  });
  displayI.innerHTML = `<h4 style="padding-top:10px;">Cart : ${sum}</h4>`;
};

const showProducts = () => {
  let str = `<div class="row">`;
  products.map((value) => {
    str += `<div class="box">
    <h3>${value.name}</h3><p>${value.desc}</p><h4>${value.price}</h4><button onclick=addToCart(${value.id})>Add to Cart</button></li></div>
    `;
  });
  str+=`</div>`;

  divProducts.innerHTML = str;
};
const displayBlock=()=>{
//   show.style.display="block";
    show.style.left="90%";
};
const Remove=()=>{
  show.style.left="100%";
}
