const itemInput = document.querySelector('.item-input');
const quantityInput = document.querySelector('.quantity-input');
const addBtn = document.querySelector('.add-btn');
const ul = document.querySelector('.item-list');
const ulChecked = document.querySelector('.checked');
const clearBtn = document.querySelector('.clear');
const errorMessage = document.querySelector('.empty-field');

// Event Listeners
addBtn.addEventListener('click', addItems);
ul.addEventListener('click', e => {
    if (e.target.className.includes('fa-times-circle')) {
        const id = e.target.parentElement.parentElement.getAttribute('data-id');
        if (confirm('Are You Sure ?')) {
            db.collection('items').doc(id).delete();
            setScrollPosition();
            ul.innerHTML = '';
            ulChecked.innerHTML = '';
            getData();
            setTimeout(() => {
                window.scrollTo(0, getScrollPosition())
            }, 50)
        }
    }
});
ul.addEventListener('click', e => {
    if (e.target.className.includes('fa-check')) {
        checkItems(e.target.parentElement.parentElement.getAttribute('data-id'));
        setScrollPosition();
        ul.innerHTML = '';
        ulChecked.innerHTML = '';
        getData();
        setTimeout(() => {
            window.scrollTo(0, getScrollPosition())
        }, 50)

    }
})
ulChecked.addEventListener('click', e => {
    if (e.target.className.includes('fa-backward')) {
        unCheckItems(e.target.parentElement.parentElement.getAttribute('data-id'));
        setScrollPosition();
        ul.innerHTML = '';
        ulChecked.innerHTML = '';
        getData();
        setTimeout(() => {
            window.scrollTo(0, getScrollPosition())
        }, 50)
    }
});
ulChecked.addEventListener('click', e => {
    if (e.target.className.includes('fa-times-circle')) {
        const id = e.target.parentElement.parentElement.getAttribute('data-id');
        if (confirm('Are You Sure ?')) {
            db.collection('items').doc(id).delete();
            setScrollPosition();
            ul.innerHTML = '';
            ulChecked.innerHTML = '';
            getData();
            setTimeout(() => {
                window.scrollTo(0, getScrollPosition())
            }, 50)
        }
    }
});
clearBtn.addEventListener('click', () => {
    if (confirm('Are You sure You want to delete all Items ?')) {
        document.querySelectorAll('li').forEach(doc => {
            const id = doc.getAttribute('data-id');
            db.collection('items').doc(id).delete();
            ul.innerHTML = '';
            ulChecked.innerHTML = '';
        })
    }
});

function getData(callback) {
    db.collection('items').onSnapshot(snapshot => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if (change.type === 'added') {
                printItemsOnScreen(change.doc.data(), change.doc.id);
            }
        })
    })
}

function addItems() {
    const itemName = itemInput.value.trim(),
        quantity = quantityInput.value.trim();

    if (itemName) {
        const item = { item: itemName, qty: quantity, checked: false };
        db.collection('items').add(item);
        console.log(item);
        itemInput.value = '';
        quantityInput.value = '';
    } else {
        alert('You must add an Item');
    }
}

function checkItems(id) {
    db.collection('items').doc(id).update({ checked: true })
}
function unCheckItems(id) {
    db.collection('items').doc(id).update({ checked: false })
}

function printItemsOnScreen(item, id) {
    if (item.checked) {
        let html = `
        <li class="item" data-id="${id}">
            <h3>${item.item}</h3>
            <p>${item.qty}</p>
            <div class="icons">
                <i class="fas fa-backward"></i>
                <i class="fas fa-times-circle"></i>
            </div>
        </li>
        `;
        ulChecked.innerHTML += html;
    } else {
        let html = `
        <li class="item" data-id="${id}">
            <h3>${item.item}</h3>
            <p>${item.qty}</p>
            <div class="icons">
                <i class="fas fa-check"></i>
                <i class="fas fa-times-circle"></i>
            </div>
        </li>
        `;
        ul.innerHTML += html;
    }
}

getData();

function setScrollPosition() {
    localStorage.setItem('position', window.scrollY)
}
function getScrollPosition() {
    return localStorage.getItem('position');

}
