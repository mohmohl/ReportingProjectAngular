import { Question } from "./Question";

export class TopicDetail {
    id: string;
    created_date: string;
    created_by: string;
    name: string;
    description: string;
    user_id: string;
    questions: Question[];
}