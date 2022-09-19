import { Topic } from "./Topic";

export class TopicRole {
    role_id: string;
    topic_id: string;
    created_by: string;
    topic_name: string;
    topic_description: string;
    topic_from_date: Date;
    topic_to_date: Date;
    selected: boolean = false;
}