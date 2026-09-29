import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface ProjectSpec {
  id: string;
  title: string;
  timeline: string;
  category: string;
  categoryFilter: string;
  repoUrl?: string;
  liveUrl?: string;
  previewUrlLabel?: string;
  techStack: string[];
  summary: string;
  engineeringDetails: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  currentTheme: 'dark' | 'light' = 'dark';
  mobileMenuOpen = false;
  activeFilter = 'all';
  activeSection = 'hero';
  selectedProject: ProjectSpec | null = null;
  toastMessage = '';
  toastVisible = false;
  private toastTimeout: any;

  projects: ProjectSpec[] = [
    {
      id: 'portfolio',
      title: 'Developer Portfolio Website',
      timeline: 'June 2026',
      category: 'Web & Systems Architecture',
      categoryFilter: 'ai-web',
      repoUrl: 'https://github.com/sshreya-001/portfolio',
      previewUrlLabel: 'github.com/sshreya-001/portfolio',
      techStack: ['Angular 18', 'TypeScript', 'HTML5', 'CSS3', 'Git', 'Vercel'],
      summary: 'A responsive single-page developer portfolio engineered with Angular 18, TypeScript, custom token-based theming, reactive state, and automated Vercel deployment.',
      engineeringDetails: [
        'Architected and deployed a responsive single-page portfolio using Angular 18 standalone components and TypeScript, featuring a custom CSS design-token system, dynamic dark/light theming, and accessible keyboard navigation.',
        'Implemented reactive project filtering and recruiter-focused technical modals while optimizing bundle size (~64 kB), responsive rendering across devices, asset loading, and automated CI/CD deployment through GitHub and Vercel.',
        'Engineered lightweight reactive state management with zero external UI libraries, delivering sub-2s hot reload and instant cross-platform performance.'
      ]
    },
    {
      id: 'story-enhancer',
      title: 'AI Story Enhancer',
      timeline: 'February 2026',
      category: 'AI-Powered Web Application',
      categoryFilter: 'ai-web',
      liveUrl: 'https://story-scene.vercel.app/',
      previewUrlLabel: 'story-scene.vercel.app',
      techStack: ['React.js', 'Node.js', 'Express.js', 'JavaScript', 'REST APIs', 'AI Integration', 'Vercel Deployment'],
      summary: 'An AI-powered web application that enhances user-written stories by refining tone, structure, and creativity based on selected genre and language preferences.',
      engineeringDetails: [
        'Built a responsive, intuitive frontend using React.js for live editing and parameter configuration.',
        'Integrated RESTful APIs using Node.js and Express.js to process user story inputs and pipe structured prompts to AI APIs.',
        'Ensured smooth deployment on Vercel with robust environment configuration and error-handling pipelines.'
      ]
    },
    {
      id: 'songify',
      title: 'Songify — Music Streaming Mobile App',
      timeline: 'January 2026',
      category: 'Mobile Streaming Application',
      categoryFilter: 'mobile',
      techStack: ['React Native', 'Expo', 'TypeScript', 'Context API', 'AsyncStorage', 'Expo AV', 'Expo Router'],
      summary: 'A cross-platform mobile music streaming application supporting audio playback controls, persistent favorites management, and high-performance state handling.',
      engineeringDetails: [
        'Built cross-platform audio streaming using React Native and Expo with complete play/pause, seek, shuffle, repeat, and volume controls via Expo AV.',
        'Implemented favorites management using React Context API and AsyncStorage for persistent liked tracks organized into a Favorites album.',
        'Designed modular navigation with Expo Router and managed reactive playback state using React Hooks for high-FPS UI updates.'
      ]
    },
    {
      id: 'savrajya',
      title: 'Savrajya',
      timeline: 'November 2024',
      category: 'Full-Stack Publishing Platform',
      categoryFilter: 'fullstack',
      techStack: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'MERN Architecture'],
      summary: 'A feature-rich digital publishing platform enabling authors to create, publish, and manage multi-chapter stories and blogs while driving reader engagement.',
      engineeringDetails: [
        'Designed and implemented chapter-wise publishing and content management workflows to enhance user engagement.',
        'Engineered a robust reader commenting and review feedback system to foster active community discussion.',
        'Optimized backend queries with MongoDB and Express for scalability, quick response times, and high reliability.'
      ]
    },
    {
      id: 'chhanv',
      title: 'Chhanv Well-Fare',
      timeline: 'November 2022',
      category: 'Donation & Volunteering Portal',
      categoryFilter: 'fullstack',
      liveUrl: 'https://channv-help.vercel.app/',
      previewUrlLabel: 'channv-help.vercel.app',
      techStack: ['HTML5', 'CSS3', 'PHP', 'MySQL', 'QR Payment Integration', 'Vercel Deployment'],
      summary: 'A community-centered web platform designed to streamline donations and volunteering for orphans, elderly citizens, and vulnerable groups.',
      engineeringDetails: [
        'Designed an accessible, user-friendly interface to lower barriers for charitable contributions and volunteer onboarding.',
        'Integrated digital QR codes for seamless donation processing and organized community drive management.',
        'Significantly boosted contributions and overall user participation through streamlined flows.'
      ]
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('shreya_theme') as 'dark' | 'light' | null;
      if (stored) {
        this.currentTheme = stored;
      }
      this.applyTheme(this.currentTheme);
      this.initIntersectionObserver();
    }
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(this.currentTheme);
    this.showToastNotification(`Switched to ${this.currentTheme} mode`);
  }

  private applyTheme(theme: 'dark' | 'light'): void {
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('shreya_theme', theme);
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  isProjectVisible(project: ProjectSpec): boolean {
    if (this.activeFilter === 'all') return true;
    return project.categoryFilter === this.activeFilter;
  }

  openProjectModal(projectId: string): void {
    const proj = this.projects.find(p => p.id === projectId);
    if (proj) {
      this.selectedProject = proj;
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = 'hidden';
      }
    }
  }

  closeModal(): void {
    this.selectedProject = null;
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = '';
    }
  }

  copyEmail(email: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        this.showToastNotification(`Copied ${email} to clipboard!`);
      }).catch(() => {
        this.fallbackCopy(email);
      });
    } else {
      this.fallbackCopy(email);
    }
  }

  private fallbackCopy(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.showToastNotification(`Copied ${text} to clipboard!`);
    } catch {
      this.showToastNotification(`Please email directly: ${text}`);
    }
    document.body.removeChild(textarea);
  }

  showToastNotification(msg: string): void {
    this.toastMessage = msg;
    this.toastVisible = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  handleContactSubmit(event: Event, nameInput: HTMLInputElement, emailInput: HTMLInputElement, subjectInput: HTMLInputElement, messageInput: HTMLTextAreaElement): void {
    event.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim() || 'Portfolio Inquiry';
    const message = messageInput.value.trim();

    const bodyText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:sshreya3095@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;

    this.showToastNotification('Opening your email client...');
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = mailtoUrl;
    }

    nameInput.value = '';
    emailInput.value = '';
    subjectInput.value = '';
    messageInput.value = '';
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.selectedProject) {
      this.closeModal();
    }
    if ((event.key === 't' || event.key === 'T') && !['INPUT', 'TEXTAREA'].includes((event.target as HTMLElement).tagName)) {
      this.toggleTheme();
    }
  }

  private initIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) return;

    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.activeSection = entry.target.getAttribute('id') || 'hero';
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(sec => observer.observe(sec));
  }
}
