import ImageUploader from "./../ui/ImageUploader"

const page = () => {
  const isSubmitting = false;
  return (
    <article className="p-6 container space-y-6 flex-1 flex flex-col">
      {/* <div className="flex items-end justify-between py-6">
        <div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Gallery</span>
            <span> <FaChevronRight /> </span>
            <span>List</span>
          </div>
          <h1 className="text-2xl font-semibold">Photo Albums</h1>
        </div>

      </div> */}


      <section className="bg-white ring-1 ring-gray-950/5 rounded p-3 sm:p-6 flex-1">
        <section className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mb-6">
          <h3 className="text-xl font-semibold sm:col-span-6">Update album</h3>
          <div className="border border-slate-200 sm:col-span-6"></div>
          <div className="sm:col-span-3">
            <label htmlFor="location" className="form-label">
              Album name *
            </label>
            <input id="name" type="text" required defaultValue={"Convention 2019"}  autoComplete="location" className="form-input" />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="event_image" className="form-label">
              Album cover image
            </label>
            <input id="event_image" type="file" className="form-input" />
            {/* {errors.subject?.message && <p className="text-sm text-red-400">{errors.subject.message}</p>} */}
          </div>

        </section>
        <ImageUploader />

        
      </section>

      <div className="py-6 flex justify-end">
          <input type="submit" disabled={isSubmitting} value={isSubmitting ? 'Loading...' : "Update"} className="inline-flex w-72 py-3 text-white bg-primary text-base hover:bg-jet-black cursor-pointer disabled:opacity-40 disabled:pointer-events-none" />
        </div>
    </article>
  )
}

export default page