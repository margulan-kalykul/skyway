 
//
 
 
 
 
 
 
 
 
 
 
 
//
 

export class WebsocketMessage {
    userId: string | null;
    message: string;

    constructor(user: string | null, message: string) {
        this.userId = user;
        this.message = message;
    }
}
