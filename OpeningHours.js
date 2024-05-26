function displayOpeningHoursMessage() 
{
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    //Shop Opening and Closing Hours
    const openingHour = 8;
    const closingHour = 18;

    let openingHoursMessage;

    if (hour < openingHour) 
    {
        //Calculate Remaining time until opening time for the day
        const remainingMinutes = (openingHour - hour) * 60 - minutes;
        const remainingHours = Math.floor(remainingMinutes / 60);
        const remainingMinutesInHour = remainingMinutes % 60;
        openingHoursMessage = "We will open at " + openingHour + ":00 AM. Please visit us in " + remainingHours + " hours and " + remainingMinutesInHour + " minutes.";
    } 
    else if (hour < closingHour) 
    {
        //Calculate remaining time until closing time for the dat
        const remainingMinutes = (closingHour - hour) * 60 - minutes;
        const remainingHours = Math.floor(remainingMinutes / 60);
        const remainingMinutesInHour = remainingMinutes % 60;
        openingHoursMessage = "We are open until " + closingHour + ":00 PM today. You still have " + remainingHours + " hours and " + remainingMinutesInHour + " minutes to visit us. Alternatively, you may use this website to place your orders at anytime...";
    } 
    else 
    {
        openingHoursMessage = "We are closed for the day. Please visit us tomorrow at 8:00 AM.";
    }

    displayMessage(dayOfWeek, date, openingHoursMessage);

}

function displayMessage(dayOfWeek, date, openingHoursMessage) 
{
    const openingHoursMessageHtml = "<p>Today is " + dayOfWeek + ", " + date + ".</p>" +
        "<p id='greetingMessage'>" + openingHoursMessage + "</p>";
    const openingHoursDiv = document.getElementById("openingHoursMessage");
    openingHoursDiv.innerHTML = openingHoursMessageHtml;

    // Event listner to mouse over and mouseout
    const greetingMessage = document.getElementById("greetingMessage");
    greetingMessage.addEventListener("mouseover", function () {
        changeBackgroundColor('yellow');
    });
    greetingMessage.addEventListener("mouseout", function () {
        resetBackgroundColor();
    });
}
//Change Background color to yellow
function changeBackgroundColor(color) 
{
    const greetingMessage = document.getElementById("greetingMessage");
    greetingMessage.style.backgroundColor = color;
}
//Reset background color to white
function resetBackgroundColor() 
{
    const greetingMessage = document.getElementById("greetingMessage");
    greetingMessage.style.backgroundColor = "";
}


