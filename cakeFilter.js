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
const birthdayCheckbox = document.getElementsByName("Birthday")[0];
const specialCheckbox = document.getElementsByName("Speciality")[0];
const loveCheckbox = document.getElementsByName("Romance")[0];
const anniversaryCheckbox = document.getElementsByName("Anniversary")[0];

//append title elements and containers to the main container
const productCards = document.getElementsByClassName("card");

//Create containers for each product's category and for the title
const birthdayContainer = document.createElement("div");
const birthdayTitle = document.createElement("h2");
birthdayTitle.textContent = "Birthday Cakes";

const specialContainer = document.createElement("div");
const specialTitle = document.createElement("h2");
specialTitle.textContent = "Speciality Cakes";

const loveContainer = document.createElement("div");
const loveTitle = document.createElement("h2");
loveTitle.textContent = "Love and Romance Cakes";

const anniversaryContainer = document.createElement("div");
const anniversaryTitle = document.createElement("h2");
anniversaryTitle.textContent = "Anniversary Cakes";

//Get reference to the main product container
const largeRightColumn = document.querySelector(".large-right");

//append title elements and containers to the main container
largeRightColumn.appendChild(birthdayTitle);
largeRightColumn.appendChild(birthdayContainer);
largeRightColumn.appendChild(specialTitle);
largeRightColumn.appendChild(specialContainer);
largeRightColumn.appendChild(loveTitle);
largeRightColumn.appendChild(loveContainer);
largeRightColumn.appendChild(anniversaryTitle);
largeRightColumn.appendChild(anniversaryContainer);

//Add eventlistners to the checkboxes
birthdayCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(birthdayContainer, birthdayTitle);
});
specialCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(specialContainer, specialTitle);
});
loveCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(loveContainer, loveTitle);
});
anniversaryCheckbox.addEventListener("change", function () 
{
    filterProducts();
    toggleCategoryTitle(anniversaryContainer, anniversaryTitle);
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
    const showBirthday = birthdayCheckbox.checked;
    const showSpecial = specialCheckbox.checked;
    const showLove = loveCheckbox.checked;
    const showAnniversary = anniversaryCheckbox.checked;

   //Create a array to store filtered cards of each product
    const birthdayCards = [];
    const specialCards = [];
    const loveCards = [];
    const anniversaryCards = [];

    // Loop through every product cards and filter them based on the selected checkboxes
    for (let i = 0; i < productCards.length; i++) 
    {
        const card = productCards[i];
        const isBirthday = card.classList.contains("birthday");
        const isSpecial = card.classList.contains("special");
        const isLove = card.classList.contains("love");
        const isAnniversary = card.classList.contains("anniversary");

        if (showBirthday && isBirthday) 
        {
            birthdayCards.push(card);
        }
        if (showSpecial && isSpecial) 
        {
            specialCards.push(card);
        }
        if (showLove && isLove) 
        {
            loveCards.push(card);
        }
        if (showAnniversary && isAnniversary) 
        {
            anniversaryCards.push(card);
        }
    }

    //Recorgnaize and show the filtered cards for each category
    reorganizeProducts(birthdayContainer, birthdayCards);
    reorganizeProducts(specialContainer, specialCards);
    reorganizeProducts(loveContainer, loveCards);
    reorganizeProducts(anniversaryContainer, anniversaryCards);

    //Sort the products by price within their corrosponding category
    sortProductsByPrice(birthdayContainer);
    sortProductsByPrice(specialContainer);
    sortProductsByPrice(loveContainer);
    sortProductsByPrice(anniversaryContainer);
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
toggleCategoryTitle(birthdayContainer, birthdayTitle);
toggleCategoryTitle(specialContainer, specialTitle);
toggleCategoryTitle(loveContainer, loveTitle);
toggleCategoryTitle(anniversaryContainer, anniversaryTitle);
