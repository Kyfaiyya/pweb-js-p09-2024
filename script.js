let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;
const limit = 20;
let filteredProducts = [];
const categoryDropdown = document.getElementById('category-filter');
const searchBar = document.getElementById('search-bar');

// Fetch Products from API
async function fetchProducts(page = 1) {
    const skip = (page - 1) * limit;
    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        products = data.products;
        filteredProducts = products;
        populateCategories();
        displayProducts(filteredProducts);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        alert("Could not load products. Please try again later.");
    }
}

// Populate categories to dropdown
function populateCategories() {
    const categories = [...new Set(products.map(product => product.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        categoryDropdown.appendChild(option);
    });
}

// Filter products by category
categoryDropdown.addEventListener('change', () => {
    const selectedCategory = categoryDropdown.value;
    filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);
    displayProducts(filteredProducts);
});

// Search products by name
searchBar.addEventListener('input', () => {
    const searchText = searchBar.value.toLowerCase();
    filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchText));
    displayProducts(filteredProducts);
});

// Display products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
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
    cartItemsList.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-image">
            <span>${item.title} - $${item.price} x ${item.quantity}</span>
            <button onclick="increaseQuantity(${item.id})">+</button>
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsList.appendChild(cartItem);
    });
    document.getElementById('preview-total-price').textContent = totalPrice.toFixed(2);
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
    fetchProducts(currentPage);
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

// Initialize
fetchProducts(currentPage);
updateCart();

// Change number of items per page
const itemsPerPageDropdown = document.getElementById('items-per-page');
itemsPerPageDropdown.addEventListener('change', () => {
    limit = parseInt(itemsPerPageDropdown.value);
    fetchProducts(currentPage);  // Fetch products again with new limit
});
