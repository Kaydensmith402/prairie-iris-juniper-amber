import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tactics-store-7v1K1lJQ.js
var GOLDEN_QUESTIONS = [
	{
		key: "know",
		label: "What do we know?"
	},
	{
		key: "dont",
		label: "What don't we know?"
	},
	{
		key: "risk",
		label: "Who is at risk?"
	},
	{
		key: "doing",
		label: "What are we doing about it?"
	},
	{
		key: "who",
		label: "Who needs to know?"
	},
	{
		key: "record",
		label: "What needs recording?"
	},
	{
		key: "review",
		label: "When are we reviewing?"
	}
];
var CARDS = {
	fir: {
		id: "fir",
		ref: "TAC-FIR-001",
		title: "Firearms Incident",
		subtitle: "Control room / FIM response checklist",
		accent: "red",
		filters: [
			"control-room",
			"fim",
			"high-risk",
			"supervisory"
		],
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
					"Establish reliable communications arrangements"
				]
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
					"Information reliability considered"
				]
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
					"Significant decisions and rationale recorded"
				]
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
					"Is formal handover required?"
				]
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
					"Post-incident review requirement considered"
				]
			}
		]
	},
	mis: {
		id: "mis",
		ref: "TAC-MIS-001",
		title: "Missing Person — High Risk",
		subtitle: "Control room / FIM response checklist",
		accent: "blue",
		filters: [
			"control-room",
			"fim",
			"high-risk",
			"supervisory"
		],
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
					"Establish immediate threat to life or serious harm"
				]
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
					"New information assessed for impact on risk"
				]
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
					"Search/review strategy established where required"
				]
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
					"Escalation considered if circumstances change"
				]
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
					"New intelligence materially changes assessment"
				]
			}
		]
	},
	dom: {
		id: "dom",
		ref: "TAC-DOM-001",
		title: "Domestic Incident",
		subtitle: "Control room / FIM response checklist",
		accent: "orange",
		filters: [
			"control-room",
			"fim",
			"high-risk",
			"supervisory"
		],
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
					"Establish whether relevant history exists"
				]
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
					"Establish whether medical assistance is required"
				]
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
					"Partner-agency involvement considered"
				]
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
					"Closure requirements confirmed"
				]
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
					"New intelligence changes risk"
				]
			}
		]
	},
	fts: {
		id: "fts",
		ref: "TAC-FTS-001",
		title: "Fail to Stop",
		subtitle: "Control room / FIM response checklist",
		accent: "purple",
		filters: [
			"control-room",
			"fim",
			"high-risk",
			"supervisory"
		],
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
					"Relevant intelligence or risk markers"
				]
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
					"Communications channel managed"
				]
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
					"Decision rationale recorded"
				]
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
					"Decision recorded"
				]
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
					"Post-incident review considered"
				]
			}
		]
	}
};
var CARD_LIST = Object.values(CARDS);
function checkKey(sectionId, index) {
	return `${sectionId}_${index}`;
}
var emptyGolden = () => ({
	know: "",
	dont: "",
	risk: "",
	doing: "",
	who: "",
	record: "",
	review: ""
});
function defaultCardState(cardId) {
	const card = CARDS[cardId];
	const checks = {};
	card.sections.forEach((sec) => {
		sec.items.forEach((_, i) => {
			checks[checkKey(sec.id, i)] = false;
		});
	});
	return {
		checks,
		status: "active",
		risk: "medium",
		fimInvolved: false,
		command: "routine",
		supervisor: "",
		reviewTime: "",
		golden: emptyGolden(),
		notes: "",
		timestampedNotes: [],
		decisions: [],
		handover: null,
		liveRisk: cardId === "fts" ? {
			location: "",
			driving: "",
			road: "",
			traffic: "",
			pedestrians: "",
			weather: "",
			elapsed: "00:00",
			resources: "",
			currentRisk: "medium"
		} : null,
		incidentNo: "SHC/2026/000123",
		lastSaved: null
	};
}
function allCardStates() {
	return {
		fir: defaultCardState("fir"),
		mis: defaultCardState("mis"),
		dom: defaultCardState("dom"),
		fts: defaultCardState("fts")
	};
}
function markSaved(card) {
	return {
		...card,
		lastSaved: (/* @__PURE__ */ new Date()).toISOString()
	};
}
var STATUS_META = {
	active: {
		label: "Active",
		tone: "ok"
	},
	monitoring: {
		label: "Monitoring",
		tone: "info"
	},
	escalated: {
		label: "Escalated",
		tone: "warn"
	},
	fim: {
		label: "FIM Involved",
		tone: "danger"
	},
	handover: {
		label: "Handover Required",
		tone: "alt"
	},
	complete: {
		label: "Complete",
		tone: "ok"
	}
};
function getProgress(card, checks) {
	let total = 0;
	let done = 0;
	let secDone = 0;
	card.sections.forEach((sec) => {
		let all = true;
		sec.items.forEach((_, i) => {
			total += 1;
			if (!!checks[checkKey(sec.id, i)]) done += 1;
			else all = false;
		});
		if (all && sec.items.length) secDone += 1;
	});
	return {
		total,
		done,
		pct: total ? Math.round(done / total * 100) : 0,
		secDone,
		secTotal: card.sections.length
	};
}
var useTacticsStore = create()(persist((set, get) => ({
	operator: "K. Smith",
	role: "CRO",
	uid: "1364",
	cards: allCardStates(),
	recent: [],
	hydrated: false,
	setHydrated: (v) => set({ hydrated: v }),
	touch: (id) => {
		const recent = [{
			id,
			at: Date.now()
		}, ...get().recent.filter((r) => r.id !== id)].slice(0, 8);
		const cards = { ...get().cards };
		cards[id] = markSaved(cards[id]);
		set({
			recent,
			cards
		});
	},
	toggleCheck: (id, key) => {
		const cur = get().cards[id];
		set({
			cards: {
				...get().cards,
				[id]: markSaved({
					...cur,
					checks: {
						...cur.checks,
						[key]: !cur.checks[key]
					}
				})
			},
			recent: [{
				id,
				at: Date.now()
			}, ...get().recent.filter((r) => r.id !== id)].slice(0, 8)
		});
	},
	patchCard: (id, patch) => {
		const cur = get().cards[id];
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				...patch
			})
		} });
	},
	setGolden: (id, key, value) => {
		const cur = get().cards[id];
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				golden: {
					...cur.golden,
					[key]: value
				}
			})
		} });
	},
	setLiveRisk: (id, patch) => {
		const cur = get().cards[id];
		if (!cur.liveRisk) return;
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				liveRisk: {
					...cur.liveRisk,
					...patch
				}
			})
		} });
	},
	addDecision: (id, d) => {
		const cur = get().cards[id];
		const next = [...cur.decisions, {
			...d,
			id: crypto.randomUUID()
		}].sort((a, b) => a.time.localeCompare(b.time));
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				decisions: next
			})
		} });
	},
	updateDecision: (id, decisionId, d) => {
		const cur = get().cards[id];
		const next = cur.decisions.map((x) => x.id === decisionId ? {
			...d,
			id: decisionId
		} : x).sort((a, b) => a.time.localeCompare(b.time));
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				decisions: next
			})
		} });
	},
	deleteDecision: (id, decisionId) => {
		const cur = get().cards[id];
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				decisions: cur.decisions.filter((x) => x.id !== decisionId)
			})
		} });
	},
	saveNotes: (id, notes) => {
		const cur = get().cards[id];
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				notes
			})
		} });
	},
	timestampNote: (id) => {
		const cur = get().cards[id];
		const text = cur.notes.trim();
		if (!text) return;
		const note = {
			id: crypto.randomUUID(),
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit"
			}),
			operator: get().operator,
			text
		};
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				notes: "",
				timestampedNotes: [note, ...cur.timestampedNotes]
			})
		} });
	},
	clearNotesDraft: (id) => {
		const cur = get().cards[id];
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				notes: ""
			})
		} });
	},
	completeHandover: (id, h) => {
		const cur = get().cards[id];
		const record = {
			...h,
			time: (/* @__PURE__ */ new Date()).toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit"
			}),
			operator: get().operator
		};
		set({ cards: {
			...get().cards,
			[id]: markSaved({
				...cur,
				handover: record,
				status: "handover"
			})
		} });
	},
	resetCard: (id) => {
		set({ cards: {
			...get().cards,
			[id]: defaultCardState(id)
		} });
	}
}), {
	name: "policenet_tactics_v1",
	storage: createJSONStorage(() => {
		if (typeof window === "undefined") return {
			getItem: () => null,
			setItem: () => {},
			removeItem: () => {}
		};
		return localStorage;
	}),
	skipHydration: true,
	merge: (persisted, current) => {
		const p = persisted ?? {};
		const cards = allCardStates();
		Object.keys(cards).forEach((id) => {
			const incoming = p.cards?.[id];
			if (!incoming) return;
			cards[id] = {
				...cards[id],
				...incoming,
				checks: {
					...cards[id].checks,
					...incoming.checks
				},
				golden: {
					...cards[id].golden,
					...incoming.golden
				},
				liveRisk: incoming.liveRisk ?? cards[id].liveRisk
			};
		});
		return {
			...current,
			...p,
			cards,
			recent: p.recent ?? current.recent,
			hydrated: false
		};
	},
	partialize: (s) => ({
		operator: s.operator,
		role: s.role,
		uid: s.uid,
		cards: s.cards,
		recent: s.recent
	})
}));
function unfinishedCards(state) {
	return CARD_LIST.map((c) => ({
		card: c,
		prog: getProgress(c, state.cards[c.id].checks)
	})).filter((x) => x.prog.done > 0 && x.prog.done < x.prog.total);
}
//#endregion
export { checkKey as a, useTacticsStore as c, STATUS_META as i, CARD_LIST as n, getProgress as o, GOLDEN_QUESTIONS as r, unfinishedCards as s, CARDS as t };
