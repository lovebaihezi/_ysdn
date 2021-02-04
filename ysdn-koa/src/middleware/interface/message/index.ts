export interface Msg {
    from: string;
    information: string;
    date: Date;
}

export class Msg {
    constructor(from: string, information: string) {
        this.from = from;
        this.information = information;
        this.date = new Date();
    }
    get msg(): string {
        return `{from where : ${this.from},log information : ${
            this.information
        },Date : ${this.date.toLocaleString()}}
`;
    }
}
