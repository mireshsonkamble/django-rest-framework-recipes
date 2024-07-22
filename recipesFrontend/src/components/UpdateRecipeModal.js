import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UpdateRecipeModal = ({ show, handleClose, recipe, handleUpdate }) => {
  const [updatedRecipe, setUpdatedRecipe] = useState({ ...recipe });

  useEffect(() => {
    setUpdatedRecipe({ ...recipe });
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedRecipe({ ...updatedRecipe, [name]: value });
  };

  const handleSubmit = () => {
    handleUpdate(updatedRecipe);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><strong>Update Recipe</strong></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label><strong>Recipe Name</strong></Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={updatedRecipe.name || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formIngredients">
            <Form.Label><strong>Ingredients</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="ingredients"
              value={updatedRecipe.ingredients || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formSteps">
            <Form.Label><strong>Steps</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="steps"
              value={updatedRecipe.steps || ""}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPreparationTime">
            <Form.Label><strong>Preparation Time</strong></Form.Label>
            <Form.Control
              type="text"
              name="preparationTime"
              value={updatedRecipe.preparationTime || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateRecipeModal;
