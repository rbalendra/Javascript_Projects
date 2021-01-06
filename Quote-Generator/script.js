

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = []; //EMPTY ARRAY DECLARATION


// SHOW LOADING
function loading(){
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// HIDE LOADING
function complete(){
  quoteContainer.hidden = false;
  loader.hidden = true;
}


// Show new quote
function newQuote(){
  loading();
  // Pick a random quote from apiQuotes Array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]; //if using API
  // Check if author field is blank and replace it with 'unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  //Check Quote length to determine styling
  if (quote.text.length > 120){
    quoteText.classList.add('long-quote');
  }else {
    quoteText.classList.remove('long-quote');
  }
  // Set quote, HIDE LOADER
  quoteText.textContent = quote.text;
  complete();
}




// GET QUOTES FROM API
async function getQuotes(){
  loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch (apiUrl); 
    apiQuotes = await response.json();
    newQuote();
  } catch(error){
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote(){
  const twitterUrl = `http://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}


// // Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on LOAD 
getQuotes();

