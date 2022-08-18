import { Question } from "./Question";

export class Topic {
    id: string;
    created_date: string;
    created_by: string;
    name: string;
    description: string;
    user_id: string;
    questions: Question[];
}