import { useContext } from "react";
import classes from "./ShoesItem.module.css";
import ShoesItemForm from "./ShoesItemForm";
import CartContext from "../../../store/cart-context";

const ShoesItem = (props) => {
  const cartCtx = useContext(CartContext);
  const price = `${props.price.toFixed(2)}t`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes["shoes-item"]}>
      <div>
        <h3>{props.name}</h3>
        <div>{props.description}</div>
        <div>{price}</div>
      </div>
      <div>
        <ShoesItemForm onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default ShoesItem;
