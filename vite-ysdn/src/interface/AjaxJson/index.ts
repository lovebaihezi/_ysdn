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
        fromWho : userInfo;
        sendTime : Date;
    }

    interface userDetail {
        username: _id;
        nickname: string;
        avatarUrl : string;
        notifications : notification[];
        follow : userInfo[];
        follower : userInfo[];
        articles : _id[];
        videos : _id[];
        answers : _id[];
        questions : _id[];
        activities : _id[];
        marks : _id[];
        liked : _id[];
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

    interface comment extends Omit<production, 'authors'> {
        reply: reply[];
        author: userInfo;
    }

    interface reply {
        replay: reply;
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

    interface QA extends production {
        answer: answer[];
        question: question;
        coverImgUrl: string;
    }

    interface question extends Omit<production, 'authors'> {
        author: userInfo;
    }

    interface answer extends Omit<production, 'authors'> {
        author: userInfo;
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
        | 'authors'
        | 'question'
        | 'title'
        | 'createTime'
        | 'id'
        | 'approval'
        | 'read'
        | 'coverImgUrl'
        | 'tags'
    >;

    type IndexRankQA = Pick<
        QA,
        'authors' | 'title' | 'id' | 'approval' | 'read'
    >;
}

export enum activitiesStatus {
    ended,
    started,
    inReview,
}

export default AjaxJson;
