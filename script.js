let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;
let limit = 500;
let filteredProducts = [];
const searchBar = document.querySelector('.search-input');
const itemsPerPageDropdown = document.getElementById('items-per-page');
const cartIcon = document.getElementById('cart-icon');
const cartPreview = document.getElementById('cart-preview');

function setItemsPerPageOptions() {
    if (itemsPerPageDropdown) {
        itemsPerPageDropdown.innerHTML = `
            <option value="20" selected>20 items</option>
            <option value="10">10 items</option>
            <option value="5">5 items</option>
        `;
    }
}

async function fetchCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const categories = await response.json();
        populateCategories(categories);
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
}

function populateCategories(categories) {
    const categoryDropdown = document.getElementById('category-filter');
    if (categoryDropdown) {
        categoryDropdown.innerHTML = '<option value="all">All Categories</option>';
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category; // Use the category string as the value
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize the first letter
            categoryDropdown.appendChild(option);
        });
    }
}


async function fetchProducts(page = 1, category = 'all') {
    const skip = (page - 1) * limit;
    const url = category === 'all' 
        ? `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        products = data.products || data;
        filteredProducts = products;
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        alert("Could not load products. Please try again later.");
    }
}

// Handle change in items per page
if (itemsPerPageDropdown) {
    itemsPerPageDropdown.addEventListener('change', () => {
        limit = parseInt(itemsPerPageDropdown.value);
        currentPage = 1;
        fetchProducts(currentPage);
const pageInfo = document.getElementById('page-info');
if (pageInfo) {
    pageInfo.textContent = `Page ${currentPage}`;
}
    });
}

const categoryDropdown = document.getElementById('category-filter');
if (categoryDropdown) {
    categoryDropdown.addEventListener('change', () => {
        currentPage = 1;
        fetchProducts(currentPage, categoryDropdown.value);
    });
}

 if (searchBar) {
    searchBar.addEventListener('input', () => {
        const searchText = searchBar.value.toLowerCase();
        filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchText));
        displayProducts(filteredProducts);
    });
}

// Display products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    if (productList) {
        productList.innerHTML = '';

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.thumbnail}" alt="${product.title}" class="product-image">
                </div>
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.thumbnail}')">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }
}

// Add item to cart
function addToCart(productId, title, price, thumbnail) {
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, title, price, thumbnail, quantity: 1 });
    }
    updateCart();
}

// Update cart function (with increase/decrease buttons)
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-badge').textContent = cartCount;
    const cartItemsList = document.getElementById('cart-items-list');
    if (cartItemsList) {
        cartItemsList.innerHTML = '';

        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.price * item.quantity;
            const cartItem = document.createElement('li');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-image-container">
                    <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-image">
                </div>
                <div class="cart-item-details">
                    <span class="cart-item-title">${item.title}</span>
                    <span>$${item.price} x ${item.quantity}</span>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="increaseQuantity(${item.id})">+</button>
                    <button onclick="decreaseQuantity(${item.id})">-</button>
                    <button class="remove-button" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            `;
            cartItemsList.appendChild(cartItem);
        });
        document.getElementById('preview-total-price').textContent = totalPrice.toFixed(2);
    }
}

// Increase and decrease quantity functions
function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    product.quantity += 1;
    updateCart();
}

function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product.quantity > 1) {
        product.quantity -= 1;
    } else {
        removeFromCart(productId);
    }
    updateCart();
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Pagination
function changePage(direction) {
    currentPage += direction;
    const pageInfo = document.getElementById('page-info');
    if (currentPage < 1) {
        currentPage = 1;
    }
    fetchProducts(currentPage, categoryDropdown ? categoryDropdown.value : 'all');
    if (pageInfo) {
        pageInfo.textContent = `Page ${currentPage}`;
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }
    alert(`Thank you for your purchase! Total: $${document.getElementById('preview-total-price').textContent}`);
    cart = [];
    updateCart();
}

// Toggle cart preview visibility when clicking cart icon
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        cartPreview.style.display = cartPreview.style.display === 'block' ? 'none' : 'block';
    });
}

// Hide cart preview when clicking outside of it
document.addEventListener('click', (event) => {
    if (!cartIcon.contains(event.target) && !cartPreview.contains(event.target)) {
        cartPreview.style.display = 'none';
    }
});

// Initialize
setItemsPerPageOptions();
fetchCategories();
fetchProducts(currentPage);
updateCart();
