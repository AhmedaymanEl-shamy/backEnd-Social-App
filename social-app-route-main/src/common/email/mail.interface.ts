export interface IMailProvider{
    send(to: string, subject: string, body: string): Promise<void>
}