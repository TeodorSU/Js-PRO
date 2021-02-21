class Products {
    data = [];
    products = [];
    container = null;

    constructor(selector) {
        this.container = document.querySelector(selector);
        this._fetchData()
        this._render()
        this.productsPrice();
    }

    productsPrice() {
        let price = 0;
        this.data.forEach(function (product){
            return price += product.price;
        });
        console.log(price);
    }


    _fetchData() {
        this.data = [
            { title: 'Notebook', id: 1, price: 2000 },
            { title: 'Keyboard', id: 2, price: 200 },
            { title: 'Mouse', id: 3, price: 100 },
            { title: 'Gamepad', id: 4, price: 87 },
        ];
    }
    _render(){
        for (let data of this.data) {
            const product = new ProductItem(data);
            this.products.push(product);
            this.container.insertAdjacentHTML('beforeend', product.render());
        }
    }
}

class ProductItem {
    title = '';
    price = '';
    id = '';
    img = '';

    constructor(product, img ='https://placehold.it/250X200') {
        ({ title: this.title, price: this.price, id: this.id} = product);
        this.img = img;
    }
    render() {
        return `
        <div class="product-item">
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

}

class Cart {
        //cartsArray - массив, который хранит выбраные пользователем товары
        //container - хранится элемент,в который записывается генерируемая разметка
        //constructor() - генерируем корзину с элементами.
        //checkedProducts() - метод, который принимает на вход выбранный пользователем товар, и записывает его в cartsArray
        //delProductFromCart () - удаляет элемент из корзины. Является callback функцией, для кнопки delProductFromCart
        //render() - метод перебирает массив cartsArray, создавая новые объекты класса CartItem, на
        //основе которого создается HTML разметка для каждого объекта. Эта разметка записывается в container.

}

class CartItem {
    //name - имя товара;
    //price - цена
    //id
    //img
    //constructor() - метод принимает на вход двнные из cartsArray
    //render() - метод с HTML разметкой, на основе которой создаются
    //элементы корзины. В разметку добавляем кнопку delProductFromCart, а также inputs для
    //для регулировки колличества товара.
}

const list  = new Products('.products');

