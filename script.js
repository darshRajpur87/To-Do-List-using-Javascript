let liststore = document.querySelector(".List-item");
let iteminput = document.getElementById("Inputuser");

// Fetch stored to-do items from localStorage
const GetItemData = () => {
    return JSON.parse(localStorage.getItem("TODO list")) || [];
};
let Localdata = GetItemData();

// Function to add a new item
const additem = (e) => {
    e.preventDefault();
    const item = iteminput.value.trim();

    if (!item) {
        alert("Please enter a valid to-do item!");
        return;
    }

    // Add to array and ensure uniqueness
    Localdata.push(item);
    Localdata = [...new Set(Localdata)];

    // Save to localStorage
    localStorage.setItem("TODO list", JSON.stringify(Localdata));

    // Add the item to the DOM
    renderItem(item);

    // Clear the input field
    iteminput.value = "";
};

// Function to render a single item
const renderItem = (item) => {
    const DivCreate = document.createElement("div");
    DivCreate.classList.add("Main-todo-div");
    DivCreate.innerHTML = `
        <li>${item}</li> 
        <button class="itemdelete">Delete</button>
    `;
    liststore.append(DivCreate);

    // Add delete functionality
    DivCreate.querySelector(".itemdelete").addEventListener("click", () => {
        deleteItem(item, DivCreate);
    });
};

// Function to delete an item
const deleteItem = (item, element) => {
    // Remove from Localdata
    Localdata = Localdata.filter((todo) => todo !== item);

    // Update localStorage
    localStorage.setItem("TODO list", JSON.stringify(Localdata));

    // Remove from DOM
    element.remove();
};

// Function to render all items on page load
const showTodo = () => {
    liststore.innerHTML = ""; // Clear the existing list
    Localdata.forEach((item) => {
        renderItem(item);
    });
};

// Add event listener to the add button
document.querySelector(".btn").addEventListener("click", (e) => {
    additem(e);
});

// Render stored to-do items on page load
showTodo();
