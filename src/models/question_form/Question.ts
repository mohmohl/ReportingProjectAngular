import { Answer } from './Answer';
import { Option } from "./Option";

export class Question {
    id: string;
    description: string;
    mark: number;
    type: string;
    options: Option[];
    answers: Answer[];
}