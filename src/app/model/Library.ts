import { Users } from "./User";

export class Library {

    id: number = 0
    libraryAvailable: boolean = false
    libraryName: string  = ""
    libraryDescription: string = ""
    usersId?: Users = new Users()
}