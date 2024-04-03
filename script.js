// Base URL for the REST API
const baseURL = "https://restcountries.com/v3.1/name/";

// DOM Selection: Destructuring assignment to extract elements from the DOM
const {
  button, // Button element
  searchInput, // Input field for country search
  flag, // Image element for displaying flag
  country, // Span element for displaying country name
  officialName, // Span element for displaying official name of country
  region, // Span element for displaying region
  population, // Span element for displaying population
  area, // Span element for displaying area
} = document.querySelector(
  // CSS selector for selecting elements
  ".search-bar-input, .flag, .country h2 span, .official-name h2 span, .region h2 span, .population h2 span, .area h2 span"
);

// Function to format numbers with commas for thousands separation
const formatNumber = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Function to fetch and display country information
const getCountryInformation = async (countryName) => {
  try {
    // Fetch data from the API using the provided country name
    const res = await fetch(`${baseURL}${countryName}`);
    // Check if the response is successful (status code 200)
    if (!res.ok)
      // If response is not successful, throw an error
      throw new Error(
        "Failed to Search. Enter correct name of country or in correct form."
      );
    // Extract necessary information from the response JSON data
    const {
      flags,
      name,
      region: countryRegion,
      population: countryPopulation,
      area: countryArea,
    } = (await res.json())[0];
    // Display flag image and set its alt attribute
    flag.src = flags.png;
    flag.alt = flags.alt;
    // Display country name and official name
    country.innerText = name.common;
    officialName.innerText = name.official;
    // Display region, population, and area with formatted numbers
    region.innerText = countryRegion;
    population.innerText = formatNumber(countryPopulation);
    area.innerText = formatNumber(countryArea);
  } catch (error) {
    // Catch any errors that occur during the fetch operation
    alert(error.message); // Show error message in an alert dialog
  }
};

// Event listener for button click event
button.addEventListener("click", () =>
  // Call getCountryInformation function with the value from search input
  getCountryInformation(searchInput.value)
);
