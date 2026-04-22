import { useState } from "react";
import "./App.css";

// backend URL env se aayega (fallback localhost)
const API_BASE_URL = "http://a07d9aa1daa8f4c80bd7b5b458f12c77-258176116.ap-south-1.elb.amazonaws.com:8081";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // input change handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      setResponseMessage(data.message);
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Something went wrong");
    }
  };

  return (
    <div className="container">
      <h1>React Form</h1>

      <form onSubmit={handleSubmit} className="form-box">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
      </form>

      {responseMessage && (
        <p className="response">{responseMessage}</p>
      )}
    </div>
  );
}

export default App;
