import React from 'react';
import { Button, Form, FormGroup, Col, Row, Label, Input, Card, CardBody, CardTitle } from 'reactstrap';

import {
  loadIdToken,
} from "../../utils/apiUtils";

import QRCode from 'qrcode.react';

class AddEditForm extends React.Component {
  state = {
    id: 0,

    stato: '',
    anno: '',
    valore: '',
    uuid: '',

    descrizione: '',
    periodo: '',
    valuta: '',
    zecca: '',
    lega_metallica: '',
    orientamento_asse: '',
    contorno: '',
    riferimento: '',
    data_riferimento: '',

    peso: '',
    diametro: '',
    spessore: '',
    conservazione: '',
    rarita: '',
    variante: '',
    collegamento : '',
    note: '',

    qrcode: ''
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
    var target = e.target.name
    var qrcode = this.props.location.origin + '/'
    switch (target) {
      case 'stato':
        qrcode += e.target.value + '/' + this.state.anno + '/' + this.state.valore + '/' + this.state.uuid
        this.setState({ qrcode })
        break;
      case 'anno':
        qrcode += this.state.stato + '/' + e.target.value + '/' + this.state.valore + '/' + this.state.uuid
        this.setState({ qrcode })
        break;
      case 'valore':
        qrcode += this.state.stato + '/' + this.state.anno + '/' + e.target.value + '/' + this.state.uuid
        this.setState({ qrcode })
        break;
      case 'uuid':
        qrcode += this.state.stato + '/' + this.state.anno + '/' + this.state.valore + '/' + e.target.value
        this.setState({ qrcode })
        break;
    }
  }

  submitFormAdd = e => {
    e.preventDefault()

    const idToken = loadIdToken();
    fetch('/endpoint/crud', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        id: this.state.id,

        stato: this.state.stato,
        anno: this.state.anno,
        valore: this.state.valore,
        uuid: this.state.uuid,

        //generiche
        descrizione: this.state.descrizione,
        periodo: this.state.periodo,
        valuta: this.state.valuta,
        zecca: this.state.zecca,
        lega_metallica: this.state.lega_metallica,
        orientamento_asse: this.state.orientamento_asse,
        contorno: this.state.contorno,
        riferimento: this.state.riferimento,
        data_riferimento: this.state.data_riferimento,

        //specifiche
        peso: this.state.peso,
        diametro: this.state.diametro,
        spessore: this.state.spessore,
        conservazione: this.state.conservazione,
        rarita: this.state.rarita,
        variante: this.state.variante,
        collegamento: this.state.collegamento,
        note: this.state.note,
      })
    })
      .then(response => response.json())
      .then(item => {
        console.log(item)
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.setItemId(item[0].id)
        } else {
          console.log('failure')
          this.props.onFailure('Nessuna riga inserita...')
        }
      })
      .catch(err => {
        console.log(err)
        this.props.onFailure(err)
      })
  }

  submitFormEdit = e => {
    e.preventDefault()

    const idToken = loadIdToken();
    fetch('/endpoint/crud', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`
      },
      body: JSON.stringify({
        id: this.state.id,

        stato: this.state.stato,
        anno: this.state.anno,
        valore: this.state.valore,
        uuid: this.state.uuid,

        //generiche
        descrizione: this.state.descrizione,
        periodo: this.state.periodo,
        valuta: this.state.valuta,
        zecca: this.state.zecca,
        lega_metallica: this.state.lega_metallica,
        orientamento_asse: this.state.orientamento_asse,
        contorno: this.state.contorno,
        riferimento: this.state.riferimento,
        data_perizia: this.state.data_perizia,

        //specifiche
        peso: this.state.peso,
        diametro: this.state.diametro,
        spessore: this.state.spessore,
        conservazione: this.state.conservazione,
        rarita: this.state.rarita,
        variante: this.state.variante,
        collegamento: this.state.collegamento,
        note: this.state.note,
      })
    })
      .then(response => response.json())
      .then(item => {
        if (Array.isArray(item)) {
          this.props.updateState(item[0])
          //this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const {
        id,
        stato,
        anno,
        valore,
        uuid,

        descrizione,
        periodo,
        valuta,
        zecca,
        lega_metallica,
        orientamento_asse,
        contorno,
        riferimento,
        data_perizia,

        peso,
        diametro,
        spessore,
        conservazione,
        rarita,
        variante,
        collegamento,
        note } = this.props.item

      const qrcode = this.props.location.origin + '/' + stato + '/' + anno + '/' + valore + '/' + uuid

      this.setState({
        id, stato, anno, valore, uuid, descrizione, periodo, valuta, zecca, lega_metallica, orientamento_asse, contorno, riferimento, data_perizia,
        peso, diametro, spessore, conservazione, rarita, variante, collegamento, note, qrcode
      })
    }
  }

  render() {
    const { item } = this.props
    let readOnly = false
    // if (item) {
    //   readOnly = true
    // }
    return (
      <>
        <center>
          <QRCode level='L' value={this.state.qrcode} />
        </center>
        <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <CardBody>
              <CardTitle>Generiche</CardTitle>
              <Row>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="stato">Stato</Label>
                    <Input readOnly={readOnly} type="text" name="stato" id="stato" onChange={this.onChange} value={this.state.stato === null ? '' : this.state.stato} />
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="anno">Anno</Label>
                    <Input readOnly={readOnly} type="text" name="anno" id="anno" onChange={this.onChange} value={this.state.anno === null ? '' : this.state.anno} />
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="valore">Valore</Label>
                    <Input readOnly={readOnly} type="text" name="valore" id="valore" onChange={this.onChange} value={this.state.valore === null ? '' : this.state.valore} />
                  </FormGroup>
                </Col>
                <Col sm={3}>
                  <FormGroup>
                    <Label for="uuid">uuid</Label>
                    <Input readOnly={readOnly} type="text" name="uuid" id="uuid" onChange={this.onChange} value={this.state.uuid === null ? '' : this.state.uuid} />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="descrizione">Tipo moneta</Label>
                <Input type="text" name="descrizione" id="descrizione" onChange={this.onChange} value={this.state.descrizione === null ? '' : this.state.descrizione} />
              </FormGroup>
              <FormGroup>
                <Label for="periodo">Periodo</Label>
                <Input type="text" name="periodo" id="periodo" onChange={this.onChange} value={this.state.periodo === null ? '' : this.state.periodo} />
              </FormGroup>
              <FormGroup>
                <Label for="valuta">Valuta</Label>
                <Input type="text" name="valuta" id="valuta" onChange={this.onChange} value={this.state.valuta === null ? '' : this.state.valuta} />
              </FormGroup>
              <FormGroup>
                <Label for="zecca">Zecca</Label>
                <Input name="zecca" id="zecca" onChange={this.onChange} value={this.state.zecca === null ? '' : this.state.zecca} />
              </FormGroup>
              <FormGroup>
                <Label for="lega_metallica">Lega metallica</Label>
                <Input name="lega_metallica" id="lega_metallica" onChange={this.onChange} value={this.state.lega_metallica === null ? '' : this.state.lega_metallica} />
              </FormGroup>
              <FormGroup>
                <Label for="orientamento_asse">Orientamento asse</Label>
                <Input type="text" name="orientamento_asse" id="orientamento_asse" onChange={this.onChange} value={this.state.orientamento_asse === null ? '' : this.state.orientamento_asse} />
              </FormGroup>
              <FormGroup>
                <Label for="contorno">Contorno</Label>
                <Input type="text" name="contorno" id="contorno" onChange={this.onChange} value={this.state.contorno === null ? '' : this.state.contorno} />
              </FormGroup>
              <FormGroup>
                <Label for="riferimento">Riferimento</Label>
                <Input type="text" name="riferimento" id="riferimento" onChange={this.onChange} value={this.state.riferimento === null ? '' : this.state.riferimento} />
              </FormGroup>
              <FormGroup>
                <Label for="data_perizia">Data perizia</Label>
                <Input type="text" name="data_perizia" id="data_perizia" onChange={this.onChange} value={this.state.data_perizia === null ? '' : this.state.data_perizia} />
              </FormGroup>
            </CardBody>
          </Card>
          <Card className="shadow p-3 mb-5 bg-white rounded">
            <CardBody>
              <CardTitle>Specifiche</CardTitle>
              <FormGroup>
                <Label for="peso">Peso</Label>
                <Input type="text" name="peso" id="peso" onChange={this.onChange} value={this.state.peso === null ? '' : this.state.peso} />
              </FormGroup>
              <FormGroup>
                <Label for="diametro">Diametro</Label>
                <Input type="text" name="diametro" id="diametro" onChange={this.onChange} value={this.state.diametro} />
              </FormGroup>
              <FormGroup>
                <Label for="spessore">Spessore</Label>
                <Input type="text" name="spessore" id="spessore" onChange={this.onChange} value={this.state.spessore} />
              </FormGroup>
              <FormGroup>
                <Label for="spessore">Conservazione</Label>
                <Input type="text" name="conservazione" id="conservazione" onChange={this.onChange} value={this.state.conservazione} />
              </FormGroup>
              <FormGroup>
                <Label for="rarita">Rarità</Label>
                <Input type="text" name="rarita" id="rarita" onChange={this.onChange} value={this.state.rarita} />
              </FormGroup>
              <FormGroup>
                <Label for="variante">Errore/Variante</Label>
                <Input type="text" name="variante" id="variante" onChange={this.onChange} value={this.state.variante} />
              </FormGroup>
              <FormGroup>
                <Label for="collegamento">Collegamento a descrizione errore</Label>
                <Input type="text" name="collegamento" id="collegamento" onChange={this.onChange} value={this.state.collegamento} />
              </FormGroup>
              <FormGroup>
                <Label for="note">Note</Label>
                <Input type="textarea" name="note" id="note" onChange={this.onChange} value={this.state.note} />
              </FormGroup>
            </CardBody>
          </Card>

          <Button>Salva</Button>
        </Form>
      </>
    );
  }
}

export default AddEditForm