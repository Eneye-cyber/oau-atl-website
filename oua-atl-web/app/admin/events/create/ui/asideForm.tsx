
const asideForm = () => {
  return (
    <section className="md:col-span-4 space-y-8 p-3 border border-gray-300 rounded-md ">
      <h3 className="text-xl font-semibold">Event Pricing</h3>
      <div className="">
        <label htmlFor="ticket_price" className="form-label">
          Ticket Price *
        </label>
        <input id="ticket_price" type="number" required  autoComplete="ticket_price" className="form-input" />
        {/* {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>} */}
      </div>

      <div className="">
        <label htmlFor="ticket_price" className="form-label">
          Ticket Sale Closing date *
        </label>
        <input id="ticket_price" type="datetie" required  className="form-input" />
        {/* {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>} */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <div className="">
          <label htmlFor="vip_price" className="form-label">
            Vip Ticket Price 
          </label>
          <input id="vip_price" type="number" required  autoComplete="vip_price" className="form-input" />
          {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>}
        </div> */}

      </div>

      {/* <div className="">
        <label htmlFor="non_member_price" className="form-label">
          Non-member ticket price <span className="text-gray-500">( Fill if open to non registered members )</span>
        </label>
        <input id="non_member_price" type="text" required  autoComplete="non_member_price" className="form-input" />
        {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>}
      </div> */}

      {/* <div className="">
        <label htmlFor="ticket_price" className="form-label">
          Ticket Closing date <span className="text-gray-500">( Non members)</span>
        </label>
        <input id="ticket_price" type="datetie" required  className="form-input" />
      </div> */}
    </section>
  )
}

export default asideForm