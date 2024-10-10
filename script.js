let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1;
let limit = 20;
let filteredProducts = [];
const categoryDropdown = document.getElementById('category-filter');
const searchBar = document.getElementById('search-bar');
const itemsPerPageDropdown = document.getElementById('items-per-page'); // Move this to the top

// Set default options for items per page
function setItemsPerPageOptions() {
    itemsPerPageDropdown.innerHTML = `
        <option value="20" selected>20 items</option>
        <option value="10">10 items</option>
        <option value="5">5 items</option>
    `;
}

// Fetch all categories from the API and populate dropdown
async function fetchCategories() {
    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const categories = await response.json();
        console.log("Fetched categories:", categories);
        populateCategories(categories);
    } catch (error) {
        console.error("Failed to fetch categories:", error);
    }
}

// Populate categories into dropdown
function populateCategories(categories) {
    categoryDropdown.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.slug;
        option.textContent = category.name;
        categoryDropdown.appendChild(option);
        console.log("Added category to dropdown:", category.name);
    });
}

// Fetch Products from API based on page and category
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
itemsPerPageDropdown.addEventListener('change', () => {
    limit = parseInt(itemsPerPageDropdown.value); // Update limit with selected value
    currentPage = 1; // Reset to the first page when limit changes
    const selectedCategory = categoryDropdown.value;
    fetchProducts(currentPage, selectedCategory);  // Fetch products again with new limit
});

// Filter products by category
categoryDropdown.addEventListener('change', () => {
    const selectedCategory = categoryDropdown.value;
    currentPage = 1; // Reset to first page when category changes
    fetchProducts(currentPage, selectedCategory);
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
    const selectedCategory = categoryDropdown.value;
    fetchProducts(currentPage, selectedCategory);
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
setItemsPerPageOptions(); // Initialize the items per page dropdown
fetchCategories(); // Fetch and populate categories on page load
fetchProducts(currentPage);
updateCart();
