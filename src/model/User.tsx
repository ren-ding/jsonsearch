export default interface User {
    _id: number,
    url: string,
    external_id: string,
    name: string,
    alias?: string,
    created_at: string,
    active: boolean,
    verified?: boolean,
    shared: boolean,
    locale?: string,
    timezone?: string,
    last_login_at: string,
    email?: string,
    phone: string,
    signature: string,
    organization_id?: number
    tags: Array<string>,
    suspended: boolean,
    role: string
}