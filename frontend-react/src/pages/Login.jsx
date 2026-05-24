import "../assets/css/auth.css";

function Login() {
  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Sign In</h1>

        <form>

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

          <button>
            Sign In
          </button>

        </form>

        <p>
          Don't have an account?
          <span> Sign Up</span>
        </p>

      </div>

    </div>
  );
}

export default Login;