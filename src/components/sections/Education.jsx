import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Education = () => {
  return (
    <Paper 
      id="education"
      elevation={0}
      sx={{ 
        p: 3, 
        mb: 4,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant="h4" component="h2" gutterBottom sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <SchoolIcon sx={{ mr: 1, color: 'primary.main' }} />
        Education & Certifications
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
          Wright State University, Dayton, OH
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
          Master of Science
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          Graduated: Dec 2016
        </Typography>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Typography variant="h5" component="h3" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
        <EmojiEventsIcon sx={{ mr: 1, color: 'primary.main' }} />
        Certifications
      </Typography>
      
      <List dense>
        <ListItem>
          <ListItemText 
            primary="Microsoft Certified: Azure DevOps Engineer Expert"
            primaryTypographyProps={{ variant: 'body1' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="Microsoft Certified: Azure Administrator Associate"
            primaryTypographyProps={{ variant: 'body1' }}
          />
        </ListItem>
        <ListItem>
          <ListItemText 
            primary="HashiCorp Certified: Terraform Associate"
            primaryTypographyProps={{ variant: 'body1' }}
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default Education;
