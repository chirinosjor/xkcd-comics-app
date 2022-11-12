import algoliasearch from "algoliasearch";  

const client = algoliasearch("QFLKE8K6OG", "90555659ecd89d2518e95e0f6579ca75");
const index = client.initIndex("prod_comics");

const CACHE = {};

export const search = async ({ query }) => {
  if (Cache[query]) return { results: CACHE[query] };

  const { hits } = await index.search(query, {
    hitsPerPage: 10,
    attributesToRetrieve: ["id", "title", "img", "alt"],
  });

  return { results: hits };
}