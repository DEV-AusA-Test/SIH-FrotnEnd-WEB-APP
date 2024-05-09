"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { ILogin } from "@/helpers/types";
import validateLogin from "@/components/loginForm/helpers/validateLogin";
import { formData } from "./helpers/loginFormData";

const LoginForm: React.FC = (): React.ReactElement => {
  const initialState: ILogin = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(initialState);
  const [errors, setErrors] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setData({ ...data, [name]: value });

    setErrors(validateLogin({ ...data, [name]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Estamos trabajando para registrar tu usuario");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formData.map(({ name, type, placeholder }) => {
          return (
            <div key={name}>
              <input
                className="text-black"
                type={type}
                id={name}
                name={name}
                value={data[name as keyof ILogin]}
                placeholder={placeholder}
                onChange={handleChange}
              />
              {errors[name as keyof ILogin] ? (
                <span className="text-black">
                  {errors[name as keyof ILogin]}
                </span>
              ) : null}
            </div>
          );
        })}
        <button
          type="submit"
          disabled={
            data.email.length === 0 ||
            Object.keys(errors).some((e) => errors[e as keyof ILogin])
          }
          className=" bg-black"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
