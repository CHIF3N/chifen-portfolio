export interface StoryChapter {
  id: string;
  number: string;
  year: string;
  title: string;
  headline: string;
  era: 'origins' | 'early-tech' | 'pandemic' | 'health-tech' | 'clinical' | 'active';
  paragraphs: string[];
  pullQuote?: string;
  whatIBuilt?: string;
  whatILearned?: string;
  metric?: string;
  status?: 'LIVE' | 'PROTOTYPE' | 'RESEARCH' | 'EXPERIMENT' | 'ARCHIVED' | 'ONGOING';
  relatedUrl?: string;
  relatedLabel?: string;
  image?: {
    src: string;
    alt: string;
    caption: string;
  };
}

export const professionalBio = {
  summary: `Chifen Sama Nduma ("The Nurse Who Codes") is a self-trained software engineer, registered nurse, and health technology researcher currently pursuing an M.Tech in Data Science at the College of Technology (COLTECH), The University of Bamenda. Working at the convergence of clinical practice, autodidactic software architecture, and artificial intelligence, he designs resilient digital health platforms engineered specifically for resource-constrained environments.`,
  paragraphs: [
    `Chifen Sama Nduma holds a Bachelor of Science in Nursing Science from Gracious Higher Institute of Excellence (mentored by the University of Bamenda) and is currently enrolled in the Master of Technology (M.Tech) in Data Science program at the College of Technology (COLTECH), The University of Bamenda. His undergraduate thesis investigated "Knowledge, Attitude, and Factors Influencing the Implementation of Artificial Intelligence in Clinical Decision-Making Among Health Professionals at Buea Regional Hospital," conducting an empirical 387-respondent cross-sectional study (92.4% response rate) that established foundational readiness metrics for clinical AI in Cameroon.`,
    `A 100% self-trained software engineer, Chifen taught himself systems programming, distributed backends, and low-bandwidth mobile protocols through real-world trial and open-source grit alongside demanding clinical nursing shifts. Following his tenure as District Data Manager and PMTCT Departmental Head for Kumba South District Health Service—where he automated DHIS2 local-to-cloud facility synchronization pipelines and elevated reporting completeness above 95%—he architects LifeDrop, an asynchronous emergency blood dispatch network leveraging the WhatsApp Cloud API to achieve zero-install donor triage.`,
    `In parallel, he serves as Lead Engineer for CoastClear, building offline-first spatial logging and localized computer-vision dashboards for coastal conservation, and Co-Founder & CEO of INKWAVE, a digital storytelling and developer advocacy agency advancing technical communication across Central and West Africa. Chifen's work demonstrates that technology in emerging markets must be designed not for idealized lab conditions, but for the ward, the power cut, and the 2G connection.`,
  ],
  focusAreas: [
    { title: 'Data Science & Applied AI (COLTECH)', desc: 'M.Tech Data Science at COLTECH UBa, clinical decision support algorithms, maternal risk stratification, and biostatistics.' },
    { title: 'Self-Taught Software Engineering', desc: 'Autodidactic systems builder: WhatsApp Cloud API webhooks, distributed queues, offline-first SQLite sync, and low-bandwidth architectures.' },
    { title: 'Clinical Nursing & Informatics', desc: 'BSc Nursing Science, frontline ward triage, PMTCT cohort automation, and electronic health registry audits.' },
    { title: 'Community & Technical Advocacy', desc: 'INKWAVE ecosystem building, grassroots developer workshops, and open-source documentation mentorship.' },
  ],
};

export const storyChapters: StoryChapter[] = [
  {
    id: 'childhood-medicine-tech',
    number: '01',
    year: 'Childhood & Origins',
    title: 'Medicine, Technology, and Harry Potter',
    headline: 'A childhood fascination with surgery systems, precision, and the tools that make the impossible possible.',
    era: 'origins',
    paragraphs: [
      `My name is Chifen Sama Nduma. For a long time I went by Sama Chifen because, to my young mind, it sounded like a superhero's alter ego. At 23, as far back as memory reaches, I have always been fixated on medicine.`,
      `I remember watching Gifted Hands and being utterly captivated by Dr Ben Carson. What gripped me was not simply the status of being a surgeon; it was the surgery itself. The technology. The surgical instruments. The interdisciplinary coordination in the operating theater. The sheer precision required to navigate human anatomy. Technology had advanced just enough to make things that once seemed impossible completely possible.`,
      `I devoured books and medical documentaries. The film Something the Lord Made fascinated me because it laid bare the indispensable role of relentless innovation and cross-disciplinary collaboration in cardiovascular medicine. Alongside the science, Harry Potter captured my imagination—Gryffindor by heart. At the time, I had no inkling that this intersection of curiosity and experimentation would one day become "The Nurse Who Codes."`,
    ],
    pullQuote: 'What gripped me was not simply the idea of becoming a surgeon. It was the technology, the precision, and the systems that made the impossible possible.',
    whatILearned: 'Medicine and technology are not separate worlds; they have always been symbiotic engines of human survival.',
  },
  {
    id: '2016-the-interruption',
    number: '02',
    year: '2016',
    title: 'The Interruption & The Spark',
    headline: 'Leaving Bamenda during the Anglophone crisis and discovering that technology can be built anywhere.',
    era: 'early-tech',
    paragraphs: [
      `My professional journey began taking tangible shape around 2016. During the onset of the Anglophone crisis in Cameroon, I was forced to leave Bamenda, resulting in a lost academic year.`,
      `Instead of passively waiting for normalcy to return, I spent those months online learning. During that window, I encountered stories of Cameroonian technological innovation—including Arthur Zang’s Cardiopad—and learned of fellow Cameroonians competing on global technology stages despite profound regional infrastructure deficits.`,
      `That flipped a switch in my head. Technology was not some miraculous magic that only happened in Silicon Valley or overseas laboratories. People right here in Cameroon could build things too. I knew almost nothing at the start. So I threw myself into learning: basic computer skills, algorithmic logic, HTML/CSS web development, and any programming resource I could download. I was not following an accredited syllabus; I was simply following raw curiosity.`,
    ],
    pullQuote: 'I realised technology was not something that only happened somewhere else. People right here could build things too.',
    whatIBuilt: 'Self-taught foundational computer science projects and early HTML/CSS prototypes.',
    whatILearned: 'Geographic and political constraints do not disqualify you from engineering solutions; they define the real specifications.',
    status: 'EXPERIMENT',
  },
  {
    id: '2019-innovative-engineering',
    number: '03',
    year: '2019',
    title: 'Innovative Engineering & The Living Room Lab',
    headline: 'Building a community of hundreds of curious minds and moving experiments from the living room to MAST.',
    era: 'early-tech',
    paragraphs: [
      `In 2019, I founded Innovative Engineering as a dual community across Facebook and WhatsApp. It was my first attempt at organizing collective curiosity.`,
      `According to group records, the WhatsApp community grew to more than 90 dedicated members while the Facebook community surpassed 2,000 members. We spent late nights debating quantum physics, general relativity, black holes, mathematical equations, robotics, and the occasional wild scientific theory—everything that could keep young, intellectually hungry minds awake.`,
      `Eventually, our practical living room experiments (involving wiring, chemicals, and mechanical parts) became enough of a household hazard that my mother intervened and generously allocated us dedicated laboratory space. That space became known as MAST. While the original acronym has faded from memory, MAST served as the home umbrella for our physical experiments, technical books, and prototypes.`,
    ],
    pullQuote: 'Our living room experiments became enough of a hazard that my mother gave us laboratory space. That became MAST.',
    whatIBuilt: 'Innovative Engineering community network (2,000+ Facebook, 90+ WhatsApp) and physical MAST experiment workspace.',
    whatILearned: 'Intellectual community accelerates learning faster than solitary study. When young people have an outlet to ask hard questions, they start building.',
    metric: '2,000+ Facebook community members · 90+ WhatsApp members',
    status: 'COMMUNITY' as any,
  },
  {
    id: 'books-and-bluecube',
    number: '04',
    year: '2019 – 2020',
    title: 'Books, Bluecube & The Distribution Lesson',
    headline: 'Writing computer science textbooks and confronting the harsh truth between building software and user adoption.',
    era: 'early-tech',
    paragraphs: [
      `During this period, I authored printed educational revision books on Computer Science and Information and Communication Technology (ICT) for secondary students, selling approximately 30 copies to local peers and schools.`,
      `Then we conceived Bluecube. The premise was straightforward: Cameroonian examination candidates suffered from acute difficulty accessing past examination questions and revision solutions. I spent hours reading W3Schools documentation, stitching together PHP, HTML, and CSS to construct the platform. We launched, attempted to solicit investor interest, and tried to scale the platform during COVID lockdowns.`,
      `We managed to get real students using it, but the venture struggled to sustain traction. It delivered one of the most sobering and valuable lessons of my career: building something technically useful is completely different from getting people to adopt and rely on it. We had everything to learn about distribution channels, product-market fit, and user behavior under resource scarcity. I do not hide Bluecube; it is where my naive builder assumptions died.`,
    ],
    pullQuote: 'Building something technically useful is not the same thing as getting people to use it. Bluecube taught me that distribution is the real test.',
    whatIBuilt: 'Computer Science & ICT educational books (~30 copies sold) and the Bluecube examination revision web portal.',
    whatILearned: 'Code is only 20% of a solution. Distribution, accessibility, user habits, and business models dictate whether software lives or dies.',
    metric: '~30 books sold · Early web portal launch',
    status: 'ARCHIVED',
  },
  {
    id: 'aircraft-and-drones',
    number: '05',
    year: '2019 – 2020',
    title: 'Aerodynamics, Drones & Hardware Prototyping',
    headline: 'Testing physical aerodynamics and remote-controlled aircraft fabrication.',
    era: 'early-tech',
    paragraphs: [
      `At a certain juncture, my engineering curiosity branched from software code to physical aerodynamics. I began designing and assembling experimental remote-controlled aircraft and drone prototypes using lightweight foam, salvaged motors, and radio controllers.`,
      `These were exploratory technical experiments, not a sustained commercial aviation business. They forced me to confront physics outside of a compiler: weight distribution, battery discharge rates, aerodynamic lift, and radio frequency interference.`,
      `This phase reinforced an enduring instinct: I have never been satisfied merely writing software in the abstract. I wanted software to control physical things in the physical world.`,
    ],
    whatIBuilt: 'Experimental remote-controlled fixed-wing aircraft models and multi-rotor drone test frames.',
    whatILearned: 'Physical systems have zero tolerance for sloppy calculations. Gravity does not have a try/catch block.',
    status: 'EXPERIMENT',
  },
  {
    id: 'genius-academy-and-africa',
    number: '06',
    year: '2020',
    title: 'Genius Academy & Genius Africa',
    headline: 'Connecting 700+ students across Cameroon during lockdown and transforming plastic waste into construction tiles.',
    era: 'pandemic',
    paragraphs: [
      `When the COVID-19 pandemic shuttered schools across Cameroon, I founded Genius Academy to help young science students continue their coursework. The initiative quickly scaled across WhatsApp and Telegram, structuring specialized study groups for biology, physics, chemistry, and mathematics.`,
      `Genius Academy expanded to connect more than 700 students across Cameroon according to our administrative records. I coordinated with volunteer teachers to conduct structured classes at an affordable micro-fee of approximately 200 CFA francs per student per class. This became one of my earliest experiences generating income from a service I architected, while demonstrating how lightweight, accessible communication tools can bridge education gaps during national crises.`,
      `Around the same timeframe (2019–2020), we initiated Genius Africa. Alongside education, we experimented with transforming discarded plastic waste into structural road pavement tiles. Using a homemade mechanical shredder, custom metal moulds, and basic heat fabrication, we tested melting shredded plastics with sand to produce rigid pavement blocks. It was honest, grassroots material experimentation.`,
    ],
    pullQuote: 'Genius Academy connected over 700 students across Cameroon when schools shut down. It proved how lightweight mobile networks can democratise access.',
    whatIBuilt: 'Genius Academy remote study network (700+ students, micro-tuition model) and Genius Africa plastic shredder & road tile press.',
    whatILearned: 'Accessible design means using the tools users already possess. WhatsApp-based education reached students who could never afford laptops or Zoom bandwidth.',
    metric: '700+ students connected across Cameroon · 200 CFA micro-class model',
    status: 'ARCHIVED',
  },
  {
    id: 'air-sanitizer-2020',
    number: '07',
    year: '2020',
    title: 'The Wireless Air Sanitizer',
    headline: 'COVID-19 pandemic prototyping, national media discussions, and the gulf between an exciting prototype and validated health technology.',
    era: 'pandemic',
    paragraphs: [
      `In 2020, amidst peak pandemic anxieties, I collaborated with my older brother and Sir Bate Alaine on a wireless air sanitizer prototype. The concept aimed to atomize alcohol-based sanitizing solutions across enclosed public spaces to mitigate airborne and surface pathogen transmission.`,
      `We fabricated working prototypes and authored a formal engineering and public health proposal. The initiative attracted significant public interest, leading to official engagements, national television appearances, and radio broadcast discussions. Publicly indexed documentation of our 2020 project proposal remains accessible.`,
      `However, it is crucial to state the facts with absolute integrity: the device was an early engineering prototype. It was not clinically validated through rigorous microbiology trials, and it did not claim a granted patent. This project was a foundational crucible for me: it taught me how to articulate technical concepts publicly under media scrutiny, but more importantly, it taught me the profound difference between a compelling engineering prototype and a clinically certified medical device.`,
    ],
    pullQuote: 'The air sanitizer taught me the vast difference between an exciting engineering prototype and a rigorously validated health technology.',
    whatIBuilt: 'Wireless air sanitizer mechanical prototype, electronic control circuitry, and technical proposal.',
    whatILearned: 'Health technology carries higher ethical stakes than consumer software. Good intentions and working circuits are not substitutes for clinical validation.',
    status: 'EXPERIMENT',
  },
  {
    id: 'hats-graiye-agrobot',
    number: '08',
    year: '2021 – 2024',
    title: 'HATS, GRAIYE & The Autonomous Agrobot',
    headline: 'Evolving hardware projects with Bluetooth mobile control and taking 3rd place at the Presidential ICT Week finals.',
    era: 'early-tech',
    paragraphs: [
      `In 2021, my brother and I evolved the MAST umbrella into HATS (Hardware and Technology Solutions), where I served as Public Relations Officer and software developer.`,
      `My software responsibility was bridging digital interfaces with physical machines. Using MIT App Inventor and early Android tooling, I engineered Bluetooth-based mobile applications that interfaced with microcontrollers to monitor sensor inputs, calibrate temperatures, and control hardware actuators. This cemented my understanding of how software operates beyond browser viewports.`,
      `HATS later evolved into GRAIYE, focusing on agricultural technology. In 2022, our autonomous agricultural tractor concept—the HATS Agrobot—advanced to the national finals of Cameroon’s Presidential ICT Week, securing 3rd Place according to our records. It validated our ability to take a hardware-software concept from a regional workshop to national recognition.`,
    ],
    pullQuote: 'The HATS Agrobot reached the finals of Cameroon’s Presidential ICT Week and took 3rd place. It showed how code transforms raw hardware.',
    whatIBuilt: 'Bluetooth mobile microcontroller control apps (MIT App Inventor) and the HATS Agrobot autonomous tractor concept.',
    whatILearned: 'Interfacing software with hardware instills discipline: latency, packet drop over Bluetooth, and battery voltage drops must be accounted for in code.',
    metric: '3rd Place, Cameroon Presidential ICT Week Finals 2022',
    status: 'ARCHIVED',
  },
  {
    id: 'ayodah-the-personal-turning-point',
    number: '09',
    year: '2021 – 2023',
    title: 'Ayodah — The Turning Point',
    headline: 'When my mother needed emergency surgery and our family waited 18 hours for blood, health technology became personal.',
    era: 'health-tech',
    paragraphs: [
      `In late 2021, my mother became critically ill, and by 2022 she required major surgical intervention. Our family was told she urgently required multiple units of blood. It took our family nearly 18 agonizing hours of phone calls, frantic taxi rides across town, and desperate inquiries just to find a single compatible donor.`,
      `My mother survived. But that experience permanently altered my trajectory. I spent that sleepless night in the hospital hallway observing other families facing the same terrifying countdown. The problem was rarely that willing donors did not exist in the city; the problem was that no coordinated system connected a willing donor to a dying patient in time.`,
      `That harrowing realization gave birth to Ayodah. We built a volunteer blood donor registry that grew to over 400 registered donors, coordinated 310 direct donations, and established formal relationships with three regional hospitals and five NGOs. Ayodah won 1st Place at the Silicon Mountain Challenge 2022. But then came the crucial failure: the mobile app died at the install screen. Frightened families at 2 AM could not navigate app stores with low phone storage and expensive data. They simply sent frantic messages to my personal WhatsApp. That failure directly birthed LifeDrop.`,
    ],
    pullQuote: 'It took our family 18 hours to find one donor for my mother. The donors existed; the coordination did not. That night became Ayodah.',
    whatIBuilt: 'Ayodah blood donor platform, volunteer dispatch registry, and hospital partnership workflows.',
    whatILearned: 'If an emergency health app requires an installation step, it has failed before it starts. Health tech must live where people already communicate.',
    metric: '400+ registered donors · 310 mediated donations · Winner, Silicon Mountain Challenge 2022',
    status: 'SHIPPED' as any,
    relatedUrl: '/work/ayodah',
    relatedLabel: 'Read Ayodah Case Study',
  },
  {
    id: 'volunteering-and-leadership',
    number: '10',
    year: '2020 – 2025',
    title: 'Community, Leadership & Public Speaking',
    headline: 'Years of youth advocacy, public speaking academies, leadership training, and grassroots volunteering.',
    era: 'clinical',
    paragraphs: [
      `Alongside technical building, community service formed the backbone of my personal development. From approximately 2020 to 2025, I volunteered actively with LoveForHumanity, an NGO led by Dr Mbella Irene, assisting with community health screenings, health education campaigns, and youth outreach.`,
      `In 2020, I participated in the International Model United Nations (IMUN) Online Conference 35.0. To refine my communication abilities, I enrolled in an early cohort of Cremah Public Speaking School under Miss Larisa and Sir Jvanyuy Emmanuel, followed by specialized leadership training with Miss Blessing Ekiko through Blessing Ekiko Global Impact.`,
      `From 2020 to 2023, I served as Cameroon Chapter Head for Balance Boxes, coordinating educational and activity packages for underprivileged children. In 2024, I completed Batch 9 of the Wisdom for Dominion Leadership Academy. Much of this work—beach cleanups in Limbe, environmental drives, serving as event master of ceremonies (MC), and mentoring younger students—was never formally credentialed. It simply taught me how to listen to communities before proposing solutions.`,
    ],
    whatIBuilt: 'Balance Boxes Cameroon chapter distribution operations and community public health campaigns.',
    whatILearned: 'Effective engineers must be able to speak, write, listen, and lead. Technical brilliance without communication cannot rally a community.',
    status: 'COMMUNITY' as any,
  },
  {
    id: 'jack-of-all-trades',
    number: '11',
    year: '2023 – 2026',
    title: 'The "Jack of All Trades" Era',
    headline: 'Photography, drone piloting, poetry, voice-over, and technical writing — refusing artificial professional silos.',
    era: 'clinical',
    paragraphs: [
      `From 2023 onward, I chose to embrace a wide spectrum of creative and technical pursuits: photography, certified drone piloting, pencil sketching, poetry, tech journalism, voice-over production, conference speaking, and event hosting.`,
      `Conventional career advice urges young professionals to narrow themselves into a single, predictable lane. I resisted that. The point was never to posture as a world-class master of twelve distinct crafts; the point was that curiosity refuses artificial boundaries.`,
      `Learning photography sharpened my eye for UI hierarchy and visual storytelling. Piloting drones deepened my spatial understanding. Poetry and writing disciplined my code documentation and thesis composition. Rather than making my career random, these creative pursuits give my engineering a distinct, deeply human texture.`,
    ],
    pullQuote: 'Curiosity is not a distraction from engineering; it is the raw material that makes solutions human.',
    status: 'EXPERIMENT',
  },
  {
    id: 'nursing-clinical-research',
    number: '12',
    year: '2022 – 2026',
    title: 'Nursing Science & The AI Readiness Dissertation',
    headline: 'Graduating top of the HND cohort (2022–2025), top-up BSc in Nursing Science (2025–2026), and defending a 387-respondent AI readiness study at Buea.',
    era: 'clinical',
    paragraphs: [
      `Formal clinical training fundamentally grounded everything I built. I completed my Higher National Diploma (HND) in Nursing (2022–2025) at Gracious Higher Institute of Excellence, graduating with five honors: Best Overall Student, Best Nursing Student, Innovative Excellence Award, Best Creative Thinker, and Proactive Student Award.`,
      `I completed a top-up Bachelor of Science in Nursing Science (2025–2026, mentored by the University of Bamenda), defending my dissertation on 25 July 2026: "Knowledge, Attitude, and Factors Influencing the Implementation of Artificial Intelligence in Clinical Decision-Making Among Health Professionals at Buea Regional Hospital." I surveyed 387 clinical personnel across six cadres (nurses, physicians, lab scientists, midwives, pharmacists, allied staff), achieving a 92.4% response rate.`,
      `My clinical internships at Regional Hospital Kumba and subsequent mandate as District Data Manager & PMTCT Head for Kumba South Health District immersed me in the unvarnished realities of African healthcare: power blackouts during triage, medication stockouts, and paper registers. By automating DHIS2 facility sync pipelines, we lifted reporting completeness above 95%. That was where "The Nurse Who Codes" stopped being a catchy phrase and became my unfair engineering advantage.`,
    ],
    pullQuote: 'The workforce meeting AI at the bedside in Buea is a young nursing workforce. My research proved they are not resistant; they are under-equipped and under-trained.',
    whatIBuilt: 'Empirical 387-respondent clinical AI readiness dissertation and automated local-to-cloud DHIS2 sync workflows for Kumba South District.',
    whatILearned: 'If you want to build health software that survives a ward, you must know what breaks at 2 AM. That comes from clinical shifts, not user research interviews.',
    metric: '387 survey respondents · 92.4% response rate · >95% DHIS2 data completeness',
    status: 'RESEARCH',
    relatedUrl: '/research/ai-clinical-decision-making',
    relatedLabel: 'Read Clinical AI Dissertation',
  },
  {
    id: 'present-and-next',
    number: '13',
    year: '2025 – Present & Beyond',
    title: 'Active Ventures & What Comes Next',
    headline: 'LifeDrop on WhatsApp, CoastClear conservation logistics, INKWAVE storytelling, and postgraduate studies.',
    era: 'active',
    paragraphs: [
      `Today, my engineering is channeled into three synergistic ventures:`,
      `1. LifeDrop: Rebuilding emergency blood donor dispatch entirely within WhatsApp. Powered by asynchronous webhooks, Node.js/Python microservices, and localized French/English flows, LifeDrop placed 3rd in the MTN YaMo Pitch Season 4.`,
      `2. CoastClear: Building offline-first conservation logistics dashboards that integrate lightweight computer-vision models to identify and geotag marine plastic debris across Cameroon’s coastal belt.`,
      `3. INKWAVE: Directing our digital storytelling studio and tech journalism platforms (Tech Chantier, The African Wave), mentoring dozens of emerging African developers into open-source ecosystems.`,
      `Looking ahead, my goal is postgraduate study (Master's in Health Technology, Digital Health, or Health Informatics), peer-reviewed scientific publications, and scaling resilient digital health platforms across sub-Saharan Africa. The journey is just beginning.`,
    ],
    pullQuote: 'Three active ventures, one direction: building technology that survives low bandwidth, unreliable power, and real emergencies.',
    whatIBuilt: 'LifeDrop WhatsApp donor bot, CoastClear offline-first conservation platform, and INKWAVE developer advocacy studio.',
    metric: '3rd Place, MTN YaMo Pitch Season 4 · PyCon Cameroon 2026 Speaker',
    status: 'LIVE',
    relatedUrl: '/work/lifedrop',
    relatedLabel: 'Explore LifeDrop',
  },
  {
    id: 'postgraduate-data-science-coltech',
    number: '14',
    year: '2026 – Present',
    title: 'The Postgraduate Frontier: M.Tech in Data Science & The Self-Taught Dev Edge',
    headline: 'Commencing Master of Technology in Data Science at COLTECH, University of Bamenda, while championing the autodidactic engineer.',
    era: 'active',
    paragraphs: [
      `In 2026, I officially commenced my Master of Technology (M.Tech) in Data Science at the College of Technology (COLTECH), The University of Bamenda (UBa), Bambili. Transitioning from frontline clinical nursing into postgraduate computer engineering data science represents the deliberate culmination of everything I have worked toward: uniting empirical healthcare datasets with advanced machine learning architectures, statistical computing, and predictive epidemiology.`,
      `Crucially, my software engineering background is 100% self-trained. I did not sit in undergraduate computer science lectures to learn how to write code. I taught myself how to build software by reverse-engineering protocols, reading technical RFCs, contributing to open-source codebases, debugging Redis queues through power outages, and writing code in the quiet hours between hospital night shifts.`,
      `Being an autodidactic developer gave me an invaluable edge: I learned technology to solve immediate, life-or-death human constraints rather than to pass written examinations. Combining this self-taught engineering grit with formal nursing clinical credentials and rigorous postgraduate data science training at COLTECH defines the next chapter of "The Nurse Who Codes."`,
    ],
    pullQuote: 'I taught myself software engineering to solve bedside clinical emergencies. Formal postgraduate data science now equips me to scale those solutions across Africa.',
    whatIBuilt: 'Predictive health algorithms, clinical AI evaluation frameworks, and scalable machine learning pipelines at COLTECH UBa.',
    whatILearned: 'Self-directed engineering disciplines your problem-solving instinct; postgraduate data science equips you with the statistical rigor to prove it at scale.',
    metric: 'M.Tech Data Science Candidate · 100% Self-Trained Software Engineer',
    status: 'ONGOING',
    relatedUrl: '/cv',
    relatedLabel: 'View Academic & Career CV',
  },
];
