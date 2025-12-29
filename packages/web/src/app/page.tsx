'use client';

import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import { useStatesQuery, type State } from '@reva-frontend/common';

export default function Home() {
  const { data: states, isLoading, error } = useStatesQuery();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          US States
        </Typography>
        {isLoading && <Typography>Loading states...</Typography>}
        {error && (
          <Typography color="error">
            Error loading states: {error instanceof Error ? error.message : 'Unknown error'}
          </Typography>
        )}
        {states && (
          <List>
            {states.map((state: State) => (
              <ListItem key={state.nameAbbr}>
                <ListItemText
                  primary={state.name}
                  secondary={state.nameAbbr}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

