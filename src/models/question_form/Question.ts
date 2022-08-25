import { Answer } from './Answer';
import { Option } from "./Option";
import { QuestionType } from './QuestionType';

export class Question {
    id: string;
    description: string;
    mark: number;
    type: QuestionType;
    options: Option[];
    answers: Answer[];
}