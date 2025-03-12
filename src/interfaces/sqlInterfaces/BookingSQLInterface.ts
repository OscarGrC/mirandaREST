export interface BookingSQLInterface {
    id?: number;
    guest_name: string;
    guest_lastname: string;
    guest_email: string;
    guest_phone: string;
    order_date: string;
    check_in: string;
    check_out: string;
    room_type: string;
    room_number: string;
    special_request: string;
}
