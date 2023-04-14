import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shoplist-a7620-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const listInDB = ref(database, "shopList")

// console.log(app)

const inputel = document.getElementById("input-field")
const btn = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

btn.addEventListener("click", function() {
    let ele = inputel.value;
    if(ele.length) push(listInDB, ele)    

    clearInputFieldEl()

    // appendItemToShoppingListEl(ele)
})

onValue(listInDB, function(snapshot) {
    if(snapshot.exists()) {
        let listArray = Object.entries(snapshot.val())
        clearShoppingListEl()
    
        for(let item in listArray) {
            appendItemToShoppingListEl(listArray[item])
        }
    }
    else {
        shoppingListEl.innerHTML = "No items.... yet"
    }
})



function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputel.value = ""
}

function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${ele}</li>`
    let newEl = document.createElement("li")

    let currentId = item[0]
    let currentItem = item[1]
    newEl.textContent = currentItem
    
    newEl.addEventListener('click', function() {
        let exactLoactioninDB = ref(database, `shopList/${currentId}`)
        console.log(currentId)
        remove(exactLoactioninDB)
    })

    shoppingListEl.append(newEl)
}