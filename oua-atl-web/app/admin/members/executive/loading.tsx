import TableLoader from '@/app/ui/loaders/TableLoader'

const loading = () => {
  return (
    <section className="bg-white ring-1 ring-gray-950/5 rounded p-6">
        <div className="">
          <TableLoader />
        </div>
      </section>
  )
}

export default loading