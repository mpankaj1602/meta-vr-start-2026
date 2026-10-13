# Lamplight round 3: Lead Engineer

## Scores

```
Win,Feasibility,Difficulty
6,3,3
```

Difficulty falls with the cuts. Win and Feasibility hold: my 7 / 4 required checks 1-3, and none has run.

## Adopted

Changes 3, 4, 5, 7, 8, 10, 11, 12 in full, 2 and 9 in part, plus the engine, reversal rule and six checks.

## Not adopted or weakened

- Audio on every card (1) is now Could: acceptable; the memo rung and re-saying remain.
- Release-to-stop (2) became "a pause or second pinch": matters if pause detection fails beside a television.
- System keyboard (6) fell to Should: matters, see must fix 1.

## Buildability check

- Offline reason (req 4): buildable only as local rules; starter cards have no history. Resolved by authored preset reasons.
- Live understood words (8): needs a held streaming connection, contradicting "stateless" (24). Resolved by check 2, else words shown on stopping.
- Voice invited after the payoff (7): only page-level grants are reported; an in-session prompt is unconfirmed. Resolved by extending check 1, else re-entering through instant resume.
- Previews on the judge's cards (23): local, buildable; "day 7" has nothing to show from Must features.
- No-attention server (24): credible for stateless batch calls, unconfirmed for streaming.
- "Exactly where they were left" (5): rests on untested check 5. Resolved by storing positions relative to the lamp.

## Must fix

1. Without voice nobody can write their own card, yet the fallback is "ship with voice removed". One silent authoring route must be Must.
2. Name one chooser: the lamp's pick and reason come from local rules in every mode, and state what the model adds beyond extraction. Otherwise the Agentic claim rests on something the first run never shows.
3. Define day 7 from Must features alone, or preview only "tomorrow".

## Verdict

The Web SDK recommendation stands; I would build this over Three Stones only if checks 1-3 pass within two headset days, since today both score Win 6 and Three Stones is safer.
