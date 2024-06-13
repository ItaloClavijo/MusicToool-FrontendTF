import { Users } from "./User"

export class Roles{
    id: number = 0
    roleName: string = ""
    roleDescription: string = ""
    usersId: Users = new Users()
}