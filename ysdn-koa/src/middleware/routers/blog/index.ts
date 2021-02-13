import { method, Route } from '../../../@types/Routes';
import useRoute from '../../../router-container';

const uploadArticle: Route = () => [
    method.put,
    async ctx => ({ msg: 'uploadArticle' }),
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
