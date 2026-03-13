import { useState } from 'react';
import {
  Globe,
  Leaf,
  Wind,
  Droplets,
  Recycle,
  Award,
  Users,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Zap,
  Lightbulb,
  Handshake,
  TrendingUp,
  TrendingDown,
  Barcode,
  Package,
  Building2,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

import logoImg from './assets/logo2.png';
import Button from './components/Button';
import ScrollIndicator from './components/ScrollIndicator';
import SectionUnderline from './components/SectionUnderline';

type Language = 'en' | 'ar';

type ProjectItem = {
  name: string;
  description: string;
  link?: string;
  logo?: string;
};

type ValueItem = {
  title: string;
  text: string;
};

type AboutPoint = string;

type DriverItem = {
  title: string;
  description: string;
};

type FlowNode = {
  title: string;
  label: string;
  description: string;
};

type FlowBenefit = {
  title: string;
  description: string;
};

type AppContent = {
  nav: {
    about: string;
    vision: string;
    projects: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta1: string;
    cta2: string;
  };
  about: {
    title: string;
    description: string;
    points: AboutPoint[];
  };
  vision: {
    title: string;
    visionTitle: string;
    visionText: string;
    missionTitle: string;
    missionText: string;
    valuesTitle: string;
    values: ValueItem[];
  };
  environmental: {
    title: string;
    subtitle: string;
  };
  drivers: {
    title: string;
    items: DriverItem[];
  };
  flow: {
    tag: string;
    title: string;
    description: string;
    nodes: FlowNode[];
    benefitsTitle: string;
    benefits: FlowBenefit[];
  };
  solutions: {
    title: string;
    items: {
      title: string;
      description: string;
    }[];
  };
  projects: {
    title: string;
    items: ProjectItem[];
  };
  contact: {
    title: string;
    circulam: string;
    gases: string;
    name: string;
    email: string;
    message: string;
    send: string;
    location: string;
  };
  footer: {
    text: string;
    copyright: string;
  };
};

function ProjectCard({
  project,
  isRTL,
}: {
  project: ProjectItem;
  isRTL: boolean;
}) {
  const isLinked = !!project.link;
  const hasLogo = !!project.logo;

  const content = (
    <div className="relative bg-white p-8 md:p-10 rounded-[2rem] shadow-lg transition-all duration-500 border border-gray-100 h-full min-h-[290px] flex flex-col justify-between overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#f8fbf9] opacity-100"></div>

      <div className="relative z-10 flex-1 flex flex-col">
        <div
          className={`flex items-start justify-between gap-6 ${
            isRTL ? 'flex-row-reverse' : 'flex-row'
          }`}
        >
          <div
            className={`flex-1 ${
              isRTL ? 'text-right' : 'text-left'
            }`}
          >
            <h3 className="text-[2rem] md:text-[2.2rem] font-extrabold text-[#29463c] leading-tight tracking-tight">
              {project.name}
            </h3>

            <p className="mt-4 text-gray-600 text-xl md:text-[1.65rem] leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          <div
            className={`shrink-0 flex items-center ${
              isRTL ? 'justify-start' : 'justify-end'
            }`}
          >
            {hasLogo ? (
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-14 md:h-16 w-auto object-contain opacity-95"
              />
            ) : (
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#f3f7f5] border border-[#e5efea] flex items-center justify-center">
                <Building2 className="w-8 h-8 md:w-10 md:h-10 text-[#5a8068]" strokeWidth={1.7} />
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200"></div>
      </div>

      <div className="relative z-10 pt-8 flex justify-center">
        <div className="w-14 h-2 rounded-full bg-[#46695c] shadow-[0_4px_10px_rgba(70,105,92,0.25)]"></div>
      </div>
    </div>
  );

  return (
    <div className="group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-[2rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

      {isLinked ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block h-full transition-all duration-500 group-hover:-translate-y-2"
        >
          {content}
        </a>
      ) : (
        <div className="h-full transition-all duration-500 group-hover:-translate-y-2">
          {content}
        </div>
      )}
    </div>
  );
}

function App() {
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const content: Record<Language, AppContent> = {
    en: {
      nav: {
        about: 'About',
        vision: 'Vision',
        projects: 'Projects',
        contact: 'Contact',
      },

      hero: {
        title: 'Working for Next Generations',
        subtitle: 'Sustainability Solutions for Renewable Energy',
        cta1: 'Learn More',
        cta2: 'Contact Us',
      },

      about: {
        title: 'About Mustdam',
        description:
          'Mustdam is a national SME company located in Riyadh, established in 2020. We capitalize on Vision 2030 entrepreneurship in sustainability by delivering solutions that minimize environmental impact and contribute to achieving carbon neutrality by 2060.',
        points: [
          'Utilizing natural resources',
          'Reducing emissions',
          'Generating 50% renewable power by 2030',
          'Supporting the Saudi Green Initiative',
        ],
      },

      vision: {
        title: 'Vision, Mission & Values',
        visionTitle: 'Vision',
        visionText:
          'Pioneering to provide Circular Economy technology in Saudi Arabia.',
        missionTitle: 'Mission',
        missionText:
          'Responsibly providing high-quality sustainability solutions that add value to all stakeholders.',
        valuesTitle: 'Values (4Cs)',
        values: [
          { title: 'Collaborate', text: 'With technology leaders' },
          { title: 'Cooperate', text: 'With local value chain' },
          { title: 'Contribute', text: 'To national transformation plans' },
          { title: 'Create', text: 'Value for our people' },
        ],
      },

      environmental: {
        title: 'Carbon Emissions is the Center of Our Message',
        subtitle:
          'Oceans are suffering — we act responsibly to save our future.',
      },

      drivers: {
        title: 'Drivers Toward Sustainability',
        items: [
          {
            title: 'Renewable Energy',
            description: 'Transitioning to clean power sources',
          },
          {
            title: 'Carbon Neutrality',
            description: 'Achieving net-zero by 2060',
          },
          {
            title: 'Waste-to-Energy',
            description: 'Converting waste into resources',
          },
          {
            title: 'Circular Economy',
            description: 'Sustainable resource management',
          },
        ],
      },

      flow: {
        tag: 'OUR SOLUTIONS',
        title: 'Circulam Platform Solutions',
        description:
          'These solutions are part of the Circulam platform, developed by Mustdam to support circular economy operations.',
        nodes: [
          {
            title: 'Collectors',
            label: 'Scan',
            description:
              'A bounty-based system encouraging collectors to scan and submit materials.',
          },
          {
            title: 'Storers',
            label: 'Store',
            description:
              'A marketplace that connects storers, recyclers, and manufacturers.',
          },
          {
            title: 'Producers',
            label: 'Return',
            description:
              'Manufacturers reuse processed materials, reducing waste and emissions.',
          },
        ],
        benefitsTitle: 'System Benefits',
        benefits: [
          {
            title: 'Efficient Material Management',
            description:
              'Connecting industrial parties to maximize utilization and minimize waste.',
          },
          {
            title: 'Full Lifecycle Tracking Transparency',
            description:
              'Easily monitor material movement via smart tracking.',
          },
          {
            title: 'Unified Trading and Recycling Platform',
            description:
              'Collection, storage, sorting, and recycling within one ecosystem.',
          },
          {
            title: 'Accurate Data for Sustainability Decisions',
            description:
              'Smart reports helping companies and investors assess environmental impact.',
          },
        ],
      },

      solutions: {
        title: 'Our Solutions',
        items: [
          {
            title: 'Bounty Rewards for Material Collection',
            description:
              'A bounty incentive system for collectors to encourage material collection.',
          },
          {
            title: 'Materials Trading & Storage Platform',
            description:
              'A market platform connecting storers, recyclers, and manufacturers.',
          },
          {
            title: 'Lifecycle Tracking via Barcodes',
            description:
              'Tracking product lifecycle from manufacturing to end-user using labels.',
          },
          {
            title: 'Environmental Impact Analytics & Data',
            description:
              'Big-data insights to help investors and regulators measure environmental impact.',
          },
        ],
      },

      projects: {
        title: 'Our Projects',
        items: [
          {
            name: 'Waste to Oil',
            description: 'Converting waste into valuable resources',
          },
          {
            name: 'Circulam',
            description: 'Circular economy platform',
            link: 'https://www.circulam.net',
            logo: 'https://www.circulam.net/icons/circulam.png',
          },
          {
            name: 'Industrial Gases',
            description: 'Sustainable gas solutions',
          },
          {
            name: 'Electromagnetic Measurement & Calibration',
            description: 'Precise industrial solutions',
          },
        ],
      },

      contact: {
        title: 'Contact Us',
        circulam: 'For Circulam inquiries:',
        gases: 'For Industrial Gases:',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send Message',
        location: 'Riyadh, Saudi Arabia',
      },

      footer: {
        text: "Let's save our future...",
        copyright: '© 2025 Mustdam. All rights reserved.',
      },
    },

    ar: {
      nav: {
        about: 'عن الشركة',
        vision: 'الرؤية',
        projects: 'المشاريع',
        contact: 'اتصل بنا',
      },

      hero: {
        title: 'نعمل من أجل الأجيال القادمة',
        subtitle: 'حلول الاستدامة للطاقة المتجددة',
        cta1: 'اعرف المزيد',
        cta2: 'اتصل بنا',
      },

      about: {
        title: 'عن مستدام',
        description:
          'مستدام هي شركة سعودية مقرها الرياض، تأسست عام 2020. نستثمر في ريادة الأعمال لتحقيق رؤية 2030 عبر تقديم حلول تقلل الأثر البيئي وتسهم في الوصول إلى الحياد الكربوني بحلول عام 2060.',
        points: [
          'استغلال الموارد الطبيعية',
          'تقليل الانبعاثات',
          'توليد 50٪ من الطاقة من مصادر متجددة بحلول 2030',
          'دعم مبادرة السعودية الخضراء',
        ],
      },

      vision: {
        title: 'الرؤية والرسالة والقيم',
        visionTitle: 'الرؤية',
        visionText:
          'الريادة في تقديم تقنيات الاقتصاد الدائري في المملكة العربية السعودية.',
        missionTitle: 'الرسالة',
        missionText:
          'تقديم حلول استدامة عالية الجودة تضيف قيمة لجميع الأطراف المعنية.',
        valuesTitle: 'القيم (4Cs)',
        values: [
          { title: 'التعاون', text: 'مع رواد التكنولوجيا' },
          { title: 'التنسيق', text: 'مع سلاسل القيمة المحلية' },
          { title: 'المساهمة', text: 'في خطط التحول الوطني' },
          { title: 'خلق القيمة', text: 'لموظفينا' },
        ],
      },

      environmental: {
        title: 'مكافحة تغير المناخ: جوهر التزامنا',
        subtitle:
          'نعمل بمسؤولية لخفض البصمة الكربونية وقيادة التحول نحو اقتصاد دائري مستدام.',
      },

      drivers: {
        title: 'الدوافع نحو الاستدامة',
        items: [
          {
            title: 'الطاقة المتجددة',
            description: 'التحول إلى مصادر الطاقة النظيفة',
          },
          {
            title: 'الحياد الكربوني',
            description: 'تحقيق صفر انبعاثات بحلول 2060',
          },
          {
            title: 'تحويل النفايات إلى طاقة',
            description: 'تحويل النفايات إلى موارد',
          },
          {
            title: 'الاقتصاد الدائري',
            description: 'إدارة مستدامة للموارد',
          },
        ],
      },

      flow: {
        tag: 'OUR SOLUTIONS',
        title: 'حلول منصة سيركلوم',
        description:
          'تقدم هذه الحلول ضمن منصة سيركلوم، إحدى المنصات التي طورتها شركة مستدام لدعم الاقتصاد الدائري.',
        nodes: [
          {
            title: 'الجامعون',
            label: 'Scan',
            description: 'مسح المواد وتجميعها عبر نظام مكافآت محفّز.',
          },
          {
            title: 'المخازن',
            label: 'Store',
            description: 'توثيق المواد وتخزينها وإتاحتها للمصانع عبر المنصة.',
          },
          {
            title: 'المصانع',
            label: 'Return',
            description: 'الاستفادة من المواد وإعادتها إلى دورة الإنتاج.',
          },
        ],
        benefitsTitle: 'فوائد النظام',
        benefits: [
          {
            title: 'تعزيز كفاءة إدارة المواد',
            description:
              'ربط الأطراف الصناعية لرفع الاستفادة وتقليل الفاقد.',
          },
          {
            title: 'شفافية كاملة في تتبع دورة الحياة',
            description:
              'متابعة حركة المواد بسهولة عبر التتبع الذكي.',
          },
          {
            title: 'منصة موحّدة للتداول وإعادة التدوير',
            description:
              'جمع، تخزين، وفرز وتدوير المواد عبر منظومة واحدة.',
          },
          {
            title: 'بيانات دقيقة تدعم قرارات الاستدامة',
            description:
              'تقارير ذكية تساعد الشركات والمستثمرين على تقييم الأثر البيئي.',
          },
        ],
      },

      solutions: {
        title: 'حلولنا',
        items: [
          {
            title: 'نظام مكافآت لجمع المواد',
            description:
              'نظام حوافز للمُجمّعين لتشجيع جمع المواد.',
          },
          {
            title: 'منصة تداول وتخزين المواد',
            description:
              'منصة سوق تربط المخزّنين والمعيدين للتدوير والمصنّعين.',
          },
          {
            title: 'تتبّع دورة الحياة باستخدام الباركود',
            description:
              'تتبّع دورة حياة المنتج من التصنيع حتى المستخدم النهائي عبر الملصقات.',
          },
          {
            title: 'تحليلات وبيانات للأثر البيئي',
            description:
              'رؤى تعتمد على البيانات الضخمة لمساعدة المستثمرين والجهات المنظمة في قياس الأثر البيئي.',
          },
        ],
      },

      projects: {
        title: 'مشاريعنا',
        items: [
          {
            name: 'تحويل النفايات إلى نفط',
            description: 'تحويل النفايات إلى موارد قيمة',
          },
          {
            name: 'Circulam',
            description: 'منصة الاقتصاد الدائري',
            link: 'https://www.circulam.net',
            logo: 'https://www.circulam.net/icons/circulam.png',
          },
          {
            name: 'الغازات الصناعية',
            description: 'حلول الغاز المستدامة',
          },
          {
            name: 'القياس والمعايرة الكهرومغناطيسية',
            description: 'حلول صناعية دقيقة',
          },
        ],
      },

      contact: {
        title: 'اتصل بنا',
        circulam: 'للاستفسار عن Circulam:',
        gases: 'للغازات الصناعية:',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        message: 'الرسالة',
        send: 'إرسال الرسالة',
        location: 'الرياض، المملكة العربية السعودية',
      },

      footer: {
        text: 'دعونا نحافظ على مستقبلنا...',
        copyright: '© 2025 مستدام. جميع الحقوق محفوظة.',
      },
    },
  };

  const t = content[language];
  const isRTL = language === 'ar';

  const valueIcons = [Handshake, Users, TrendingUp, Lightbulb];
  const aboutPointIcons = [Leaf, TrendingDown, Zap, Globe];

  return (
    <div
      className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <img
                  src={logoImg}
                  alt="Mustdam Logo"
                  className="h-20 w-auto relative z-10 transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>

            <div
              className={`hidden md:flex items-center ${
                isRTL ? 'space-x-reverse' : ''
              } space-x-2 bg-white/60 backdrop-blur-md rounded-full px-2.5 py-2 shadow-inner ring-1 ring-white/40`}
            >
              <a
                href="#about"
                className="px-4 py-3 text-[#2d4a3e] rounded-full font-semibold text-base transition-colors duration-300 hover:text-[#3d5a4f] hover:underline underline-offset-8 decoration-2 decoration-[#5a8068]"
              >
                {t.nav.about}
              </a>

              <a
                href="#vision"
                className="px-4 py-3 text-[#2d4a3e] rounded-full font-semibold text-base transition-colors duration-300 hover:text-[#3d5a4f] hover:underline underline-offset-8 decoration-2 decoration-[#5a8068]"
              >
                {t.nav.vision}
              </a>

              <a
                href="#projects"
                className="px-4 py-3 text-[#2d4a3e] rounded-full font-semibold text-base transition-colors duration-300 hover:text-[#3d5a4f] hover:underline underline-offset-8 decoration-2 decoration-[#5a8068]"
              >
                {t.nav.projects}
              </a>

              <a
                href="#contact"
                className="px-4 py-3 text-[#2d4a3e] rounded-full font-semibold text-base transition-colors duration-300 hover:text-[#3d5a4f] hover:underline underline-offset-8 decoration-2 decoration-[#5a8068]"
              >
                {t.nav.contact}
              </a>
            </div>

            <button
              onClick={toggleLanguage}
              className="group relative overflow-hidden flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] text-white rounded-full hover:shadow-xl transition-all duration-500 hover:scale-[1.04]"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
              <Globe className="w-4 h-4 relative z-10 group-hover:rotate-180 transition-transform duration-700" />
              <span className="font-semibold relative z-10">
                {language === 'en' ? 'العربية' : 'English'}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f28] via-[#2d4a3e] to-[#3d5a4f]">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-20 left-20 w-96 h-96 bg-[#5a8068] rounded-full blur-3xl opacity-20 animate-blob"></div>
              <div className="absolute top-40 right-20 w-96 h-96 bg-[#3d5a4f] rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-[#2d4a3e] rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHxmlnsPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent"></div>
          </div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-12 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
            </div>

            <div className="relative animate-float">
              <Leaf
                className="w-24 h-24 text-white mx-auto drop-shadow-2xl"
                strokeWidth={1.75}
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in leading-tight tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
              {t.hero.subtitle}
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 mb-10 animate-fade-in-delay font-light max-w-3xl mx-auto leading-relaxed">
            {t.hero.title}
          </p>

          <div
            className={`flex ${
              isRTL ? 'flex-row-reverse' : 'flex-row'
            } items-center gap-4 md:gap-5 justify-center animate-fade-in-delay-2 flex-wrap`}
          >
            <Button variant="primary" href="#contact" className="min-w-[160px]">
              {t.hero.cta2}
            </Button>

            <Button variant="secondary" href="#about" className="min-w-[160px]">
              {t.hero.cta1}
            </Button>
          </div>

          <div className="flex justify-center mt-6">
            <ScrollIndicator className="hidden sm:flex" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-32 bg-gradient-to-b from-white via-[#f8fdfb] to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHxmlnsPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNkNWE0ZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L2Rlc2ZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#5a8068] tracking-wider uppercase bg-[#f0f7f4] px-4 py-2 rounded-full">
                About Us
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-[#2d4a3e] mb-4 leading-tight">
              {t.about.title}
            </h2>

            <SectionUnderline variant="gradient" compact animate="slide" />
          </div>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#3d5a4f] to-[#5a8068] rounded-full"></div>

                <p className="text-xl text-gray-700 leading-relaxed pl-6">
                  {t.about.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {t.about.points.map((point, index) => {
                const Icon = aboutPointIcons[index] || Wind;

                return (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                    <div className="relative flex items-start gap-5 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-500 group-hover:-translate-y-1 border border-gray-100">
                      <div
                        className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-500 ${
                          isRTL ? 'order-2' : 'order-1'
                        }`}
                      >
                        <Icon className="w-5 h-5 text-white" strokeWidth={1.6} />
                      </div>

                      <p
                        className={`text-gray-800 flex-1 font-medium pt-1.5 text-lg ${
                          isRTL
                            ? 'order-1 pr-2 text-right'
                            : 'order-2 pl-2 text-left'
                        }`}
                      >
                        {point}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section
        id="vision"
        className="py-32 bg-gradient-to-b from-white via-[#f0f7f4] to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHxmlnsPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNkNWE0ZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L2Rlc2ZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#5a8068] tracking-wider uppercase bg-white px-4 py-2 rounded-full shadow-sm">
                Our Foundation
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-[#2d4a3e] mb-4 leading-tight">
              {t.vision.title}
            </h2>

            <SectionUnderline variant="gradient" compact animate="slide" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>

              <div
                className="relative bg-white p-7 md:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100/70 group-hover:-translate-y-1"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="flex items-center gap-5 md:gap-6 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#3d5a4f] text-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Award className="w-6 h-6" strokeWidth={1.6} />
                  </div>

                  <h3
                    className={`text-lg md:text-xl font-semibold text-[#2d4a3e] tracking-tight ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t.vision.visionTitle}
                  </h3>
                </div>

                <p
                  className={`text-gray-700 leading-relaxed text-base md:text-lg ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  {t.vision.visionText}
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-all duration-300"></div>

              <div
                className="relative bg-white p-7 md:p-8 rounded-3xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100/70 group-hover:-translate-y-1"
                dir={isRTL ? 'rtl' : 'ltr'}
              >
                <div className="flex items-center gap-5 md:gap-6 mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#3d5a4f] text-white shadow-sm ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Users className="w-6 h-6" strokeWidth={1.6} />
                  </div>

                  <h3
                    className={`text-lg md:text-xl font-semibold text-[#2d4a3e] tracking-tight ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {t.vision.missionTitle}
                  </h3>
                </div>

                <p
                  className={`text-gray-700 leading-relaxed text-base md:text-lg ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  {t.vision.missionText}
                </p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold text-[#2d4a3e] mb-5 text-center">
            {t.vision.valuesTitle}
          </h3>

          <SectionUnderline variant="minimal" compact animate="slide" />

          <div className="grid md:grid-cols-4 gap-6 mt-8 md:mt-10">
            {t.vision.values.map((value, index) => {
              const Icon = valueIcons[index];

              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <div className="relative bg-white p-7 rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-3 transition-all duration-500 border border-gray-100 h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-2xl flex items-center justify-center mb-5 mx-auto shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Icon className="w-7 h-7 text-white" strokeWidth={1.6} />
                    </div>

                    <h4 className="text-lg font-bold text-[#2d4a3e] mb-2 text-center">
                      {value.title}
                    </h4>

                    <p className="text-gray-600 text-base text-center leading-relaxed">
                      {value.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Environmental Message */}
      <section className="py-32 bg-gradient-to-br from-[#1a2f28] via-[#2d4a3e] to-[#3d5a4f] text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHxmlnsPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPBlVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

          <Droplets className="absolute top-10 left-10 w-40 h-40 text-white/10 animate-float" />
          <Droplets className="absolute top-20 right-20 w-32 h-32 text-white/10 animate-float animation-delay-2000" />
          <Droplets className="absolute bottom-10 right-10 w-48 h-48 text-white/10 animate-float animation-delay-4000" />
          <Droplets className="absolute bottom-20 left-20 w-36 h-36 text-white/10 animate-float" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-8">
            <div className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm font-semibold text-white/90 tracking-wider uppercase">
                Our Mission
              </span>
            </div>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t.environmental.title}
          </h2>

          <p className="text-2xl md:text-3xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto">
            {t.environmental.subtitle}
          </p>

          <div className="mt-12 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Drivers */}
      <section className="py-32 bg-gradient-to-b from-white via-[#f8fdfb] to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 left-20 w-96 h-96 bg-[#3d5a4f] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#5a8068] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#5a8068] tracking-wider uppercase bg-[#f0f7f4] px-4 py-2 rounded-full">
                Sustainability Pillars
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-[#2d4a3e] mb-4 leading-tight">
              {t.drivers.title}
            </h2>

            <SectionUnderline variant="capsule" compact animate="slide" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.drivers.items.map((item, index) => {
              const icons = [Wind, Zap, Recycle, Globe];
              const Icon = icons[index];

              return (
                <div key={index} className="group relative h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                  <div className="relative bg-white p-7 rounded-3xl shadow-md hover:shadow-lg hover:-translate-y-3 transition-all duration-500 border border-gray-100 h-full flex flex-col">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.6} />
                    </div>

                    <h3 className="text-lg font-bold text-[#2d4a3e] mb-3">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm md:text-base leading-relaxed flex-1">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex justify-center">
                        <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#3d5a4f] to-[#5a8068]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        className="py-32 bg-gradient-to-b from-[#f4f8f6] via-[#eef3f1] to-[#f7faf8] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-70 pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 bg-white rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#dfeae5] rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold text-[#2f4f43] mb-6 tracking-tight">
              {t.projects.title}
            </h2>

            <div className="flex justify-center">
              <div className="w-32 h-2 rounded-full bg-[#587d6d] shadow-[0_4px_10px_rgba(88,125,109,0.18)]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {t.projects.items.map((project, index) => (
              <ProjectCard
                key={`${project.name}-${index}`}
                project={project}
                isRTL={isRTL}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Circulam Platform Solutions — Flow Diagram */}
      <section
        id="journey"
        className="py-32 bg-gradient-to-br from-[#f0f7f4] via-white to-[#f0f7f4] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-24 w-96 h-96 bg-[#3d5a4f] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-24 w-96 h-96 bg-[#5a8068] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-base font-semibold text-[#5a8068] tracking-wider uppercase bg-[#f0f7f4] px-4 py-2 rounded-full">
                {t.flow.tag}
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-[#2d4a3e] mb-4 leading-tight">
              {t.flow.title}
            </h2>

            <SectionUnderline variant="gradient" compact animate="slide" />

            {t.flow.description && (
              <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg md:text-xl text-center">
                {t.flow.description}
              </p>
            )}
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#3d5a4f]/30 via-[#5a8068]/40 to-[#3d5a4f]/30"></div>

            <div
              className={`hidden md:flex absolute top-[calc(50%-12px)] left-0 right-0 px-24 items-center justify-between ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <ArrowRight
                className={`w-6 h-6 text-[#3d5a4f]/70 ${
                  isRTL ? 'rotate-180' : ''
                } animate-pulse`}
              />
              <ArrowRight
                className={`w-6 h-6 text-[#5a8068]/70 ${
                  isRTL ? 'rotate-180' : ''
                } animate-pulse`}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {t.flow.nodes.map((node, idx) => {
                const icons = [Barcode, Package, Building2];
                const Icon = icons[idx] || Barcode;

                return (
                  <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                    <div
                      className="relative bg-white p-7 md:p-8 rounded-3xl shadow-md hover:shadow-lg hover:-translate-y-2 transition-all duration-500 border border-gray-100 h-full"
                      dir={isRTL ? 'rtl' : 'ltr'}
                    >
                      <div className="flex items-start gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#3d5a4f] text-white shadow-sm ring-1 ring-black/5">
                          <Icon className="w-6 h-6" strokeWidth={1.6} />
                        </div>

                        <div className="flex-1">
                          <div
                            className={`text-sm font-semibold tracking-wider text-[#5a8068] uppercase mb-1 ${
                              isRTL ? 'text-right' : 'text-left'
                            }`}
                          >
                            {node.label}
                          </div>

                          <h3
                            className={`text-xl font-bold text-[#2d4a3e] mb-2 ${
                              isRTL ? 'text-right' : 'text-left'
                            }`}
                          >
                            {node.title}
                          </h3>

                          <p
                            className={`text-gray-600 text-base md:text-lg leading-relaxed ${
                              isRTL ? 'text-right' : 'text-left'
                            }`}
                          >
                            {node.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="w-full flex items-center justify-center">
                          <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] shadow-[0_2px_6px_rgba(61,90,79,0.25)]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-14">
            <h4 className="text-2xl font-bold text-[#2d4a3e] mb-4 text-center">
              {t.flow.benefitsTitle}
            </h4>

            <SectionUnderline variant="minimal" compact animate="slide" />

            <div
              className={`mt-6 grid sm:grid-cols-2 gap-4 ${
                isRTL ? 'rtl' : 'ltr'
              }`}
            >
              {t.flow.benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-100"
                >
                  <div className="w-8 h-8 rounded-full bg-[#f0f7f4] flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#5a8068]" />
                  </div>

                  <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <p className="text-gray-900 font-semibold text-base md:text-lg">
                      {b.title}
                    </p>
                    <p className="text-gray-600 text-base mt-0.5">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-32 bg-gradient-to-b from-white via-[#f0f7f4] to-white relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHxmlnsPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNkNWE0ZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L2Rlc2ZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L2Z2Zz4=')] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-[#5a8068] tracking-wider uppercase bg-white px-4 py-2 rounded-full shadow-sm">
                Get In Touch
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-[#2d4a3e] mb-4 leading-tight">
              {t.contact.title}
            </h2>

            <SectionUnderline variant="minimal" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="space-y-6 md:-mt-2">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                <div
                  className="relative bg-white p-9 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 border border-gray-100"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-center gap-5 sm:gap-6 mb-3.5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
                      <Mail className="w-6 h-6 text-white" />
                    </div>

                    <h3
                      className={`font-bold text-lg md:text-xl text-[#2d4a3e] ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}
                    >
                      {t.contact.circulam}
                    </h3>
                  </div>

                  <div className="border-t border-gray-100 my-3"></div>

                  <a
                    href="mailto:support@circulam.net"
                    className={`text-[#5a8068] hover:text-[#3d5a4f] text-lg font-medium transition-colors block break-words ${
                      isRTL
                        ? 'text-right pr-[4.75rem] sm:pr-20'
                        : 'text-left pl-[4.75rem] sm:pl-20'
                    }`}
                  >
                    support@circulam.net
                  </a>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                <div
                  className="relative bg-white p-9 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 border border-gray-100"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-center gap-5 sm:gap-6 mb-3.5">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
                      <Mail className="w-6 h-6 text-white" />
                    </div>

                    <h3
                      className={`font-bold text-lg md:text-xl text-[#2d4a3e] ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}
                    >
                      {t.contact.gases}
                    </h3>
                  </div>

                  <div className="border-t border-gray-100 my-3"></div>

                  <a
                    href="mailto:m.shehab@mustdam.com"
                    className={`text-[#5a8068] hover:text-[#3d5a4f] text-lg font-medium transition-colors block break-words ${
                      isRTL
                        ? 'text-right pr-[4.75rem] sm:pr-20'
                        : 'text-left pl-[4.75rem] sm:pl-20'
                    }`}
                  >
sales@mustdam.com                  </a>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500"></div>

                <div
                  className="relative bg-white p-9 rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 border border-gray-100"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-center gap-5 sm:gap-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-xl flex items-center justify-center shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105 group-hover:brightness-110">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>

                    <p
                      className={`text-gray-800 text-lg font-medium ${
                        isRTL ? 'text-right' : 'text-left'
                      }`}
                    >
                      {t.contact.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative md:-mt-4">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3d5a4f] to-[#5a8068] rounded-3xl opacity-10 blur-2xl"></div>

              <form className="relative bg-white p-10 rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.05)] space-y-6 border border-gray-100 max-w-xl mx-auto">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHxmlnsPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPBlVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzNkNWE0ZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L2Rlc2ZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L2Z2Zz4=')] opacity-5 rounded-3xl"></div>

                <div className="relative z-10 space-y-6">
                  <div>
                    <label className="block text-gray-900 font-semibold mb-4 text-base uppercase tracking-wider">
                      {t.contact.name}
                    </label>

                    <input
                      type="text"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#3d5a4f] focus:border-[#3d5a4f] transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-4 text-base uppercase tracking-wider">
                      {t.contact.email}
                    </label>

                    <input
                      type="email"
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#3d5a4f] focus:border-[#3d5a4f] transition-all duration-300 bg-gray-50 focus:bg-white shadow-sm"
                      placeholder=""
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-semibold mb-4 text-base uppercase tracking-wider">
                      {t.contact.message}
                    </label>

                    <textarea
                      rows={5}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#3d5a4f] focus:border-[#3d5a4f] transition-all duration-300 bg-gray-50 focus:bg-white resize-none shadow-sm"
                      placeholder=""
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="group relative overflow-hidden w-full bg-gradient-to-r from-[#3d5a4f] to-[#5a8068] text-white font-bold py-5 rounded-2xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                    <span className="relative z-10">{t.contact.send}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#1a2f28] via-[#2d4a3e] to-[#3d5a4f] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHxmlnsPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPBlVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#5a8068] rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#3d5a4f] rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center flex flex-col items-center">
            <p className="text-2xl md:text-3xl font-light mb-12 text-white/90 leading-relaxed animate-fade-in">
              {t.footer.text}
            </p>

            <div className="flex justify-center items-center space-x-10 mb-10">
              <a
                href="#"
                className="group w-16 h-16 p-3 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-[1.06] transition-all duration-300 ring-1 ring-white/40 animate-fade-in-delay"
              >
                <Linkedin className="w-7 h-7 text-white group-hover:text-[#3d5a4f] transition-colors" />
              </a>

              <a
                href="#"
                className="group w-16 h-16 p-3 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 hover:scale-[1.06] transition-all duration-300 ring-1 ring-white/40 animate-fade-in-delay"
              >
                <Twitter className="w-7 h-7 text-white group-hover:text-[#3d5a4f] transition-colors" />
              </a>
            </div>

            <div className="w-full flex justify-center pt-6">
              <div className="w-28 h-px bg-white/40 rounded-full"></div>
            </div>

            <p className="text-white/60 text-xs mt-4">
              {t.footer.copyright}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;