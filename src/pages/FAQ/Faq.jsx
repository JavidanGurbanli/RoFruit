import React, { useState } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import "./Faq.scss";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

const Faq = () => {
  const [expandedItem, setExpandedItem] = useState(null);
  const { t } = useTranslation(["faq", "header"]);
  const handleAccordionChange = (index) => {
    setExpandedItem(index === expandedItem ? null : index);
  };

  return (
    <section className="faq">
      <div className="container">
        <Helmet>
          <title>RoFruit - {t("header:breadcrumbs.questions")}</title>
        </Helmet>
        <h1>{t("faq:faqTitle")}</h1>
        <Accordion allowToggle onChange={handleAccordionChange}>
          {t("faq:questions", { returnObjects: true }).map((faq, index) => (
            <AccordionItem
              key={index}
              style={{
                borderColor: expandedItem === index ? "#62a403" : "#e3e5eb",
              }}
            >
              <h2>
                <AccordionButton>
                  <h3>{faq.question}</h3>
                  <AccordionIcon
                    style={{
                      color: expandedItem === index ? "#62a403" : "#000",
                    }}
                  />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
