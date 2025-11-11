import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skills = {
  cloud: {
    skills: ['AWS (EC2, S3, VPC, Route53, Lambda, MWAA, Glue, IAM)', 'Azure (AKS, ACR, AAD, DevOps, Artifacts)'],
    categories: ['cloud']
  },
  containers: {
    skills: ['Openshift', 'Kubernetes (EKS, AKS)', 'Helm', 'Rancher', 'Docker', 'Docker Swarm'],
    categories: ['containers']
  },
  cicd: {
    skills: ['Terraform', 'CloudFormation', 'Ansible', 'YAML', 'JSON', 'Jenkins', 'Azure DevOps', 'GitLab CI/CD'],
    categories: ['devops', 'cloud']
  },
  monitoring: {
    skills: ['ELK/OpenSearch', 'CloudWatch', 'Grafana', 'Prometheus', 'Jaeger'],
    categories: ['devops', 'data']
  },
  programming: {
    skills: ['Python (FastAPI, Flask, Pandas)', 'Shell', 'Bash', 'SQL', 'HTML', 'CSS', 'JavaScript'],
    categories: ['programming']
  },
  ai: {
    skills: ['RAG pipelines', 'Embeddings', 'Vector DBs', 'MCPs', 'LangChain/LangGraph', 'OpenSearch vector search'],
    categories: ['data', 'programming']
  },
  collaboration: {
    skills: ['Git', 'Bitbucket', 'Jira', 'ServiceNow'],
    categories: ['devops']
  },
  os: {
    skills: ['Linux (CentOS, Ubuntu, RHEL)', 'UNIX', 'Windows'],
    categories: ['programming', 'devops']
  }
};

const SkillCategory = ({ category, skills, color = 'default', activeTab = 'all' }) => {
  // Check if this category should be shown based on active tab
  const shouldShow = activeTab === 'all' || skills.categories.includes(activeTab);
  
  if (!shouldShow) return null;
  
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ 
        display: 'flex', 
        alignItems: 'center',
        '&::after': {
          content: '""',
          flex: 1,
          ml: 2,
          height: '1px',
          backgroundColor: 'divider'
        }
      }}>
        {category.charAt(0).toUpperCase() + category.slice(1).replace(/([A-Z])/g, ' $1')}
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {skills.skills && Array.isArray(skills.skills) && skills.skills.map((skill, index) => (
          <Chip 
            key={index} 
            label={skill} 
            color={color} 
            variant="outlined" 
            sx={{
              transition: 'all 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
              }
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const SkillBar = styled(Box)(({ theme, level }) => ({
  height: '8px',
  borderRadius: '4px',
  background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  width: `${level}%`,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    animation: 'shimmer 2s infinite',
    '@keyframes shimmer': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
  },
}));

const Skills = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState('all');
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = Object.entries(skills);
  const half = Math.ceil(categories.length / 2);
  const firstHalf = categories.slice(0, half);
  const secondHalf = categories.slice(half);
  
  // Filter categories based on active tab
  const filteredCategories = activeTab === 'all' 
    ? categories 
    : categories.filter(([_, skillData]) => skillData.categories.includes(activeTab));
    
  const filteredHalf = Math.ceil(filteredCategories.length / 2);
  const filteredFirstHalf = filteredCategories.slice(0, filteredHalf);
  const filteredSecondHalf = filteredCategories.slice(filteredHalf);

  return (
    <Paper 
      id="skills"
      ref={ref}
      elevation={0}
      sx={{ 
        p: { xs: 3, md: 6 },
        mb: 4,
        borderRadius: 4,
        backgroundColor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${theme.palette.primary.light}20 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
          zIndex: 0,
        },
      }}
    >
      <Box position="relative" zIndex={1}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 6, 
            fontWeight: 700,
            position: 'relative',
            display: 'inline-block',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: 0,
              width: '60px',
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '2px',
            },
          }}
        >
          Skills & Expertise
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          {['all', 'cloud', 'containers', 'devops', 'programming', 'data'].map((tab) => (
            <motion.div
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: '20px',
                  cursor: 'pointer',
                  backgroundColor: activeTab === tab ? 'primary.main' : 'action.hover',
                  color: activeTab === tab ? 'primary.contrastText' : 'text.primary',
                  fontWeight: 500,
                  fontSize: '0.875rem',
                  transition: 'all 0.2s ease',
                  boxShadow: activeTab === tab ? 2 : 0,
                  '&:hover': {
                    backgroundColor: activeTab === tab ? 'primary.dark' : 'action.selected',
                    boxShadow: 3,
                  },
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Box>
            </motion.div>
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          <Box sx={{ flex: 1 }}>
            {filteredFirstHalf.map(([category, skillData]) => (
              <SkillCategory 
                key={category} 
                category={category} 
                skills={skillData} 
                color="primary"
                activeTab={activeTab}
              />
            ))}
          </Box>
          <Box sx={{ flex: 1 }}>
            {filteredSecondHalf.map(([category, skillData]) => (
              <SkillCategory 
                key={category} 
                category={category} 
                skills={skillData} 
                color="secondary"
                activeTab={activeTab}
              />
            ))}
          </Box>
        </Box>
        
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
            Continuously learning and expanding my skill set to stay current with the latest technologies and best practices.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Skills;
