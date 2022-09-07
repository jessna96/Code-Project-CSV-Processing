export default {
    getArticles(state) {
        return state.articles;
    },
    hasArticles(state) {
        return !!state.articles.length;
    }
}