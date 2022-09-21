export default {
    getArticles(state) {
        return state.articles;
    },
    hasArticles(state) {
        if (state.articles) {
            return !!state.articles.length;
        }
        else {
            return false;
        }
        
    }
}