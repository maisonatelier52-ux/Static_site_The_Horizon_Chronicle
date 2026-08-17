const standard = (subject) => [
  {
    id: "commitment",
    title: "Our commitment",
    paragraphs: [`Horizon Chronicle treats ${subject} as part of credible journalism, not as a box to check after publication. This policy describes the standards used by this demonstration newsroom and should be reviewed by your legal and editorial teams before production use.`],
  },
  {
    id: "practice",
    title: "How the policy works",
    paragraphs: ["Editors assign clear responsibility, preserve relevant records, and document material decisions. Readers should be able to understand who is accountable, how to raise a concern, and what happens after a concern is received.", "We distinguish editorial judgment from commercial, political, and personal interests. Exceptions require senior review and should be explained when they materially affect a reader’s understanding."],
  },
  {
    id: "review",
    title: "Review and accountability",
    paragraphs: ["The newsroom reviews this policy at least annually and after any material incident that reveals a gap in procedure. Substantive revisions are dated and communicated to the people responsible for implementation."],
  },
];

export const policies = {
  "editorial-policy": { title: "Editorial policy", intro: "How we report, verify, edit, label, and update our journalism.", sections: standard("editorial independence and accuracy") },
  "corrections-policy": { title: "Corrections policy", intro: "How readers can flag an error and how we repair the record.", sections: [
    { id: "report", title: "Report a possible error", paragraphs: ["Send the article URL, the disputed passage, and supporting evidence through our contact form. We acknowledge substantive requests and route them to an editor who was not the sole author of the passage."] },
    { id: "correct", title: "How we correct", paragraphs: ["Clear factual errors are corrected promptly. Material corrections receive a note describing what changed; small typographical repairs that do not change meaning may be made silently.", "We do not remove accurate published work simply because it becomes inconvenient. We consider privacy, safety, and legal requests individually."] },
    { id: "archive", title: "A durable record", paragraphs: ["Updates preserve the integrity of the public record. The publication date remains visible, substantial updates receive a new timestamp, and article metadata reflects the latest material change."] },
  ] },
  "privacy-policy": { title: "Privacy policy", intro: "The information this starter may collect and the choices readers should have.", sections: standard("reader privacy, data minimization, and security") },
  "advertising-policy": { title: "Advertising policy", intro: "The line separating commercial relationships from newsroom decisions.", sections: standard("advertising transparency and editorial separation") },
  "ownership-funding": { title: "Ownership & funding", intro: "How transparent ownership protects independent reporting.", sections: standard("ownership disclosure, funding transparency, and editorial control") },
  "right-of-reply": { title: "Right of reply", intro: "How people and organizations covered by our reporting can respond.", sections: standard("fair opportunity to comment and meaningful response") },
  "source-methodology": { title: "Source methodology", intro: "How we assess documents, interviews, data, experts, and anonymous sources.", sections: standard("source verification, attribution, protection, and corroboration") },
  "legal": { title: "Legal notice", intro: "General publication information for this demonstration project.", sections: standard("legal notices, rights, responsibilities, and permitted use") },
  "terms-and-conditions": { title: "Terms & conditions", intro: "The conditions governing use of this demonstration publication.", sections: standard("site access, content use, availability, and reader responsibilities") },
};
