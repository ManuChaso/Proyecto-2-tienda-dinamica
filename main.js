//Import de la base de datos desde un archivo de js externo
import {DataBase} from './dataBase.js';

//plantilla de los productos que se mostrarán en el DOM
const productTemplate = (product) => {
    return `
        <div class="product">
            <img src="${product.image}" alt="Imagen del producto"/>
            <p class="product-seller">${product.seller}</p>
            <p class="product-name">${product.name}</p>
            <p class="product-price">${product.price}€</p>
            <div class="product-description">
                <p>DESCRIPCIÓN:</p>
                <p>${product.description}</p>
            </div>
        </div>
    `
}

//Elementos del DOM a manupular
const searchFilter = document.querySelector('.search');
const priceFilter = document.querySelector('.price');
const sellerFilter = document.querySelector('.seller');
const submit = document.querySelector('.submit');
const wipeFilter = document.querySelector('.wipe-filter');
const productList = document.querySelector('.product-list');
const noProduct = document.querySelector('.no-products');

//eventos
submit.addEventListener('click', handleSubmmit);
wipeFilter.addEventListener('click', showProducts);
searchFilter.addEventListener('keydown', pressEnter);
priceFilter.addEventListener('keydown', pressEnter);
sellerFilter.addEventListener('change', handleSubmmit)


//función que llama a la función habndleSubmit en caso de aprentar "Enter" cuando el foco este en "precio" o "Nombre"
function pressEnter(e){
    if(e.key === "Enter") handleSubmmit();
}

//Función que se encara tanto de mostrar todos los productos por defecto como de borrar los filtros cuando se presiona el boton de "borrar filtros"
function showProducts(){
    searchFilter.value = "";
    priceFilter.value = "";
    sellerFilter.value = "all";

    productList.innerHTML = '';
    DataBase.forEach(element =>{
        productList.innerHTML += productTemplate(element);
    });

    if(productList.childNodes.length <= 0){
        noProduct.style.opacity = "1";
    }else{
        noProduct.style.opacity = "0"
    }
}

//Función que se encarga de recoger los inputs y filtrar los productos
function handleSubmmit() {
    productList.innerHTML = '';
    
    const name = searchFilter.value.toLowerCase();
    const price = priceFilter.value;
    const seller = sellerFilter.value;
    

    DataBase.forEach(element =>{

        let handleElementName = element.name.toLowerCase().replace(/ /g, "");
        let handleName = name.replace(/ /g, "");


        const checkName = name ? handleElementName.includes(handleName) : true;
        const checkPrice = price ? Number(element.price) <= Number(price) : true;
        const checkSeller = seller !== "all" ? element.seller === seller : true;

        if(checkName && checkPrice && checkSeller){
            productList.innerHTML += productTemplate(element);
        }
    });

    if(productList.childNodes.length <= 0){
        noProduct.style.opacity = "1";
    }else{
        noProduct.style.opacity = "0";
    }
}

//Llamada a la funcion showProducts para que se muestre la lista completa de productos al cargar la pagina
showProducts();
