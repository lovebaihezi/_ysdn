import Mongoose from 'mongoose';

type _id = string;

type username = string;

declare namespace AjaxJson {
    interface tag {
        name: string;
        createTime: Date;
        clickTimes: number;
    }

    interface responseMessage {
        message: string;
        type: 'success' | 'error' | 'info';
        from: 'server' | 'client' | 'administrator';
    }

    interface notification {
        sender: userInfo;
        sendTime: Date;
        body: string;
        to: userInfo;
    }

    interface userProduct {
        _id: string;
        id: string;
        videos: _id[];
        tags: string[];
        answers: _id[];
        articles: _id[];
        questions: _id[];
        activities: _id[];
        comments: _id[];
    }

    interface userDetail {
        id: string;
        username: string;
        nickname: string;
        tags: string[];
        marks: _id[];
        liked: _id[];
        videos: _id[];
        answers: _id[];
        articles: _id[];
        questions: _id[];
        activities: _id[];
        userProduct: userProduct;
        avatarUrl: string;
        follow: userInfo[];
        follower: userInfo[];
        backgroundImage?: string;
        notifications: notification[];
    }

    interface production {
        id: _id;
        tags: tag[];
        read: number;
        title: string;
        createTime: Date;
        approval: amount;
        like: username[];
        modifyTime: Date[];
        markAmount: amount;
        disapproval: amount;
        comments: comment[];
        // authors: userInfo[];
        commentsAmount: amount;
    }

    type objectId = Mongoose.Types.ObjectId;
    type amount = number;

    interface user {
        email: string;
        auth: username;
        createTime: Date;
        nickname: string;
        telephone: string;
        avatarUrl: string;
        follow: userInfo[];
        follower: userInfo[];
        informationBackImageUrl?: string;
    }
    interface auth {
        username: username;
        password: string;
    }

    type userInfo = Pick<userDetail, 'avatarUrl' | 'username' | 'nickname'>;

    type userPageInfo = Omit<userDetail, 'Account' | 'id'>;

    interface comment {
        content: string;
        author: userInfo;
        answerTime: Date;
        approval: number;
        reply: reply[];
        disapproval: number;
    }

    interface reply {
        replay: reply[];
        content: string;
        createTime: Date;
        author: userInfo;
    }

    interface article extends production {
        author: userInfo;
        title: string;
        content: string;
        coverImgUrl: string;
        lastModifyTime: Date;
    }

    interface QA extends question {
        answerAmount: number;
        id: string;
        answer: answer[];
    }

    interface question {
        read: number;
        title: string;
        tags: string[];
        content: string;
        author: userInfo;
        createTime: Date;
        approval: number;
        disapproval: number;
    }

    interface answer {
        content: string;
        author: userInfo;
        answerTime: Date;
        approval: number;
        disapproval: number;
        comments: comment[];
    }

    interface video extends production {
        videoSrc: string;
        mark: userInfo[];
        briefIntro: string;
        coverImgUrl: string;
    }

    interface videoCollections extends Omit<production, 'read'> {
        watched: number;
        listName: string;
        content: Omit<video, 'uploader'>;
    }

    interface monographic extends production {
        coverUrl: string;
    }

    interface activities {
        holder: userInfo[];
        form: string;
        endTime: Date;
        tags: string[];
        title: string;
        startTime: Date;
        briefIntro: string;
        partner: userInfo[];
        amount: amount;
        max: amount;
        status: activitiesStatus;
    }

    type IndexDetailArticle = Pick<
        article,
        | 'author'
        | 'commentsAmount'
        | 'title'
        | 'createTime'
        | 'id'
        | 'approval'
        | 'read'
        | 'coverImgUrl'
        | 'tags'
    >;

    type IndexRankArticle = Pick<
        article,
        'author' | 'title' | 'id' | 'approval' | 'read'
    >;

    type IndexDetailQA = Pick<
        QA,
        'author' | 'title' | 'id' | 'approval' | 'read' | 'tags' | 'content'
    >;

    type IndexRankQA = Pick<
        QA,
        'author' | 'title' | 'id' | 'approval' | 'read'
    >;
}

export enum activitiesStatus {
    ended,
    started,
    inReview,
}

export default AjaxJson;
