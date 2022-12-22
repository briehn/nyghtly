import "./EmailFormAndList.css";
import { useEffect, useState } from "react";
import jwtFetch from "../../store/jwt";
import { fetchList, getList, createEmail, deleteEmail } from "../../store/emails";
import { useDispatch, useSelector } from "react-redux";
import { getItinerary } from "../../store/itineraries";
import { getVenues } from "../../store/venues";
import { useParams } from "react-router-dom";

function EmailFormAndList() {
  const [mailerState, setMailerState] = useState("");
  const list = useSelector(getList);
  const { itineraryId } = useParams();
  const dispatch = useDispatch();
  const itinerary = useSelector((state) => state.itineraries);
  const currentUser = useSelector((state) => state.session.user);
  const venues = useSelector((state) => Object.values(state.venues));

  useEffect(() => {
    dispatch(fetchList(itineraryId));
  }, [dispatch, itineraryId, list.length]);

  function handleStateChange(e) {
    setMailerState(e.target.value);
  }

  const addEmail = (e) => {
    e.preventDefault();
    dispatch(createEmail(itineraryId, mailerState));
    setMailerState("");
  };

  const handleDelete = (e, email) => {
    e.preventDefault();
    console.log(`Email: ${email._id}`);
    dispatch(deleteEmail(email._id, itineraryId))
    dispatch(fetchList(itineraryId))
  }

  let emailList = list.map((email) => {
    return (
      <div>
        <li>{email.email}</li>
        <button onClick={(e) => handleDelete(e, email)}>Delete</button>
      </div>
    );
  });

  const submitEmail = async (e) => {
    e.preventDefault();
    const emails = list.map((item) => item.email);
    const response = await jwtFetch("/api/itineraries/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        firstName: currentUser.firstName,
        list: emails, 
        title:  itinerary.title,
        activity: venues[0],
        restaurant: venues[1],
        dessertOrBar: venues[2]
      }),
    })
      .then((res) => res.json())
      .then(async (res) => {
        const resData = await res;
        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .then(() => {
        setMailerState({
          email: "",
        });
      });
  };

  return (
    <div id="email-form-list-container">
      <div id="outter-top-email-form-list-container">
        <div id="inner-top-email-form-list-container">
          <div id="email-form-container">
            <h4 id="email-form-list-subheader">Add a friend's email:</h4>
            <form id="add-email-form" onSubmit={addEmail}>
              <input
                type="email"
                placeholder="Add email"
                onChange={handleStateChange}
                value={mailerState}
              />
              <input type="submit" value="Add email" />
            </form>
          </div>
        </div>
        <div id="inner-top-email-form-list-container">
          <h4 id="email-form-list-subheader">Itinerary email list:</h4>
          <ul id="emails-list">{emailList}</ul>
        </div>
      </div>
      <div id="outter-bottom-email-form-list-container">
        <form id="send-email-form" onSubmit={submitEmail}>
          <input type="submit" value="Send emails" />
        </form>
      </div>
    </div>
  );
}

export default EmailFormAndList;
