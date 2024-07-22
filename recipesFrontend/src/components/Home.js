import React, { useEffect } from "react";
import { Container } from "reactstrap";

const Home = () => {
  useEffect(() => {
    document.title = "Home | Learn Recipes With Us";
  }, []);

  return (
    <div
      className="jumbotron text-center"
      style={{ backgroundColor: "#B4E380", padding: "100px 20px" }}
    >
      <h1 style={{ color: "#333", fontSize: "3rem" }}>
        Discover Delicious Recipes
      </h1>
      <p style={{ color: "#333", fontSize: "1.5rem" }}>
        Welcome to the world of recipes, making your life easier.
      </p>
      <Container>
        <p style={{ color: "#333", fontSize: "1.25rem" }}>
          <strong>
            You can explore all recipes or update existing recipes from the
            "View Recipe" menu item.
          </strong>
        </p>
      </Container>
    </div>
  );
};

export default Home;
