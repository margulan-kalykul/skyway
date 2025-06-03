// import {Purchase, Tour, TourEvent} from './interfaces';
//
// export class TourEventClass implements TourEvent {
//     ID: string;
//     Tour: Tour | null;
//     amount: number;
//     date: string;
//     insta_post_url: string;
//     is_opened: boolean;
//     place: string;
//     price: number;
//     purchases: Purchase[];
//     tour_id: string;
//
// }

export class WebsocketMessage {
    userId: string | null;
    message: string;

    constructor(user: string | null, message: string) {
        this.userId = user;
        this.message = message;
    }
}
