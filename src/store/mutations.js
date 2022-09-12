export default {
    addArticles(state, data) {
        state.articles = [...data]; //.push(data);
    },
    removeArticle(state, index) {
        state.articles.splice(index,1);
    },
    updateArticle(state, payload) {
        state.articles.forEach(element => {
            if (element.Hauptartikelnr === payload.articleNr) {
                element[payload.artProperty] = payload.newValue;
            }
        });
    },
    addArticle(state, article) {
        state.articles.push(article);
    }
}