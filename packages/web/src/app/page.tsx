'use client';

import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useJurisdictionsQuery, type Jurisdiction } from '@reva-frontend/common';

export default function Home() {
  const { data: jurisdictions, isLoading, error } = useJurisdictionsQuery();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Jurisdictions
        </Typography>
        {isLoading && <Typography>Loading jurisdictions...</Typography>}
        {error && (
          <Typography color="error">
            Error loading jurisdictions: {error instanceof Error ? error.message : 'Unknown error'}
          </Typography>
        )}
        {jurisdictions && (
          <List>
            {jurisdictions.map((jurisdiction: Jurisdiction) => (
              <ListItem key={jurisdiction.id || jurisdiction.name}>
                <ListItemText
                  primary={jurisdiction.name || 'Unnamed Jurisdiction'}
                  secondary={jurisdiction.nameAbbreviation || 'No abbreviation'}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

