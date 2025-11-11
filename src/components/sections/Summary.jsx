import React from 'react';
import { Box, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { styled } from '@mui/material/styles';

const HighlightText = styled('span')(({ theme }) => ({
  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 600,
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: '100%',
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
    transform: 'scaleX(0)',
    transformOrigin: 'right',
    transition: 'transform 0.3s ease',
  },
  '&:hover:after': {
    transform: 'scaleX(1)',
    transformOrigin: 'left',
  },
}));

const Summary = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const stats = [
    { value: '9+', label: 'Years Experience' },
    { value: '50+', label: 'Projects Completed' }
  ];

  return (
    <Paper 
      id="summary"
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
          left: 0,
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${theme.palette.primary.light}15 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(-30%, -30%)',
          zIndex: 0,
        },
      }}
    >
      <Box position="relative" zIndex={1}>
        <motion.div
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={container}
        >
          <motion.div variants={item}>
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                mb: 4, 
                fontWeight: 800,
                position: 'relative',
                display: 'inline-block',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
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
              Professional Summary
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography 
              variant="h5" 
              component="h3" 
              sx={{ 
                mb: 3, 
                fontWeight: 600,
                lineHeight: 1.3,
              }}
            >
              <HighlightText>Senior Cloud & DevOps Engineer</HighlightText> with 9+ years of experience in AWS (primary) and Azure, specializing in Kubernetes, Terraform, CI/CD automation, and observability (ELK, Prometheus, Grafana).
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                mb: 3, 
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
              }}
            >
              Proven ability to reduce deployment cycles by 60%, cut cloud costs 30%, and improve MTTR by 40%. Recent projects include building AI-enabled data pipelines with embeddings and vector search in OpenSearch, modernizing workflows with Python microservices, and automating data analytics with AWS Glue.
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Typography 
              variant="body1" 
              paragraph 
              sx={{ 
                mb: 4,
                fontSize: '1.1rem',
                lineHeight: 1.8,
                color: 'text.secondary',
              }}
            >
              Skilled at driving cloud migrations, scaling platforms, and ensuring platform reliability for Fortune-500 enterprises.
            </Typography>
          </motion.div>

          <motion.div variants={item}>
            <Box 
              sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 3,
                mt: 4,
              }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ y: -5 }}
                >
                  <Paper 
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      background: theme.palette.mode === 'dark' 
                        ? 'rgba(255, 255, 255, 0.03)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${theme.palette.divider}`,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Typography 
                      variant="h3" 
                      component="div"
                      sx={{
                        fontWeight: 800,
                        mb: 1,
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </motion.div>
      </Box>
    </Paper>
  );
};

export default Summary;
