'use client'
import { useState } from "react";
// import { useFormState, useFormStatus } from 'react-dom'
import { useSession } from "next-auth/react";
import addMessage from "@/app/actions/addMessage";
import { toast } from 'react-toastify'
import SubmitMessageButton from "./SubmitMessageButton";


const ReplyMessage = ({ message, user }) => {
  const { data: session } = useSession()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const propertyId = message.property.toString() 
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    try {
      const response = await addMessage(formData);
      if (response.error) {
                toast.error(response.error);
      } else {
        setIsSubmitted(true)
                toast.success('Message sent successfully!');
            }
    } catch (error) {
      toast.error(`Error: ${error}`);
    }
  }
  if (isSubmitted) {
    return (
      <p className="text-green-500 mb-4">Your Massage has ben sent</p>
    )
  }
  if (!session) {
     return null
  }
  
  return (
            <div className="bg-white p-6 rounded-lg">
      <form onSubmit={handleSubmit}>
        <input  type='hidden' id="property" name="property" defaultValue={message.property._id} /><br/>
        <input  type='hidden' id="recipient" name="recipient" defaultValue={message.sender._id} />
                <div className="">
                  <input
                  type='hidden'
                    id="name"
                    name="name"
                    defaultValue={user.name}
                  />
                </div>
                <div className="">
                  <input
                  type='hidden'
                    id="email"
                    name="email"
                    defaultValue={user.email}
                  />
                </div>
        <div className="">
          <input
                    id="phone"
                    name="phone"
                    type="hidden"
            placeholder="Enter your phone number"
            defaultValue='Not required'
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="body"
                  >
                    Reply On Message:
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                    id="body"
                    name="body"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
                <div>
                  <SubmitMessageButton/>
                </div>
              </form>
            </div>
     );
}
 
export default ReplyMessage;