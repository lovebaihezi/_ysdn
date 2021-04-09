import dataBase from '../database';

type _id = string;

type username = string;

declare namespace AjaxJson {
    interface tag {
        name: string;
        createTime: Date;
        clickTimes: Number;
    }

    enum Production {
        tags = 'tags',
        read = 'read',
        like = 'like',
        title = 'title',
        liked = 'liked',
        marked = 'marked',
        authors = 'authors',
        comments = 'comments',
        approval = 'approval',
        createTime = 'createTime',
        modifyTime = 'modifyTime',
        markAmount = 'markAmount',
        disapproval = 'disapproval',
        commentsAmount = 'commentsAmount',
    }

    interface notification {
        fromWho: userInfo;
        sendTime: Date;
    }

    interface userDetail {
        marks: _id[];
        username: _id;
        liked: _id[];
        videos: _id[];
        answers: _id[];
        tags: string[];
        articles: _id[];
        questions: _id[];
        nickname: string;
        activities: _id[];
        avatarUrl: string;
        follow: userInfo[];
        follower: userInfo[];
        notifications: notification[];
    }

    interface production {
        id: _id;
        tags: tag[];
        read: number;
        title: string;
        liked: boolean;
        marked: boolean;
        createTime: Date;
        approval: amount;
        like: username[];
        modifyTime: Date[];
        markAmount: amount;
        disapproval: amount;
        comments: comment[];
        authors: userInfo[];
        commentsAmount: amount;
    }

    type objectId = dataBase.objectId;
    type amount = number;

    interface user {
        Account: account;
        avatarUrl: string;
        follow: userInfo[];
        follower: userInfo[];
        informationBackImageUrl?: string;
    }

    interface account {
        email: string;
        auth: username;
        createTime: Date;
        nickname: string;
        telephone: string;
    }

    interface auth {
        password: string;
        username: username;
    }

    type userInfo = Pick<user, 'avatarUrl' | 'Account'>;

    type userPageInfo = Omit<user, 'Account'> & { id: _id };

    interface comment {
        content: string;
        author: userInfo;
        answerTime: Date;
        approval: number;
        reply: reply[];
        disapproval: number;
        comments: comment[];
    }

    interface reply {
        replay: reply[];
        content: string;
        createTime: Date;
        author: userInfo;
    }

    interface article extends production {
        title: string;
        content: string;
        coverImgUrl: string;
        lastModifyTime: Date;
    }

    interface QA extends question {
        answerAmount: number;
        id: string;
        answer : answer[];
    }

    interface question {
        read: number;
        title: string;
        tags: string[];
        content: string;
        author: userInfo;
        createTime: Date;
        approval: number;
        disapproval : number;
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
        holder: Date;
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
        | 'authors'
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
        'authors' | 'title' | 'id' | 'approval' | 'read'
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
