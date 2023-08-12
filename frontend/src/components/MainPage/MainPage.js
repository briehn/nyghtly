import "./MainPage.css";
import fillerImage from "../../assets/images/venue_filler_img.jpeg";
import React, { useState, useEffect } from "react";
import Randomizer from "./Randomizer";
import { clearVenues } from "../../store/venues";
import { clearItinerary } from "../../store/itineraries";
import { useDispatch } from "react-redux";

function MainPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    dispatch(clearVenues());
    dispatch(clearItinerary());
  }, []);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const changeLabel = () => {
    setChecked(!checked);
    const dessert = document.querySelector(".toggle-switch-label-desserts");
    const drink = document.querySelector(".toggle-switch-label-drinks");
    if (!checked) {
      dessert.style.fontWeight = "bold";
      drink.style.fontWeight = "normal";
    } else if (checked) {
      drink.style.fontWeight = "bold";
      dessert.style.fontWeight = "normal";
    }
  };

  // midtown is default neighborhood
  const [neighborhood, setNeighborhood] = useState("default");

  const titleizedNeighborhoods = {
    default: "Select A Neighborhood",
    midtown: "Midtown",
    village: "The Village",
    harlem: "Harlem",
    williamsburg: "Williamsburg",
  };

  return (
    <>
      <main id="main-page-container">
        {neighborhood !== "default" && (
          <>
            <div id="main-page-customization-container">
              <div id="main-page-dropdown-container">
                <button onClick={openMenu} id="select-neighborhood-button">
                  {titleizedNeighborhoods[neighborhood]}
                </button>
                {showMenu && (
                  <ul className="neighborhood-dropdown">
                    <li onClick={() => setNeighborhood("midtown")}>Midtown</li>
                    <li onClick={() => setNeighborhood("village")}>
                      The Village
                    </li>
                    <li onClick={() => setNeighborhood("harlem")}>Harlem</li>
                    <li onClick={() => setNeighborhood("williamsburg")}>
                      Williamsburg
                    </li>
                  </ul>
                )}
              </div>
              <div className="toggle-container">
                <div
                  className="toggle-switch-label toggle-switch-label-drinks"
                  style={{ fontWeight: "bold" }}
                >
                  Drinks
                </div>
                <div className="toggle-switch">
                  <div className="inner-toggle-switch-container">
                    <input
                      type="checkbox"
                      className="checkbox"
                      name="drinks"
                      id="drinks"
                      defaultChecked={checked}
                      onChange={changeLabel}
                    />
                    <label className="label" htmlFor="drinks">
                      <span className="inner" />
                      <span className="switch" />
                    </label>
                  </div>
                </div>
                <div className="toggle-switch-label toggle-switch-label-desserts">
                  Dessert
                </div>
              </div>
            </div>
            <h2 id="main-page-subheader">
              Your proposed plan for the night in{" "}
              {titleizedNeighborhoods[neighborhood]}:
            </h2>
          </>
        )}
        {neighborhood === "default" && (
          <>
            <h2 id="main-page-subheader">Please Select A Neighborhood</h2>
            <div id="main-page-customization-container default-loc">
              <div id="main-page-dropdown-container">
                <button onClick={openMenu} id="select-neighborhood-button">
                  Select a Neighborhood
                </button>
                {showMenu && (
                  <ul className="neighborhood-dropdown">
                    <li
                      className="dropdown-item"
                      onClick={() => setNeighborhood("midtown")}
                    >
                      Midtown
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setNeighborhood("village")}
                    >
                      The Village
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setNeighborhood("harlem")}
                    >
                      Harlem
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setNeighborhood("williamsburg")}
                    >
                      Williamsburg
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
        <Randomizer isDessert={checked} neighborhood={neighborhood} />
      </main>
    </>
  );
}

export default MainPage;
