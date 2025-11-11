import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  Button, 
  Chip,
  Collapse,
  useMediaQuery,
  Link as MuiLink,
  Stack,
  Divider,
  Fade,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  CardHeader,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  styled,
  alpha
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import StarIcon from '@mui/icons-material/Star';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const experiences = [
  {
    id: 1,
    company: 'TIAA (via Cognizant)',
    position: 'Sr. Cloud DevOps Engineer',
    duration: 'May 2023 – Present',
    location: 'Hybrid (TIAA, Charlotte, NC)',
    skills: ['AWS', 'Terraform', 'Kubernetes', 'OpenSearch', 'Python', 'AI/ML', 'Lambda', 'MWAA', 'GitLab'],
    highlights: [
      'Automated AWS infrastructure with Terraform for 100+ workloads, reducing manual effort by 70% and ensuring high availability/fault tolerance.',
      'Migrated Airflow to AWS MWAA, cutting operational overhead by 30% and standardizing DAG deployments.',
      'Implemented ELK/OpenSearch dashboards with ISM/ILM policies, reducing MTTR by 44%.',
      'Converted 200+ CloudFormation templates to Terraform modules, achieving AWS 2.0 compliance.',
      'Developed Python microservices for ingestion & analytics pipelines integrated with AWS Glue DataBrew.',
      'Built AI-powered semantic search using OpenSearch + embeddings, enabling compliance teams to query millions of records in real time.',
      'Created "VFix," an AI agent that fixes AWS vulnerabilities by auto-updating Terraform code via LangChain and LangGraph, cutting developer effort by over 60%.'
    ],
    achievements: [
      'Reduced cloud costs by 35% through rightsizing and optimization strategies',
      'Achieved 99.99% uptime for critical financial services applications',
      'Mentored 5 junior engineers, improving team productivity by 40%'
    ]
  },
  {
    id: 2,
    company: 'Amdocs (via Sai Global Solutions)',
    position: 'Sr. Cloud DevOps Engineer',
    duration: 'Feb 2022 – May 2023',
    location: 'Hybrid (Remote for Amdocs, St. Louis, MO)',
    skills: ['Azure', 'Kubernetes', 'Terraform', 'ELK', 'Helm', 'Ansible', 'Rancher', 'Jaeger', '5G'],
    highlights: [
      'Deployed AKS clusters with Terraform, scaling 5G data services to handle 1M+ daily transactions.',
      'Automated CI/CD pipelines with Azure DevOps, reducing release cycle time by 60%.',
      'Integrated ELK + Jaeger for distributed tracing, improving issue resolution speed by 35%.',
      'Implemented Rancher for multi-cluster management, improving uptime to 99.9%.',
      'Containerized 5G applications with Helm & Ansible, ensuring reproducible deployments.'
    ],
    achievements: [
      'Reduced deployment failures by 75% through improved CI/CD practices',
      'Cut infrastructure provisioning time from days to minutes',
      'Led migration of 50+ microservices to Kubernetes'
    ]
  },
  {
    id: 3,
    company: 'GXO Logistics (via Lakarya LLC)',
    position: 'Sr. DevOps Engineer',
    duration: 'Dec 2019 – Jan 2022',
    location: 'Hybrid (Remote for GXO Logistics, High Point, NC)',
    skills: ['Kubernetes', 'Docker', 'ELK', 'Kafka', 'Helm', 'Ansible', 'Grafana', 'Prometheus'],
    highlights: [
      'Migrated 45 ELK clusters + Kafka from on-prem to Kubernetes, boosting scalability and reducing downtime by 40%.',
      'Developed Helm charts for ELK/Kafka, standardizing deployments across environments.',
      'Automated cluster management with Ansible, reducing manual operations by 50%.',
      'Upgraded ELK versions 5.6 to 7.9 with zero-downtime rollouts.',
      'Implemented Grafana dashboards and alerts, reducing incident response time by 35%.'
    ],
    achievements: [
      'Improved system reliability with 99.9% uptime for critical logistics applications',
      'Reduced operational overhead through comprehensive automation',
      'Mentored junior team members in Kubernetes and cloud-native technologies'
    ]
  },
  {
    id: 4,
    company: 'AT&T (via Ordusion Technologies)',
    position: 'DevOps Engineer',
    duration: 'Dec 2017 – Dec 2019',
    location: 'Hybrid (Remote for AT&T, Dallas, TX)',
    skills: ['AWS', 'EKS', 'Jenkins', 'Docker', 'ELK', 'Helm', 'Grafana'],
    highlights: [
      'Deployed ELK stack on AWS EKS for 20+ teams, centralizing monitoring and logging.',
      'Built CI/CD pipelines in Jenkins, enabling daily deployments (reduced from weekly).',
      'Containerized ELK applications with Docker & Helm, ensuring consistency across environments.',
      'Implemented Grafana alerts on AWS, reducing downtime by 25%.',
      'Provided 24/7 production support, maintaining SLA uptime >99.9%.'
    ],
    achievements: [
      'Improved system observability and reduced mean time to resolution',
      'Enhanced deployment frequency and reliability',
      'Contributed to maintaining high availability for critical services'
    ]
  },
  {
    id: 5,
    company: 'DTCC (via Veridic Solutions)',
    position: 'DevOps Engineer',
    duration: 'May 2017 – Dec 2017',
    location: 'Hybrid (Remote for DTCC, Jersey City, NJ)',
    skills: ['AWS', 'CloudFormation', 'Python', 'Linux', 'CI/CD', 'Infrastructure as Code'],
    highlights: [
      'Provisioned AWS infrastructure with CloudFormation templates, enabling repeatable deployments.',
      'Automated provisioning workflows, reducing setup time by 50%.',
      'Supported teams with AWS best practices in security and performance.',
      'Implemented monitoring and alerting solutions for cloud resources.',
      'Collaborated with development teams to optimize application deployment processes.'
    ],
    achievements: [
      'Improved infrastructure consistency and reliability',
      'Reduced manual intervention in deployment processes',
      'Enhanced security posture through infrastructure as code practices'
    ]
  }
];

const ExperienceCard = styled(Paper)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(4),
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backgroundColor: theme.palette.background.paper,
  border: '1px solid',
  borderColor: alpha(theme.palette.divider, 0.3),
  boxShadow: '0 2px 12px 0 rgba(0, 0, 0, 0.05)',
  overflow: 'hidden',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 8px 24px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
    borderColor: alpha(theme.palette.primary.main, 0.2),
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(3),
    borderRadius: '10px',
  },
}));

const ExpandButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '10px',
  padding: theme.spacing(0.9, 2.5),
  color: theme.palette.primary.main,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  '& .MuiButton-startIcon': {
    transition: 'all 0.25s ease',
    marginRight: theme.spacing(0.75),
  },
  '&:hover .MuiButton-startIcon': {
    transform: 'translateX(3px)',
  },
  '&.MuiButton-contained': {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 6px 16px 0 ${alpha(theme.palette.primary.main, 0.3)}`,
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(0.75, 2),
    fontSize: '0.9rem',
  },
}));

const SkillChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  height: 30,
  borderRadius: '8px',
  backgroundColor: theme.palette.mode === 'dark' 
    ? alpha(theme.palette.primary.main, 0.15) 
    : alpha(theme.palette.primary.light, 0.15),
  color: theme.palette.text.primary,
  fontWeight: 500,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.primary.main, 0.25) 
      : alpha(theme.palette.primary.light, 0.25),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
  },
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1.5),
    fontSize: '0.82rem',
    fontWeight: 500,
  },
  '& .MuiChip-icon': {
    color: theme.palette.primary.main,
    marginLeft: '4px',
  },
}));

const HighlightItem = styled('li')(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(4),
  marginBottom: theme.spacing(1.75),
  lineHeight: 1.7,
  color: theme.palette.text.secondary,
  fontSize: '0.975rem',
  transition: 'all 0.2s ease',
  '&:before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: '0.6em',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    transform: 'translateY(-50%)',
    transition: 'all 0.3s ease',
  },
  '&:hover': {
    color: theme.palette.text.primary,
    '&:before': {
      width: '10px',
      height: '10px',
      backgroundColor: theme.palette.primary.dark,
      boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`,
    },
  },
  [theme.breakpoints.down('sm')]: {
    paddingLeft: theme.spacing(3.5),
    marginBottom: theme.spacing(1.5),
    fontSize: '0.95rem',
  },
}));

const StyledExperienceCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    boxShadow: `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.1)}`,
    transform: 'translateY(-2px)',
  },
  '&.Mui-expanded': {
    margin: theme.spacing(3, 0),
    boxShadow: `0 4px 12px 0 ${alpha(theme.palette.primary.main, 0.08)}`,
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
}));

const ExperienceCardHeader = styled(CardHeader)(({ theme }) => ({
  padding: theme.spacing(3, 4, 2.5, 4),
  backgroundColor: alpha(theme.palette.primary.main, 0.03),
  borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  '& .MuiCardHeader-content': {
    overflow: 'hidden',
  },
  '& .MuiCardHeader-title': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 700,
    fontSize: '1.25rem',
    color: theme.palette.text.primary,
    letterSpacing: '-0.01em',
    lineHeight: 1.3,
  },
  '& .MuiCardHeader-subheader': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.25),
    fontSize: '0.95rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      fontSize: '1rem',
      marginRight: theme.spacing(0.75),
      opacity: 0.8,
    },
  },
  '& .MuiCardHeader-avatar': {
    marginRight: theme.spacing(2.5),
    '& svg': {
      fontSize: '1.75rem',
      color: theme.palette.primary.main,
      backgroundColor: alpha(theme.palette.primary.main, 0.1),
      padding: theme.spacing(1),
      borderRadius: '12px',
    },
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2.5, 3, 2, 3),
    '& .MuiCardHeader-avatar': {
      marginRight: theme.spacing(2),
      '& svg': {
        fontSize: '1.5rem',
        padding: theme.spacing(0.75),
      },
    },
  },
}));

const Experience = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [expanded, setExpanded] = useState({});
  const [activeTab, setActiveTab] = useState(0);
  const [sectionRef, sectionInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    const element = document.getElementById('experience');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredExperiences = useMemo(() => {
    return experiences.filter(exp => {
      const matchesSearch = exp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.skills.some(skill => 
                           skill.toLowerCase().includes(searchTerm.toLowerCase())
                         );
      const matchesFilter = activeFilter === 'all' || 
                          exp.skills.some(skill => 
                            skill.toLowerCase() === activeFilter.toLowerCase()
                          );
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const allSkills = useMemo(() => {
    const skills = new Set();
    experiences.forEach(exp => {
      exp.skills.forEach(skill => skills.add(skill));
    });
    return Array.from(skills).sort();
  }, []);

  const renderExperienceCard = (experience) => (
    <ExperienceCard 
      key={experience.id}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '4px',
          height: '100%',
          bgcolor: 'primary.main',
          transition: 'all 0.3s ease'
        },
        '&:hover::before': {
          width: '6px',
          bgcolor: 'primary.dark'
        }
      }}
    >
      {/* Header */}
      <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <WorkOutlineIcon 
            color="primary" 
            sx={{ 
              fontSize: '2rem',
              mr: 2,
              bgcolor: 'rgba(25, 118, 210, 0.08)',
              p: 1,
              borderRadius: 2,
              flexShrink: 0
            }} 
          />
          <Box sx={{ flex: 1 }}>
            <Typography 
              variant="h6" 
              component="h3"
              sx={{ 
                fontWeight: 700,
                color: 'text.primary',
                lineHeight: 1.3,
                mb: 0.5
              }}
            >
              {experience.position}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1.5, mb: 1 }}>
              <Typography 
                variant="subtitle1" 
                component="div"
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'primary.main',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                <WorkOutlineIcon fontSize="inherit" /> 
                {experience.company}
              </Typography>
              <Box 
                component="span" 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'text.secondary',
                  fontSize: '0.9rem'
                }}
              >
                <CalendarMonthIcon fontSize="inherit" />
                {experience.duration}
              </Box>
            </Box>
            <Chip
              icon={<LocationOnIcon />}
              label={experience.location === 'Remote' ? 'Hybrid (Remote)' : experience.location}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: 'divider',
                bgcolor: 'background.default',
                '& .MuiChip-icon': {
                  color: 'primary.main',
                  opacity: 0.8
                },
                '& .MuiChip-label': {
                  px: 1,
                  fontSize: '0.8rem'
                }
              }}
            />
          </Box>
        </Box>

        {/* Skills */}
        <Box sx={{ mt: 3, mb: 2 }}>
          <Typography 
            variant="overline" 
            component="div"
            sx={{ 
              color: 'text.secondary',
              mb: 1.5,
              display: 'block',
              letterSpacing: 1,
              fontWeight: 600,
              fontSize: '0.7rem'
            }}
          >
            TECHNOLOGIES
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1,
            '& .MuiChip-root': {
              transition: 'all 0.2s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 1
              }
            }
          }}>
            {experience.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                variant="outlined"
                sx={{
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                  borderColor: 'divider',
                  '& .MuiChip-label': {
                    px: 1.5,
                    py: 0.5,
                    fontSize: '0.75rem',
                    fontWeight: 500,
                  }
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Divider sx={{ borderColor: 'divider' }} />

      {/* Highlights */}
      <Box sx={{ p: 3, pt: 2.5 }}>
        <Typography 
          variant="overline" 
          component="div"
          sx={{ 
            color: 'text.secondary',
            mb: 2,
            display: 'block',
            letterSpacing: 1,
            fontWeight: 600,
            fontSize: '0.7rem'
          }}
        >
          KEY ACHIEVEMENTS
        </Typography>
        <List dense disablePadding>
          {experience.highlights.map((item, index) => (
            <ListItem 
              key={index} 
              disableGutters 
              sx={{ 
                py: 0.75, 
                alignItems: 'flex-start',
                '&:hover .highlight-bullet': {
                  transform: 'scale(1.2)',
                  bgcolor: 'primary.main'
                },
                '&:hover .highlight-text': {
                  color: 'text.primary'
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 24, mr: 1.5, mt: '6px' }}>
                <Box 
                  className="highlight-bullet"
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: 'primary.light',
                    transition: 'all 0.2s ease'
                  }} 
                />
              </ListItemIcon>
              <Typography 
                variant="body2" 
                className="highlight-text"
                sx={{ 
                  color: 'text.secondary',
                  transition: 'color 0.2s ease',
                  lineHeight: 1.6,
                  fontSize: '0.925rem'
                }}
              >
                {item}
              </Typography>
            </ListItem>
          ))}
        </List>

        {experience.achievements && experience.achievements.length > 0 && (
          <>
            <Collapse in={expanded[experience.id]} timeout="auto" unmountOnExit>
              <Box sx={{ 
                mt: 2, 
                pl: 2, 
                borderLeft: `2px solid ${theme.palette.divider}`,
                '& .MuiListItem-root': {
                  pl: 0,
                  '& .MuiListItemIcon-root': {
                    minWidth: 24
                  }
                }
              }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1.5, 
                    color: 'text.primary',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <StarIcon color="primary" fontSize="small" />
                  Additional Achievements
                </Typography>
                <List dense disablePadding>
                  {experience.achievements.map((achievement, index) => (
                    <ListItem 
                      key={`ach-${index}`} 
                      disableGutters 
                      sx={{ 
                        py: 0.5,
                        alignItems: 'flex-start',
                        '&:hover .highlight-text': {
                          color: 'text.primary'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 24, mt: '6px' }}>
                        <StarIcon color="primary" fontSize="small" sx={{ fontSize: '0.9rem' }} />
                      </ListItemIcon>
                      <Typography 
                        variant="body2" 
                        className="highlight-text"
                        sx={{ 
                          color: 'text.secondary',
                          transition: 'color 0.2s ease',
                          lineHeight: 1.6,
                          fontSize: '0.9rem'
                        }}
                      >
                        {achievement}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
            <Button
              size="small"
              color="primary"
              onClick={() => toggleExpand(experience.id)}
              endIcon={expanded[experience.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{ 
                mt: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.85rem',
                px: 1.5,
                py: 0.75,
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'action.hover'
                },
                '& .MuiButton-endIcon': {
                  ml: 0.5
                }
              }}
            >
              {expanded[experience.id] ? 'Show Less' : 'Show More Achievements'}
            </Button>
          </>
        )}
      </Box>
    </ExperienceCard>
  );

  return (
    <Paper 
      id="experience"
      ref={sectionRef}
      elevation={0}
      sx={{ 
        p: { xs: 2, md: 4 },
        backgroundColor: 'transparent',
        backgroundImage: 'none',
        mb: 4,
        borderRadius: 4,
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 800,
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
          Work Experience
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.primary.main,
                height: 3,
              },
              '& .MuiTab-root': {
                textTransform: 'none',
                minWidth: 'auto',
                px: 2,
                '&.Mui-selected': {
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                },
              },
            }}
          >
            {experiences.map((exp, index) => (
              <Tab 
                key={exp.id} 
                label={exp.company.split(' ')[0]} 
                id={`experience-tab-${index}`}
                aria-controls={`experience-tabpanel-${index}`}
              />
            ))}
          </Tabs>
        </Box>
      </Box>
      
      <Box sx={{ mt: 2 }}>
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            role="tabpanel"
            hidden={activeTab !== index}
            id={`experience-tabpanel-${index}`}
            aria-labelledby={`experience-tab-${index}`}
          >
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ExperienceCard elevation={3}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mb: 2 }}>
                <Box>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                    {exp.position}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="primary" 
                    sx={{ 
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <WorkOutlineIcon sx={{ fontSize: '1.1rem', mr: 0.5 }} />
                    {exp.company}
                  </Typography>
                </Box>
                <Chip 
                  label={exp.duration} 
                  color="primary" 
                  variant="outlined"
                  size="small"
                  sx={{ 
                    fontWeight: 500,
                    height: '24px',
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              </Box>

              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mb: 2,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box 
                  component="span" 
                  sx={{ 
                    width: '4px', 
                    height: '4px', 
                    backgroundColor: 'text.secondary',
                    borderRadius: '50%',
                    display: 'inline-block',
                    mx: 1,
                  }} 
                />
                {exp.location}
              </Typography>

              <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {exp.skills.map((skill, i) => (
                  <Chip 
                    key={i} 
                    label={skill} 
                    size="small"
                    sx={{ 
                      backgroundColor: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.08)' 
                        : 'rgba(0, 0, 0, 0.08)',
                      '& .MuiChip-label': {
                        color: 'text.primary',
                        fontWeight: 500,
                      },
                    }}
                  />
                ))}
              </Box>

              <Box component="ul" sx={{ pl: 2.5, mt: 0, mb: 0 }}>
                {exp.highlights.map((highlight, i) => (
                  <Box 
                    key={i} 
                    component="li" 
                    sx={{ 
                      mb: 1.5,
                      '&:before': {
                        content: '"▹"',
                        color: 'primary.main',
                        mr: 1.5,
                        mt: '0.3em',
                        flexShrink: 0,
                        display: 'inline-block',
                        width: '1em',
                        marginLeft: '-1.5em'
                      }
                    }}
                  >
                    <Typography variant="body2">
                      {highlight}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {exp.achievements && exp.achievements.length > 0 && (
                <>
                  <Button
                    size="small"
                    onClick={() => toggleExpand(exp.id)}
                    endIcon={
                      <motion.div
                        animate={{
                          rotate: expanded[exp.id] ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <ExpandMoreIcon />
                      </motion.div>
                    }
                    sx={{
                      mt: 2,
                      textTransform: 'none',
                      color: 'text.secondary',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'primary.main',
                      },
                    }}
                  >
                    {expanded[exp.id] ? 'Hide Achievements' : 'Show Achievements'}
                  </Button>

                  <Collapse in={expanded[exp.id]} timeout="auto" unmountOnExit>
                    <Box 
                      sx={{ 
                        mt: 2, 
                        p: 2, 
                        borderRadius: 2,
                        backgroundColor: theme.palette.mode === 'dark' 
                          ? 'rgba(255, 255, 255, 0.03)' 
                          : 'rgba(0, 0, 0, 0.02)',
                        borderLeft: `3px solid ${theme.palette.warning.main}`,
                      }}
                    >
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          mb: 1, 
                          fontWeight: 600,
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <StarIcon sx={{ color: 'warning.main', fontSize: '1rem', mr: 1 }} />
                        Key Achievements
                      </Typography>
                      <Box component="ul" sx={{ pl: 2.5, mt: 1, mb: 0 }}>
                        {exp.achievements.map((achievement, i) => (
                          <Box 
                            key={i} 
                            component="li" 
                            sx={{ 
                              mb: 1,
                              '&:before': {
                                content: '"▹"',
                                color: 'warning.main',
                                mr: 1.5,
                                mt: '0.3em',
                                flexShrink: 0,
                                display: 'inline-block',
                                width: '1em',
                                marginLeft: '-1.5em'
                              }
                            }}
                          >
                            <Typography variant="body2">
                              {achievement}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Collapse>
                </>
              )}
              </ExperienceCard>
            </motion.div>
          </div>
        ))}
      </Box>
    </Paper>
  );
};

export default Experience;
