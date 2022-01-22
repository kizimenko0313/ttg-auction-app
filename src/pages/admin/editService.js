import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Modal from "react-modal";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import BackgroundParticles from "../../components/particles";
import AdminLeftBarProps from "../../components/adminLeftProps";
import ServiceTableRow from "../../components/serviceTableRow";

export default function EditService() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [option, setOption] = useState("");
  const [network, setNetwork] = useState("");
  //   const [startDate, setStartDate] = useState(new Date());
  //   const [endDate, setEndDate] = useState(new Date());
  const [details, setDetails] = useState("");
  const [topicImage, setTopicImage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const [services, setServices] = useState([]);

  /*******added multiple date panel******** */
  const [dates, setDates] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_PROXY + `/services/`)
      .then(({ data }) => {
        setServices(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DataTable = () => {
    return services.map((res, i) => {
      return <ServiceTableRow obj={res} key={i} />;
    });
  };

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleImage = (e) => {
    // console.log(e.target.files[0]);
    // const Img = window.localStorage.setItem("topicImage", URL.createObjectURL(e.target.files[0]))
    setTopicImage(e.target.files[0]);
  };
  const saveService = () => {
    for (let i = 0; i < dates.length; i++) {
      if (dates[i] < new Date().getTime()) {
        NotificationManager.error("Invalid Date setting error", "Failed", 3000);
        return;
      }
    }
    if (!option || network === "noSelected" || !network) {
      NotificationManager.error("Invalid setting error", "Failed", 3000);
      return;
    }
    const serviceObject = {
      name,
      price,
      option,
      network,
      dates,
      details,
      topicImage,
      bidStatus: [],
    };
    axios
      .post(
        process.env.REACT_APP_PROXY + `/services/create-service`,
        serviceObject
      )
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success(
            "Service created successfully",
            "Success",
            1500
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else Promise.reject();
      })
      .catch((err) =>
        NotificationManager.error("Something went wrong", "Oops", 3000)
      );
    setModalVisible(false);
  };

  const handleEdit = () => {
    setModalVisible(!isModalVisible);
  };

  const cancelEdit = () => {
    setModalVisible(!isModalVisible);
    setName("");
    setPrice(0);
    setDetails("");
    setTopicImage("");
    setDates([]);
  };

  return (
    <div className="winner_record admin_padding">
      <BackgroundParticles />
      <Grid container>
        <Grid item md={1} lg={3}>
          <AdminLeftBarProps />
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={9}>
          <div
            style={{ color: "#ffffff", fontSize: "39px", fontWeight: "bold" }}
          >
            EDIT SERVICES
          </div>
          <div className="add_service_button" onClick={handleEdit}>
            Add Service
          </div>
          <div id="Bid-record" style={{ marginTop: "50px" }}>
            <table
              className="table table-striped css-serial container-out"
              style={{
                overflowX: "auto",
                display: "block",
                overflowY: "auto",
                maxHeight: "65vh",
              }}
            >
              <thead>
                <tr>
                  <th style={{ borderRadius: "15px 0 0 15px" }}>ID</th>
                  <th>ServiceName</th>
                  <th>Price</th>
                  <th>ServiceOption</th>
                  <th>Network</th>
                  <th>Details</th>
                  <th>Dates</th>
                  <th>Status</th>
                  <th>TopicImage</th>
                  <th style={{ borderRadius: "0 15px 15px 0" }}>Actions</th>
                </tr>
              </thead>
              <tbody>{DataTable()}</tbody>
            </table>
          </div>
          <div style={{ zIndex: "100", position: "relative" }}>
            <Modal
              isOpen={isModalVisible}
              onRequestClose={handleModal}
              contentLabel="Warning"
              className="modal_style"
              ariaHideApp={false}
              shouldCloseOnOverlayClick={false}
            >
              <div className="edit_service_pad">
                <div>
                  <span>Service Name: </span>
                  <input
                    type="text"
                    placeholder="name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <span>Price($): </span>
                  <input
                    type="number"
                    placeholder="price..."
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <span>Option: </span>
                  <input
                    type="radio"
                    value="DexTools"
                    name="option"
                    id="dextools"
                    onChange={() => setOption("DexTools")}
                  />
                  <label htmlFor="dextools">DexTools</label>
                  <input
                    type="radio"
                    value="Crypto.com"
                    name="option"
                    id="crypto"
                    disabled
                    onChange={() => setOption("Crypto.com")}
                  />
                  <label htmlFor="crypto">Crypto.com</label>
                  <input
                    type="radio"
                    value="CoinMarketCap"
                    name="option"
                    id="coinmarketcap"
                    disabled
                    onChange={() => setOption("CoinMarketCap")}
                  />
                  <label htmlFor="coinmarketcap">CoinMarketCap</label>
                  <input
                    type="radio"
                    value="CoinGecko"
                    name="option"
                    id="CoinGecko"
                    disabled
                    onChange={() => setOption("CoinGecko")}
                  />
                  <label htmlFor="CoinGecko">CoinGecko</label>
                  <input
                    type="radio"
                    value="PinkSale"
                    name="option"
                    id="PinkSale"
                    disabled
                    onChange={() => setOption("PinkSale")}
                  />
                  <label htmlFor="PinkSale">PinkSale</label>
                </div>
                <div>
                  <span>Network: </span>
                  <select
                    name="network"
                    id="network"
                    onChange={(e) => setNetwork(e.target.value)}
                  >
                    <option value="noSelected">NoSelected</option>
                    <option value="ETH">ETH</option>
                    <option value="BSC">BSC</option>
                    <option value="MATIC">MATIC</option>
                    <option value="FANTOM">FANTOM</option>
                  </select>
                </div>
                <div>
                  <span>Available Date: </span>
                  <DatePicker
                    multiple
                    value={dates}
                    onChange={setDates}
                    plugins={[<DatePanel />]}
                  />
                </div>
                <div>
                  <span>Details: </span>
                  <textarea
                    placeholder="please explain about this service here..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
                <div>
                  <span>Topic Image: </span>
                  {!topicImage ? (
                    <input
                      type="file"
                      name="topicImage"
                      onChange={handleImage}
                    />
                  ) : null}
                  <img
                    src={topicImage ? URL.createObjectURL(topicImage) : null}
                    alt={topicImage ? topicImage.name : null}
                    width="150px"
                  />
                </div>
                <button
                  onClick={saveService}
                  disabled={
                    name &&
                    price &&
                    option &&
                    network &&
                    network !== "noSelected" &&
                    dates.length !== 0 &&
                    details &&
                    topicImage
                      ? false
                      : true
                  }
                >
                  Save
                </button>
                <button onClick={cancelEdit}>Cancel</button>
              </div>
            </Modal>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
