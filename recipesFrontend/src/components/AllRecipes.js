import React, { useState, useEffect, useRef } from "react";
import Recipe from "./Recipe";
import axios from "axios";
import base_url from "../api/bootApi";
import { toast } from "react-toastify";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const PAGE_SIZE = 5; // Number of recipes per page

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const hasFetched = useRef(false); // Ref to keep track of the API call

  // Function to fetch all recipes from the server
  const getAllRecipesFromServer = async () => {
    try {
      const response = await axios.get(`${base_url}/getRecipes`);
      setRecipes(response.data);
      toast.success("Recipes loaded successfully");
    } catch (error) {
      toast.error("Failed to fetch recipes");
    }
  };

  // Effect to fetch recipes on component mount
  useEffect(() => {
    document.title = "All Recipes";
    if (!hasFetched.current) {
      getAllRecipesFromServer();
      hasFetched.current = true;
    }
  }, []);

  // Function to update recipes after a deletion
  const updateRecipes = (id) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== id));
  };

  // Function to refresh recipes from server
  const refreshRecipes = () => {
    getAllRecipesFromServer();
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  // Filtering recipes based on search query
  const filteredRecipes = recipes.filter((recipe) => {
    const regex = new RegExp(searchQuery, "i");
    return regex.test(recipe.name);
  });

  // Pagination calculations
  const indexOfLastRecipe = currentPage * PAGE_SIZE;
  const indexOfFirstRecipe = indexOfLastRecipe - PAGE_SIZE;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Function to handle pagination click
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ backgroundColor: '#B4E380', border: '2px solid #8DBF50', borderRadius: '10px', padding: '20px' }}>
      <h1><strong>All Recipes</strong></h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search recipes by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <h4><strong>List of Available Recipes</strong></h4>
      {currentRecipes.length > 0 ? (
        currentRecipes.map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} update={refreshRecipes} />
        ))
      ) : (
        <p>No recipes found</p>
      )}
      {filteredRecipes.length > PAGE_SIZE && (
        <Pagination>
          <PaginationItem disabled={currentPage === 1}>
            <PaginationLink
              previous
              onClick={() => paginate(currentPage - 1)}
            />
          </PaginationItem>
          {[...Array(Math.ceil(filteredRecipes.length / PAGE_SIZE)).keys()].map(
            (number) => (
              <PaginationItem
                key={number + 1}
                active={number + 1 === currentPage}
              >
                <PaginationLink onClick={() => paginate(number + 1)}>
                  {number + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem
            disabled={
              currentPage === Math.ceil(filteredRecipes.length / PAGE_SIZE)
            }
          >
            <PaginationLink next onClick={() => paginate(currentPage + 1)} />
          </PaginationItem>
        </Pagination>
      )}
    </div>
  );
};

export default AllRecipes;
