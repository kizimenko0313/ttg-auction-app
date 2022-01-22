import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

import MoreIcon from "../assets/img/caret-right.png";
import LessIcon from "../assets/img/caret-down.png";

export default function ServiceTableRow(props) {
  const {
    _id,
    name,
    price,
    option,
    network,
    details,
    dates,
    topicImage,
    bidStatus,
  } = props.obj;

  const [name1, setName] = useState("");
  const [price1, setPrice] = useState(0);
  const [option1, setOption] = useState("");
  const [network1, setNetwork] = useState("");
  const [details1, setDetails] = useState("");
  const [dates1, setDates] = useState([]);
  const [topicImage1, setTopicImage] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [moreDetails, setMoreDetails] = useState(false);
  const [viewDates, setViewDates] = useState(false);

  useEffect(() => {
    setName(name);
    setPrice(price);
    setOption(option);
    setNetwork(network);
    setDetails(details);
    setDates(dates);
    setTopicImage(topicImage);
  }, [name, price, option, network, details, dates, topicImage]);

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const handleEdit = () => {
    setModalVisible(!isModalVisible);
  };
  const handleImage = (e) => {
    console.log(e.target.files[0]);
    // const Img = window.localStorage.setItem("topicImage", URL.createObjectURL(e.target.files[0]))
    setTopicImage(e.target.files[0]);
  };

  const handleMore = () => {
    setMoreDetails(!moreDetails);
  };
  const handleViewDates = () => {
    setViewDates(!viewDates);
  };
  const updateService = () => {
    for (let i = 0; i < dates1.length; i++) {
      if (dates1[i] < new Date().getTime()) {
        NotificationManager.error("Invalid Date setting error", "Failed", 3000);
        return;
      }
    }
    const serviceObject = {
      name: name1,
      price: price1,
      option: option1,
      network: network1,
      details: details1,
      dates: dates1,
      topicImage: topicImage1,
    };
    axios
      .put(
        process.env.REACT_APP_PROXY + `/services/update-service/` + _id,
        serviceObject
      )
      .then((res) => {
        if (res.status === 200) {
          NotificationManager.success(
            "Service successfully updated !",
            "Success",
            1500
          );
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else Promise.reject();
      })
      .catch((err) =>
        NotificationManager.error("Something went wrong !", "Oops", 2000)
      );
    setModalVisible(false);
  };
  const deleteService = () => {
    if (deleteConfirm === true) {
      axios
        .delete(process.env.REACT_APP_PROXY + `/services/delete-service/` + _id)
        .then((res) => {
          if (res.status === 200) {
            NotificationManager.warning(
              "Service successfully deleted",
              "",
              1500
            );
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else Promise.reject();
        })
        .catch((err) =>
          NotificationManager.error("Something went wrong !", "Oops", 2000)
        );
      setDeleteConfirm(false);
    } else {
      NotificationManager.error(
        "make sure if you want to delete this service",
        "Are you sure ?",
        3000
      );
      setDeleteConfirm(true);
    }
  };
  return (
    <tr>
      <td></td>
      <td>{name}</td>
      <td>{price}</td>
      <td>{option}</td>
      <td>{network}</td>
      <td
        className="container-out"
        style={{
          display: "block",
          overflowY: "auto",
          maxHeight: "100px",
        }}
      >
        {!moreDetails ? (
          <img src={MoreIcon} alt="More" width="20px" onClick={handleMore} />
        ) : (
          <div>
            <img src={LessIcon} alt="Less" width="20px" onClick={handleMore} />
            <br />
            {details}
          </div>
        )}
      </td>
      <td>
        {!viewDates ? (
          <img
            src={MoreIcon}
            alt="More"
            width="20px"
            onClick={handleViewDates}
          />
        ) : (
          <div>
            <img
              src={LessIcon}
              alt="Less"
              width="20px"
              onClick={handleViewDates}
            />
            <br />
            {dates.map((res, i) => {
              return <div key={i}>{new Date(res).toDateString() + ","}</div>;
            })}
          </div>
        )}
      </td>
      <td>
        <div style={{ color: "lightgreen" }}>available</div>
      </td>
      <td>
        <img src={topicImage} alt="topic" width="150px" />
      </td>
      <td>
        {bidStatus.length === 0 ? (
          <span>
            <button
              onClick={handleEdit}
              style={{
                borderRadius: "5px",
                backgroundColor: "#2039e0",
                border: "none",
                outline: "none",
                padding: "7px 20px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
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
                    value={name1}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <span>Price($): </span>
                  <input
                    type="number"
                    placeholder="price..."
                    value={price1}
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
                    checked
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
                    <option value="ETH" selected>
                      ETH
                    </option>
                    <option value="BSC">BSC</option>
                    <option value="MATIC">MATIC</option>
                    <option value="FANTOM">FANTOM</option>
                  </select>
                </div>
                <div></div>
                <div>
                  <span>Available Date: </span>
                  <DatePicker
                    multiple
                    value={dates1}
                    onChange={setDates}
                    plugins={[<DatePanel />]}
                  />
                </div>
                <div>
                  <span>Details: </span>
                  <textarea
                    placeholder="please explain about this service here..."
                    value={details1}
                    onChange={(e) => setDetails(e.target.value)}
                  />
                </div>
                <div>
                  <span>Topic Image: </span>
                  {!topicImage1 ? (
                    <input
                      type="file"
                      name="topicImage"
                      onChange={handleImage}
                    />
                  ) : null}
                  <img
                    src={topicImage1 ? URL.createObjectURL(topicImage1) : null}
                    alt="topic"
                    width="150px"
                  />
                </div>
                <button
                  onClick={updateService}
                  disabled={
                    name1 &&
                    price1 &&
                    option1 &&
                    network1 &&
                    network1 !== "noSelected" &&
                    dates1.length !== 0 &&
                    details1 &&
                    topicImage1
                      ? false
                      : true
                  }
                >
                  Update
                </button>
                <button onClick={handleEdit}>Cancel</button>
              </div>
            </Modal>
            <button
              onClick={deleteService}
              style={{
                borderRadius: "5px",
                backgroundColor: "#e40a58",
                border: "none",
                outline: "none",
                padding: "7px 10px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </span>
        ) : (
          <button
            style={{
              backgroundColor: "#ffa300",
              border: "none",
              outline: "none",
              padding: "7px 10px",
              color: "white",
            }}
            onClick={() => {
              NotificationManager.warning(
                "Bid already started. You can't EDIT/DELETE services",
                "Warning",
                5000
              );
            }}
          >
            Sealed
          </button>
        )}
      </td>
    </tr>
  );
}
