import React, { useState, useRef } from 'react'
import Link from 'next/link'


function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();
    if (!q) return

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
          <div className='relative z-10'>
            {
              Boolean(results.length) &&  <div className='absolute top-0 left-0'>
                <ul className='w-full border-gray-50 rounded-lg shadow-xl bg-white overflow-hidden'>
                  <li key={"all-results"}>
                    <Link href={`/search?q=${getValue()}`} legacyBehavior>
                      <a className='text-gray-400 italic text-ellipsis overflow-hidden whitespace-nowrap block px-2 py-1 m-0 text-sm font-semibold hover:bg-slate-200'>
                        Ver {results.length} resultados
                      </a>
                    </Link>
                  </li>
                  {results.map(result => {
                    return ( 
                      <li key={result.id}>
                        <Link href={`/comic/${result.id}`} legacyBehavior>
                          <a className='text-ellipsis overflow-hidden whitespace-nowrap block px-2 py-1 m-0 text-sm font-semibold hover:bg-slate-200'>
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