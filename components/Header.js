import React, { useState, useRef } from 'react'
import Link from 'next/link'


function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const handleChange = () => {
    const q = searchRef.current.value;

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
      });
  };


  return (
  <header className='flex items-center justify-between max-w-xl p-4 m-auto'>
    <h1 className='font-bold'>
      <Link href='/' legacyBehavior>
        <a className="transition hover:opacity-80">
          next<span className='font-light'>xkcd</span>
        </a>
      </Link>
    </h1>

    <nav>
      <ul className="flex flex-row gap-2">
        <li>
          <Link href={`/`} legacyBehavior>
            <a className="text-sm font-semibold">Home</a>
          </Link>
        </li>
        <li>
          <input 
            className='rounded-lg border-2 px-2 py-1 border-gray-400' 
            ref={searchRef} 
            type='search' 
            onChange={handleChange} 
          />
          <div className='relative'>
            {
              Boolean(results.length) &&  <div className='absolute top-0 left-0'>
                <ul className='w-full border-gray-50 rounded-lg shadow-xl'>
                  {results.map(result => {
                    return ( 
                      <li key={result.id}>
                        <Link href={`/comic/${result.id}`} legacyBehavior>
                          <a className='px-2 py-1 m-0 text-sm font-semibold hover:bg-slate-200'>
                            {result.title}
                          </a>
                        </Link>
                      </li>
                    )
                  })}   
                </ul>
              </div>
            }
          </div>
        </li>
      </ul>
    </nav>

  </header>
  )
}

export default Header