import axios from 'axios'

export const fetchPieces = async (page, order, collectionId) => {
  const fetchGraphQL = async () => {
    const result = await axios.post(
      "https://api.objkt.com/v1/graphql",
      JSON.stringify({
        "operationName":
          "GetObjktsPaged",
        "variables":
        {
          "where": {
            "creator_id": {}, "fa2_id": { "_in": [collectionId] }, "supply": { "_gt": "0" },
            "artifact_uri": { "_neq": "" }, "_or": [{ "title": {} }, { "creator_id": {} },
            { "creator": { "alias": {} } }, { "creator": { "tzdomain": {} } }, { "id": { "_eq": "-1" } }]
          },
          "order_by": order,
          "limit": page * 24, "offset": 0
        },
        "query": "query GetObjktsPaged($where: token_bool_exp = {}, $order_by: [token_order_by!] = {}, $limit: Int!, $offset: Int!) {\n  token(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {\n    ...TokenDefault\n    __typename\n  }\n  token_aggregate(where: $where) {\n    aggregate {\n      count\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment TokenDefault on token {\n  id\n  artifact_uri\n  creator_id\n  description\n  display_uri\n  thumbnail_uri\n  fa2_id\n  royalties\n  supply\n  timestamp\n  title\n  mime\n  last_listed\n  highest_bid\n  lowest_ask\n  creator {\n    ...UserDefault\n    __typename\n  }\n  token_attributes {\n    attribute {\n      name\n      type\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment UserDefault on holder {\n  address\n  alias\n  site\n  twitter\n  description\n  tzdomain\n  __typename\n}\n"
      })
  
    );


    return await result
  }

  const { data } = await fetchGraphQL();
  return data.data.token
}

