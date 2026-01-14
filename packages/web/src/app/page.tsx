'use client';

import {
  Container,
  Typography,
  Box,
  Stack,
  Grid,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Button } from '@/components/ui';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MenuItem } from '@/components/common';
import { ProfessionalPricingCard } from './components/ProfessionalPricingCard';
import { EnterprisePricingCard } from './components/EnterprisePricingCard';
import { FederalPricingCard } from './components/FederalPricingCard';

export default function Home() {
  const router = useRouter();
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'REVA Portal';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Header */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              py: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                fontWeight: 700,
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              {siteName}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Box
                display="inline-flex"
                gap={1}
                sx={{
                  width: 'fit-content',
                }}
              >
                <MenuItem
                  context="primary"
                  label="Features"
                  onClick={() => scrollToSection('features')}
                  variant="ghost"
                />
                <MenuItem
                  context="primary"
                  label="Solutions"
                  onClick={() => scrollToSection('solutions')}
                  variant="ghost"
                />
                <MenuItem
                  context="primary"
                  label="Pricing"
                  onClick={() => scrollToSection('pricing')}
                  variant="ghost"
                />
                <MenuItem
                  context="primary"
                  label="Sign In"
                  onClick={() => router.push('/sign-in')}
                  variant="ghost"
                />
              </Box>
              <Button
                variant="contained"
                onClick={() => scrollToSection('contact')}
              >
                Get Started
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box
        component="section"
        sx={{
          py: 15,
          textAlign: 'center',
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            Smarter Appeals. Stronger Revenue.
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: '1.2rem',
              maxWidth: '650px',
              mx: 'auto',
              mb: 4,
              color: 'text.secondary',
            }}
          >
            {siteName} (powered by RevAssurance) combines decades of
            reimbursement advocacy expertise with modern tools — helping
            healthcare providers overturn denials, optimize cash flow, and
            protect patient care.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 5 }}
          >
            <Button
              variant="contained"
              onClick={() => scrollToSection('pricing')}
              size="large"
              sx={{
                px: 3.5,
                py: 2,
              }}
            >
              Start Free Trial
            </Button>
            <Button
              variant="outlined"
              onClick={() => scrollToSection('features')}
              size="large"
              sx={{
                px: 3.25,
                py: 1.75,
              }}
            >
              Learn More
            </Button>
          </Stack>
          <Box
            component="img"
            src="https://lipsum.app/id/101/900x500"
            alt="Dashboard Screenshot"
            sx={{
              width: '100%',
              maxWidth: '900px',
              borderRadius: 3,
              mx: 'auto',
              display: 'block',
            }}
          />
        </Container>
      </Box>

      {/* Features Section */}
      <Box
        id="features"
        component="section"
        sx={{ py: 10, backgroundColor: 'background.default' }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.4rem' },
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            All-In-One Revenue Cycle Intelligence
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
            }}
          >
            Everything your team needs to research regulations, generate
            powerful appeal letters, and cut denial turnaround times — in one
            platform.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Box
                  component="img"
                  src="https://lipsum.app/id/102/400x280"
                  alt="Templates & Tools"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Appeal Templates & Scripts
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Instant access to hundreds of regulatory backed templates and
                  rebuttals for faster overturns.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Box
                  component="img"
                  src="https://lipsum.app/id/103/400x280"
                  alt="Research Knowledge"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Regulatory & Case Law Library
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Research statutes, cases, and compliance rules to build
                  evidence-driven arguments.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Box
                  component="img"
                  src="https://lipsum.app/id/104/400x280"
                  alt="Reporting Insights"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Analytics & Insights
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Track denial trends and revenue impact with actionable
                  dashboards.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Box
                  component="img"
                  src="https://lipsum.app/id/105/400x280"
                  alt="Team Training"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Team Training & Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Onboard staff faster with expert-driven training and
                  tutorials.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Solutions Section */}
      <Box
        id="solutions"
        component="section"
        sx={{
          py: 10,
          backgroundColor: '#f9f9fb',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '2rem', md: '2.4rem' },
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            Solutions Built For Healthcare Providers
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
            }}
          >
            Reduce days in accounts receivable, cut write-offs, and secure
            rightful reimbursements with confidence.
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography
                  variant="h6"
                  component="h4"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Denial Management
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Streamline appeals with automated workflows and expert logic.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography
                  variant="h6"
                  component="h4"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Regulatory Compliance
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Quick access to federal and state laws to back every appeal.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography
                  variant="h6"
                  component="h4"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Revenue Capture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Improve cash flow with faster overturns and fewer write-offs.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box>
                <Typography
                  variant="h6"
                  component="h4"
                  sx={{ fontWeight: 600, mb: 1 }}
                >
                  Training & Certification
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Certified training for team members on denial tactics and
                  strategies.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        component="section"
        sx={{ py: 10, backgroundColor: 'background.default' }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2rem' },
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            What Healthcare Leaders Are Saying
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: 'text.secondary',
            }}
          >
            Real feedback from hospitals and revenue cycle experts using
            RevAssurance.
          </Typography>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Typography
              variant="body1"
              component="blockquote"
              sx={{
                fontStyle: 'italic',
                mb: 2,
                fontSize: '1.1rem',
                color: 'text.secondary',
              }}
            >
              &ldquo;With RevAssurance, our denial overturn rate improved
              dramatically — and our A/R days dropped faster than ever.&rdquo;
            </Typography>
            <Typography
              variant="body1"
              component="blockquote"
              sx={{
                fontStyle: 'italic',
                fontSize: '1.1rem',
                color: 'text.secondary',
              }}
            >
              &ldquo;The regulatory library and templates save hours each week
              that used to be manual research.&rdquo;
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Pricing / CTA Section */}
      <Box
        id="pricing"
        component="section"
        sx={{
          py: 10,
          backgroundColor: '#eff2ff',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.2rem' },
              fontWeight: 700,
              mb: 1.5,
            }}
          >
            Pricing Plans That Scale
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
            }}
          >
            From solo provider teams to enterprise revenue cycle departments.
          </Typography>

          <Grid container spacing={4} sx={{ maxWidth: '1200px', mx: 'auto' }}>
            <Grid item xs={12} sm={4}>
              <FederalPricingCard onClick={() => scrollToSection('contact')} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ProfessionalPricingCard
                onClick={() => scrollToSection('contact')}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <EnterprisePricingCard
                onClick={() => scrollToSection('contact')}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        id="contact"
        component="footer"
        sx={{
          py: 6,
          backgroundColor: '#1a1a1a',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h6"
            component="h3"
            sx={{ mb: 1, fontWeight: 600 }}
          >
            Ready to Maximize Your Revenue Cycle?
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 3, color: 'rgba(255,255,255,0.8)' }}
          >
            Speak with our team or start your free trial today.
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push('/sign-up')}
            sx={{
              px: 3.5,
              py: 2,
            }}
          >
            Start Free Trial
          </Button>
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            © 2026 {siteName}. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
