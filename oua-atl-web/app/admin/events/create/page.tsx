import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Create Event  | Ife Alumni",
};

const page = () => {

  const isSubmitting = false;

  return (
    <section className="p-3 md:p-6">
      <form className="p-4 md:p-8 bg-white shadow-lg">
        <div className="py-4">
          <h3 className="font-bold text-xl sm:text-3xl">Create Event</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 mt-10">
          <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-8">
            <h3 className="text-xl font-semibold sm:col-span-6">Event Details</h3>
            
            <div className="sm:col-span-3">
              <label htmlFor="event_name" className="form-label">
                Event name *
              </label>
              <input id="event_name" type="text"  autoComplete="event_name" className="form-input" />
              {/* {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>} */}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="event_image" className="form-label">
                Event image *
              </label>
              <input id="event_image" type="file" className="form-input" />
              {/* {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>} */}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="start_date" className="form-label">
                Start date *
              </label>
              <input type="datetime-local" id="start_date" required className="form-input" />
              {/* {errors.fullname?.message && <p className="text-sm text-red-400">{errors.fullname.message}</p>} */}
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="end_date" className="form-label">
                End date <span className="text-gray-500 text-sm">( Ignore if event is a single day event )</span>
              </label>
              <input type="datetime-local" id="end_date" required className="form-input" />
              {/* {errors.fullname?.message && <p className="text-sm text-red-400">{errors.fullname.message}</p>} */}
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="location" className="form-label">
                Event Location *
              </label>
              <input id="location" type="text" required  autoComplete="location" className="form-input" />
              {/* {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>} */}
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="event_description" className="form-label">
                Event Description *
              </label>
              <textarea id="event_description" required  className="form-input" />
              {/* {errors.message?.message && <p className="text-sm text-red-400">{errors.message.message}</p>} */}
            </div>



          </section>

          <section className="md:col-span-4 space-y-8 p-3 border border-gray-300 rounded-md ">
            <h3 className="text-xl font-semibold">Event Pricing</h3>
            <div className="">
              <label htmlFor="ticket_price" className="form-label">
                Ticket Price *
              </label>
              <input id="ticket_price" type="number" required  autoComplete="ticket_price" className="form-input" />
              {/* {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>} */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label htmlFor="vip_price" className="form-label">
                  Vip Ticket Price 
                </label>
                <input id="vip_price" type="number" required  autoComplete="vip_price" className="form-input" />
                {/* {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>} */}
              </div>

              <div className="">
                <label htmlFor="table_price" className="form-label">
                  Table price <span className="text-gray-500">( Table for 6 )</span>
                </label>
                <input id="table_price" type="number" required  autoComplete="table_price" className="form-input" />
                {/* {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>} */}
              </div>

            </div>

            <div className="">
              <label htmlFor="non_member_price" className="form-label">
                Non-member ticket price <span className="text-gray-500">( Fill if open to non registered members )</span>
              </label>
              <input id="non_member_price" type="text" required  autoComplete="non_member_price" className="form-input" />
              {/* {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>} */}
            </div>
          </section>
        </div>


        <div className="py-6 flex justify-end">
          <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Submit"} className="inline-flex w-72 py-3 text-white bg-primary text-base hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none" />
        </div>
      </form>
    </section>
  )
}

export default page