const rootEl = document.getElementById('root'); 

rootEl.innerHTML = `
<form data-id="purchase-add-form" class="purchase-add-form">
    <label for="purchase-input-amount" class="label">Сумма:</label>
    <input id="purchase-input-amount" data-id="purchase-input-amount" class="input">
    <label for="purchase-input-category" class="label">Категория:</label>
    <input id purchase-input-category data-id="purchase-input-category" class="input">
    <button data-action="purchase-add" class="button">Добавить</button>
</form>
<ul data-id="purchases-list" class="purchases-list"></ul>
<div data-id="purchases-total" class="purchases-total">Общая сумма: 0</div>
`;

const purchaseAddFormEl = rootEl.querySelector('[data-id=purchase-add-form]'); 

const purchaseInputAmountEl = purchaseAddFormEl.querySelector('[data-id=purchase-input-amount]');
const purchaseInputCategoryEl = purchaseAddFormEl.querySelector('[data-id=purchase-input-category]');
const purchaseAddButtonEl = purchaseAddFormEl.querySelector('[data-action=purchase-add]');

const purchasesListEl = rootEl.querySelector('[data-id=purchases-list]');

let purchasesTotal = 0;

purchaseAddButtonEl.onclick = evt => { 
    
    evt.preventDefault(); 

    const value = purchaseInputAmountEl.value;
    purchasesTotal += parseInt(value, 10); 

    const category = purchaseInputCategoryEl.value;

    purchasesTotalEl.textContent = `Сумма: ${purchasesTotal}`;

    const purchaseEl = document.createElement('li') 
    purchaseEl.innerHTML = `
    Покупка на сумму ${value}, в категории ${category}
    <div class="blockButton">
        <button data-action="up" class="up">↑</button>
        <button data-action="down" class="down">↓</button>
        <button data-action="remove" class="remove">x</button> 
    </div>
    `;

    const purchaseRemoveButtonE1 = purchaseEl.querySelector('[data-action=remove]');
    purchaseRemoveButtonE1.onclick = () => {
        purchasesListEl.removeChild(purchaseEl);
        purchasesTotal -= value;
        purchasesTotalEl.textContent = `Сумма: ${purchasesTotal}`;
    }

    const purchaseUpButtonEl = purchaseEl.querySelector('[data-action=up]');
    purchaseUpButtonEl.onclick = () => 
    {
        if (purchaseEl === purchasesListEl.firstElementChild){ 
            purchasesListEl.insertBefore(purchaseEl, null); 
        } else {
            purchasesListEl.insertBefore(purchaseEl, purchaseEl.previousElementSibling); 
        }
    }

    const purchaseDownButtonEl = purchaseEl.querySelector('[data-action=down]');
    purchaseDownButtonEl.onclick = () => 
    {
        if (purchaseEl === purchasesListEl.lastElementChild) {
            purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild)
        } else {
            purchasesListEl.insertBefore(purchaseEl.nextElementSibling, purchaseEl);
        }
    }


    purchasesListEl.insertBefore(purchaseEl, purchasesListEl.firstElementChild);

    purchaseInputAmountEl.value = '';
    purchaseInputCategoryEl.value = '';

    purchaseInputAmountEl.focus();
};

const purchasesTotalEl = rootEl.querySelector('[data-id=purchases-total]');