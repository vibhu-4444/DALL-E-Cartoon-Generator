import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Download,
  Heart,
  House,
  Images,
  LayoutGrid,
  Palette,
  RefreshCw,
  Rocket,
  Rows3,
  Sparkles,
  Upload,
  User,
  Zap,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'generate', label: 'Generate' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'pricing', label: 'Pricing' },
];

const HERO_IMAGES = {
  fox: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9flQ4QKd2pgbXQWGShEa0o5bcre_vArsHDBALmsguV27ivZSkns2tHdixBX9xAjDyHj4oFXCaMVlK4bcM0dDWk7yJoEnrirMkh_sqNrMu1HiPgATG-R7za2qYn03wBZxyvzhEkEgvsfHxBpVTlcg3CVwTJmWcYzhNpI7YzU0F5jXtuFcWVCX2w0gDevDIuAbRPsdvstzHJkWzSSpTEupB6kjH3oo6-6WWSLSPmO53PrtYwYT7NAmjuLVxf4LPlGdT4zgfsGTYV_7A',
  luna: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxdfQpFP8BfVUCAv1JyAP87r0JWSZJ2z7FugGW8XoBxa0ndhmFb0s9pdNq9dZ7VWMCPz4k8tRXwWQBl4DhJypEPdzmA6-HQ2KtmjAZiAWrJsk9T_bLei9wRo9h28tTWrnuoMq7RD_NAyBG1Qu_FLZbP9qBa4TyVlihmXOn3KUtwVR06PdrP9mQ9c_9PAwbrE01JKdvtivdg7zS3EoQNIHtgs8WHbdiHbSsxvfDvO1O8ikeC6Jy1I6Unq_KqqBNLrsB5sHY3cWBNr4Z',
  island: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN0WybG_OCABl2-fdtd0Hi03-EN_6QxHD0XegRc4D7a9VHyzXkLKk4LXOu6knMAWisFuf8YubTpvi7xRRcMTdHEtYmCQpUwTBlqjoERWUNbcqJkVtKo_RbxGi0WeO0s1y1J9JdbhLsyyDHl9U8WNIRHEP3j_IvGCR-GPcnmPcidC5qBNPCZH3ukFt2CfRdTqRNGpt_TEsqM6m8gnZWJ_qVr1mDI-YmXUn8_EyqNua_6Njroi3hLJHjSwop5-zTUCWxncIdjt7c-01m',
  engine: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrQgq_Abj_0V4nQ16bfheIlvSE5g_fa55JOQxMtpf-IE84pTwONPSnkyiMfw-KL6L6nRG149xwHQIXtOI6yP44o5QjsZkhXS4ZfVko8lxj6YqEC_W0cd65xphQWJu46Q2HkpiZ_oWB8tTMYbUXJhpyqIKUeBtJXkJpBXSrYq3B8CDZhUkb5uzG1I79byr8eF-6X7JLKNAA65zoZVdklEpZPrfH3_RY5Ox5U7wpIPRGntjXjemoNOkvGd9pb6_xyqGbZV2WgVMb3EjT',
  evolve: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhR2fuo7GACwuroBVERc5KUUET991Yz2eJTutxqMF9IJdHQpyNt7rxXDu4GW8q5qAk8On7hwrEN6QC25xWg0eNaX6vzo-rL_97iUFvNbzxnZnemANLI3kjA6eJqhi7okIlBqX4Mc5N6n3jusZhOYIT_uIhI1m4f6LaoWYf_MyX0e-i0k93KazuzJa51UBfhyFHC-Rgt2GmFV3UlcEBlhAitYIBavBAUnk1EEy-7OZroGi5W1Pd14lJsCNUo1U9QoW3ddvmoYxoTVGI',
};

const STYLE_OPTIONS = ['Anime', 'Pixar', 'Sketch', 'Comic', '3D Cartoon'];
const ASPECT_OPTIONS = ['1:1', '4:3', '16:9'];
const QUALITY_OPTIONS = [
  {
    value: 'Standard',
    hint: 'Fast creative draft',
  },
  {
    value: 'HD (2k)',
    hint: 'Sharper detail balance',
  },
  {
    value: 'Ultra (4k)',
    hint: 'Max polish and detail',
  },
];
const CREATION_VIEW_OPTIONS = [
  { id: 'list', label: 'List', icon: Rows3 },
  { id: 'grid', label: 'Grid', icon: LayoutGrid },
];
const GALLERY_FILTERS = ['All Styles', 'Anime', '3D Pixar', 'Pencil Sketch', 'Cyberpunk', 'Watercolor'];
const FOOTER_LINKS = ['Privacy Policy', 'Terms of Service', 'Contact', 'Twitter', 'Discord'];

const GENERATION_LIBRARY = [
  {
    id: 'luna-scout',
    title: 'Luna Scout',
    style: '3D Cartoon',
    category: '3D Pixar',
    aspect: '4/5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJY8Y11rC_n549Nm-aR4v1YMbirDg4MUZfHxa7zuJAfF19xhLQ_GfVwbiuE0u57ndEivDxFZoMPzAYuqCEJZ7RamQND1odIG1zSUu2Es1mQeCu3PuDG9nRDKEK3Oq7Vf_V9iAJGRsJeu_8SPyt0CZ-ItjftCjrPZthqlVcU5CxIpEK2IFRcABCv1yxdKjacaqW3uZ2nbRlMmp_rqOsZHsssby2l-GlWkVdEcLBbp2c0CgFRHQVyuIAprPsStkRxIuno9HYjTzDkZvF',
  },
  {
    id: 'verdant-bloom',
    title: 'Verdant Bloom',
    style: 'Anime',
    category: 'Anime',
    aspect: '4/5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAGMvv6OKNMv6s24cF2Vl93f2fvTP5PQYJp0wy3Nld-Nly0jcq7MOE0iSXV9wYYOn10OAnJzgOyO2O-56xVrl0xG-hBqzDkXVAyMl0ZKyMGI7grttN2Rwdl4jAJAAcm6YlnQImtIZZd8y-m7B9ShadGrs_tXDXMcYzaJWx6D8RZbLJ9QAS9MAiTxsajYiqGEaCMnU2o-gUK81oCX-liPymWTutIGscu4hCkPh1aJGW_Sqwljdg8e4-_rADLj-L2ig6yEbJ34hl3ShUB',
  },
  {
    id: 'velocity-ink',
    title: 'Velocity Ink',
    style: 'Sketch',
    category: 'Pencil Sketch',
    aspect: '4/5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBY5ZnbJ20p-xcW3mThHIdfDMORP4Yxpp-hkIh5S5SSSLo67_uu6AZscYyXqtVaFgEZ0qyizV0RMmce2uD2nllrSDfO2rJMm5j6BBBmyb4bxff3mgWQT-rQRjuLzRJHxsGnlQV8scqjKyaHFNmUgZKUJhA36CHDLdosJ_NqdEJVkbVeKH5F3z67b_tBXSW4I0TKoPSp-fa7az_1bjPKmGZKgu4vMrSlg9YaJy98teWlzHuJrRu4Rpb1wOJsCerJg8DmJr2pOaoWrhJL',
  },
  {
    id: 'turbo-noir',
    title: 'Turbo Noir',
    style: 'Comic',
    category: 'Cyberpunk',
    aspect: '4/5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDiUGRfkakjxgRUqHDPbg7tMRZOL03GuCkrzy3WkIuH3s2Y-3A5hrLNWFENCuBZYDX3RfeSia-eFJ29ooFTFmpDqpSnAmQGhDMxauZFhY5inCMVgs_nK-LSn_VAT28VpUf9YoqPxF3UaLP5CXk4Lv2bo6JH4fxNG4fCOCW2Y29Z3-nMTmPaLIVL7NIB11R9NvjDfM78k352ttVtiMP4SWyTZQTxveB_oTSahM9k4THw92PzxqgSx4_g2awiCeiD_EpSfdBlUSai9d9U',
  },
];

const GALLERY_LIBRARY = [
  {
    id: 'neon-samurai',
    title: 'Neon Samurai',
    category: 'Anime',
    aspect: '4/5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsOn4gpx12IcKUJyrDW2p4di2mLhQwv8nhSDGeCQ69G8ta68MVZxmSjSSNGsCJwyDInhFDkIqug-sW4_gr_P6pjAbj1tc7uvbFAvqVN3IlXDyy-m_cL_pQkHXJFcO93LcG5zvtWYyknB8Bm7vzt1R8b5_nldNP1IWjoAGNzYIUX0TCx0wSyahel83_M17yku8zDXoS27oof3Q8V8ZQL2RA_P0TpIWPQ7SbMLCN5D7D1J1zEZj-rYfrglIj0fypVL9bguRzxZcc5r38',
  },
  {
    id: 'bot-explorer',
    title: 'Bot Explorer',
    category: '3D Pixar',
    aspect: '1/1',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDyfWjGEeDzXf-gDA1nh8Bid9pe0Xyb0--FTM5gtiOktPLrSY0-mmX3xOU3pUzEDxLQFKzpk9MeHTOURJiIUFcxcSHLao60wuV6qXeHiE6WggLIu9MJd6m8tpus5O_epWydXFAnMUtH3V-51rlpbVhphSLla06vuPzRzSWx44ZNYkCgFQ6GUU9kE_U0QSDCgPolRVy-908G40RbF_u9votBe4LEJjNQf0EWyXyUNcuvZyi-TFTyK0MEZ4JpIho5hT_80z9ozuQ2HqPO',
  },
  {
    id: 'whisper-woods',
    title: 'Whisper Woods',
    category: 'Pencil Sketch',
    aspect: '4/5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnp0arIBQJZCk87HV5GfuBebyTWkfihUSXwaFUD-s8YA6UX4zOlBs-iaivcHCsr-sL9zUUbSbK-9qWMcVwIxzkSrqGkZyBMy198pwROwcO0jkz6IdPY7f-h7F1iD5Y7slTUeStD0DEsZwlnloMhG7SdR_aPPkuxJBULQ2VI5pn4Fq4EBLdUQ7xqk4sVi0Pd0fyGNVaz-VAJpZXDBaye2F1iYYumXcNPxJdPW4Ex6VaW7UDmTvaucSb1lt474JIprgm-naKqQsIxn54',
  },
  {
    id: 'feline-aviator',
    title: 'Feline Aviator',
    category: 'Watercolor',
    aspect: '3/4',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8Ue_m5S7-Dr-ELNiZxpM8kGZZqcWY9_yvhBiEl7Km9yzrf-qnAa2XfE8WOg4gxQZncOcLtkumrxSlk1Y9cFvneqbGadnl-Db9hdDzZSEW56LfOpMkTXa_08YI1CuK6ffXLwrPbFOwJT-ccRQN2jC1SI3kpNqv7r-2J0AvG0FSYipRdbkM5SGgoFzhxg9oGwojzbiRygl12Gy4QPulRSEOeIQvFfOtit_Mpkw6v6MvE5Ygao236LrtEzC819gQeZIkwrDqY0PIeXRp',
  },
  {
    id: 'ether-drift',
    title: 'Ether Drift',
    category: 'Cyberpunk',
    aspect: '1/1',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_BkqfXTSfMbc2Fkbo8VL8tbYZdNCGsfaQa2aVYhgxzxvzUi9M5iCqqh21XhkqzrNUIJlKBuE-XeCdSiw6HpuCJiqHlwbSYkpvBsx71ScZLd2bmnuq1MUt2iTGXYLb-uzgGoeyM1LKBPiTnwhmiTxg1PBZS5Pu8-5DMxpRsOKwRFfQqEnq7azGLyBDEzxxJQ66-iH2D-dSQh6m0yAnjFIZIhTk7qp5hSQ68rTcgflUqHxhKguUJ6IbG7ffLwXwaul9TpRMZAYKP9Av',
  },
  {
    id: 'midnight-sentinel',
    title: 'Midnight Sentinel',
    category: 'Cyberpunk',
    aspect: '4/5',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCGPxgAxGXar8dtWJceWvsAgFWF3nfxNvnLlITdViPoVUHRDHGVOJugx6xJZYMbFWjJ0btq43K9PwqzaN98tsDcpS2-MT_z7xQFF7dqRrqPOAEvNUcuKalkjwKViZPukgvaUwtfAzeijPIhhbn27Xzahe3rsEwkM7pVsGcVXt-oMyMf7oEdKpsil_ppK0AHz98EItVOIXh3T_dJCh4YURbfZM52uZxB24BERvc8ZwFAE4H7y44DHZv-KvigpZkuNZ1vVcq6J4Xo0H55',
  },
];

const PRICING_PLANS = [
  {
    name: 'Free',
    price: '$0',
    cta: 'Get Started',
    features: [
      { label: '10 generations per day', enabled: true },
      { label: 'Standard resolution', enabled: true },
      { label: '3 basic art styles', enabled: true },
      { label: 'Watermarked exports', enabled: false },
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    cta: 'Go Pro Now',
    popular: true,
    features: [
      { label: 'Unlimited generations', enabled: true, icon: 'auto_awesome', fill: true },
      { label: '4K Ultra-HD exports', enabled: true },
      { label: 'All 50+ premium styles', enabled: true },
      { label: 'Commercial license', enabled: true },
      { label: 'Priority queue access', enabled: true },
    ],
  },
  {
    name: 'Enterprise',
    price: '$99',
    cta: 'Contact Sales',
    features: [
      { label: 'Everything in Pro', enabled: true },
      { label: 'Team collaborative workspace', enabled: true },
      { label: 'API access for developers', enabled: true },
      { label: 'Dedicated account manager', enabled: true },
    ],
  },
];

const DEFAULT_PROMPT =
  'Describe your cartoon character, scene, or action... (e.g., "A cyberpunk kitten exploring a neon marketplace, vibrant colors, soft lighting")';

const CARD_VARIATION_POOL = [...GENERATION_LIBRARY, ...GALLERY_LIBRARY];

function getInitialView() {
  if (typeof window === 'undefined') {
    return 'home';
  }

  const hash = window.location.hash.replace('#', '');
  return NAV_ITEMS.some((item) => item.id === hash) ? hash : 'home';
}

function titleizePrompt(prompt) {
  const cleanPrompt = prompt.trim().replace(/\s+/g, ' ');

  if (!cleanPrompt) {
    return 'Studio Creation';
  }

  return cleanPrompt
    .split(' ')
    .slice(0, 3)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function getAspectClass(aspect) {
  switch (aspect) {
    case '1/1':
      return 'aspect-square';
    case '3/4':
      return 'aspect-[3/4]';
    default:
      return 'aspect-[4/5]';
  }
}

function normalizeCardFamily(card) {
  if (card.category) {
    return card.category;
  }

  if (card.style === 'Pixar' || card.style === '3D Cartoon') {
    return '3D Pixar';
  }

  if (card.style === 'Sketch') {
    return 'Pencil Sketch';
  }

  if (card.style === 'Comic') {
    return 'Cyberpunk';
  }

  return card.style;
}

function getNextCardVariant(card) {
  const family = normalizeCardFamily(card);
  const variants = CARD_VARIATION_POOL.filter((candidate) => normalizeCardFamily(candidate) === family);

  if (!variants.length) {
    return card;
  }

  const currentIndex = variants.findIndex((candidate) => candidate.image === card.image);
  const nextVariant = variants[(currentIndex + 1 + variants.length) % variants.length] || variants[0];

  return {
    ...card,
    image: nextVariant.image,
    aspect: nextVariant.aspect || card.aspect,
  };
}

function sanitizeFilename(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function getExtensionFromMimeType(type) {
  const normalized = type?.toLowerCase() || '';

  if (normalized.includes('png')) return 'png';
  if (normalized.includes('webp')) return 'webp';
  if (normalized.includes('gif')) return 'gif';
  if (normalized.includes('bmp')) return 'bmp';
  if (normalized.includes('svg')) return 'svg';
  if (normalized.includes('jpeg') || normalized.includes('jpg')) return 'jpg';

  return 'jpg';
}

function triggerDownload(url, filename) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
}

async function downloadImageToDevice(imageUrl, title) {
  const safeBaseName = sanitizeFilename(title || 'ai-cartoon') || 'ai-cartoon';

  try {
    const response = await fetch(imageUrl, { mode: 'cors' });

    if (!response.ok) {
      throw new Error('Download request failed');
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const extension = getExtensionFromMimeType(blob.type);

    triggerDownload(objectUrl, `${safeBaseName}.${extension}`);
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
    return true;
  } catch (error) {
    const extension = getExtensionFromMimeType('');
    triggerDownload(imageUrl, `${safeBaseName}.${extension}`);
    return false;
  }
}

function MaterialIcon({ name, className = '', fill = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      style={
        fill
          ? {
              fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24",
            }
          : undefined
      }
    >
      {name}
    </span>
  );
}

function CardActionButton({
  icon: Icon,
  label,
  onClick,
  tone = 'neutral',
  active = false,
  loading = false,
}) {
  const toneClasses = {
    download: active
      ? 'border-primary/60 bg-primary text-on-primary shadow-lg shadow-primary/25'
      : 'border-white/12 bg-white/12 text-white hover:border-primary/40 hover:bg-primary/85',
    refresh: active
      ? 'border-secondary/60 bg-secondary text-on-secondary shadow-lg shadow-secondary/20'
      : 'border-white/12 bg-surface/45 text-white hover:border-secondary/40 hover:bg-secondary/80',
    favorite: active
      ? 'border-tertiary/60 bg-tertiary text-on-tertiary shadow-lg shadow-tertiary/25'
      : 'border-white/12 bg-white/12 text-white hover:border-tertiary/40 hover:bg-tertiary/80',
    neutral: 'border-white/12 bg-white/12 text-white hover:border-primary/40 hover:bg-primary/85',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2.5 text-[0.8rem] font-semibold tracking-tight backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 ${toneClasses[tone]}`}
    >
      <Icon
        className={`h-4 w-4 ${loading ? 'animate-spin' : ''} ${active && tone === 'favorite' ? 'fill-current' : ''}`}
        strokeWidth={2.1}
      />
      <span className="leading-none">{label}</span>
    </button>
  );
}

function StudioSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value) ?? options[0];

  useEffect(() => {
    function handleOutsidePointer(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleOutsidePointer);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutsidePointer);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`studio-select-trigger group w-full text-left ${open ? 'studio-select-trigger--open' : ''}`}
      >
        <span className="relative flex items-center justify-between gap-3">
          <span className="min-w-0 pr-2">
            <span className="studio-select-trigger__value">
              {selectedOption.value}
            </span>
            <span className="studio-select-trigger__hint">
              {selectedOption.hint}
            </span>
          </span>

          <span className={`studio-select-caret ${open ? 'studio-select-caret--open' : ''}`}>
            <ChevronDown className="h-4.5 w-4.5" strokeWidth={2.3} />
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-[calc(100%+0.7rem)] z-30 overflow-hidden rounded-[1.55rem] border border-white/12 bg-[linear-gradient(180deg,rgba(40,36,52,0.96),rgba(28,25,36,0.94))] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.38),0_0_40px_rgba(205,189,255,0.12)] backdrop-blur-2xl"
          >
            <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="mb-1 px-3 pt-2 text-[0.62rem] font-bold uppercase tracking-[0.24em] text-tertiary/90">
              Render Quality
            </div>

            <div className="space-y-1">
              {options.map((option) => {
                const active = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`group flex w-full items-center justify-between rounded-[1.15rem] px-3.5 py-3 text-left transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-primary/26 via-primary/14 to-secondary/12 text-white shadow-[0_12px_28px_rgba(205,189,255,0.16)]'
                        : 'text-on-surface-variant hover:bg-white/7 hover:text-white hover:shadow-[0_10px_24px_rgba(255,255,255,0.04)]'
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold">{option.value}</span>
                      <span
                        className={`mt-1 block truncate text-[0.72rem] ${
                          active
                            ? 'text-white/72'
                            : 'text-on-surface-variant/55 group-hover:text-white/62'
                        }`}
                      >
                        {option.hint}
                      </span>
                    </span>

                    <span
                      className={`ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                        active
                          ? 'border-primary/38 bg-primary/16 text-primary'
                          : 'border-white/8 bg-white/5 text-transparent group-hover:border-white/15 group-hover:text-white/60'
                      }`}
                    >
                      <Check className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function TopNavigation({ activeView, navigate }) {
  return (
        <nav className="top-header-glass fixed inset-x-0 top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:px-8">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="top-brand"
            >
              <span className="top-brand-mark" aria-hidden="true">
                <video
                  className="top-brand-mark-video"
                  src="/brand-icon-live.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                />
              </span>
              <span className="top-brand-title">AI Cartoon Generator</span>
            </button>

          <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeView;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id)}
                className={`top-nav-link font-headline text-sm font-semibold tracking-tight ${
                  isActive ? 'top-nav-link--active' : ''
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button type="button" className="top-nav-ghost text-sm font-semibold">
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate('pricing')}
            className="top-nav-cta rounded-full px-5 py-2 text-sm font-bold"
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

function HomeView({ navigate }) {
  return (
    <main className="overflow-hidden pt-24">
      <section className="hero-gradient relative flex min-h-[860px] flex-col items-center justify-center px-6 pb-14 md:min-h-[920px]">
        <div className="relative z-10 max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-outline-variant/20 bg-surface-container-highest/50 px-4 py-1.5">
            <Sparkles className="h-[1.05rem] w-[1.05rem] text-tertiary" strokeWidth={2.2} />
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-tertiary">
              v2.0 Beta Now Live
            </span>
          </div>

          <h1 className="text-glow font-headline text-5xl font-black leading-[0.9] tracking-[-0.06em] text-on-surface md:text-7xl lg:text-8xl">
            Turn Your Ideas <br />
            <span className="text-gradient">into AI-Generated</span> <br />
            Cartoons
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-base font-medium leading-relaxed text-on-surface-variant md:text-xl">
            The world&apos;s most advanced generative engine for character design.
            Professional cartooning for creators, studios, and dreamers.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => navigate('generate')}
              className="btn-glow flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-container px-10 py-5 text-lg font-black text-on-primary transition-all hover:scale-105 active:scale-95 sm:w-auto"
            >
              Generate Now
              <Rocket className="h-5 w-5" strokeWidth={2.3} />
            </button>

            <button
              type="button"
              onClick={() => navigate('gallery')}
              className="glass-panel flex w-full items-center justify-center gap-3 rounded-full px-10 py-5 text-lg font-bold text-on-surface transition-colors hover:bg-surface-container-high sm:w-auto"
            >
              View Gallery
              <Compass className="h-5 w-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <div className="relative mt-16 h-[320px] w-full max-w-6xl md:mt-20 md:h-[420px]">
          <div className="absolute left-0 top-4 z-20 h-60 w-40 rotate-[-6deg] overflow-hidden rounded-[2rem] shadow-2xl md:left-10 md:h-80 md:w-56">
            <img src={HERO_IMAGES.fox} alt="Cyber fox illustration" className="h-full w-full object-cover" />
          </div>

          <div className="absolute left-1/2 top-0 z-30 h-72 w-48 -translate-x-1/2 overflow-hidden rounded-[2rem] border-4 border-surface shadow-2xl md:h-96 md:w-64">
            <img src={HERO_IMAGES.luna} alt="Luna scout illustration" className="h-full w-full object-cover" />
            <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-surface shadow-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-primary-container" />
              Luna Scout
            </div>
          </div>

          <div className="absolute right-0 top-8 z-10 h-56 w-36 rotate-[8deg] overflow-hidden rounded-[2rem] bg-surface-container-low shadow-2xl md:right-14 md:h-72 md:w-52">
            <img src={HERO_IMAGES.island} alt="Floating island artwork" className="h-full w-full object-cover" />
          </div>

          <div className="absolute left-1/2 top-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] md:h-[460px] md:w-[460px]" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:py-28">
        <div className="mb-16 flex flex-col gap-8 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-tertiary">Precision Tools</p>
            <h2 className="font-headline text-4xl font-black leading-none tracking-[-0.04em] text-on-surface md:text-5xl">
              The Next Generation of <br />
              Character Design
            </h2>
          </div>

          <p className="max-w-sm text-base font-medium leading-relaxed text-on-surface-variant md:text-lg">
            Move beyond simple prompts with advanced style control and multi-pass rendering.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="glass-panel rounded-xl p-10 transition-colors hover:bg-surface-container-high/60 md:col-span-2">
            <div className="flex flex-col items-start gap-10 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.75rem] bg-primary/10 text-primary">
                  <Sparkles className="h-7 w-7" strokeWidth={2.15} />
                </div>
                <h3 className="text-2xl font-bold text-on-surface">AI-powered generation</h3>
                <p className="leading-relaxed text-on-surface-variant">
                  Our proprietary neural network understands complex anatomy and facial expressions,
                  creating characters that feel alive and consistent.
                </p>
                <button
                  type="button"
                  onClick={() => navigate('generate')}
                  className="group inline-flex items-center gap-2 pt-4 font-bold text-secondary transition-all hover:gap-4"
                >
                  Learn about the Engine
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.3} />
                </button>
              </div>

              <div className="h-64 w-full overflow-hidden rounded-[1.5rem] bg-surface-container-lowest md:w-64">
                <img src={HERO_IMAGES.engine} alt="Abstract engine texture" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-10 transition-colors hover:bg-surface-container-high/60">
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.75rem] bg-secondary/10 text-secondary">
                <Palette className="h-7 w-7" strokeWidth={2.1} />
              </div>
              <h3 className="text-2xl font-bold text-on-surface">Multiple styles</h3>
              <p className="leading-relaxed text-on-surface-variant">
                From Japanese Anime to 3D Pixar-style renders and classic hand-drawn aesthetics.
                Switch styles in a single click.
              </p>
            </div>

            <div className="mt-8 flex gap-2">
              <div className="h-1 w-full overflow-hidden rounded-full bg-secondary/20">
                <div className="h-full w-1/2 rounded-full bg-secondary" />
              </div>
              <div className="h-1 w-full rounded-full bg-secondary/20" />
            </div>
          </div>

          <div className="glass-panel rounded-xl p-10 transition-colors hover:bg-surface-container-high/60">
            <div className="space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.75rem] bg-tertiary/10 text-tertiary">
                <Zap className="h-7 w-7" strokeWidth={2.1} />
              </div>
              <h3 className="text-2xl font-bold text-on-surface">Fast rendering</h3>
              <p className="leading-relaxed text-on-surface-variant">
                Don&apos;t wait hours. Generate high-resolution, production-ready assets in under 30
                seconds with our high-speed GPU clusters.
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <span className="text-4xl font-black text-on-surface-variant/40">30s</span>
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-xl transition-colors hover:bg-surface-container-high/60 md:col-span-2">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-1 flex-col justify-center space-y-4 p-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.75rem] bg-white/5 text-on-surface">
                  <Upload className="h-7 w-7" strokeWidth={2.15} />
                </div>
                <h3 className="text-2xl font-bold text-on-surface">Import &amp; Evolve</h3>
                <p className="leading-relaxed text-on-surface-variant">
                  Upload your sketches or photos and watch as our AI transforms them into stylized
                  characters while maintaining the soul of your original idea.
                </p>
              </div>

              <div className="h-64 flex-1 md:h-auto">
                <img src={HERO_IMAGES.evolve} alt="Import and evolve abstract artwork" className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl bg-gradient-to-br from-primary-container/40 to-surface-container-highest/20 px-8 py-14 text-center md:px-24 md:py-24">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/20 blur-[80px]" />

          <div className="relative z-10">
            <h2 className="font-headline text-4xl font-black leading-none tracking-[-0.05em] text-on-surface md:text-6xl">
              Ready to animate <br />
              your imagination?
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-on-surface-variant">
              Join over 500,000 artists creating the next generation of digital media with our AI
              suite.
            </p>
            <button
              type="button"
              onClick={() => navigate('generate')}
              className="mt-10 rounded-full bg-primary px-10 py-4 text-base font-black text-on-primary transition-all hover:scale-105 active:scale-95"
            >
              Start Creating Now
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function GenerateView({
  prompt,
  setPrompt,
  selectedStyle,
  setSelectedStyle,
  selectedAspect,
  setSelectedAspect,
  selectedQuality,
  setSelectedQuality,
  guidanceScale,
  setGuidanceScale,
  seed,
  setSeed,
  generationCards,
  creationViewMode,
  setCreationViewMode,
  favoriteCardIds,
  downloadingCardId,
  downloadedCardId,
  refreshingCardId,
  isGenerating,
  onGenerate,
  onDownloadCard,
  onRefreshCard,
  onToggleFavorite,
}) {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-8 md:pb-32">
      <header className="mb-16 text-center md:text-left">
        <h1 className="font-headline text-5xl font-extrabold leading-[0.9] tracking-[-0.06em] text-primary md:text-7xl">
          Unleash Your <br />
          Imagination
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-on-surface-variant">
          Transform your thoughts into stunning animated styles with our high-end neural engine.
          Creative control at your fingertips.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
        <div className="space-y-8 lg:col-span-5">
          <div className="rounded-xl bg-surface-container p-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-bold uppercase tracking-[0.2em] text-tertiary">
                  The Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  className="h-40 w-full resize-none rounded-[1.75rem] border-none bg-surface-container-lowest p-5 text-lg text-on-surface placeholder:text-on-surface-variant/30 focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold uppercase tracking-[0.2em] text-tertiary">
                  Visual Style
                </label>
                <div className="flex flex-wrap gap-2">
                  {STYLE_OPTIONS.map((style) => {
                    const active = style === selectedStyle;

                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => setSelectedStyle(style)}
                        className={`rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                          active
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-highest text-on-surface-variant hover:bg-primary/20'
                        }`}
                      >
                        {style}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="block text-sm font-bold uppercase tracking-[0.2em] text-tertiary">
                    Aspect Ratio
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {ASPECT_OPTIONS.map((ratio) => {
                      const active = ratio === selectedAspect;

                      return (
                        <button
                          key={ratio}
                          type="button"
                          onClick={() => setSelectedAspect(ratio)}
                          className={`aspect-square rounded bg-surface-container-highest text-xs font-bold transition-colors ${
                            active
                              ? 'border-2 border-primary text-on-surface'
                              : 'border-2 border-transparent text-on-surface-variant hover:bg-primary/20'
                          }`}
                        >
                          {ratio}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-bold uppercase tracking-[0.2em] text-tertiary">
                    Quality
                  </label>
                  <StudioSelect
                    value={selectedQuality}
                    onChange={setSelectedQuality}
                    options={QUALITY_OPTIONS}
                  />
                </div>
              </div>

              <details className="group">
                <summary className="cursor-pointer list-none py-2 text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-primary">
                  <span>Advanced Settings</span>
                </summary>

                <div className="mt-2 space-y-4 border-t border-outline-variant/15 pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Guidance Scale</span>
                      <span className="text-primary">{guidanceScale.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.1"
                      value={guidanceScale}
                      onChange={(event) => setGuidanceScale(Number(event.target.value))}
                      className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-surface-container-lowest accent-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Seed</span>
                      <span className="text-secondary">{seed || 'Random'}</span>
                    </div>
                    <input
                      type="text"
                      value={seed}
                      onChange={(event) => setSeed(event.target.value)}
                      placeholder="Enter custom seed..."
                      className="w-full rounded-lg border-none bg-surface-container-lowest p-2 text-xs text-on-surface placeholder:text-on-surface-variant/40 focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
              </details>
            </div>
          </div>

          <button
            type="button"
            onClick={onGenerate}
            disabled={isGenerating}
            className="btn-glow flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary-container py-6 font-headline text-[1.08rem] font-black uppercase tracking-[0.18em] text-on-primary transition-all hover:scale-[1.02] active:scale-95 disabled:cursor-progress disabled:opacity-80 sm:text-[1.18rem]"
          >
            <Sparkles className={`h-5 w-5 shrink-0 ${isGenerating ? 'animate-pulse' : ''}`} strokeWidth={2.35} />
            <span className="whitespace-nowrap">{isGenerating ? 'Generating...' : 'Generate Art'}</span>
          </button>
        </div>

        <div className="space-y-12 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-outline-variant/15 pb-4">
            <h2 className="text-2xl font-bold text-on-surface">Your Creations</h2>
            <div className="flex gap-2">
              {CREATION_VIEW_OPTIONS.map(({ id, label, icon: Icon }) => {
                const active = creationViewMode === id;

                return (
                  <button
                    key={id}
                    type="button"
                    aria-label={`${label} view`}
                    aria-pressed={active}
                    onClick={() => setCreationViewMode(id)}
                    className={`studio-view-toggle ${active ? 'studio-view-toggle--active' : ''}`}
                  >
                    <Icon className="studio-view-toggle__icon" strokeWidth={2.2} />
                    <span className="studio-view-toggle__label">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`grid grid-cols-1 gap-8 ${creationViewMode === 'grid' ? 'md:grid-cols-2' : ''}`}>
            {generationCards.map((card) => (
              <div
                key={card.id}
                className={`group relative overflow-hidden rounded-[2rem] bg-surface-container shadow-xl ${getAspectClass(
                  card.aspect,
                )}`}
              >
                <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />

                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-surface/90 via-transparent to-transparent p-6 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">{card.style}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                      <CardActionButton
                        icon={downloadedCardId === card.id ? Check : Download}
                        label={downloadedCardId === card.id ? 'Saved' : 'Download'}
                        tone="download"
                        active={downloadedCardId === card.id}
                        loading={downloadingCardId === card.id}
                        onClick={() => onDownloadCard(card)}
                      />
                      <CardActionButton
                        icon={RefreshCw}
                        label="Refresh"
                        tone="refresh"
                        active={refreshingCardId === card.id}
                        loading={refreshingCardId === card.id}
                        onClick={() => onRefreshCard(card.id)}
                      />
                    </div>

                    <CardActionButton
                      icon={Heart}
                      label={favoriteCardIds.includes(card.id) ? 'Favorited' : 'Favorite'}
                      tone="favorite"
                      active={favoriteCardIds.includes(card.id)}
                      onClick={() => onToggleFavorite(card.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function GalleryView({
  galleryFilter,
  setGalleryFilter,
  galleryCards,
  favoriteCardIds,
  downloadingCardId,
  downloadedCardId,
  navigate,
  onDownloadCard,
}) {
  const filteredCards =
    galleryFilter === 'All Styles'
      ? galleryCards
      : galleryCards.filter((card) => card.category === galleryFilter);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:px-8">
      <header className="mb-20 max-w-3xl text-center md:text-left">
        <span className="inline-block rounded-full bg-surface-container-high px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-tertiary">
          Inspiration Gallery
        </span>
        <h1 className="mt-6 font-headline text-5xl font-extrabold leading-[0.95] tracking-[-0.06em] md:text-7xl">
          The Lucid <span className="text-gradient">Art Gallery</span>
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-on-surface-variant">
          Explore a curated collection of AI-generated masterpieces. From whimsical sketches to
          hyper-realistic 3D renders, witness the infinite creativity of our generative engines.
        </p>
      </header>

      <section className="mb-16">
        <div className="flex flex-wrap items-center gap-4">
          {GALLERY_FILTERS.map((filter) => {
            const active = filter === galleryFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setGalleryFilter(filter)}
                className={`rounded-full px-8 py-3 font-headline text-sm font-semibold transition-all ${
                  active
                    ? 'bg-primary text-on-primary shadow-lg shadow-primary/10'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                }`}
              >
                {filter}
              </button>
            );
          })}

            <div className="ml-auto flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant/50">
                Sort By
              </span>
              <button type="button" className="flex items-center gap-2 font-headline font-semibold text-on-surface">
                <span>Latest</span>
                <ChevronDown className="h-4 w-4 text-primary" strokeWidth={2.4} />
              </button>
            </div>
        </div>
      </section>

      <div className="gallery-grid">
        {filteredCards.map((card) => (
          <div
            key={card.id}
            className="group relative overflow-hidden rounded-xl bg-surface-container-low transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_48px_rgba(205,189,255,0.1)]"
          >
            <div className={`${getAspectClass(card.aspect)} overflow-hidden`}>
              <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>

            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-surface via-transparent to-transparent p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">{card.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                    {card.category}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {favoriteCardIds.includes(card.id) ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-tertiary/40 bg-tertiary/85 px-3 py-2 text-[0.72rem] font-semibold text-on-tertiary backdrop-blur-xl">
                      <Heart className="h-3.5 w-3.5 fill-current" strokeWidth={2.2} />
                      Saved
                    </span>
                  ) : null}

                  <CardActionButton
                    icon={downloadedCardId === card.id ? Check : Download}
                    label={downloadedCardId === card.id ? 'Saved' : 'Download'}
                    tone="download"
                    active={downloadedCardId === card.id}
                    loading={downloadingCardId === card.id}
                    onClick={() => onDownloadCard(card)}
                  />
                </div>
              </div>
            </div>

            {card.id === 'bot-explorer' ? (
              <button
                type="button"
                onClick={() => navigate('generate')}
                className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-gradient-to-r from-primary via-primary-container to-primary-container px-6 py-3 font-headline text-xs font-black uppercase tracking-[0.2em] text-on-primary shadow-orb transition-transform hover:scale-105"
              >
                <Sparkles className="h-4 w-4" strokeWidth={2.25} />
                Create New Art
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {filteredCards.length === 0 ? (
        <div className="mt-16 rounded-xl bg-surface-container-low px-8 py-10 text-center">
          <p className="text-lg font-semibold text-on-surface">No pieces match that filter yet.</p>
          <p className="mt-2 text-on-surface-variant">
            Generate something new and it will appear here with the selected style.
          </p>
        </div>
      ) : null}

      <div className="mt-20 flex flex-col items-center">
        <button
          type="button"
          onClick={() => navigate('generate')}
          className="flex items-center gap-4 rounded-full border border-outline-variant/10 bg-surface-container p-1 pl-8 transition-all hover:border-primary/50"
        >
          <span className="font-headline font-bold text-on-surface">Discover More Masterpieces</span>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-on-primary transition-transform hover:translate-x-1">
            <ArrowRight className="h-5 w-5" strokeWidth={2.3} />
          </span>
        </button>
      </div>
    </main>
  );
}

function PricingView({ navigate }) {
  return (
    <main className="px-6 pb-20 pt-32">
      <section className="mx-auto mb-20 max-w-4xl text-center">
        <span className="mb-4 block text-sm font-bold uppercase tracking-[0.2em] text-tertiary">
          Pricing Plans
        </span>
        <h1 className="font-headline text-5xl font-black leading-none tracking-[-0.06em] text-on-surface md:text-7xl">
          Choose your <span className="text-primary italic">creative</span> power.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
          From hobbyists to professional studios, our generative AI scales with your imagination.
          Unlock higher resolutions and unlimited styles.
        </p>
      </section>

      <section className="mx-auto mb-24 grid max-w-7xl grid-cols-1 gap-8 md:mb-32 md:grid-cols-3 md:items-end">
        {PRICING_PLANS.map((plan) => {
          const isPopular = Boolean(plan.popular);

          return (
            <div
              key={plan.name}
              className={`glass-panel relative flex h-full flex-col rounded-xl p-10 ${
                isPopular ? 'bg-surface-container-high/60 shadow-panel-glow' : ''
              }`}
            >
              {isPopular ? (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-tertiary px-4 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-on-tertiary">
                  Most Popular
                </div>
              ) : null}

              <div className="mb-8">
                <h3 className={`text-2xl font-bold ${isPopular ? 'text-3xl text-primary' : 'text-on-surface'}`}>
                  {plan.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className={`font-black ${isPopular ? 'text-5xl' : 'text-4xl'}`}>{plan.price}</span>
                  <span className="font-medium text-on-surface-variant/60">/mo</span>
                </div>
              </div>

              <div className="mb-10 flex-grow space-y-5">
                {plan.features.map((feature) => (
                  <div
                    key={feature.label}
                    className={`flex items-center gap-3 ${
                      feature.enabled ? (isPopular ? 'text-on-surface' : 'text-on-surface-variant') : 'text-on-surface-variant/35'
                    }`}
                  >
                    <MaterialIcon
                      name={feature.enabled ? feature.icon || 'check_circle' : 'block'}
                      fill={feature.fill}
                      className={`${feature.enabled ? (isPopular ? 'text-primary' : 'text-secondary') : ''} text-lg`}
                    />
                    <span className={isPopular ? 'font-medium' : ''}>{feature.label}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => navigate('generate')}
                className={`w-full rounded-full py-4 font-headline font-bold transition-all ${
                  isPopular
                    ? 'bg-gradient-to-r from-primary to-secondary-container text-on-primary hover:scale-[1.02] active:scale-95'
                    : 'border border-outline-variant text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          );
        })}
      </section>

      <section className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-xl bg-surface-container-low px-8 py-14 text-center md:px-20 md:py-20">
          <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]" />

          <div className="relative z-10">
            <h2 className="font-headline text-4xl font-black leading-none tracking-[-0.05em] md:text-6xl">
              Ready to transform your ideas?
            </h2>
            <button
              type="button"
              onClick={() => navigate('generate')}
              className="mt-10 rounded-full bg-primary px-10 py-5 font-headline text-xl font-black text-on-primary transition-all hover:bg-primary-fixed-dim"
            >
              Start Creating Now
            </button>
            <p className="mt-8 text-sm font-medium text-on-surface-variant/60">
              Join 50,000+ creators worldwide.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer({ view, navigate }) {
  if (view === 'pricing') {
    return (
      <footer className="px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 border-t border-white/10 pt-8 md:flex-row md:items-end">
          <div className="max-w-xs text-center md:text-left">
            <button type="button" onClick={() => navigate('home')} className="font-headline text-lg font-black text-primary">
              AI Cartoon Generator
            </button>
            <p className="mt-3 text-sm leading-relaxed text-on-surface-variant/50">
              Elevating digital art through the power of generative intelligence and editorial
              design.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-end">
            <div className="flex flex-wrap justify-center gap-6 text-sm text-on-surface-variant/50">
              {FOOTER_LINKS.slice(0, 3).map((link) => (
                <button key={link} type="button" className="transition-colors hover:text-secondary">
                  {link}
                </button>
              ))}
            </div>
            <div className="flex gap-6 text-sm text-on-surface-variant/50">
              {FOOTER_LINKS.slice(3).map((link) => (
                <button key={link} type="button" className="transition-colors hover:text-primary">
                  {link}
                </button>
              ))}
            </div>
            <p className="text-sm text-on-surface-variant/50">© 2024 AI Cartoon Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }

  if (view === 'generate') {
    return (
      <footer className="px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <button type="button" onClick={() => navigate('home')} className="font-headline text-lg font-black text-primary">
            AI Cartoon Generator
          </button>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-on-surface-variant/50">
            {FOOTER_LINKS.map((link) => (
              <button key={link} type="button" className="transition-colors hover:text-secondary">
                {link}
              </button>
            ))}
          </div>
          <p className="text-sm text-on-surface-variant/50">© 2024 AI Cartoon Generator. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 border-t border-white/10 pt-8 md:flex-row">
        <div className="text-center md:text-left">
          <button type="button" onClick={() => navigate('home')} className="font-headline text-lg font-black text-primary">
            AI Cartoon Generator
          </button>
          <p className="mt-2 text-sm text-on-surface-variant/50">© 2024 AI Cartoon Generator. All rights reserved.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-on-surface-variant/50">
          {FOOTER_LINKS.map((link) => (
            <button key={link} type="button" className="transition-colors hover:text-secondary">
              {link}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

function FloatingAction({ activeView, navigate }) {
  if (activeView === 'home') {
    return (
      <div className="fixed bottom-8 left-1/2 z-40 -translate-x-1/2">
        <button
          type="button"
          onClick={() => navigate('generate')}
          className="flex items-center gap-4 rounded-full bg-gradient-to-r from-primary via-primary-container to-primary-container px-8 py-4 font-headline text-lg font-black text-on-primary shadow-orb transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-5 w-5" strokeWidth={2.25} />
          <span>Generate New Art</span>
        </button>
      </div>
    );
  }

  if (activeView === 'gallery') {
    return (
      <div className="fixed bottom-10 left-1/2 z-40 hidden -translate-x-1/2 md:block">
        <button
          type="button"
          onClick={() => navigate('generate')}
          className="flex items-center gap-4 rounded-full bg-gradient-to-r from-primary via-primary-container to-primary-container px-8 py-4 font-headline text-lg font-black text-on-primary shadow-orb transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-5 w-5" strokeWidth={2.25} />
          <span>Generate New Art</span>
        </button>
      </div>
    );
  }

  if (activeView === 'generate') {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/10 bg-surface/80 backdrop-blur-xl md:hidden">
        <div className="flex items-center justify-around p-4">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-on-surface-variant/70"
          >
            <House className="h-4 w-4" strokeWidth={2.25} />
            <span>Home</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('generate')}
            className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-primary"
          >
            <Sparkles className="h-4 w-4" strokeWidth={2.25} />
            <span>Generate</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('gallery')}
            className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-on-surface-variant/70"
          >
            <Images className="h-4 w-4" strokeWidth={2.15} />
            <span>Gallery</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('pricing')}
            className="flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-tight text-on-surface-variant/70"
          >
            <User className="h-4 w-4" strokeWidth={2.2} />
            <span>Profile</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function HomePage() {
  const [activeView, setActiveView] = useState(getInitialView);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [selectedStyle, setSelectedStyle] = useState('Anime');
  const [selectedAspect, setSelectedAspect] = useState('1:1');
  const [selectedQuality, setSelectedQuality] = useState('Standard');
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [seed, setSeed] = useState('');
  const [generationCards, setGenerationCards] = useState(GENERATION_LIBRARY);
  const [creationViewMode, setCreationViewMode] = useState('grid');
  const [galleryCards, setGalleryCards] = useState(GALLERY_LIBRARY);
  const [galleryFilter, setGalleryFilter] = useState('All Styles');
  const [favoriteCardIds, setFavoriteCardIds] = useState([]);
  const [downloadingCardId, setDownloadingCardId] = useState(null);
  const [downloadedCardId, setDownloadedCardId] = useState(null);
  const [refreshingCardId, setRefreshingCardId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const generationTimeoutRef = useRef(null);
  const generationCounterRef = useRef(0);
  const downloadedResetRef = useRef(null);
  const refreshingResetRef = useRef(null);

  useEffect(() => {
    function handleHashChange() {
      setActiveView(getInitialView());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (!window.location.hash) {
      window.history.replaceState(null, '', '#home');
    }

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);

      if (generationTimeoutRef.current) {
        window.clearTimeout(generationTimeoutRef.current);
      }

      if (downloadedResetRef.current) {
        window.clearTimeout(downloadedResetRef.current);
      }

      if (refreshingResetRef.current) {
        window.clearTimeout(refreshingResetRef.current);
      }
    };
  }, []);

  function navigate(view) {
    setActiveView(view);

    if (window.location.hash !== `#${view}`) {
      window.location.hash = view;
    }

    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function handleGenerate() {
    if (generationTimeoutRef.current) {
      window.clearTimeout(generationTimeoutRef.current);
    }

    setIsGenerating(true);

    generationTimeoutRef.current = window.setTimeout(() => {
      const matchingTemplates = GENERATION_LIBRARY.filter(
        (card) =>
          card.style === selectedStyle ||
          (selectedStyle === 'Pixar' && card.category === '3D Pixar') ||
          (selectedStyle === '3D Cartoon' && card.category === '3D Pixar'),
      );
      const pool = matchingTemplates.length ? matchingTemplates : GENERATION_LIBRARY;
      const template = pool[generationCounterRef.current % pool.length];
      const generatedCard = {
        ...template,
        id: `${template.id}-${Date.now()}`,
        title: titleizePrompt(prompt),
        style: selectedStyle,
        category:
          selectedStyle === 'Sketch'
            ? 'Pencil Sketch'
            : selectedStyle === 'Pixar' || selectedStyle === '3D Cartoon'
              ? '3D Pixar'
              : selectedStyle === 'Comic'
                ? 'Cyberpunk'
                : selectedStyle,
      };

      generationCounterRef.current += 1;

      setGenerationCards((currentCards) => [generatedCard, ...currentCards].slice(0, 4));
      setGalleryCards((currentCards) => [generatedCard, ...currentCards].slice(0, 9));
      setGalleryFilter('All Styles');
      setIsGenerating(false);
    }, 900);
  }

  function toggleFavorite(cardId) {
    setFavoriteCardIds((currentIds) =>
      currentIds.includes(cardId)
        ? currentIds.filter((id) => id !== cardId)
        : [...currentIds, cardId],
    );
  }

  async function handleDownloadCard(card) {
    setDownloadingCardId(card.id);
    await downloadImageToDevice(card.image, card.title);
    setDownloadingCardId(null);
    setDownloadedCardId(card.id);

    if (downloadedResetRef.current) {
      window.clearTimeout(downloadedResetRef.current);
    }

    downloadedResetRef.current = window.setTimeout(() => {
      setDownloadedCardId(null);
    }, 1800);
  }

  function handleRefreshCard(cardId) {
    setRefreshingCardId(cardId);

    setGenerationCards((currentCards) =>
      currentCards.map((card) => (card.id === cardId ? getNextCardVariant(card) : card)),
    );
    setGalleryCards((currentCards) =>
      currentCards.map((card) => (card.id === cardId ? getNextCardVariant(card) : card)),
    );

    if (refreshingResetRef.current) {
      window.clearTimeout(refreshingResetRef.current);
    }

    refreshingResetRef.current = window.setTimeout(() => {
      setRefreshingCardId(null);
    }, 550);
  }

  return (
    <div className="page-shell pb-24 md:pb-0">
      <TopNavigation activeView={activeView} navigate={navigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="page-fade"
        >
          {activeView === 'home' ? <HomeView navigate={navigate} /> : null}

          {activeView === 'generate' ? (
            <GenerateView
              prompt={prompt}
              setPrompt={setPrompt}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              selectedAspect={selectedAspect}
              setSelectedAspect={setSelectedAspect}
              selectedQuality={selectedQuality}
              setSelectedQuality={setSelectedQuality}
              guidanceScale={guidanceScale}
              setGuidanceScale={setGuidanceScale}
              seed={seed}
              setSeed={setSeed}
              generationCards={generationCards}
              creationViewMode={creationViewMode}
              setCreationViewMode={setCreationViewMode}
              favoriteCardIds={favoriteCardIds}
              downloadingCardId={downloadingCardId}
              downloadedCardId={downloadedCardId}
              refreshingCardId={refreshingCardId}
              isGenerating={isGenerating}
              onGenerate={handleGenerate}
              onDownloadCard={handleDownloadCard}
              onRefreshCard={handleRefreshCard}
              onToggleFavorite={toggleFavorite}
            />
          ) : null}

          {activeView === 'gallery' ? (
            <GalleryView
              galleryFilter={galleryFilter}
              setGalleryFilter={setGalleryFilter}
              galleryCards={galleryCards}
              favoriteCardIds={favoriteCardIds}
              downloadingCardId={downloadingCardId}
              downloadedCardId={downloadedCardId}
              navigate={navigate}
              onDownloadCard={handleDownloadCard}
            />
          ) : null}

          {activeView === 'pricing' ? <PricingView navigate={navigate} /> : null}

          <Footer view={activeView} navigate={navigate} />
        </motion.div>
      </AnimatePresence>

      <FloatingAction activeView={activeView} navigate={navigate} />
    </div>
  );
}

export default HomePage;
