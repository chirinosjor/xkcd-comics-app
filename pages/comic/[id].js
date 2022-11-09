import Head from 'next/head'
import Header from 'components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { readdirSync, readFileSync, statSync } from 'fs';
import { basename } from 'path';
import Layout from 'components/Layout';

export default function Comic({ id, img, alt, title, nextId, prevId, hasNext, hasPrev }) {
  return (
    <>      
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h1 className='font-bold mb-2 text-center mt-2'>{title}</h1>
        <div className='max-w-sm m-auto'>
          <Image layout='responsive' className='m-auto' src={img} height={300} width={300} alt={alt}/>
        </div>
        <p>{alt}</p>

        <div className='flex justify-between mt-4'>
          {hasPrev && <Link href={`/comic/${prevId}`} className='text-blue-500'>⬅️ Previous</Link>}
          {hasNext && <Link href={`/comic/${nextId}`} className='text-blue-500'>Next ➡️</Link>}
        </div>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const files = await readdirSync('./comics');

  const paths = files.map(file => {
    const id = basename(file, '.json');
    return { params: { id } }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const { id } = params;
  const content = await readFileSync(`./comics/${id}.json`, 'utf-8');
  const comic = JSON.parse(content);

  const idNumber = parseInt(id);
  const prevId = idNumber - 1;
  const nextId = idNumber + 1;

  const [ prevResult, nextResult ] = await Promise.allSettled([
    statSync(`./comics/${prevId}.json`),
    statSync(`./comics/${nextId}.json`)
  ])

  const hasPrev = prevResult.status === 'fulfilled';
  const hasNext = nextResult.status === 'fulfilled';

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
