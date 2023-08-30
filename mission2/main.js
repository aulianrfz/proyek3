// Mengambil elemen pada CSS
let openShopping= document.querySelector('.shopping'); // Elemen untuk menampilkan tampilan belanja
let closeShopping= document.querySelector('.closeShopping'); // Elemen untuk menutup tampilan belanja
let list = document.querySelector('.list'); // Elemen untuk menampilkan list produk yang dijual
let listCard = document.querySelector('.listCard'); // Elemen untuk menampilkan list produk yang telah ditambahkan ke keranjang belanja
let body = document.querySelector('body'); // Merepresentasikan elemen <body> pada HTML
let total = document.querySelector('.total'); // Menampilkan total harga produk yang telah ditambahkan ke keranjang belanja
let quantity = document.querySelector('.quantity'); // Menampilkan jumlah produk yang telah ditambahkan ke keranjang belanja

// Membuat event ketika tombol di klik
// Fungsi EventListener : Untuk mengamati aksi tertentu dan memberikan respon
openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

// Membuat list produk berupa array
let products = [
    {
        id: 0,
        name: 'Blush',
        image: '1.PNG',
        price: 100
    },
    {
        id: 1,
        name: 'Mascara',
        image: '2.PNG',
        price: 200
    },
    {
        id: 2,
        name: 'Concealer',
        image: '3.PNG',
        price: 300
    },
    {
        id: 3,
        name: 'Lip',
        image: '4.PNG',
        price: 400
    },
    {
        id: 4,
        name: 'Eyeliner',
        image: '5.PNG',
        price: 500
    },
    {
        id: 5,
        name: 'Powder',
        image: '6.PNG',
        price: 600
    },
];

// Membuat list card berupa array
let listCards = [];

// Menampilkan produk yang diperoleh dari array 'products'
function initApp(){
    products.forEach((value,key)=>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image} "/>
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${value.id})">Add to cart</button>
        `;
        list.appendChild(newDiv);
    })
}

// Memanggil fungsi 'initApp'
initApp();

// Membuat fungsi untuk menambahkan produk ke dalam list cards
function addToCard(key){
    if(listCards[key] == null){
        // Jika produk belum ada di list cards
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    // Jika produk sudah ada di list cards
    reloadCard();
}

// Memperbarui tampilan daftar produk yang ada dalam keranjang belanja
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value,key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key},${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key},${value.quantity + 1})">+</button>
                    </div>
            `;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

// Mengubah jumlah produk dalam keranjang belanja
function changeQuantity(key,quantity){
    if(quantity == 0){
        // Jika jumlah produk dalam keranjang belanja = 0, maka produk akan dihapus dari keranjang belanja
        delete listCards[key];
    }else{
        // Jika jumlah produk dalam keranjang belanja bukan 0, maka jumlah produk akan diubah
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    
    reloadCard();
}
    