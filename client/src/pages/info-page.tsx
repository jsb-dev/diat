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

const ulStyles = {
  padding: '3rem 5rem',
  listStyleType: 'disc',
  color: '#fff',
};

function InfoPage() {
  const renderSection = (section: SectionType) => (
    section.sections.map((item: ItemType, index: number) => {
      switch (item.type) {
        case 'heading':
          return <Typography key={index} variant="h3" component="h3" className="h3-selector">{item.content}</Typography>;
        case 'subheading':
          return <Typography key={index} variant="h4" component="h4" className="h4-selector">{item.content}</Typography>;
        case 'paragraph':
          return <Typography key={index} variant="body1" className="p-selector">{item.content}</Typography>;
        case 'list':
          if (Array.isArray(item.content)) {
            return (
              <ul key={index} style={ulStyles}>
                {item.content.map((listItem, listItemIndex) => (
                  <li key={listItemIndex} >
                    <Typography variant="body1" className="p-selector">{listItem}</Typography>
                  </li>
                ))}
              </ul>
            );
          }
          break;
        default:
          return <Typography key={index} variant="body1" className="p-selector">{item.content}</Typography>;
      }
    })
  );

  const main = (
    <Container component="main" className='primary-section'>
      <Typography variant='h1' className='h1-selector'>
        Info
      </Typography>
      <Divider />
      <Container component="section" className='section-selector'>
        {renderSection(infoContent.infoSection)}
      </Container>
      <Divider />
      <SiteFooter />
    </Container>
  );

  return <PageShell content={main} page={'/info-page'} />;
}

export default InfoPage;
