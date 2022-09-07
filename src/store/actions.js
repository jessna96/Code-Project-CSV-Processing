export default {
    addArticles(context, data) {

        let articles = data;

        context.commit('addArticles', articles);

    },
}