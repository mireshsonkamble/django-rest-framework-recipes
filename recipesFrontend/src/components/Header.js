import React from "react";
import { Container, Button, CardBody, Card } from "reactstrap";

const Header = () => (
  <div>
    <Card className="my-2" style={{ backgroundColor: '#F6FB7A' }}>
      <CardBody>
        <h1 className="text-center my-3">Welcome to Asian Recipes</h1>
      </CardBody>
    </Card>
  </div>
);

export default Header;
