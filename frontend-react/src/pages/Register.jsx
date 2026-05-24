import "../assets/css/auth.css";

function Register() {
  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Sign Up</h1>

        <form>

          <input
            type="text"
            placeholder="Enter Name"
          />

          <input
            type="email"
            placeholder="Enter Email"
          />

          <input
            type="password"
            placeholder="Enter Password"
          />

          <button>
            Sign Up
          </button>

        </form>

        <p>
          Already have an account?
          <span> Sign In</span>
        </p>

      </div>

    </div>
  );
}

export default Register;