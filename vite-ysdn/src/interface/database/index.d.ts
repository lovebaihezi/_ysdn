import * as Mongoose from 'mongoose';

declare namespace dateBaseInterface {
    type id = string;
    interface Auth {
        username: string;
        password: string;
        email: string;
    }
    // auth means ref to Auth
    // username means User model _id

    interface ProductionRef {
        article: id[];
        video: id[];
        comment: id[];
        tag: id[];
        question: id[];
        answer: id[];
    }

    interface message {
        author: id;
        body: string;
        time: Date;
    }

    interface User {
        auth: Auth;
        username: id;
        avatarUrl: Image;
        nickname: string;
        liked: ProductionRef;
        tags: string[];
        notification: message[];
    }

    interface Production {
        approval: id[];
        disapproval: id[];
    }

    interface Video extends Production {
        stream: VideoStreaming[];
        title: string;
    }

    interface Image {
        data: Mongoose.Types.Buffer;
    }

    interface Article extends Production {
        title: string;
        body: string;
        author: id[];
        coverImage: id;
        createTime: Date;
        tag: string[];
        lastModifyTime: Date;
    }

    interface Tag extends ProductionRef, Production {
        name: string;
        createTime: string;
    }

    interface Comment extends Production {
        author: id;
        replay: id;
    }

    interface Answer extends Production {
        author: id;
        comment: id[];
    }

    interface Question extends Production {
        title: string;
    }

    interface QA {
        question: Question;
        answers: Answer[];
    }

    interface Activities {
        partner: id[];
        title: string;
        body: string;
    }

    interface VideoStreaming {
        data: Mongoose.Types.Buffer;
    }
}

export default dateBaseInterface;
