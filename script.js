// script.js
document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Memory', price: 450, description: 'A sickly French child invents a make-believe older brother, only to learn from a family friend that he did, in fact, have an older half-brother who was killed in a concentration camp during World War Two, a fact which leads to darker family secrets', category: 'novels', image: 'img1.jpg' },
        { id: 2, name: 'An Affair with a Notorious heiress', price: 490, description: 'The son of a duke and an infamous mother, Alistair Mabry, Marquess of Rexton, fought his way to respectability. Now, the most eligible bachelor in London, marriage-shy Rexton will take only a wife with an impeccable reputation, good breeding, and a penchant for staying out of the gossip sheets', category: 'novels', image: '2.jpg' },
        { id: 3, name: 'Soul', price: 600, description: 'Soul, or Dzhan is a novella by Andrey Platonov. It was completed in 1935 by as a result of his second trip to the Turkmen Republic. Although the Soviet state in the 1930s censored Dzhan, and only published selected chapters, the uncensored text was finally published in full in 1999.', category: 'novels', image: '3.jpg' },
        { id: 4, name: 'JJK Manga Issue 21', price: 800, description: 'Jujutsu Kaisen Manga Issue 21', category: 'manga', image: '1-.jpg' },
        { id: 5, name: 'Naruto Manga Issue 10', price: 500, description: 'Naruto Manga Issue 10', category: 'manga', image: '6.jpg' },
        { id: 6, name: 'Demon Slayer Manga Issue 1', price: 550, description: 'Demon Slayer Manga Issue 1', category: 'manga', image: '7.jpg' },
        { id: 7, name: 'One Punch Man Manga Issue 1', price: 600, description: 'One Punch Man Manga Issue 1', category: 'manga', image: '8.jpg' },
        { id: 8, name: 'JJK Manga Issue 14', price: 590, description: 'Jujutsu Kaisen Manga Issue 14', category: 'manga', image: '9.jpg' },
        { id: 9, name: 'Spider-man MoonGirl ', price: 200, description: ' Marvels Spider-man MoonGirl Comic', category: 'comic', image: 'cartoon1.jpg' },
        { id: 10, name: 'MoonGirl and Devil Dinosaur', price: 165, description: 'MoonGirl and Devil Dinosaur Comic', category: 'comic', image: 'cartoon2.jpg' },
        { id: 11, name: 'The Amazing Spider-Man ', price: 159, description: 'The Amazing SpiderMan', category: 'comic', image: 'cartoon3.jpg' },
        { id: 12, name: 'Doctor Strange', price: 150, description: 'Doctor Strange', category: 'comic', image: 'cartoon4.jpg' },


    ];

    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const filterSelect = document.getElementById('filter');

    function displayProducts(productsToDisplay) {
        productList.innerHTML = '';
        productsToDisplay.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p> <b> Rs: ${product.price} <b> </p>
            `;
            productList.appendChild(productElement);
        });
    }

    function filterProducts() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = filterSelect.value;
        const filteredProducts = products.filter(product => {
            return (
                product.name.toLowerCase().includes(searchTerm) &&
                (selectedCategory === '' || product.category === selectedCategory)
            );
        });
        displayProducts(filteredProducts);
    }

    searchInput.addEventListener('input', filterProducts);
    filterSelect.addEventListener('change', filterProducts);

    displayProducts(products);
});
