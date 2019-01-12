import Search from './models/Search'
import Recipe from './models/Recipe'
import * as searchView from './views/searchView'

import {
    elements,
    renderLoader,
    clearLoader
} from './views/base'
//global state of the app
// search object
// Current recipe object
// shopping list object
// liked recipes
const state = {};
const controlSearch = async () => {
    // 1/ get the query from view
    const query = searchView.getInput();
    if (query) {
        // 2 new search object and add to state
        state.search = new Search(query);

        // 3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResult();
        renderLoader(elements.searchRes)
        try {
            // 4. Search for recipes
            await state.search.getResults();
            // 5. Render results on UI
            clearLoader();
            console.log(state.search.result)
            searchView.renderResults(state.search.result)
        } catch (error) {
            alert('error fetch list recipe')
        }


    }
}
document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline')
    if (btn) {
        const goToPage = +btn.dataset.goto;
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage)
    }
})


// recipe Controller
const controlRecipe = async () => {
        // get id from url
        const id = window.location.hash.replace('#', '');
        console.log(id)
        if (id) {
            // prepare UI for changes
            // create new recipe object
            state.recipe = new Recipe(id);
            // Get recipe data
            try {
                await state.recipe.getRecipe();
                state.recipe.parseIngredients();
                // Calculate serving and time
                state.recipe.calcTime();
                state.recipe.calcServings();
                // Render recipe
                console.log(state.recipe)
            } catch (error) {
                alert('error processing recipe')
            }

        }
    }
    ['hashchang', 'load'].forEach(event => window.addEventListener(event, controlRecipe));