//Expand the Filter in Left side
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

//Get reference to the main product container
const anniversaryCheckbox = document.getElementsByName("Aniversary")[0];
const birthdayCheckbox = document.getElementsByName("Bithday")[0];
const congradulationsCheckbox = document.getElementsByName("Congradulations")[0];
const newBornCheckbox = document.getElementsByName("NewBorn")[0];

//append title elements and containers to the main container
const productCards = document.getElementsByClassName("card");

//Create containers for each product's category and for the title
const anniversaryContainer = document.createElement("div");
const anniversaryTitle = document.createElement("h2");
anniversaryTitle.textContent = "Anniversary Flowers";

const birthdayContainer = document.createElement("div");
const birthdayTitle = document.createElement("h2");
birthdayTitle.textContent = "Birthday Flowers";

const congradulationsContainer = document.createElement("div");
const congradulationsTitle = document.createElement("h2");
congradulationsTitle.textContent = "Congratulations Flowers";

const newBornContainer = document.createElement("div");
const newBornTitle = document.createElement("h2");
newBornTitle.textContent = "Newborn Flowers";

//Get reference to the main product container
const largeRightColumn = document.querySelector(".large-right");

//append title elements and containers to the main container
largeRightColumn.appendChild(anniversaryTitle);
largeRightColumn.appendChild(anniversaryContainer);
largeRightColumn.appendChild(birthdayTitle);
largeRightColumn.appendChild(birthdayContainer);
largeRightColumn.appendChild(congradulationsTitle);
largeRightColumn.appendChild(congradulationsContainer);
largeRightColumn.appendChild(newBornTitle);
largeRightColumn.appendChild(newBornContainer);

//Add eventlistners to the checkboxes
anniversaryCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(anniversaryContainer, anniversaryTitle);
});
birthdayCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(birthdayContainer, birthdayTitle);
});
congradulationsCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(congradulationsContainer, congradulationsTitle);
});
newBornCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(newBornContainer, newBornTitle);
});

//Sorting order initialize to Low - High
let currentSortOrder = "Low to High";

//Add event listners to the sorting radio buttons
const sortRadioButtons = document.getElementsByName("price");
for (let i = 0; i < sortRadioButtons.length; i++) {
    sortRadioButtons[i].addEventListener("change", function () 
    {
        currentSortOrder = sortRadioButtons[i].value;
        filterProducts();
    });
}

function filterProducts() 
{
    //Check which checkboxes are selected
    const showAnniversary = anniversaryCheckbox.checked;
    const showBirthday = birthdayCheckbox.checked;
    const showCongradulations = congradulationsCheckbox.checked;
    const showNewBorn = newBornCheckbox.checked;

    //Create a array to store filtered cards of each product
    const anniversaryCards = [];
    const birthdayCards = [];
    const congradulationsCards = [];
    const newBornCards = [];

    // Loop through every product cards and filter them based on the selected checkboxes
    for (let i = 0; i < productCards.length; i++) 
    {
        const card = productCards[i];
        const isAnniversary = card.classList.contains("anniversary");
        const isBirthday = card.classList.contains("birthday");
        const isCongradulations = card.classList.contains("congradulations");
        const isNewBorn = card.classList.contains("newborn");

        if (showAnniversary && isAnniversary) 
        {
            anniversaryCards.push(card);
        }
        if (showBirthday && isBirthday) 
        {
            birthdayCards.push(card);
        }
        if (showCongradulations && isCongradulations) 
        {
            congradulationsCards.push(card);
        }
        if (showNewBorn && isNewBorn) 
        {
            newBornCards.push(card);
        }
    }

    //Recorgnaize and show the filtered cards for each category
    reorganizeProducts(anniversaryContainer, anniversaryCards);
    reorganizeProducts(birthdayContainer, birthdayCards);
    reorganizeProducts(congradulationsContainer, congradulationsCards);
    reorganizeProducts(newBornContainer, newBornCards);

    //Sort the products by price within their corrosponding category
    sortProductsByPrice(anniversaryContainer);
    sortProductsByPrice(birthdayContainer);
    sortProductsByPrice(congradulationsContainer);
    sortProductsByPrice(newBornContainer);
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
    for (let i = 0; i < cards.length; i++) 
    {
        row.appendChild(cards[i]);
        if ((i + 1) % 5 === 0 || i === cards.length - 1) 
        {
            container.appendChild(row);
            row = document.createElement("div");
            row.className = "image-row new";
        }
    }
}

function reorganizeProducts(container, filteredCards) {
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

function toggleCategoryTitle(container, title) 
{
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
toggleCategoryTitle(anniversaryContainer, anniversaryTitle);
toggleCategoryTitle(birthdayContainer, birthdayTitle);
toggleCategoryTitle(congradulationsContainer, congradulationsTitle);
toggleCategoryTitle(newBornContainer, newBornTitle);
