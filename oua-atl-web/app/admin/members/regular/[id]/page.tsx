import { cookies } from "next/headers";
import { Metadata } from "next";
import { UserProfile } from "@/app/lib/types";
import AllowSubscription from "./ui/AllowSubscription";

const baseUrl = process.env?.API_BASE ?? "http://localhost:3000";

export const metadata: Metadata = {
  title: "User Profile",
};

const getData = async (
  id: string
): Promise<{ message: string; payload: UserProfile | null }> => {
  try {
    const cookieStore = cookies(); // Access cookies
    const url = `${baseUrl}/users/${id}/profile`;
    const res: Response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore as unknown as string,
      },
      credentials: "include", // Include cookies
      cache: "no-store", // Force no caching for fresh data
    });

    if (res.ok) {
      const result = await res.json().catch(() => ({message: res.statusText}));
      return result;
    }
    const msg = res.statusText;
    throw new Error(msg ?? "Unknown error");
  } catch (error: any) {
    console.log("profile error", error);
    return { message: error.message, payload: null };
  }
};

export default async function page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);

  const user = data.payload;
  return (
    <article className="space-y-6 flex-1 flex flex-col">
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6">
        {user && (
          <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-nero-black text-white text-center py-4">
              <h1 className="text-2xl font-bold">
                {user.first_name} {user.last_name}
              </h1>
              <p className="text-sm">@{user.username}</p>
            </div>

            {/* Details Section */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 ">
              <div>
                <h2 className="text-gray-700 font-semibold">
                  Contact Information
                </h2>
                <p className="text-gray-600 text-sm">
                  Email: <span className="font-medium">{user.email}</span>{" "}
                  <br />
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
                <h2 className="text-gray-700 font-semibold">
                  Academic Details
                </h2>
                <p className="text-gray-600 text-sm">
                  Field of Study:{" "}
                  <span className="font-medium">
                    {user?.field_of_study ??
                      (<span className="text-red-600">User field of study not returned from backend</span>)}
                  </span>{" "}
                  <br />
                  Graduation Year:{" "}
                  <span className="font-medium">
                    {user.graduation_year ??
                      (<span className="text-red-600">User graduation year not returned from backend</span>)}
                  </span>
                </p>
              </div>

              <div>
                <h2 className="text-gray-700 font-semibold">Profile Details</h2>
                <p className="text-gray-600 text-sm">
                  Birth Date:{" "}
                  <span className="font-medium">
                    {new Date(user.birth_date).toLocaleDateString()}
                  </span>{" "}
                  <br />
                  Hobbies:{" "}
                  <span className="font-medium">{user.hobbies.join(", ")}</span>
                </p>
              </div>
            </div>

            {/* Status Section */}
            <div className="px-6 py-4 bg-gray-50">
              <h2 className="text-gray-700 font-semibold">Account Status</h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>
                  Email Verified:{" "}
                  <span
                    className={
                      user.email_verified ? "text-green-600" : "text-red-600"
                    }
                  >
                    {user.email_verified ? "Yes" : "No"}
                  </span>
                </li>

                <li>
                  Verified:{" "}
                  <span
                    className={
                      user.verified ? "text-green-600" : "text-red-600"
                    }
                  >
                    {user.verified ? "Yes" : "No"}
                  </span>
                </li>
                <li>
                  Membership Active:{" "}
                  <span
                    className={
                      user.membership_expired
                        ? "text-red-600"
                        : "text-green-600"
                    }
                  >
                    {user.membership_expired ? "Expired" : "Active"}
                  </span>
                </li>
                <li>
                  Volunteering:{" "}
                  <span
                    className={
                      user.is_volunteering ? "text-green-600" : "text-red-600"
                    }
                  >
                    {user.is_volunteering ? "Yes" : "No"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="py-4 flex justify-end">
          <AllowSubscription id={params.id} apiUrl={baseUrl} />
        </div>
      </section>
    </article>
  );
}
