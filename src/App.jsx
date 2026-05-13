import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const images = {
  whiteArchitecture: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=90",
  nightShift: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=90",
  industrial: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=90",
  dam: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=90",
  structure: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=90",
  steel: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2200&q=90",
  technology: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90",
  management: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=90",
};

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

const heroSlides = [images.dam, images.industrial, images.nightShift, images.structure, images.technology, images.management, images.steel, images.whiteArchitecture];
const serviceImages = [images.industrial, images.steel, images.technology, images.structure, images.management, images.nightShift];

const bgServices = [
  { title: "Проектиране на строителни конструкции и съоръжения", text: "Проектиране на сгради, съоръжения и инженерна инфраструктура; Изработване на идейни, технически и работни проекти; Конструктивни изчисления, статически и динамични анализи, сеизмично инженерство; Геоложки, геотехнически, хидрогеоложки, сондажни и укрепителни проучвания; Обследване и изпитване на строителни конструкции; Сеизмична оценка, възстановяване и усилване на строителни конструкции; BIM моделиране, координация и интегрирани инженерни решения" },
  { title: "Геодезия и кадастър", text: "Геодезическо заснемане на поземлени имоти; Трасиране на сгради, съоръжения и регулационни линии; Вертикално планиране и нивелация; Кадастрални услуги и изготвяне на документация; Изработване на комбинирани скици и ситуационни планове; Контролни геодезически измервания по време на строителство; Геодезическо заснемане за узаконяване и въвеждане в експлоатация; 3D моделиране на терени и обекти" },
  { title: "Разработване и внедряване на технологии в строителството", text: "Разработване на технологични проекти, ПОИС, ППР и технологични карти; Организация на строителната площадка, строителна логистика; Избор и внедряване на строителни технологии, механизация, кофражни системи и строителни методи; Контрол и управление на строителни материали, машини, съоръжения и технологично оборудване; Координация по безопасност и здраве при работа (БЗР)" },
  { title: "Строително-монтажни работи (СМР)", text: "Изпълнение на строително-монтажни, ремонтни, реконструкционни, рехабилитационни и аварийно-възстановителни работи; Груб строеж, довършителни работи, монтаж на конструкции, фасади, покриви и инженерни инсталации; Изграждане на жилищни, административни, промишлени, търговски, обществени и инфраструктурни обекти; Изпълнение на пътна, транспортна, енергийна, техническа и ВиК инфраструктура; Поддръжка, модернизация и техническо обслужване на строежи и съоръжения" },
  { title: "Организация и управление на строителството", text: "Инвестиционно планиране, подготовка и реализация на строителни и инвестиционни проекти; Оптимизация на строителни процеси и ресурси; Управление на строителството, техническо ръководство; Инвеститорски контрол, технически контрол, количествено-стойностни сметки и договорно администриране; Въвеждане в експлоатация, координация между участници в строителния процес и управление на строителни активи" },
  { title: "Допълнителни поддържащи дейности", text: "Доставка, търговия, внос и износ на строителни материали, машини, съоръжения и оборудване; Логистика, транспорт, спедиция, складова и снабдителна дейност; Научноизследователска, развойна и иновационна дейност в строителството; Професионално обучение, квалификация и развитие на строителни и инженерни кадри; Посредничество, представителство и консултантска дейност в строително-инвестиционния сектор" },
];

const enServices = [
  { title: "Structural design of buildings and facilities", text: "Design of buildings, facilities and engineering infrastructure; Conceptual, technical and detailed design documentation; Structural calculations, static and dynamic analyses, seismic engineering; Geological, geotechnical, hydrogeological, drilling and retaining structure investigations; Structural assessment and testing of structures; Seismic assessment, retrofitting and strengthening of structures; BIM modelling, coordination and integrated engineering solutions" },
  { title: "Geodesy and cadastre", text: "Geodetic surveying of land plots; Setting out buildings, facilities and regulation lines; Vertical planning and levelling; Cadastral services and documentation; Combined sketches and site plans; Control geodetic measurements during construction; Surveying for legalization and commissioning; 3D modelling of terrain and facilities" },
  { title: "Development and implementation of construction technologies", text: "Development of technological designs, site organization plans, method statements and technology cards; Construction site organization and logistics; Selection and implementation of construction technologies, machinery, formwork systems and construction methods; Control and management of construction materials, machinery, equipment and technological systems; Health and safety coordination" },
  { title: "Construction and installation works", text: "Execution of construction, installation, repair, reconstruction, rehabilitation and emergency restoration works; Shell construction, finishing works, installation of structures, facades, roofs and building services; Construction of residential, administrative, industrial, commercial, public and infrastructure projects; Road, transport, energy, technical and water infrastructure; Maintenance, modernization and technical servicing of buildings and facilities" },
  { title: "Construction organization and management", text: "Investment planning, preparation and delivery of construction and investment projects; Optimization of construction processes and resources; Construction management and technical supervision; Investor control, technical control, bills of quantities and contract administration; Commissioning, coordination between project participants and management of construction assets" },
  { title: "Additional supporting activities", text: "Supply, trade, import and export of construction materials, machinery, facilities and equipment; Logistics, transport, forwarding, warehousing and procurement activities; Research, development and innovation in construction; Professional training, qualification and development of construction and engineering personnel; Mediation, representation and consulting in the construction investment sector" },
];

const deServices = [
  { title: "Tragwerksplanung von Gebäuden und Bauwerken", text: "Planung von Gebäuden, Bauwerken und technischer Infrastruktur; Vor-, Entwurfs- und Ausführungsplanung; Tragwerksberechnungen, statische und dynamische Analysen, Erdbebeningenieurwesen; geologische, geotechnische und hydrogeologische Untersuchungen; Bewertung und Prüfung von Bauwerken; Seismische Bewertung, Nachrüstung und Verstärkung von Bauwerken; BIM-Modellierung und integrierte Ingenieurlösungen" },
  { title: "Geodäsie und Kataster", text: "Vermessung von Grundstücken; Absteckung von Gebäuden, Bauwerken und Grenzen; Höhenplanung und Nivellement; Katasterleistungen und Dokumentation; Lagepläne und kombinierte Skizzen; Kontrollvermessungen während der Bauausführung; Vermessung für Legalisierung und Inbetriebnahme; 3D-Modellierung von Gelände und Objekten" },
  { title: "Entwicklung und Implementierung von Bautechnologien", text: "Technologische Planung, Baustelleneinrichtung, Ausführungs- und Methodenpläne; Baustellenorganisation und Logistik; Auswahl und Einführung von Bautechnologien, Maschinen, Schalungssystemen und Bauverfahren; Kontrolle von Baustoffen, Maschinen und Ausrüstung; Koordination von Arbeitsschutz und Sicherheit" },
  { title: "Bau- und Montagearbeiten", text: "Ausführung von Bau-, Montage-, Reparatur-, Rekonstruktions-, Sanierungs- und Notfallarbeiten; Rohbau, Ausbauarbeiten, Montage von Konstruktionen, Fassaden, Dächern und technischen Anlagen; Wohn-, Verwaltungs-, Industrie-, Gewerbe-, öffentliche und Infrastrukturprojekte; Straßen-, Verkehrs-, Energie-, technische und Wasserinfrastruktur" },
  { title: "Organisation und Management des Bauprozesses", text: "Investitionsplanung, Vorbereitung und Umsetzung von Bau- und Investitionsprojekten; Optimierung von Bauprozessen; Bauleitung und technische Leitung; Bauherrenvertretung, technische Kontrolle, Leistungsverzeichnisse und Vertragsadministration; Inbetriebnahme, Koordination aller Projektbeteiligten und Management von Bauanlagen" },
  { title: "Zusätzliche unterstützende Tätigkeiten", text: "Lieferung, Handel, Import und Export von Baustoffen, Maschinen und Ausrüstung; Logistik, Transport, Spedition, Lagerung und Beschaffung; Forschung, Entwicklung und Innovation im Bauwesen; berufliche Qualifizierung von Bau- und Ingenieurpersonal; Vermittlung, Vertretung und Beratung im Bau- und Investitionssektor" },
];

const bgProcessSteps = [
  { title: "Иницииране", body: "Всеки успешен проект започва със стабилна основа. Дефинираме целите на проекта, оценяваме техническата и финансовата осъществимост, определяме предварителния обхват, идентифицираме заинтересованите страни и разработваме Project Charter.", focus: "Основен фокус: Стратегически цели, заинтересовани страни, осъществимост, законова рамка и официално стартиране." },
  { title: "Планиране", body: "Планирането трансформира проектните цели в детайлна управленска система. Определяне на обхвата, WBS, графици, бюджети, качество, ресурси, комуникации, доставки и рискове.", focus: "Основен фокус: Обхват, график, бюджет, качество, ресурси, риск, доставки и заинтересовани страни." },
  { title: "Изпълнение", body: "Проектът преминава в активна реализация чрез координация на инженерни дейности, проектантски решения, СМР, доставки, управление на екипи и контрол на качеството.", focus: "Основен фокус: Изпълнение, координация, качество, заинтересовани страни и контрол върху реализацията." },
  { title: "Мониторинг и контрол", body: "Осъществяваме постоянен мониторинг спрямо установените базови линии, следим напредъка, управляваме рисковете и контролираме разходите, качеството и промените.", focus: "Основен фокус: Проследяване на изпълнението, управление на промени, риск, качество, прогнози и съответствие." },
  { title: "Закриване", body: "Финалният етап гарантира официално приключване, приемане на изпълнените работи, приключване на договорите, освобождаване на ресурси и архивиране.", focus: "Основен фокус: Официално приемане, финансово приключване, документация, знания и предаване." },
];

const enProcessSteps = [
  { title: "Initiation", body: "Every successful project starts with a solid foundation. We define objectives, assess feasibility, determine preliminary scope, identify stakeholders and develop the Project Charter.", focus: "Main focus: Strategic objectives, stakeholders, feasibility, legal framework and formal project launch." },
  { title: "Planning", body: "Planning transforms project objectives into a detailed management system. We define scope, WBS, schedules, budgets, quality, resources, communications, procurement and risks.", focus: "Main focus: Scope, schedule, budget, quality, resources, risk, procurement and stakeholders." },
  { title: "Execution", body: "The project moves into active delivery through coordination of engineering activities, design solutions, construction works, procurement, team management and quality control.", focus: "Main focus: Execution, coordination, quality, stakeholders and delivery control." },
  { title: "Monitoring and control", body: "We continuously monitor the project against established baselines, track progress, manage risks, control cost, quality and changes through integrated control.", focus: "Main focus: Performance tracking, change management, risk, quality, forecasting and compliance." },
  { title: "Closing", body: "The final stage ensures formal completion of all project activities, acceptance of completed works, contract closure, release of resources and archiving of documentation.", focus: "Main focus: Formal acceptance, financial closure, documentation, knowledge and handover." },
];

const deProcessSteps = [
  { title: "Initiierung", body: "Jedes erfolgreiche Projekt beginnt mit einem soliden Fundament. Wir definieren Ziele, bewerten Machbarkeit, legen den Umfang fest, identifizieren Stakeholder und entwickeln die Projektcharta.", focus: "Fokus: Strategische Ziele, Stakeholder, Machbarkeit, rechtlicher Rahmen und formeller Projektstart." },
  { title: "Planung", body: "Die Planung überführt Projektziele in ein detailliertes Managementsystem. Wir definieren Umfang, PSP, Zeitpläne, Budgets, Qualität, Ressourcen, Kommunikation, Beschaffung und Risiken.", focus: "Fokus: Leistungsumfang, Terminplanung, Budget, Qualität, Ressourcen, Risiken, Beschaffung und Stakeholder." },
  { title: "Ausführung", body: "Das Projekt geht in die aktive Umsetzungsphase über, geprägt durch Ingenieurleistungen, Planungslösungen, Bauausführung, Beschaffung, Teamführung und Qualitätskontrolle.", focus: "Fokus: Umsetzung, Koordination, Qualität, Stakeholder und Lieferkontrolle." },
  { title: "Monitoring und Kontrolle", body: "Wir überwachen das Projekt kontinuierlich anhand der festgelegten Basiswerte, verfolgen Fortschritt, steuern Risiken, Kosten, Qualität und Änderungen.", focus: "Fokus: Leistungsüberwachung, Änderungsmanagement, Risiken, Qualität, Prognosen und Compliance." },
  { title: "Abschluss", body: "Die Abschlussphase gewährleistet die formelle Beendigung aller Projektaktivitäten, Abnahme, Vertragsabschluss, Ressourcenfreigabe und Archivierung.", focus: "Fokus: Formelle Abnahme, finanzieller Abschluss, Dokumentation, Wissenssicherung und Übergabe." },
];

const legalPages = {
  bg: {
    legal: { eyebrow: "Правно", title: "Условия за ползване", updated: "Последна актуализация: 10 май 2026 г.", intro: "Тази страница урежда достъпа и използването на уебсайта на UPSTRUX.", sections: [
      { heading: "1. Информация за дружеството", body: "Настоящите Условия за ползване се издават от UPSTRUX. Пълните фирмени данни следва да бъдат добавени преди официално публикуване." },
      { heading: "2. Информационен характер", body: "Съдържанието има общ информационен характер и не представлява индивидуална техническа, правна или финансова консултация." },
      { heading: "3. Интелектуална собственост", body: "Всички текстове, дизайн, графични елементи и търговски обозначения са собственост на UPSTRUX или се използват на законно основание." },
      { heading: "4. Приложимо право", body: "Настоящите условия се тълкуват съгласно действащото законодателство на Република България и приложимото право на ЕС." },
    ]},
    privacy: { eyebrow: "Поверителност", title: "Политика за поверителност", updated: "Последна актуализация: 10 май 2026 г.", intro: "Тази политика обяснява как UPSTRUX обработва лични данни.", sections: [
      { heading: "1. Администратор", body: "Администратор на лични данни е UPSTRUX. Пълните фирмени данни следва да бъдат включени преди официално публикуване." },
      { heading: "2. Данни", body: "Можем да обработваме име, имейл, телефон, организация, съдържание на запитване, проектна информация и кореспонденция." },
      { heading: "3. Цели", body: "Данните се обработват за отговор на запитвания, оферти, договори, управление на проекти, законово съответствие и информационна сигурност." },
      { heading: "4. Права", body: "Имате право на достъп, коригиране, изтриване, ограничаване, възражение, оттегляне на съгласие и жалба до надзорен орган." },
    ]},
  },
  en: {
    legal: { eyebrow: "Legal", title: "Terms of Use", updated: "Last updated: 10 May 2026", intro: "This page governs access to and use of the UPSTRUX website.", sections: [
      { heading: "1. Company information", body: "These Terms of Use are issued by UPSTRUX. Full company details should be added before official publication." },
      { heading: "2. Informational content", body: "The content is general information and does not constitute individual technical, legal or financial advice." },
      { heading: "3. Intellectual property", body: "All text, design, graphic elements and trade designations are owned by UPSTRUX or used lawfully." },
      { heading: "4. Applicable law", body: "These terms are interpreted in accordance with Bulgarian law and applicable EU law." },
    ]},
    privacy: { eyebrow: "Privacy", title: "Privacy Policy", updated: "Last updated: 10 May 2026", intro: "This policy explains how UPSTRUX processes personal data.", sections: [
      { heading: "1. Data controller", body: "The data controller is UPSTRUX. Full company details should be included before official publication." },
      { heading: "2. Data", body: "We may process name, email address, telephone number, organization, inquiry content, project information and correspondence." },
      { heading: "3. Purposes", body: "Data may be processed for inquiries, offers, contracts, project management, legal compliance and information security." },
      { heading: "4. Rights", body: "You have rights of access, rectification, erasure, restriction, objection, withdrawal of consent and complaint to a supervisory authority." },
    ]},
  },
  de: {
    legal: { eyebrow: "Rechtliches", title: "Nutzungsbedingungen", updated: "Zuletzt aktualisiert: 10. Mai 2026", intro: "Diese Seite regelt den Zugriff auf und die Nutzung der UPSTRUX-Website.", sections: [
      { heading: "1. Unternehmensinformationen", body: "Diese Nutzungsbedingungen werden von UPSTRUX herausgegeben. Vollständige Unternehmensdaten sind vor Veröffentlichung zu ergänzen." },
      { heading: "2. Informationscharakter", body: "Die Inhalte dienen allgemeinen Informationszwecken und stellen keine individuelle technische, rechtliche oder finanzielle Beratung dar." },
      { heading: "3. Geistiges Eigentum", body: "Alle Texte, Designs, grafischen Elemente und Kennzeichen sind Eigentum von UPSTRUX oder werden rechtmäßig verwendet." },
      { heading: "4. Anwendbares Recht", body: "Diese Bedingungen unterliegen bulgarischem Recht und dem anwendbaren Recht der Europäischen Union." },
    ]},
    privacy: { eyebrow: "Datenschutz", title: "Datenschutzerklärung", updated: "Zuletzt aktualisiert: 10. Mai 2026", intro: "Diese Erklärung erläutert, wie UPSTRUX personenbezogene Daten verarbeitet.", sections: [
      { heading: "1. Verantwortlicher", body: "Verantwortlicher ist UPSTRUX. Vollständige Unternehmensdaten sind vor offizieller Veröffentlichung zu ergänzen." },
      { heading: "2. Daten", body: "Wir können Name, E-Mail, Telefon, Organisation, Anfrageinhalte, Projektinformationen und Korrespondenz verarbeiten." },
      { heading: "3. Zwecke", body: "Daten können für Anfragen, Angebote, Verträge, Projektmanagement, rechtliche Compliance und Informationssicherheit verarbeitet werden." },
      { heading: "4. Rechte", body: "Sie haben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch, Widerruf und Beschwerde bei einer Aufsichtsbehörde." },
    ]},
  },
};

const translations = {
  bg: {
    nav: { home: "Начало", about: "За нас", solutions: "РЕШЕНИЯ", contacts: "Контакти" },
    heroTitle: ["Инженерство, което свързва", "визията с реалността"],
    aboutLabel: "Строителни инженери, проектанти и технически ръководители",
    aboutTitle: "За нас",
    aboutP1: "В UPSTRUX ние сме инженери в областта на гражданското строителство, проектирането, техническото ръководене и управление на строителството, които виждат своята роля като подпомагаща функция във всеки проект.",
    aboutP2: "Разбираме, че един проект е успешен, когато отговаря на законовите и нормативните изисквания, очакванията на клиента, като същевременно остава икономически ефективен.",
    aboutHighlight: "Благодарение на високото ниво на специализация на нашите партньори, ние обединяваме експертния им потенциал за реализация на прости и изключително сложни проекти.",
    solutionsEyebrow: "Инженерни, проектантски и експертни решения в строителството",
    solutionsTitle: "Решения",
    methodologyTitle: "От концепцията до реализация",
    methodologyIntro: "Нашата рамка за управление и изпълнение на проекти е изградена върху международно признати практики, които подпомагат успешно иницииране, планиране, изпълнение, контрол и завършване.",
    footer: { quick: "Бързи линкове", follow: "Последвай", solutions: "Решения", contacts: "Контакти", rights: "© 2026 UPSTRUX. Всички права запазени.", location: "гр. София 1000", legalTitle: "Условия за ползване", legalInfo: "Правно", privacy: "Поверителност", backHome: "← Обратно към началната страница" },
    learnMore: "Научете повече",
    services: bgServices,
    processSteps: bgProcessSteps,
    legalPages: legalPages.bg,
  },
  en: {
    nav: { home: "Home", about: "About", solutions: "SOLUTIONS", contacts: "Contacts" },
    heroTitle: ["Engineering that connects", "vision with reality"],
    aboutLabel: "Civil, structural and site engineers",
    aboutTitle: "About us",
    aboutP1: "At UPSTRUX, we are civil, structural and site engineers. We see our role as a supporting function in every project and as a reliable partner for investors, building owners, designers and construction companies.",
    aboutP2: "We understand that a project is successful when it complies with legal and regulatory requirements, meets the client’s expectations and remains economically efficient.",
    aboutHighlight: "Through the high level of specialization of our partners, we combine expert knowledge to deliver both straightforward and highly complex projects successfully.",
    solutionsEyebrow: "Engineering, design and expert solutions in construction",
    solutionsTitle: "Solutions",
    methodologyTitle: "From concept to delivery",
    methodologyIntro: "Our project management and delivery framework is based on internationally recognized practices for initiation, planning, execution, monitoring and successful completion.",
    footer: { quick: "Quick links", follow: "Follow", solutions: "Solutions", contacts: "Contacts", rights: "© 2026 UPSTRUX. All rights reserved.", location: "Sofia 1000, Bulgaria", legalTitle: "Terms of Use", legalInfo: "Legal", privacy: "Privacy", backHome: "← Back to homepage" },
    learnMore: "Learn more",
    services: enServices,
    processSteps: enProcessSteps,
    legalPages: legalPages.en,
  },
  de: {
    nav: { home: "Start", about: "Über uns", solutions: "LÖSUNGEN", contacts: "Kontakt" },
    heroTitle: ["Ingenieurwesen, das Vision", "mit Realität verbindet"],
    aboutLabel: "Bau-, Tragwerksplanungs- und Bauleitungsingenieure",
    aboutTitle: "Über uns",
    aboutP1: "Bei UPSTRUX sind wir Ingenieure für Bauwesen, Tragwerksplanung, Bauleitung und Baustellenmanagement. Wir stehen Investoren, Eigentümern, Planern und Bauunternehmen als verlässlicher Partner zur Seite.",
    aboutP2: "Ein Projekt ist erfolgreich, wenn es rechtliche und technische Anforderungen erfüllt, die Erwartungen des Auftraggebers erreicht und zugleich wirtschaftlich effizient bleibt.",
    aboutHighlight: "Dank des hohen Spezialisierungsgrades unserer Partner bündeln wir Expertenpotenzial für einfache und äußerst komplexe Projekte.",
    solutionsEyebrow: "Ingenieur-, Planungs- und Expertenlösungen im Bauwesen",
    solutionsTitle: "Lösungen",
    methodologyTitle: "Vom Konzept bis zur Umsetzung",
    methodologyIntro: "Unser Rahmen für Projektmanagement und Projektausführung basiert auf anerkannten Praktiken für Initiierung, Planung, Ausführung, Kontrolle und Projektabschluss.",
    footer: { quick: "Schnellzugriff", follow: "Folgen", solutions: "Lösungen", contacts: "Kontakt", rights: "© 2026 UPSTRUX. Alle Rechte vorbehalten.", location: "Sofia 1000, Bulgarien", legalTitle: "Nutzungsbedingungen", legalInfo: "Rechtliches", privacy: "Datenschutz", backHome: "← Zurück zur Startseite" },
    learnMore: "Mehr erfahren",
    services: deServices,
    processSteps: deProcessSteps,
    legalPages: legalPages.de,
  },
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/^-+|-+$/g, "");
}

function HeroSlide({ image, index }) {
  return (
    <motion.div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${image})` }}
      initial={{ opacity: index === 0 ? 1 : 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 48, repeat: Infinity, times: [0, 0.04, 0.18, 0.22], delay: index * 6, ease: "linear" }}
    />
  );
}

function SiteHeader({ footerLogo = false, navItems, language, setLanguage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen }) {
  const dark = footerLogo;
  return (
    <header className={`${dark ? "relative bg-white text-slate-900" : "absolute left-0 right-0 top-0 z-50 text-white"} px-6 pt-10 pb-8`}>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-start md:justify-between lg:pr-20">
        <button type="button" onClick={() => setCurrentPage("home")} aria-label="UPSTRUX home">
          <Logo footer={dark} />
        </button>
        <button type="button" className={`self-center text-2xl md:hidden ${dark ? "text-slate-900" : "text-white"}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>☰</button>
        <nav className={`${mobileMenuOpen ? "flex" : "hidden"} absolute left-1/2 top-full z-50 -translate-x-1/2 flex-col gap-2 rounded-2xl bg-white/95 p-4 text-sm font-light uppercase tracking-[0.14em] text-slate-900 shadow-xl md:static md:flex md:translate-x-0 md:flex-row md:items-center md:gap-12 md:bg-transparent md:p-0 md:shadow-none ${dark ? "md:text-slate-900" : "md:text-white"}`}>
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                if (item.key === "solutions") {
                  setCurrentPage("solutions");
                } else {
                  setCurrentPage("home");
                  setTimeout(() => document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" }), 50);
                }
                setMobileMenuOpen(false);
              }}
              className={`${dark ? "hover:text-blue-600" : "md:hover:text-blue-300 hover:text-blue-600"}`}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-2 text-xs font-light tracking-[0.12em]">
            {["bg", "en", "de"].map((lang) => (
              <button key={lang} type="button" onClick={() => { setLanguage(lang); setMobileMenuOpen(false); }} className={`uppercase transition ${language === lang ? "text-blue-600 md:text-blue-300" : dark ? "text-slate-900 hover:text-blue-600" : "text-slate-900 hover:text-blue-600 md:text-white md:hover:text-blue-300"}`}>
                {lang}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

function ZigZagService({ title, text, image, reverse, servicePage, setCurrentPage, learnMoreLabel }) {
  const bulletItems = text.split(";").map((item) => item.trim()).filter(Boolean);
  const textBlock = (
    <div>
      <h3 className="text-2xl font-light leading-[1.1] tracking-[-0.025em] text-[#111111] md:text-3xl">{title}</h3>
      <ul className="mt-4 space-y-1 text-[15px] leading-5 text-slate-700">
        {bulletItems.map((item) => <li key={item} className="flex gap-2.5"><span className="mt-0.5 text-base text-blue-600">✓</span><span>{item}</span></li>)}
      </ul>
      <button type="button" onClick={() => setCurrentPage(servicePage)} className="mt-6 inline-flex w-fit items-center justify-center rounded-full bg-gradient-to-br from-blue-600 via-indigo-700 to-red-500 px-6 py-2.5 text-sm font-light tracking-[0.08em] text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
        {learnMoreLabel}
      </button>
    </div>
  );
  const imageBlock = <div className="overflow-hidden rounded-[2rem] bg-white shadow-sm"><img src={image} alt={title} className="aspect-[1.68/1] min-h-[320px] w-full object-cover sm:min-h-[380px] lg:min-h-[420px]" /></div>;
  return (
    <motion.div id={`service-${slugify(title)}`} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="scroll-mt-28 grid items-center gap-10 lg:grid-cols-2">
      {reverse ? <><div className="order-2 lg:order-1">{imageBlock}</div><div className="order-1 lg:order-2">{textBlock}</div></> : <>{textBlock}{imageBlock}</>}
    </motion.div>
  );
}

function ProcessStep({ step, index }) {
  const isRight = index === 1 || index === 3;
  return (
    <div className={`relative flex ${isRight ? "justify-end" : "justify-start"}`}>
      <div className={`pointer-events-none absolute top-1/2 hidden h-px bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500 lg:block ${isRight ? "left-0 right-[78%]" : "left-[78%] right-0"}`} />
      <span className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-2xl font-light leading-[1.1] tracking-[-0.025em] text-[#111111] md:text-3xl lg:block ${index === 3 ? "left-[24%]" : isRight ? "left-[28%]" : "right-[28%]"}`}>{step.title}</span>
      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }} className="relative z-10 flex min-h-[220px] w-full max-w-[620px] flex-col justify-between overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-blue-600 via-indigo-700 to-red-500 p-5 transition duration-300 hover:-translate-y-1 sm:min-h-[190px]">
        <div className="flex flex-1 flex-col justify-between gap-3 text-white/90">
          <p className="text-sm leading-5 sm:text-[15px]">{step.body}</p>
          <p className="text-sm leading-5 text-white/95 sm:text-[15px]">{step.focus}</p>
        </div>
      </motion.div>
    </div>
  );
}

function LegalContentPage({ page, onBack, backLabel }) {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="bg-white px-6 pt-12 pb-8"><div className="mx-auto flex max-w-7xl flex-col items-start gap-4"><button type="button" onClick={onBack} aria-label="Back to homepage" className="text-left"><Logo footer /></button></div></header>
      <div className="mx-auto flex w-full max-w-7xl justify-start px-6 pt-4"><button type="button" onClick={onBack} className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">{backLabel}</button></div>
      <main><section className="px-6 py-24"><div className="mx-auto max-w-5xl"><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">{page.eyebrow}</p><h1 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-5xl">{page.title}</h1><p className="mt-3 text-sm text-slate-500">{page.updated}</p><p className="mt-8 text-lg leading-8 text-slate-700">{page.intro}</p><div className="mx-auto my-10 flex max-w-5xl items-center justify-center"><div className="h-[0.5px] w-full max-w-[48rem] bg-gradient-to-r from-blue-500 via-indigo-500 to-red-500" /></div><div className="space-y-8 pt-2">{page.sections.map((section) => <article key={section.heading}><h2 className="text-xl font-light tracking-[-0.02em] text-[#111111]">{section.heading}</h2><p className="mt-3 text-base leading-7 text-slate-700">{section.body}</p></article>)}</div></div></section></main>
    </div>
  );
}

function Footer({ t, setCurrentPage }) {
  return (
    <footer id="contact" className="border-t border-slate-200 bg-white px-6 pt-8">
      <div className="mx-auto grid max-w-7xl items-start gap-10 pb-8 md:grid-cols-5">
        <div><Logo footer /></div>
        <div><h3 className="mb-4 text-sm font-light tracking-[0.08em] text-slate-900">{t.footer.quick}</h3><div className="grid gap-1.5 text-[13px] text-slate-700"><a href="#home" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); setTimeout(() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }), 50); }} className="hover:text-blue-600">{t.nav.home}</a><a href="#about" onClick={(e) => { e.preventDefault(); setCurrentPage("home"); setTimeout(() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }), 50); }} className="hover:text-blue-600">{t.nav.about}</a><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage("solutions"); }} className="hover:text-blue-600">{t.footer.solutions}</a></div></div>
        <div><h3 className="mb-4 text-sm font-light tracking-[0.08em] text-slate-900">{t.footer.legalTitle}</h3><div className="grid gap-1.5 text-[13px] text-slate-700"><button type="button" onClick={() => setCurrentPage("legal")} className="cursor-pointer text-left hover:text-blue-600">{t.footer.legalInfo}</button><button type="button" onClick={() => setCurrentPage("privacy")} className="cursor-pointer text-left hover:text-blue-600">{t.footer.privacy}</button></div></div>
        <div><h3 className="mb-4 text-sm font-light tracking-[0.08em] text-slate-900">{t.footer.follow}</h3><div className="flex items-center gap-2 pt-1 leading-none"><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-blue-600 transition duration-300 hover:-translate-y-0.5 hover:text-blue-700"><LinkedInIcon size={24} /></a><a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-xl text-blue-600 transition duration-300 hover:-translate-y-0.5 hover:text-blue-700"><FacebookIcon size={24} /></a></div></div>
        <div className="justify-self-start text-left"><h3 className="mb-4 text-sm font-light tracking-[0.08em] text-slate-900">{t.footer.contacts}</h3><div className="space-y-2 text-[13px] text-slate-700"><div className="flex items-center gap-2"><PinIcon size={16} className="shrink-0 text-blue-600" /><span>{t.footer.location}</span></div><div className="flex items-center gap-2"><PhoneIcon size={16} className="shrink-0 text-blue-600" /><span>+359 888 000 000</span></div><div className="flex items-center gap-2"><MailIcon size={16} className="shrink-0 text-blue-600" /><span>enquiries@upstrux.bg</span></div></div></div>
      </div>
      <div className="border-t border-slate-200 py-4 text-xs text-slate-500">{t.footer.rights}</div>
    </footer>
  );
}

export default function UpstruxWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [language, setLanguage] = useState("bg");
  const t = translations[language];
  const currentServices = useMemo(() => t.services.map((service, index) => ({ ...service, image: serviceImages[index] })), [t]);
  const navItems = [
    { key: "home", label: t.nav.home, href: "#home" },
    { key: "about", label: t.nav.about, href: "#about" },
    { key: "solutions", label: t.nav.solutions, href: "#solutions" },
    { key: "contacts", label: t.nav.contacts, href: "#contact" },
  ];
  const headerProps = { navItems, language, setLanguage, setCurrentPage, mobileMenuOpen, setMobileMenuOpen };

  if (currentPage === "legal") return <LegalContentPage page={t.legalPages.legal} onBack={() => setCurrentPage("home")} backLabel={t.footer.backHome} />;
  if (currentPage === "privacy") return <LegalContentPage page={t.legalPages.privacy} onBack={() => setCurrentPage("home")} backLabel={t.footer.backHome} />;

  if (currentPage === "solutions") {
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <SiteHeader footerLogo {...headerProps} />
        <main className="bg-white px-6 pt-24 pb-24">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">{t.solutionsEyebrow}</p>
            <h1 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-5xl">{t.solutionsTitle}</h1>
            <div className="mt-16 space-y-16">
              {currentServices.map((service, index) => (
                <ZigZagService key={service.title} title={service.title} text={service.text} image={service.image} reverse={index % 2 === 1} servicePage={`service${index + 1}`} setCurrentPage={setCurrentPage} learnMoreLabel={t.learnMore} />
              ))}
            </div>
          </div>
        </main>
        <Footer t={t} setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  if (currentPage.startsWith("service")) {
    const serviceIndex = Number(currentPage.replace("service", "")) - 1;
    const service = currentServices[serviceIndex];
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <SiteHeader footerLogo {...headerProps} />
        <main className="bg-white px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">{t.solutionsEyebrow}</p>
              <h1 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-5xl">{service?.title}</h1>
              <ul className="mt-8 space-y-2 text-lg leading-8 text-slate-700">
                {service?.text.split(";").map((item) => item.trim()).filter(Boolean).map((item) => <li key={item} className="flex gap-3"><span className="text-blue-600">✓</span><span>{item}</span></li>)}
              </ul>
              <button type="button" onClick={() => setCurrentPage("solutions")} className="mt-8 rounded-full bg-slate-950 px-6 py-3 text-sm font-light uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:shadow-lg">{t.footer.backHome.replace("homepage", t.footer.solutions).replace("началната страница", t.footer.solutions).replace("Startseite", t.footer.solutions)}</button>
            </div>
            <img src={service?.image} alt={service?.title} className="min-h-[460px] w-full rounded-[2rem] object-cover shadow-sm" />
          </div>
        </main>
        <Footer t={t} setCurrentPage={setCurrentPage} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader {...headerProps} />
      <main>
        <section id="home" className="relative h-[880px] overflow-hidden bg-slate-900">
          <div className="absolute inset-0">{heroSlides.map((image, index) => <HeroSlide key={String(image)} image={image} index={index} />)}</div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-950/30 to-transparent" />
          <div className="relative mx-auto flex h-full max-w-7xl items-end px-6 pb-16"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl text-white"><h1 className="text-3xl font-light leading-[1.05] tracking-[-0.025em] md:text-5xl">{t.heroTitle.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</h1></motion.div></div>
        </section>
        <section id="about" className="bg-white px-6 py-24"><div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2"><div><p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-700">{t.aboutLabel}</p><h2 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">{t.aboutTitle}</h2><p className="mt-8 text-lg leading-8 text-slate-700">{t.aboutP1}</p><p className="mt-6 text-lg leading-8 text-slate-700">{t.aboutP2}</p><div className="mt-4 border-l-4 border-blue-600 bg-white px-8 py-4"><p className="text-xl font-light leading-7 tracking-[-0.02em] text-[#111111]">{t.aboutHighlight}</p></div></div><div className="overflow-hidden rounded-[2rem] bg-white shadow-sm"><img src={images.whiteArchitecture} alt="UPSTRUX engineering" className="h-[650px] w-full object-cover object-center md:h-[720px]" /></div></div></section>
        <section className="bg-white px-6 py-12"><div className="mx-auto max-w-7xl"><div className="mb-16 text-left"><h3 className="mt-3 text-3xl font-light leading-[1.06] tracking-[-0.028em] text-[#111111] md:text-4xl">{t.methodologyTitle}</h3><p className="mt-6 max-w-5xl text-lg leading-8 text-slate-600">{t.methodologyIntro}</p></div><div className="flex flex-col gap-3">{t.processSteps.map((step, index) => <ProcessStep key={step.title} step={step} index={index} />)}</div></div></section>
        <Footer t={t} setCurrentPage={setCurrentPage} />
      </main>
    </div>
  );
}
