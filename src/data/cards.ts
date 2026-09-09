export type FilterKey = "control-room" | "fim" | "high-risk" | "supervisory";
export type CardId = "fir" | "mis" | "dom" | "fts";
export type Accent = "red" | "blue" | "orange" | "purple";
export type IconName = "crosshair" | "user-search" | "home" | "car";

export type TacticSection = {
  id: string;
  num: string;
  title: string;
  items: string[];
  liveRisk?: boolean;
};

export type TacticCard = {
  id: CardId;
  ref: string;
  title: string;
  subtitle: string;
  accent: Accent;
  filters: FilterKey[];
  icon: IconName;
  sections: TacticSection[];
};

export const GOLDEN_QUESTIONS = [
  { key: "know", label: "What do we know?" },
  { key: "dont", label: "What don't we know?" },
  { key: "risk", label: "Who is at risk?" },
  { key: "doing", label: "What are we doing about it?" },
  { key: "who", label: "Who needs to know?" },
  { key: "record", label: "What needs recording?" },
  { key: "review", label: "When are we reviewing?" },
] as const;

export const CARDS: Record<CardId, TacticCard> = {
  fir: {
    id: "fir",
    ref: "TAC-FIR-001",
    title: "Firearms Incident",
    subtitle: "Control room / FIM response checklist",
    accent: "red",
    filters: ["control-room", "fim", "high-risk", "supervisory"],
    icon: "crosshair",
    sections: [
      {
        id: "s1",
        num: "01",
        title: "Immediate Priorities",
        items: [
          "Confirm exact location and incident type",
          "Establish whether firearms are seen, suspected, reported or discharged",
          "Establish immediate threat to life",
          "Establish person/suspect description and location where known",
          "Establish whether anyone is injured, trapped or vulnerable",
          "Establish whether officers are already at scene",
          "Notify appropriate supervisor/FIM",
          "Consider appropriate escalation arrangements",
          "Consider major/critical incident threshold",
          "Establish reliable communications arrangements",
        ],
      },
      {
        id: "s2",
        num: "02",
        title: "Situational Awareness",
        items: [
          "Exact location confirmed",
          "Incident type confirmed",
          "Hazards identified",
          "Access information established",
          "Casualty information established",
          "Emergency-service requirements identified",
          "Current location of threat/person established where possible",
          "Information reliability considered",
        ],
      },
      {
        id: "s3",
        num: "03",
        title: "Control Room Management",
        items: [
          "Incident log created/confirmed",
          "Relevant intelligence reviewed",
          "Appropriate resources identified through force procedures",
          "Public/officer safety considerations communicated",
          "Partner-agency involvement considered",
          "Specialist capability considered through appropriate channels",
          "Communications managed",
          "Significant decisions and rationale recorded",
        ],
      },
      {
        id: "s4",
        num: "04",
        title: "Ongoing Review",
        items: [
          "What has changed?",
          "Where is the threat now?",
          "Are casualties increasing?",
          "Are resources sufficient?",
          "Is specialist advice required?",
          "Are partners working from the same information?",
          "Does the command structure remain appropriate?",
          "Is formal handover required?",
        ],
      },
      {
        id: "s5",
        num: "05",
        title: "Closure / Handover",
        items: [
          "Incident commander/supervisor identified",
          "Outstanding actions identified",
          "Key risks communicated",
          "Decision log complete",
          "Relevant intelligence recorded",
          "Handover completed where required",
          "Post-incident review requirement considered",
        ],
      },
    ],
  },
  mis: {
    id: "mis",
    ref: "TAC-MIS-001",
    title: "Missing Person — High Risk",
    subtitle: "Control room / FIM response checklist",
    accent: "blue",
    filters: ["control-room", "fim", "high-risk", "supervisory"],
    icon: "user-search",
    sections: [
      {
        id: "s1",
        num: "01",
        title: "Initial Assessment",
        items: [
          "Confirm identity",
          "Confirm age and vulnerability",
          "Establish circumstances of disappearance",
          "Establish exact last-known location",
          "Establish time last seen / last confirmed contact",
          "Establish likely destination",
          "Establish clothing and possessions",
          "Establish phone / vehicle / transport information",
          "Establish relevant medical / behavioural concerns",
          "Establish immediate threat to life or serious harm",
        ],
      },
      {
        id: "s2",
        num: "02",
        title: "Intelligence & Risk",
        items: [
          "Previous missing episodes considered",
          "Relevant intelligence checked",
          "Specific locations of concern identified",
          "Third-party involvement considered",
          "Safeguarding concerns identified",
          "New information assessed for impact on risk",
        ],
      },
      {
        id: "s3",
        num: "03",
        title: "Resource Management",
        items: [
          "Appropriate response priority confirmed",
          "Supervisor involvement considered",
          "Search requirements identified",
          "Specialist resources considered",
          "Partner agencies considered",
          "Relevant information passed to attending resources",
          "Search/review strategy established where required",
        ],
      },
      {
        id: "s4",
        num: "04",
        title: "Ongoing Review",
        items: [
          "Review time established",
          "Actions allocated",
          "Outstanding enquiries monitored",
          "New intelligence circulated",
          "Risk reassessed following significant updates",
          "Resource deployment reviewed",
          "Escalation considered if circumstances change",
        ],
      },
      {
        id: "s5",
        num: "05",
        title: "Escalation",
        items: [
          "New information suggests immediate danger",
          "Person enters hazardous environment",
          "Serious harm concerns emerge",
          "Suspected third-party involvement emerges",
          "Person becomes increasingly difficult to locate",
          "Significant delay occurs",
          "Resources become insufficient",
          "New intelligence materially changes assessment",
        ],
      },
    ],
  },
  dom: {
    id: "dom",
    ref: "TAC-DOM-001",
    title: "Domestic Incident",
    subtitle: "Control room / FIM response checklist",
    accent: "orange",
    filters: ["control-room", "fim", "high-risk", "supervisory"],
    icon: "home",
    sections: [
      {
        id: "s1",
        num: "01",
        title: "Initial Call",
        items: [
          "Confirm exact address",
          "Establish who is present",
          "Establish relationship between parties",
          "Establish what is happening now",
          "Establish whether violence is ongoing",
          "Establish whether anyone is injured",
          "Establish whether weapons are reported",
          "Establish whether children/vulnerable people are present",
          "Establish whether anyone is trapped or unable to leave",
          "Establish whether threats have been made",
          "Establish whether relevant history exists",
        ],
      },
      {
        id: "s2",
        num: "02",
        title: "Immediate Threat",
        items: [
          "Establish whether anyone is in immediate danger",
          "Establish whether suspect/person remains present",
          "Establish whether suspect/person has left",
          "Establish direction/location if known",
          "Establish whether weapons are reported/suspected",
          "Establish whether serious threats have been made",
          "Establish safeguarding concerns",
          "Establish whether medical assistance is required",
        ],
      },
      {
        id: "s3",
        num: "03",
        title: "Resource / Deployment",
        items: [
          "Appropriate response priority assigned",
          "Supervisor involvement considered",
          "Officer safety information communicated",
          "Relevant intelligence made available",
          "Previous incidents identified",
          "Relevant force markers/warnings checked",
          "Additional resources considered",
          "Partner-agency involvement considered",
        ],
      },
      {
        id: "s4",
        num: "04",
        title: "Control Room Supervision",
        items: [
          "Incident monitored until attending officers establish control",
          "Updates obtained",
          "Changes in risk communicated",
          "Deterioration escalated",
          "Safeguarding actions considered",
          "Outstanding actions allocated",
          "Closure requirements confirmed",
        ],
      },
      {
        id: "s5",
        num: "05",
        title: "Escalation Triggers",
        items: [
          "Violence escalating",
          "Weapon reported",
          "Serious threat made",
          "Child/vulnerable person at risk",
          "Suspect/person returns",
          "Victim unable to safely leave",
          "Officer requests urgent assistance",
          "Significant history identified",
          "New intelligence changes risk",
        ],
      },
    ],
  },
  fts: {
    id: "fts",
    ref: "TAC-FTS-001",
    title: "Fail to Stop",
    subtitle: "Control room / FIM response checklist",
    accent: "purple",
    filters: ["control-room", "fim", "high-risk", "supervisory"],
    icon: "car",
    sections: [
      {
        id: "s1",
        num: "01",
        title: "Initial Report",
        items: [
          "Exact location",
          "Direction of travel",
          "Vehicle registration",
          "Vehicle description",
          "Occupants/person description where known",
          "Reason for attempted stop",
          "Speed / manner of driving",
          "Road / traffic conditions",
          "Weather / visibility",
          "Pedestrian / vulnerable road-user considerations",
          "Relevant intelligence or risk markers",
        ],
      },
      {
        id: "s2",
        num: "02",
        title: "Vehicle Fails to Stop",
        items: [
          "Incident graded appropriately",
          "Appropriate supervisor oversight established",
          "Applicable force policy considered",
          "Relevant intelligence obtained",
          "Vehicle/person information circulated",
          "Current location/direction maintained",
          "Available resources identified",
          "Appropriate specialist resources considered",
          "Communications channel managed",
        ],
      },
      {
        id: "s3",
        num: "03",
        title: "Ongoing Control Room Monitoring",
        liveRisk: true,
        items: [
          "Current location monitored",
          "Driving behaviour monitored",
          "Road environment assessed",
          "Pedestrian risk assessed",
          "Significant changes communicated",
          "Risk reassessed",
          "Resource position reviewed",
          "Continuation remains proportionate under applicable policy",
          "Decision rationale recorded",
        ],
      },
      {
        id: "s4",
        num: "04",
        title: "Change in Circumstances",
        items: [
          "Significant change communicated",
          "Supervisor updated",
          "Risk reassessed",
          "Available options reviewed",
          "Applicable policy reviewed",
          "Decision recorded",
        ],
      },
      {
        id: "s5",
        num: "05",
        title: "Conclusion",
        items: [
          "Conclusion/termination decision communicated where applicable",
          "Relevant units informed",
          "Alternative options considered where appropriate",
          "Vehicle/person information updated",
          "Outstanding risks identified",
          "Intelligence updated",
          "Incident log completed",
          "Decision rationale recorded",
          "Post-incident review considered",
        ],
      },
    ],
  },
};

export const CARD_LIST = Object.values(CARDS);

export function totalChecks(card: TacticCard): number {
  return card.sections.reduce((n, s) => n + s.items.length, 0);
}

export function checkKey(sectionId: string, index: number): string {
  return `${sectionId}_${index}`;
}
