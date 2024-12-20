import Link from 'next/link'

const Button = ({className, children, href}: {className?: string; children: string; href?: string}) => {
  const isLink = !!href;
  const btnClass="inline-flex items-center text-sm py-3 px-6 rounded border border-white bg-white text-nero-black hover:bg-jet-black hover:text-white hover:border-white"

  if(isLink) {
    return <Link href={href} className={`${btnClass} ${className}`}>
    {children}
  </Link>
  } 
    
  
  return (
    <button className={btnClass}>
      {children}
  </button>
  )
}

export default Button