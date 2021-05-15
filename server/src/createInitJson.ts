import * as fs from 'fs/promises';
import Axios from 'axios';
import * as mockjs from 'mockjs';

const { Random } = mockjs;

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
    ) {}
}

class Video {
    constructor() {}
}

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
                    e.response.data.match(/"https:.+"/g)[0].replace('"', ''),
                ),
                { tags: [tags[0], tags[2], tags[5]] },
                Random.email('gmail.com'),
            ),
        ];
    }
}

export async function* createArticles(): AsyncGenerator<Article> {
    while (true) {
        yield new Article(
            Random.title(10, 20),
            [tags[0], tags[2], tags[5]],
            Random.paragraph(100, 500),
            [
                await Axios.get('https://source.unsplash.com/random', {
                    maxRedirects: 0,
                }).catch((e) =>
                    e.response.data.match(/"https:.+"/g)[0].replaceAll('"', ''),
                ),
            ],
            { username: '', nickname: '', avatarUrl: '' },
        );
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

(async () => {
    const file = await fs.open('./init-json/user.json', 'w+');
    for await (const i of limitByNumber(createUser, 20)) {
        await file.write(JSON.stringify(i));
    }
    await file.close();
})();
