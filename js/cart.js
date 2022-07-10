function getStore() {
  var shoppingList =
    sessionStorage.getItem("cart") !== null
      ? sessionStorage.getItem("cart")
      : false;
  return shoppingList;
}
class Cart {
  constructor(options) {
    this.elem = document.querySelector(options.selector);
    this.data = options.data;
    this.template = options.template;
  }
}

Cart.prototype.render = function () {
  this.elem.innerHTML = this.template(this.data);
};

var cartapp = new Cart({
  selector: "#cart-items",
  data: {
    heading: "My Cart",
    shoppinglist:
      JSON.parse(getStore()) !== false
        ? JSON.parse(getStore()).shoppingList
        : [],
    total: JSON.parse(getStore()).totalItem,
  },

  template: function (props) {
    return `
			<h1>${props.heading}</h1>
			<div class="Cart-Container">
				${
          props.shoppinglist.length === 0
            ? `<div id="cart-info" className="row" style="margin-top: 5%">
              <h4 id="count">You have 0 items in cart</h4>
              <h4 id="total">Total: $0.00</h4>
            </div>`
            : props.shoppinglist
                .map((shoppinglist) => {
                  return `
               
                <div class="Cart-Items">
                    <div class="image-box">
                      <img src=${shoppinglist.img} />
                    </div>
                    <div class="about">
                      <h1 class="title">${shoppinglist.name}</h1>
                    </div>
                    <div class="counter">
                      <div class="count">${shoppinglist.quantity}</div>
                    </div>
                    <div class="prices">
                      <div class="amount">$${
                        shoppinglist.price.replace(/\$/g, "") *
                        shoppinglist.quantity
                      }</div>
                    </div>
                </div>
        
              
           `;
                })
                .join("")
        }
        <hr> 
              <div class="checkout">
              <div class="total">
                <div>
                  <div class="Subtotal">Sub-Total</div>
                  <div class="items">${props.total ? props.total : 0}</div>
                </div>
                <div class="total-amount">$${props.shoppinglist.reduce(
                  (sum, i) => {
                    return sum + i.price.replace(/\$/g, "") * i.quantity;
                  },
                  0
                )}</div>
              </div>
              <button class="button">Checkout</button></div>
			</div>`;
  },
});

// Render the initial UI

cartapp.render();
