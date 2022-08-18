import { Answer } from './Answer';
import { Option } from "./Option";

export class Question {
    id: string;
    description: string;
    mark: string;
    type: string;
    role_id: string;
    options: Option[];
    answers: Answer[];
}