import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import slice from "../../redux_model/reducer";
import { NotificationManager } from "react-notifications";

import Calendar from "react-calendar";
import "./Calendar.css";

import BackgroundParticles from "../../components/particles";
import { Underline } from "../../components/theme";
import { Button1 } from "../../components/theme";
import faq_icon from "../../assets/img/faq.png";
import NoServiceIcon from "../../assets/img/noService.webp";

import Header from "../../components/header";
import Footer from "../../components/footer";

import "../../main.css";

const CalendarPage = () => {
  const dispatch = useDispatch();
  const update = (json) => dispatch(slice.actions.update(json));

  const [selected, setSelected] = useState(false);

  const [date, setDate] = useState(new Date());
  const [services, setServices] = useState([]);
  const [theServices, setTheServices] = useState([]);
  const [showServices, setShowServices] = useState([]);
  const [showCurrentTime, setShowCurrentTime] = useState("");

  useEffect(() => {
    setInterval(() => {
      const currentDate = new Date();
      const currentTime =
        currentDate.getFullYear() +
        "-" +
        currentDate.getMonth() +
        1 +
        "-" +
        currentDate.getDate() +
        " " +
        currentDate.getHours() +
        ":" +
        currentDate.getMinutes() +
        ":" +
        currentDate.getSeconds();
      setShowCurrentTime(currentTime);
    }, 1000);
    axios
      .get(process.env.REACT_APP_PROXY + `/services/`)
      .then(({ data }) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });

    if (!window.localStorage.getItem("network")) {
      window.preventBackButton = function () {
        try {
          if (
            document &&
            (!document.cookie || document.cookie.indexOf("_tc=1") < 0)
          ) {
            window.document.body.style.display = "none";
            window.location = "/networks";
          }
        } catch (e) {}
      };
      window.preventBackButton();
    }
  }, []);

  const selectDate = (val) => {
    setSelected(false);
    setDate(val);
    setTheServices([]);
    for (let i = 0; i < services.length; i++) {
      if (
        val > new Date(services[i].startDate) &&
        val < new Date(services[i].endDate)
      ) {
        theServices.push(services[i]);
      }
      if (
        (val.getDate() === new Date(services[i].startDate).getDate() &&
          val.getMonth() === new Date(services[i].startDate).getMonth()) ||
        (val.getDate() === new Date(services[i].endDate).getDate() &&
          val.getMonth() === new Date(services[i].endDate).getMonth())
      ) {
        for (let i = 0; i < theServices.length; i++) {
          if (!services[i] && theServices[i] !== services[i]) {
            theServices.push(services[i]);
          }
        }
      }
    }
    if (theServices.length === 1) {
      update({ selectedService: theServices[0] });
    }
    if (theServices.length === 0) {
      NotificationManager.warning("No available service", "Alam", 1500);
    }
    setShowServices(theServices);
  };

  const selectService = (i) => {
    setSelected(true);
    update({ selectedService: i });
  };
  return (
    <div className="App" style={{ color: "white" }}>
      <BackgroundParticles />
      <Header />
      <div className="select_date">
        <div className="select_date_title">Select Date</div>
        <Underline />
        <div className="select_date_calendar">
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={5}
              style={{ marginTop: "10px" }}
            >
              <center>
                <Calendar onChange={selectDate} value={date} />
                <p
                  className="text-center"
                  style={{
                    color: "rgba(255, 255, 255, 0.2)",
                    fontSize: "20px",
                  }}
                >
                  {showCurrentTime}
                </p>

                {/* {date.toDateString() === currentDate.toDateString() ? (
                  <p
                    className="text-center bold"
                    style={{ color: "lightgreen", fontSize: "20px" }}
                  >
                    already finished bid for Today's service.
                  </p>
                ) : date.getDate() < currentDate.getDate() ? (
                  <p
                    className="text-center bold"
                    style={{ color: "red", fontSize: "20px" }}
                  >
                    something went wrong!
                  </p>
                ) : date.getTime() <
                  currentDate.setDate(currentDate.getDate() + 14) ? (
                  <p
                    className="text-center bold"
                    style={{ color: "yellow", fontSize: "20px" }}
                  >
                    you can bid for that day.
                  </p>
                ) : (
                  <p
                    className="text-center bold"
                    style={{ color: "lightgreen", fontSize: "20px" }}
                  >
                    we are sorry, but not ready yet for that day.
                  </p>
                )} */}
              </center>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={7}>
              <div className="time_slot">
                <div className="time_slot_title">
                  <div style={{ fontSize: "30px", fontWeight: "bold" }}>
                    Available Services
                  </div>
                  <div className="time_slot_title_date">
                    <span style={{ color: "#c70c60" }}>
                      {date.toDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <Grid container style={{ width: "100%" }}>
                    {showServices.length === 0 ? (
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <center>
                          <img
                            src={NoServiceIcon}
                            alt="NoServiceIcon"
                            width="200px"
                          />
                          <div style={{ color: "grey", fontSize: "20px" }}>
                            No Available Service
                          </div>
                        </center>
                      </Grid>
                    ) : (
                      showServices.map((item, key) => {
                        return (
                          <Grid key={key} item xs={12} sm={6} md={6} lg={4}>
                            <Button1
                              btnContent={
                                item.name.length > 10
                                  ? item.name.slice(0, 8) + "..."
                                  : item.name
                              }
                              btn1Class="theme_button_1_focus"
                              handleEvent={() => selectService(item)}
                            />
                          </Grid>
                        );
                      })
                    )}
                  </Grid>
                </div>
              </div>
              {showServices.length !== 0 ? (
                !selected && showServices.length !== 1 ? (
                  <div
                    style={{
                      color: "grey",
                      fontSize: "35px",
                      textAlign: "center",
                      padding: "25px",
                      fontFamily: "Brush Script MT",
                    }}
                  >
                    Please select service you want !
                  </div>
                ) : null
              ) : null}
            </Grid>
          </Grid>
        </div>
        <div className="next">
          <Link to="/bid">
            <Button1
              btnContent="NEXT"
              btn1Class={
                selected ? "next_button" : "next_button next_button_disabled"
              }
              disabled={selected ? false : true}
            />
          </Link>
        </div>
      </div>

      <div style={{ cursor: "pointer" }}>
        <Link to="/faq" style={{ textDecoration: "none" }}>
          <img src={faq_icon} alt="faq_icon" className="faq_icon" />
          <span className="faq_text">FAQ</span>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarPage;
