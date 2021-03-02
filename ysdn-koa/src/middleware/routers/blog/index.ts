import { Schema } from 'mongoose';
import { account, article, auth, user } from '../../../@types/interface';
import { method, Route } from '../../../@types/Routes';
import useRoute from '../../../router-container';
import mongoService from '../../../service/mongo-service';

const uploadArticle: Route = () => [
    method.post,
    async ctx => {
        const {
            userID,
            article,
        }: {
            userID: Schema.Types.ObjectId;
            article: { title: string; content: string };
        } = ctx.request?.body;
        if (userID && article && article.title) {
            const now = new Date();
            ctx.body = await mongoService.insertArticle(userID, {
                ...article,
                authors: [userID],
                uploadTime: now,
                updateTimes: [now],
                comments: [],
            });
            return { msg: 'access granted' };
        }
        return { msg: 'access denied' };
    },
];

const deleteArticle: Route = () => [
    method.del,
    async ctx => ({ msg: 'deleteArticle' }),
];

const updateArticle: Route = () => [
    method.post,
    async ctx => ({ msg: 'updateArticle' }),
];

export default function blogRouter() {
    return useRoute([uploadArticle, deleteArticle, updateArticle]);
}
