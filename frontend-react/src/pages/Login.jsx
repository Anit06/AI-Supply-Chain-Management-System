import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../assets/css/auth.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "role",
        data.user.role
      );

      localStorage.setItem(
        "name",
        data.user.name
      );

      if (
        data.user.role === "admin" ||
        data.user.role === "administrative_user"
      ) {
        navigate("/admin");
      }
      else if (data.user.role === "user") {
        navigate("/shopkeeper");
      }
      else {
        alert("Invalid User Role");
      }

    } catch (error) {
      console.error(error);

      alert("Login Failed");
    }

    setLoading(false);
  };

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Sign In</h1>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

        </form>

        <p>
          Don't have an account?

          <Link to="/register">
            <span> Sign Up</span>
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;