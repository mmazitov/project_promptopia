'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect  } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }
    setUpProviders();
  }, [])
  

  return (
    <nav className="w-full pt-3 mb-16 flex-between">
      <Link href="/" className='flex gap-2 flex-center'>
      <Image 
        src="/assets/images/logo.svg"
        alt="Promptopia Logo" 
        width={30} 
        height={30} 
        className='object-contain'/>
        <p className="logo_text">Promptopia</p>
      </Link>

      
      {/* Desctop Navigation */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className='black_btn'>Create Prompt</Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image 
                src={session?.user.image}
                alt="User Profile" 
                width={37} 
                height={37}
                className='rounded-full'
              />
            </Link>
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
                key={provider.name} 
                type="button" 
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign in with {provider.name}
              </button>
            ))}
          </>
        )}
      </div>
      {/* Mobile Navigation */}
      <div className="relative flex sm:hidden">
      {session?.user ? (
          <div className="flex">
            <Image 
              src={session?.user.image}
              alt="User Profile" 
              width={37} 
              height={37}
              className='rounded-full'
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt" 
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    signOut();
                    setToggleDropdown(false);
                  }}
                  className='w-full mt-5 black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider) => (
              <button 
                key={provider.name} 
                type="button" 
                onClick={() => signIn(provider.id)}
                className="black_btn"
              >
                Sign in with {provider.name}
              </button>
            ))}
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
