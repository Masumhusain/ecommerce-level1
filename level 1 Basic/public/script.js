// Jab page load ho, data fetch karo
window.addEventListener('DOMContentLoaded', () => {
  fetch('/products') // Server se JSON data le rahe hain
    .then(response => response.json()) // Response ko JSON me convert karo
    .then(products => {
      const container = document.getElementById('product-container');

      products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <h3>${product.name}</h3>
          <p>Price: ₹${product.price}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Data fetch karne me error:', error);
    });
});