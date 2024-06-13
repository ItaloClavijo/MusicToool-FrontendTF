import { Message } from "./Message"
import { Users } from "./User"

export class Chat {
    idChat:number=0
    user1id?: Users = new Users()
    user2id?: Users = new Users()
    messages: Message = new Message()
}