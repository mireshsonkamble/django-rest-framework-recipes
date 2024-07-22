import React, { useState } from "react";
import { FormGroup, Form, Input, Button, Container } from "reactstrap";
import axios from "axios";
import base_url from "../api/bootApi";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    steps: "",
    preparationTime: 0,
  });

  const handleForm = (e) => {
    e.preventDefault();
    postDataToServer(recipe);
  };

  const postDataToServer = (data) => {
    axios
      .post(`${base_url}/addRecipe/`, data)
      .then((response) => {
        console.log(response);
        toast.success("Recipe added successfully");
        // Clear form fields after successful submission
        setRecipe({
          name: "",
          ingredients: "",
          steps: "",
          preparationTime: 0,
        });
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
        toast.error("Failed to add recipe");
      });
  };

  // Function to handle changes in steps field
  const handleStepsChange = (e) => {
    const value = e.target.value;
    setRecipe({ ...recipe, steps: value });
  };

  return (
    <div style={{ backgroundColor: '#B4E380', border: '2px solid #8DBF50', borderRadius: '10px', padding: '20px' }}>
      <Form onSubmit={handleForm}>
        <h1 className="text-center my-3">Enter Recipe Details</h1>
        <FormGroup>
          <label htmlFor="name"><strong>Recipe Name</strong></label>
          <Input
            type="text"
            id="name"
            value={recipe.name}
            onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
            placeholder="Enter name here"
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="ingredients"><strong>Ingredients</strong></label>
          <Input
            type="textarea"
            id="ingredients"
            value={recipe.ingredients}
            onChange={(e) =>
              setRecipe({ ...recipe, ingredients: e.target.value })
            }
            placeholder="Enter ingredients here"
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="steps"><strong>Steps</strong></label>
          <Input
            type="textarea"
            id="steps"
            value={recipe.steps}
            onChange={handleStepsChange}
            placeholder="Enter steps here (e.g., 1. Step description)"
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="preparationTime"><strong>Preparation Time</strong></label>
          <Input
            type="number"
            id="preparationTime"
            value={recipe.preparationTime}
            onChange={(e) =>
              setRecipe({ ...recipe, preparationTime: e.target.value })
            }
            placeholder="Enter preparation time in minutes"
            required
          />
        </FormGroup>
        <Container className="text-center">
          <Button type="submit" color="success">
            Submit
          </Button>{" "}
          <Button type="reset" color="warning">
            Clear
          </Button>
        </Container>
      </Form>
    </div>
  );
};

export default AddRecipe;
