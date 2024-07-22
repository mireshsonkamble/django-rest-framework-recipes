import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import base_url from "../api/bootApi";
import "../App.css";

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${base_url}/${id}`);
        setRecipe(response.data);
      } catch (error) {
        toast.error("Failed to fetch recipe details");
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  // Split the steps into an array
  const steps = recipe.steps.split(/(?=\d\.)/).map((step) => step.trim());

  return (
    <div
      style={{
        backgroundColor: "#B4E380",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1 className="center-text spaced-text">
        <strong>{recipe.name}</strong>
      </h1>
      <h4 className="center-text">
        <strong>Ingredients</strong>
      </h4>
      <h5
        style={{
          textAlign: "justify", // Justify text
          textJustify: "inter-word", // Adjusts justification (useful for large blocks of text)
          margin: "0 auto", // Center the element itself
          width: "80%", // Optionally set a width to control justification
        }}
        className="center-text spaced-text"
      >
        {recipe.ingredients}
      </h5>{" "}
      <h4 className="center-text">
        <strong>Steps</strong>
      </h4>
      <VerticalTimeline>
        {steps.map((step, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          >
            <h4 className="vertical-timeline-element-title">
              Step {index + 1}
            </h4>
            <p>{step}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
      <h4 className="center-text">
        <strong>Preparation Time:</strong> {recipe.preparationTime} minutes
      </h4>
    </div>
  );
};

export default ViewRecipe;
