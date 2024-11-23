import connecteDB from "@/config/database";
import Message from '@/models/Message';
import '@/models/Property';
import { converToSerealizableObject } from "@/utils/convertToObject";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/MessageCard";
const MessagesPage = async () => {
    connecteDB()
    const sessionUser = await getSessionUser();

    const { userId } = sessionUser;

    const readMessages = await Message.find({ recipient: userId, read: true  })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean()
    
    const unreadMessages = await Message.find({ recipient: userId, read: false })
        .sort({ createdAt: -1 })
        .populate('sender', 'username')
        .populate('property', 'name')
        .lean()

    const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
        const message = converToSerealizableObject(messageDoc);
        message.sender = converToSerealizableObject(messageDoc.sender)
        message.property = converToSerealizableObject(messageDoc.property)
        return message
    });
    return ( 
        <section className="bg-blue-50">
            <div className="container m-auto py-24 max-w-6xl">
                <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md m-4 md:m-0">
                    <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
                    <div className="space-y-4">
                        {messages.length === 0 ? (<p>You Don't Have Any Messages</p>) : (
                            messages.map((message) => (
                                <MessageCard key={message._id} message={message} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </section>
     );
}
 
export default MessagesPage;




// Create Messager:
// connect to database
// verify auth
// Get user id === recipient id,  
// recivedMessages: fetch all messages from same sender to same recipient && same property,
// sentMessages: fetch all mesages from recipient to same sender && same property
// 1 - Create page /messages/[reply],
// layout style: <section className="bg-blue-50">
            // <div className="container m-auto py-24 max-w-6xl">
{/* <recMessages className="w-100% flex"><left bg-gray></></left>  */}
{/* <sentMessages className="w-100% flex "><right bg-blue></right> */ }
// sorted by date

// create form hidden textfield with user info &&  text field for reply to sender,