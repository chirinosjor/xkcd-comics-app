import Head from 'next/head'
import Header from 'components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { readdirSync, readFileSync, existsSync  } from 'fs';
import { basename } from 'path';
import Layout from 'components/Layout';
import { useI18n } from 'context/i18n';

export default function Comic({ id, img, alt, title, nextId, prevId, hasNext, hasPrev }) {
  const { t } = useI18n();
  return (
    <>      
      <Head>
        <title>{`Comic #${id} - ${title}`}</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h1 className='font-bold mb-2 text-center mt-2'>{title}</h1>
        <div className='max-w-sm m-auto'>
          <Image className='m-auto' src={img} height={300} width={300} alt={alt}/>
        </div>
        <p>{alt}</p>

        <div className='flex justify-between mt-4'>
          {hasPrev ? <Link href={`/comic/${prevId}`} className='text-blue-500'>⬅️ {t('PAGINATION_PREV_BUTTON')}</Link> : `🚫 ${t('PAGINATION_PREV_BUTTON')}`}
          {hasNext ? <Link href={`/comic/${nextId}`} className='text-blue-500'>{t('PAGINATION_NEXT_BUTTON')} ➡️</Link> : `${t('PAGINATION_NEXT_BUTTON')} 🚫`}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths({ locales }) {
  const files = await readdirSync('./comics', () => {});
  let paths = [];

  
  locales.forEach(locale => {
    paths = paths.concat(files.map(file => {
      const id = basename(file, '.json')
      return { params: { id }, locale }
    })
    )
  });
  
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params;
  const content = await readFileSync(`./comics/${id}.json`, 'utf-8', () => {});
  const comic = JSON.parse(content);

  
  const idNumber = parseInt(id);

  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const prevPath = `./comics/${prevId}.json`;
  const nextPath = `./comics/${nextId}.json`;

  const hasPrev = existsSync(prevPath);
  const hasNext = existsSync(nextPath);


  return {
    props:{
      ...comic,
      nextId,
      prevId,
      hasPrev,
      hasNext,
    }
  }
}
