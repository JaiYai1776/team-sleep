// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, htmlStrings);
}


export function updateCartCount() {
  const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
  const cartCountElement = document.querySelector(".cart-count");

  if (!cartCountElement) {
    console.error("Cart count element not found!");
    return;
  }

  const itemCount = cartItems.reduce((total, item) => total + (item.Quantity || 1), 0);

  if (itemCount > 0) {
    cartCountElement.textContent = itemCount;
    cartCountElement.classList.remove("hide");
  } else {
    cartCountElement.classList.add("hide");
  }

  console.log("Cart count updated:", itemCount);
}
