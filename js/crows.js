function store(list) {
  sessionStorage.setItem("cart", JSON.stringify(list));
}
function getStore() {
  var shoppingList =
    sessionStorage.getItem("cart") !== null
      ? sessionStorage.getItem("cart")
      : false;
  return shoppingList;
}
var clickCount = 0;
var totalItem = 0;
var shoppingList =
  JSON.parse(getStore()) !== false ? JSON.parse(getStore()).shoppingList : [];

if (document.addEventListener) {
  document.addEventListener("click", handleClick, false);
} else if (document.attachEvent) {
  document.attachEvent("onclick", handleClick);
}
function handleClick(event) {
  event = event || window.event;
  event.target = event.target || event.srcElement;

  var element = event.target;

  if (
    element.nodeName === "BUTTON" &&
    /button-primary/.test(element.className)
  ) {
    var itemName = element.parentNode.getElementsByTagName("h4")[0].innerText;
    var itemPrice = element.parentNode.getElementsByTagName("h5")[0].innerText;
    var itemImg = element.parentNode.getElementsByTagName("img")[0].src;
    var itemId = element.parentNode.getAttribute("data-item-id");

    const index = shoppingList.findIndex((object) => object.id === itemId);

    if (shoppingList.length !== 0) {
      if (index === -1) {
        shoppingList.push({
          id: itemId,
          name: itemName,
          price: itemPrice,
          img: itemImg,
          quantity: 1,
        });
      } else {
        shoppingList[index].quantity = shoppingList[index].quantity + 1;
      }
    } else {
      shoppingList.push({
        id: itemId,
        name: itemName,
        price: itemPrice,
        img: itemImg,
        quantity: 1,
      });
    }

    store({
      shoppingList,
      totalItem: shoppingList.reduce((sum, i) => {
        return sum + i.quantity;
      }, 0),
    });
  }
}
