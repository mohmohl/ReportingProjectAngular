import { Topic } from "./Topic";

export class TopicRole {
    role_id: String;
    topic_id: String;
    created_by: String;
    topic_name: String;
    topic_description: String;
    topic_from_date: Date;
    topic_to_date: Date;
    selected: boolean = false;
}