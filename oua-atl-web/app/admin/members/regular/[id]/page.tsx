/**
 * v0 by Vercel.
 * @see https://v0.dev/t/DsCAbXRK1LR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Image from 'next/image'
import { FaChevronRight } from "react-icons/fa6";

export default function page() {
  const user = {
      "user_id": "da4839cc-d364-401e-b46b-51bd5b3cf9dd",
      "first_name": "Terry",
      "last_name": "Doe",
      "email": "sampleTest@mail.com",
      "username": "tSmith",
      "address": "123 Maple Street",
      "address2": "Apt 4B",
      "city": "Springfield",
      "zip_code": 62701,
      "phone": "+1-555-123-4567",
      graduation_year: '19/20',
      field_of_study: 'Mathematics',
      "birth_date": "1991-08-15T00:00:00.000Z",
      "hobbies": [
          "reading",
          "hiking",
          "coding"
      ],
      "is_volunteering": false,
      "verified": false,
      "membership_expired": true,
      "email_verified": false
  }
  return (
    <article className="space-y-6 flex-1 flex flex-col">
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-nero-black text-white text-center py-4">
          <h1 className="text-2xl font-bold">{user.first_name} {user.last_name}</h1>
          <p className="text-sm">@{user.username}</p>
        </div>

        {/* Details Section */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <div>
            <h2 className="text-gray-700 font-semibold">Contact Information</h2>
            <p className="text-gray-600 text-sm">
              Email: <span className="font-medium">{user.email}</span> <br />
              Phone: <span className="font-medium">{user.phone}</span>
            </p>
          </div>

          <div>
            <h2 className="text-gray-700 font-semibold">Address</h2>
            <p className="text-gray-600 text-sm">
              {user.address}, {user.address2} <br />
              {user.city}, {user.zip_code}
            </p>
          </div>

          <div>
            <h2 className="text-gray-700 font-semibold">Academic Details</h2>
            <p className="text-gray-600 text-sm">
              Field of Study: <span className="font-medium">{user.field_of_study}</span> <br />
              Graduation Year: <span className="font-medium">{user.graduation_year}</span>
            </p>
          </div>


          <div>
            <h2 className="text-gray-700 font-semibold">Profile Details</h2>
            <p className="text-gray-600 text-sm">
              Birth Date: <span className="font-medium">{new Date(user.birth_date).toLocaleDateString()}</span> <br />
              Hobbies: <span className="font-medium">{user.hobbies.join(", ")}</span>
            </p>
          </div>
        </div>

        {/* Status Section */}
        <div className="px-6 py-4 bg-gray-50">
          <h2 className="text-gray-700 font-semibold">Account Status</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Email Verified: <span className={user.email_verified ? "text-green-600" : "text-red-600"}>{user.email_verified ? "Yes" : "No"}</span></li>
            <li>Membership Active: <span className={user.membership_expired ? "text-red-600" : "text-green-600"}>{user.membership_expired ? "Expired" : "Active"}</span></li>
            <li>Volunteering: <span className={user.is_volunteering ? "text-green-600" : "text-red-600"}>{user.is_volunteering ? "Yes" : "No"}</span></li>
          </ul>
        </div>
      </div>

      </section>
    </article>
  )
}
