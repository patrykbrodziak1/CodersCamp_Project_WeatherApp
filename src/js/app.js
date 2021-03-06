import WeatherAPI from './weatherApi';
import AppLocalStorage from './appLocalStorage';
import DomManipulation from './DomManipulation';
import {
  handleInput,
  debounce,
  INPUT_STATES,
  inputStatus,
  updateSearchFormDisplay,
  clearInputBtn,
  resetForms,
  resetInputStatus,
} from './utils';
import { navigateTo, render } from './router';

const weather = new WeatherAPI();

const homeSearchBar = document.querySelector('.home-search-bar');
const dailySearchBar = document.querySelector('.daily-search-bar');

const homeSearchInput = new DomManipulation('home-input');
const dailySearchInput = new DomManipulation('daily-input');

const clearBtns = document.querySelectorAll('.fa-times');
const reloadBtns = document.querySelectorAll('.fa-redo');

const searchView = new DomManipulation('search-view');

searchView.toggleDisplay();

updateSearchFormDisplay(homeSearchBar, inputStatus);

/**
 * function checks if the input is OK and proceeds with the further actions for displaying weather
 *
 * @param {Object} e - DOM event object
 * @returns nothing
 */
function handleSubmit(e) {
  e.preventDefault();

  if (inputStatus !== INPUT_STATES.ready) return;

  let input = this.getElementsByTagName('input')[0];
  if (!input.dataset.currentWoeid || !input.dataset.currentCity) return;

  input.disabled = true;
  navigateTo('search', {
    id: input.dataset.currentWoeid,
    title: input.dataset.currentCity,
  });
  input.disabled = false;
  setTimeout(() => input.focus(), 750);
}

/**
 * event listeners for the search form on the home page
 * first event listener resets the status BEFORE handleInput works
 */
homeSearchInput.elem.addEventListener('input', resetInputStatus);
homeSearchInput.elem.addEventListener('input', debounce(handleInput, 1000));
homeSearchBar.addEventListener('submit', handleSubmit);

/**
 * event listeners for the search form on the datails page
 * first event listener resets the status BEFORE handleInput works
 */
dailySearchInput.elem.addEventListener('input', resetInputStatus);
dailySearchInput.elem.addEventListener('input', debounce(handleInput, 1000));
dailySearchBar.addEventListener('submit', handleSubmit);

/**
 * event listeners for clearing the input values after clicking the proper icon
 */
clearBtns.forEach((btn) => {
  btn.addEventListener('click', clearInputBtn);
});

/**
 * event listeners for reloading the page after clicking the proper icon
 */
reloadBtns.forEach((btn) => {
  btn.addEventListener('click', resetForms);
});

// Renders adequate view while traversing history
window.addEventListener('popstate', render);
// Renders adequate view on page load
document.addEventListener('DOMContentLoaded', () => render());
