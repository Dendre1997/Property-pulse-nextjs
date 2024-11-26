'use client'
import { useState, useMemo } from 'react';
import { toast } from 'react-toastify'
import markMessageAsRead from '@/app/actions/markMessageAsRead';
import deleteMessage from '@/app/actions/deleteMessage';
import { useGlobalContext } from '@/context/GlobalContext';
import ReplyMessage from './ReplyMessage';
import Link from 'next/link';


const MessageCard = ({ message, user }) => {
    const [isRead, setIsRead] = useState(message.read)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isReplyOpen, setIsReplyOpen] = useState(false)

    const {setUnreadCount} = useGlobalContext()
    const recivedDate = useMemo(() => {
        // Extract the date and time portion using string manipulation
        const formattedDate = message.createdAt.split(" GMT")[0]; // Get everything before " GMT"
        return formattedDate;
    }, [message.createdAt]);
    const handleReadClick = async () => {
        const read = await markMessageAsRead(message._id)
        setIsRead(read)
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1) )
        toast.success(`Marked As ${read ? 'Read' : 'New'}`)
    }
    const handleDeleteClick = async () => {
        await deleteMessage(message._id)
        setIsDeleted(true)
        setUnreadCount((prevCount) => (isRead ? prevCount: prevCount - 1) )
        toast.success('Message Deleted')
    }
    const handleReplyClick = (e) => {
        e.preventDefault()
        setIsReplyOpen((prev) => !prev)
    }
    if (isDeleted) {
        return <p>Deleted Message</p>
    }
    return ( 
        <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
            <h2 className="text-xl mb-4">
                {!isRead && (
                    <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md'>New</div>
                )}
                <span className='font-bold'>Property Inqury: </span> {' '}  <Link href={`/properties/${message.property._id}`}>{message.property.name}</Link>
            </h2>
            <p className="text-gray-700">{message.body}</p>
            <ul className="mt-4">
                <li>
                    <strong>Reply Email:</strong>{' '}
                    <a href={`mailto:${message.email}`} className="text-blue-500">{message.email}</a>
            </li>
                <li>
                    <strong>Reply Phone:</strong>{' '}
                    <a href={`tel:${message.phone}`} className="text-blue-500">{message.phone}</a>
            </li>
                <li>
                    <strong>Recived:</strong>{' '}
                    {recivedDate}
            </li>
            </ul>
            <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md" onClick={handleReadClick}>
                {isRead === true ? 'Mark As New' : 'Mark As Read'}
            </button>
            <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md" onClick={handleDeleteClick}>Delete</button>
            <button className="mt-4 ml-3 bg-green-500 text-white py-1 px-3 rounded-md" onClick={handleReplyClick}>{!isReplyOpen ? 'Reply' : 'Close' }</button>
            {isReplyOpen && (   
            <ReplyMessage key={message._id} message={message} user={user} />
            )}
        </div>
     );
}
 
export default MessageCard;