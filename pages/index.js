import fs from 'fs'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import { Container, Card } from "@nextui-org/react";

import styles from '../styles/Home.module.css'
import Layout from 'components/Layout';
import { useI18n } from 'context/i18n';

export default function Home({ latestComics }) {
  const { t } = useI18n();

  return (
    <div className={styles.container}>
      <Head>
        <title>{t('INDEX_PAGE_TITLE')}</title>
        <meta name="description" content="Comics for developers" />
      </Head>
    
      <Layout>
        <h2 className="text-3xl font-bold text-center mb-10">{t('LATEST_COMICS')}</h2>
        <section className="grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {
            latestComics.map((comic) => {
              return (
                <Link key={comic.id} href={`/comic/${comic.id}`} className="m-auto">
                  <Container>
                    <Card className='mb-4 pb-4'>                  
                      <h3 className='font-semibold text-sm text-center pb-2'>{comic.title}</h3>
                      <Image src={comic.img} height={300} width={300} alt={comic.alt}/>                 
                    </Card>
                  </Container>
                </Link>
              )
            })
          }
        </section>
      </Layout>

    </div>
  )
}

export async function getStaticProps(context) {
  const files = await fs.readdirSync('./comics');
  const latestsComicsFiles = files.slice(-8, files.length);

  const promisesReadFiles = latestsComicsFiles.map(async (file) => {
    const content = await fs.readFileSync(`./comics/${file}`, 'utf8');
    return JSON.parse(content);
  })

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics
    }
  }
}