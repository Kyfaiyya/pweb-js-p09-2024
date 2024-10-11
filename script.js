body {
    font-family: 'Montserrat', Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #e8cae8;
    color: #333;
}
/* Header Container */
header {
    background: linear-gradient(45deg, #FF69B4, #FF1493); /* Gradient background */
    padding: 20px 0;
    text-align: center;
}

/* Shop Title */
.header-content {
    margin-bottom: 20px; /* Add space between title and main-bar */
}

.brand-title {
    font-family: 'Playfair Display', serif; /* Apply Playfair Display font */
    font-size: 50px; /* Make the font size large and aesthetic */
    font-weight: 700; /* Bold weight for emphasis */
    color: rgb(165, 69, 102); /* Adjust color as needed */
    margin: 0;
}

/* Main Bar Styling */
.main-bar {
    background-color: white; /* White background for the search and category area */
    padding: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    max-width: 1200px;
    margin: 0 auto; /* Center the main-bar */
}

/* Navigation Menu */
nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex; /* Use flexbox to align items horizontally */
    justify-content: center; /* Center the navigation menu */
    align-items: center;
}

nav ul li {
    display: inline-block;
    margin-right: 1.5em;
}

nav ul li:last-child {
    margin-right: 0; /* Remove margin from the last item */
}

nav ul li a {
    color: white; /* Ensure white color for nav links */
    text-decoration: none;
    font-weight: bold;
    font-size: 1.1em;
    padding: 5px;
    transition: border-bottom 0.3s ease, color 0.3s ease; /* Smooth transition for hover effect */
}

nav ul li a:hover {
    border-bottom: 2px solid #22a745; /* Green border-bottom on hover */
    color: #22a745; /* Change text color to match border on hover */
}

/* Search Bar & Category Filter */
.search-container {
    display: flex;
    flex-grow: 1;
    gap: 10px; /* Add space between category dropdown and search bar */
}

#category-filter {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: white;
    color: #333;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
}

.search-input {
    flex-grow: 1; /* Makes the search bar take available space */
    padding: 10px 15px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: #333;
}

/* Cart Icon Styling */
.icon-nav {
    display: flex;
    align-items: center;
}

.cart-container {
    position: relative;
}

.icon {
    font-size: 24px;
    cursor: pointer;
}

.badge {
    position: absolute;
    top: -8px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 4px 7px;
    font-size: 12px;
}

/* Product List */
#product-list {
    display: flex;
    flex-wrap: wrap;
    padding: 2em;
    justify-content: space-between;
}

.product {
    border: 2px solid pink;
    color: #333;
    margin: 1em;
    padding: 1em;
    width: 220px;
    text-align: center;
    box-sizing: border-box;
    background-color: #d8b1e3;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.product:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.product h3 {
    font-size: 1.1em;
    margin-bottom: 0.5em;
    color: #222;
}

.product p {
    font-size: 1em;
    margin-bottom: 0.8em;
    color: #666;
}

.product-price {
    font-size: 1.2em;
    font-weight: bold;
    color: #22a745;
    margin-bottom: 0.5em;
}

.product button {
    background-color: #9331de;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.product button:hover {
    background-color: #a01a50;
}

/* Product Image */
.product-image-container {
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: #f4f4f4;
    border-radius: 10px;
    margin-bottom: 10px;
}

.product-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
}

#cart {
    position: fixed;
    right: 20px;
    top: 20px;
    width: 300px;
    background-color: #fff;
    padding: 1em;
    box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}

#cart-items {
    list-style: none;
    padding: 0;
    color: #000;
}

#cart-items li {
    margin-bottom: 1em;
    color: #000;
}

/* Keranjang belanja */
.cart-preview {
    position: absolute;
    top: 30px;
    right: 0;
    width: 350px;
    background-color: #fff;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 10;
    padding: 15px;
    border-radius: 5px;
    color: black;
}

.cart-container:hover .cart-preview {
    display: block;
}

.cart-item {
    color: #000 !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
    border-bottom: none;
}

.cart-item-image {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 3px;
    margin-right: 10px;
}

.cart-item-details {
    flex-grow: 1;
    margin-left: 10px;
}

.cart-item-details span {
    display: block;
    font-size: 14px;
    font-weight: bold;
}

.cart-item-details small {
    display: block;
    font-size: 12px;
    color: #000;
}

.cart-item button {
    color: #000;
    background-color: #e0e0e0;
    border: none;
    padding: 5px 8px;
    border-radius: 3px;
    cursor: pointer;
    margin-left: 5px;
    font-size: 12px;
}

.cart-item button:hover {
    background-color: #ccc;
}

.cart-summary {
    padding-top: 10px;
    text-align: center;
    color: #000;
}

.cart-summary p {
    font-weight: bold;
    margin: 0 0 10px;
    color: #000;
}

.cart-summary button {
    background-color: #9331de;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 5px;
    cursor: pointer;
}

.cart-summary button:hover {
    background-color: #a01a50;
}

/* Pagination */
#pagination-controls {
    text-align: center;
    margin: 20px 0;
}

#pagination-controls button {
    margin: 0 5px;
    padding: 10px 15px;
    background-color: #22a745;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s ease;
}

#pagination-controls button:hover {
    background-color: #8c1e5a;
}

#page-info {
    font-weight: bold;
    margin: 0 10px;
    color: #333;
}
/*Part 2*/
/* Top Bar */
.top-bar {
    background-color: #f4f4f4;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.top-bar .app-link {
    text-decoration: none;
    color: #333;
}

.top-nav a {
    margin-right: 15px;
    color: #666;
    text-decoration: none;
    transition: color 0.3s;
}

.top-nav a:hover {
    color: #22a745;
}

/* Main Bar */
.main-bar {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    background-color: white;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.logo {
    width: 120px;
    margin-right: 20px;
}

.category-button {
    margin-right: 20px;
    padding: 8px 12px;
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-input {
    flex: 1;
    padding: 8px;
    margin-right: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.icon-nav {
    display: flex;
    align-items: center;
}

.icon {
    position: relative;
    margin-right: 20px;
    font-size: 24px;
}

.icon .badge {
    position: absolute;
    top: -5px;
    right: -10px;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 12px;
}

.user-profile {
    display: flex;
    align-items: center;
}

.user-profile span {
    margin-left: 10px;
    color: #666;
}

/* Bottom Bar */
.bottom-bar {
    background-color: white;
    padding: 15px;
    border-top: 1px solid #ddd;
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
}

.bottom-bar a {
    text-decoration: none;
    color: #666;
    transition: color 0.3s;
}

.bottom-bar a:hover {
    color: #22a745;
}

/* Part 3 */
/* Cart Container */
.cart-container {
    position: relative;
}

.cart-preview {
    position: absolute;
    top: 30px;
    right: 0;
    width: 300px;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: none;
    z-index: 10;
}

.cart-preview ul {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 200px;
    overflow-y: auto;
}

.cart-preview li {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f0f0f0;
}

.cart-preview li button {
    margin-left: 5px;
    padding: 5px;
    font-size: 12px;
    cursor: pointer;
}


.cart-preview .cart-summary {
    padding: 10px;
    border-top: 1px solid #ddd;
    text-align: center;
}

/* Show Cart Preview on Hover */
.cart-container:hover .cart-preview {
    display: block;
}

.product-image {
    width: 100%;
    height: auto;
    max-height: 150px; /* Sesuaikan tinggi maksimum sesuai kebutuhan */
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 5px;
}

#pagination-controls {
    text-align: center;
    margin: 20px 0;
}

#pagination-controls button {
    margin: 0 5px;
    padding: 10px 15px;
    background-color: #7518e6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

#pagination-controls button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}

#page-info {
    font-weight: bold;
    margin: 0 10px;
}

/* Ensure wrapper takes full width */
.dropdown-wrapper {
    width: 100%;              
    display: flex;
    justify-content: center;  
    margin: 0 auto;          
}

/* Center the dropdown container */
.dropdown-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
}

/* Style untuk dropdown */
#items-per-page {
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #fff;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: all 0.3s ease-in-out; /* Tambahkan transisi dari remote */
}

/* Hover effect dari remote */
#items-per-page:hover {
    background-color: #f9f9f9; /* Lightens background on hover */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Lebih kuat bayangan saat hover */
}

/* Styling untuk label (opsional) */
.dropdown-container label {
    margin-right: 10px;
    font-size: 16px;
    color: #444;
}
