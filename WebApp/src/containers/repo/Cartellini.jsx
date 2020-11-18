import React from "react";
import { Page, Document, StyleSheet, View, Font, Image } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

import KadwaRegular from '../../fonts/KadwaRegular.ttf'
import KadwaBold from '../../fonts/KadwaBold.ttf'

import separator from '../../img/separator.png'

import moment from 'moment'
import 'moment/locale/it'
moment.locale('it');

Font.register(KadwaRegular, { family: 'KadwaRegular' });
Font.register(KadwaBold, { family: 'KadwaBold' });

// Create styles
const styles = StyleSheet.create({
  page: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "25pt",
  },
});

const ViewEdgeAreaSeparator = styled.View`
  margin: 4cm;
`;

const ViewEdgeArea = styled.View`
  maxWidth: 4.2cm;
  width: 4.2cm;
  maxHeight: 4.2cm;
  height: 4.2cm;

  padding: 1pt;
  margin: 1pt;
  border: solid 0.2pt #B71C1C;
  background: #FFEFD5;
`;

const ViewEdgeAreaInterna = styled.View`
  maxWidth: 4cm;
  width: 4cm;
  maxHeight: 4cm;
  height: 4cm;

  padding: 1pt;
  margin: 1pt;
  border: solid 0.2pt;
  borderColor: #B71C1C;
  background: #FFEFD5;
`;

const TextViewLabel = styled.Text`
  fontSize: 5pt;
  fontFamily: 'KadwaBold';
  lineHeight: 1.3pt;
`;

const TextViewLabelCaratteristiche = styled.Text`
  marginBottom: '3pt';
  marginLeft: 3pt;
  marginRight: 3pt;
  fontSize: 4.5pt;
  fontFamily: 'KadwaBold';
  lineHeight: 1.3pt;
`

const TextViewLabelCaratteristicheBig = styled.Text`
  marginBottom: '4pt';
  marginLeft: 3pt;
  marginRight: 3pt;
  fontSize: 6pt;
  fontFamily: 'KadwaBold';
  lineHeight: 1.3pt;
`

const TextViewValueCenter = styled.Text`
  fontSize: 5pt;
  fontFamily: 'KadwaRegular';
  lineHeight: 1.3pt;
  textAlign: center;
`;

const TextViewValue = styled.Text`
  fontSize: 5pt;
  fontFamily: 'KadwaRegular';
  lineHeight: 1.3pt;
`;

const TextViewValueData = styled.Text`
  fontSize: 4pt;
  fontFamily: 'KadwaRegular';
  lineHeight: 1.3pt;
`;

const TextViewT = styled.Text`
  fontSize: 10pt;
  fontFamily: 'KadwaRegular';
  text-align: center;
  lineHeight: 1.1pt;
`;

const TextViewTred = styled.Text`
  fontSize: 8pt;
  fontFamily: 'KadwaRegular';
  text-align: center;
  lineHeight: 1pt;
  color: #B71C1C;
`;

const TextViewTm = styled.Text`
  letterSpacing:-0.5pt;
  fontSize: 12pt;
  fontFamily: 'KadwaRegular';
  textAlign: center;
`;

// ---------------------------

const TextViewTmSmall = styled.Text`
  letterSpacing:-0.5pt;
  fontSize: 8pt;
  fontFamily: 'KadwaRegular';
  textAlign: center;
`;

const TextViewTsmall = styled.Text`
  fontSize: 6pt;
  fontFamily: 'KadwaRegular';
  text-align: center;
  lineHeight: 0.8pt;
`;


const getData = (row) => {
  const scaleFactor = 1
  const canvas = document.getElementById(`qr_${row.id}`)

  //canvas.scale(scaleFactor, scaleFactor);
  // var oCtx = canvas.getContext('2d', { alpha: true });
  // oCtx.webkitImageSmoothingEnabled = false;
  // oCtx.mozImageSmoothingEnabled = false;
  // oCtx.imageSmoothingEnabled = false;
  // oCtx.scale(scaleFactor, scaleFactor);

  // var imgData = oCtx.getImageData(0, 0, canvas.width, canvas.height);
  // var data = imgData.data;
  // for (var i = 0; i < data.length; i += 4) {
  //   if (data[i + 3] < 255) {
  //     data[i] = 255;
  //     data[i + 1] = 255;
  //     data[i + 2] = 255;
  //     data[i + 3] = 255;
  //   }
  // }
  // oCtx.putImageData(imgData, 0, 0);

  if (canvas == null) return null

  return canvas.toDataURL("image/png", 1)
}

// Create Document Component
const Cartellini = (rows) => {
  
  // {moment(new Date()).format("DD MMMM YYYY")}
  
  return <Document>
    <Page size="A4" style={styles.page}>
      {rows.map((row, index) => {
        return (
          <View key={row.id} style={{
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "nowrap",
          }}>
            <ViewEdgeArea>
              <ViewEdgeAreaInterna>
                <TextViewT>DR. <TextViewTm>A </TextViewTm><TextViewT>NDREA <TextViewTm>D </TextViewTm>EL <TextViewTm>P </TextViewTm>UP</TextViewT></TextViewT>
                <TextViewTred><TextViewTm>P  </TextViewTm>ERITO <TextViewTm>N  </TextViewTm>UMISMATICO</TextViewTred>
                <TextViewValueCenter style={{ color: "#B71C1C" }}>Specializzato in errori di coniazione</TextViewValueCenter>
                <TextViewValueCenter style={{ color: "#B71C1C" }}>CCIAA di Trieste sigillo n.725</TextViewValueCenter>
                <TextViewValueCenter>L'esemplare qui esaminato e descritto sul retro è garantito autentico</TextViewValueCenter>
                <Image style={{ marginTop: "4pt", marginBottom: "4pt" }} source={separator}></Image>
                <Image style={{ width: "51pt" }} source={{ uri: getData(row) }} />
                <TextViewValueData style={{ position: 'absolute', bottom: 48, right: 3 }}>Trieste, {row.data_perizia}</TextViewValueData>
                <Image style={{ position: 'absolute', bottom: 25, left: '57pt', right: '0pt' }} source={separator}></Image>
                <TextViewValue style={{ position: 'absolute', bottom: 15, right: 3 }}>erroridiconiazione.com</TextViewValue>
                <TextViewValue style={{ position: 'absolute', bottom: 5, right: 3 }}>andreadelpup@libero.it</TextViewValue>
              </ViewEdgeAreaInterna>
            </ViewEdgeArea>
            <ViewEdgeArea>
              <ViewEdgeAreaInterna>
                <TextViewTsmall>DR. <TextViewTmSmall>A </TextViewTmSmall><TextViewTsmall>NDREA <TextViewTmSmall>D </TextViewTmSmall>EL <TextViewTmSmall>P </TextViewTmSmall>UP</TextViewTsmall></TextViewTsmall>
                <Image style={{ marginTop: "4pt", marginBottom: "4pt" }} source={separator}></Image>
                <TextViewLabelCaratteristiche >{'Perizia n°\t'}<TextViewValue>{row.stato}/{row.anno}/{row.valore}/{row.uuid}</TextViewValue></TextViewLabelCaratteristiche>
                <TextViewLabelCaratteristicheBig style={{ textAlign: 'center' }}>{row.descrizione}</TextViewLabelCaratteristicheBig>
                <TextViewLabelCaratteristiche style={{ textAlign: 'center' }}>{row.periodo}</TextViewLabelCaratteristiche>
                <TextViewLabelCaratteristiche>Contorno: <TextViewValue>{row.contorno}</TextViewValue></TextViewLabelCaratteristiche>
                <TextViewLabelCaratteristiche>Peso: <TextViewValue>{row.peso}</TextViewValue><TextViewLabelCaratteristiche>   Diametro: <TextViewValue>{row.diametro}</TextViewValue></TextViewLabelCaratteristiche></TextViewLabelCaratteristiche>
                <TextViewLabelCaratteristiche>Metallo: <TextViewValue>{row.lega_metallica}</TextViewValue></TextViewLabelCaratteristiche>
                <TextViewLabelCaratteristiche>Note: <TextViewValue>{row.note}</TextViewValue></TextViewLabelCaratteristiche>
                <View style={{ bottom: '1pt', position: 'absolute', display: "flex", alignItems: "center", width: "100%" }} >
                  <TextViewLabel >Rarità: <TextViewValue>{row.rarita}    </TextViewValue><TextViewLabel>Conservazione: <TextViewValue>{row.conservazione}</TextViewValue></TextViewLabel></TextViewLabel>
                </View>
              </ViewEdgeAreaInterna>
            </ViewEdgeArea>
            {/* {index % 7 == 0 && (<ViewEdgeAreaSeparator></ViewEdgeAreaSeparator>)} */}
          </View>
        );
      })}
    </Page>
  </Document >
};

export default Cartellini;
