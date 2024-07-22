import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";

const Menus = () => {
  return (
    <ListGroup>
      <ListGroupItem tag={Link} className="list-group-item list-group-item-action" to="/">Home</ListGroupItem>
      <ListGroupItem tag={Link} className="list-group-item list-group-item-action" to="/add-recipe">Add Recipe</ListGroupItem>
      <ListGroupItem tag={Link} className="list-group-item list-group-item-action" to="/view-recipes">View Recipe</ListGroupItem>
      <ListGroupItem tag={Link} className="list-group-item list-group-item-action" to="/about-us">About Us</ListGroupItem>
    </ListGroup>
  );
};
export default Menus;
