//Filter on Left side expand
var coll = document.getElementsByClassName("collapsible");
for (var i = 0; i < coll.length; i++) 
{
    coll[i].addEventListener("click", function () 
    {
        toggleCollapsible(this);
    });
}

function toggleCollapsible(element) 
{
    element.classList.toggle("active");
    var content = element.nextElementSibling;
    if (content.style.maxHeight) 
    {
        content.style.maxHeight = null;
    } else 
    {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

//Get reference to checkboxes in filter section
const vegeCheckbox = document.getElementsByName("Vegetables")[0];
const fruitCheckbox = document.getElementsByName("Fruits")[0];
const groceryCheckbox = document.getElementsByName("Grocery")[0];

//Get reference to all products from the card
const productCards = document.getElementsByClassName("card");

//Create containers for product categories and for their title
const vegetableContainer = document.createElement("div");
const vegetableTitle = document.createElement("h2");
vegetableTitle.textContent = "Vegetable";

const fruitContainer = document.createElement("div");
const fruitTitle = document.createElement("h2");
fruitTitle.textContent = "Fruits";

const groceryContainer = document.createElement("div");
const groceryTitle = document.createElement("h2");
groceryTitle.textContent = "Grocery Items";

//Get reference to the main product container
const largeRightColumn = document.querySelector(".large-right");

//append title elements and containers to the main container
largeRightColumn.appendChild(vegetableTitle);
largeRightColumn.appendChild(vegetableContainer);
largeRightColumn.appendChild(fruitTitle);
largeRightColumn.appendChild(fruitContainer);
largeRightColumn.appendChild(groceryTitle);
largeRightColumn.appendChild(groceryContainer);

//Add eventlistners to the checkboxes
vegeCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(vegetableContainer, vegetableTitle);
});
fruitCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(fruitContainer, fruitTitle);
});
groceryCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(groceryContainer, groceryTitle);
});

//Sorting order initialize to Low - High
let currentSortOrder = "Low to High";

//Add event listners to the sorting radio buttons
const sortRadioButtons = document.getElementsByName("price");
for (let i = 0; i < sortRadioButtons.length; i++) 
{
    sortRadioButtons[i].addEventListener("change", function () 
    {
        currentSortOrder = sortRadioButtons[i].value;
        filterProducts();
    });
}

function filterProducts() 
{
    //Check which checkboxes are selected
    const showVegetables = vegeCheckbox.checked;
    const showFruits = fruitCheckbox.checked;
    const showGroceryItems = groceryCheckbox.checked;

    //Create a array to store filtered cards of each product
    const VegetablesCards = [];
    const FruitsCards = [];
    const GroceryItemsCards = [];

    // Loop through every product cards and filter them based on the selected checkboxes
    for (let i = 0; i < productCards.length; i++) 
    {
        const card = productCards[i];
        const isVegetable = card.classList.contains("vegetable");
        const isFruits = card.classList.contains("fruit");
        const isGrocery = card.classList.contains("grocery");

        if (showVegetables && isVegetable) 
        {
            VegetablesCards.push(card);
        }
        if (showFruits && isFruits) 
        {
            FruitsCards.push(card);
        }
        if (showGroceryItems && isGrocery) 
        {
            GroceryItemsCards.push(card);
        }
    }

    //Recorgnaize and show the filtered cards for each category
    reorganizeProducts(vegetableContainer, VegetablesCards);
    reorganizeProducts(fruitContainer, FruitsCards);
    reorganizeProducts(groceryContainer, GroceryItemsCards);

    //Sort the products by price within their corrosponding category
    sortProductsByPrice(vegetableContainer);
    sortProductsByPrice(fruitContainer);
    sortProductsByPrice(groceryContainer);
}

// Function to sort product cards by price within a container
function sortProductsByPrice(container) 
{
    // Get the cards in the container
    const cards = Array.from(container.querySelectorAll(".card"));

    // Sort the cards by price
    cards.sort(function (a, b) 
    {
        const priceA = parseFloat(a.querySelector(".price").textContent.replace("$", ""));
        const priceB = parseFloat(b.querySelector(".price").textContent.replace("$", ""));
        
        if (currentSortOrder === "Low to High") 
        {
            return priceA - priceB;
        } else 
        {
            return priceB - priceA;
        }
    });

     //Clear the container
    container.innerHTML = '';

    // Recorgnaize the product cards and add it to the rows (5 per each row)
    let row = document.createElement("div");
    row.className = "image-row new";
    cards.forEach(function (card, index) 
    {
        row.appendChild(card);
        if ((index + 1) % 5 === 0 || index === cards.length - 1) 
        {
            container.appendChild(row);
            row = document.createElement("div");
            row.className = "image-row new";
        }
    });
}

function reorganizeProducts(container, filteredCards) 
{
    //Clear the container
    container.innerHTML = '';

    // Recorgnaize the product cards and add it to the rows (5 per each row)
    let row = document.createElement("div");
    row.className = "image-row new";
    for (let i = 0; i < filteredCards.length; i++) 
    {
        row.appendChild(filteredCards[i]);
        if ((i + 1) % 5 === 0 || i === filteredCards.length - 1) 
        {
            container.appendChild(row);
            row = document.createElement("div");
            row.className = "image-row new";
        }
    }
}

function toggleCategoryTitle(container, title) {
    //check whether there are any products in the relevant category container
    const productsInCategory = container.querySelectorAll(".card");

    // If there are products relevant to the category, show the title, otherwise, hide it
    if (productsInCategory.length > 0) 
    {
        title.style.display = "block";
    } else 
    {
        title.style.display = "none";
    }
}

//Initial filtering when loading the page
filterProducts();
toggleCategoryTitle(vegetableContainer, vegetableTitle);
toggleCategoryTitle(fruitContainer, fruitTitle);
toggleCategoryTitle(groceryContainer, groceryTitle);
