import { connectMongoDB } from './src/database/connectMongoDB'
import { ContactFactory } from './src/factories/contactFactory';
import { RoomFactory } from './src/factories/roomFactory';
import { UserFactory } from './src/factories/userFactory';
import { BookingFactory } from './src/factories/bookingFactory';
import RoomModel from './src/models/room';
import ContactModel from './src/models/contact';
import UserModel from './src/models/user';
import BookingModel from './src/models/booking';
import mongoose from 'mongoose';


async function main() {
    await connectMongoDB();
    //Rooms & Booking
    const roomFactory = RoomFactory.getInstance();
    const bookingFactory = BookingFactory.getInstance();
    await RoomModel.deleteMany({})
    await BookingModel.deleteMany({})

    for (let i = 0; i < 100; i++) {
        const roomData = await roomFactory.create();
        const newRoom = new RoomModel(roomData);
        await newRoom.save();
        const bookingData = await bookingFactory.create(newRoom)
        const newBooking = new BookingModel(bookingData)
        await newBooking.save();
        console.log("✅ Rooms & Booking" + (i + 1));
    }

    //Contact
    const contactFactory = ContactFactory.getInstance();
    await ContactModel.deleteMany({})
    for (let i = 0; i < 20; i++) {
        const contactData = await contactFactory.create()
        const newContact = new ContactModel(contactData)
        await newContact.save();
        console.log("✅ Contact" + (i + 1));
    }

    //User 
    const userFactory = UserFactory.getInstance();
    await UserModel.deleteMany({})
    for (let i = 0; i < 20; i++) {
        const userData = await userFactory.create()
        const newUser = new UserModel(userData)
        await newUser.save();
        console.log("✅ User " + (i + 1));
    }
    console.log("🛑 Cerrando conexión a MongoDB...");
    await mongoose.connection.close();
    console.log("✅ Conexión cerrada");
}
main();