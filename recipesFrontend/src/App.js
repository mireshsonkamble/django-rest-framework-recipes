import React from "react";
import "./App.css";
import { Col, Container, Row } from "reactstrap";
import { ToastContainer } from "react-toastify";
import Home from "./components/Home";
import AllRecipes from "./components/AllRecipes";
import AddRecipe from "./components/AddRecipe";
import Header from "./components/Header";
import Menus from "./components/Menus";
import ViewRecipe from "./components/ViewRecipe";
import AboutUs from "./components/AboutUs";
import AdvertisementCarousel from "./components/AdvertisementCarousel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <Router>
        <ToastContainer />
        <Container>
          <Header />
          <Row>
            <Col md="4">
              <Menus />
              <AdvertisementCarousel />
              <AdvertisementCarousel />
            </Col>
            <Col md="8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-recipe" element={<AddRecipe />} />
                <Route path="/view-recipes" element={<AllRecipes />} />
                <Route path="/recipes/:id" element={<ViewRecipe />} />
                <Route path="/about-us" element={<AboutUs />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
