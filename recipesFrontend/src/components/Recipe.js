import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardSubtitle,
  CardText,
  Button,
  Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import base_url from "../api/bootApi";
import UpdateRecipeModal from "./UpdateRecipeModal"; // Import the modal

const Recipe = ({ recipe, update }) => {
  const [showModal, setShowModal] = useState(false);

  const handleUpdateRecipe = (updatedRecipe) => {
    axios.put(`${base_url}/${updatedRecipe.id}/update/`, updatedRecipe).then(
      (response) => {
        toast.success("Recipe updated successfully");
        update(); // Trigger update without arguments for general update
      },
      (error) => {
        toast.error("Something went wrong");
      }
    );
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Card
      style={{
        border: '2px solid #8DBF50',
        borderRadius: '10px',
        marginBottom: '20px'
      }}
    >
      <CardBody className="text-center">
        <CardSubtitle
          className="font-weight-bold"
          style={{ fontWeight: 'bold', fontSize: '1.5rem' }}
        >
          {recipe.name}
        </CardSubtitle>
        <CardText style={{ fontWeight: 'bold' }}>
          Preparation Time: {recipe.preparationTime}
        </CardText>
        <Container className="text-center">
          <Link to={`/recipes/${recipe.id}`}>
            <Button color="primary" className="ml-3">
              View
            </Button>
          </Link>
          <Button color="warning" className="ms-3 ml-3" onClick={handleShow}>
            Update
          </Button>
        </Container>
      </CardBody>
      <UpdateRecipeModal
        show={showModal}
        handleClose={handleClose}
        recipe={recipe}
        handleUpdate={handleUpdateRecipe}
      />
    </Card>
  );
};

export default Recipe;
