export interface IFaq {
    question: string;
    answer: string;
}

export class Faq implements IFaq {
    question: string;
    answer: string;
    constructor(question: string, answer: string) {
        this.question = question;
        this.answer = answer;
    }
}