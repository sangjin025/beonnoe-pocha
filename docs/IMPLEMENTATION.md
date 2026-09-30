# 번뇌포차 MVP

React 19 + TypeScript + Vinext (Next.js App Router compatibility) on Sites.

## Functional scope
Home, three independent onboarding screens, conversation, preference editing, concept detail sheets, receipt preview, local PNG download, completion and restart.

## Mock boundary
All conversations and receipt applications/actions use `lib/pocha/model.ts:sampleProvider`. This is deterministic local sample logic, NOT an LLM. Topics are selected by keywords; followups rotate through illustrative concepts. It cannot genuinely understand or accurately summarize arbitrary conversation. Every counseling and receipt view labels the sample state.

`CounselorProvider` is the replacement seam. Official concept definitions and source links are fixed in CONCEPTS; model output should refer to concept IDs, not author/alter definitions. The Korean definitions are editorial summaries checked against primary text translations, not certified doctrinal review. Obtain qualified review before launch.

## Real API launch requirements
- Implement same-origin server route and server-only secret, not browser API calls or NEXT_PUBLIC credentials.
- Allowlist concept IDs, validate response shape and lengths, derive definitions server-side; do not accept model-created doctrines or citations.
- Server-side input/output moderation, crisis handling without philosophical advice or alcohol recommendations, explicit fictional persona disclosure.
- Real rate limiting, timeout/cancellation, retries and abuse controls. Current 500-character / 20-turn / 800ms limits are only local demonstration controls, not enforceable security boundaries.
- Review actual data processing, consent, retention, provider settings, hosting logs and privacy disclosures. No live counseling until complete.
- Keyword sensitivity check is a limited demonstration, not comprehensive detection; UI requests fictional test data only.

## Data
Only `{name, tone, mode, completed}` stored under `pocha.preferences.v1`. No message or receipt localStorage, DB, telemetry, logging, or conversation network request. Conversation and receipt stay in React memory; refreshing or returning home clears them. PNG is drawn on-device from the same ReceiptData; save is explicit.

## Accessibility and mobile
Semantic radio primitives and focus-managed Radix bottom sheets. Korean input with IME-aware Enter, Shift+Enter line breaks, viewport-fit safe areas, dynamic viewport + VisualViewport keyboard sizing, minimum 16px editable text. No maximum-scale restriction. All static image text and bubbles are HTML/CSS; Gulim explicitly specified. System fallback applies when Gulim is absent.

## QA
TypeScript check, pure provider scenario/safety/data-shape tests, and browser flow checks. Physical iOS/Android keyboard behavior must also be checked before release. PNG downloads on iOS may open a save/share view rather than directly save to Photos.
