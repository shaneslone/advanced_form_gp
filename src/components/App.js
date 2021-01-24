import React, { useState, useEffect } from "react";
import Friend from "./Friend";
import FriendForm from "./FriendForm";
// 🔥 STEP 1- CHECK THE ENDPOINTS USING POSTMAN OR HTTPIE
// 🔥 STEP 2- FLESH OUT FriendForm.js
// 🔥 STEP 3- FLESH THE SCHEMA IN ITS OWN FILE
// 🔥 STEP 4- IMPORT THE SCHEMA, AXIOS AND YUP
import axios from "axios";
import * as yup from "yup";
import schema from "../validation/formSchema";

//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: "",
  email: "",
  ///// DROPDOWN /////
  role: "",
  ///// RADIO BUTTONS /////
  civil: "",
  ///// CHECKBOXES /////
  hiking: false,
  reading: false,
  coding: false,
};
const initialFormErrors = {
  username: "",
  email: "",
  role: "",
  civil: "",
};
const initialFriends = [];
const initialDisabled = true;

export default function App() {
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  const [friends, setFriends] = useState(initialFriends); // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues); // object
  const [formErrors, setFormErrors] = useState(initialFormErrors); // object
  const [disabled, setDisabled] = useState(initialDisabled); // boolean

  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  const getFriends = () => {
    // 🔥 STEP 5- IMPLEMENT! ON SUCCESS PUT FRIENDS IN STATE
    //    helper to [GET] all friends from `http://localhost:4000/friends`
    axios
      .get(`http://localhost:4000/friends`)
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        debugger;
        alert(`Got an error there bud.`);
      });
  };

  const postNewFriend = (newFriend) => {
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED FRIEND TO STATE
    //    helper to [POST] `newFriend` to `http://localhost:4000/friends`
    //    and regardless of success or failure, the form should reset
    axios
      .post("http://localhost:4000/friends", newFriend)
      .then((res) => {
        setFriends([res.data, ...friends]);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  const inputChange = (name, value) => {
    // 🔥 STEP 10- RUN VALIDATION WITH YUP

    // yup.reach will allow us to "reach" into the schema and test only one part.
    // We give reach the schema as the first argument, and the key we want to test as the second.

    yup
      .reach(schema, name) // get to this part of the schema
      //we can then run validate using the value
      .validate(value) // validate this value
      .then(() => {
        // happy path and clear the error
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      // if the validation is unsuccessful, we can set the error message to the message
      // returned from yup (that we created in our schema)
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          // validation error from schema
          [name]: err.errors[0],
        });
      });

    setFormValues({
      ...formValues,
      [name]: value, // NOT AN ARRAY
    });
  };

  const formSubmit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      civil: formValues.civil.trim(),
      // 🔥 STEP 7- WHAT ABOUT HOBBIES?
      hobbies: ["coding", "reading", "hiking"].filter(
        (hobby) => formValues[hobby]
      ),
    };
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewFriend(newFriend);
  };

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getFriends();
  }, []);

  useEffect(() => {
    // 🔥 STEP 9- ADJUST THE STATUS OF `disabled` EVERY TIME `formValues` CHANGES
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="container">
      <header>
        <h1>Friends App</h1>
      </header>

      <FriendForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {friends.map((friend) => {
        return <Friend key={friend.id} details={friend} />;
      })}
    </div>
  );
}
