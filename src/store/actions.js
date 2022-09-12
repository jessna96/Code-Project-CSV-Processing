export default {
    addArticles(context, data) {

        let articles = data;

        context.commit('addArticles', articles);

    },
    removeArticle(context, articleIdx) {
        context.commit('removeArticle', articleIdx);
    },
    updateArticle(context, payload) {
        context.commit('updateArticle', payload);
    },
    addArticle(context, article) {
        context.commit('addArticle', article);
    }
}