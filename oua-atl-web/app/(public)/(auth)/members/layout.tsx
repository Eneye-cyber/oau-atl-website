

export default function MemberAuthLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className='flex-column h-full min-h-dvh'>
        <div className='flex flex-1 justify-center items-center py-10 bg-gradient-to-t bg-opacity-50 from-gray-300/50 to-gray-100/20'>
          {children}
        </div>
      </main>
    </>
  )
}