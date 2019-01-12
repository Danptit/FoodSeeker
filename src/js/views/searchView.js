import {
    elements
} from './base'

export const clearInput = () => elements.searchInput.value = '';
export const clearResult = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
}
export const clearLoader = () => elements.searchLoader.innerHTML = '';
export const getInput = () => elements.searchInput.value;
const shortTitle = (title) => {
    if (title.length > 17) {
        let res = title.split(' ').reduce((v, i) => {
            if ((v.join ` ` + i).length < 20) {
                v.push(i);
            }
            return v;
        }, []).join ` `
        return `${res}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="likes__fig">
                    <img src="${recipe.image_url}" alt="${shortTitle}">
                </figure>
                <div class="likes__data">
                    <h4 class="likes__name">${shortTitle(recipe.title)}</h4>
                    <p class="likes__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.searchResultList.insertAdjacentHTML('beforeend', markup);

}
// type = prev or next
const createBtn = (page, type) => `
                <button class="btn-inline results__btn--${type}" data-goto = ${type == 'prev' ? page - 1: page + 1}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type == 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                    <span>Page ${type == 'prev' ? page - 1: page + 1}</span>
                </button>
            
`;

const renderBtns = (page, numResults, resPerRes) => {
    const pages = Math.ceil(numResults / resPerRes);
    let button;
    if (page === 1 && pages > 1) {
        // button go to next page
        button = `${createBtn(page, 'next')}`;

    } else if (page < pages) {
        // 2 button 
        button = `
        ${createBtn(page, 'prev')}
        ${createBtn(page, 'next')}
        `;

    } else if (page === pages && page > 1) {
        // 1 button to go prev page
        button = `${createBtn(page, 'prev')}`
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button)
}
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render result of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    // render btn 
    renderBtns(page, recipes.length, resPerPage)
}