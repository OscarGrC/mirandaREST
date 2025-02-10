export interface BookingApiInterface {
    guest: {
        name: string;
        last_name: string;
        id: number;
    };
    order_date: string;
    check_in: string;
    check_out: string;
    room: {
        type: string;
        number: string;
    };
    special_request?: string;
}