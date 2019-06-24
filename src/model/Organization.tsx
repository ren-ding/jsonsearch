export default interface Organization {
    _id: number,
    url: string,
    external_id: string,
    name: string,
    domain_names: Array<string>,
    created_at: string
    details: string,
    shared_tickets: boolean,
    tags: Array<string>
}