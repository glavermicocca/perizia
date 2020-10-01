import React, { Component } from "react";

import { FormGroup, Label, Card, CardBody, CardTitle } from "reactstrap";

import { postPeriziaItem } from "../../actions/perizia";

import { connect } from "react-redux";

import Carousel from "../../components/immagini/Carousel";

import "./home.css";

class Home extends Component {
  componentDidMount() {
    console.log(window.location);
    this.props.postPeriziaItem(window.location);
  }

  Errori = () => {
    const { errori_di_coniazione } = this.props;
    const errori = errori_di_coniazione.map((errore) => {
      return (
        <Card key={errore.id} className="shadow p-3 mb-5 bg-white rounded">
          <CardBody>
            <FormGroup>
              <Label for="peso">Macro categoria</Label>
              <h5 name="peso" id="peso">
                {errore.macro_categoria}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="diametro">Categoria</Label>
              <h5 name="diametro" id="diametro">
                {errore.macrocategoria}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="spessore">Ripetitivita</Label>
              <h5 name="spessore" id="spessore">
                {errore.ripetitivita}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="codice">Codice</Label>
              <h5 name="codice">{errore.codice}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="rarita">Descrizione</Label>
              <h5 name="descrizione" id="descrizione">
                {errore.descrizione}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="riferiemento_esterno">Riferiemento esterno</Label>
              <h5 name="riferiemento_esterno" id="riferiemento_esterno">
                {errore.riferiemento_esterno}
              </h5>
            </FormGroup>
          </CardBody>
        </Card>
      );
    });

    if (errori_di_coniazione.length > 0) {
      return (
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <CardTitle>
            <h4>&nbsp;&nbsp;&nbsp;Errori</h4>
            <br></br>
          </CardTitle>
          <CardBody>{errori}</CardBody>
        </Card>
      );
    } else {
      return null;
    }
  };

  render() {
    const { perizia, immagini } = this.props;
    if (perizia == null) return null;

    return (
      <div className="m-3">
        <h4>Perizia di Andrea Del Pup</h4>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <CardBody>
            <Carousel data={immagini} />
          </CardBody>
          <CardBody>
            <CardTitle>
              <h4>&nbsp;&nbsp;&nbsp;Informazioni generiche</h4>
              <br></br>
            </CardTitle>
            <FormGroup>
              <Label for="descrizione">Tipo moneta</Label>
              <h5 name="descrizione" id="descrizione">
                {perizia.descrizione}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="periodo">Periodo</Label>
              <h5 name="periodo" id="periodo">
                {perizia.periodo}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="valuta">Valuta</Label>
              <h5 name="valuta" id="valuta">
                {perizia.valuta}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="zecca">Zecca</Label>
              <h5 name="zecca" id="zecca">
                {perizia.zecca}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="lega_metallica">Lega metallica</Label>
              <h5 name="lega_metallica" id="lega_metallica">
                {perizia.lega_metallica}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="orientamento_asse">Orientamento asse</Label>
              <h5 name="orientamento_asse" id="orientamento_asse">
                {perizia.orientamento_asse}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="contorno">Contorno</Label>
              <h5 name="contorno" id="contorno">
                {perizia.contorno}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="riferimento">Riferimento</Label>
              <h5 name="riferimento" id="riferimento">
                {perizia.riferimento}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="data_perizia">Data perizia</Label>
              <h5 name="data_perizia" id="data_perizia">
                {perizia.data_perizia}
              </h5>
            </FormGroup>
          </CardBody>
        </Card>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <CardBody>
            <CardTitle>
              <h4>&nbsp;&nbsp;&nbsp;Informazioni specifiche</h4>
              <br></br>
            </CardTitle>
            <FormGroup>
              <Label for="peso">Peso</Label>
              <h5 name="peso" id="peso">
                {perizia.peso}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="diametro">Diametro</Label>
              <h5 name="diametro" id="diametro">
                {perizia.diametro}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="spessore">Spessore</Label>
              <h5 name="spessore" id="spessore">
                {perizia.spessore}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="conservazione">Conservazione</Label>
              <h5 name="conservazione">{perizia.conservazione}</h5>
            </FormGroup>
            <FormGroup>
              <Label for="rarita">Rarità</Label>
              <h5 name="rarita" id="rarita">
                {perizia.rarita}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="variante">Errore/Variante</Label>
              <h5 name="variante" id="variante">
                {perizia.variante}
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="collegamento">
                Collegamento a descrizione errore
              </Label>
              <h5 name="collegamento" id="collegamento">
                <a href={perizia.collegamento} target="_blank">
                  {perizia.collegamento} 🔗
                </a>
              </h5>
            </FormGroup>
            <FormGroup>
              <Label for="note">Note</Label>
              <h5 name="note" id="note">
                {perizia.note}
              </h5>
            </FormGroup>
          </CardBody>
        </Card>
        <this.Errori />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { immagini, perizia, errori_di_coniazione } = state.data;
  return {
    perizia,
    errori_di_coniazione,
    immagini,
  };
};

export default connect(mapStateToProps, { postPeriziaItem })(Home);
