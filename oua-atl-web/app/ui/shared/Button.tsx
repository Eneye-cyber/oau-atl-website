
const Button = ({children}: { children: string}) => {
  return (
    <button className="inline-flex items-center text-sm py-3 px-6 rounded border border-white bg-white text-nero-black hover:bg-jet-black hover:text-white hover:border-white">
      {children}
    </button>
  )
}

export default Button