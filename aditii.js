class Store {
    constructor() {
        //object to hold items in cart
        this.itemInCart = {
            itemCount: 0,
            subTotal: 0
        }

        //object hold inventory
        this.inventory = {
            item1: {
                id:1,
                img: 'media2/image2.jpg',
                alt: 'shoe',
                class: 'latest-img',
                price: 74.00,
                qty: 0,
                name: 'shoe',
            },

            item2: {
                id:2,
                img: 'media2/image3.jpg',
                alt: 'shirt',
                class: 'latest-img',
                price: 10.00,
                qty: 0,
                name: 'shirt',
            },

            item3: {
                id:3,
                img: 'media2/image4.jpg',
                alt: 'shorts',
                class: 'latest-img',
                price: 30.00,
                qty: 0,
                name: 'shorts',
            },

            item4: {
                id:4,
                img:'media5/image2.jpg',
                alt: 'shoe',
                class: 'latest-img',
                price: 60.00,
                qty: 0,
                name: 'shoe',
            },

            item5: {
                id:5,
                img: 'media3/image3.jpg',
                alt: 'shirt',
                class: 'latest-img',
                price: 14.00,
                qty: 0,
                name: 'shirt',
            },


            item6: {
                id:6,
                img: 'media8/image4.jpg',
                alt: 'pants',
                class: 'latest-img',
                price: 50.00,
                qty: 0,
                name: 'pants',
            },

            item7: {
                id:7,
                img: 'media2/image7.jpg',
                alt: 'purse',
                class: 'latest-img',
                price: 80.00,
                qty: 0,
                name: 'purse',
            },

            item8: {
                id:8,
                img: 'media2/image8.jpg',
                alt: 'shirt',
                class: 'latest-img',
                price: 55.00,
                qty: 0,
                name: 'shirt',
            },

            item9: {
                id:9,
                img: 'media2/image4.jpg',
                alt: 'walllet',
                class: 'latest-img',
                price: 15.00,
                qty: 0,
                name: 'wallet',
            },
        }
        this.itemsInCart = {
            itemCount: 0,
            subTotal: 0,
        }
    }

    init() {
        this.loadItems();
        this.addToCart();
        this.checkout();
    }

    loadItems() {
        //load items on page
        let count = 0;

        //access HTML nodes
        let products1 = document.getElementById('products1');
        let products2 = document.getElementById('products2');
        console.log(products1)


        for(const key in this.inventory) {
            const item = this.inventory[key];
            const product = document.createElement('div');
            product.className = 'col order-5';
            product.className = 'col order-1';
            product.className = 'col-6 col-sm-3';
            product.className = 'col-6 col-sm-4';
            product.innerHTML =`
            <img scr="${item.img}" alt="${item.alt}" class-img-fluid ${item.class}>
            <button class="add-button" data-id="${item.id}">Add to Cart</button>`

            if (count < 4) {
                products1.appendChild(product);
            } else {
                products2.appendChild(product)
            }
            count++;
        }
    }

    addToCart() {
        //set variables
        let buttons = document.querySelectorAll('.add-button');
        let cartItems = document.getElementById('cartItems');
        let cartSubTotal = document.getElementById('cartSubTotal');
        let itemCount = 0;
        let price = 0;

        //for in loop to loop through this.inventory
        for(const key in this.inventory) { 
            const item = this.inventory[key];
            buttons.forEach(button => {
                if (button.dataset['.id'] == item.id) {
                    itemCount++;
                    price = price + item.price;
                    this.itemsInCart.itemCount = itemCount;
                    this.itemsInCart.subTotal = price;

                    item.qty++;
                    console.log(item);
                    console.log(this.itemInCart);

                cartItems.innnerText = itemCount;
                cartSubTotal.innerText = price.toFixed(2);
                }
            })
        }
    }
    

    checkout() {
        //set variables
        let table = document.getElementById('tbody');
       // let checkout = document.getElementById('checkout');
        let checkoutPage = document.querySelector('.checkout-page');
        let subTimeQty = 0;
        let subTotalValue = document.getElementById('subTotalValue');
        let taxValue = document.getElementById('taxValue');
        let totalValue = document.getElementById('totalValue');
        let tax = 0;
        let shippingValue = document.getElementById('shippingValue');
        let checkoutItemCount = document.getElementById('checkoutItemCount');
        let shipping = 6;

        if (this.itemsInCart.itemCount == 1) {
            checkoutItemCount.innerText = `${this.itemsInCart.itemCount} item`;
        } else {
            checkoutItemCount.innerText = `${this.itemInCart.itemCount} items`
        }

        //load content on checkout page
        for (const key in this.inventory) {
            const item = this.inventory[key];

            subTimeQty = (item.qty * item.price).toFixed(2);
            subTotalValue.innerText = this.itemsInCart.subTotal.toFixed(2);
            shippingValue.innerText = shipping.toFixed(2);
            tax = this.itemsInCart.subTotal * .07;
            taxValue.innerText = tax.toFixed(2);
            totalValue.innerText = (this.itemsInCart.subTotal + tax + shipping).toFixed(2)

        if (item.qty > 0) {
            
            const tableRow = document.createElement('tr');
            tableRow.className = 'product-checkout';

            tableRow.innerHTML +=`
            <td id="checkoutImg>
            <img src="${item.img}" alt="${item.alt}" class="img-fluid checkout-img">
            <div class="product-desc">
               <p class="item-name>${item.name}</p>
             </div>
            </td>
               <td id ="productCode">${item.productCode}</td>
            </td>
               <p class = "unit=price>${item.price.toFixed(2)}</p>
             </td>
            <td>
              <div id="itemQuantity">
               <p id="qtyInput">${item.qty}</p>
               </div>
            </td>
            <td id="itemSubTotal">${subTimeQty}</td>`
            
            table.append(tableRow);
         }
      }
    }
}

let action = new Store();

action.init();