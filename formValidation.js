function validateForm()
{
    // Reset error messages
    document.getElementById("feedbackTypeError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("contactNumberError").textContent = "";
    document.getElementById("feedbackError").textContent = "";
    document.getElementById("ratingError").textContent = "";

    // Get form input values
    var feedbackType = document.getElementById("feedbackType").value;
    var email = document.getElementById("email").value;
    var contactNumber = document.getElementById("contactNumber").value;
    var feedback = document.getElementById("feedback").value;
    var rating = document.getElementById("rating").value;

    

    // Flag to track if there are any validation errors
    var isValid = true;

    // Feedback Type Validation
    if (feedbackType === "") {
        document.getElementById("feedbackTypeError").textContent = "Feedback Type is Required";
        document.getElementById("feedbackTypeError").className = "error-message";
        isValid = false;
    }

   // Email Validation
   if (!isValidEmail(email))
   {
        if (email === "") 
        {
            document.getElementById("emailError").textContent = "Email Address is Required.";
        } 
        else 
        {
            document.getElementById("emailError").textContent = "Enter a valid Email Address (Eg:- name@example.com).";
        }
        isValid = false;
    }

    // Contact Number Validation
    if (!/^[0-9]{10}$/.test(contactNumber)) 
    {
        if (/[^0-9]/.test(contactNumber)) 
        {
             var nonDigit = contactNumber.match(/[^\d]/)[0];
             document.getElementById("contactNumberError").innerHTML = "Contains Character " + nonDigit + ". Please Enter Numbers Only!";
        }
        else if (contactNumber === "") 
        {
            document.getElementById("contactNumberError").textContent = "Contact number is Required.";
        } 
        else 
        {
             document.getElementById("contactNumberError").innerHTML = "Phone number must be exactly 10 digits";
        }
         document.getElementById("contactNumberError").className = "error-message";
         isValid = false;
    } 

    // Feedback Validation
    if (feedback === "") {
        document.getElementById("feedbackError").textContent = "Feedback is required.";
        isValid = false;
    }

     // Rating Validation
     if (rating === "") {
        document.getElementById("ratingError").textContent = "Rating is required.";
        isValid = false;
    }

    // Return true if the form is valid, otherwise return false
    return isValid;

}

function isValidEmail(email) 
{
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearErrors() 
{
    //Clear error messages
    document.getElementById("feedbackTypeError").innerHTML = "";
    document.getElementById("feedbackTypeError").className = "error-message";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("emailError").className = "error-message";
    document.getElementById("contactNumberError").innerHTML = "";
    document.getElementById("contactNumberError").className = "error-message";
    document.getElementById("feedbackError").innerHTML = "";
    document.getElementById("feedbackError").className = "error-message";
    document.getElementById("ratingError").innerHTML = "";
    document.getElementById("ratingError").className = "error-message";
}


function changeBackgroundColor(color)
{
    const welcomePara=document.getElementById("ThankingMessage");
    welcomePara.style.backgroundColor=color;
}
function resetBackgroundColor()
{
    const welcomePara=document.getElementById("ThankingMessage");
    welcomePara.style.backgroundColor="";
}

    
