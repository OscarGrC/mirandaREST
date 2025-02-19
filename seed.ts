import { connectMongoDB } from './src/database/connectMongoDB'
import { ContactFactory } from './src/factories/contactFactory';
import { RoomFactory } from './src/factories/roomFactory';
import { UserFactory } from './src/factories/userFactory';
import { BookingFactory } from './src/factories/bookingFactory';
import RoomModel from './src/models/room';
import ContactModel from './src/models/contact';
import UserModel from './src/models/user';
import BookingModel from './src/models/booking';


async function main() {
    await connectMongoDB();
    //Rooms
    const roomFactory = RoomFactory.getInstance();
    for (let i = 0; i < 100; i++) {
        await new RoomModel(roomFactory.create()).save();
    }
    //Contact
    const contactFactory = ContactFactory.getInstance();
    for (let i = 0; i < 10; i++) {
        await new ContactModel(contactFactory.create()).save();
    }
    //User 
    const userFactory = UserFactory.getInstance();
    for (let i = 0; i < 10; i++) {
        await new UserModel(userFactory.create()).save();
    }
    //Bookings
    const bookingFactory = BookingFactory.getInstance();
    for (let i = 0; i < 20; i++) {
        await new BookingModel(bookingFactory.create()).save();
    }
}
main();