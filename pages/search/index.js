import Head from 'next/head'
import Layout from 'components/Layout';
import { search } from 'services/search';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from 'context/i18n';

export default function Search({query, results}) {
  const { t } = useI18n();
  return (
  <>      
  <Head>
    <title>xkcd - Result for { query }</title>
    <meta name="description" content={`Search Results for ${query}`} />
  </Head>

  <Layout>
    <h1>{t('SEARCH_RESULTS_TITLE', results.length, query)}</h1>
    {
      results.map((comic) => {
        return (
          <Link href={`/comic/${comic.id}`} key={comic.id} className="flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-50">
            <Image width={100} height={100} src={comic.img} alt={comic.alt} className="rounded-full" />
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{comic.title}</h2>
            </div>
          </Link>
        )})}
  </Layout>
  </>
)}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = '' } = query;

  const { results } = await search({ query: q });

  return {
    props: {
      query: q,
      results,
    },
  };
}