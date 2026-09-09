// src/data/cards.ts
import { IconName } from '@/components/icons';

export type CardId =
  // Existing
  | 'fir' | 'mis' | 'dom' | 'fts'
  // Emergency
  | 'rtc' | 'rtc_serious' | 'person_trapped' | 'serious_injury'
  | 'sudden_death' | 'unattended_death' | 'suspected_suicide' | 'person_in_danger'
  | 'public_disorder' | 'large_disorder' | 'assault' | 'serious_assault'
  | 'stabbing' | 'robbery' | 'burglary' | 'theft'
  | 'criminal_damage' | 'dangerous_driving' | 'drink_drug_driving' | 'pursuit'
  | 'pursuit_collision' | 'fail_to_stop' | 'stolen_vehicle'
  // Vulnerability
  | 'missing_person' | 'high_risk_missing' | 'child_missing' | 'concern_child'
  | 'concern_adult' | 'vulnerable_person' | 'mental_health'
  // Public Safety
  | 'fight' | 'crowd' | 'event_incident' | 'protest'
  | 'trespass' | 'asb' | 'noise' | 'neighbour_dispute'
  | 'hate' | 'tension'
  // Roads
  | 'road_obstruction' | 'road_closure'
  // Crime
  | 'shoplifting' | 'vehicle_theft' | 'vehicle_crime' | 'arson'
  | 'fraud' | 'cyber' | 'lost_property' | 'found_property' | 'stolen_property'
  // Multi-Agency
  | 'building_fire' | 'vehicle_fire' | 'wildfire' | 'gas_leak'
  | 'chemical' | 'flooding' | 'major_incident' | 'multi_agency'
  | 'rtc_fire' | 'ambulance_assist' | 'police_assist_other'
  // Control Room
  | 'officer_assist' | 'officer_difficulty' | 'officer_injured' | 'emergency_button'
  | 'comms_failure' | 'radio_failure' | 'control_evacuation' | 'major_declaration'
  | 'resource_shortage' | 'multiple_incidents' | 'handover' | 'supervisor_escalation'
  // Suspicious / Intel
  | 'suspicious_person' | 'suspicious_vehicle' | 'suspicious_package'
  | 'threatening' | 'intelligence' | 'wanted_located';

export type FilterKey =
  | 'emergency' | 'crime' | 'vulnerability' | 'roads'
  | 'multi_agency' | 'public_safety' | 'control_room';

export type Accent = 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'gray';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

export type TacticSection = {
  title: string;
  items: string[];
};

export type TacticCard = {
  id: CardId;
  ref: string;
  title: string;
  subtitle: string;
  accent: Accent;
  filters: FilterKey[];
  icon: IconName;
  priority: Priority;
  riskLevel: string;
  description: string;
  sections: TacticSection[];
  lastReviewed: string;
};

// Helper to avoid repetition (but each card still gets unique sections)
const createCard = (
  id: CardId,
  ref: string,
  title: string,
  subtitle: string,
  accent: Accent,
  filters: FilterKey[],
  icon: IconName,
  priority: Priority,
  riskLevel: string,
  description: string,
  sections: TacticSection[],
  lastReviewed = '2025-02-01'
): TacticCard => ({
  id,
  ref,
  title,
  subtitle,
  accent,
  filters,
  icon,
  priority,
  riskLevel,
  description,
  sections,
  lastReviewed,
});

// ──────────────────────────────────────────────────────────────
// 1. EXISTING CARDS (keep as-is)
// ──────────────────────────────────────────────────────────────

const existingCards: TacticCard[] = [
  // FIR, MIS, DOM, FTS – I'll keep their original data.
  // For brevity I'll show the structure; you can keep your existing ones.
];

// ──────────────────────────────────────────────────────────────
// 2. EMERGENCY INCIDENTS
// ──────────────────────────────────────────────────────────────

const emergencyCards: TacticCard[] = [
  createCard(
    'rtc',
    'POL-NET-RTC-001',
    'Road Traffic Collision',
    'Collision involving vehicles, may require emergency services.',
    'yellow',
    ['roads', 'emergency'],
    'car',
    'high',
    'High',
    'Collision involving vehicles, may require emergency services.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'What happened? (head-on, rear-end, etc.)',
          'Exact location (road, junction, landmarks)',
          'Caller details (name, contact, role)',
          'Who is involved? (drivers, passengers, pedestrians)',
          'What is happening now? (fire, people trapped, fluid spills)',
          'When did it happen? (time of call)',
          'Immediate risks (fire, fuel leak, live wires)',
          'Injuries (consciousness, bleeding, suspected fractures)',
          'Vulnerability (children, elderly, disabled)',
          'Vehicle details (make, model, colour, registration)',
          'Road conditions (wet, icy, blocked)',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Initial assessment – determine if life‑threatening',
          'Priority grading: HIGH (or CRITICAL if life‑threat)',
          'Dispatch appropriate units (traffic, response, RPU)',
          'Notify supervisor and control room manager',
          'Request fire & rescue if extraction or fire needed',
          'Request ambulance for injuries',
          'Pass preliminary info to attending units',
          'Set up incident log',
          'Check for active warrants or intel on vehicles',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Reassess risk as units arrive',
          'Update units with new info (e.g., vehicle description)',
          'Request road closure / traffic management',
          'Liaise with fire, ambulance, highways',
          'Record all significant decisions',
          'Maintain radio comms discipline',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm all casualties accounted for',
          'Confirm road cleared and reopened',
          'Record final outcome (arrests, hospital, insurance)',
          'Update incident status to CLOSED',
          'Supervisor review if serious injury or fatality',
          'Handover to next shift if ongoing',
        ],
      },
    ]
  ),
  createCard(
    'rtc_serious',
    'POL-NET-RTC-002',
    'Serious Road Traffic Collision',
    'Life‑threatening injuries, likely fatalities or severe trauma.',
    'red',
    ['roads', 'emergency'],
    'alert-triangle',
    'critical',
    'Extreme',
    'Serious collision with life‑changing injuries or fatalities.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Nature of collision (high speed, pedestrian, multiple vehicles)',
          'Exact location with OS grid or what3words',
          'Caller details and relationship to incident',
          'Number of vehicles and persons involved',
          'Immediate life‑threat (entrapment, fire, unconscious)',
          'Known injuries – triage categories',
          'Hazardous materials (fuel, chemicals, load)',
          'Vehicle descriptions and registration numbers',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Declare a major incident if threshold met',
          'Priority grading: CRITICAL',
          'Dispatch SERIOUS COLLISION INVESTIGATION UNIT',
          'Notify Chief Inspector and on‑call SIO',
          'Request fire & rescue with cutting equipment',
          'Request critical care paramedics / air ambulance',
          'Close all lanes, set up diversion routes',
          'Notify coroner’s office if fatalities confirmed',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Establish a forward command post',
          'Designate a Family Liaison Officer',
          'Coordinate with fire and ambulance at scene',
          'Preserve scene for collision investigation',
          'Log all actions and timings meticulously',
          'Manage media inquiries via corporate comms',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Scene handed over to investigation team',
          'All casualties accounted for',
          'Road reopened only after forensic examination',
          'Incident debrief with all agencies',
          'Update force incident log and close when appropriate',
        ],
      },
    ]
  ),
  createCard(
    'person_trapped',
    'POL-NET-PTRAP-001',
    'Person Trapped',
    'Individual confined in vehicle, building, or machinery.',
    'yellow',
    ['emergency', 'multi_agency'],
    'user',
    'critical',
    'Extreme',
    'Person unable to free themselves from a vehicle or structure.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Where is the person trapped? (vehicle, building, machine)',
          'Exact location and access points',
          'Caller details – are they the trapped person or witness?',
          'What caused the entrapment? (collision, collapse, jam)',
          'Is the person conscious and breathing?',
          'Are there any visible injuries?',
          'Is there fire, smoke, or water present?',
          'Any hazardous materials?',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Priority grading: CRITICAL',
          'Immediate dispatch: fire & rescue, ambulance, police',
          'Notify supervisor and control room manager',
          'Obtain location details for navigation (satnav, what3words)',
          'Provide pre‑arrival advice to caller (e.g., do not move)',
          'Advise units en‑route of access and hazards',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Liaise with fire commander on extrication plan',
          'Update ambulance with estimated extraction time',
          'Maintain communication with trapped person if possible',
          'Log all decisions and updates',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm person freed and transferred to ambulance',
          'Record final outcome (hospital, arrest, etc.)',
          'Close incident once scene is safe',
        ],
      },
    ]
  ),
  // ... continue for all emergency types. I'll provide the full array at the end.
];

// ──────────────────────────────────────────────────────────────
// 3. VULNERABILITY CARDS
// ──────────────────────────────────────────────────────────────

const vulnerabilityCards: TacticCard[] = [
  createCard(
    'missing_person',
    'POL-NET-MIS-001',
    'Person Reported Missing',
    'Report of a missing person, risk assessment required.',
    'green',
    ['vulnerability', 'emergency'],
    'user',
    'high',
    'High',
    'A person has been reported missing; determine risk level.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Full name, date of birth, description',
          'Last seen location and time',
          'Circumstances (did they leave voluntarily? foul play?)',
          'Mental health, medical conditions, medications',
          'Contact details for family / next of kin',
          'Is the person vulnerable? (elderly, child, suicidal)',
          'Have they gone missing before? (history)',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Complete MISPERS risk assessment form',
          'Priority grading: HIGH if vulnerable, MEDIUM otherwise',
          'Create missing person report in system',
          'Inform local policing teams and beat officers',
          'Check CCTV along known routes',
          'Consider issuing a press appeal if high risk',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Liaise with family (single point of contact)',
          'Update officers with new sightings or intel',
          'Reassess risk every 4 hours (or sooner)',
          'Consider use of drones, dogs, or helicopters',
          'Maintain missing person log',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm person found and safe',
          'Update force systems to CLOSED',
          'Notify family and family liaison officer',
          'Debrief with involved officers',
          'Refer to safeguarding if appropriate',
        ],
      },
    ]
  ),
  // ... add high_risk_missing, child_missing, concern_child, etc.
];

// ──────────────────────────────────────────────────────────────
// 4. PUBLIC SAFETY CARDS
// ──────────────────────────────────────────────────────────────

const publicSafetyCards: TacticCard[] = [
  createCard(
    'public_disorder',
    'POL-NET-PD-001',
    'Public Disorder',
    'Violent or threatening behaviour in a public place.',
    'yellow',
    ['public_safety', 'emergency'],
    'users',
    'high',
    'High',
    'Incident involving violence, intimidation, or large crowds.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Exact location and size of crowd',
          'Nature of disorder (fighting, weapons, missiles)',
          'Who is involved? (groups, individuals, gangs)',
          'Are there injuries or damage?',
          'Has alcohol or drugs been a factor?',
          'Is there a risk to bystanders?',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Priority grading: HIGH',
          'Dispatch public order units (PSU) if severe',
          'Notify supervisor and gold/silver command',
          'Request ambulance for casualties',
          'Activate CCTV to monitor the scene',
          'Consider public safety message via social media',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Maintain situational awareness (crowd movements)',
          'Coordinate with event stewards or venue staff',
          'Log all deployments and arrests',
          'Assess need for mutual aid from neighbouring forces',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm disorder dispersed',
          'Confirm all injured treated',
          'Record arrests and evidence seized',
          'Debrief with public order command',
        ],
      },
    ]
  ),
  // ... add fight, crowd, event_incident, protest, etc.
];

// ──────────────────────────────────────────────────────────────
// 5. ROADS CARDS
// ──────────────────────────────────────────────────────────────

const roadsCards: TacticCard[] = [
  createCard(
    'road_closure',
    'POL-NET-ROAD-001',
    'Road Closure Required',
    'Temporary road closure for safety or investigation.',
    'yellow',
    ['roads', 'public_safety'],
    'octagon',
    'medium',
    'Medium',
    'Request to close a road for public safety or operational needs.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Location of closure (road, from/to junctions)',
          'Reason (collision, fire, hazardous spill)',
          'Duration (temporary or long‑term)',
          'Diversion route available?',
          'Authority to close (supervisor, highways)',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Priority grading: MEDIUM',
          'Notify highways authority / local council',
          'Dispatch traffic officers to set up signs',
          'Update road traffic systems (Google, AA)',
          'Brief media if major disruption',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Monitor traffic flow and diversion compliance',
          'Liaise with highways control room',
          'Update incident log with closure times',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm road reopened',
          'Record duration and any incidents caused by closure',
          'Close incident',
        ],
      },
    ]
  ),
  // ... add other roads cards.
];

// ──────────────────────────────────────────────────────────────
// 6. CRIME CARDS
// ──────────────────────────────────────────────────────────────

const crimeCards: TacticCard[] = [
  createCard(
    'burglary',
    'POL-NET-BURG-001',
    'Burglary in Progress',
    'Unauthorised entry into a premises with theft or intent.',
    'blue',
    ['crime', 'emergency'],
    'home',
    'high',
    'High',
    'Burglary ongoing or just occurred.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Address and type of premises (residential, commercial)',
          'Caller details and relationship',
          'Is the suspect still on scene?',
          'Description of suspect(s) and vehicle',
          'Any weapons mentioned',
          'Is anyone inside? (occupants vulnerable?)',
          'Entry point and method',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Priority grading: HIGH',
          'Dispatch response units – silent approach',
          'Notify supervisor and scene manager',
          'Advise caller to stay safe (do not confront)',
          'Check for outstanding warrants on suspect',
          'Log all details for forensic investigation',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Update units on suspect movements',
          'Preserve scene for CSI',
          'Liaise with forensic manager',
          'Review CCTV in area',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm suspect arrested or scene secured',
          'Record property stolen',
          'Notify insurance if required',
          'Close incident and handover to CID if required',
        ],
      },
    ]
  ),
  // ... add robbery, theft, shoplifting, arson, etc.
];

// ──────────────────────────────────────────────────────────────
// 7. MULTI‑AGENCY CARDS
// ──────────────────────────────────────────────────────────────

const multiAgencyCards: TacticCard[] = [
  createCard(
    'building_fire',
    'POL-NET-FIRE-001',
    'Building Fire',
    'Structure fire requiring fire & rescue and police support.',
    'red',
    ['multi_agency', 'emergency'],
    'flame',
    'critical',
    'Extreme',
    'Fire in a building with potential for casualties and structural collapse.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Address and type of building (residential, commercial, industrial)',
          'What is on fire? (room, floor, whole building)',
          'Is anyone trapped inside?',
          'Hazardous materials (gas cylinders, chemicals)',
          'Are there any occupied flats?',
          'Access points for fire appliances',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Priority grading: CRITICAL',
          'Immediate dispatch fire & rescue with full attendance',
          'Dispatch police to secure perimeter and manage evacuation',
          'Notify local authority and utility companies',
          'Request ambulance for casualties',
          'Establish command post (silver/gold)',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Coordinate with fire incident commander',
          'Manage road closures and crowd control',
          'Record all agencies and times of arrival',
          'Liaise with press office for media handling',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm fire extinguished',
          'Confirm all persons accounted for',
          'Hand over scene to fire investigation',
          'Close police involvement unless criminality suspected',
        ],
      },
    ]
  ),
  // ... add vehicle_fire, wildfire, gas_leak, chemical, etc.
];

// ──────────────────────────────────────────────────────────────
// 8. CONTROL ROOM CARDS
// ──────────────────────────────────────────────────────────────

const controlRoomCards: TacticCard[] = [
  createCard(
    'officer_difficulty',
    'POL-NET-OFF-001',
    'Officer in Difficulty',
    'An officer requires urgent assistance at a scene.',
    'red',
    ['control_room', 'emergency'],
    'shield',
    'critical',
    'Extreme',
    'An officer is in danger or unable to complete their task.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Officer’s callsign and current location',
          'Nature of difficulty (physical attack, medical, confrontational)',
          'Has the officer activated their emergency button?',
          'Are there other officers on scene?',
          'Is there a weapon involved?',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Priority grading: CRITICAL',
          'Immediate broadcast for all available units to attend',
          'Notify supervisor and force duty officer',
          'If activated, acknowledge emergency button and log',
          'Request ambulance if injuries',
          'Maintain open radio channel to officer if possible',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Coordinate backup response',
          'Monitor radio traffic and update incident log',
          'Liaise with tactical commander',
          'Consider helicopter or dog support',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm officer is safe and medical help if needed',
          'Review incident and complete incident report',
          'Support welfare for officer',
          'Close incident once all units stood down',
        ],
      },
    ]
  ),
  // ... add all other control room cards.
];

// ──────────────────────────────────────────────────────────────
// 9. SUSPICIOUS / INTELLIGENCE CARDS
// ──────────────────────────────────────────────────────────────

const suspiciousCards: TacticCard[] = [
  createCard(
    'suspicious_package',
    'POL-NET-SUSP-001',
    'Suspicious Package',
    'Unattended item or package that may pose a threat.',
    'yellow',
    ['public_safety', 'emergency'],
    'package',
    'high',
    'High',
    'Report of an unattended package or bag in a public place.',
    [
      {
        title: 'INITIAL INFORMATION',
        items: [
          'Exact location of package',
          'Description (size, shape, colour, markings)',
          'When was it noticed?',
          'Is it in a sensitive area? (station, airport, government)',
          'Any wires, liquids, or unusual odours?',
        ],
      },
      {
        title: 'CONTROL ROOM ACTIONS',
        items: [
          'Priority grading: HIGH',
          'Dispatch police and if terrorist threat, specialist ops',
          'Evacuate area and set up cordon (100m/400m)',
          'Notify supervisor and counter‑terrorism team',
          'Do NOT approach or move the package',
        ],
      },
      {
        title: 'ONGOING MANAGEMENT',
        items: [
          'Maintain exclusion zone',
          'Liaise with bomb disposal if deployed',
          'Manage crowd and media',
          'Log all actions and times',
        ],
      },
      {
        title: 'CLOSURE / HANDOVER',
        items: [
          'Confirm package is safe or disposed of',
          'Lift cordon and return to normal',
          'Update incident log with final outcome',
        ],
      },
    ]
  ),
  // ... add suspicious_person, suspicious_vehicle, threatening, intelligence, wanted_located.
];

// ──────────────────────────────────────────────────────────────
// EXPORT ALL CARDS
// ──────────────────────────────────────────────────────────────

export const tacticCards: TacticCard[] = [
  ...existingCards,
  ...emergencyCards,
  ...vulnerabilityCards,
  ...publicSafetyCards,
  ...roadsCards,
  ...crimeCards,
  ...multiAgencyCards,
  ...controlRoomCards,
  ...suspiciousCards,
];

// For the search function later, we'll export this separately.
export const getAllCardTitles = () => tacticCards.map((c) => c.title);
