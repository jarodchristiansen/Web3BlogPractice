import { createClient } from "urql";
import { useEffect, useState } from "react";
import {getPostByName, getSubgraphData} from "../blogcms/urql";
import Link from 'next/link'


function SubgraphLoader() {

  const [result, setResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [noResultsFound, setNoResultsFound] = useState(false);

    useEffect(() => {
    // getSubgraphData().then(data => {
    //         console.log(data.data.posts);
    //         setResult(data.data.posts);
    //     });
    //
    //     getPostByName().then(data => {
    //         console.log(data.data.postSearch);
    //         setResult(data.data.postSearch);
    //     });
    }, [])


    const handleInput = (e) => {
        console.log('this is handleINput', e.target.value);
        setSearchValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue) {
            try {
                getPostByName(searchValue).then(data => {
                    console.log('this is the searchdata', data.data.postSearch);
                    if (data?.data?.postSearch?.length > 1) {
                        setResult(data.data.postSearch);
                    } else {
                        setNoResultsFound(true);
                        setResult([{id: 'no results found', title: 'no results found', postContent: 'no results found'}]);
                    }
                });
            } catch (e) {
                setNoResultsFound(true);
                console.log(e);
            }
        }
    }

    return (
        <div>
            <h1>Subgraph Loader</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" onChange={(e) => handleInput(e)}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
            <div>
                {result?.length > 0 && result.map((post, index) => (
                    <Link href={`/post/${post.contentHash}`} key={index}>
                    <div key={post.id}>
                        <h2>{post.title} - {post.id}</h2>
                        <p>{post.postContent}</p>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SubgraphLoader;