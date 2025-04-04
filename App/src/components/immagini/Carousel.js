import React, { Component } from 'react'
import { Carousel, Container, Row, Col } from 'react-bootstrap'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
export default class carousel extends Component {
  render() {
    const { data } = this.props

    let itemsCarusel = data.map((element, index) => {
      //console.log(element);
      return (
        <Carousel.Item key={`${index}`}>
          <img className="d-block w-100" src={process.env.REACT_APP_BASE_PATH + '/' + element.filename} alt={element.originalname} />
        </Carousel.Item>
      )
    })

    return (
      <Container>
        <TransformWrapper wheel={{ disabled: true }} initialScale={1} initialPositionX={0} initialPositionY={0}>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="mx-auto" style={{ width: 250 }}>
                <button type="button" className="btn btn-light btn-sm m-1" onClick={() => zoomIn()}>
                  zoom +
                </button>
                <button type="button" className="btn btn-light btn-sm m-1" onClick={() => zoomOut()}>
                  zoom -
                </button>
                <button type="button" className="btn btn-light btn-sm m-1" onClick={() => resetTransform()}>
                  zoom 0
                </button>
              </div>
              <TransformComponent>
                <Carousel fade nextLabel="" prevLabel="" interval={null}>
                  {itemsCarusel}
                </Carousel>
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </Container>
    )
  }
}
