import axios from 'axios';

(async () => {
    const res = await axios({
        url: 'http://localhost:8000/blog/uploadArticle',
        method: 'put',
        data: {
            account: {
                username: '123',
                password: '123',
            },
            article: [
                {
                    title: '456',
                    authors: [],
                    lastUpdateDate: {
                        authors: [],
                        time: new Date(),
                        content: {
                            line: [],
                            New: [],
                            Old: [],
                        },
                    },
                    updateHistory: [],
                    submitDate: {
                        authors: [],
                        time: new Date(),
                        content: {
                            line: [],
                            New: [],
                            Old: [],
                        },
                    },
                    content: '123',
                    comments: [],
                    authStatus: '',
                },
            ],
        },
    });
    console.log(res?.data);
})();
