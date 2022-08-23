import { Question } from "./Question";

export class TopicDetail {
    id: string;
    created_date: string;
    created_by: string;
    name: string;
    description: string;
    from_date: Date;
    to_date: Date;
    user_id: string;
    questions: Question[];
}