import React, { useState } from "react";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Alert, FormRow } from "../../components";
const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastName, setLastName] = useState(user?.lastName);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!name || !email || !lastName || !location) {
      displayAlert();
      return;
    }
    updateUser({ name, email, lastName, location });
  };
  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type={"text"}
            name={"name"}
            value={name}
            handleChange={(e: HTMLFormElement) => setName(e.target.value)}
          />
          <FormRow
            type={"text"}
            labelText={"last name"}
            name={"lastName"}
            value={lastName}
            handleChange={(e: HTMLFormElement) => setLastName(e.target.value)}
          />
          <FormRow
            type={"email"}
            name={"email"}
            value={email}
            handleChange={(e: HTMLFormElement) => setEmail(e.target.value)}
          />
          <FormRow
            type={"text"}
            name={"location"}
            value={location}
            handleChange={(e: HTMLFormElement) => setLocation(e.target.value)}
          />
          <button
            className="btn btn-block"
            type={"submit"}
            disabled={isLoading}
          >
            {isLoading ? "Please wait ..." : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
