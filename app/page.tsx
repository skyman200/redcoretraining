'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Activity, HeartPulse, Smartphone, ChevronRight, MapPin, Languages, Mail, Download, FileText, Image as ImageIcon } from 'lucide-react';

// Translation data
const translations = {
  en: {
    nav: {
      center: "About Center",
      app: "About App",
      blog: "Blog",
      download: "Download App",
      resources: "Resources"
    },
    hero: {
      title1: "Professional Offline",
      title2: "Excellence,",
      title3: "Now in Your App.",
      subtitle: "Experience years of expertise and data\nfrom Redcore Training Center.\nProfessional Pilates and breathing training,\nnow available at home.",
      cta1: "Get Started",
      cta2: "Visit Our Blog",
      location: "Yangsan-si, Mulgeum-eup (Offline Center Operating)"
    },
    features: {
      title: "Perfect Synergy Between",
      titleHighlight: "Center & App",
      subtitle: "We are a team of experts who research and train people's bodies in real-world settings, not just an app development company.",
      card1Title: "Professional Pilates Instructors",
      card1Desc: "Training programs designed by professional Pilates instructors with physical therapy backgrounds, based on years of field experience.",
      card2Title: "IT Technology Integration",
      card2Desc: "Beyond offline limitations, receive professional coaching anytime, anywhere through our app.",
      card3Title: "Breathing & Health Data",
      card3Desc: "Beyond simple exercise, measure and analyze breathing data to manage fundamental health."
    },
    center: {
      badge: "Since 2016",
      title1: "Real-World Experience",
      title2: "Creates the Best App.",
      desc1: "Redcore Training Center has practical data accumulated from directly caring for numerous members' bodies.",
      desc2: "Knowing better than anyone which postures are problematic and which breathing is needed, we develop digital healthcare solutions that create 'real change', not just another exercise app.",
      link: "See More Facilities",
      linkUrl: "https://blog.naver.com/PostView.naver?blogId=redcore2021&logNo=222317997696&categoryNo=10&parentCategoryNo=&from=thumbnailList"
    },
    resources: {
      title: "Resources & Downloads",
      subtitle: "Download training materials, guides, and resources from our Google Drive",
      loading: "Loading files...",
      error: "Failed to load files",
      download: "Download",
      view: "View",
      noFiles: "No files available"
    },
    cta: {
      title1: "Start Now,",
      title2: "Begin Healthier Breathing.",
      subtitle: "Experience Redcore Center's professional programs in the palm of your hand. Sign up for launch notifications to be the first to know.",
      button: "Sign Up for Launch (Coming Soon)",
      copyright: "© 2025 Redcore Training Center. All rights reserved.",
      address: "6F, 163 Jeungsanyeok-ro, Mulgeum-eup, Yangsan-si, Redcore Training Center"
    }
  },
  ko: {
    nav: {
      center: "센터 소개",
      app: "앱 소개",
      blog: "블로그",
      download: "앱 다운로드",
      resources: "자료실"
    },
    hero: {
      title1: "오프라인의",
      title2: "전문성을",
      title3: "앱으로 경험하세요.",
      subtitle: "레드코어 트레이닝 센터의\n수년간의 노하우와 데이터를 담았습니다.\n전문적인 필라테스와 호흡 트레이닝을\n이제 집에서도 만나보세요.",
      cta1: "앱 다운로드 시작하기",
      cta2: "센터 블로그 구경하기",
      location: "양산시 물금읍 (오프라인 센터 운영 중)"
    },
    features: {
      title: "센터와 앱의",
      titleHighlight: "완벽한 시너지",
      subtitle: "우리는 실제 현장에서 사람들의 몸을 연구하고 트레이닝하는 전문가 그룹입니다. 단순한 앱 개발사가 아닙니다.",
      card1Title: "전문적인 필라테스 강사진",
      card1Desc: "전문 물리치료사 출신의 필라테스 강사가 다년간 필드에서 쌓은 경험을 바탕으로 탄생했습니다.",
      card2Title: "IT 기술과의 결합",
      card2Desc: "오프라인의 한계를 넘어, 언제 어디서나 전문적인 코칭을 받을 수 있도록 앱으로 구현했습니다.",
      card3Title: "호흡과 건강 데이터",
      card3Desc: "단순한 운동을 넘어, 호흡 데이터를 측정하고 분석하여 근본적인 건강을 관리합니다."
    },
    center: {
      badge: "Since 2016",
      title1: "현장의 경험이",
      title2: "최고의 앱을 만듭니다.",
      desc1: "레드코어 트레이닝 센터는 수많은 회원님들의 몸을 직접 케어하며 쌓아온 실전 데이터가 있습니다.",
      desc2: "어떤 자세가 문제인지, 어떤 호흡이 필요한지 누구보다 잘 알기에, 그저 그런 운동 앱이 아닌 '진짜 변화'를 만들어내는 디지털 헬스케어 솔루션을 개발합니다.",
      link: "센터 시설 더 보기",
      linkUrl: "https://blog.naver.com/PostView.naver?blogId=redcore2021&logNo=222317997696&categoryNo=10&parentCategoryNo=&from=thumbnailList"
    },
    resources: {
      title: "자료실",
      subtitle: "구글 드라이브에서 트레이닝 자료, 가이드, 리소스를 다운로드하세요",
      loading: "파일 로딩 중...",
      error: "파일을 불러오는데 실패했습니다",
      download: "다운로드",
      view: "보기",
      noFiles: "사용 가능한 파일이 없습니다"
    },
    cta: {
      title1: "지금 바로,",
      title2: "더 건강한 호흡을 시작하세요.",
      subtitle: "레드코어 센터의 전문 프로그램을 내 손안에서 만나보세요. 출시 알림을 신청하시면 가장 먼저 소식을 전해드립니다.",
      button: "출시 알림 신청하기 (준비중)",
      copyright: "© 2025 레드코어 트레이닝 센터. All rights reserved.",
      address: "양산시 물금읍 증산역로 163 6층 레드코어운동센터"
    }
  }
};

// Google Drive 파일 타입
interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  webContentLink?: string;
  size?: string;
  modifiedTime?: string;
}

// --- Main Page Component ---
export default function Home() {
  const [lang, setLang] = useState<'en' | 'ko'>('en');
  const [showAppImage, setShowAppImage] = useState(false);
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(true);
  
  const t = translations[lang];
  const heroImages = ['/hero.jpg', '/app.jpg'];

  // "About App" 클릭 핸들러
  const handleAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowAppImage(true);
    // 스크롤을 Hero 섹션으로 이동
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // "About Center" 클릭 핸들러
  const handleCenterClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowAppImage(false);
    // 스크롤을 Hero 섹션으로 이동
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Google Drive 파일 목록 가져오기
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/drive');
        if (response.ok) {
          const files = await response.json();
          setDriveFiles(files);
        } else {
          console.error('Failed to fetch files');
        }
      } catch (error) {
        console.error('Failed to fetch files:', error);
      } finally {
        setLoadingFiles(false);
      }
    };

    fetchFiles();
  }, []);

  // 구글맵 URL 생성
  const getGoogleMapsUrl = () => {
    const address = lang === 'ko' 
      ? '양산시 물금읍 증산역로 163 6층 레드코어운동센터'
      : '6F, 163 Jeungsanyeok-ro, Mulgeum-eup, Yangsan-si, Redcore Training Center';
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  // 파일 아이콘 가져오기
  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('image')) return <ImageIcon size={20} />;
    if (mimeType.includes('pdf')) return <FileText size={20} />;
    return <FileText size={20} />;
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes?: string) => {
    if (!bytes) return '';
    const size = parseInt(bytes);
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(1) + ' KB';
    return (size / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white selection:bg-red-500/30">

      {/* 1. Header (Navigation) */}
      <header className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              REDCORE
            </span>
            <span className="text-sm font-medium text-zinc-400">Training Center & Lab</span>
          </div>
          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-300">
            <Link href="#hero" onClick={handleCenterClick} className="hover:text-red-400 transition">{t.nav.center}</Link>
            <Link href="#hero" onClick={handleAppClick} className="hover:text-red-400 transition">{t.nav.app}</Link>
            <Link href="https://blog.naver.com/redcore2021" target="_blank" className="hover:text-red-400 transition">{t.nav.blog}</Link>
            <Link href="#resources" className="hover:text-red-400 transition">{t.nav.resources}</Link>
          </nav>
          {/* Language Toggle & Download Button */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:admin@redcoretraining.com"
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white transition border border-zinc-700 rounded-full hover:border-red-500/50"
              aria-label="Send email"
              title="admin@redcoretraining.com"
            >
              <Mail size={16} />
            </a>
            <button
              onClick={() => setLang(lang === 'en' ? 'ko' : 'en')}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white transition border border-zinc-700 rounded-full hover:border-red-500/50"
              aria-label="Toggle language"
            >
              <Languages size={16} />
              <span className="hidden sm:inline">{lang === 'en' ? '한글' : 'EN'}</span>
            </button>
            <Link
              href="#download"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-bold text-white bg-red-600 rounded-full hover:bg-red-700 transition shadow-lg shadow-red-600/20"
            >
              {t.nav.download}
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 w-full h-full bg-gradient-radial from-red-500/40 to-transparent blur-3xl transform -translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Left: Text */}
            <div className="flex-1 text-center md:text-left space-y-8">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
                {t.hero.title1}<br />
                {t.hero.title2}<br />
                <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  {t.hero.title3}
                </span>
              </h1>
              <p className="text-lg text-zinc-400 md:max-w-xl leading-loose whitespace-pre-line">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Link
                  href="#download"
                  className="flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-red-600 rounded-full hover:bg-red-700 transition shadow-lg shadow-red-600/25 w-full sm:w-auto justify-center"
                >
                  {t.hero.cta1} <ChevronRight size={20} />
                </Link>
                <Link
                  href="https://blog.naver.com/redcore2021"
                  target="_blank"
                  className="flex items-center gap-2 px-8 py-4 text-base font-bold text-zinc-300 border border-zinc-700 rounded-full hover:text-white hover:border-red-500 hover:bg-red-500/10 transition w-full sm:w-auto justify-center"
                >
                  {t.hero.cta2}
                </Link>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-zinc-500 pt-4">
                <MapPin size={16} className="text-red-500" />
                <a
                  href={getGoogleMapsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition cursor-pointer"
                >
                  {t.hero.location}
                </a>
              </div>
            </div>
            {/* Right: Dynamic Dual Images */}
            <div className="flex-1 relative w-full max-w-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-orange-500/20 blur-2xl rounded-3xl transform rotate-3 scale-105 opacity-70" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="relative w-full aspect-[4/3]">
                  {/* Hero Image - 역동적인 애니메이션 */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      showAppImage ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
                    }`}
                    style={{
                      animation: showAppImage ? 'none' : 'floatUpDown 4s ease-in-out infinite',
                    }}
                  >
                    <Image
                      src="/hero.jpg"
                      alt="Redcore Center Main"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  
                  {/* App Image - 역동적인 애니메이션 */}
                  <div
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      showAppImage ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4'
                    }`}
                    style={{
                      animation: showAppImage ? 'floatLeftRight 4s ease-in-out infinite' : 'none',
                    }}
                  >
                    <Image
                      src="/app.jpg"
                      alt="Redcore App"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="py-20 bg-zinc-900/50 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-800/20 blur-3xl rounded-full pointer-events-none translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.features.title} <span className="text-red-500">{t.features.titleHighlight}</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {t.features.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Activity size={32} className="text-red-500" />}
              title={t.features.card1Title}
              description={t.features.card1Desc}
            />
            <FeatureCard
              icon={<Smartphone size={32} className="text-red-500" />}
              title={t.features.card2Title}
              description={t.features.card2Desc}
            />
            <FeatureCard
              icon={<HeartPulse size={32} className="text-red-500" />}
              title={t.features.card3Title}
              description={t.features.card3Desc}
            />
          </div>
        </div>
      </section>

      {/* 4. Center Introduction Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="flex-1 relative w-full max-w-xl order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-bl from-red-500/20 to-orange-500/10 blur-2xl rounded-3xl transform -rotate-3 scale-105 opacity-70" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video">
                <Image
                  src="/center.jpg"
                  alt="Redcore Center Studio"
                  fill
                  className="object-cover transform hover:scale-105 transition duration-700"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6 order-1 md:order-2">
              <div className="inline-block px-3 py-1 text-xs font-semibold text-red-500 bg-red-500/10 rounded-full border border-red-500/20">
                {t.center.badge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                {t.center.title1}<br /> {t.center.title2}
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                {t.center.desc1}
                <br /><br />
                {t.center.desc2}
              </p>
              <div className="pt-4">
                <Link
                  href={t.center.linkUrl}
                  target="_blank"
                  className="text-red-400 flex items-center gap-1 hover:gap-2 transition-all font-medium"
                >
                  {t.center.link} <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Resources Section - Google Drive 연동 */}
      <section id="resources" className="py-20 bg-zinc-900/50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t.resources.title}
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              {t.resources.subtitle}
            </p>
          </div>

          {loadingFiles ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
              <p className="text-zinc-400 mt-4">{t.resources.loading}</p>
            </div>
          ) : driveFiles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-zinc-400">{t.resources.noFiles}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {driveFiles.map((file) => (
                <div
                  key={file.id}
                  className="p-6 rounded-2xl bg-zinc-800/50 border border-white/5 hover:border-red-500/30 hover:bg-zinc-800/80 transition duration-300 group"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-zinc-900/80 rounded-xl text-red-500">
                      {getFileIcon(file.mimeType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white mb-1 truncate group-hover:text-red-400 transition">
                        {file.name}
                      </h3>
                      {file.size && (
                        <p className="text-xs text-zinc-500">
                          {formatFileSize(file.size)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {file.webContentLink && (
                      <a
                        href={file.webContentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
                      >
                        <Download size={16} />
                        {t.resources.download}
                      </a>
                    )}
                    <a
                      href={file.webViewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-zinc-300 border border-zinc-700 rounded-lg hover:border-red-500 hover:text-red-400 transition"
                    >
                      {t.resources.view}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. CTA Section */}
      <section id="download" className="py-24 relative overflow-hidden bg-red-900/20">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-0" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-red-600/30 blur-[100px] rounded-full pointer-events-none transform -translate-y-1/2 -translate-x-1/2 z-0 opacity-50" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
            {t.cta.title1}<br />
            {t.cta.title2}
          </h2>
          <p className="text-xl text-zinc-300 mb-10 max-w-xl mx-auto leading-relaxed">
            {t.cta.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-full hover:bg-red-700 transition shadow-lg shadow-red-600/25 w-full sm:w-auto">
              {t.cta.button}
            </button>
          </div>
          <div className="mt-8 space-y-3">
            <a
              href="mailto:admin@redcoretraining.com"
              className="inline-flex items-center gap-2 text-base text-zinc-400 hover:text-red-400 transition-colors"
            >
              <Mail size={18} />
              <span>admin@redcoretraining.com</span>
            </a>
            <a
              href={getGoogleMapsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              {t.cta.address}
            </a>
            <p className="text-sm text-zinc-500">
              {t.cta.copyright}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}

// --- Feature Card Component ---
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-zinc-800/50 border border-white/5 hover:border-red-500/30 hover:bg-zinc-800/80 transition duration-300 group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
      <div className="relative z-10">
        <div className="mb-6 p-4 bg-zinc-900/80 rounded-2xl inline-block shadow-lg border border-white/5 group-hover:scale-110 transition duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-red-400 transition">
          {title}
        </h3>
        <p className="text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
