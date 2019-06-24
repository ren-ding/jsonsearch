import User from "./User";
import Organization from "./Organization";

export default interface Ticket {
    _id: string,
    url: string,
    external_id: string,
    created_at: string,
    type: string,
    subject: string,
    description: string,
    priority: string,
    status: string,
    tags: Array<string>,
    has_incidents: boolean,
    due_at: string,
    via: string,
    submitter: User,
    assignee: User,
    organization: Organization
}
