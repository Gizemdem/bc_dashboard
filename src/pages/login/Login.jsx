import "./login.scss";
import React from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import FormInput from "./FormInput";

const LoginPage = () => {
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const inputs = [
    {
        id: 1,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "",
        label: "Email",
        required: true,
    },
    {
    id: 2,
    name: "password",
    type: "password",
    placeholder: "Password",
    errorMessage:
      "",
    label: "Password",
    pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
    required: true,
    },
    ];  
    const handleSubmit = (e) => {
    e.preventDefault();
    };

    const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    };
    return(
        <div className="login">
            <form className="form" onSubmit={handleSubmit}>
                <h1 className="h1">Welcome to GB</h1>
                {inputs.map((input) => (
                <FormInput
                    key={input.id}
                    {...input}
                    value={values[input.name]}
                    onChange={onChange}
                />
                ))}
                <Link to="/" >
                    <button className="button">Login</button>
                </Link>
            </form>
        </div>
    )
}
export default LoginPage;