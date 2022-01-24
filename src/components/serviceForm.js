import * as React from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const currencies = [
  {
    value: "ETH",
    label: "ETH",
  },
  {
    value: "BSC",
    label: "BSC",
  },
  {
    value: "MATIC",
    label: "MATIC",
  },
  {
    value: "FANTOM",
    label: "FANTOM",
  },
];

const options = [
  {
    value: "DexTools",
    label: "DexTools",
  },
  {
    value: "Crypto.com",
    label: "Crypto.com",
  },
  {
    value: "CoinMarketCap",
    label: "CoinMarketCap",
  },
  {
    value: "CoinGecko",
    label: "CoinGecko",
  },
  {
    value: "PinkSale",
    label: "PinkSale",
  },
];

export default function ServiceForm() {
  const [currency, setCurrency] = React.useState("ETH");
  const [option, setOption] = React.useState("DexTools");

  const handleCurrency = (event) => {
    setCurrency(event.target.value);
  };
  const handleOption = (event) => {
    setOption(event.target.value);
  };
  return (
    <div className="edit_service_pad">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          label="Service Name"
          variant="outlined"
          helperText="Please add a new service name."
        />
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          helperText="Please reserve proper price."
        />
        <TextField
          multiline
          rows={3}
          label="Service Details"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          helperText="Please write details for the service."
        />
        <TextField
          select
          label="option"
          value={option}
          onChange={handleOption}
          helperText="Please select an option."
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="network"
          value={currency}
          onChange={handleCurrency}
          helperText="Please select network."
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
        >
          {currencies.map((currency) => (
            <MenuItem key={currency.value} value={currency.value}>
              {currency.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </div>
  );
}
