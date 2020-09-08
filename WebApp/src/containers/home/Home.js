import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  FormGroup, Col, Row, Label, Card, CardBody, CardTitle
} from 'reactstrap';

import { postPeriziaItem } from '../../actions/crud'

import { connect } from "react-redux"

import Carousel from '../../components/immagini/Carousel'

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
    const { item, immagini } = this.props
    if (item == null || item.dataExists) return null

    return (
      <>
        <h4>Perizia di Andrea Del Pup</h4>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <CardBody>
            <Carousel autoPlay={false} data={immagini} />
          </CardBody>
          <CardBody>
            <CardTitle><h4>&nbsp;&nbsp;&nbsp;Informazioni generiche</h4><br></br></CardTitle>
            <FormGroup>
              <Label for="descrizione">Tipo moneta</Label>
              <h5 name="descrizione" id="descrizione">{item.descrizione}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="periodo">Periodo</Label>
              <h5 name="periodo" id="periodo">{item.periodo}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="valuta">Valuta</Label>
              <h5 name="valuta" id="valuta">{item.valuta}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="zecca">Zecca</Label>
              <h5 name="zecca" id="zecca">{item.zecca}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="lega_metallica">Lega metallica</Label>
              <h5 name="lega_metallica" id="lega_metallica">{item.lega_metallica}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="orientamento_asse">Orientamento asse</Label>
              <h5 name="orientamento_asse" id="orientamento_asse">{item.orientamento_asse}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="contorno">Contorno</Label>
              <h5 name="contorno" id="contorno">{item.contorno}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="riferimento">Riferimento</Label>
              <h5 name="riferimento" id="riferimento">{item.riferimento}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="data_perizia">Data perizia</Label>
              <h5 name="data_perizia" id="data_perizia">{item.data_perizia}</h5>
            </FormGroup>
          </CardBody>
        </Card>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <CardBody>
            <CardTitle><h4>&nbsp;&nbsp;&nbsp;Informazioni specifiche</h4><br></br></CardTitle>
            <FormGroup>
              <Label for="peso">Peso</Label>
              <h5 name="peso" id="peso">{item.peso}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="diametro">Diametro</Label>
              <h5 name="diametro" id="diametro">{item.diametro}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="spessore">Spessore</Label>
              <h5 name="spessore" id="spessore">{item.spessore}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="spessore">Conservazione</Label>
              <h5 name="conservazione">{item.conservazione}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="rarita">Rarità</Label>
              <h5 name="rarita" id="rarita">{item.rarita}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="variante">Errore/Variante</Label>
              <h5 name="variante" id="variante">{item.variante}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="collegamento">Collegamento a descrizione errore</Label>
              <h5 name="collegamento" id="collegamento"><a href={item.collegamento} target="_blank">{item.collegamento} 🔗</a></h5>
            </FormGroup>
            <FormGroup>
              <Label for="note">Note</Label>
              <h5 name="note" id="note">{item.note}</h5>
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
  const { crud, immagini } = state;
  return {
    item: crud.item,
    immagini: immagini.items
  };
};

export default connect(mapStateToProps)(Home);