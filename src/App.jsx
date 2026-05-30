import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

//About
import about1 from"./assets/about/about.webp";

//hero
import hero1 from "./assets/hero/hero1.webp";
import hero2 from "./assets/hero/hero2.webp";
import hero3 from "./assets/hero/hero3.webp";
import hero4 from "./assets/hero/hero4.webp";
import hero5 from "./assets/hero/hero5.webp";

//Activities
import activity1 from "./assets/activities/activity1.webp";
import activity2 from "./assets/activities/activity2.webp";
import activity3 from "./assets/activities/activity3.webp";
import activity4 from "./assets/activities/activity4.webp";
import activity5 from "./assets/activities/activity5.webp";
import activity6 from "./assets/activities/activity6.webp";
import activity7 from "./assets/activities/activity7.webp";
import activity8 from "./assets/activities/activity8.webp";

function IconBase({ children, className = "", size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {children}
    </svg>
  );
}

const PinIcon = (props) => (
  <IconBase {...props}>
    <path d="M12 21s7-4.5 7-11a7 7 0 0 0-14 0c0 6.5 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2" />
  </IconBase>
);

const PhoneIcon = (props) => (
  <IconBase {...props}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z" />
  </IconBase>
);

const MailIcon = (props) => (
  <IconBase {...props}>
    <path d="M4 5h16v14H4z" />
    <path d="m4 8 8 6 8-6" />
  </IconBase>
);

const LinkedInIcon = ({ size = 24 }) => (
  <span aria-hidden="true" className="pointer-events-none inline-flex items-center justify-center font-sans font-bold leading-none text-blue-600" style={{ width: size, height: size, fontSize: size * 0.98 }}>in</span>
);

const FacebookIcon = ({ size = 24 }) => (
  <span aria-hidden="true" className="pointer-events-none inline-flex items-center justify-center font-sans font-bold leading-none text-blue-600" style={{ width: size, height: size, fontSize: size * 0.95 }}>f</span>
);

function Logo({ footer = false }) {
  const textColor = footer ? "text-slate-800" : "text-white";
  const subColor = footer ? "text-slate-500" : "text-white";
  return (
    <div className="flex flex-col items-center text-center">
      <div className={`inline-flex items-end justify-center text-2xl font-light leading-none tracking-[0.34em] md:text-3xl ${textColor}`}>
        <span>UPSTRU<span className="text-[1.45em] leading-none text-blue-600">X</span></span>
      </div>
      <div className={`mt-1 text-[9px] font-light uppercase tracking-[0.48em] md:text-[10px] ${subColor}`}>WE ARE ENGINEERS</div>
    </div>
  );
}

const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/",
  facebook: "https://www.facebook.com/",
};

const LANGUAGE_CODES = ["bg", "en", "de"];
const DEFAULT_LANGUAGE = "en";
const LANGUAGE_ROUTE_PREFIXES = {
  en: "",
  bg: "/bg",
  de: "/de",
};
const SERVICE_PAGE_KEYS = Array.from({ length: 8 }, (_, index) => `service${index + 1}`);
const VALID_PAGES = ["home", "about", "solutions", "contact", "legal", "privacy", ...SERVICE_PAGE_KEYS];
const PAGE_ROUTES_BY_LANGUAGE = {
  en: {
    home: "/",
    about: "/about",
    competence: "/areas-of-competence",
    methodology: "/from-concept-to-delivery",
    solutions: "/solutions",
    contact: "/contact",
    legal: "/legal",
    privacy: "/privacy",
    service1: "/solutions/structural-assessments-diagnostics-in-situ-and-laboratory-testing",
    service2: "/solutions/architecture-and-structural-engineering",
    service3: "/solutions/wss-hydrotechnical-and-hydro-reclamation-engineering",
    service4: "/solutions/geotechnical-engineering-design",
    service5: "/solutions/transport-infrastructure-engineering-and-design",
    service6: "/solutions/geodesy-cadastre-gis-and-photogrammetry",
    service7: "/solutions/project-management-and-coordination",
    service8: "/solutions/pre-investment-studies-and-tender-planning",
  },
  bg: {
    home: "/",
    about: "/za-nas",
    competence: "/oblasti-na-kompetentnost",
    methodology: "/ot-kontseptsiyata-do-realizatsiya",
    solutions: "/resheniya",
    contact: "/kontakti",
    legal: "/pravno",
    privacy: "/poveritelnost",
    service1: "/resheniya/obsledvaniya-in-situ-i-laboratorni-izpitvaniya",
    service2: "/resheniya/arhitektura-i-proektirane-na-sgradi",
    service3: "/resheniya/vik-hidrotehnichesko-i-hidromeliorativno-proektirane",
    service4: "/resheniya/geotehnichesko-proektirane",
    service5: "/resheniya/proektirane-na-transportnata-infrastruktura",
    service6: "/resheniya/geodeziya-kadastar-gis-i-fotogrametriya",
    service7: "/resheniya/upravlenie-i-koordinatsiya-na-proekti",
    service8: "/resheniya/predinvestitsionni-prouchvaniya-i-ofertno-planirane",
  },
  de: {
    home: "/",
    about: "/uber-uns",
    competence: "/kompetenzbereiche",
    methodology: "/vom-konzept-bis-zur-umsetzung",
    solutions: "/losungen",
    contact: "/kontakt",
    legal: "/rechtliches",
    privacy: "/datenschutz",
    service1: "/losungen/bauwerksuntersuchungen-diagnostik-sowie-in-situ-und-laborprufungen",
    service2: "/losungen/architektur-und-tragwerksplanung",
    service3: "/losungen/wasserversorgungs-siedlungswasserwirtschafts-wasserbau-und-hydro-meliorationsplanung",
    service4: "/losungen/geotechnische-planung",
    service5: "/losungen/planung-von-verkehrsinfrastruktur",
    service6: "/losungen/geodasie-kataster-gis-und-photogrammetrie",
    service7: "/losungen/projektmanagement-und-projektkoordination",
    service8: "/losungen/vorinvestitionsstudien-und-ausschreibungsplanung",
  },
};
const PAGE_ROUTES = PAGE_ROUTES_BY_LANGUAGE.en;

const ROUTE_PAGES = {
  "/": { page: "home" },

  "/about": { page: "about", sectionId: "about" },
  "/areas-of-competence": { page: "about", sectionId: "competence" },
  "/from-concept-to-delivery": { page: "about", sectionId: "methodology" },
  "/solutions": { page: "solutions" },
  "/contact": { page: "contact" },
  "/legal": { page: "legal" },
  "/privacy": { page: "privacy" },

  "/za-nas": { page: "about", sectionId: "about" },
  "/oblasti-na-kompetentnost": { page: "about", sectionId: "competence" },
  "/ot-kontseptsiyata-do-realizatsiya": { page: "about", sectionId: "methodology" },
  "/resheniya": { page: "solutions" },
  "/kontakti": { page: "contact" },
  "/pravno": { page: "legal" },
  "/poveritelnost": { page: "privacy" },

  "/uber-uns": { page: "about", sectionId: "about" },
  "/kompetenzbereiche": { page: "about", sectionId: "competence" },
  "/vom-konzept-bis-zur-umsetzung": { page: "about", sectionId: "methodology" },
  "/losungen": { page: "solutions" },
  "/kontakt": { page: "contact" },
  "/rechtliches": { page: "legal" },
  "/datenschutz": { page: "privacy" },

  "/solutions/structural-assessments-diagnostics-in-situ-and-laboratory-testing": { page: "service1" },
  "/solutions/architecture-and-structural-engineering": { page: "service2" },
  "/solutions/wss-hydrotechnical-and-hydro-reclamation-engineering": { page: "service3" },
  "/solutions/geotechnical-engineering-design": { page: "service4" },
  "/solutions/transport-infrastructure-engineering-and-design": { page: "service5" },
  "/solutions/geodesy-cadastre-gis-and-photogrammetry": { page: "service6" },
  "/solutions/project-management-and-coordination": { page: "service7" },
  "/solutions/pre-investment-studies-and-tender-planning": { page: "service8" },

  "/resheniya/obsledvaniya-in-situ-i-laboratorni-izpitvaniya": { page: "service1" },
  "/resheniya/arhitektura-i-proektirane-na-sgradi": { page: "service2" },
  "/resheniya/vik-hidrotehnichesko-i-hidromeliorativno-proektirane": { page: "service3" },
  "/resheniya/geotehnichesko-proektirane": { page: "service4" },
  "/resheniya/proektirane-na-transportnata-infrastruktura": { page: "service5" },
  "/resheniya/geodeziya-kadastar-gis-i-fotogrametriya": { page: "service6" },
  "/resheniya/upravlenie-i-koordinatsiya-na-proekti": { page: "service7" },
  "/resheniya/predinvestitsionni-prouchvaniya-i-ofertno-planirane": { page: "service8" },

  "/losungen/bauwerksuntersuchungen-diagnostik-sowie-in-situ-und-laborprufungen": { page: "service1" },
  "/losungen/architektur-und-tragwerksplanung": { page: "service2" },
  "/losungen/wasserversorgungs-siedlungswasserwirtschafts-wasserbau-und-hydro-meliorationsplanung": { page: "service3" },
  "/losungen/geotechnische-planung": { page: "service4" },
  "/losungen/planung-von-verkehrsinfrastruktur": { page: "service5" },
  "/losungen/geodasie-kataster-gis-und-photogrammetrie": { page: "service6" },
  "/losungen/projektmanagement-und-projektkoordination": { page: "service7" },
  "/losungen/vorinvestitionsstudien-und-ausschreibungsplanung": { page: "service8" },
};

function normalizePath(pathname) {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
}

function getLanguageAndPath(pathname) {
  const normalizedPath = normalizePath(pathname);

  if (normalizedPath === "/bg" || normalizedPath.startsWith("/bg/")) {
    return {
      language: "bg",
      path: normalizePath(normalizedPath.replace(/^\/bg/, "") || "/"),
    };
  }

  if (normalizedPath === "/de" || normalizedPath.startsWith("/de/")) {
    return {
      language: "de",
      path: normalizePath(normalizedPath.replace(/^\/de/, "") || "/"),
    };
  }

  return {
    language: DEFAULT_LANGUAGE,
    path: normalizedPath,
  };
}

function getLocalizedPath(page, language) {
  const routes = PAGE_ROUTES_BY_LANGUAGE[language] || PAGE_ROUTES_BY_LANGUAGE.en;
  const normalizedPath = routes[page] || PAGE_ROUTES_BY_LANGUAGE.en[page] || "/";
  const prefix = LANGUAGE_ROUTE_PREFIXES[language] || "";

  if (!prefix) return normalizedPath;
  if (normalizedPath === "/") return prefix;
  return `${prefix}${normalizedPath}`;
}

function getRouteInfo(pathname) {
  const { language, path } = getLanguageAndPath(pathname);
  return {
    language,
    ...(ROUTE_PAGES[path] || { page: "home" }),
  };
}

function getCanonicalPageKey(page, pathname) {
  const { path } = getLanguageAndPath(pathname);
  const routeInfo = ROUTE_PAGES[path];

  if (routeInfo?.sectionId === "competence") return "competence";
  if (routeInfo?.sectionId === "methodology") return "methodology";

  return routeInfo?.page || page || "home";
}

function getAbsoluteUrl(path) {
  return `https://upstrux.bg${path === "/" ? "" : path}`;
}

const PAGE_TITLES = {
  bg: {
    home: "Начало | UPSTRUX",
    about: "За Нас | UPSTRUX",
    solutions: "Решения | UPSTRUX",
    contact: "Контакти | UPSTRUX",
    legal: "Правно | UPSTRUX",
    privacy: "Поверителност | UPSTRUX",
  },
  en: {
    home: "Home | UPSTRUX",
    about: "About Us | UPSTRUX",
    solutions: "Solutions | UPSTRUX",
    contact: "Contacts | UPSTRUX",
    legal: "Legal | UPSTRUX",
    privacy: "Privacy | UPSTRUX",
  },
  de: {
    home: "Start | UPSTRUX",
    about: "Über Uns | UPSTRUX",
    solutions: "Lösungen | UPSTRUX",
    contact: "Kontakt | UPSTRUX",
    legal: "Rechtliches | UPSTRUX",
    privacy: "Datenschutz | UPSTRUX",
  },
};
const META_DESCRIPTIONS = {
  en: "UPSTRUX provides integrated engineering and design services, and project management throughout project development and execution, with expertise in architecture, structural design, assessment and testing of structures and facilities, seismic engineering, transport infrastructure, geotechnical engineering, WSS and hydrotechnical engineering, geodesy, and pre-investment planning.",
  bg: "UPSTRUX предоставя интегрирани инженерни и проектантски услуги, както и управление на проекти през целия процес на разработване и изпълнение, с експертиза в областта на архитектурата, проектирането, обследването и изпитването на строителни конструкции и съоръжения, сеизмичното инженерство, транспортната инфраструктура, геотехническото инженерство, ВиК и хидротехническото инженерство, геодезията и инвестиционното планиране.",
  de: "UPSTRUX bietet integrierte Ingenieur- und Planungsleistungen sowie Projektmanagement über den gesamten Projektentwicklungs- und Realisierungsprozess hinweg. Das Unternehmen verfügt über umfassende Expertise in den Bereichen Architektur, Tragwerksplanung, Bauwerksbewertung und -prüfung, Erdbebeningenieurwesen, Verkehrsinfrastruktur, Geotechnik, Wasserver- und Abwasserentsorgung (WSS), Wasserbauingenieurwesen, Geodäsie sowie vorinvestive Planung."
};
const SECTION_TITLES = {
  bg: {
    about: "За Нас | UPSTRUX",
    competence: "Области на компетентност | UPSTRUX",
    methodology: "От концепцията до реализация | UPSTRUX",
  },
  en: {
    about: "About Us | UPSTRUX",
    competence: "Areas of Competence | UPSTRUX",
    methodology: "From concept to delivery | UPSTRUX",
  },
  de: {
    about: "Über Uns | UPSTRUX",
    competence: "Kompetenzbereiche | UPSTRUX",
    methodology: "Vom Konzept bis zur Umsetzung | UPSTRUX",
  },
};
const HERO_TRANSITION = {
  duration: 36,
  repeat: Infinity,
  times: [0, 0.04, 0.14, 0.18],
  ease: "linear",
};
const NAV_LINK_BUTTON_CLASS = "inline-flex items-center gap-2 text-sm font-light tracking-[0.08em] text-blue-600 transition hover:text-blue-700";
const LEARN_MORE_BUTTON_CLASS = `hidden mt-6 ${NAV_LINK_BUTTON_CLASS}`;
const BACK_BUTTON_CLASS = `mt-8 ${NAV_LINK_BUTTON_CLASS}`;

const heroSlides = [
  hero1,
  hero2,
  hero3,
  hero4,
  hero5,
];

const serviceImages = [
  activity1,
  activity2,
  activity3,
  activity4,
  activity5,
  activity6,
  activity7,
  activity8,  
];

const bgServices = [
  { title: "Обследвания, in-situ и лабораторни изпитвания", text: "In-situ обследвания  на строителните конструкции и съоръжения; In-situ изпитвания (стаични и динамични) на строителните конструкции и съоръжения; Оценка на строителни конструкции, носещата способност и коравина; Оценка на сеизмичната осигуреност и конструктивна безопасност на конструкции и суоражения; Обследване на аварии в строителството; Оценка на динамичното поведение на строителните конструкции и съоръжения, с оглед осигуряване на нормалната им експлоатация; Обследване при сеизмична оценка, възстановяване и усилване на сгради съгласно EN 1998-3; Консултиране при прилагане на нормативни изисквания, технически стандарти и строителни технологии; Изпитване (Разрушително и безразрушително) на физико-механични характеристики на  строителни материали."},
  { title: "Архитектура и проектиране на сгради", text: "Архитектурно проектиране на жилищни, обществени, административни и промишлени сгради; Проектиране на сгради и съоръжения; Интериорни и функционално-пространствени решения; Концептуални, идейни, технически и работни инвестиционни проекти; Градоустройствени и устройствени разработки — ПУП, РУП, концепции и устройствени схеми; Урбанистични анализи и пространствено планиране; Урбанистични анализи и пространствено планиране; BIM (Building Information Modeling) проектиране и координация; 3D моделиране, визуализации и дигитални проектни решения; Консултиране при прилагане на нормативни изисквания и инвестиционно проектиране." },
  { title: "ВиК, Хидротехническо и хидромелиоративно проектиране", text: "Изготвяне на инженерно-хидроложки доклади и водостопански изследвания за оптимално управление на водните ресурси.; Моделиране и проектиране на водоснабдителни и канализационни системи, мрежи и съоръжения.; Проектиране на пречиствателни станции и стратегически хидротехнически съоражения — ВЕЦ, ПАВЕЦ и прилежаща инфраструктура.; Проектиране на язовири, водохващания, деривации, тунели и прилежащи съоръжения.; Проектиране и обследване на хидромелиоративни, напоителни и отводнителни системи.; Проектиране на диги и защитни системи срещу наводнения и ерозия.; Анализ на хидравличен удар и проектиране на защити за тръбопроводни системи.; Оценка на техническото състояние, експлоатационната надеждност и безопасността на хидротехнически съоръжения.; Обследване и анализ на хидротехнически съоръжения при аварийни и експлоатационни режими.; Хидравлични и инженерни анализи на водопроводни системи и съоръжения.; Консултации по нормативни изисквания, технически стандарти и инженерни решения в хидротехническото строителство.; Изготвяне на технически експертизи, становища и инвестиционни проекти за ВиК и хидротехническа инфраструктура."},
  { title: "Геотехническо проектиране", text: "Геотехнически проучвания и инженерно-геоложки анализи; Проектиране на фундиране за сгради и инженерни съоръжения; Анализ и оценка на земната основа и носимоспособността на почвите; Проектиране на подпорни стени, укрепителни и противосвлачищни съоръжения; Геотехническо осигуряване при изкопи, дълбоки изкопи и строителство в урбанизирани територии; Проектиране и обследване на пилотни, плитки и комбинирани фундирания; Оценка на свлачищни, ерозионни и геодинамични процеси; Геотехнически анализи при транспортно, промишлено и хидротехническо строителство; Мониторинг и обследване на деформации и слягания на сгради и съоръжения; Изготвяне на инженерно-геоложки и геотехнически доклади, експертизи и становища; Консултиране при прилагане на нормативни изисквания и инженерни стандарти в областта на геотехниката."},
  { title: "Проектиране на транспортното инфраструктура", text: "Проектиране на пътища, мостове, тунели и транспортни съоръжения; Проектиране на железопътна инфраструктура и прилежащи съоръжения; Транспортно-комуникационни решения и организация на движението; Инженерни разработки за градска и междуградска транспортна инфраструктура; Проектиране на отводнителни и укрепителни системи към транспортни обекти; Анализи и оценки на експлоатационното състояние на транспортни съоръжения; Инженерни решения за рехабилитация и модернизация на транспортна инфраструктура; Технически и инвестиционни проекти в областта на транспортното строителство; Инженерно осигуряване при изграждане и експлоатация на транспортни обекти."},
  { title: "Геодезия, кадастър, ГИС и фотограметрия", text: " Геодезически и фотограметрични измервания; Геодезическо заснемане на поземлени имоти и строителни обекти; Заснемане и анализ на терени чрез GPS, LiDAR и безпилотни летателни апарати (UAV); 3D моделиране на терени, сгради и инженерни съоръжения; Изчисляване на обеми на земно-насипни материали и суровини; Трасиране на сгради, съоръжения и регулационни линии; Вертикално планиране и нивелация; Контролни геодезически измервания по време на строителството; Геодезическо заснемане за узаконяване и въвеждане в експлоатация; Изготвяне на кадастрални планове и карти; Кадастрални услуги и техническа документация; Изработване на комбинирани скици и ситуационни планове;  GIS базирани пространствени анализи и дигитални териториални модели; Геодезическо и кадастрално консултиране при инвестиционни и инфраструктурни проекти."},
  { title: "Управлението и координацията на проекти", text: "Управление на пълния жизнен цикъл на инвестиционни проекти; Координация на междудисциплинарни екипи при комплексни инженерни и строителни проекти; Планиране, организация и контрол на проектантски и строителни дейности; Контрол на качеството и техническото изпълнение по време на строителството; Управление на срокове, ресурси и проектна документация; Инженерно-консултантски услуги при подготовка и реализация на инвестиционни проекти; Координация между възложители, проектанти, изпълнители и административни органи; Мониторинг и оценка на изпълнението на проекти; Подготовка на техническа документация, доклади и експертни становища; Консултиране при прилагане на нормативни изисквания и добри практики в управлението на проекти." },
  { title: "Прединвестиционни проучвания и офертно планиране", text: "Изготвяне на предофертни проучвания и технически анализи.; Подготовка на количествено-стойностни сметки и бюджетни разчети.; Разработване на офертна, тръжна и техническа документация.; Анализ на срокове, ресурси, разходи и рискове.; Проучване и оценка на технически и технологични решения.; Сравнителен анализ и оптимизация на проектни варианти.; Анализ на пазарни условия, доставчици и подизпълнители.; Подготовка на графици, ресурсни планове и финансови оценки.; Технико-икономически анализи и оценка на инвестиционна ефективност.; Консултации при участие в обществени поръчки и търгове.; Анализ на нормативни и технически изисквания.; Подготовка на концептуални и предварителни проектни решения."}
];

const enServices = [
  {title: "Structural Assessments, Diagnostics, In-situ & Laboratory Testing", text: "In-situ investigations of building structures and engineering facilities; In-situ static and dynamic testing of structural systems and facilities; Assessment of structural capacity, stiffness and serviceability performance; Seismic assessment and structural safety evaluation of buildings and engineering structures; Investigation of structural failures and construction-related incidents; Evaluation of the dynamic behavior of structures and facilities to ensure safe and reliable operation; Seismic assessment, retrofitting of existing buildings in accordance with EN 1998-3; Destructive and non-destructive testing of the physico-mechanical properties of construction materials; Consulting on the implementation of regulatory requirements, technical standards and construction technologies."},
  {title: "Architecture & Structural Engineering", text: "Architectural design of residential, public, administrative and industrial buildings; Structural engineering and design of buildings and facielities; Interior and functional-spatial design solutions; Conceptual, preliminary, technical and detailed investment design projects; Urban development and spatial planning documentation — Master Plans, Detailed Development Plans, zoning concepts and planning schemes; Urban analyses and spatial planning; BIM (Building Information Modeling) design and coordination; 3D modeling, visualizations and digital design solutions; Consulting on regulatory compliance and investment design."},
  {title: "WSS, Hydrotechnical & Hydro-Reclamation Engineering", text: "Preparation of engineering hydrology reports and water management studies – optimal management of water resources.; Modeling and design of water supply and sewerage systems, networks, and related infrastructure facilities.; Design of wastewater treatment plants and strategic hydraulic structures — hydropower plants (HPPs), pumped-storage hydropower plants (PSHPPs), and associated infrastructure.; Design of dams, water intake structures, diversion systems, tunnels, and associated hydraulic facilities.; Design and assessment of hydro-reclamation, irrigation, and drainage systems.; Design of levees, flood protection systems, and erosion control structures.; Hydraulic transient (water hammer) analysis and design of protection systems for pipeline networks.; Assessment of the technical condition, operational reliability, and safety of hydraulic engineering structures.; Inspection and analysis of hydraulic structures under emergency and operational conditions.; Hydraulic and engineering analyses of water conveyance systems and related facilities.; Consultancy services regarding regulatory requirements, technical standards, and engineering solutions in hydraulic engineering construction.; Preparation of technical expert assessments, engineering opinions, and investment design documentation for water supply, sewerage, and hydraulic infrastructure projects."},
  {title: "Geotechnical Engineering & Design", text: "Geotechnical investigations and analyses; Foundation design for buildings and engineering structures; Analysis and assessment of subsoil conditions and soil bearing capacity; Design of retaining walls, stabilization systems and landslide mitigation structures; Geotechnical support for excavations, deep excavations and construction in urban environments; Design and assessment of pile foundations, shallow foundations and combined foundation systems; Assessment of landslide, erosion and geodynamic processes; Geotechnical analyses for transport, industrial and hydrotechnical projects; Monitoring and assessment of deformations and settlements of buildings and engineering facilities; Preparation of engineering geological and geotechnical reports, expert assessments and technical opinions; Consulting on the implementation of regulatory requirements and engineering standards in geotechnics."},
  {title: "Transport Infrastructure Engineering & Design", text: "Design of roads, bridges, tunnels and transport infrastructure facilities; Design of railway infrastructure and associated facilities; Traffic engineering solutions and traffic management planning; Engineering design for urban and interurban transport infrastructure; Design of drainage and stabilization systems for transport infrastructure; Analyses and assessments of the operational condition of transport facilities; Engineering solutions for rehabilitation and modernization of transport infrastructure; Technical and investment projects in the field of transport engineering; Engineering support during the construction and operation of transport facilities."},
  {title: "Geodesy, Cadastre, GIS and Photogrammetry", text: "Geodetic and photogrammetric surveys and measurements; Geodetic surveying of land properties and construction sites; Terrain surveying and analysis using GPS, LiDAR and unmanned aerial vehicles (UAV); 3D modeling of terrain, buildings and engineering structures; Calculation of earthwork and bulk material volumes; Setting-out of buildings, engineering structures and regulatory boundaries; Vertical planning and leveling works; Geodetic control measurements during construction activities; Geodetic surveys for legalization and commissioning procedures; Preparation of cadastral plans and maps; Cadastral services and technical documentation; Preparation of combined sketches and situational plans; GIS-based spatial analyses and digital terrain models; Geodetic and cadastral consulting for investment and infrastructure projects."},
  {title: "Project Management & Coordination", text: "Management of the full lifecycle of investment projects; Coordination of multidisciplinary teams for complex engineering and construction projects; Planning, organization and control of design and construction activities; Quality control and technical supervision during construction; Management of schedules, resources and project documentation; Engineering consulting services during the preparation and implementation of investment projects; Coordination between clients, designers, contractors and administrative authorities; Monitoring and evaluation of project implementation; Preparation of technical documentation, reports and expert opinions; Consulting on regulatory compliance and best practices in project management."},
  {title: "Pre-Investment Studies & Tender Planning", text: "Preparation of pre-tender studies and technical analyses.; Preparation of bills of quantities (BoQ), cost estimates, and budget calculations.; Development of tender, bid, and technical documentation.; Analysis of project schedules, resources, costs, and risks.; Evaluation and assessment of technical and technological solutions.; Comparative analysis and optimization of design alternatives.; Analysis of market conditions, suppliers, and subcontractors.; Preparation of project schedules, resource allocation plans, and financial assessments.; Techno-economic analyses and evaluation of investment efficiency.; Consultancy services for participation in public procurement procedures and tenders.; Analysis of regulatory and technical requirements.; Preparation of conceptual and preliminary design solutions."}
];

const deServices = [
  {title: "Bauwerksuntersuchungen, Diagnostik sowie In-situ- und Laborprüfungen", text: "In-situ-Untersuchungen von Tragwerken und Ingenieurbauwerken; In-situ statische und dynamische Prüfungen von Tragwerken und baulichen Anlagen; Bewertung der Tragfähigkeit, Steifigkeit und Gebrauchstauglichkeit von Bauwerken; Seismische Bewertung und Beurteilung der strukturellen Sicherheit von Gebäuden und Ingenieurbauwerken; Untersuchung von Bauschäden, Havarien und konstruktiven Versagensfällen; Analyse des dynamischen Verhaltens von Tragwerken und Bauwerken zur Gewährleistung eines sicheren und zuverlässigen Betriebs; Seismische Bewertung, Instandsetzung und Verstärkung bestehender Bauwerke gemäß EN 1998-3; Zerstörende und zerstörungsfreie Prüfung physikalisch-mechanischer Eigenschaften von Baustoffen; Beratung bei der Anwendung regulatorischer Anforderungen, technischer Normen und Bautechnologien."},
  {title: "Architektur und Tragwerksplanung", text: "Architektonische Planung von Wohn-, Verwaltungs-, öffentlichen und Industriegebäuden; Tragwerksplanung von Gebäuden und Anlagen; Innenarchitektonische und funktional-räumliche Gestaltungslösungen; Konzept-, Vorentwurfs-, Genehmigungs-, Ausführungs- und Detailplanung; Städtebauliche und raumplanerische Konzepte, Bebauungspläne und Entwicklungsstudien; Stadtanalysen und räumliche Planung; BIM-Planung (Building Information Modeling) und multidisziplinäre Koordination; 3D-Modellierung, Visualisierung und digitale Planungslösungen; Beratung hinsichtlich regulatorischer Anforderungen und Investitionsplanung."},
  {title: "Wasserversorgungs-, Siedlungswasserwirtschafts-, Wasserbau- und Hydro-Meliorationsplanung", text: "Erstellung ingenieurhydrologischer Gutachten und wasserwirtschaftlicher Studien zur optimalen Bewirtschaftung von Wasserressourcen.; Modellierung und Planung von Wasserversorgungs- und Abwasserentsorgungssystemen, Leitungsnetzen sowie zugehörigen Infrastrukturanlagen.; Planung von Abwasserreinigungsanlagen und strategischen wasserbaulichen Anlagen — Wasserkraftwerken (KW), Pumpspeicherkraftwerken (PSW) und zugehöriger Infrastruktur.; Planung von Talsperren, Wasserfassungen, Ableitungssystemen, Tunneln und zugehörigen wasserbaulichen Anlagen.; Planung und Bewertung hydro-meliorativer, Bewässerungs- und Entwässerungssysteme.; Planung von Deichen, Hochwasserschutzsystemen und Erosionsschutzanlagen.; Analyse hydraulischer Druckstöße (Wasserschlag) sowie Planung von Schutzsystemen für Rohrleitungsnetze.; Bewertung des technischen Zustands, der Betriebssicherheit und der strukturellen Sicherheit wasserbaulicher Anlagen.; Inspektion und Analyse wasserbaulicher Anlagen unter Störfall- und Betriebsbedingungen.; Hydraulische und ingenieurtechnische Analysen von Wasserförder- und Leitungssystemen sowie zugehörigen Anlagen.; Beratungsleistungen zu regulatorischen Anforderungen, technischen Normen und ingenieurtechnischen Lösungen im Wasserbau.; Erstellung technischer Gutachten, fachlicher Stellungnahmen und Investitionsplanungen für Wasserver- und Abwasserentsorgungs- sowie wasserbauliche Infrastrukturprojekte."},
  {title: "Geotechnische Planung", text: "Geotechnische Untersuchungen und ingenieurgeologische Analysen; Gründungsplanung für Gebäude und Ingenieurbauwerke; Analyse und Bewertung von Baugrundverhältnissen und Bodentragfähigkeit; Planung von Stützbauwerken, Hangsicherungen und Maßnahmen zur Rutschungssicherung; Geotechnische Begleitung von Baugruben, Tiefbauarbeiten und Bauprojekten in urbanen Gebieten; Planung und Bewertung von Pfahlgründungen, Flachgründungen und kombinierten Gründungssystemen; Bewertung von Rutschungs-, Erosions- und geodynamischen Prozessen; Geotechnische Analysen für Verkehrs-, Industrie- und Wasserbauprojekte; Monitoring und Bewertung von Verformungen und Setzungen von Bauwerken; Erstellung ingenieurgeologischer und geotechnischer Gutachten, Bewertungen und Stellungnahmen; Beratung zur Anwendung regulatorischer Anforderungen und technischer Normen im Bereich der Geotechnik."},
  {title: "Planung von Verkehrsinfrastruktur",text: "Planung von Straßen, Brücken, Tunneln und Verkehrsbauwerken; Planung von Eisenbahninfrastruktur und zugehörigen Anlagen; Verkehrstechnische Lösungen und Verkehrsmanagementplanung; Ingenieurplanung für städtische und überregionale Verkehrsinfrastruktur; Planung von Entwässerungs- und Stabilisierungsmaßnahmen für Verkehrsanlagen; Analysen und Bewertungen des Betriebszustands von Verkehrsbauwerken; Ingenieurtechnische Lösungen zur Sanierung und Modernisierung von Verkehrsinfrastruktur; Technische und investitionsbezogene Projekte im Verkehrsingenieurwesen; Ingenieurtechnische Unterstützung bei Bau und Betrieb von Verkehrsanlagen."},
  {title: "Geodäsie, Kataster, GIS und Photogrammetrie", text: "Geodätische und photogrammetrische Vermessungen; Vermessung von Grundstücken und Baustellen; Geländeaufnahme und Analyse mittels GPS, LiDAR und unbemannten Luftfahrzeugen (UAV); 3D-Modellierung von Gelände, Gebäuden und Ingenieurbauwerken; Berechnung von Erd- und Schüttgutvolumen; Absteckung von Gebäuden, Ingenieurbauwerken und Grundstücksgrenzen; Höhenplanung und Nivellementsarbeiten; Geodätische Kontrollmessungen während der Bauausführung; Vermessungen für Legalisierungs- und Inbetriebnahmeverfahren; Erstellung von Katasterplänen und Kartenwerken; Katasterdienstleistungen und technische Dokumentation; Erstellung kombinierter Skizzen und Lagepläne; GIS-basierte Raumanalysen und digitale Geländemodelle; Geodätische und katastertechnische Beratung für Investitions- und Infrastrukturprojekte."},
  {title: "Projektmanagement und Projektkoordination", text: "Management des gesamten Lebenszyklus von Investitionsprojekten; Koordination multidisziplinärer Teams bei komplexen Ingenieur- und Bauprojekten; Planung, Organisation und Steuerung von Planungs- und Bauprozessen; Qualitätsmanagement und technische Bauüberwachung; Steuerung von Terminen, Ressourcen und Projektdokumentation; Ingenieurtechnische Beratungsleistungen bei der Vorbereitung und Umsetzung von Investitionsprojekten; Koordination zwischen Auftraggebern, Planern, Auftragnehmern und Behörden; Monitoring und Bewertung der Projektumsetzung; Erstellung technischer Dokumentationen, Berichte und Sachverständigenstellungen; Beratung hinsichtlich regulatorischer Compliance und bewährter Verfahren im Projektmanagement."},
  {title: "Vorinvestitionsstudien und Ausschreibungsplanung", text: "Erstellung von Vorstudien für Ausschreibungen und technischen Analysen.; Erstellung von Leistungsverzeichnissen (LV), Kostenkalkulationen und Budgetberechnungen.; Ausarbeitung von Ausschreibungs-, Angebots- und technischen Unterlagen.; Analyse von Projektterminplänen, Ressourcen, Kosten und Risiken.; Untersuchung und Bewertung technischer sowie technologischer Lösungen.; Vergleichende Analyse und Optimierung von Planungsvarianten.; Analyse von Marktbedingungen, Lieferanten und Nachunternehmern.; Erstellung von Terminplänen, Ressourcenplanungen und finanziellen Bewertungen.; Technisch-wirtschaftliche Analysen und Bewertung der Investitionseffizienz.; Beratungsleistungen bei der Teilnahme an öffentlichen Vergabeverfahren und Ausschreibungen.; Analyse regulatorischer und technischer Anforderungen.; Erstellung konzeptioneller und vorläufiger Planungslösungen."}
];

const bgProcessSteps = [
  { title: "Иницииране", body: "Определяне целите на проекта, предварително проучване, оценяване техническата и финансовата осъществимост, определяне предварителния обхват, идентифициране на заинтересованите страни и разработване Устав на проекта. Анализиране на нормативните изисквания, ограниченията, допусканията, рисковете и бизнес целите, гарантиращи реалистична, законово съобразена и структурирана проектна рамка." },
  { title: "Планиране", body: "Разработване на обхвата, Work Breakdown Structure (WBS), графици, бюджети, иднейни, технически и работни проекти, както и тръжна документация. Ресурсно планиране, разработване на планове за управление на промени, качество, комуникации, доставки и рискове. Създаване на референтна рамка за управление на обхвата, сроковете, ресурсите и разходите, гарантираща успешно изпълнение на проекта." },
  { title: "Изпълнение", body: "Интегрирано управление на инженерни дейности, проектантски процесни, технически екипи, изпълнение и доставки, включително управление на промените, взаймодействието между участниците в проекта и пройзводителността." },
  { title: "Мониторинг и контрол", body: "Мониторинг на проекта спрямо установените референтни рамки,  контрол на изпълнението, проследяване на напредъка, управление на риска и контрол върху разходите, сроковете, качеството и промените чрез интегриран подход на управление, позволяващ ранно идентифициране на отклонения и своевременни коригиращи действия." },
  { title: "Закриване", body: "Формално приключване на проектните дейности, приемане на изпълнените работи, договорно и административно приключване, освобождаване на ресурси, архивиране на проектната документация, въвеждане в експлоатация и последваща поддръжка. Документиране на извлечените поуки и осигуряване на ефективно предаване и финализиране." },
];

const enProcessSteps = [
  { title: "Initiation", body: "Definition of project objectives, preliminary studies, assessment of technical and financial feasibility, establishment of the preliminary scope, stakeholder identification, and development of the Project Charter. Analysis of regulatory requirements, constraints, assumptions, risks, and business objectives to ensure a realistic, legally compliant, and structured project framework." },
  { title: "Planning", body: "Development of the project scope, Work Breakdown Structure (WBS), schedules, budgets, conceptual, technical, and detailed design documentation, as well as tender documentation. Resource planning and development of change management, quality management, communications, procurement, and risk management plans. Establishment of baseline frameworks for scope, schedule, resource, and cost management, ensuring successful project execution." },
  { title: "Execution", body: "Integrated project management of engineering activities, design processes, technical teams, execution works and procurement activities, including management of changes, stakeholder interfaces, project participant coordination, and productivity." },
  { title: "Monitoring and control", body: "Monitoring project performance against established baselines, execution control, progress tracking, risk management, and control of costs, schedules, quality, and changes through an integrated management approach, enabling early identification of deviations and timely corrective actions." },
  { title: "Closing", body: "Formal closure of project activities, acceptance of completed works, contractual and administrative closeout, resource release, archiving of project documentation, commissioning, and follow-up support. Documentation of lessons learned and effective project handover and finalization." },
];

const deProcessSteps = [
  { title: "Initiierung", body: "Definition der Projektziele, Durchführung von Vorstudien, Bewertung der technischen und wirtschaftlichen Machbarkeit, Festlegung des vorläufigen Projektumfangs, Identifikation der Stakeholder sowie Erstellung der Projektcharta. Analyse regulatorischer Anforderungen, Randbedingungen, Annahmen, Risiken und Geschäftsziele zur Sicherstellung eines realistischen, rechtskonformen und strukturierten Projektrahmens." },
  { title: "Planung", body: "Entwicklung des Projektumfangs, der Work Breakdown Structure (WBS), Terminpläne, Budgets sowie konzeptioneller, technischer und Ausführungsplanungen einschließlich Ausschreibungsunterlagen. Ressourcenplanung sowie Erstellung von Plänen für Änderungsmanagement, Qualitätsmanagement, Kommunikationsmanagement, Beschaffungsmanagement und Risikomanagement. Etablierung von Baselines für Leistungsumfang, Termine, Ressourcen und Kosten zur Sicherstellung einer erfolgreichen Projektausführung." },
  { title: "Ausführung", body: "Integriertes Projektmanagement von Engineering-Aktivitäten, Planungsprozessen, technischen Teams, Ausführungsleistungen und Beschaffungsvorgängen einschließlich Änderungsmanagement, Stakeholder- und Schnittstellenmanagement, Koordination der Projektbeteiligten sowie Produktivitätssteuerung." },
  { title: "Monitoring und Kontrolle", body: "Überwachung der Projektleistung anhand definierter Baselines, Steuerung der Projektausführung, Fortschrittskontrolle, Risikomanagement sowie Kontrolle von Kosten, Terminen, Qualität und Änderungen durch einen integrierten Managementansatz, der eine frühzeitige Identifikation von Abweichungen und die rechtzeitige Einleitung von Korrekturmaßnahmen ermöglicht." },
  { title: "Abschluss", body: "Formaler Abschluss der Projektaktivitäten, Abnahme der ausgeführten Leistungen, vertraglicher und administrativer Projektabschluss, Freigabe von Ressourcen, Archivierung der Projektdokumentation, Inbetriebnahme sowie anschließende Support- und Betreuungsleistungen. Dokumentation der gewonnenen Erkenntnisse („Lessons Learned“) sowie Sicherstellung einer effektiven Projektübergabe und Finalisierung." },
];

const legalPages = {
  bg: {
    legal: {
    eyebrow: "Правно", title: "Условия за ползване", updated: "Последна актуализация: 10 май 2026 г.",
    intro: "Тази страница урежда достъпа и използването на уебсайта на UPSTRUX. С използването на този уебсайт Вие приемате настоящите условия. Ако не сте съгласни с тях, моля, не използвайте сайта.",
    sections: [
    {
      heading: "1. Информация за дружеството",
      body: "Настоящите Условия за ползване се издават от UPSTRUX, от името на дружеството и, когато е приложимо, неговите партньорски, консултантски и професионални структури. „UPSTRUX“ и логото на UPSTRUX представляват търговски обозначения и/или обекти на интелектуална собственост. Данните за дружеството, включително фирмено наименование, ЕИК, ДДС номер, седалище, адрес на управление и законен представител, следва да бъдат добавени тук преди официално публикуване. Можете да се свържете с нас относно тези Условия чрез електронна поща на info@upstrux.bg."
    },
    {
      heading: "2. Информационен характер на съдържанието",
      body: "Съдържанието на този уебсайт има общ информационен характер и представя инженерни, проектантски, строителни и консултантски услуги. То не представлява индивидуална техническа, правна, финансова или инвестиционна консултация."
    },
    {
      heading: "3. Интелектуална собственост",
      body: "Всички текстове, структура, дизайн, графични елементи, търговски обозначения и друго съдържание на сайта са собственост на UPSTRUX или се използват на законно основание. Част от визуалното съдържание, техническите изображения, инженерните среди и специализираната инфраструктура, представени на сайта, могат да бъдат използвани с разрешение, в рамките на партньорски, академични, професионални или договорни отношения. Публикуването на подобно съдържание не следва да се тълкува като твърдение за собственост върху съответната инфраструктура, лаборатории или технически съоръжения, освен ако изрично не е посочено друго. Не се разрешава копиране, възпроизвеждане, изменение, разпространение или използване за търговски цели без предварително писмено съгласие."
    },
    {
      heading: "4. Външни връзки",
      body: "Сайтът може да съдържа връзки към външни платформи, включително LinkedIn и Facebook. UPSTRUX не контролира съдържанието, политиките и практиките на тези външни сайтове и не носи отговорност за тях."
    },
    {
      heading: "5. Ограничаване на отговорността",
      body: "UPSTRUX полага разумни усилия информацията на сайта да бъде точна и актуална, но не гарантира пълнотата, непрекъснатата наличност или липсата на технически грешки. Използването на сайта е на собствен риск на потребителя, доколкото това е допустимо от приложимото право."
    },
    {
      heading: "6. Приложимо право",
      body: "Настоящите условия се тълкуват съгласно действащото законодателство на Република България и приложимото право на Европейския съюз. Спорове се решават от компетентните български съдилища, освен ако императивна правна норма предвижда друго."
    }
  ]},
    privacy: { eyebrow: "Поверителност", title: "Политика за поверителност", updated: "Последна актуализация: 10 май 2026 г.", intro: "Тази политика обяснява как UPSTRUX обработва лични данни във връзка с използването на уебсайта, контактите с нас и предоставянето на инженерни, проектантски, строителни и консултантски услуги.", sections: [
      { heading: "1. Администратор на лични данни", body: "Администратор на лични данни е UPSTRUX. Пълните фирмени данни, включително фирмено наименование, ЕИК, ДДС номер, седалище, адрес на управление и приложими данни за контакт, следва да бъдат включени преди официално публикуване. За въпроси относно обработването на лични данни можете да се свържете с нас на info@upstrux.bg." },
      { heading: "2. Какви данни можем да обработваме", body: "Можем да обработваме данни, които Вие ни предоставяте доброволно, включително име, имейл адрес, телефон, организация, длъжност, съдържание на запитване, проектна информация и кореспонденция. Възможно е да се обработват и технически данни като IP адрес, тип браузър, приблизително местоположение, дата и час на посещение, когато това е необходимо за сигурност, поддръжка и статистика." },
      { heading: "3. Цели на обработването", body: "Данните могат да се обработват за отговор на запитвания, подготовка на оферти, комуникация с клиенти и партньори, изпълнение на договори, управление на проекти, счетоводно и правно съответствие, защита на законни интереси, подобряване на сайта и информационна сигурност." },
      { heading: "4. Правни основания", body: "В зависимост от конкретния случай обработването може да се основава на изпълнение на договор или преддоговорни действия, законово задължение, легитимен интерес, съгласие или защита на правни претенции. Когато обработването се основава на съгласие, то може да бъде оттеглено по всяко време." },
      { heading: "5. Получатели и доставчици", body: "Лични данни могат да бъдат предоставяни на счетоводни, правни, ИТ, хостинг, комуникационни и други професионални доставчици, когато това е необходимо и законосъобразно. При използване на външни платформи, например социални мрежи или аналитични инструменти, могат да се прилагат и техните собствени политики." },
      { heading: "6. Срокове за съхранение", body: "Съхраняваме личните данни само за срок, необходим за съответната цел, за изпълнение на законови задължения или за защита на права и законни интереси. След отпадане на основанието данните се изтриват или анонимизират, освен ако законът изисква по-дълго съхранение." },
      { heading: "7. Вашите права", body: "При условията на приложимото право имате право на достъп, коригиране, изтриване, ограничаване на обработването, преносимост на данните, възражение срещу обработване, оттегляне на съгласие и подаване на жалба до Комисията за защита на личните данни." },
      { heading: "8. Бисквитки и подобни технологии", body: "Уебсайтът може да използва технически необходими бисквитки и, при внедряване, аналитични или маркетингови бисквитки. За всички несъществени бисквитки следва да се използва подходящ механизъм за информиране и съгласие." },
      { heading: "9. Сигурност", body: "Прилагаме разумни технически и организационни мерки за защита на личните данни срещу неразрешен достъп, загуба, злоупотреба, изменение или разкриване." },
      { heading: "10. Промени в политиката", body: "Тази политика може да бъде актуализирана при промени в дейността, сайта, технологиите или приложимото законодателство. Актуалната версия се публикува на тази страница." },
    ]},
  },
  en: {
  legal: {
    eyebrow: "Legal", title: "Terms of Use", updated: "Last updated: 10 May 2026", intro: "This page governs access to and use of the UPSTRUX website. By using this website, you accept these terms. If you do not agree with them, please do not use the website.",
    sections: [
      {
        heading: "1. Company information",
        body: "These Terms of Use are issued by UPSTRUX on behalf of the company and, where applicable, its partner, consulting and professional structures. UPSTRUX and the UPSTRUX logo are trade designations and/or intellectual property assets. Full company details, including legal name, registration number, VAT number, registered office, business address and legal representative, should be added before official publication. You may contact us regarding these Terms by email at info@upstrux.bg."
      },
      {
        heading: "2. Informational nature of content",
        body: "The content of this website is provided for general information purposes and presents engineering, design, construction and consulting services. It does not constitute individual technical, legal, financial or investment advice."
      },
      {
        heading: "3. Intellectual property",
        body: "All text, structure, design, graphic elements, trade designations and other website content are owned by UPSTRUX or used on a lawful basis. Certain visual materials, technical imagery, engineering environments and specialized infrastructure presented on this website may be used with permission within the framework of partner, academic, professional or contractual relationships. The publication of such content shall not be interpreted as a claim of ownership over the respective infrastructure, laboratories or technical facilities unless explicitly stated otherwise. Copying, reproduction, modification, distribution or commercial use is not permitted without prior written consent."
      },
      {
        heading: "4. External links",
        body: "The website may contain links to external platforms, including LinkedIn and Facebook. UPSTRUX does not control the content, policies or practices of these external websites and accepts no responsibility for them."
      },
      {
        heading: "5. Limitation of liability",
        body: "UPSTRUX makes reasonable efforts to keep the information on the website accurate and up to date but does not guarantee completeness, continuous availability or the absence of technical errors. Use of the website is at the user’s own risk to the extent permitted by applicable law."
      },
      {
        heading: "6. Applicable law",
        body: "These terms are interpreted in accordance with the laws of the Republic of Bulgaria and applicable European Union law. Disputes are resolved by the competent Bulgarian courts unless mandatory legal provisions provide otherwise."
      }
    ]},
    privacy: { eyebrow: "Privacy", title: "Privacy Policy", updated: "Last updated: 10 May 2026", intro: "This policy explains how UPSTRUX processes personal data in connection with use of the website, communication with us and provision of engineering, design, construction and consulting services.", sections: [
      { heading: "1. Data controller", body: "The data controller is UPSTRUX. Full company details, including legal name, registration number, VAT number, registered office, business address and contact details, should be included before official publication. For personal data questions, contact info@upstrux.bg." },
      { heading: "2. Data we may process", body: "We may process data that you voluntarily provide, including name, email address, telephone number, organization, position, inquiry content, project information and correspondence. We may also process technical data such as IP address, browser type, approximate location, date and time of visit where necessary for security, maintenance and statistics." },
      { heading: "3. Purposes of processing", body: "Data may be processed to respond to inquiries, prepare offers, communicate with clients and partners, perform contracts, manage projects, comply with accounting and legal obligations, protect legitimate interests, improve the website and maintain information security." },
      { heading: "4. Legal bases", body: "Depending on the specific case, processing may be based on performance of a contract or pre-contractual steps, legal obligation, legitimate interest, consent or protection of legal claims. Where processing is based on consent, it may be withdrawn at any time." },
      { heading: "5. Recipients and service providers", body: "Personal data may be shared with accounting, legal, IT, hosting, communication and other professional service providers where necessary and lawful. External platforms, such as social networks or analytics tools, may also apply their own policies." },
      { heading: "6. Retention periods", body: "We retain personal data only for as long as necessary for the relevant purpose, legal obligations or protection of rights and legitimate interests. After the basis no longer applies, data is deleted or anonymized unless the law requires longer retention." },
      { heading: "7. Your rights", body: "Subject to applicable law, you have rights of access, rectification, erasure, restriction of processing, data portability, objection to processing, withdrawal of consent and lodging a complaint with the Bulgarian Commission for Personal Data Protection." },
      { heading: "8. Cookies and similar technologies", body: "The website may use technically necessary cookies and, if implemented, analytical or marketing cookies. For all non-essential cookies, an appropriate notice and consent mechanism should be used." },
      { heading: "9. Security", body: "We apply reasonable technical and organizational measures to protect personal data against unauthorized access, loss, misuse, alteration or disclosure." },
      { heading: "10. Changes to this policy", body: "This policy may be updated due to changes in activities, the website, technologies or applicable law. The current version is published on this page." },
    ]},
  },
  de: {
  legal: {
    eyebrow: "Rechtliches", title: "Nutzungsbedingungen", updated: "Zuletzt aktualisiert: 10. Mai 2026", intro: "Diese Seite regelt den Zugriff auf und die Nutzung der UPSTRUX-Website. Durch die Nutzung dieser Website akzeptieren Sie diese Bedingungen. Wenn Sie diesen Bedingungen nicht zustimmen, nutzen Sie diese Website bitte nicht.",
    sections: [
      {
        heading: "1. Unternehmensinformationen",
        body: "Diese Nutzungsbedingungen werden von UPSTRUX im Namen des Unternehmens und, soweit anwendbar, seiner partnerbezogenen, beratenden und professionellen Strukturen herausgegeben. „UPSTRUX“ sowie das UPSTRUX-Logo stellen geschäftliche Kennzeichen und/oder geistige Eigentumsrechte dar. Vollständige Unternehmensdaten, einschließlich Firmenname, Registrierungsnummer, Umsatzsteuer-Identifikationsnummer, Sitz, Geschäftsadresse und gesetzlicher Vertreter, sind vor der offiziellen Veröffentlichung zu ergänzen. Kontakt: info@upstrux.bg."
      },
      {
        heading: "2. Informationscharakter der Inhalte",
        body: "Die Inhalte dieser Website dienen ausschließlich allgemeinen Informationszwecken und präsentieren Ingenieur-, Planungs-, Bau- und Beratungsleistungen. Sie stellen keine individuelle technische, rechtliche, finanzielle oder investitionsbezogene Beratung dar."
      },
      {
        heading: "3. Geistiges Eigentum",
        body: "Alle Texte, Strukturen, Designs, grafischen Elemente, Kennzeichen und sonstigen Inhalte dieser Website sind Eigentum von UPSTRUX oder werden auf rechtmäßiger Grundlage verwendet. Bestimmte visuelle Inhalte, technische Darstellungen, ingenieurtechnische Umgebungen und spezialisierte Infrastrukturen, die auf dieser Website dargestellt werden, können im Rahmen partnerschaftlicher, akademischer, professioneller oder vertraglicher Beziehungen mit Genehmigung verwendet werden. Die Veröffentlichung solcher Inhalte darf nicht als Eigentumsanspruch auf die jeweilige Infrastruktur, Labore oder technischen Einrichtungen ausgelegt werden, sofern nicht ausdrücklich etwas anderes angegeben ist. Eine Vervielfältigung, Verbreitung, Änderung oder kommerzielle Nutzung ohne vorherige schriftliche Zustimmung ist nicht gestattet."
      },
      {
        heading: "4. Externe Links",
        body: "Die Website kann Links zu externen Plattformen wie LinkedIn und Facebook enthalten. UPSTRUX kontrolliert diese externen Websites nicht und übernimmt keine Verantwortung für deren Inhalte, Richtlinien oder Praktiken."
      },
      {
        heading: "5. Haftungsbeschränkung",
        body: "UPSTRUX bemüht sich, die Informationen auf dieser Website korrekt und aktuell zu halten, übernimmt jedoch keine Gewähr für Vollständigkeit, dauerhafte Verfügbarkeit oder Fehlerfreiheit. Die Nutzung der Website erfolgt im gesetzlich zulässigen Umfang auf eigenes Risiko."
      },
      {
        heading: "6. Anwendbares Recht",
        body: "Diese Bedingungen unterliegen dem Recht der Republik Bulgarien sowie dem anwendbaren Recht der Europäischen Union. Streitigkeiten werden von den zuständigen bulgarischen Gerichten entschieden, sofern zwingende gesetzliche Vorschriften nichts anderes vorsehen."
      }
    ]},
    privacy: { eyebrow: "Datenschutz", title: "Datenschutzerklärung", updated: "Zuletzt aktualisiert: 10. Mai 2026", intro: "Diese Erklärung erläutert, wie UPSTRUX personenbezogene Daten im Zusammenhang mit der Nutzung der Website, der Kommunikation mit uns und der Erbringung von Ingenieur-, Planungs-, Bau- und Beratungsleistungen verarbeitet.", sections: [
      { heading: "1. Verantwortlicher", body: "Verantwortlicher ist UPSTRUX. Vollständige Unternehmensdaten sind vor offizieller Veröffentlichung zu ergänzen. Für Datenschutzfragen kontaktieren Sie info@upstrux.bg." },
      { heading: "2. Verarbeitete Daten", body: "Wir können Daten verarbeiten, die Sie freiwillig bereitstellen, darunter Name, E-Mail, Telefon, Organisation, Position, Anfragen, Projektinformationen und Korrespondenz. Auch technische Daten können verarbeitet werden, soweit dies für Sicherheit, Wartung und Statistik erforderlich ist." },
      { heading: "3. Zwecke der Verarbeitung", body: "Daten können zur Beantwortung von Anfragen, Angebotserstellung, Kommunikation, Vertragserfüllung, Projektmanagement, rechtlicher Compliance, Wahrung berechtigter Interessen, Websiteverbesserung und Informationssicherheit verarbeitet werden." },
      { heading: "4. Rechtsgrundlagen", body: "Je nach Fall beruht die Verarbeitung auf Vertragserfüllung, vorvertraglichen Maßnahmen, rechtlicher Verpflichtung, berechtigtem Interesse, Einwilligung oder Geltendmachung von Rechtsansprüchen." },
      { heading: "5. Empfänger und Dienstleister", body: "Personenbezogene Daten können an Buchhaltungs-, Rechts-, IT-, Hosting-, Kommunikations- und andere professionelle Dienstleister weitergegeben werden, soweit dies erforderlich und rechtmäßig ist." },
      { heading: "6. Aufbewahrungsfristen", body: "Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck, gesetzliche Pflichten oder die Wahrung von Rechten erforderlich ist." },
      { heading: "7. Ihre Rechte", body: "Nach geltendem Recht haben Sie Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerspruch, Widerruf der Einwilligung und Beschwerde bei der bulgarischen Datenschutzaufsicht." },
      { heading: "8. Cookies und ähnliche Technologien", body: "Die Website kann technisch notwendige Cookies und, sofern implementiert, Analyse- oder Marketing-Cookies verwenden. Für nicht notwendige Cookies ist ein geeigneter Hinweis- und Einwilligungsmechanismus erforderlich." },
      { heading: "9. Sicherheit", body: "Wir wenden angemessene technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten an." },
      { heading: "10. Änderungen dieser Erklärung", body: "Diese Erklärung kann aufgrund von Änderungen der Tätigkeit, Website, Technologien oder Rechtslage aktualisiert werden. Die aktuelle Version wird auf dieser Seite veröffentlicht." },
    ]},
  },
};

const translations = {
  bg: {
    nav: { home: "Начало", about: "За нас", solutions: "РЕШЕНИЯ", contacts: "Контакти" },
    heroTitle: ["Инженерство, което свързва", "визията с реалността"],
    aboutLabel: "Строителни инженери, проектанти и технически ръководители",
    aboutTitle: "За Нас",
    aboutP1: "UPSTRUX обединиява инженери в областта на гражданското строителство, проектирането, обследването, техническото ръководене и управлението на проекти, изискващи ефективно взаимодействие между различни технически дисциплини, специализирани експертни екипи и участници в строително-инвестиционния процес през целия жизнен цикъл на проекта — от иницииране и планиране до изпълнение, мониторинг и контрол и финално зактиване на проекта.",
    aboutP2: "Чрез интегриран подход и контрол върху всички етапи на проектната реализация осигуряваме устойчиви инженерни решения, оптимизация на ресурси и ефективно управление на техническите, финансовите и времевите параметри на проекта.",
    aboutP3: "Разбираме, че един проект е успешен, когато отговаря на законовите и нормативните изисквания, очакванията на клиента, като същевременно остава икономически ефективен.",
    aboutHighlight: "Благодарение на високото ниво на специализация на нашите партньори, UPSTRUX обединява инженерна експертиза, цялостно управление при изпълнение и достъп до специализирани технически мрежи в подкрепа на целия инвестиционен и строителен процес.",
    solutionsEyebrow: "Мултидисциплинарна инженерна координация и цялостни инженерни, проектантски и експертни решения",
    solutionsTitle: "Решения",
    engineeringCycle: "UPSTRUX притежава способността да координира и управлява комплексни инженерни и инвестиционни проекти, изискващи взаимодействие между различни технически дисциплини, специализирани експертни екипи и участници в строително-инвестиционния процес. Нашият подход надхвърля разработването на отделни проектни решения и се основава на ефективното обединяване на архитекти, конструктори, геотехници, хидроинженери, транспортни инженери, геодезисти и технически консултанти в единна проектна среда. Чрез интегриран подход и координация на всички етапи — от концепцията до реализацията — UPSTRUX осигурява устойчиви инженерни решения, оптимизация на обхвата на проекта, финансовите, техническите и човешките ресурси, времевите параметри, управлението на качеството и проектния риск.",
    competenceTitle: "Области на компетентност",
    competenceIntro: "UPSTRUX обединява инженерна, проектантска, строителна и консултантска експертиза в ключови направления на строително-инвестиционния процес.",
    competences: [
    "Архитектура, урбанизъм, пространствено планиране и управление на територията.",
    "Проектиране на сгради и съоръжения.",
    "Обследване и изпитване на строителни конструкции, съоръжения и мостове.",
    "Сеизмична оценка, усилване, реконструкция и възстановяване на строителни конструкции.",
    "Транспортно строителство, пътна инфраструктура, транспортни съоръжения и железопътно инженерство.",
    "Геодезия, геоинформатика, кадастър, инженерно заснемане и управление на пространствени данни.",
    "Геотехническо инженерство, строителни материали, лабораторни изпитвания, технически експертизи и устойчиво строителство.",
    "Водоснабдяване и канализация, хидротехническо строителство, хидрология, инженерна екология и опазване на околната среда.",
    "Технология и механизация на строителството, BIM, дигитализация и информационни технологии в строителството.",
    "Организация, управление и икономика на строителството, инвестиционно планиране и управление на строителни проекти.",
    "Нормативно съответствие, технически консултации, експертна дейност и консултиране в строително-инвестиционния сектор.",
    ],
    methodologyTitle: "От концепцията до реализация",
    methodologyIntro: "Нашата рамка за управление и изпълнение на проекти е изградена върху международно признатите практики, които гарантират успешно иницииране, детайлно планиране, ефективно изпълнение, контрол и успешно завършване на всеки проект. Тази структурирана методология осигурява пълно съответствие с най-добрите практики в областта на управлението на проекти.",
    contactPage: {eyebrow: "Контакти", title: "Свържете се с UPSTRUX", intro: "Свържете се с UPSTRUX за консултации, инженерни, проектантски и координационни запитвания.",},
    footer: { quick: "Бързи линкове", follow: "Последвай", solutions: "Решения", contacts: "Контакти", rights: "© 2026 UPSTRUX. Всички права запазени.", location: "гр. София 1000", legalTitle: "Условия за ползване", legalInfo: "Правно", privacy: "Поверителност", backHome: "← Обратно към началната страница" },
    learnMore: "Научете повече →",
    services: bgServices,
    processSteps: bgProcessSteps,
    legalPages: legalPages.bg,
  },

  en: {
    nav: { home: "Home", about: "About", solutions: "SOLUTIONS", contacts: "Contacts" },
    heroTitle: ["Engineering that connects", "vision with reality"],
    aboutLabel: "Civil, structural and site engineers",
    aboutTitle: "About Us",
    aboutP1: "UPSTRUX brings together civil, structural, site and project engineers with expertise in coordinating complex projects requiring effective collaboration between multiple technical disciplines, specialized expert teams, and stakeholders throughout the entire project lifecycle — from initiation and planning through execution, monitoring and control, and project close-out.",
    aboutP2: "Through an integrated approach and oversight across all stages of project delivery, we provide sustainable engineering solutions, resource optimization, and effective management of the project’s scope, technical, financial, and schedule parameters.",
    aboutP3: "We understand that a project is successful when it complies with legal and regulatory requirements, meets the client’s expectations and remains economically efficient.",
    aboutHighlight: "Leveraging the high level of specialization within our partner network, UPSTRUX combines engineering expertise, integrated management throughout project execution, and access to specialized technical networks to support the entire development and construction lifecycle.",
    solutionsEyebrow: "Multidisciplinary Engineering Coordination and Comprehensive Engineering, Design and Expert Solutions",
    solutionsTitle: "Solutions",
    engineeringCycle: "UPSTRUX possesses the capability to coordinate and manage complex engineering and investment projects requiring interaction between multiple technical disciplines, specialized expert teams and stakeholders throughout the construction and investment process. Our approach extends beyond the development of individual design solutions and is based on the effective integration of architects, structural engineers, geotechnical engineers, hydraulic engineers, transport engineers, surveyors and technical consultants within a unified project environment. Through an integrated approach and coordination across all project stages — from concept development to project delivery — UPSTRUX provides sustainable engineering solutions and optimization of project scope, financial, technical and human resources, schedule parameters, quality management and project risk.",
    competenceTitle: "Areas of Competence",
    competenceIntro: "UPSTRUX combines engineering, design, construction and consulting expertise across key areas of the construction investment process.",
    competences: [
    "Architecture, urban planning, spatial planning and territorial management.",
    "Structural design and engineering of buildings and facilities.",
    "Assessment and testing of structures, facilities and bridges.",
    "Seismic assessment, strengthening and retrofitting of structures.",
    "Transport and road infrastructure construction, transport facilities and railway engineering.",
    "Geodesy, geoinformatics, cadastre, engineering surveying and spatial data management.",
    "Geotechnical engineering, building physics, construction materials, laboratory testing, technical expertise and sustainable construction.",
    "Water supply and sewerage, hydraulic engineering, hydrology, environmental engineering and environmental protection.",
    "Construction technology and mechanization, BIM, digitalization and information technologies in construction.",
    "Construction organization, management and economics, investment planning and construction project management.",
    "Regulatory compliance, technical consulting, expert services and consulting in the construction investment sector.",
    ],
    methodologyTitle: "From concept to delivery",
    methodologyIntro: "Our project management and delivery framework is based on internationally recognized practices that support successful initiation, detailed planning, efficient execution, monitoring and successful completion of each project. This structured methodology ensures alignment with best practices in project management.",
    contactPage: {eyebrow: "Contacts", title: "Get in touch with UPSTRUX", intro: "Get in touch with UPSTRUX for consultations, engineering, design and project coordination inquiries.",},
    footer: { quick: "Quick links", follow: "Follow", solutions: "Solutions", contacts: "Contacts", rights: "© 2026 UPSTRUX. All rights reserved.", location: "Sofia 1000, Bulgaria", legalTitle: "Terms of Use", legalInfo: "Legal", privacy: "Privacy", backHome: "← Back to homepage" },
    learnMore: "Learn more →",
    services: enServices,
    processSteps: enProcessSteps,
    legalPages: legalPages.en,
  },
  de: {
    nav: { home: "Start", about: "Über Uns", solutions: "LÖSUNGEN", contacts: "Kontakt" },
    heroTitle: ["Ingenieurwesen, das Vision", "mit Realität verbindet"],
    aboutLabel: "Bau-, Tragwerksplanungs- und Bauleitungsingenieure",
    aboutTitle: "Über Uns",
    aboutP1: "UPSTRUX vereint Bauingenieure, Tragwerksplaner, Bauleiter und Projektingenieure mit Expertise in der Koordination komplexer Projekte, die eine effiziente Zusammenarbeit zwischen unterschiedlichen technischen Fachdisziplinen, spezialisierten Expertenteams und Projektbeteiligten über den gesamten Projektlebenszyklus hinweg erfordern — von der Projektinitiierung und Planung über Ausführung, Monitoring und Controlling bis hin zum Projektabschluss.",
    aboutP2: "Durch einen integrierten Ansatz sowie die Steuerung und Überwachung sämtlicher Projektphasen bietet UPSTRUX nachhaltige Ingenieurlösungen, Ressourcenoptimierung sowie ein effizientes Management des Projektumfangs, der technischen, finanziellen und terminlichen Projektparameter.",
    aboutP3: "Wir verstehen ein Projekt dann als erfolgreich, wenn es den geltenden gesetzlichen und regulatorischen Anforderungen entspricht, die Erwartungen des Auftraggebers erfüllt und zugleich wirtschaftlich effizient bleibt.",
    aboutHighlight: "Dank des hohen Spezialisierungsgrades unseres Partnernetzwerks vereint UPSTRUX ingenieurtechnische Expertise, integriertes Management während der Projektdurchführung sowie den Zugang zu spezialisierten technischen Netzwerken zur Unterstützung des gesamten Entwicklungs- und Bauprozesses.",
    solutionsEyebrow: "Multidisziplinäre Ingenieurkoordination und ganzheitliche Ingenieur-, Planungs- und Sachverständigenlösungen",
    solutionsTitle: "Lösungen",
    engineeringCycle: "UPSTRUX verfügt über die Fähigkeit, komplexe Ingenieur- und Investitionsprojekte zu koordinieren und zu steuern, die eine enge Zusammenarbeit zwischen unterschiedlichen technischen Fachbereichen, spezialisierten Expertenteams sowie allen Beteiligten des Bau- und Investitionsprozesses erfordern. Unser Ansatz geht über die Entwicklung einzelner Planungslösungen hinaus und basiert auf der effektiven Integration von Architekten, Tragwerksplanern, Geotechnikingenieuren, Wasserbauingenieuren, Verkehrsingenieuren, Vermessungsingenieuren und technischen Beratern innerhalb einer einheitlichen Projektumgebung. Durch einen integrierten Ansatz und die Koordination sämtlicher Projektphasen — von der Konzeptentwicklung bis zur Projektrealisierung — bietet UPSTRUX nachhaltige Ingenieurlösungen sowie die Optimierung des Projektumfangs, der finanziellen, technischen und personellen Ressourcen, der Terminparameter, des Qualitätsmanagements und des Projektrisikomanagements.",
    competenceTitle: "Kompetenzbereiche",
    competenceIntro: "UPSTRUX vereint Ingenieur-, Planungs-, Bau- und Beratungskompetenz in zentralen Bereichen des Bau- und Investitionsprozesses.",
    competences:[ 
    "Architektur, Städtebau, Raumplanung und Flächenmanagement.",
    "Tragwerksplanung und konstruktives Ingenieurwesen für Gebäude und Bauwerke.",
    "Bewertung, Untersuchung und Prüfung von Tragwerken, Bauwerken und Brücken.",
    "Seismische Bewertung, Verstärkung und Nachrüstung von Tragwerken.",
    "Verkehrswegebau, Straßeninfrastruktur, Verkehrsbauwerke und Eisenbahningenieurwesen.",
    "Geodäsie, Geoinformatik, Katasterwesen, Ingenieurvermessung und Management räumlicher Daten.",
    "Geotechnik, Bauphysik, Baustofftechnik, Laborprüfungen, technische Gutachten und nachhaltiges Bauen.",
    "Wasserversorgung und Abwassertechnik, Wasserbau, Hydrologie, Umwelttechnik und Umweltschutz.",
    "Bautechnologie und Baumechanisierung, BIM, Digitalisierung und Informationstechnologien im Bauwesen.",
    "Bauorganisation, Baumanagement und Bauökonomie, Investitionsplanung sowie Bauprojektmanagement.",
    "Regulatorische Compliance, technische Beratung, Gutachtertätigkeiten und Consulting im Bau- und Investitionssektor.",
    ],
    methodologyTitle: "Vom Konzept bis zur Umsetzung",
    methodologyIntro: "Unser Rahmen für Projektmanagement und Projektausführung basiert auf international anerkannten Praktiken für Initiierung, detaillierte Planung, effiziente Ausführung, Kontrolle und erfolgreichen Projektabschluss.",
    contactPage: {eyebrow: "Kontakt", title: "Kontaktieren Sie UPSTRUX", intro: "Kontaktieren Sie UPSTRUX für Beratungs-, Ingenieur-, Planungs- und Projektkoordinationsanfragen.",},
    footer: { quick: "Schnellzugriff", follow: "Folgen", solutions: "Lösungen", contacts: "Kontakt", rights: "© 2026 UPSTRUX. Alle Rechte vorbehalten.", location: "Sofia 1000, Bulgarien", legalTitle: "Nutzungsbedingungen", legalInfo: "Rechtliche", privacy: "Datenschutz", backHome: "← Zurück zur Startseite" },
    learnMore: "Mehr erfahren →",
    services: deServices,
    processSteps: deProcessSteps,
    legalPages: legalPages.de,
  },
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-+|-+$/g, "");
}

function runContentChecks() {
  console.assert(heroSlides.length === 5, "Hero slider should include 5 images.");
  console.assert(serviceImages.length === 8, "There should be 8 service images.");
  console.assert(bgServices.length === serviceImages.length, "Bulgarian services should match service images.");
  console.assert(enServices.length === serviceImages.length, "English services should match service images.");
  console.assert(deServices.length === serviceImages.length, "German services should match service images.");
  console.assert(bgProcessSteps.length === 5, "Bulgarian version should include 5 process stages.");
  console.assert(enProcessSteps.length === 5, "English version should include 5 process stages.");
  console.assert(deProcessSteps.length === 5, "German version should include 5 process stages.");
  console.assert(translations.bg.footer.backHome !== translations.en.footer.backHome, "Back button should change by language.");
  console.assert(translations.en.footer.backHome !== translations.de.footer.backHome, "English and German back buttons should be different.");
  console.assert(SOCIAL_LINKS.linkedin.startsWith("https://www.linkedin.com"), "LinkedIn footer link should point to LinkedIn.");
  console.assert(SOCIAL_LINKS.facebook.startsWith("https://www.facebook.com"), "Facebook footer link should point to Facebook.");
}
if (process.env.NODE_ENV !== "production") {
  runContentChecks();
}

function SectionDivider({ className = "" }) {
  return (
    <div
      className={`mx-auto h-px w-full max-w-7xl bg-blue-600 ${className}`}
    />
  );
}

function HeroSlide({ image, index }) {
  return (
    <motion.div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
      initial={{ opacity: index === 0 ? 1 : 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ ...HERO_TRANSITION, delay: index * 6 }}
    />
  );
}

function MobileMenuButton({ mobileMenuOpen, setMobileMenuOpen }) {
  return (
    <button
      type="button"
      className="cursor-pointer p-2"
      onClick={() => setMobileMenuOpen((open) => !open)}
    >
      {mobileMenuOpen ? (
        <span className="text-[34px] font-light leading-none text-blue-600">
          X
        </span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-900"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      )}
    </button>
  );
}

const ZigZagService = memo(function ZigZagService({ title, text, image, reverse, servicePage, setCurrentPage, learnMoreLabel }) {
  const bulletItems = useMemo(
    () => text.split(";").map((item) => item.trim()).filter(Boolean),
    [text]
  );
  const hasServicePage = SERVICE_PAGE_KEYS.includes(servicePage);

  const textBlock = (
    <div className="max-w-[640px]">
      <h3 className="text-2xl font-light leading-[1.12] tracking-[-0.025em] text-[#111111] md:text-3xl">{title}</h3>
      <ul className="mt-5 space-y-2 text-[15px] leading-6 text-slate-700">
        {bulletItems.map((item) => (
          <li key={item} className="flex gap-3"><span className="mt-0.5 text-base text-blue-600">✓</span><span>{item}</span></li>
        ))}
      </ul>
      {hasServicePage && (
        <button
          type="button"
          onClick={() => setCurrentPage(servicePage)}
          className={LEARN_MORE_BUTTON_CLASS}
        >
          {learnMoreLabel}
        </button>
      )}
    </div>
  );

  const imageBlock = (
    <div className="overflow-hidden bg-white">
      <img
        src={image}
        alt={title}
        loading="lazy"
        decoding="async"
        className="aspect-[2/1] w-full object-cover min-h-[420px] sm:min-h-[560px] lg:min-h-[620px]"
      />
    </div>
  );

  return (
    <motion.div id={`service-${slugify(title)}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="scroll-mt-28 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      {reverse ? <><div className="order-2 lg:order-1">{imageBlock}</div><div className="order-1 lg:order-2">{textBlock}</div></> : <>{textBlock}{imageBlock}</>}
    </motion.div>
  );
});

function ProcessStep({ step, index }) {
  const isRight = index === 1 || index === 3;
  const isCompact = index > 0;
  const sizeClass = index === 0 ? "w-full max-w-[620px] min-h-[260px] p-5 sm:min-h-[230px] lg:min-h-[230px]" : index === 1 ? "w-full max-w-[620px] min-h-[240px] p-5 sm:min-h-[210px] lg:min-h-[210px]" : "w-full max-w-[620px] min-h-[220px] p-5 sm:min-h-[190px] lg:min-h-[190px]";
  return (
    <div className={`relative flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`pointer-events-none absolute top-1/2 hidden h-px bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500 lg:block ${isRight ? "left-0 right-[78%]" : "left-[78%] right-0"}`} />
      <span className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-2xl font-light leading-[1.1] tracking-[-0.025em] text-[#111111] md:text-3xl lg:block ${index === 3 ? "left-[24%]" : isRight ? "left-[28%]" : "right-[28%]"}`}>{step.title}</span>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className={`${sizeClass} relative z-10 flex h-auto flex-col justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-600 via-indigo-700 to-red-500 transition duration-300 hover:-translate-y-1`}>
        <div className={`flex flex-1 flex-col justify-center text-white/90 ${isCompact ? "gap-3" : "gap-4"}`}>
          <p className="text-sm leading-5 sm:text-[18px]">{step.body}</p>
        </div>
      </motion.div>
    </div>
  );
}


function ServiceDetailPage({ service, t, setCurrentPage, mobileMenuOpen, setMobileMenuOpen, language, setLanguage, navItems }) {
  const bulletItems = useMemo(
    () => service.text.split(";").map((item) => item.trim()).filter(Boolean),
    [service.text]
  );

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="relative bg-white px-6 pt-12 pb-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 md:flex-row md:items-start md:justify-between lg:pr-20">
          <button type="button" onClick={() => setCurrentPage("home")}>
            <Logo footer />
          </button>
    <div className="flex justify-center mt-1 md:hidden">
  <MobileMenuButton
    mobileMenuOpen={mobileMenuOpen}
    setMobileMenuOpen={setMobileMenuOpen}
  />
</div>
          <nav className={`${mobileMenuOpen ? "flex" : "hidden"} absolute left-1/2 top-full mt-1 -translate-x-1/2 w-auto flex-col items-start gap-3 rounded-xl bg-slate-950/85 px-4 py-4 text-left text-sm font-light uppercase tracking-[0.14em] text-white backdrop-blur md:static md:left-auto md:top-auto md:mt-0 md:flex md:w-auto md:max-w-none md:translate-x-0 md:flex-row md:items-center md:gap-12 md:border-0 md:bg-transparent md:p-0 md:text-white md:backdrop-blur-0`}>
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.key === "contacts" ? "#contact-page" : item.href}
                onClick={(e) => {
                  e.preventDefault();
                  if (item.key === "solutions") {
                    setCurrentPage("solutions");
                  } else if (item.key === "contacts") {
                    setCurrentPage("contact");
                  } else {
                    setCurrentPage("home");
                    setTimeout(() => {
                      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                    }, 50);
                  }
                  setMobileMenuOpen(false);
                }}
                className="uppercase tracking-[0.14em] transition-colors hover:text-blue-300"
              >
                {item.label}
              </a>
            ))}
            <div className="flex items-center gap-2 text-xs font-light tracking-[0.12em]">
              {LANGUAGE_CODES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setLanguage(lang);
                    setMobileMenuOpen(false);
                  }}
                  className={`cursor-pointer uppercase transition hover:text-blue-600 ${language === lang ? "text-blue-600" : "text-slate-900"}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="bg-white px-6 pt-32 pb-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
            {t.solutionsTitle}
          </p>
          <h1 className="mt-3 max-w-5xl text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">
            {service.title}
          </h1>
          <SectionDivider className="my-10" />
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden bg-white">
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className="aspect-[2/1] w-full object-cover min-h-[420px] sm:min-h-[560px] lg:min-h-[620px]"
              />
            </div>
            <div className="max-w-[640px]">
              <ul className="space-y-2 text-[15px] leading-6 text-slate-700">
                {bulletItems.map((item) => (
                  <li key={item} className="flex gap-3"><span className="mt-0.5 text-base text-blue-600">✓</span><span>{item}</span></li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setCurrentPage("solutions")}
                className={BACK_BUTTON_CLASS}
              >
                {t.footer.backHome}
              </button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter t={t} setCurrentPage={setCurrentPage} />
    </div>
  );
}

function LegalContentPage({ page, onBack, backLabel }) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="bg-white px-6 pt-12 pb-8"><div className="mx-auto flex max-w-7xl flex-col items-start justify-start gap-4"><button type="button" onClick={onBack} aria-label="Back to homepage" className="text-left"><Logo footer /></button></div></header>
      <div className="mx-auto flex w-full max-w-7xl justify-start px-6 pt-4"><button type="button" onClick={onBack} className={NAV_LINK_BUTTON_CLASS}>{backLabel}</button></div>
      <main>
  <section className="px-6 py-24">
    <div className="mx-auto max-w-5xl">

      <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
        {page.eyebrow}
      </p>

      <h1 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">
        {page.title}
      </h1>

      <p className="mt-3 text-sm text-slate-500">
        {page.updated}
      </p>

      <p className="mt-8 text-lg leading-8 text-slate-700">
        {page.intro}
      </p>

      <SectionDivider className="my-10" />

      <div className="space-y-8 pt-2">
        {page.sections.map((section) => (
          <article key={section.heading}>
            <h2 className="text-xl font-light tracking-[-0.02em] text-[#111111]">
              {section.heading}
            </h2>

            <p className="mt-3 text-base leading-7 text-slate-700">
              {section.body}
            </p>
          </article>
        ))}
      </div>

    </div>
  </section>
</main>
    </div>
  );
}
function SiteFooter({ t, setCurrentPage }) {
  const goToSection = useCallback((sectionId) => {
    setCurrentPage("home");

    setTimeout(() => {
      document.querySelector(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }, [setCurrentPage]);

  return (
    <footer id="contact" className="border-t border-slate-200 bg-white px-6 pt-10">
      <div className="mx-auto grid max-w-7xl items-start gap-12 pb-10 md:grid-cols-5">
        <div><Logo footer /></div>

        <div>
          <h3 className="mb-4 text-sm font-light tracking-[0.08em] text-slate-900">
            {t.footer.quick}
          </h3>

          <div className="grid gap-2 text-[13px] text-slate-700">
            <button type="button" onClick={() => goToSection("#home")} className="text-left hover:text-blue-600">
              {t.nav.home}
            </button>

            <button type="button" onClick={() => goToSection("#about")} className="text-left hover:text-blue-600">
              {t.nav.about}
            </button>

            <button type="button" onClick={() => setCurrentPage("solutions")} className="text-left hover:text-blue-600">
              {t.footer.solutions}
            </button>

            <button type="button" onClick={() => setCurrentPage("contact")} className="text-left hover:text-blue-600">
              {t.footer.contacts}
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-light tracking-[0.08em] text-slate-900">
            {t.footer.legalTitle}
          </h3>

          <div className="grid gap-2 text-[13px] text-slate-700">
            <button type="button" onClick={() => setCurrentPage("legal")} className="text-left hover:text-blue-600">
              {t.footer.legalInfo}
            </button>

            <button type="button" onClick={() => setCurrentPage("privacy")} className="text-left hover:text-blue-600">
              {t.footer.privacy}
            </button>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-light tracking-[0.08em] text-slate-900">
            {t.footer.follow}
          </h3>

          <div className="flex items-center gap-3 pt-1 leading-none">
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center text-blue-600 hover:text-blue-700">
              <LinkedInIcon size={24} />
            </a>

            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center text-blue-600 hover:text-blue-700">
              <FacebookIcon size={24} />
            </a>
          </div>
        </div>

        <div className="justify-self-start text-left">
          <h3 className="mb-4 text-sm font-light tracking-[0.08em] text-slate-900">
            {t.footer.contacts}
          </h3>

          <div className="space-y-2.5 text-[13px] text-slate-700">
            <div className="flex items-center gap-2.5">
              <PinIcon size={16} className="shrink-0 text-blue-600" />
              <span>{t.footer.location}</span>
            </div>

            <div className="hidden flex items-center gap-2.5">
              <PhoneIcon size={16} className="shrink-0 text-blue-600" />
              <span>+359 888 000 000</span>
            </div>

            <div className="flex items-center gap-2.5">
              <MailIcon size={16} className="shrink-0 text-blue-600" />
              <span>info@upstrux.bg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 py-4 text-xs text-slate-500">
        {t.footer.rights}
      </div>
    </footer>
  );
}
function ContactPage({ t, setCurrentPage, mobileMenuOpen, setMobileMenuOpen, language, setLanguage, navItems }) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="relative bg-white px-6 pt-12 pb-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 md:flex-row md:items-start md:justify-between lg:pr-20">
          <button type="button" onClick={() => setCurrentPage("home")}>
            <Logo footer />
          </button>
          <div className="flex justify-center mt-1 md:hidden">
  <MobileMenuButton
    mobileMenuOpen={mobileMenuOpen}
    setMobileMenuOpen={setMobileMenuOpen}
  />
</div>
          <nav className={`${mobileMenuOpen ? "flex" : "hidden"} absolute left-1/2 top-full mt-1 -translate-x-1/2 w-auto flex-col gap-3 rounded-xl bg-white px-6 py-4 text-sm font-light uppercase tracking-[0.14em] text-slate-900 shadow-lg md:static md:left-auto md:top-auto md:mt-0 md:flex md:w-auto md:max-w-none md:translate-x-0 md:flex-row md:items-center md:gap-12 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-slate-900 md:shadow-none`}>
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  if (item.key === "solutions") {
                    setCurrentPage("solutions");
                  } else if (item.key === "contacts") {
                    setCurrentPage("contact");
                  } else {
                    setCurrentPage("home");
                    setTimeout(() => {
                      document.querySelector(item.href)?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }, 50);
                  }

                  setMobileMenuOpen(false);
                }}
                className="uppercase tracking-[0.14em] transition-colors hover:text-blue-600"
              >
                {item.label}
              </button>
            ))}

            <div className="flex items-center gap-2 text-xs font-light tracking-[0.12em]">
              {LANGUAGE_CODES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setLanguage(lang);
                    setMobileMenuOpen(false);
                  }}
                  className={`cursor-pointer uppercase transition hover:text-blue-600 ${
                    language === lang ? "text-blue-600" : "text-slate-900"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>
    
      <main className="bg-white px-6 pt-32 pb-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
          {t.contactPage.eyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">
           {t.contactPage.title}
          </h1>

          <p className="mt-8 max-w-5xl text-lg leading-8 text-slate-600">
            {t.contactPage.intro}
          </p>

          <SectionDivider className="my-10" />

          <div className="mt-20 grid gap-8 md:grid-cols-3">
            <a
              href="mailto:info@upstrux.bg"
              className="p-2"
            >
              <MailIcon className="text-blue-600" />
              <p className="mt-5 text-[15px] leading-6 text-slate-700">
                info@upstrux.bg
              </p>
            </a>
            <div className="p-2">
                <PinIcon className="text-blue-600" />
                <p className="mt-5 text-[15px] leading-6 text-slate-700">
                  {t.footer.location}
                </p>
              </div>
            <a>
              <PhoneIcon className="hidden text-blue-600" />
              <p className="hidden mt-5 text-[15px] leading-6 text-slate-700">
                +359 888 000 000
              </p>
            </a>
          </div>
        </div>
      </main>
    <SiteFooter t={t} setCurrentPage={setCurrentPage} />
    </div>
  );
}
export default function UpstruxWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const initialRouteInfo = useMemo(() => {
    if (typeof window === "undefined") {
      return { page: "home", language: DEFAULT_LANGUAGE };
    }
    return getRouteInfo(window.location.pathname);
  }, []);
  const [currentPage, setCurrentPageState] = useState(initialRouteInfo.page);
  const [scrollTarget, setScrollTarget] = useState(initialRouteInfo.sectionId || null);
  const [language, setLanguageState] = useState(initialRouteInfo.language || DEFAULT_LANGUAGE);

  const setCurrentPage = useCallback((page) => {
    setCurrentPageState(page);
    setScrollTarget(null);

    if (typeof window !== "undefined") {
      window.history.pushState(
        { page, language },
        "",
        getLocalizedPath(page, language)
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [language]);

  const setLanguage = useCallback((nextLanguage) => {
    if (!LANGUAGE_CODES.includes(nextLanguage)) return;

    setLanguageState(nextLanguage);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("upstruxLanguage", nextLanguage);
      window.history.pushState(
        { page: currentPage, language: nextLanguage },
        "",
        getLocalizedPath(currentPage, nextLanguage)
      );
    }
  }, [currentPage]);

  const t = translations[language];
  useEffect(() => {
    const baseTitle = PAGE_TITLES[language]?.[currentPage] || PAGE_TITLES.en[currentPage] || "UPSTRUX";

    if (SERVICE_PAGE_KEYS.includes(currentPage)) {
      const serviceIndex = SERVICE_PAGE_KEYS.indexOf(currentPage);
      const serviceTitle = t.services?.[serviceIndex]?.title;
      document.title = serviceTitle ? `${serviceTitle} | UPSTRUX` : baseTitle;
      return;
    }

    document.title = baseTitle;
  }, [currentPage, language, t]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (currentPage !== "home" && currentPage !== "about") return;

    const updateTitleByScroll = () => {
      const sectionIds = ["about", "competence", "methodology"];
      const activeSectionId = sectionIds.reduce((activeId, sectionId) => {
        const section = document.getElementById(sectionId);
        if (!section) return activeId;

        const rect = section.getBoundingClientRect();
        return rect.top <= window.innerHeight * 0.45 ? sectionId : activeId;
      }, "home");

      const sectionTitle = SECTION_TITLES[language]?.[activeSectionId];

      if (sectionTitle) {
        document.title = sectionTitle;
      } else {
        document.title = PAGE_TITLES[language]?.home || PAGE_TITLES.en.home;
      }
    };

    updateTitleByScroll();
    window.addEventListener("scroll", updateTitleByScroll, { passive: true });
    window.addEventListener("resize", updateTitleByScroll);

    return () => {
      window.removeEventListener("scroll", updateTitleByScroll);
      window.removeEventListener("resize", updateTitleByScroll);
    };
  }, [currentPage, language]);

  useEffect(() => {
    let metaDescription = document.querySelector(
      'meta[name="description"]'
    );

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      META_DESCRIPTIONS[language] || META_DESCRIPTIONS.en
    );
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canonicalPageKey = getCanonicalPageKey(
      currentPage,
      window.location.pathname
    );

    document
      .querySelectorAll('link[data-upstrux-seo-link="true"]')
      .forEach((link) => link.remove());

    const addSeoLink = (attributes) => {
      const link = document.createElement("link");

      Object.entries(attributes).forEach(([key, value]) => {
        link.setAttribute(key, value);
      });

      link.setAttribute("data-upstrux-seo-link", "true");
      document.head.appendChild(link);
    };

    addSeoLink({
      rel: "canonical",
      href: getAbsoluteUrl(getLocalizedPath(canonicalPageKey, language)),
    });

    LANGUAGE_CODES.forEach((lang) => {
      addSeoLink({
        rel: "alternate",
        hreflang: lang,
        href: getAbsoluteUrl(getLocalizedPath(canonicalPageKey, lang)),
      });
    });

    addSeoLink({
      rel: "alternate",
      hreflang: "x-default",
      href: getAbsoluteUrl(getLocalizedPath(canonicalPageKey, DEFAULT_LANGUAGE)),
    });
  }, [currentPage, language]);



  const currentServices = useMemo(
    () => t.services.map((service, index) => ({ ...service, image: serviceImages[index] })),
    [t.services]
  );
  const currentProcessSteps = t.processSteps;
  const navItems = useMemo(() => [
    { key: "home", label: t.nav.home, href: "#home" },
    { key: "about", label: t.nav.about, href: "#about" },
    { key: "solutions", label: t.nav.solutions, href: "solutions" },
    { key: "contacts", label: t.nav.contacts, href: "contact" },
  ], [t.nav.about, t.nav.contacts, t.nav.home, t.nav.solutions]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = () => {
      const routeInfo = getRouteInfo(window.location.pathname);
      setCurrentPageState(routeInfo.page);
      setScrollTarget(routeInfo.sectionId || null);
      setLanguageState(routeInfo.language || DEFAULT_LANGUAGE);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !scrollTarget) return;
    if (currentPage !== "home" && currentPage !== "about") return;

    const timeoutId = window.setTimeout(() => {
      document.getElementById(scrollTarget)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setScrollTarget(null);
    }, 120);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [currentPage, scrollTarget]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("upstruxLanguage", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);


  const servicePageIndex = SERVICE_PAGE_KEYS.indexOf(currentPage);
  if (servicePageIndex !== -1) {
    return (
      <ServiceDetailPage
        service={currentServices[servicePageIndex]}
        t={t}
        setCurrentPage={setCurrentPage}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        language={language}
        setLanguage={setLanguage}
        navItems={navItems}
      />
    );
  }


  if (currentPage === "legal") return <LegalContentPage page={t.legalPages.legal} onBack={() => setCurrentPage("home")} backLabel={t.footer.backHome} />;
  if (currentPage === "privacy") return <LegalContentPage page={t.legalPages.privacy} onBack={() => setCurrentPage("home")} backLabel={t.footer.backHome} />;
  if (currentPage === "contact") {
  return (
    <ContactPage
      t={t}
      setCurrentPage={setCurrentPage}
      mobileMenuOpen={mobileMenuOpen}
      setMobileMenuOpen={setMobileMenuOpen}
      language={language}
      setLanguage={setLanguage}
      navItems={navItems}
    />
  );
}
  if (currentPage === "solutions") {
  return (
    <div className="min-h-screen bg-white text-slate-950">
       <header className="relative bg-white px-6 pt-12 pb-8">
  <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 md:flex-row md:items-start md:justify-between lg:pr-20">
    <button type="button" onClick={() => setCurrentPage("home")}>
      <Logo footer />
    </button>
   <div className="flex justify-center mt-1 md:hidden">
  <MobileMenuButton
    mobileMenuOpen={mobileMenuOpen}
    setMobileMenuOpen={setMobileMenuOpen}
  />
</div>
    <nav className={`${mobileMenuOpen ? "flex" : "hidden"} absolute left-1/2 top-full mt-1 -translate-x-1/2 w-auto flex-col gap-3 rounded-xl bg-white px-6 py-4 text-sm font-light uppercase tracking-[0.14em] text-slate-900 shadow-lg md:static md:left-auto md:top-auto md:mt-0 md:flex md:w-auto md:max-w-none md:translate-x-0 md:flex-row md:items-center md:gap-12 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:text-slate-900 md:shadow-none`}>
  {navItems.map((item) => (
  <a
    key={item.key}
    href={item.key === "contacts" ? "#contact-page" : item.href}
    onClick={(e) => {
      e.preventDefault();

      if (item.key === "solutions") {
        setCurrentPage("solutions");
      } else if (item.key === "contacts") {
        setCurrentPage("contact");
      } else {
        setCurrentPage(item.key === "about" ? "about" : "home");
        setTimeout(() => {
          document.querySelector(item.href)?.scrollIntoView({
            behavior: "smooth",
          });
        }, 50);
      }

      setMobileMenuOpen(false);
    }}
    className="uppercase tracking-[0.14em] transition-colors hover:text-blue-300"
  >
    {item.label}
  </a>
))}
  <div className="flex items-center gap-2 text-xs font-light tracking-[0.12em]">
    {LANGUAGE_CODES.map((lang) => (
      <button
        key={lang}
        type="button"
        onClick={() => {
          setLanguage(lang);
          setMobileMenuOpen(false);
        }}
        className={`cursor-pointer uppercase transition hover:text-blue-600 ${
          language === lang ? "text-blue-600" : "text-slate-900"
        }`}
      >
        {lang}
      </button>
    ))}
  </div>
</nav>
  </div>
</header>
      <main className="bg-white px-6 pt-32 pb-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">
            {t.solutionsEyebrow}
          </p>

          <h1 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">
            {t.solutionsTitle}
          </h1>
          <p className="mt-8 max-w-5xl text-lg leading-8 text-slate-600">
          {t.engineeringCycle}
          </p>
          <SectionDivider className="my-10"/>
          <div className="mt-20 space-y-20">
            {currentServices.map((service, index) => (
            <ZigZagService
              key={service.title}
              title={service.title}
              text={service.text}
              image={service.image}
              reverse={index % 2 === 1}
              servicePage={`service${index + 1}`}
              setCurrentPage={setCurrentPage}
              learnMoreLabel={t.learnMore}
            />
          ))}
          </div>
        </div>
      </main>
    <SiteFooter t={t} setCurrentPage={setCurrentPage} />
    </div>
  );
}

  return (
    <div className="min-h-screen bg-white text-slate-950">
    <header className="absolute left-0 right-0 top-0 z-50 pt-12 text-white">
  <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 md:flex-row md:items-start md:justify-between lg:pr-20">
    <a href="#home" aria-label="UPSTRUX home">
      <Logo />
    </a>
<div className="flex justify-center mt-1 md:hidden">
  <MobileMenuButton
    mobileMenuOpen={mobileMenuOpen}
    setMobileMenuOpen={setMobileMenuOpen}
  />
</div>
    <nav className={`${mobileMenuOpen ? "flex" : "hidden"} absolute left-1/2 top-full mt-1 -translate-x-1/2 w-auto min-w-[210px] flex-col items-start gap-3 rounded-xl bg-slate-950/85 px-6 py-4 text-left text-sm font-light uppercase tracking-[0.14em] text-white backdrop-blur md:static md:left-auto md:top-auto md:mt-0 md:flex md:w-auto md:min-w-0 md:max-w-none md:translate-x-0 md:flex-row md:items-center md:gap-12 md:border-0 md:bg-transparent md:p-0 md:text-white md:backdrop-blur-0`}>
    {navItems.map((item) => (
  <button
    key={item.key}
    type="button"
    onClick={() => {
      if (item.key === "solutions") {
        setCurrentPage("solutions");
      } else if (item.key === "contacts") {
        setCurrentPage("contact");
      } else {
        setCurrentPage(item.key === "about" ? "about" : "home");
        setTimeout(() => {
          document.querySelector(item.href)?.scrollIntoView({
            behavior: "smooth",
          });
        }, 50);
      }

      setMobileMenuOpen(false);
    }}
    className="uppercase tracking-[0.14em] transition-colors hover:text-blue-300"
  >
    {item.label}
  </button>
))}
      <div className="flex items-center gap-2 text-xs font-light tracking-[0.12em]">
        {LANGUAGE_CODES.map((lang) => (
          <button
            key={lang}
            type="button"
            onClick={() => {
              setLanguage(lang);
              setMobileMenuOpen(false);
            }}
            className={`cursor-pointer uppercase transition hover:text-blue-300 ${
              language === lang ? "text-blue-300" : "text-white"
            }`}
          >
            {lang}
          </button>
        ))}
      </div>
    </nav>
  </div>
</header>
      <main>
<section id="home" className="relative h-[1080px] overflow-hidden bg-slate-900"><div className="absolute inset-0">{heroSlides.map((image, index) => <HeroSlide key={String(image)} image={image} index={index} />)}</div><div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-transparent" /><div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-20"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl text-white"><h1 className="text-3xl font-light leading-[1.05] tracking-[-0.025em] md:text-5xl">{t.heroTitle.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h1></motion.div></div></section>
<section id="about" className="bg-white px-6 py-28"><div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2"><div><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">{t.aboutLabel}</p><h2 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">{t.aboutTitle}</h2><p className="mt-8 text-lg leading-8 text-slate-700">{t.aboutP1}</p><p className="mt-5 text-lg leading-8 text-slate-700">{t.aboutP2}</p><div className="mt-7 border-l-4 border-blue-600 bg-white px-8 py-5"><p className="text-xl font-light leading-7 tracking-[-0.02em] text-[#111111]">{t.aboutHighlight}</p></div></div><div className="overflow-hidden bg-white w-full max-w-[900px]"><img src={about1} alt="UPSTRUX engineering" className="h-[650px] w-full object-cover object-center md:h-[720px]"/></div></div></section>
<section id="competence" className="bg-white px-6 py-20">
  <div className="mx-auto max-w-7xl">

    <div className="mb-10 max-w-5xl text-left">
      <h3 className="text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">
        {t.competenceTitle}
      </h3>

      <p className="mt-4 text-lg leading-8 text-slate-600">
        {t.competenceIntro}
      </p>
    </div>

    <div className="grid gap-x-14 gap-y-4 md:grid-cols-2">
      {t.competences.map((item) => (
        <div
          key={item}
          className="flex items-start gap-3"
        >
          <span className="mt-[2px] text-lg text-blue-600">
            ✓
          </span>

          <p className="text-[15px] leading-6 text-slate-700">
            {item}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>
<section id="methodology" className="bg-white px-6 py-20">
  <div className="mx-auto max-w-7xl">
    <div className="mb-20 text-left">
      <h3 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">
        {t.methodologyTitle}
      </h3>

      <p className="mt-6 max-w-5xl text-lg leading-8 text-slate-600">
        {t.methodologyIntro}
      </p>
    </div>

    <div className="flex flex-col gap-4">
      {currentProcessSteps.map((step, index) => (
        <ProcessStep
          key={step.title}
          step={step}
          index={index}
        />
      ))}
    </div>
  </div>
</section>
        <SiteFooter t={t} setCurrentPage={setCurrentPage} />
      </main>
    </div>
  );
}
