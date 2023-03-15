import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = (props) => {
    const [ data, setData ] = useState([]);
    const [ myPosts, setMyPosts ] = useState([]);
    const [ messageData, setMessageData ] = useState([]);

    const COHORT_NAME = '2301-FTB-MT-WEB-FT';
    const BASE_URL = `https://stangers-things.herokuapp.com/api/${COHORT_NAME}`;
    const tokenKey = localStorage.getItem("token");

    useEffect(() => {
        if (localStorage.getItem("token")) {
            props.setLoggedIn(true);
            fetchData();
        } else {
            props.setLoggedIn(False);
            console.log("No Token");
        };
    }, [])

    async function fetchData() {
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenKey}`,
                }
            });
            const transData = await response.json();
            setData(transData.data);
            setMyPosts(transData.data.posts);
            setMessageData(transData.data.messages);
        } catch(e) {
            console.log(e);
        }
    }

    return (
        <div className="homepage">
            <div>
                {
                    props.loggedIn ? (
                        <div className="mainpage">
                            <div className="homeHeader">
                                <h2>Hello { data.username } , these are nearby listings</h2>
                            </div>
                            <div className="homeDisplayArea">

                                <h2 id="myPostsTitle">My Current Posts</h2>
                                <div className="myPostArea">
                                    {
                                        myPosts.length ?
                                        myPosts.map((singlePost) => {
                                            return (
                                                <div key={singlePost._id} className="myPosts">
                                                    <div>
                                                        Name: <Link to={`/${singlePost._id}`}> { singlePost.title }</ Link>
                                                    </div>
                                                    <div>
                                                        Created: { singlePost.createdAt }
                                                    </div>
                                                </div>
                                            )
                                        })
                                        : <div>
                                            No data available
                                        </div>
                                    }
                                </div>

                                <h2 id="myMessagesTitle">Current Messages</h2>
                                <div className="myMessageSection">
                                    {
                                        messageData.length ? 
                                        messageData.map((singleMessage) => {
                                            return (
                                                <section key={singleMessage._id} className="messageData">
                                                    <div>
                                                        From: { singleMessage.fromUser.username }
                                                    </div>
                                                    <div>
                                                        Message: { singleMessage.content }
                                                    </div>
                                                    <div>
                                                        Regarding: <Link to={`/${singleMessage.post.id}`}>{ singleMessage.post.title } </ Link>
                                                    </div>
                                                </section>
                                            )
                                        }): <div>
                                                No data available
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    ):
                    <div>
                        <h2>In order to post, please make an account or sign into an already existing one</h2>
                        <p>Elsewise feel free to browse all postings under the Post tab</p>
                    </div>
                }
            </div>
        </div>
    )
}
export default Homepage;