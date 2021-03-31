import * as mock from 'mockjs';
import * as Koa from 'koa';
import * as Router from 'koa-router';
import { AjaxJson } from '../../src/interface';
import { Random } from 'mockjs';

const users: AjaxJson.user[] = [];

const App = new Koa();
const router = new Router();

App.use(async (ctx, next) => {
    ctx.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT, GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': ['X-Requested-With', 'Content-Type'],
    });
    await next();
});

const f: (i: number) => AjaxJson.production = (i) => ({
    id: mock.Random.integer(100, 10000).toString(16),
    title: mock.Random.title(i + 1),
    content: mock.Random.paragraph(i + 1),
    authors: [
        {
            avatarUrl: mock.Random.image(),
            Account: {
                auth: mock.Random.name(),
                nickname: mock.Random.string(),
                telephone: mock.Random.string(),
                email: mock.Random.email(),
                createTime: new Date(),
            },
        },
    ],
    createTime: new Date(),
    comments: [],
    commentsAmount: 0,
    read: 0,
    tags: [{ name: 'test', clickTimes: 0, createTime: new Date() }],
    markAmount: Random.integer(0, 1000),
    approval: Random.integer(0, 1000),
    disapproval: Random.integer(0, 1000),
    liked: false,
    marked: false,
    modifyTime: [new Date()],
    like: [],
});

router.post('/render/Monographic/all', async (ctx, next) => {
    ctx.body = new Array(10)
        .fill({})
        .map<AjaxJson.monographic>((_, i) => ({
            ...f(i),
            coverUrl: mock.Random.image('550x250'),
            content: mock.Random.string(),
        }));
});

const y = () =>
    new Array(10).fill(0).map<AjaxJson.article>((_) => {
        return {
            comments: [],
            id: mock.Random.id(),
            createTime: new Date(),
            title: mock.Random.title(1),
            content: mock.Random.paragraph(3),
            like: [],
            read: mock.Random.integer(0, 1000),
            marked: false,
            approval: mock.Random.integer(0, 1000),
            disapproval: 0,
            markAmount: 0,
            modifyTime: [new Date()],
            tags: [{ name: 'test', createTime: new Date(), clickTimes: 0 }],
            liked: false,
            authors: [
                {
                    Account: {
                        createTime: new Date(),
                        auth: mock.Random.name(),
                        email: mock.Random.email(),
                        nickname: mock.Random.string(),
                        telephone: mock.Random.string(),
                    },
                    avatarUrl: mock.Random.image(),
                },
            ],
            lastModifyTime: new Date(),
            coverImgUrl: mock.Random.image('720x300'),
            commentsAmount: 0,
        };
    });

router.post('/index/articles/recommend', async (ctx) => {
    ctx.body = y();
});

router.post('/index/articles/rank', async (ctx) => {
    const Articles = y().map((v) => ({
        ...v,
        coverImgUrl: mock.Random.image('150x150'),
    }));
    ctx.body = Articles.sort((a, b) => a.like.length - b.like.length);
});

router.post('/index/QAs/recommend', async (ctx) => {
    ctx.body = new Array(5).fill(0).map<AjaxJson.QA>((_, i) => {
        return {
            ...f(i),
            answer: [],
            question: {
                comments: [],
                id: mock.Random.id(),
                createTime: new Date(),
                title: mock.Random.title(1),
                content: mock.Random.paragraph(3),
                like: [],
                read: mock.Random.integer(0, 1000),
                marked: false,
                approval: mock.Random.integer(0, 1000),
                disapproval: 0,
                markAmount: 0,
                modifyTime: [new Date()],
                tags: [{ name: 'test', createTime: new Date(), clickTimes: 0 }],
                liked: false,
                author: {
                    Account: {
                        createTime: new Date(),
                        auth: mock.Random.name(),
                        email: mock.Random.email(),
                        nickname: mock.Random.string(),
                        telephone: mock.Random.string(),
                    },
                    avatarUrl: mock.Random.image(),
                },

                lastModifyTime: new Date(),
                coverImgUrl: mock.Random.image('720x300'),
                commentsAmount: 0,
            },
            coverImgUrl: mock.Random.image('720x300'),
        };
    });
});

router.post('/index/QAs/rank', async (ctx) => {
    const Videos = new Array(10).fill(0).map<AjaxJson.QA>((_, i) => {
        return {
            ...f(i),
            answer: [],
            question: {
                comments: [],
                id: mock.Random.id(),
                createTime: new Date(),
                title: mock.Random.title(1),
                content: mock.Random.paragraph(3),
                like: [],
                read: mock.Random.integer(0, 1000),
                marked: false,
                approval: mock.Random.integer(0, 1000),
                disapproval: 0,
                markAmount: 0,
                modifyTime: [new Date()],
                tags: [{ name: 'test', createTime: new Date(), clickTimes: 0 }],
                liked: false,
                author: {
                    Account: {
                        createTime: new Date(),
                        auth: mock.Random.name(),
                        email: mock.Random.email(),
                        nickname: mock.Random.string(),
                        telephone: mock.Random.string(),
                    },
                    avatarUrl: mock.Random.image(),
                },

                lastModifyTime: new Date(),
                coverImgUrl: mock.Random.image('720x300'),
                commentsAmount: 0,
            },
            coverImgUrl: mock.Random.image('150x150'),
        };
    });
    ctx.body = Videos.sort((a, b) => a.like.length - b.like.length);
});

router.post('/index/videos/recommend', async (ctx) => {
    ctx.body = new Array(5).fill(0).map<AjaxJson.video>((_, i) => {
        return {
            ...f(i),
            mark: [],
            videoSrc: mock.Random.url(),
            briefIntro: mock.Random.paragraph(),
            coverImgUrl: mock.Random.image('720x300'),
        };
    });
});

router.post('/index/videos/rank', async (ctx) => {
    const Videos = new Array(10).fill(0).map<AjaxJson.video>((_, i) => {
        return {
            ...f(i),
            mark: [],
            videoSrc: mock.Random.url(),
            briefIntro: mock.Random.paragraph(),
            coverImgUrl: mock.Random.image('150x150'),
        };
    });
    ctx.body = Videos.sort((a, b) => a.like.length - b.like.length);
});

router.post('/index/tags/all', async (ctx) => {
    ctx.body = new Array(8).fill({}).map<AjaxJson.tag>((v) => ({
        name: mock.Random.name(),
        createTime: new Date(),
        clickTimes: mock.Random.integer(1, 500),
    }));
});

App.use(router.routes());

App.listen(5050, console.log.bind(console, 'mock start'));
