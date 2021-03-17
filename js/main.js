const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`;

let getRequest = (url, cb) => {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = () => {
        if(xhr.readyState !== 4){
            return;
        }

        if(xhr.status !== 200){
            console.log('some error');
            return;
        }

        cb(xhr.responseText);
    }
}

class Products {
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData()
            .then(() => {this._render()});
        this.addToCart();
        this.showCart();

    }

    showCart() {
        let btnCart = document.querySelector('.btn-cart');
        let cart = document.querySelector('.cart');
            btnCart.addEventListener('click',()=>{
            if (cart.style.display !== 'none') {
                cart.style.display = 'none';
            } else {
                cart.style.display = 'block';
            }
        })


    }
    addToCart() {
        setTimeout(()=> {
            let btnBuy = document.getElementsByClassName('buy-btn')
            for (let btn of btnBuy) {
                btn.addEventListener('click', () => {
                    let target = event.target;
                    let nodes = target.parentNode.childNodes
                    let arrNodes = Array.prototype.slice.call(nodes)[1];
                    if (target.innerHTML === 'Купить') {
                        for (let product of this.products) {
                            if (arrNodes.firstElementChild.innerText.includes(product.title)) {
                                    new Cart(product)
                                    target.innerHTML = 'Добавлено';
                                    target.style.backgroundColor = 'lightgreen';
                                }
                            }
                        } else {
                            for(let product of this.products){
                                if (arrNodes.firstElementChild.innerText.includes(product.title)) {
                                    target.innerHTML = 'Купить';
                                    target.style.backgroundColor = 'lightgrey';
                                }
                            }
                        }
                    }
                )}
            }, 2000)

    }



    _fetchData() {
       return fetch(`${API}/catalogData.json`)
           .then(result => result.json())
           .then(data => {
               for ( let product of data) {
                   this.products.push( new ProductItem(product));
               }
           })
    }




    _render() {
        for (let product of this.products) {

            if (product.rendered){
                continue
            }
            this.container.insertAdjacentHTML('beforeend', product.render());
        }

        }

}

class ProductItem {
    title = '';
    price = '';
    id = '';
    img = '';
    rendered = false;


    constructor(product, img ='https://placehold.it/250X200') {
        ({ product_name: this.title, price: this.price, id_product: this.id} = product);
        this.img = img;
    }

    render() {
        this.rendered = true;
        return `
        <div class="product-item ${this.title}">
            <img src="${this.img}" alt="${this.title}">
            <div class="desc">
                 <div class="desc__info">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                </div>
               <button class="buy-btn" type="button">Купить</button>
            </div>      
        </div>
    `
    }

    //метод, который принимает на вход выбранный пользователем товар, и записывает его в productsArray

}

class Cart {
    //массив, который хранит выбраные пользователем товары
        productsArray = [];
    //хранится элемент,в который записывается генерируемая разметка
        container = null;

    //генерируем корзину с элементами.
        constructor(product) {
            this.container = document.querySelector('.cart');
            this._render(product);
            this.delProductFromCart(product);
        }

    //удаляет элемент из корзины.
        delProductFromCart (product) {
            let delBtns = document.getElementsByClassName('btn-del')
            let buyBtns = document.getElementsByClassName('buy-btn')
            for(let delBtn of delBtns ){
                delBtn.addEventListener('click', ()=> {
                    let target  = event.target;
                    let parentNodes = target.parentNode.childNodes;
                    let arrNodes = Array.prototype.slice.call(parentNodes);
                    arrNodes.forEach( function(element){
                        if(element.innerText === product.title){
                            target.parentNode.remove();
                            for(let buyBtn of buyBtns) {
                                if (buyBtn.innerHTML === 'Добавлено') {
                                    buyBtn.innerHTML = 'Купить'
                                    buyBtn.style.backgroundColor = 'lightgrey';
                                }
                            }
                            }
                })


                })


            }
        }
    //метод перебирает массив cartsArray, создавая новые объекты класса CartItem, на
    //основе которого создается HTML разметка для каждого объекта. Эта разметка записывается в container.
        _render(product) {
            this.productsArray.push(new CartItem(product));
            for(let product of this.productsArray){

                if(product.addedToCart){
                    continue
                }
                this.container.insertAdjacentHTML('beforeend', product.render());

            }


        }


}

class CartItem {
    name = '';
    price = 0;
    id = 0;
    img = '';
    addedToCart = false;

    constructor(cartElem, img ='https://placehold.it/30X30'){
        ({title: this.name, price: this.price, id: this.id} = cartElem);
        this.img = img;
    } //метод принимает на вход двнные из productsArray
    render() {
        this.addedToCart = true;
        return `
            
                <div class="cart_item">
                    <img src="${this.img}" alt="IMAGE">
                    <p class="cart_item_name">${this.name}</p>
                    <input type="number" min="1" max="99">шт.
                    <h3 class="cart_item_price">${this.price}</h3>
                    <button class = "btn-del">Удалить</button>
                </div>
            
        `
    }//метод с HTML разметкой, на основе которой создаются
    //элементы корзины. В разметку добавляем кнопку delProductFromCart, а также inputs для
    //для регулировки колличества товара.
}


const list  = new Products('.products');







