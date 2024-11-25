const page = () => {
  const isSubmitting = false;

  return (
    <article className="space-y-6 flex-1 flex flex-col">
      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 ">
        <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <h3 className="text-xl font-semibold sm:col-span-6">Executive Details</h3>
          
          <div className="sm:col-span-3">
            <label htmlFor="event_name" className="form-label">
              Full name *
            </label>
            <input id="event_name" type="text"  autoComplete="event_name" className="form-input" />
            {/* {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>} */}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="event_image" className="form-label">
              Profile picture *
            </label>
            <input id="event_image" type="file" className="form-input" />
            {/* {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>} */}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="event_name" className="form-label">
              Course of Study *
            </label>
            <input id="event_name" type="text"  autoComplete="event_name" className="form-input" />
            {/* {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>} */}
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="event_name" className="form-label">
              Graduating year *
            </label>
            <input id="event_name" type="text"  autoComplete="event_name" className="form-input" />
            {/* {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>} */}
          </div>


          <div className="sm:col-span-6">
            <label htmlFor="location" className="form-label">
              Bio Summary *
            </label>
            <input id="location" type="text" required  autoComplete="location" className="form-input" />
            {/* {errors.email?.message && <p className="text-sm text-red-400">{errors.email.message}</p>} */}
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="event_description" className="form-label">
              Full Summary 
            </label>
            <textarea id="event_description" required  className="form-input" />
            {/* {errors.message?.message && <p className="text-sm text-red-400">{errors.message.message}</p>} */}
          </div>



        </section>

        <div className="py-6 flex justify-end">
          <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Submit"} className="inline-flex w-72 py-3 text-white bg-primary text-base hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none" />
        </div>
      </section>
    </article>
  )
}

export default page