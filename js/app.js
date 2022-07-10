window.onload = function () {
  localStorage.setItem("visitor", uuidv4());
  const lastItem = window.location.pathname.substring(
    window.location.pathname.lastIndexOf("/") + 1
  );
  if (lastItem.includes("index")) {
    registerView("Home");
  } else {
    registerView("other");
  }
};

function registerView(page) {
  var visitorID = localStorage.getItem("visitor");
  var cart =
    sessionStorage.getItem("cart") !== null
      ? JSON.parse(sessionStorage.getItem("cart")).shoppingList
      : false;
      document.getElementById("cart-svg").getElementsByClassName("quantity")[0].textContent += JSON.parse(sessionStorage.getItem("cart")).totalItem;

  fetch("https://api.sandbox.blackcrow.ai/v1/events/view", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_name: "blackcrow",
      page_id: page,
      site_language: document.documentElement.lang,
      page_title: document.title,
      page_url: document.URL,
      page_referrer_url: document.referrer,
      device_info: window.navigator.userAgent,
      visitor_id: visitorID,
      cart: cart.map((ct) =>
        ct.price ? { ...ct, price: ct.price.replace(/\$/g, "") } : ct
      ),
    }), // body data type must match "Content-Type" header
  })
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => console.log("Error on server", error));
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
