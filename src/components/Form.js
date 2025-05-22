import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import logo from "../assets/logo.jpeg";
import "./Form.css";

const particlesConfig = {
  particles: {
    number: { value: 60, density: { enable: true, value_area: 1000 } },
    color: { value: ["#344455", "#ffffff"] },
    shape: {
      type: "edge",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
    },
    opacity: { value: 0.5 },
    size: { value: 4, random: true },
    line_linked: {
      enable: true,
      distance: 50,
      color: "#fff",
      opacity: 0.5,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      out_mode: "out",
    },
  },
  retina_detect: true,
};

const countryCityMap = {
  India: ["Delhi", "Mumbai", "Bangalore"],
  USA: ["New York", "Los Angeles", "Chicago"],
};

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneCode: "+91",
    phoneNumber: "",
    country: "",
    city: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.username) newErrors.username = "Required";
    if (!formData.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!formData.password) newErrors.password = "Required";
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone";
    if (!formData.country) newErrors.country = "Required";
    if (!formData.city) newErrors.city = "Required";
    if (!formData.pan || !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formData.pan))
      newErrors.pan = "Invalid PAN";
    if (!formData.aadhar || !/^\d{12}$/.test(formData.aadhar))
      newErrors.aadhar = "Invalid Aadhar";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/success", { state: formData });
    }
  };

  return (
    <div className="page-container">
      <Particles
        className="particles"
        options={particlesConfig}
      />

      <form onSubmit={handleSubmit} className="form-container">
        <img src={logo} alt="Logo" className="logo" />
        <h2>Registration Form</h2>

        {[
          "firstName",
          "lastName",
          "username",
          "email",
          "pan",
          "aadhar",
        ].map((field) => (
          <div className="form-group" key={field}>
            <label>
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            <div className="error">{errors[field]}</div>
          </div>
        ))}

        <div className="form-group">
          <label>Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="checkbox-group">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              id="showPass"
            />
            <label htmlFor="showPass"> Show Password</label>
          </div>
          <div className="error">{errors.password}</div>
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <div className="phone-inputs">
            <input
              name="phoneCode"
              value={formData.phoneCode}
              onChange={handleChange}
              style={{ width: "80px" }}
            />
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{ flex: 1 }}
            />
          </div>
          <div className="error">{errors.phoneNumber}</div>
        </div>

        <div className="form-group">
          <label>Country:</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {Object.keys(countryCityMap).map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div className="error">{errors.country}</div>
        </div>

        <div className="form-group">
          <label>City:</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.country}
          >
            <option value="">Select</option>
            {(countryCityMap[formData.country] || []).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div className="error">{errors.city}</div>
        </div>

        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
