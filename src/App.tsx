import { useState, useEffect, useRef } from 'react';
import {
  Globe, Leaf, Wind, Droplets, Recycle, Award, Users, Mail, MapPin,
  Linkedin, Twitter, Zap, Lightbulb, Handshake, TrendingUp, TrendingDown,
  Barcode, Package, Building2, ArrowRight, CheckCircle2, Menu, X, ExternalLink,
} from 'lucide-react';

import mustdamProfile from './assets/files/mustdam-profile.pdf';
import logoImg       from './assets/logo2.png';
import abdullahImg   from './assets/Abdullah Al-Adel.png';
import amjadImg      from './assets/Amjad Showail.jpg';
import mohammedImg   from './assets/Mohammed Al-Ghamdi.png';
import Button          from './components/Button';
import ScrollIndicator from './components/ScrollIndicator';
import SectionUnderline from './components/SectionUnderline';

/* ═══════════════════════════════════════
   Types
═══════════════════════════════════════ */
type Language = 'en' | 'ar';
type ProjectItem  = { name: string; description: string; link?: string; logo?: string; };
type ValueItem    = { title: string; text: string; };
type DriverItem   = { title: string; description: string; };
type FlowNode     = { title: string; label: string; description: string; };
type FlowBenefit  = { title: string; description: string; };
type TeamMember   = { name: string; role: string; img: string; };

type AppContent = {
  nav: { about: string; vision: string; projects: string; contact: string; };
  hero: { badge: string; title: string; subtitle: string; cta1: string; cta2: string; stats: { label: string; value: string }[]; };
  about: { title: string; description: string; points: string[]; stat: { value: string; label: string }; };
  team: { title: string; subtitle: string; members: TeamMember[]; };
  vision: { title: string; visionTitle: string; visionText: string; missionTitle: string; missionText: string; valuesTitle: string; values: ValueItem[]; };
  environmental: { title: string; subtitle: string; };
  drivers: { title: string; items: DriverItem[]; };
  flow: { tag: string; title: string; description: string; nodes: FlowNode[]; benefitsTitle: string; benefits: FlowBenefit[]; };
  solutions: { title: string; items: { title: string; description: string; }[]; };
  projects: { title: string; items: ProjectItem[]; };
  contact: { title: string; circulam: string; gases: string; name: string; email: string; message: string; send: string; location: string; };
  cta: { title: string; subtitle: string; button: string; };
  footer: { text: string; copyright: string; made: string; links: string; connect: string; };
};

/* ═══════════════════════════════════════
   Scroll-reveal hook
═══════════════════════════════════════ */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ── Reveal wrapper ── */
function Reveal({
  children, delay = 0, direction = 'up', className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
  className?: string;
}) {
  const { ref, inView } = useInView();
  const hidden: Record<string, string> = {
    up:    'opacity-0 translate-y-8',
    left:  'opacity-0 -translate-x-8',
    right: 'opacity-0 translate-x-8',
    scale: 'opacity-0 scale-90',
  };
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        inView ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : hidden[direction]
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Scroll Progress Bar
───────────────────────────────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#3d5a4f] via-[#5a8068] to-[#7ab896]"
        style={{ width: `${pct}%`, transition: 'width 80ms linear' }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Section Badge
───────────────────────────────────────────── */
function SectionBadge({ num, label, dark = false }: { num?: string; label: string; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2.5 mb-5">
      {num && (
        <span className={`font-mono text-xs font-bold tabular-nums ${dark ? 'text-white/30' : 'text-[#5a8068]/50'}`}>
          {num}
        </span>
      )}
      <span className={`text-[11px] font-bold tracking-[0.18em] uppercase px-4 py-1.5 rounded-full ${
        dark ? 'bg-white/10 text-white/80 border border-white/15' : 'bg-[#f0f7f4] text-[#5a8068]'
      }`}>
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Project Card (standard)
───────────────────────────────────────────── */
function ProjectCard({ project, isRTL }: { project: ProjectItem; isRTL: boolean }) {
  return (
    <div className="group relative bg-white rounded-[1.75rem] border border-[#e8f3ed] hover:border-[#b8d9c6] shadow-[0_2px_16px_rgba(45,74,62,0.06)] hover:shadow-[0_8px_36px_rgba(45,74,62,0.13)] hover:-translate-y-1.5 transition-all duration-400 p-8 flex flex-col">
      {/* Top accent line */}
      <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#5a8068]/30 to-transparent rounded-b-full group-hover:via-[#5a8068]/70 transition-colors duration-400" />

      <div className={`flex items-start justify-between gap-5 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          <h3 className="text-xl md:text-2xl font-extrabold text-[#1e3a30] leading-tight mb-2">
            {project.name}
          </h3>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">{project.description}</p>
        </div>
        <div className="shrink-0 w-13 h-13 rounded-2xl bg-gradient-to-br from-[#f0f7f4] to-[#e5efea] border border-[#d5e7dc] flex items-center justify-center">
          <Building2 className="w-6 h-6 text-[#5a8068]" strokeWidth={1.7} />
        </div>
      </div>

      {(project.name === 'Industrial Gases' || project.name === 'الغازات الصناعية') && (
        <div className="mt-auto pt-4 border-t border-[#f0f7f4]">
          <a
            href={mustdamProfile}
            download
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3d5a4f] hover:text-[#2d4a3e] transition-colors duration-200"
          >
            {isRTL ? 'قراءة بروفايل الشركة ↓' : 'Download Company Profile ↓'}
          </a>
        </div>
      )}

      <div className="mt-auto pt-5 flex items-center justify-between">
        <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] group-hover:w-14 transition-all duration-400" />
        <div className="w-7 h-7 rounded-full bg-[#f0f7f4] group-hover:bg-[#3d5a4f] flex items-center justify-center transition-colors duration-300">
          <ArrowRight className={`w-3.5 h-3.5 text-[#5a8068] group-hover:text-white transition-colors duration-300 ${isRTL ? 'rotate-180' : ''}`} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Team Card
───────────────────────────────────────────── */
function TeamCard({ member, delay = 0 }: { member: TeamMember; delay?: number }) {
  return (
    <Reveal delay={delay} direction="scale">
      <div className="group flex flex-col items-center text-center px-4">
        <div className="relative mb-5">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#7ab896] rounded-full opacity-0 group-hover:opacity-100 blur-xl scale-110 transition-all duration-500" />
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-white shadow-[0_4px_24px_rgba(45,74,62,0.15)] group-hover:ring-[#5a8068]/40 group-hover:shadow-[0_8px_40px_rgba(45,74,62,0.2)] transition-all duration-500">
            <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400">
            <Leaf className="w-3.5 h-3.5 text-white" strokeWidth={2} />
          </div>
        </div>
        <h3 className="text-base font-bold text-[#1e3a30] mb-1.5">{member.name}</h3>
        <span className="text-xs font-semibold text-[#5a8068] bg-[#f0f7f4] px-3 py-1 rounded-full">
          {member.role}
        </span>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════
   App
═══════════════════════════════════════ */
function App() {
  const [language, setLanguage]       = useState<Language>('ar');
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);

  const toggleLanguage = () => setLanguage((p) => (p === 'en' ? 'ar' : 'en'));

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  /* ── Content ── */
  const content: Record<Language, AppContent> = {
    en: {
      nav: { about: 'About', vision: 'Vision', projects: 'Projects', contact: 'Contact' },
      hero: {
        badge: 'Vision 2030 Aligned',
        title: 'Working for Next Generations',
        subtitle: 'Sustainability Solutions',
        cta1: 'Learn More',
        cta2: 'Contact Us',
        stats: [
          { value: '2020', label: 'Year Founded' },
          { value: 'Riyadh', label: 'Saudi Arabia' },
          { value: '4+', label: 'Active Projects' },
        ],
      },
      about: {
        title: 'About Mustdam',
        description: 'Mustdam is a national SME company located in Riyadh, established in 2020. We capitalize on Vision 2030 entrepreneurship in sustainability by delivering solutions that minimize environmental impact and contribute to achieving carbon neutrality by 2060.',
        points: ['Utilizing natural resources', 'Reducing emissions', 'Generating 50% renewable power by 2030', 'Supporting the Saudi Green Initiative'],
        stat: { value: '50%', label: 'Renewable energy target by 2030' },
      },
      team: {
        title: 'Our Team',
        subtitle: 'The minds driving Mustdam forward',
        members: [
          { name: 'Abdullah Al-Adel',   role: 'Co-Founder', img: abdullahImg },
          { name: 'Mohammed Al-Ghamdi', role: 'Founder',    img: mohammedImg },
          { name: 'Amjad Showail',      role: 'Co-Founder', img: amjadImg },
        ],
      },
      vision: {
        title: 'Vision, Mission & Values',
        visionTitle: 'Vision', visionText: 'Pioneering to provide Circular Economy technology in Saudi Arabia.',
        missionTitle: 'Mission', missionText: 'Responsibly providing high-quality sustainability solutions that add value to all stakeholders.',
        valuesTitle: 'Values (4Cs)',
        values: [
          { title: 'Collaborate', text: 'With technology leaders' },
          { title: 'Cooperate',   text: 'With local value chain' },
          { title: 'Contribute',  text: 'To national transformation plans' },
          { title: 'Create',      text: 'Value for our people' },
        ],
      },
      environmental: {
        title: 'Carbon Emissions is the Center of Our Message',
        subtitle: 'We act responsibly to reduce the carbon footprint and lead the shift toward a sustainable circular economy.',
      },
      drivers: {
        title: 'Drivers Toward Sustainability',
        items: [
          { title: 'Renewable Energy',  description: 'Transitioning to clean power sources' },
          { title: 'Carbon Neutrality', description: 'Achieving net-zero by 2060' },
          { title: 'Waste-to-Energy',   description: 'Converting waste into resources' },
          { title: 'Circular Economy',  description: 'Sustainable resource management' },
        ],
      },
      flow: {
        tag: 'OUR SOLUTIONS',
        title: 'Circulam Platform Solutions',
        description: 'Part of the Circulam platform — developed by Mustdam to power the circular economy.',
        nodes: [
          { title: 'Collectors', label: 'Scan',   description: 'A bounty-based system encouraging collectors to scan and submit materials.' },
          { title: 'Storers',    label: 'Store',  description: 'A marketplace connecting storers, recyclers, and manufacturers.' },
          { title: 'Producers',  label: 'Return', description: 'Manufacturers reuse processed materials, reducing waste and emissions.' },
        ],
        benefitsTitle: 'System Benefits',
        benefits: [
          { title: 'Efficient Material Management',          description: 'Connecting industrial parties to maximize utilization and minimize waste.' },
          { title: 'Full Lifecycle Tracking Transparency',   description: 'Easily monitor material movement via smart tracking.' },
          { title: 'Unified Trading & Recycling Platform',   description: 'Collection, storage, sorting, and recycling within one ecosystem.' },
          { title: 'Accurate Data for Sustainability Decisions', description: 'Smart reports helping companies assess environmental impact.' },
        ],
      },
      solutions: {
        title: 'Our Solutions',
        items: [
          { title: 'Bounty Rewards for Material Collection', description: 'Incentive system for collectors.' },
          { title: 'Materials Trading & Storage Platform',   description: 'Market connecting storers, recyclers, and manufacturers.' },
          { title: 'Lifecycle Tracking via Barcodes',        description: 'Track product lifecycle using labels.' },
          { title: 'Environmental Impact Analytics',         description: 'Big-data insights for measuring environmental impact.' },
        ],
      },
      projects: {
        title: 'Our Projects',
        items: [
          { name: 'Waste to Oil',   description: 'Converting waste into valuable resources' },
          { name: 'Circulam',       description: 'The leading circular economy platform', link: 'https://www.circulam.net', logo: 'https://www.circulam.net/icons/circulam.png' },
          { name: 'Industrial Gases', description: 'Sustainable gas solutions' },
          { name: 'Electromagnetic Measurement & Calibration', description: 'Precise industrial solutions' },
        ],
      },
      contact: {
        title: 'Contact Us',
        circulam: 'Circulam Inquiries', gases: 'Industrial Gases',
        name: 'Full Name', email: 'Email Address', message: 'Your Message', send: 'Send Message',
        location: 'Riyadh, Saudi Arabia',
      },
      cta: {
        title: 'Ready to Transition to Sustainability?',
        subtitle: "Let's build a greener future together. Our team is ready to help.",
        button: 'Get in Touch',
      },
      footer: {
        text: "Let's save our future...",
        copyright: '© 2025 Mustdam. All rights reserved.',
        made: 'Made with purpose in Saudi Arabia',
        links: 'Quick Links',
        connect: 'Connect',
      },
    },

    ar: {
      nav: { about: 'عن الشركة', vision: 'الرؤية', projects: 'المشاريع', contact: 'اتصل بنا' },
      hero: {
        badge: 'متوافق مع رؤية 2030',
        title: 'نعمل من أجل الأجيال القادمة',
        subtitle: 'حلول الاستدامة',
        cta1: 'اعرف المزيد',
        cta2: 'اتصل بنا',
        stats: [
          { value: '2020',     label: 'سنة التأسيس' },
          { value: 'الرياض',  label: 'المملكة العربية السعودية' },
          { value: '+4',      label: 'مشاريع نشطة' },
        ],
      },
      about: {
        title: 'عن مستدام',
        description: 'مستدام هي شركة سعودية مقرها الرياض، تأسست عام 2020. نستثمر في ريادة الأعمال لتحقيق رؤية 2030 عبر تقديم حلول تقلل الأثر البيئي وتسهم في الوصول إلى الحياد الكربوني بحلول عام 2060.',
        points: ['استغلال الموارد الطبيعية', 'تقليل الانبعاثات', 'توليد 50٪ من الطاقة من مصادر متجددة بحلول 2030', 'دعم مبادرة السعودية الخضراء'],
        stat: { value: '50%', label: 'هدف الطاقة المتجددة بحلول 2030' },
      },
      team: {
        title: 'فريقنا',
        subtitle: 'العقول التي تقود مستدام نحو مستقبل مستدام',
        members: [
          { name: 'عبدالله العادل', role: 'شريك مؤسس', img: abdullahImg },
          { name: 'محمد الغامدي',   role: 'مؤسس',      img: mohammedImg },
          { name: 'أمجد شويل',      role: 'شريك مؤسس', img: amjadImg },
        ],
      },
      vision: {
        title: 'الرؤية والرسالة والقيم',
        visionTitle: 'الرؤية', visionText: 'الريادة في تقديم تقنيات الاقتصاد الدائري في المملكة العربية السعودية.',
        missionTitle: 'الرسالة', missionText: 'تقديم حلول استدامة عالية الجودة تضيف قيمة لجميع الأطراف المعنية.',
        valuesTitle: 'القيم (4Cs)',
        values: [
          { title: 'التعاون',    text: 'مع رواد التكنولوجيا' },
          { title: 'التنسيق',    text: 'مع سلاسل القيمة المحلية' },
          { title: 'المساهمة',   text: 'في خطط التحول الوطني' },
          { title: 'خلق القيمة', text: 'لموظفينا' },
        ],
      },
      environmental: {
        title: 'مكافحة تغير المناخ: جوهر التزامنا',
        subtitle: 'نعمل بمسؤولية لخفض البصمة الكربونية وقيادة التحول نحو اقتصاد دائري مستدام.',
      },
      drivers: {
        title: 'الدوافع نحو الاستدامة',
        items: [
          { title: 'الطاقة المتجددة',           description: 'التحول إلى مصادر الطاقة النظيفة' },
          { title: 'الحياد الكربوني',            description: 'تحقيق صفر انبعاثات بحلول 2060' },
          { title: 'تحويل النفايات إلى طاقة',    description: 'تحويل النفايات إلى موارد' },
          { title: 'الاقتصاد الدائري',           description: 'إدارة مستدامة للموارد' },
        ],
      },
      flow: {
        tag: 'OUR SOLUTIONS',
        title: 'حلول منصة سيركلوم',
        description: 'حلول تعمل ضمن منصة سيركلوم التي طوّرتها مستدام لدعم الاقتصاد الدائري.',
        nodes: [
          { title: 'الجامعون', label: 'Scan',   description: 'مسح المواد وتجميعها عبر نظام مكافآت محفّز.' },
          { title: 'المخازن',  label: 'Store',  description: 'توثيق المواد وتخزينها وإتاحتها للمصانع عبر المنصة.' },
          { title: 'المصانع',  label: 'Return', description: 'الاستفادة من المواد وإعادتها إلى دورة الإنتاج.' },
        ],
        benefitsTitle: 'فوائد النظام',
        benefits: [
          { title: 'تعزيز كفاءة إدارة المواد',          description: 'ربط الأطراف الصناعية لرفع الاستفادة وتقليل الفاقد.' },
          { title: 'شفافية كاملة في تتبع دورة الحياة',   description: 'متابعة حركة المواد بسهولة عبر التتبع الذكي.' },
          { title: 'منصة موحّدة للتداول وإعادة التدوير', description: 'جمع، تخزين، وفرز وتدوير المواد عبر منظومة واحدة.' },
          { title: 'بيانات دقيقة تدعم قرارات الاستدامة', description: 'تقارير ذكية تساعد الشركات على تقييم الأثر البيئي.' },
        ],
      },
      solutions: {
        title: 'حلولنا',
        items: [
          { title: 'نظام مكافآت لجمع المواد', description: 'نظام حوافز للمُجمّعين.' },
          { title: 'منصة تداول وتخزين المواد', description: 'منصة سوق تربط المخزّنين والمعيدين والمصنّعين.' },
          { title: 'تتبّع دورة الحياة',       description: 'تتبّع المنتج من التصنيع حتى المستخدم النهائي.' },
          { title: 'تحليلات الأثر البيئي',    description: 'رؤى تعتمد على البيانات الضخمة لقياس الأثر البيئي.' },
        ],
      },
      projects: {
        title: 'مشاريعنا',
        items: [
          { name: 'تحويل النفايات إلى نفط', description: 'تحويل النفايات إلى موارد قيمة' },
          { name: 'Circulam', description: 'منصة الاقتصاد الدائري الرائدة', link: 'https://www.circulam.net', logo: 'https://www.circulam.net/icons/circulam.png' },
          { name: 'الغازات الصناعية',               description: 'حلول الغاز المستدامة' },
          { name: 'القياس والمعايرة الكهرومغناطيسية', description: 'حلول صناعية دقيقة' },
        ],
      },
      contact: {
        title: 'اتصل بنا',
        circulam: 'استفسارات Circulam', gases: 'الغازات الصناعية',
        name: 'الاسم الكامل', email: 'البريد الإلكتروني', message: 'رسالتك', send: 'إرسال الرسالة',
        location: 'الرياض، المملكة العربية السعودية',
      },
      cta: {
        title: 'هل أنت مستعد للتحول نحو الاستدامة؟',
        subtitle: 'دعنا نبني مستقبلاً أخضر معاً. فريقنا جاهز لمساعدتك.',
        button: 'ابدأ الآن',
      },
      footer: {
        text: 'دعونا نحافظ على مستقبلنا...',
        copyright: '© 2025 مستدام. جميع الحقوق محفوظة.',
        made: 'صُنع بشغف في المملكة العربية السعودية',
        links: 'روابط سريعة',
        connect: 'تواصل معنا',
      },
    },
  };

  const t     = content[language];
  const isRTL = language === 'ar';

  const valueIcons     = [Handshake, Users, TrendingUp, Lightbulb];
  const aboutPointIcons = [Leaf, TrendingDown, Zap, Globe];
  const driverIcons    = [Wind, Zap, Recycle, Globe];
  const flowIcons      = [Barcode, Package, Building2];

  const navLinks = [
    { href: '#about',    label: t.nav.about },
    { href: '#vision',   label: t.nav.vision },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact',  label: t.nav.contact },
  ];

  const featuredProject = t.projects.items.find((p) => p.name === 'Circulam');
  const regularProjects = t.projects.items.filter((p) => p.name !== 'Circulam');

  /* ─────────────────────────────────────────────
     Dot-grid SVG (reused in dark sections)
  ───────────────────────────────────────────── */
  const DotGrid = ({ opacity = 0.04 }: { opacity?: number }) => (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
        opacity,
      }}
    />
  );

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>

      <ScrollProgress />

      {/* ════════════════════════════════
          NAVIGATION
      ════════════════════════════════ */}
      <nav className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0f1f1a]/95 backdrop-blur-2xl shadow-[0_1px_32px_rgba(0,0,0,0.35)] border-b border-white/[0.07]'
          : 'bg-transparent border-b border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-[4.5rem]'}`}>

            {/* Logo — always white */}
            <img
              src={logoImg}
              alt="Mustdam"
              className={`w-auto brightness-0 invert transition-all duration-300 cursor-pointer ${scrolled ? 'h-10' : 'h-14'}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />

            {/* Desktop links */}
            <div className={`hidden md:flex items-center gap-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
              {navLinks.map((l) => (
                <a key={l.href} href={l.href}
                  className="px-4 py-2 text-white/85 font-semibold text-sm rounded-xl hover:bg-white/10 hover:text-white transition-all duration-200"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <button
                onClick={toggleLanguage}
                className="group flex items-center gap-1.5 px-4 py-2 bg-white/15 text-white border border-white/25 rounded-xl text-sm font-semibold hover:bg-white/25 hover:scale-[1.03] transition-all duration-300 overflow-hidden relative backdrop-blur-sm"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <Globe className="w-3.5 h-3.5 relative z-10 group-hover:rotate-180 transition-transform duration-700" />
                <span className="relative z-10">{language === 'en' ? 'العربية' : 'English'}</span>
              </button>

              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {mobileOpen
                  ? <X    className="w-4 h-4 text-white" />
                  : <Menu className="w-4 h-4 text-white" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden animate-slide-down border-t border-black/[0.04] bg-white/98 backdrop-blur-2xl">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3.5 text-[#2d4a3e] font-semibold text-base rounded-xl hover:bg-[#f0f7f4] transition-colors duration-200 ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 pt-2 border-t border-black/[0.04]" />
              <button
                onClick={() => { toggleLanguage(); setMobileOpen(false); }}
                className={`px-4 py-3.5 flex items-center gap-2 text-[#5a8068] font-semibold text-base rounded-xl hover:bg-[#f0f7f4] transition-colors duration-200 ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                <Globe className="w-4 h-4" />
                {language === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-[4.5rem]">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a14] via-[#1a2f28] to-[#2d4a3e]">
          <DotGrid opacity={0.035} />
          {/* Dark gradient at top — ensures nav items are always readable */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-[1] pointer-events-none" />
          <div className="absolute top-16 left-[8%]  w-[520px] h-[520px] bg-[#5a8068] rounded-full blur-3xl opacity-[0.12] animate-blob" />
          <div className="absolute top-48 right-[8%] w-[400px] h-[400px] bg-[#3d5a4f] rounded-full blur-3xl opacity-[0.14] animate-blob animation-delay-2000" />
          <div className="absolute bottom-24 left-[38%] w-[360px] h-[360px] bg-[#2d4a3e] rounded-full blur-3xl opacity-[0.18] animate-blob animation-delay-4000" />
          {/* Decorative large text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <span className="text-[28vw] font-black text-white/[0.022] leading-none tracking-tighter">
              {isRTL ? 'مستدام' : 'GREEN'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">

          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/85 text-xs font-bold tracking-[0.12em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ab896] animate-pulse" />
              {t.hero.badge}
            </div>
          </div>

          {/* Leaf icon */}
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-[#5a8068]/20 rounded-2xl blur-2xl scale-150 animate-pulse" />
              <div className="relative w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/15 shadow-lg">
                <Leaf className="w-8 h-8 text-white drop-shadow" strokeWidth={1.8} />
              </div>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-black text-white leading-[1.02] tracking-[-0.02em] mb-6 animate-fade-in-delay">
            <span>{t.hero.subtitle}</span>
            <br />
            <span className="text-gradient-white opacity-60 text-3xl sm:text-4xl md:text-5xl font-normal">{isRTL ? 'للطاقة المتجددة' : 'for Renewable Energy'}</span>
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl text-white/55 font-light max-w-xl mx-auto leading-relaxed mb-10 animate-fade-in-delay-2">
            {t.hero.title}
          </p>

          {/* CTAs */}
          <div className={`flex flex-wrap items-center gap-3 justify-center mb-16 animate-fade-in-delay-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] text-white font-bold text-sm rounded-xl hover:shadow-[0_8px_24px_rgba(90,128,104,0.4)] hover:scale-[1.03] transition-all duration-300"
            >
              {t.hero.cta2}
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 text-white font-bold text-sm rounded-xl border border-white/20 hover:bg-white/18 transition-all duration-300 backdrop-blur-sm"
            >
              {t.hero.cta1}
            </a>
          </div>

          {/* Stats */}
          <div className={`flex flex-wrap items-center justify-center gap-8 sm:gap-14 animate-fade-in-delay-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
            {t.hero.stats.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-[11px] font-semibold text-white/40 tracking-[0.1em] uppercase">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <ScrollIndicator className="hidden sm:flex" />
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 sm:h-16 md:h-20">
            <path d="M0,40 C200,80 400,0 720,40 C1040,80 1240,10 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════
          ABOUT
      ════════════════════════════════ */}
      <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(90,128,104,0.05),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <SectionBadge num="01" label="About Us" />
              <h2 className="text-4xl md:text-6xl font-black text-[#1e3a30] mb-4 leading-tight tracking-tight">
                {t.about.title}
              </h2>
              <SectionUnderline variant="gradient" compact animate="slide" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Description + stat */}
            <Reveal direction={isRTL ? 'right' : 'left'}>
              <div className="space-y-8">
                <div
                  className={`border-${isRTL ? 'r' : 'l'}-4 border-[#5a8068] ${isRTL ? 'pr-6' : 'pl-6'}`}
                  style={isRTL ? { borderRightWidth: '4px', borderLeftWidth: 0 } : { borderLeftWidth: '4px', borderRightWidth: 0 }}
                >
                  <p className="text-lg md:text-xl text-gray-500 leading-[1.8] font-light">
                    {t.about.description}
                  </p>
                </div>

                {/* Stat callout */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2d4a3e] to-[#3d5a4f] p-7">
                  <DotGrid opacity={0.06} />
                  <div className="relative z-10">
                    <div className="text-5xl sm:text-6xl font-black text-white mb-1 leading-none">{t.about.stat.value}</div>
                    <div className="text-white/60 text-sm font-medium">{t.about.stat.label}</div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Points */}
            <div className="space-y-3">
              {t.about.points.map((point, i) => {
                const Icon = aboutPointIcons[i] || Wind;
                return (
                  <Reveal key={i} delay={i * 80}>
                    <div className="group flex items-center gap-4 bg-[#f8fdfb] hover:bg-white p-4.5 rounded-2xl border border-[#eaf2ee] hover:border-[#c8e0d1] hover:shadow-md transition-all duration-300">
                      <div className={`shrink-0 w-9 h-9 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 ${isRTL ? 'order-2' : 'order-1'}`}>
                        <Icon className="w-4 h-4 text-white" strokeWidth={1.7} />
                      </div>
                      <p className={`text-gray-700 flex-1 font-medium text-sm sm:text-base ${isRTL ? 'order-1 text-right' : 'order-2 text-left'}`}>
                        {point}
                      </p>
                      <CheckCircle2 className={`w-4 h-4 text-[#5a8068]/40 group-hover:text-[#5a8068] shrink-0 transition-colors duration-300 ${isRTL ? 'order-3' : 'order-3'}`} />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          TEAM
      ════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-[#f8fdfb] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_50%,rgba(90,128,104,0.06),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-14">
              <SectionBadge num="02" label={isRTL ? 'الفريق المؤسس' : 'Founding Team'} />
              <h2 className="text-4xl md:text-5xl font-black text-[#1e3a30] mb-4 tracking-tight">{t.team.title}</h2>
              <SectionUnderline variant="gradient" compact animate="slide" />
              <p className="mt-5 text-gray-400 text-base max-w-sm mx-auto">{t.team.subtitle}</p>
            </div>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-10 sm:gap-16 md:gap-24">
            {t.team.members.map((m, i) => (
              <TeamCard key={i} member={m} delay={i * 120} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          VISION, MISSION & VALUES
      ════════════════════════════════ */}
      <section id="vision" className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_100%,rgba(90,128,104,0.05),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <SectionBadge num="03" label="Our Foundation" />
              <h2 className="text-4xl md:text-5xl font-black text-[#1e3a30] mb-4 tracking-tight">{t.vision.title}</h2>
              <SectionUnderline variant="gradient" compact animate="slide" />
            </div>
          </Reveal>

          {/* Vision + Mission */}
          <div className="grid md:grid-cols-2 gap-5 mb-14">
            {[
              { icon: Award, title: t.vision.visionTitle, text: t.vision.visionText },
              { icon: Users, title: t.vision.missionTitle, text: t.vision.missionText },
            ].map(({ icon: Icon, title, text }, i) => (
              <Reveal key={i} delay={i * 100} direction={i === 0 ? (isRTL ? 'right' : 'left') : (isRTL ? 'left' : 'right')}>
                <div className="group bg-[#f8fdfb] hover:bg-white p-8 rounded-3xl border border-[#eaf2ee] hover:border-[#c8e0d1] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400" dir={isRTL ? 'rtl' : 'ltr'}>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <Icon className="w-6 h-6 text-white" strokeWidth={1.6} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1e3a30]">{title}</h3>
                  </div>
                  <p className={`text-gray-500 leading-relaxed text-base ${isRTL ? 'text-right' : 'text-left'}`}>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Values */}
          <Reveal>
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-[#1e3a30] mb-4">{t.vision.valuesTitle}</h3>
              <SectionUnderline variant="minimal" compact animate="slide" />
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {t.vision.values.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <Reveal key={i} delay={i * 70}>
                  <div className="group relative bg-[#f8fdfb] hover:bg-white p-7 rounded-2xl border border-[#eaf2ee] hover:border-[#c8e0d1] hover:shadow-xl hover:-translate-y-2 transition-all duration-400 text-center h-full overflow-hidden">
                    {/* Subtle green wash on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f]/5 via-transparent to-[#5a8068]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10">
                      {/* Icon with glow ring */}
                      <div className="relative w-14 h-14 mx-auto mb-5">
                        <div className="absolute inset-0 rounded-2xl bg-[#5a8068] opacity-0 group-hover:opacity-25 blur-xl scale-150 transition-all duration-500" />
                        <div className="relative w-14 h-14 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-[0_4px_20px_rgba(90,128,104,0.45)] group-hover:scale-105 transition-all duration-400">
                          <Icon className="w-6 h-6 text-white" strokeWidth={1.7} />
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-[#1e3a30] mb-2 group-hover:text-[#2d4a3e] transition-colors duration-300">{value.title}</h4>
                      <p className="text-gray-400 text-xs leading-relaxed">{value.text}</p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 group-hover:w-3/4 bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] rounded-t-full transition-all duration-500" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          ENVIRONMENTAL MESSAGE
      ════════════════════════════════ */}
      <section className="py-28 sm:py-36 bg-gradient-to-br from-[#08130f] via-[#0f1f1a] to-[#1a2f28] text-white relative overflow-hidden">
        <DotGrid opacity={0.03} />
        {/* Decorative large year */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[32vw] font-black text-white/[0.025] leading-none tabular-nums">2060</span>
        </div>
        <Droplets className="absolute top-12 left-12  w-32 h-32 text-white/[0.04] animate-float" />
        <Droplets className="absolute top-24 right-16 w-24 h-24 text-white/[0.04] animate-float animation-delay-2000" />
        <Droplets className="absolute bottom-12 right-12 w-40 h-40 text-white/[0.04] animate-float animation-delay-4000" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <SectionBadge num="04" label="Our Mission" dark />
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-7 leading-tight tracking-tight">
              {t.environmental.title}
            </h2>
            <p className="text-lg sm:text-xl text-white/55 font-light leading-relaxed max-w-2xl mx-auto">
              {t.environmental.subtitle}
            </p>
            <div className="mt-12 flex justify-center">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-10 sm:h-14">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════
          DRIVERS
      ════════════════════════════════ */}
      <section className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(90,128,104,0.05),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <SectionBadge num="05" label="Sustainability Pillars" />
              <h2 className="text-4xl md:text-6xl font-black text-[#1e3a30] mb-4 leading-tight tracking-tight">
                {t.drivers.title}
              </h2>
              <SectionUnderline variant="capsule" compact animate="slide" />
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.drivers.items.map((item, i) => {
              const Icon = driverIcons[i];
              return (
                <Reveal key={i} delay={i * 80}>
                  <div className="group relative bg-[#f8fdfb] p-7 rounded-3xl border border-[#eaf2ee] group-hover:border-transparent transition-all duration-500 h-full overflow-hidden">

                    {/* Dark overlay slides up from bottom on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f1f1a] via-[#1e3a30] to-[#3d5a4f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]" />

                    {/* Decorative number — fades on hover */}
                    <span className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-3 text-6xl font-black select-none leading-none tabular-nums transition-all duration-500 text-[#eaf2ee] group-hover:text-white/[0.06]`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative z-10">
                      {/* Icon container — frosted on hover */}
                      <div className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 shadow-md transition-all duration-500 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] group-hover:bg-none group-hover:from-white/15 group-hover:to-white/8 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12)]">
                        <Icon className="w-6 h-6 text-white" strokeWidth={1.7} />
                      </div>

                      <h3 className="text-base font-bold mb-2 transition-colors duration-500 text-[#1e3a30] group-hover:text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed transition-colors duration-500 text-gray-400 group-hover:text-white/55">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom separator */}
                    <div className="relative z-10 mt-6 pt-4 border-t border-[#eaf2ee] group-hover:border-white/10 transition-colors duration-500">
                      <div className="w-8 h-0.5 rounded-full bg-[#5a8068] group-hover:bg-white/30 transition-all duration-500" />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROJECTS
      ════════════════════════════════ */}
      <section id="projects" className="py-24 sm:py-32 bg-[#f4f8f6] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_50%,rgba(255,255,255,0.5),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <SectionBadge num="06" label={isRTL ? 'ما نعمل عليه' : 'What We Do'} />
              <h2 className="text-5xl md:text-7xl font-black text-[#1e3a30] mb-5 tracking-tight">{t.projects.title}</h2>
              <div className="flex justify-center">
                <div className="w-24 h-2 rounded-full bg-gradient-to-r from-[#3d5a4f] to-[#5a8068]" />
              </div>
            </div>
          </Reveal>

          {/* ── Featured Circulam Card ── */}
          {featuredProject && (
            <Reveal className="mb-6">
              <a
                href={featuredProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative bg-gradient-to-br from-[#1a2f28] via-[#2d4a3e] to-[#3d5a4f] rounded-[2rem] overflow-hidden hover:-translate-y-1.5 transition-all duration-400 shadow-[0_8px_40px_rgba(45,74,62,0.2)] hover:shadow-[0_16px_56px_rgba(45,74,62,0.35)]"
              >
                <DotGrid opacity={0.05} />
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#5a8068] rounded-full blur-3xl opacity-15" />
                <div className="absolute bottom-0 left-0  w-64 h-64 bg-[#7ab896] rounded-full blur-3xl opacity-10" />

                <div className="relative z-10 p-9 sm:p-12 md:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                  <div className={isRTL ? 'text-right' : 'text-left'}>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/15">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7ab896] animate-pulse" />
                      <span className="text-white/75 text-[11px] font-bold tracking-[0.14em] uppercase">
                        {isRTL ? 'المنصة المميزة' : 'Featured Platform'}
                      </span>
                    </div>
                    <h3 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-3 leading-none">Circulam</h3>
                    <p className="text-white/55 text-base sm:text-lg max-w-md leading-relaxed">{featuredProject.description}</p>
                  </div>

                  <div className={`flex flex-col gap-5 ${isRTL ? 'items-start' : 'items-end'}`}>
                    <img src={featuredProject.logo} alt="Circulam" className="h-16 sm:h-20 w-auto drop-shadow-lg" />
                    <div className="flex items-center gap-2 bg-white text-[#2d4a3e] font-bold text-sm px-6 py-3 rounded-xl group-hover:bg-white/90 transition-colors duration-200 shadow-lg">
                      <span>{isRTL ? 'زيارة المنصة' : 'Visit Platform'}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          )}

          {/* Regular project cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {regularProjects.map((project, i) => (
              <Reveal key={i} delay={i * 80}>
                <ProjectCard project={project} isRTL={isRTL} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CIRCULAM FLOW
      ════════════════════════════════ */}
      <section id="journey" className="py-24 sm:py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(90,128,104,0.04),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-14">
              <SectionBadge num="07" label={t.flow.tag} />
              <h2 className="text-4xl md:text-6xl font-black text-[#1e3a30] mb-4 leading-tight tracking-tight">
                {t.flow.title}
              </h2>
              <SectionUnderline variant="gradient" compact animate="slide" />
              {t.flow.description && (
                <p className="mt-5 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                  {t.flow.description}
                </p>
              )}
            </div>
          </Reveal>

          {/* Flow nodes */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {t.flow.nodes.map((node, idx) => {
              const Icon = flowIcons[idx];
              return (
                <Reveal key={idx} delay={idx * 100}>
                  <div className="group relative bg-[#f8fdfb] hover:bg-white p-7 md:p-8 rounded-3xl border border-[#eaf2ee] hover:border-[#c8e0d1] hover:shadow-xl hover:-translate-y-2 transition-all duration-400 h-full overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
                    {/* Step bubble */}
                    <div className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} w-7 h-7 rounded-full bg-[#e8f3ed] flex items-center justify-center`}>
                      <span className="text-[11px] font-black text-[#5a8068] tabular-nums">{idx + 1}</span>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" strokeWidth={1.6} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[10px] font-black tracking-[0.18em] text-[#5a8068] uppercase mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>{node.label}</div>
                        <h3 className={`text-xl font-black text-[#1e3a30] mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>{node.title}</h3>
                        <p className={`text-gray-400 text-sm sm:text-base leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>{node.description}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#eaf2ee]">
                      <div className="h-1 rounded-full bg-[#eaf2ee] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] w-0 group-hover:w-full transition-all duration-700 ease-out" />
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Benefits */}
          <Reveal>
            <div className="text-center mb-8">
              <h4 className="text-2xl font-black text-[#1e3a30] mb-4">{t.flow.benefitsTitle}</h4>
              <SectionUnderline variant="minimal" compact animate="slide" />
            </div>
          </Reveal>

          <div className={`grid sm:grid-cols-2 gap-3 ${isRTL ? 'rtl' : 'ltr'}`}>
            {t.flow.benefits.map((b, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group flex items-start gap-4 bg-[#f8fdfb] hover:bg-white rounded-2xl p-5 border border-[#eaf2ee] hover:border-[#c8e0d1] hover:shadow-md transition-all duration-300">
                  <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.2} />
                  </div>
                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-gray-900 font-bold text-sm sm:text-base">{b.title}</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-0.5 leading-relaxed">{b.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          CONTACT
      ════════════════════════════════ */}
      <section id="contact" className="py-24 sm:py-32 bg-[#f4f8f6] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(255,255,255,0.6),transparent)]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <SectionBadge num="08" label="Get In Touch" />
              <h2 className="text-4xl md:text-6xl font-black text-[#1e3a30] mb-4 leading-tight tracking-tight">{t.contact.title}</h2>
              <SectionUnderline variant="minimal" />
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Contact info cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, heading: t.contact.circulam, value: 'support@circulam.net', href: 'mailto:support@circulam.net' },
                { icon: Mail, heading: t.contact.gases,    value: 'sales@mustdam.com',     href: 'mailto:sales@mustdam.com' },
                { icon: MapPin, heading: null, value: t.contact.location, href: null },
              ].map(({ icon: Icon, heading, value, href }, i) => (
                <Reveal key={i} delay={i * 80}>
                  <div className="group flex items-center gap-4 bg-white rounded-2xl border border-[#eaf2ee] hover:border-[#c8e0d1] p-5 hover:shadow-lg transition-all duration-300" dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className="shrink-0 w-11 h-11 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                    </div>
                    <div className={`flex-1 min-w-0 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {heading && <p className="text-[10px] font-black text-[#5a8068] tracking-[0.14em] uppercase mb-0.5">{heading}</p>}
                      {href ? (
                        <a href={href} className="text-[#1e3a30] font-semibold text-sm sm:text-base hover:text-[#5a8068] transition-colors duration-200 truncate block">{value}</a>
                      ) : (
                        <p className="text-[#1e3a30] font-semibold text-sm sm:text-base">{value}</p>
                      )}
                    </div>
                    {href && (
                      <ArrowRight className={`w-4 h-4 text-[#5a8068]/40 group-hover:text-[#5a8068] shrink-0 transition-colors duration-300 ${isRTL ? 'rotate-180' : ''}`} />
                    )}
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Form */}
            <Reveal direction={isRTL ? 'left' : 'right'}>
              <form className="bg-white rounded-3xl border border-[#eaf2ee] shadow-[0_8px_48px_rgba(45,74,62,0.07)] p-8 sm:p-10 space-y-5">
                {[
                  { label: t.contact.name,  type: 'text', rows: undefined },
                  { label: t.contact.email, type: 'email', rows: undefined },
                ].map(({ label, type }) => (
                  <div key={label} className="group">
                    <label className={`block text-[10px] font-black text-gray-600 mb-2 tracking-[0.12em] uppercase ${isRTL ? 'text-right' : 'text-left'}`}>
                      {label}
                    </label>
                    <input
                      type={type}
                      dir={isRTL ? 'rtl' : 'ltr'}
                      className="w-full px-4 py-3 bg-[#f8fdfb] border border-[#e5efea] rounded-xl focus:ring-2 focus:ring-[#5a8068]/20 focus:border-[#5a8068] outline-none transition-all duration-300 text-gray-800 text-sm placeholder:text-gray-300"
                    />
                  </div>
                ))}

                <div>
                  <label className={`block text-[10px] font-black text-gray-600 mb-2 tracking-[0.12em] uppercase ${isRTL ? 'text-right' : 'text-left'}`}>
                    {t.contact.message}
                  </label>
                  <textarea
                    rows={5}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 bg-[#f8fdfb] border border-[#e5efea] rounded-xl focus:ring-2 focus:ring-[#5a8068]/20 focus:border-[#5a8068] outline-none transition-all duration-300 resize-none text-gray-800 text-sm placeholder:text-gray-300"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative overflow-hidden w-full bg-gradient-to-r from-[#2d4a3e] to-[#5a8068] text-white font-bold py-4 rounded-xl hover:shadow-[0_8px_32px_rgba(90,128,104,0.35)] hover:scale-[1.01] transition-all duration-300 text-sm"
                >
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  <span className="relative z-10">{t.contact.send}</span>
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PRE-FOOTER CTA
      ════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-gradient-to-br from-[#2d4a3e] via-[#3d5a4f] to-[#5a8068] relative overflow-hidden">
        <DotGrid opacity={0.055} />
        <div className="absolute top-0 left-[20%] w-80 h-80 bg-[#7ab896] rounded-full blur-3xl opacity-10" />
        <div className="absolute bottom-0 right-[15%] w-60 h-60 bg-[#1a2f28] rounded-full blur-3xl opacity-20" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6 px-5 py-2 bg-white/10 rounded-full border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ab896] animate-pulse" />
              <span className="text-white/75 text-[11px] font-bold tracking-[0.14em] uppercase">
                {isRTL ? 'الخطوة التالية' : 'Next Step'}
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-tight tracking-tight">
              {t.cta.title}
            </h2>
            <p className="text-white/55 text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              {t.cta.subtitle}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#2d4a3e] font-black text-sm rounded-xl hover:bg-white/90 hover:scale-[1.03] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
            >
              {t.cta.button}
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ════════════════════════════════
          FOOTER
      ════════════════════════════════ */}
      <footer className="bg-[#070e0b] text-white relative overflow-hidden">
        <DotGrid opacity={0.025} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="py-14 grid md:grid-cols-3 gap-12 items-start">

            {/* Brand */}
            <div className={isRTL ? 'text-right' : 'text-left'}>
              <img src={logoImg} alt="Mustdam" className="h-14 w-auto mb-5 brightness-[1.1] opacity-90" />
              <p className="text-white/35 text-sm leading-relaxed max-w-[220px]">{t.footer.text}</p>
            </div>

            {/* Quick links */}
            <div className={`md:text-center ${isRTL ? 'text-right' : 'text-left'}`}>
              <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-white/30 mb-5">{t.footer.links}</h4>
              <nav className="flex flex-col gap-2.5">
                {navLinks.map((l) => (
                  <a key={l.href} href={l.href}
                    className="text-white/45 hover:text-white/80 text-sm font-medium transition-colors duration-200"
                  >
                    {l.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Connect */}
            <div className={isRTL ? 'text-right' : 'text-right'}>
              <h4 className="text-[10px] font-black tracking-[0.18em] uppercase text-white/30 mb-5">{t.footer.connect}</h4>
              <div className={`flex gap-2.5 mb-5 ${isRTL ? 'justify-start' : 'justify-end'}`}>
                {[Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#"
                    className="w-9 h-9 bg-white/[0.07] hover:bg-white/[0.14] rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/[0.06]"
                  >
                    <Icon className="w-3.5 h-3.5 text-white/60" />
                  </a>
                ))}
              </div>
              <a href="mailto:sales@mustdam.com" className="text-white/35 hover:text-white/60 text-xs transition-colors duration-200">
                sales@mustdam.com
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-5 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-white/20 text-[11px]">{t.footer.copyright}</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5a8068]/60 animate-pulse" />
              <span className="text-white/20 text-[11px]">{t.footer.made}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
