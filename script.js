/* ============================================================
   COUNTRY EXPLORER — script.js
   ------------------------------------------------------------
   THE PATTERN (this is the whole lab):
     1. Get user input
     2. Fetch data from an API
     3. Convert the response to JSON
     4. Pull the piece of data you need off the response
     5. Drop it into the page with .textContent / .src

   Steps 1-6 below are built together as an instructor demo.
   Steps 7-10 are your team's mission — they reuse the exact
   same pattern shown in Step 6, just with different data.
   ============================================================ */

// --- Element references (grab everything once, up front) -----
const searchBtn     = document.getElementById('searchBtn');
const countryInput  = document.getElementById('countryInput');
const loadingEl      = document.getElementById('loading');
const errorEl        = document.getElementById('errorMessage');
const resultCard     = document.getElementById('resultCard');

const flagImg        = document.getElementById('flagImg');
const countryNameEl  = document.getElementById('countryName');
const capitalEl      = document.getElementById('capitalValue');
const regionEl       = document.getElementById('regionValue');
const populationEl   = document.getElementById('populationValue');
const languagesEl    = document.getElementById('languagesValue');


/* ------------------------------------------------------------
   STEP 1: Connect the button's click event.
   ------------------------------------------------------------ */
searchBtn.addEventListener('click', fetchCountry);

// Bonus UX: let people press Enter instead of clicking.
countryInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') fetchCountry();
});


/* ------------------------------------------------------------
   STEP 2: Create fetchCountry()
   ------------------------------------------------------------ */
async function fetchCountry() {

  const countryName = countryInput.value.trim();
  if (!countryName) return; // nothing typed, nothing to do

  /* ------------------------------------------------------------
     STEP 3: Show "Loading..."
     ------------------------------------------------------------ */
  showLoading();

  try {

    /* ------------------------------------------------------------
       STEP 4: Build the fetch request
       ------------------------------------------------------------ */
    const url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Country not found');
    }

    /* ------------------------------------------------------------
       STEP 5: Convert response -> JSON
       ------------------------------------------------------------ */
    const data = await response.json();
    const country = data[0]; // this API always returns an array

    /* ------------------------------------------------------------
       STEP 6: Display ONE property. Start simple.
       Display only: Country Name.

       Notice the pattern:
         1. read a value off `country`
         2. assign it to an element's .textContent
       Every step below is this same pattern, just a
       different property and a different element.
       ------------------------------------------------------------ */
    countryNameEl.textContent = country.name.common;


    /* ============================================================
       TEAM BUILD STARTS HERE
       The instructor demo stops at Step 6. Steps 7-10 are your
       team's mission. Use the exact pattern from Step 6 above.
       ============================================================ */

    /* ------------------------------------------------------------
       STEP 7: Display the Flag
       ------------------------------------------------------------
       TODO:
       - The image URL lives at:  country.flags.png
       - Set flagImg.src to that URL
       - Set flagImg.alt to something descriptive, e.g.
         `Flag of ${country.name.common}`

       flagImg.src = ???
       flagImg.alt = ???
       ------------------------------------------------------------ */


    /* ------------------------------------------------------------
       STEP 8: Display Capital, Region, Population
       ------------------------------------------------------------
       TODO:
       - Capital:    country.capital[0]     <-- careful, it's an ARRAY
       - Region:     country.region
       - Population: country.population      <-- a raw number

       Hint: number.toLocaleString() formats 129000000 as
       "129,000,000" — much easier to read.

       capitalEl.textContent    = ???
       regionEl.textContent     = ???
       populationEl.textContent = ???
       ------------------------------------------------------------ */


    /* ------------------------------------------------------------
       STEP 9: Display Languages
       ------------------------------------------------------------
       TODO:
       - country.languages is an OBJECT, not an array, e.g.:
             { fra: "French", eng: "English" }
       - Object.values(country.languages) turns that into an
         array of names: ["French", "English"]
       - .join(", ") turns that array into one readable string:
             "French, English"

       languagesEl.textContent = ???
       ------------------------------------------------------------ */


    /* ------------------------------------------------------------
       STEP 10a: Improve the experience — clean up on SUCCESS
       ------------------------------------------------------------
       TODO:
       - Hide the loading state:      hideLoading();
       - Reveal the result card:      resultCard.classList.remove('hidden');
       - Make sure old errors are gone: errorEl.classList.add('hidden');
       ------------------------------------------------------------ */


  } catch (error) {

    /* ------------------------------------------------------------
       STEP 10b: Improve the experience — error handling
       ------------------------------------------------------------
       TODO:
       - Hide the loading state
       - Hide the result card (a previous search may have shown one)
       - Show a friendly message in errorEl, e.g.:
           errorEl.textContent =
             `We couldn't find "${countryName}". Check the spelling and try again.`;
           errorEl.classList.remove('hidden');
       ------------------------------------------------------------ */
    console.error(error);

  }
}


/* ------------------------------------------------------------
   Helper functions — already built for you.
   ------------------------------------------------------------ */
function showLoading() {
  loadingEl.classList.remove('hidden');
  errorEl.classList.add('hidden');
  resultCard.classList.add('hidden');
}

function hideLoading() {
  loadingEl.classList.add('hidden');
}
