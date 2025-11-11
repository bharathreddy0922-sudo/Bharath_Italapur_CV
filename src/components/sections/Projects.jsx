import React from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  Button, 
  Link as MuiLink,
  Chip,
  CardActionArea,
  CardActions,
  Stack,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const ProjectCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
}));

const ProjectCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  '&:last-child': {
    paddingBottom: theme.spacing(2),
  },
}));

const Project = ({ title, description, tags, githubUrl, liveUrl }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      style={{ height: '100%' }}
    >
      <ProjectCard elevation={2}>
        <CardActionArea 
          component="div" 
          onClick={() => window.open(liveUrl || githubUrl, '_blank')}
          sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
        >
          <ProjectCardContent>
            <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2, flexGrow: 1 }}>
              {description}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {tags.map((tag, index) => (
                  <Chip 
                    key={index} 
                    label={tag} 
                    size="small" 
                    variant="outlined"
                    sx={{ 
                      fontSize: '0.7rem',
                      height: 24,
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </ProjectCardContent>
          <CardActions sx={{ width: '100%', px: 2, pb: 2 }}>
            {githubUrl && (
              <Button
                size="small"
                startIcon={<GitHubIcon fontSize="small" />}
                component={MuiLink}
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                sx={{ textTransform: 'none' }}
              >
                {isMobile ? 'Code' : 'View Code'}
              </Button>
            )}
            {liveUrl && (
              <Button
                size="small"
                startIcon={<OpenInNewIcon fontSize="small" />}
                component={MuiLink}
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                sx={{ textTransform: 'none' }}
              >
                {isMobile ? 'Live' : 'Live Demo'}
              </Button>
            )}
          </CardActions>
        </CardActionArea>
      </ProjectCard>
    </motion.div>
  );
};

Project.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  githubUrl: PropTypes.string,
  liveUrl: PropTypes.string,
};

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'ChatVault.ai',
      description: 'A secure chat application with end-to-end encryption and real-time messaging capabilities. Built with modern web technologies to ensure privacy and performance.',
      tags: ['React', 'Node.js', 'MongoDB', 'WebSockets', 'JWT', 'Encryption'],
      githubUrl: 'https://github.com/bharathreddy0922-sudo/ChatVault.ai',
      liveUrl: '#'  // Add live URL if available
    },
    {
      id: 2,
      title: 'MycoBites',
      description: 'A platform for mushroom enthusiasts to discover and learn about various mushroom species, featuring community contributions and expert verification.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
      githubUrl: 'https://github.com/bharathreddy0922-sudo/MycoBites',
      liveUrl: '#'  // Add live URL if available
    }
  ];

  return (
    <Paper 
      component="section"
      id="projects"
      elevation={0}
      sx={{ 
        p: { xs: 2, sm: 3 },
        mb: 4,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            fontWeight: 700,
            '& svg': {
              mr: 1.5,
              color: 'primary.main',
            },
          }}
        >
          <CodeIcon />
          Featured Projects
        </Typography>
        <Typography variant="body1" color="text.secondary">
          A selection of projects I've worked on, ranging from full-stack applications to open-source contributions.
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
          '& > *': {
            minWidth: 0, // Fix for flexbox grid layout
          },
        }}
      >
        {projects.map((project) => (
          <Project
            key={project.id}
            title={project.title}
            description={project.description}
            tags={project.tags}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
          />
        ))}
      </Box>
    </Paper>
  );
};

export default React.memo(Projects);
