// Sample product data
const products = [
    { id: 1, name: 'Apple', price: 1.0 },
    { id: 2, name: 'Banana', price: 1.5 },
    { id: 3, name: 'Carrot', price: 0.5 }
];

// Function to add products to the shop
function displayProducts() {
    const productList = document.getElementById('productList');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <p>${product.name} - $${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Cart array to store added products
const cart = [];

// Function to handle adding products to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    displayCart();
}

// Function to display items in the cart
function displayCart() {
    const cartList = document.getElementById('cartList');
    cartList.innerHTML = '';  // Clear previous items
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Initial product display
window.onload = () => {
    displayProducts();
};
