import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const SingleProducts = (props) => {
    const { posts, setPosts, loggedIn, updateState, setUpdateState, fetchPosts} = props;

    const { _id } = useParams();

    const [ editState, setEditState ] = useState(false);
    const [ replyState, setReplyState ] = useState(false);
    const [ replyContent, setReplyContent ] = useState("");
    const [ deleteState, setDeleteState ] = useState([]);

    let filteredPosts = props.posts.filter((singlePosts) => {
        return singlePosts._id == _id
    });

    const [ newPostsTitle, setNewPostsTitle ] = useState(
        filteredPosts.length ? filteredPosts[0].title : ""
    );
    const [ newPostsD, setNewPostsD] = useState (
        filteredPosts.length ? filteredPosts[0].description : ""
    );

    const nav = useNavigate();

    const COHORT_NAME = "2301-FTB-MT-WEB-FT";
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const tokenKey = localStorage.getItem("token");

    function editToggle() {
        setEditState(!editState)
    };
    function replyToggle() {
        setReplyState(!replyState)
    };
    function newRequest() {
        setUpdateState(!updateState)
    };

    useEffect(() => {
        fetchPosts();
    }, [])

    return (
        <div>
            <h3>More details on product</h3>
        </div>
    )
}

export default SingleProducts;