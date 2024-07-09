const quoteConatainer = document.getElementById('quote-conatiner');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const XBtn = document.getElementById('x');
const newQuoteBtn = document.getElementById('new-quote');


let apipQuotes = [];



// Show New Quote 
function newQuote(){
    // pick a random quote from apiQuotes array 
    const quote = apiQuotes [Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank and replace it with 'unknown' 
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else{
        authorText.textContent = quote.author;
    }
    // Check quote lenght to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    // Set Quote , Hide Loader 
    quoteText.textContent = quote.text
}
// Get codes from API
async function getQuotes(){
    
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        
    }catch(error){
        // catch error 
        getQuotes();
    }
}
// Tweet Quote 
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
XBtn.addEventListener('click', tweetQuote);

// On Load 
getQuotes();