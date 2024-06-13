export class Users {
    id: number = 0
    username: string=""
    password: string=""
    enabled: boolean = true
    email: string = ""
    description: string=""
    registerDate: Date = new Date(Date.now())
}