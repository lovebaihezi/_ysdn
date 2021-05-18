import * as fs from 'fs/promises';
import Axios from 'axios';
import * as mockjs from 'mockjs';

const { Random } = mockjs;

const usernameList = [];
const userList = [];
const articles = [];
class User {
    constructor(
        readonly username: string,
        readonly nickname: string,
        readonly password: string,
        readonly avatarUrl: string,
        readonly like: {
            tags: string[];
        },
        readonly email: string,
    ) {}
}
// approval createTime sort
class Article {
    constructor(
        readonly title: string,
        readonly tags: string[],
        readonly content: string,
        readonly imageUrls: string[],
        readonly author: {
            username: string;
            nickname: string;
            avatarUrl: string;
        },
        readonly coverImgUrl: string = imageUrls[0],
        readonly approval: number = Random.integer(10, 80),
        readonly createTime: Date = new Date(Random.datetime()),
    ) {}
}

class Video {
    constructor(
        readonly title: string,
        readonly author: {
            username: string;
            nickname: string;
            avatarUrl: string;
        },
    ) {}
}

const tagsId = [
    '608ffccc2a6832f463a1237e',
    '608ffccc2a6832f463a1237f',
    '608ffccc2a6832f463a12380',
    '608ffccc2a6832f463a12381',
    '608ffccc2a6832f463a12382',
    '608ffccc2a6832f463a12383',
    '608ffccc2a6832f463a12384',
    '608ffccc2a6832f463a12385',
    '608ffccc2a6832f463a12386',
    '608ffccc2a6832f463a12387',
    '608ffccc2a6832f463a12388',
];

const tags = [
    'front-end',
    'client-side',
    'server-side',
    'QA',
    'media',
    'algorithm',
    'data',
    'common',
    'product',
    'security',
    'project',
];

export async function* createUser(): AsyncGenerator<[string, User]> {
    while (true) {
        const username = Random.name().replace(' ', '0');
        yield [
            username,
            new User(
                username,
                Random.name(),
                'password12345',
                await Axios.get('https://source.unsplash.com/random', {
                    maxRedirects: 0,
                }).catch((e) =>
                    e.response.data.match(/"https:.+"/g)[0].replaceAll('"', ''),
                ),
                {
                    tags: [
                        tagsId[Random.integer(0, 11)],
                        tagsId[Random.integer(0, 11)],
                        tagsId[Random.integer(0, 11)],
                    ],
                },
                Random.email('gmail.com'),
            ),
        ];
    }
}

export async function* createArticles(): AsyncGenerator<Article> {
    const file = (await fs.readFile('./init-json/md.md')).toString();
    let i = 0;
    while (true) {
        i += 1;
        yield new Article(
            '图像阈值与平滑实验2：全局阈值',
            [
                tags[Random.integer(0, 3)],
                tags[Random.integer(4, 7)],
                tags[Random.integer(8, 10)],
            ],
            file,
            [
                await Axios.get('https://source.unsplash.com/random', {
                    maxRedirects: 0,
                }).catch((e) =>
                    e.response.data.match(/"https:.+"/g)[0].replaceAll('"', ''),
                ),
            ],
            userList[i],
        );
        if (i > userList.length) {
            i = 0;
        }
    }
}

async function* limitByNumber<T>(
    f: () => AsyncGenerator<T>,
    n: number,
): AsyncGenerator<T> {
    let index = 1;
    for await (const each of f()) {
        index += 1;
        yield each;
        if (index > n) {
            break;
        }
    }
}

export default async function createJson(): Promise<{
    usernameList: string[];
    userList: User[];
    articles: Article[];
}> {
    for await (const [username, user] of limitByNumber(createUser, 20)) {
        usernameList.push(username);
        userList.push(user);
    }
    for await (const i of limitByNumber(createArticles, 20)) {
        articles.push(i);
    }
    return { usernameList, userList, articles };
}
