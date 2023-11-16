import React from "react";
import { Container, Divider, Typography } from "@mui/material";
import PageShell from "@/components/shared/page-shell/PageShell";
import SiteFooter from "@/components/shared/SiteFooter";
import infoContent from "@/assets/data/InfoContent.json";

type ItemType = {
  type: string;
  content: string | string[];
};

type SectionType = {
  sections: ItemType[];
};

function InfoPage() {
  const renderSection = (section: SectionType) => (
    section.sections.map((item: ItemType, index: number) => {
      switch (item.type) {
        case 'heading':
          return <Typography key={index} variant="h4">{item.content}</Typography>;
        case 'subheading':
          return <Typography key={index} variant="h5">{item.content}</Typography>;
        case 'paragraph':
          return <Typography key={index} variant="body1" className="p.selector">{item.content}</Typography>;
        case 'list':
          if (Array.isArray(item.content)) {
            return (
              <ul key={index}>
                {item.content.map((listItem, listItemIndex) => (
                  <li key={listItemIndex}>
                    <Typography variant="body1">{listItem}</Typography>
                  </li>
                ))}
              </ul>
            );
          }
          break;
        default:
          return <Typography key={index}>{item.content}</Typography>;
      }
    })
  );

  const main = (
    <Container component="main" className='primary-section'>
      <Typography variant='h1' className='h1-selector'>
        Info
      </Typography>
      <Divider />
      <Container component="section">
        {renderSection(infoContent.infoSection)}
      </Container>
      <Divider />
      <SiteFooter />
    </Container>
  );

  return <PageShell content={main} page={'/info-page'} />;
}

export default InfoPage;
