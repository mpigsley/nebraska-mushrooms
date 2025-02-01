import * as React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import { Species } from '../utils/species.util';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export interface SpeciesListPDFProps {
  species: Species[];
}

export default function SpeciesListPDF({}: SpeciesListPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}
