import React, { Component } from 'react'

import { FormGroup, FormLabel, Card, Button } from 'react-bootstrap'

import { postPeriziaItem } from '../../actions/perizia'

import { connect } from 'react-redux'

import Carousel from '../../components/immagini/Carousel'

import './home.css'

class Home extends Component {
  componentDidMount() {
    this.props.postPeriziaItem(window.location)
    window.oncontextmenu = function () {
      return false;
   }
   document.onkeydown = function (e) { 
       if (window.event.keyCode == 123 ||  e.button==2)    
       return false;
   }
  }

  Errori = () => {
    const { errori_di_coniazione } = this.props
    const errori = errori_di_coniazione.map(errore => {
      return (
        <Card key={errore.id} className="shadow p-3 mb-5 bg-white rounded">
          <Card.Body>
            <FormGroup>
              <FormLabel htmlFor="peso">Macro categoria</FormLabel>
              <h5 name="peso" id="peso">
                {errore.macro_categoria}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="diametro">Categoria</FormLabel>
              <h5 name="diametro" id="diametro">
                {errore.macrocategoria}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="spessore">Ripetitivita</FormLabel>
              <h5 name="spessore" id="spessore">
                {errore.ripetitivita}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="codice">Codice</FormLabel>
              <h5 name="codice">{errore.codice}</h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="rarita">Descrizione</FormLabel>
              <h5 name="descrizione" id="descrizione">
                {errore.descrizione}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="riferiemento_esterno">Riferiemento esterno</FormLabel>
              <h5 name="riferiemento_esterno" id="riferiemento_esterno">
                {errore.riferiemento_esterno}
              </h5>
            </FormGroup>
          </Card.Body>
        </Card>
      )
    })

    if (errori_di_coniazione.length > 0) {
      return (
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <Card.Title>
            <h4>&nbsp;&nbsp;&nbsp;Errori</h4>
            <br></br>
          </Card.Title>
          <Card.Body>{errori}</Card.Body>
        </Card>
      )
    } else {
      return null
    }
  }

  render() {
    const { perizia, immagini } = this.props
    if (perizia == null) return null

    return (
      <div className="m-3">
        <h4>Perizia di Andrea Del Pup</h4>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <Card.Body>
            <Carousel data={immagini} />
          </Card.Body>
          <Card.Body>
            <Card.Title>
              <h4>&nbsp;&nbsp;&nbsp;Informazioni generiche</h4>
              <br></br>
            </Card.Title>
            <FormGroup>
              <FormLabel htmlFor="descrizione">Tipo moneta</FormLabel>
              <h5 name="descrizione" id="descrizione">
                {perizia.descrizione}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="periodo">Periodo</FormLabel>
              <h5 name="periodo" id="periodo">
                {perizia.periodo}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="valuta">Valuta</FormLabel>
              <h5 name="valuta" id="valuta">
                {perizia.valuta}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="zecca">Zecca</FormLabel>
              <h5 name="zecca" id="zecca">
                {perizia.zecca}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="lega_metallica">Lega metallica</FormLabel>
              <h5 name="lega_metallica" id="lega_metallica">
                {perizia.lega_metallica}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="orientamento_asse">Orientamento asse</FormLabel>
              <h5 name="orientamento_asse" id="orientamento_asse">
                {perizia.orientamento_asse}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="contorno">Contorno</FormLabel>
              <h5 name="contorno" id="contorno">
                {perizia.contorno}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="riferimento">Riferimento</FormLabel>
              <h5 name="riferimento" id="riferimento">
                {perizia.riferimento}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="data_perizia">Data perizia</FormLabel>
              <h5 name="data_perizia" id="data_perizia">
                {perizia.data_perizia}
              </h5>
            </FormGroup>
          </Card.Body>
        </Card>
        <Card className="shadow p-3 mb-5 bg-white rounded">
          <Card.Body>
            <Card.Title>
              <h4>&nbsp;&nbsp;&nbsp;Informazioni specifiche</h4>
              <br></br>
            </Card.Title>
            <FormGroup>
              <FormLabel htmlFor="peso">Peso</FormLabel>
              <h5 name="peso" id="peso">
                {perizia.peso}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="diametro">Diametro</FormLabel>
              <h5 name="diametro" id="diametro">
                {perizia.diametro}
              </h5>
            </FormGroup>
            <FormGroup>
              <FormLabel htmlFor="spessore">Spessore</FormLabel>
              <h5 name="spessore" id="spessore">
                {perizia.spessore}
              </h5>
            </FormGroup>
            {perizia.conservazione != null && perizia.conservazione.length > 0 && (
              <FormGroup>
                <FormLabel htmlFor="conservazione">Conservazione</FormLabel>
                <h5 name="conservazione">{perizia.conservazione}</h5>
              </FormGroup>
            )}
            {perizia.rarita != null && perizia.rarita.length > 0 && (
              <FormGroup>
                <FormLabel htmlFor="rarita">Rarità</FormLabel>
                <h5 name="rarita" id="rarita">
                  {perizia.rarita}
                </h5>
              </FormGroup>
            )}
            {perizia.variante != null && perizia.variante.length > 0 && (
              <FormGroup>
                <FormLabel htmlFor="variante">Errore/Variante</FormLabel>
                <h5 name="variante" id="variante">
                  {perizia.variante}
                </h5>
              </FormGroup>
            )}
            {perizia.collegamento != null && perizia.collegamento.length && (
              <FormGroup>
                <FormLabel htmlFor="collegamento">Collegamento a descrizione errore</FormLabel>
                <br />
                <Button rel="noreferrer" className="m-2 btn btn-info" href={perizia.collegamento} target="_blank">
                  {perizia.collegamento.replace('https://www.erroridiconiazione.com/', '').replace('/', ' ')}
                </Button>
              </FormGroup>
            )}
            {perizia.note != null && perizia.note.length > 0 && (
              <FormGroup>
                <FormLabel htmlFor="note">Note</FormLabel>
                <h5 name="note" id="note">
                  {perizia.note}
                </h5>
              </FormGroup>
            )}
            {perizia.collezione != null && perizia.collezione.length > 0 && (
              <FormGroup>
                <FormLabel htmlFor="collezione">Collezione</FormLabel>
                <h5 name="collezione" id="collezione">
                  {perizia.collezione}
                </h5>
              </FormGroup>
            )}
          </Card.Body>
        </Card>
        <this.Errori />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { immagini, perizia, errori_di_coniazione } = state.data
  return {
    perizia,
    errori_di_coniazione,
    immagini
  }
}

export default connect(mapStateToProps, { postPeriziaItem })(Home)
