import { useEffect, useState } from "react/cjs/react.development";
import Card from "../UI/Card";
import classes from "./AvailableShoes.module.css";
import ShoesItem from "./ShoesItem/ShoesItem";

const AvailableShoes = () => {
  const [shoes, setShoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  useEffect(() => {
    const fetchShoes = async () => {
      const response = await fetch(
        "https://fetching-shoes-default-rtdb.firebaseio.com/shoes.json"
      );

      if (!response.ok) {
        throw new Error("Sometihng went wrong");
      }

      const responseData = await response.json();
      const loadedShoes = [];
      for (const key in responseData) {
        loadedShoes.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setShoes(loadedShoes);
      setIsLoading(false);
    };

    fetchShoes().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    );
  }
  const shoesList = shoes.map((shoes) => (
    <ShoesItem
      id={shoes.id}
      key={shoes.id}
      name={shoes.name}
      description={shoes.description}
      price={shoes.price}
    />
  ));
  return (
    <section className={classes["available-shoes"]}>
      <Card>
        <ul>{shoesList}</ul>
      </Card>
    </section>
  );
};

export default AvailableShoes;
