import dataBase from '../database';

type objectId = dataBase.objectId;

type _id = dataBase._id;

type username = string;

declare namespace AjaxJson {
    interface tag {
        name: string;
        createTime: string;
        clickTimes: Number;
    }

    interface user {
        Account: account;
        articles: _id[];
        historyViewed: _id[];
        bookMarks: _id[];
        comments: _id[];
        historyLike: _id[];
        historyUpdates: _id[];
        follow: _id[];
        follower: _id[];
        avatarUrl?: string;
        informationBackImageUrl?: string;
    }

    interface account {
        auth: username; // ref to auth.username
        nickname: string;
        telephone?: string;
        email?: string;
        createTime: Date;
    }

    interface auth {
        username: username;
        password: string;
    }

    type author = string;

    interface comment {
        author: author;
        like: username[];
    }

    interface article {
        title: string;
        content: string | _id;
        authors: string[];
        likes: string[] | number;
        createTimes: Date;
        lastModifyTime: Date;
        comments: comment[];
    }

    interface QA {
        question: question;
        answer: answer[];
        createTime: Date;
        modifyTime: Date[];
    }

    interface question {
        author: username;
    }

    interface answer {}

    interface video {}

    interface collection<T> extends Array<T> {}
}

export default AjaxJson;
