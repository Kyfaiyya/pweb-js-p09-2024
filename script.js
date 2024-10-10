let products = []; // Initialize products array to hold API data
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentPage = 1; // Halaman saat ini
const limit = 20; // Jumlah item per halaman
const totalProducts = 300; // Total jumlah produk yang ingin ditampilkan
const totalPages = Math.ceil(totalProducts / limit); // Total halaman yang dibutuhkan

// Fetch Products dari API dengan limit dan skip
async function fetchProducts(page = 1) {
    const skip = (page - 1) * limit;
    const url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        products = data.products;
        displayProducts(products);
        updatePaginationControls(page);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        alert("Could not load products. Please try again later.");
    }
}

// Display Products di halaman
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Bersihkan produk sebelumnya

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

// Update Kontrol Pagination
function updatePaginationControls(page) {
    document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;
    document.getElementById('prev-page').disabled = page <= 1;
    document.getElementById('next-page').disabled = page >= totalPages;
}

// Fungsi untuk Mengubah Halaman
function changePage(direction) {
    if ((direction === -1 && currentPage > 1) || (direction === 1 && currentPage < totalPages)) {
        currentPage += direction;
        fetchProducts(currentPage);
    }
}

// Inisialisasi
fetchProducts(currentPage);


// Fetch Products from API
async function fetchProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        products = data.products; // Store products for future reference
        displayProducts(products);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        alert("Could not load products. Please try again later.");
    }
}

// Display Products
function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; // Clear existing products

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



// Add Item to Cart with Thumbnail
function addToCart(productId, title, price, thumbnail) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: productId, title, price, thumbnail, quantity: 1 });
    }

    updateCart();
}

// Decrease Item Quantity in Cart
function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove Item from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-badge').textContent = cartCount;

    const cartItemsList = document.getElementById('cart-items-list');
    cartItemsList.innerHTML = ''; // Clear existing items

    let totalPrice = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        const itemElement = document.createElement('li');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-details">
                <span>${item.title}</span>
                <small>$${item.price} x ${item.quantity}</small>
            </div>
            <button onclick="decreaseQuantity(${item.id})">-</button>
            <button onclick="addToCart(${item.id}, '${item.title}', ${item.price}, '${item.thumbnail}')">+</button>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsList.appendChild(itemElement);
    });

    // Tampilkan total harga di atas tombol checkout
    document.getElementById('preview-total-price').textContent = totalPrice.toFixed(2);
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
fetchProducts();
updateCart();
