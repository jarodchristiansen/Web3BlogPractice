import { createClient } from 'urql'

const APIURL = 'https://api.thegraph.com/subgraphs/name/jarodchristiansen/blogcms'

const tokensQuery = `
  query {
    posts {
    id
    title
    contentHash
    published
    postContent
    }
  }
`

const client = createClient({
    url: APIURL,
})



export async function getSubgraphData() {
    const data = await client.query(tokensQuery).toPromise()
    return data
};

export async function getPostByName(searchValue) {
    const tokensQuery = `
         query {
        postSearch(
            text: "${searchValue}"
    ) {
        id
        title
        contentHash
        published
        postContent
    }
        }
`
    const data = await client.query(tokensQuery).toPromise()
    if (!data) {
       return 'No post found'
    } else {
        return data
    }
};

