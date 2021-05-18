import * as fs from 'fs/promises';

(async () => {
    const result = (await fs.readFile('./schema.json')).toString();
    const O = JSON.parse(result);
    const f = Object.fromEntries(
        Object.entries(O).map(([n, v]) => {
            return [
                `表名 : ${n}`,
                Object.fromEntries(
                    Object.entries(v).map(([name, value]: [string, string]) => {
                        return [
                            `键名 : ${name}`,
                            {
                                类型: value
                                    .replace('Array', '数组')
                                    .replace(/</g, '[')
                                    .replace('>', ']')
                                    .replace('String', '字符串')
                                    .replace('Number', '数值')
                                    .replace('Date', '日期')
                                    .replace('ObjectId', '表索引')
                                    .replace('Article', '文章')
                                    .replace('Reply', '回复')
                                    .replace('UserInfo', '用户信息')
                                    .replace('User', '用户')
                                    .replace('Comment', '评论')
                                    .replace('video', '视频'),
                            },
                        ];
                    }),
                ),
            ];
        }),
    );
    const newOne = JSON.stringify(f);
    await fs.writeFile('./format.json', newOne);
})();
