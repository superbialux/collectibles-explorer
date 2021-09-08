import axios from 'axios'

export const fetchPieces = async (page, order) => {
  const fetchGraphQL = async () => {
    const result = await axios.post(
      "https://api.objkt.com/v1/graphql",
      JSON.stringify({ 
        "operationName": 
        "GetObjktsPaged", "variables": 
        { "where": { "creator_id": {}, "fa2_id": 
        { "_in": ["KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6"] }, 
        "supply": { "_gt": "0" }, 
        "_or": [{ "title": {} }, 
        { "creator_id": {} }, { "creator": { "alias": {} } }, { "creator": { "tzdomain": {} } }, { "id": { "_eq": -1 } }] }, 
        "order_by": order, 
        "limit": page * 24, "offset": 0 }, "query": "query GetObjktsPaged($where: objkt_token_bool_exp = {}, $order_by: [objkt_token_order_by!] = {}, $limit: Int!, $offset: Int!) {\n  objkt_token(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {\n    ...TokenDefault\n    ...TokenMarket\n    __typename\n  }\n  objkt_token_aggregate(where: $where) {\n    aggregate {\n      count\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment TokenDefault on objkt_token {\n  id\n  artifact_uri\n  creator_id\n  description\n  display_uri\n  thumbnail_uri\n  fa2_id\n  royalties\n  supply\n  timestamp\n  title\n  mime\n  last_listed\n  creator {\n    ...UserDefault\n    __typename\n  }\n  token_attributes {\n    attribute {\n      name\n      type\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment UserDefault on objkt_holder {\n  address\n  alias\n  site\n  twitter\n  description\n  tzdomain\n  __typename\n}\n\nfragment TokenMarket on objkt_token {\n  english_auctions(where: {status: {_eq: \"active\"}}) {\n    ...EnglishAuctionDefault\n    __typename\n  }\n  dutch_auctions(where: {status: {_eq: \"active\"}}) {\n    ...DutchAuctionDefault\n    __typename\n  }\n  bids(order_by: {price: desc}, where: {status: {_eq: \"active\"}}) {\n    ...BidDefault\n    __typename\n  }\n  asks(order_by: {price: asc}, where: {status: {_eq: \"active\"}}) {\n    ...AskDefault\n    __typename\n  }\n  swaps(\n    order_by: {price: asc}\n    where: {status: {_eq: \"active\"}, contract_version: {_gt: 1}, is_valid: {_eq: true}}\n  ) {\n    ...SwapDefault\n    __typename\n  }\n  __typename\n}\n\nfragment EnglishAuctionDefault on objkt_obj_english_auction {\n  id\n  hash\n  fa2_id\n  price_increment\n  reserve\n  royalties\n  start_time\n  status\n  end_time\n  timestamp\n  token_id\n  update_level\n  update_timestamp\n  hash\n  artist {\n    ...UserDefault\n    __typename\n  }\n  bids {\n    ...EnglishAuctionBidsDefault\n    __typename\n  }\n  __typename\n}\n\nfragment EnglishAuctionBidsDefault on objkt_obj_english_bid {\n  amount\n  bidder {\n    ...UserDefault\n    __typename\n  }\n  bidder_id\n  id\n  timestamp\n  __typename\n}\n\nfragment DutchAuctionDefault on objkt_obj_dutch_auction {\n  id\n  hash\n  fa2_id\n  buy_price\n  start_price\n  end_price\n  end_time\n  royalties\n  start_time\n  status\n  timestamp\n  token_id\n  update_level\n  update_timestamp\n  hash\n  artist {\n    ...UserDefault\n    __typename\n  }\n  buyer {\n    ...UserDefault\n    __typename\n  }\n  __typename\n}\n\nfragment BidDefault on objkt_obj_bid {\n  id\n  price\n  royalties\n  status\n  timestamp\n  token_id\n  update_timestamp\n  fa2_id\n  artist {\n    ...UserDefault\n    __typename\n  }\n  creator {\n    ...UserDefault\n    __typename\n  }\n  seller {\n    ...UserDefault\n    __typename\n  }\n  __typename\n}\n\nfragment AskDefault on objkt_obj_ask {\n  id\n  amount\n  amount_left\n  price\n  royalties\n  status\n  timestamp\n  token_id\n  update_timestamp\n  fa2_id\n  artist {\n    ...UserDefault\n    __typename\n  }\n  creator {\n    ...UserDefault\n    __typename\n  }\n  __typename\n}\n\nfragment SwapDefault on objkt_hen_swap {\n  id\n  amount\n  amount_left\n  price\n  royalties\n  status\n  timestamp\n  token_id\n  creator {\n    ...UserDefault\n    __typename\n  }\n  __typename\n}\n" })
    );

    return await result
  }

  const { data } = await fetchGraphQL();
  return data.data.objkt_token
}

