import React from "react";
import { Page, Text, Document, StyleSheet } from "@react-pdf/renderer";
import styled from "@react-pdf/styled-components";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Viewl = styled.Text`
  padding:2%;
  margin: 10px;
  font-size: 8px;
  font-family: "Helvetica";
  maxWidth: 4cm;
  width:4cm;
  maxHeight: 4cm;
  height:4cm;
  border: solid 1px;
`;

// Create Document Component
const MyDocument = (rows) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {rows.map((item) => {
        return (
          <Viewl key={item.id}>un po di testo</Viewl>
          // <View key={item.id} style={styles.section}>
          // </View>
        );
      })}
      {/* <View style={styles.section}>
        <Text>Section #2</Text>
      </View> */}
    </Page>
  </Document>
);

export default MyDocument;
