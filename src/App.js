import React, { useEffect, useState } from 'react'
import { fetchPieces } from './data/api'
import { rarity } from './data/rarity'
import { getIpfsUrl } from './utils/ipfs';
import { toTezValue } from './utils/numbers';
import ReactLoading from "react-loading";
import InfiniteScroll from 'react-infinite-scroll-component';
import { collections } from './data/constants';

const App = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [collectibles, setCollectibles] = useState([])
  const [sort, setSort] = useState({
    id: 1,
    val: { lowest_ask: "asc_nulls_last" },
    title: 'Price: Low to High'
  })
  const [page, setPage] = useState(1)
  const [collection, setCollection] = useState({
    id: 0,
    val: 'KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6',
    title: 'Tezzards',
    slug: 'tezzards'
  })

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const pieces = await fetchPieces(page, sort.val, collection.val)
        const prepare = []
        for (let i in pieces) {
          const collectible = pieces[i]
          if (collection.id === 0) {
            const r = rarity.find(r => r['#FKR'] === Number(collectible.id)) || {}
            prepare.push({
              ...collectible,
              rank: r["Rank"],
              score: r["Rarity Score"],
              price: collectible.lowest_ask
            })
          } else {
            prepare.push({
              ...collectible,
              price: collectible.lowest_ask
            })
          }

        }
        setCollectibles(prepare)
      } catch {
        setError('Could not fetch collection')
      }
      setLoading(false)
    })()
  }, [sort, page, collection])


  useEffect(() => {
    let errorTimer = setTimeout(() => setError(false), 5000);
    return () => {
      clearTimeout(errorTimer);
    };
  }, [error])

  return (
    <main className="min-h-screen flex flex-col">
      {loading ?
        <section id="loading" className="w-full absolute bg-gray-100 opacity-50 z-10 flex-1 h-full flex flex-col items-center justify-center">
          <ReactLoading type='balls' color="#111827" />
          <p className="text-base text-left font-medium">{loading}</p>
        </section>
        : null}<section id="main" className="w-full flex flex-col items-center pb-16"><div className="container overflow-hidden">
          <div className="w-full flex flex-row justify-center pt-5">
            <span className="mr-2">Collection: </span>
            {collections.map((c) => (
              <button key={c.id} className={`mr-2 ${collection.id === c.id ? 'text-black' : 'text-blue-400 underline'}`} onClick={() => setCollection(c)}>{c.title}</button>
            ))}
          </div>
          <div className="w-full flex flex-row justify-center py-5">
            <span className="mr-2">Sort: </span>
            {[
              {
                id: 0,
                val: { "last_listed": "desc_nulls_last" },
                title: 'Recently Listed'
              },
              {
                id: 1,
                val: { lowest_ask: "asc_nulls_last" },
                title: 'Price: Low to High'
              },
              {
                id: 2,
                val: { lowest_ask: "desc_nulls_last" },
                title: 'Price: High to Low'
              },
            ].map((s, idx) => (
              <button key={idx} className={`mr-2 ${sort.id === s.id ? 'text-black' : 'text-blue-400 underline'}`} onClick={() => setSort(s)}>{s.title}</button>
            ))}
          </div>

          <InfiniteScroll
            dataLength={collectibles.length}
            next={() => setPage(page + 1)}
            hasMore={collectibles.length < 4200}
          >
            <div className="flex flex-row flex-wrap">

              {collectibles.map((col) => (

                <a target="_blank" rel="noreferrer" href={`https://objkt.com/asset/${collection.slug}/${col.id}`} className="w-1/4 p-4 hover:bg-gray-200 relative" key={col.id}>
                  <img className="w-full" src={getIpfsUrl(col.display_uri)} alt={col.id} />
                  <div className="flex flex-row justify-center flex-wrap bg-gray-200 p-3">
                    <div className="text-base text-center font-bold w-full mb-1">
                      {col.title} {collection.id === 8 ? ' - ' + col.id : null}
                    </div>
                    {
                      col.price || col.price === 0 ?
                        <div className="text-base text-center w-1/2">
                          {toTezValue(col.price)} tez
                        </div> :
                        <div className="text-base text-center w-1/2">
                          Not listed
                        </div>
                    }

                    {col.rank ? <div className="text-base text-center w-1/2">
                      Rank: #{col.rank}
                    </div> : null}


                  </div>
                  {col.token_attributes && col.token_attributes.length ? <div className="flex flex-row flex-wrap">
                    {
                      col.token_attributes.map((attr, idx) => (
                        <div key={idx} className="flex flex-col w-1/3 mt-3">
                          <div className="text-sm"><b>{attr.attribute.name}</b></div>
                          <div className="text-sm">{attr.attribute.value}</div>
                        </div>
                      ))
                    }
                  </div> : null}
                </a>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </section>


    </main>
  );
}

export default App;
