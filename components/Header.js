import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { useI18n } from 'context/i18n';


function Header() {
  const [results, setResults] = useState([]);
  const searchRef = useRef();
  const {locale, locales} = useRouter();
  const { t } = useI18n();

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

  const restOfLocales = locales.filter((l) => l !== locale);
  
  return (
  <header>
    <nav>
      <ul className="flex items-center justify-between max-w-xl p-4 m-auto gap-4">
        <li className='flex-none'>
          <h1 className='font-bold'>
            <Link href='/' className="transition hover:opacity-80">      
              next<span className='font-light'>xkcd</span>
            </Link>
          </h1>
        </li>
        <li className='grow'>
          <input 
            className='rounded-lg border-2 px-2 py-1 border-gray-400 w-full' 
            ref={searchRef} 
            type='search' 
            onChange={handleChange}
            placeholder={`🔎 ${t('SEARCH_BAR_PLACEHOLDER')} . . .`} 
          />
          <div className='relative z-10 items-center'>
            {
              Boolean(results.length) &&  <div className='absolute top-0 left-0'>
                <ul className='w-full border-gray-50 rounded-lg shadow-xl bg-white overflow-hidden'>
                  <li key={"all-results"}>
                    <Link href={`/search?q=${getValue()}`} className='text-gray-400 italic text-ellipsis overflow-hidden whitespace-nowrap block px-2 py-1 m-0 text-sm font-semibold hover:bg-slate-200'>
                        {`${t('SEARCH_BAR_SEE')} ${results.length} ${t('SEARCH_BAR_RESULTS')}`}                  
                    </Link>
                  </li>
                  {results.map(result => {
                    return ( 
                      <li key={result.id}>
                        <Link href={`/comic/${result.id}`} className='text-ellipsis overflow-hidden whitespace-nowrap block px-2 py-1 m-0 text-sm font-semibold hover:bg-slate-200'>                       
                            {result.title}                       
                        </Link>
                      </li>
                    )
                  })}   
                </ul>
              </div>
            }
          </div>
        </li>
        <li className='flex-none'>
          <Link href={`/`} className="text-sm font-semibold">
            {t('NABVAR_HOME')}
          </Link>
        </li>
        <li className='flex-none'>
          <Link href={`/`} className="text-sm font-semibold" locale={restOfLocales[0]}>
            🌐  {restOfLocales[0] === 'en' ? '🇺🇸' : '🇪🇸'}
          </Link>
        </li>
      </ul>
    </nav>
  </header>
  )
}

export default Header