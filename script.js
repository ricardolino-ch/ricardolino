// Dynamische Listings und Inserate speichern
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sell-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const category = document.getElementById('category').value;
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const price = document.getElementById('price').value;
            const imageInput = document.getElementById('image');

            const reader = new FileReader();
            reader.onload = () => {
                const image = reader.result;

                const newListing = { title, description, price, image };

                const listings = JSON.parse(localStorage.getItem(category)) || [];
                listings.push(newListing);
                localStorage.setItem(category, JSON.stringify(listings));

                alert('Ihr Inserat wurde erfolgreich erstellt!');
                form.reset();
            };

            reader.readAsDataURL(imageInput.files[0]);
        });
    }

    // Listings laden
    const categories = ['fahrzeuge', 'immobilien', 'elektronik', 'moebel', 'freizeit', 'haustiere'];
    categories.forEach((category) => {
        const listingsContainer = document.getElementById(`${category}-listings`);
        if (listingsContainer) {
            const listings = JSON.parse(localStorage.getItem(category)) || [];
            listings.forEach((listing) => {
                const listingElement = document.createElement('div');
                listingElement.classList.add('col-md-4');
                listingElement.innerHTML = `
                    <div class="card h-100">
                        <img src="${listing.image}" class="card-img-top" alt="${listing.title}">
                        <div class="card-body">
                            <h5 class="card-title">${listing.title}</h5>
                            <p class="card-text">${listing.description}</p>
                            <p class="text-primary fw-bold">CHF ${listing.price}</p>
                        </div>
                    </div>
                `;
                listingsContainer.appendChild(listingElement);
            });
        }
    });
});
