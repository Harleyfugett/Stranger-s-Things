import { useState } from "react"
import { Link } from "react-router-dom"

const AllPosts = (props) => {
    const { posts, setPosts } = props;
    
    const [searchQuery, setSearchQueary] = useState("");

    let filteredPosts = posts.filter((singlePostsElement) => {
        let lowerCase = singlePostsElement.name.toLowerCase();
        console.log(lowerCase)

        return lowerCase.includes(searchQuery.toLowerCase())
    })


    return (
        <div className="postPage">
            <h2>All Products</h2>
        </div>
    )
}

export default AllPosts;