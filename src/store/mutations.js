export default {
    addArticles(state, data) {
        state.articles = [...data]; //.push(data);
    },
}