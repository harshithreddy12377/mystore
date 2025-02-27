
let products = [];
let cart = {};
let users = [];
let user={};
let orders=[];
let total;
let obj={};
const addToCart = (id) => {
  if(cart[id]>=1)cart[id] = cart[id];
  else cart[id]=1;
  console.log(cart);
  showCart();
  display();
};
let count=0;
function showForm() {
  let str = `
  <h2>Registration Form</h2>
  <p><input type="text" id="name" placeholder="Name"></p>
  <p><input type="text" id="email" placeholder="Email"></p>
  <p><input type="password" id="password" placeholder="Password"></p>
  <p><input type="date" id="dob"></p>
  <p><button onclick='addUser()'>Submit</button></p>
   
  <p>Already a member?<button onclick='showLogin()'>Login Here</button></p>
  
  `;
  root.innerHTML = str;
}
function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    balance: 0,
  };
  users.push(user);
  showUser1();
  
}
function showLogin() {
  let str = `
 
  <div class="login">
      <h2>Login Form</h2>
      <div id='msg'></div>
      <p><input id="email" type="text"></p>
      <p><input id="password" type="password"></p>
      <button onclick='chkUser()'>Log In</button>

      <p><button onclick='showForm()'>Create Account</button></p>
      <p><button onclick='showUser1()'>Show Users</button></p>
       <div id="show"></div>
  </div>

  `;
  root.innerHTML = str;
}
function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      // useremail = email;
      // username = users[i].name;
      // currBalance = users[i].balance;
      user = users[i];

      showProducts();
      break;
    } else {
      msg.innerHTML = "Access Denied";
    }
    
  }
}
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
  
  total = products.reduce((sum, value) => {
    if (cart[value.id]) {
      return sum + value.price * cart[value.id];
    }
    return sum;
  }, 0);
  
  console.log();
  count=Object.keys(cart).length;
  Total1.innerHTML = "Total: $" + total;
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
  nice.innerHTML = sum;
};
const placeOrder=()=>{
   obj={
    customer:user.email,
    items:cart,
    orderValue:total,
    status:"pending"
  };
  orders.push(obj);
  cart={};
  Remove();
  showOrders();
  console.log(orders);
};
const showProducts = () => {
  let str = `
  
    <div class="header">
    
    
  <h1>My Store</h1>
    <div id="navi">
    <h4 onclick="showOrders()" id="order2">Orders</h4>
    <h4 onclick="displayBlock()">Cart:<span id="nice"></span></h4>
    </div>
    
    
    </div>
    <div id="productBlock">
    <h2 style="font-family: Arial, Helvetica, sans-serif; padding-top: 40px; padding-left:30px;">Products:</h2>
    <div id="divProducts"></div>
    </div>
    <div id="show">
    <h3>My Cart</h3>
    <div id="divCart"></div>
    <div id="Total1"></div>
    <button onclick="showLogin()">Return to Login Page</button><br>
    <button onclick="placeOrder()">PlaceOrder</button>
    <button onclick="Remove()">Close</button>
       
    
  
    </div>`;
root.innerHTML=str;
showProducts1();
};
const showOrders=()=>{
let str="";
orders.map((value)=>{
  if(value.customer==user.email){
    str+=`Email:${value.customer}`;
  
    str+=` Order Value:${value.orderValue} Total Items:${count} Status:${value.status}`;
  }
  
});
productBlock.innerHTML=str;
};
const showProducts1=()=>{
  fetch("products.json").then((res)=>res.json()).then((data)=>(products=data)).then(()=>{  
    let str=`<div class="row">`
    products.map((value) => {
      str += ` <div class="card m-3" style="width: 18rem;"><img class="card-img-top" src="${value.image}" alt="Card image cap"><div class="card-body">
       <h5 class="card-title">${value.name}</h5> <p class="card-text">${value.desc}</p><h4>${value.price}</h4><button onclick=addToCart(${value.id}) class="btn btn-info">Add to Cart</button></div></div>
      `;
    });
    str+=`</div>`;
  
    divProducts.innerHTML = str;});
  }
const displayBlock=()=>{
//   show.style.display="block";
    show.style.left="85%";
};
const Remove=()=>{
  show.style.left="100%";
}
