import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { AllPosts, SingleProducts } from "./components/Index";

const App = () => {
    const [posts, setPosts] = useState([]);

    // const [loggedIn, setLoggedIn] = useState(false);
    // const [updateState, setUpdateState] = useState(false);

    const COHORT_NAME = "2301-ftb-mt-web-ft";
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    async function fetchPosts() {
        try {
            const response = await fetch(`${BASE_URL}/posts`);
            const transData = await response.json();
            setPosts(transData.data.posts);

        }   catch(e) {
                console.log(e)
        }
    }

    useEffect(() => {
        try {
        fetchPosts();
        } catch (e) {
            console.log(e); 
        }
    }, [])


    return (
        <BrowserRouter>
            <div>
                <nav>
                    <Link to="/">Homepage</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<AllPosts postsProps={posts} />}></Route>
                    <Route path="/:id" element={<SingleProducts />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

createRoot(document.getElementById("app")).render(<App />)