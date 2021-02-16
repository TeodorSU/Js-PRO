const data = [
    { title: 'Notebook', id: 1, price: 2000 },
    { title: 'Keyboard', id: 2, price: 200 },
    { title: 'Mouse', id: 3, price: 100 },
    { title: 'Gamepad', id: 4, price: 87 },
];

const renderProduct = ({title = 'Undefined', price}, img = 'https://placehold.it/250X200') => {
    return `
        <div class="product-item">
            <img src="${img}" alt="${title}">
            <div class="desc">
                 <div class="desc__info">
                    <h3>${title}</h3>
                    <p>${price}</p>
                </div>
               <button class="" type="button">Купить</button>
            </div>      
        </div>
    `;
};

const render = (products) => {
    document.querySelector('.products').innerHTML = products.map(item => renderProduct(item)).join('');
};

render(data);