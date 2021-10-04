import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const nameInput = useRef();
  const streetInput = useRef();
  const postalCodeInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;
    const enteredCity = cityInput.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);
    const enteredCityIsValid = !isEmpty(enteredCity);

    setFormInputsValidity({
      name: enteredCityIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodeIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  return (
    <form onSubmit={confirmHandler} className={classes["checkout-form"]}>
      <div className={classes.control}>
        <label htmlFor="name">Your Name :</label>
        <input type="text" id="name" ref={nameInput} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="street">Street :</label>
        <input type="text" id="street" ref={streetInput} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="city">City :</label>
        <input type="text" id="city" ref={cityInput} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor="postal">Postal Code :</label>
        <input type="text" id="postal" ref={postalCodeInput} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a postal code (5 characters long)!</p>
        )}
      </div>
      <div className={classes.buttons}>
        <button
          type="button"
          onClick={props.onCancel}
          className={classes.cancelBtn}
        >
          Cancel
        </button>
        <button className={classes.confirmBtn}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
