import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [ loginUser, setLoginUser ] = useState("");
    const [ loginData, setLoginData ] = useState("");

    const nav = useNavigate();

    const COHORT_NAME = "2301-FTB-MT-WEB-FT";
    const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

    async function logIn(event) {
        event.preventDefault();
        try {
            if (loginUser.length < 1) {
                alert ("Username cannot be less than 1")
                return;
            } else if (loginData.length < 4) {
                alert ("Password is too short, 4 characters minimum")
                return;
            };

            const response = await fetch (`${BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: loginUser,
                        password: loginData
                    }
                })
            });

            const transData = await response.json();
            if (!transData.success) {
                alert("Login unsuccessful, please try again.");
            } else {
                const tokenKey = transData.data.token;
                localStorage.setItem("token", tokenKey);
                alert("Your logged in!");

                setLoginUser("")
                setLoginData("")
                nav("/Homepage")
            }
        } catch (e) {
            console.log(e)
        }
    }
    
    return (
        <div>
            <h2>Sign In</h2>
            <form onSubmit={ logIn }>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(event) => setLoginUser(event.target.value)}
                />
                <input
                    type="text"
                    placeholder="Password"
                    onChange={(event) => setLoginData(event.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;