import React from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import "../../main.css";
import partner_1 from "../../assets/img/partner_1.png";
import partner_2 from "../../assets/img/partner_2.png";
import welcome_image from "../../assets/img/welcome_image.png";

import BackgroundParticles from "../../components/particles";
import { Button1 } from "../../components/theme";

import Header from "../../components/header";
import Footer from "../../components/footer";

export default function WelcomePage(props) {
  return (
    <div className="landing-page App">
      <BackgroundParticles />
      <Header />
      <Grid container>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <div className="welcome" id="flash">
            {/* <div className="welcome-1"></div> */}
            <div className="welcome-1">
              <span className="welcome-ttg">T</span>he{" "}
              <span className="welcome-ttg">T</span>rending
            </div>
            <div className="welcome-2">
              <span className="welcome-ttg">G</span>roup
            </div>
            {/* <h2 className="welcome-2">The Trending Group</h2> */}
            {/* <h3 className="welcome-2">The Trending Group</h3> */}
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5}>
          <div className="welcome_reveal">
            <img
              className="welcome_image"
              src={welcome_image}
              alt="welcome_image"
            />
          </div>
        </Grid>
      </Grid>
      <div className="partnership">
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <div className="partner_text">
              In <span style={{ color: "#e9992d" }}>PARTNERSHIP</span> with
            </div>
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <img className="partner_1" src={partner_1} alt="part_1" />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3}>
            <img className="partner_2" src={partner_2} alt="part_2" />
          </Grid>
        </Grid>
      </div>
      <div className="next">
        <Link to="/services" style={{ textDecoration: "none" }}>
          <Button1 btnContent="NEXT" btn1Class="next_button" />
        </Link>
      </div>
      <Footer />
    </div>
  );
}
