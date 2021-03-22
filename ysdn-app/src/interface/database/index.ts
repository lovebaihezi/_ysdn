import * as Mongoose from 'mongoose';

declare namespace dateBaseInterface {
    interface objectId {
        _id: _id;
    }

    type _id = Mongoose.Schema.Types.ObjectId;

    interface auth {
        username: string; // * will nor repeat!!!
        password: string;
    }

    interface account {
        auth: _id;
        nickname: string;
        telephone?: string;
        email?: string;
        createTime: Date;
    }

    interface article {
        title: string;
        content: string;
        authors: _id[];
        like: _id[];
        createTime: Date;
        comments: _id[];
    }

    interface comment {
        time: Date;
        author: _id[];
        content: string;
        like: _id[];
        replay: _id;
    }

    interface reply extends comment {}

    interface video {
        name: string;
        uploader: _id;
        comments: _id;
        uploadTime: Date;
    }

    interface videosList {
        name: string;
        creator: _id;
        list: _id[];
        createTime: Date;
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

    interface monographic {
        title: string;
        content: string;
        like: number;
        comment: _id[];
    }

    interface tags {
        name: string;
    }
}

export default dateBaseInterface;
