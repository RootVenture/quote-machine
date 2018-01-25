const quoteBtn = document.querySelector('.btn');
const twitterBtn = document.querySelector('.twitter__btn');
const author = document.getElementById('author');
const quote = document.getElementById('quote');
let quoteData;
let textToTweet;

// create our random background color:
function randomColor() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  const bgColor = `rgb(${x}, ${y}, ${z})`;

  document.body.style.background = bgColor;
}

// pull quote from API
function getQuotePromise() {
  fetch('https://talaikis.com/api/quotes/random/', {
    method: 'get',
  })
    .then(data => data.json())
    .then(data => {
      quoteData = data;
    })
    .catch(err => {
      console.error(err);
    });
}

// set our HTML
function setQuote(data) {
  author.textContent = data.author;
  quote.textContent = data.quote;
}

// twitter post event listener:
twitterBtn.addEventListener('click', () => {
  textToTweet = `"${quote.textContent.length > 120 ? quote.textContent.trim(120) : quote.textContent}" - ${
    author.textContent
  }`;
  const twtURI = encodeURIComponent(textToTweet);
  const tweetLink = `http://twitter.com/home?status=${twtURI}`;
  window.open(tweetLink, '_blank');
});

// random quote generator event listener:
quoteBtn.addEventListener('click', async () => {
  await getQuotePromise();
  setQuote(quoteData);
  randomColor();
});

// Vanilla JS equivalent of document.ready
document.addEventListener('DOMContentLoaded', async () => {
  await getQuotePromise();
  setQuote(quoteData);
  randomColor();
});
