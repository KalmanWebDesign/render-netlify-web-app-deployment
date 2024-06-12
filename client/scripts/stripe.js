const form = document.querySelector("form");

form.addEventListener('submit', function (event) {
    event.preventDefault();

    console.log("stripe");

    const selectedItems = [];
    const orderDetails = document.querySelectorAll("[data-item-id][data-item-quantity");

    orderDetails.forEach(detail => {
        const id = detail.dataset.itemId;
        const quantity = detail.dataset.itemQuantity;

        selectedItems.push({ id: parseInt(id), quantity: parseInt(quantity) });
    });

    fetch("https://alvinspizzeria.onrender.com/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: selectedItems,
        }),
    })
        .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
            window.location = url;
        })
        .catch(e => {
            console.error(e.error);
        })

});