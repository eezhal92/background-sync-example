export function buildRecipesListTemplate(recipes) {
  const rowsTemplate = recipes.map(recipe => rowTemplate(recipeCardTemplate(recipe)));

  return rowsTemplate.join('');
}

export function buildRecipeDetailHTML(recipe) {
  const bannerHTML = bannerTemplate(recipe.image);
  const recipeArticleHTML = recipeArticleTemplate(recipe);
  const dividerHTML = dividerTemplate();
  const commentsHTML = commentsTemplate(recipe.comments);

  return `
    ${bannerHTML}
    <div class="container">
      ${recipeArticleHTML}
      ${dividerHTML}
      ${commentsHTML}
    </div>
  `;
}

export function buildBackgroundSyncOfferHTML() {
  return `
    <div class="container">
      <div class="row">
        <div class="col-xs-12">
          <div class="bg-sync-offer">
            <div class="bg-sync-offer__message">
              Cannot get the recipe. You could load it in background. We'll notify You when ready.
            </div>
            <br>
            <button id="do-bg-sync" class="btn bg-sync-offer__btn">
              Load In Background
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function recipeCardTemplate(recipe) {
  return `
    <div class="recipe-card">
      <a class="recipe-card__image" href="/detail.html#recipe_id=${recipe.id}">
        <img src="${recipe.image}" alt="">
      </a>
      <div class="recipe-card__detail">
        <h3 class="recipe-card__title">${recipe.title}</h3>
        <p class="italic">Description</p>
      </div>
      <div class="recipe-card__action">
        <div class="action__like">
          <a href="#like">Like</a>
        </div>
        <div class="action__read">
          <a href="/detail.html#recipe_id=${recipe.id}">Read More</a>
        </div>
      </div>
    </div>
  `;
}

function rowTemplate(recipeCardHTML) {
  return `
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-sm-offset-3">
        ${recipeCardHTML}
      </div>
    </div>
  `;
}

function bannerTemplate(imageUrl) {
  return `
    <section class="recipe-banner">
      <img src="${imageUrl}" class="img-responsive" alt="">
    </section>
  `;
}

function recipeArticleTemplate(recipe) {
  return `
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-sm-offset-3">
        <div class="recipe-detail">
          <h1 class="recipe-detail__title">${recipe.title}</h1>
          <div class="recipe-text">
            ${recipe.text}
          </div>
        </div>
      </div>
    </div>
  `;
}

function dividerTemplate() {
  return `
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-sm-offset-3">
        <hr>
      </div>
    </div>
  `;
}

function commentsTemplate(comments) {
  const items = comments.length
    ? comments.map(comment => `<div class="comment-item">${comment}</div>`).join('')
    : `<div class="comment-item"><em>No comment yet</em></div>`;

  return `
    <div class="row">
      <div class="col-xs-12 col-sm-6 col-sm-offset-3">
        <div class="comments">
          <h2 class="comments__header">Give your thoughts</h2>
          <form id="comment-form" class="comment-form">
            <div class="form-group">
              <textarea rows="3" class="form-control"></textarea>
            </div>
            <button type="submit" class="btn">Send</button>
          </form>
          ${items}
        </div>
      </div>
    </div>
  `;
}
