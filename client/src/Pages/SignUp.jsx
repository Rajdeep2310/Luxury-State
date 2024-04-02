import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "./OAuth"
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    //
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setIsLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        setError(data.message);
        setIsLoading(false);
        return;
      }
      setIsLoading(false);
      setError(null);
      navigate("/signin")
      console.log(data);
    }catch(error){
      setIsLoading(false);
      setError(error.message);
    }

  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign-Up</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter username..."
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter e-mail..."
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Enter password..."
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-80"
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account ?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default SignUp;
