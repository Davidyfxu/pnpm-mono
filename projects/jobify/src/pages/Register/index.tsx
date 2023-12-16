import React, { useEffect, useState } from "react";
import Wrapper from "../../assets/wrappers/RegisterPage";
import { Logo, FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useNavigate } from "react-router-dom";
const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e: Event) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e: Event) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "Register Successful! Redirecting...",
      });
    }
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form onSubmit={onSubmit} className="form">
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {!values.isMember && (
          <FormRow
            type={"text"}
            name={"name"}
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type={"email"}
          name={"email"}
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type={"password"}
          name={"password"}
          value={values.password}
          handleChange={handleChange}
        />
        <button type={"submit"} className="btn btn-block" disabled={isLoading}>
          Submit
        </button>
        <button
          type={"submit"}
          className="btn btn-block"
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: "test@test.com", password: "testtest" },
              endPoint: "login",
              alertText: "Login Successful! Redirecting...",
            });
          }}
        >
          {isLoading ? "loading" : "demo App"}
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type={"button"} onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
