import React, { Component } from "react";
import PropTypes from "prop-types";

import { FormGroup, Col, Row, Label, FormText, Card, CardBody, CardTitle } from 'reactstrap';

import { postPeriziaItem } from '../../actions/crud'

import { connect } from "react-redux";

import "./home.css";

class Home extends Component {

  getItems() {
    console.log(location.pathname)
    let arrSearch = location.pathname.split('/')
    console.log(arrSearch)
    if (arrSearch.length >= 5) {
      const body = {
        stato: arrSearch[1], anno: arrSearch[2], valore: arrSearch[3], uuid: arrSearch[4]
      }
      this.props.dispatch(postPeriziaItem(body))
    }
  }

  componentDidMount() {
    this.getItems()
  }

  render() {
    const { item } = this.props
    if (item == null || item.dataExists) return (<p>Nessua perizia trovata...</p>)
    return (
      <>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <CardBody>
            <CardTitle>Generiche</CardTitle>
            <Row>
              <Col sm={3}>
                <FormGroup>
                  <Label for="stato">Stato</Label>
                  <FormText name='stato' id='stato'>{item.stato}</FormText>
                </FormGroup>
              </Col>
              <Col sm={3}>
                <FormGroup>
                  <Label for="anno">Anno</Label>
                  <FormText name='anno' id='anno'>{item.anno}</FormText>
                </FormGroup>
              </Col>
              <Col sm={3}>
                <FormGroup>
                  <Label for="valore">Valore</Label>
                  <FormText name="valore" id="valore">{item.valore}</FormText>
                </FormGroup>
              </Col>
              <Col sm={3}>
                <FormGroup>
                  <Label for="uuid">uuid</Label>
                  <FormText name="uuid" id="uuid">{item.uuid}</FormText>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="periodo">Periodo</Label>
              <FormText name="periodo" id="periodo">{item.periodo}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="valuta">Valuta</Label>
              <FormText name="valuta" id="valuta">{item.valuta}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="zecca">Zecca</Label>
              <FormText name="zecca" id="zecca">{item.zecca}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="lega_metallurgica">Lega metallurgica</Label>
              <FormText name="lega_metallurgica" id="lega_metallurgica">{item.lega_metallurgica}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="orientamento_asse">Orientamento asse</Label>
              <FormText name="orientamento_asse" id="orientamento_asse">{item.orientamento_asse}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="contorno">Contorno</Label>
              <FormText name="contorno" id="contorno">{item.contorno}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="riferimento">Riferimento</Label>
              <FormText name="riferimento" id="riferimento">{item.riferimento}</FormText>
            </FormGroup>
          </CardBody>
        </Card>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <CardBody>
            <CardTitle>Specifiche</CardTitle>
            <FormGroup>
              <Label for="peso">Peso</Label>
              <FormText name="peso" id="peso">{item.peso}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="diametro">Diametro</Label>
              <FormText name="diametro" id="diametro">{item.diametro}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="spessore">Spessore</Label>
              <FormText name="spessore" id="spessore">{item.spessore}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="spessore">Conservazione</Label>
              <FormText name="conservazione">{item.conservazione}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="rarita">Rarità</Label>
              <FormText name="rarita" id="rarita">{item.rarita}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="variante">Variante</Label>
              <FormText name="variante" id="variante">{item.variante}</FormText>
            </FormGroup>
            <FormGroup>
              <Label for="note">Note</Label>
              <FormText name="note" id="note">{item.note}</FormText>
            </FormGroup>
          </CardBody>
        </Card>
      </>
    );
  }
}

Home.propTypes = {
  user: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

Home.contextTypes = {
  store: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  const { crud } = state;
  return {
    item: crud.item
  };
};

export default connect(mapStateToProps)(Home);