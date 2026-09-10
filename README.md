# Synapse Lab — DataForge 2026

**Pathway:** Synaptic Plasticity: How a Neural Network Remembers — and Forgets  
**Team:** Parallax  
**Live artifact:** https://synapse-lab.hatchable.site

## Claim
Activity-dependent synaptic plasticity can create a temporary memory trace without changing the model's permanent trained parameters. In this educational toy model, increasing plasticity strengthens an association, while decay and interference reduce reliable recall.

## What this project demonstrates
Synapse Lab is an interactive experiment built around **Predict → Forge → Stress → Recall → Explain**. A user chooses a stimulus-response association, predicts whether it will survive, forges the association through activity-dependent reinforcement, applies decay/interference pressure, tests recall, and inspects the causal explanation.

The project also provides Synapse X-Ray, Memory Ghost, Interference Attack, Memory Duel, Memory Fingerprint, Memory Detective, Neural Weather, replay, JSON/CSV exports, a 60-second challenge, and Judge Mode.

## Technical model
For plasticity `p`, decay `d`, and interference `i`:

```text
learned = min(1, 0.12 + 0.78 × p/100)
final = clamp(learned × (1 − 0.72 × d/100) × (1 − 0.58 × i/100), 0, 1)
```

Recall is treated as reliable in the toy model when `final >= 0.48`.

These equations are deliberately transparent so the experiment can be reproduced from exported logs. They are not a biological model and should not be interpreted as a quantitative model of human memory.

## BDH connection
Synapse Lab is an **independent educational toy model inspired by published BDH concepts**. It is not the official BDH implementation, checkpoint, benchmark, or a biological simulation. The conceptual bridge is:

```text
activity → local synaptic update → changing synaptic state → recall
```

The UI separates published BDH concepts from what our implementation actually does.

## Demo walkthrough
1. **Predict** — choose Strong, Weak, or Forgotten before running the experiment.
2. **Forge** — choose a cue and target, set plasticity/decay/interference, and forge the association.
3. **Stress** — observe decay and interference pressure.
4. **Recall** — select the response and compare the outcome with the prediction.
5. **Explain** — use Memory Detective and Explain Back to identify the dominant mechanism.
6. **Compare** — inspect the Transformer vs BDH architecture bridge.

## Evidence & reproducibility
- Experiment records are stored for signed-in users in PostgreSQL through Hatchable.
- Anonymous visitors can explore the public demo; login is only needed for persistence/account analytics.
- The research console exports JSON and CSV logs.
- Replay restores the parameters of the latest experiment.
- The interface exposes learning, decay, interference, and final values.

## Repository structure

```text
synapse-lab/
├── api/
│   ├── admin-users.js
│   ├── experiments.js
│   └── me.js
├── migrations/
│   └── 0001_synapse_lab.sql
├── public/
│   ├── admin/index.html
│   ├── app.js
│   ├── index.html
│   ├── logout.html
│   └── style.css
├── hatchable.toml
└── README.md
```

## Local / Hatchable setup
The application is packaged as a Hatchable project. The frontend is static HTML/CSS/JavaScript; backend endpoints are JavaScript functions using the Hatchable SDK; PostgreSQL schema is in `migrations/`.

For a local code review, serve `public/` with a static server. Full persistence/auth behavior requires the Hatchable runtime and its managed database/auth services.

## Research context, 2022–2026
The project was informed by work on linear attention and recurrent/state-space sequence models, test-time learning, continual-learning plasticity, online continual memory, and the 2025 BDH line of work. The technical concept summary should be read alongside this repository for the full cited literature review.

## AI assistance disclosure
AI tools assisted with implementation brainstorming, explanatory copy, literature discovery/organization, and document/layout drafting. The team retained responsibility for the final implementation, evidence classification, source verification, and scientific claims. AI-generated material is not treated as a primary scientific source.

## License
Educational/hackathon project. Add the team's preferred license before public reuse.
