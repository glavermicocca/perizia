import React, { Component } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";

export default class carousel extends Component {
  render() {
    const { data } = this.props;

    let itemsCarusel = data.map((element, index) => {
      console.log(element);
      return (
        <Carousel.Item key={`${index}`}>
          <img
            className="d-block w-100"
            src={"/" + element.filename}
            alt={element.originalname}
          />
        </Carousel.Item>
      );
    });

    return (
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Carousel interval={null}>{itemsCarusel}</Carousel>
          </Col>
        </Row>
      </Container>
    );
  }
}
