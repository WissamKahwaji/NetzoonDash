/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";
import countryList from "react-select-country-list";
import { useCountry } from "../../../../context/CountryContext";

const CountryPicker = () => {
  const { country, setCountry } = useCountry();
  const options = countryList().getData();

  const handleChange = (selectedOption: any) => {
    setCountry(selectedOption.value);
    console.log(selectedOption.value);
  };

  return (
    <Select
      options={options}
      value={options.find(option => option.value === country)}
      onChange={handleChange}
      placeholder="Select Country"
      defaultValue={{ value: "AE", label: "United Arab Emirates" }}
      styles={{
        container: provided => ({
          ...provided,
          width: 290,
        }),
        control: provided => ({
          ...provided,
          backgroundColor: "lightgrey", // Change background color
          borderColor: "darkgrey", // Change border color
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? "darkgrey"
            : state.isFocused
            ? "lightgrey"
            : "white",
          color: "black",
        }),
      }}
    />
  );
};

export default CountryPicker;
