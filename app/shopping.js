const itemInput = document.querySelector('.item-input');
const quantityInput = document.querySelector('.quantity-input');
const addBtn = document.querySelector('.add-btn');
const ul = document.querySelector('.item-list');
const ulChecked = document.querySelector('.checked');
const clearBtn = document.querySelector('.clear');
const errorMessage = document.querySelector('.empty-field');

// Event Listeners
addBtn.addEventListener('click', addItems);
ul.addEventListener('click', deleteItem);
ul.addEventListener('click', checked);
ulChecked.addEventListener('click', deleteItemChecked);
ulChecked.addEventListener('click', unchecked);
clearBtn.addEventListener('click', clearAll);


function checked(e) {
    if (e.target.classList.contains('fa-check')) {
        e.target.parentElement.parentElement.firstElementChild.style.backgroundColor = 'greenyellow';
        const cI = e.target.parentElement.parentElement.firstElementChild.textContent;
        const cQ = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
        deleteFromLocalStorage(cI, cQ)
        addChecked(cI, cQ);
        e.target.parentElement.parentElement.remove();
        printItemsOnScreen();
    }
}
function unchecked(e) {
    if (e.target.classList.contains('fa-backward')) {
        const item = e.target.parentElement.parentElement.firstElementChild.textContent;
        const qty = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
        addItemsUnChecked(item, qty);
        deleteFromLocalStorageChecked(item, qty);
        e.target.parentElement.parentElement.remove();
        printItemsOnScreen();
    }
}

function addItems() {
    if (itemInput.value !== '') {
        const item = itemInput.value;
        const qty = quantityInput.value;

        const itemObject = new Item(item, qty)

        addToLocalStorage(itemObject)
        printItemsOnScreen();
        itemInput.value = '';
        quantityInput.value = '';
    } else {
        itemInput.classList.add('empty-input');
        errorMessage.classList.add('error');
        setTimeout(() => {
            itemInput.classList.remove('empty-input');
            errorMessage.classList.remove('error');
        }, 2000);
    }

}
function addChecked(item, qty) {
    const itemObject = new Item(item, qty);
    addToLocalStorageChecked(itemObject);
    printItemsOnScreen();
}
function addItemsUnChecked(item, qty) {
    const itemObject = new Item(item, qty)
    addToLocalStorage(itemObject)
    printItemsOnScreen();
}

function deleteItem(e) {
    if (e.target.classList.contains('fa-times-circle')) {
        if (confirm('Delete Item ?')) {
            const itemName = e.target.parentElement.parentElement.firstElementChild.textContent;
            const itemQty = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
            e.target.parentElement.parentElement.remove();
            deleteFromLocalStorage(itemName, itemQty)
            printItemsOnScreen();
        }
    }
    e.preventDefault();
}
function deleteItemChecked(e) {
    if (e.target.classList.contains('fa-times-circle')) {
        const itemName = e.target.parentElement.parentElement.firstElementChild.textContent;
        const itemQty = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
        e.target.parentElement.parentElement.remove();
        deleteFromLocalStorageChecked(itemName, itemQty)
        printItemsOnScreen();
        console.log(e.target);
    }
    e.preventDefault();
}

function addToLocalStorage(item) {
    let items;
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'))
    }

    items.push(item);
    localStorage.setItem('items', JSON.stringify(items))
};
function addToLocalStorageChecked(item) {
    let items;
    if (localStorage.getItem('itemsChecked') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('itemsChecked'))
    }

    items.push(item);
    localStorage.setItem('itemsChecked', JSON.stringify(items))
};

function deleteFromLocalStorage(currItem, qty,) {
    const items = JSON.parse(localStorage.getItem('items'))
    items.forEach((item, index) => {
        if (item.item === currItem && item.qty === qty) {
            items.splice(index, 1)
        }
    })
    localStorage.setItem('items', JSON.stringify(items))
}
function deleteFromLocalStorageChecked(currItem, qty,) {
    const items = JSON.parse(localStorage.getItem('itemsChecked'))
    items.forEach((item, index) => {
        if (item.item === currItem && item.qty === qty) {
            items.splice(index, 1)
        }
    })
    localStorage.setItem('itemsChecked', JSON.stringify(items))
}

function clearAll() {
    if (confirm('Delete All ?')) {
        const empty = [];
        localStorage.setItem('items', JSON.stringify(empty));
        localStorage.setItem('itemsChecked', JSON.stringify(empty));
        ul.innerHTML = '';
        ulChecked.innerHTML = '';
    }
}

function Item(item, qty) {
    this.item = item;
    this.qty = qty;
}



// addToLocalStorage(eggs);
// addToLocalStorage(milk);

// const items = localStorage.getItem('items');
// console.log(items);

// localStorage.clear();

function printItemsOnScreen() {
    let items;
    let itemsChecked;
    if (localStorage.getItem('items') !== null) {
        items = JSON.parse(localStorage.getItem('items'));
        let html = '';
        items.forEach(item => {
            html += `
            <li class="item">
                <h3>${item.item}</h3>
                <p>${item.qty}</p>
                <div class="icons">
                    <i class="fas fa-check"></i>
                    <i class="fas fa-times-circle"></i>
                </div>
            </li>
            `
            ul.innerHTML = html;

        });
    }



    if (localStorage.getItem('itemsChecked') !== null) {
        itemsChecked = JSON.parse(localStorage.getItem('itemsChecked'));
        let htmlChecked = '';
        itemsChecked.forEach(item => {
            htmlChecked += `
        <li class="item">
            <h3>${item.item}</h3>
            <p>${item.qty}</p>
            <div class="icons">
                <i class="fas fa-backward"></i>
                <i class="fas fa-times-circle"></i>
            </div>
        </li>
        `
        });
        ulChecked.innerHTML = htmlChecked;
    }
}
// function printItemsOnScreenChecked() {
//     let items;
//     if (localStorage.getItem('items') !== null) {
//         items = JSON.parse(localStorage.getItem('items'));
//     }

//     let html = '';
//     items.forEach(item => {
//         html += `
//         <li class="item">
//             <h3>${item.item}</h3>
//             <p>${item.qty}</p>
//             <div class="icons">
//                 <i class="fas fa-check"></i>
//                 <i class="fas fa-times-circle"></i>
//             </div>
//         </li>
//         `
//         ul.innerHTML = html;

//     })
// }

printItemsOnScreen();


