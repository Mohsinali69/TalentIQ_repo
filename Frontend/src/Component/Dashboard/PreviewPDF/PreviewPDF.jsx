/* eslint-disable react/prop-types */

import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    fontSize: 12,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  offerTitleContainer: {
    marginBottom: 20,
    textAlign: "center",
  },
  offerTitleText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  underline: {
    marginTop: 2,
    width: "100%",
    height: 1,
    backgroundColor: "black",
  },
  bodyText: {
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  list: {
    marginLeft: 15,
    marginTop: 5,
  },
  listItem: {
    marginBottom: 5,
  },
  signatureSection: {
    marginTop: 20,
    textAlign: "left",
  },
  signatureImage: {
    width: 100, // Adjust the size of the signature
    height: 50,
    marginVertical: 5,
  },
  sincerelyText: {
    marginTop: 10,
    fontWeight: "bold",
  },
  acceptance: {
    marginTop: 20,
    borderTop: "1px solid black",
    paddingTop: 10,
  },
  signature: {
    marginTop: 10,
    width: 150, // Adjust the width as needed
    height: 50, // Adjust the height as needed
  },
  signatureField: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    flexGrow: 1,
  },
  line: {
    borderBottom: "1px solid black",
    width: "60%",
  },
});

// Function to parse HTML with support for <p>, <br>, <strong>, <ul>, <ol>, and <li> tags
const parseHTMLWithFullSupport = (html) => {
  const sections = [];
  const regex =
    /(<p>|<br>|<ul>|<ol>|<li>|<\/p>|<\/ul>|<\/ol>|<\/li>|<strong>|<\/strong>)/g;
  const parts = html?.split(regex);

  let inList = false;

  parts.forEach((part) => {
    part = part.trim();

    if (part === "<p>") {
      sections.push({ type: "paragraphStart" });
    } else if (part === "</p>") {
      sections.push({ type: "paragraphEnd" });
    } else if (part === "<br>") {
      sections.push({ type: "lineBreak" });
    } else if (part === "<ul>" || part === "<ol>") {
      inList = true;
      sections.push({ type: "listStart" });
    } else if (part === "</ul>" || part === "</ol>") {
      inList = false;
      sections.push({ type: "listEnd" });
    } else if (part === "<li>") {
      sections.push({ type: "listItemStart" });
    } else if (part === "</li>") {
      sections.push({ type: "listItemEnd" });
    } else if (part === "<strong>") {
      sections.push({ type: "boldStart" });
    } else if (part === "</strong>") {
      sections.push({ type: "boldEnd" });
    } else if (part) {
      if (inList) {
        sections.push({ type: "listItem", content: part });
      } else {
        sections.push({ type: "text", content: part });
      }
    }
  });

  return sections;
};

// Render parsed HTML
const renderParsedHTML = (sections) => {
  const output = [];
  let paragraphContent = [];
  let listItems = [];
  let isBold = false;

  sections.forEach((section, index) => {
    switch (section.type) {
      case "paragraphStart":
        paragraphContent = [];
        break;
      case "paragraphEnd":
        output.push(
          <Text key={index} style={styles.bodyText}>
            {paragraphContent}
          </Text>
        );
        paragraphContent = [];
        break;
      case "lineBreak":
        paragraphContent.push("\n");
        break;
      case "listStart":
        listItems = [];
        break;
      case "listItem":
        listItems.push(
          <Text key={index} style={styles.listItem}>
            • {section.content}
          </Text>
        );
        break;
      case "listEnd":
        output.push(
          <View key={index} style={styles.list}>
            {listItems}
          </View>
        );
        listItems = [];
        break;
      case "boldStart":
        isBold = true;
        break;
      case "boldEnd":
        isBold = false;
        break;
      case "text":
        if (isBold) {
          paragraphContent.push(
            <Text key={index} style={styles.boldText}>
              {section.content}
            </Text>
          );
        } else {
          paragraphContent.push(section.content);
        }
        break;
      default:
        break;
    }
  });

  return output;
};

const PreviewPDF = ({ data }) => {
  const parsedSections = parseHTMLWithFullSupport(data?.description);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text>{data?.date}</Text>
          <Text>{data?.candidate}</Text>
          {/* <Text>Faculty of Computing</Text>
          <Text>Universiti Teknologi Malaysia</Text>
          <Text>81310 UTM Johor Bahru</Text>
          <Text>Johor</Text> */}
        </View>

        {/* Title */}
        <View style={styles.section}>
          <Text style={styles.title}>Dear {data?.candidate.split(" ")[0]},</Text>
        </View>

             {/* Offer Title */}
        <View style={styles.offerTitleContainer}>
          <Text style={styles.offerTitleText}>INTERNSHIP OFFER</Text>
          <View style={styles.underline}></View>
        </View>
        {/* Description */}
        <View style={styles.section}>{renderParsedHTML(parsedSections)}</View>

        {/* Yours Sincerely Section */}
        <View style={styles.signatureSection}>
          <Text>Yours sincerely,</Text>
          <Image style={styles.signatureImage} src={data?.signature} />
          <Text style={styles.sincerelyText}>{data?.sincerely}</Text>
          <Text>{data?.position}</Text>
          <Text>{data?.company}</Text>
        </View>

        {/* Acceptance Section */}
        <View style={styles.acceptance}>
          <Text>
            Please indicate your acceptance by signing on the space provided for and email a
            signed copy of this document to <Text style={styles.boldText}> {data?.email}</Text>.
          </Text>
          <Text style={{ marginTop: 10,marginBottom:10, fontStyle: "italic", fontWeight: "bold" }}>
            I acknowledge that I have read and do hereby accept the internship offer and
            descriptions contained in this document.
          </Text>
          <View style={styles.signatureField}>
            <Text style={styles.label}>Name in block letter</Text>
            <Text style={styles.line}> </Text>
          </View>
          <View style={styles.signatureField}>
            <Text style={styles.label}>NRIC / Passport</Text>
            <Text style={styles.line}> </Text>
          </View>
          <View style={styles.signatureField}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.line}> </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PreviewPDF;
