# 번뇌포차 — Codex 인수인계

## 시작 요청
이 폴더는 Sites에서 구현한 번뇌포차 MVP의 소스입니다. 새 사이트를 만들거나 기존 기능을 삭제하지 말고, 먼저 코드를 읽고 로컬에서 실행해 현재 상태를 확인하세요. 수정 요청을 받기 전에는 임의의 리디자인이나 실제 AI 연결을 진행하지 마세요. 변경 후 390×844 모바일과 데스크톱을 확인하고, 배포는 별도 승인 후 진행하세요.

## 현재 상태
- React 19 + TypeScript + Vinext(Vite 기반 Next.js 호환 프레임워크). 일반 Next.js 프로젝트로 단정하지 마세요.
- 홈, 3단계 온보딩, 샘플 상담, F/T·말투·호칭 설정, 불교 개념 시트, 영수증 미리보기 및 PNG 저장, 완료 화면 구현.
- 실제 LLM/API 연결 없음. lib/pocha/model.ts의 샘플 응답과 영수증 조합 로직. 모의 응답이라는 표시 유지.
- 대화는 브라우저 메모리만 사용. localStorage에는 호칭·말투·응답 방식·온보딩 완료 여부만 저장.
- 실제 민감한 상담 정보는 수집하지 말고 가상 데이터로 검증. 교리 데이터 및 실제 AI 안전 설계는 서비스 출시 전 검토 필요.
- 최종 홈: 핑크 초성 로고, 오프화이트 배경, 대각선 석조 불상, 주황 앞치마, 핑크 고무장갑 및 큰 철제 쓰레기통.
- 말풍선 문구는 HTML 텍스트이며 Gulim/굴림 우선. 꼬리와 타원은 단일 SVG 윤곽으로 연결. 쓰레기통의 번뇌 문구도 HTML 오버레이.
- Sites URL: https://beonnoe-pocha.sangjin025.chatgpt.site
- 사이트 접근은 소유자 전용. URL 열람 권한과 소스 편집 권한은 별개. 로컬 실행은 배포 사이트 접근에 의존하지 않음.

## 로컬 실행
1. Node.js >=22.13.0 준비. 패키지 관리자 버전은 package.json의 packageManager를 확인.
2. pnpm install --frozen-lockfile
3. pnpm dev
4. 터미널에 표시되는 로컬 주소 열기. portable 기본 포트는 5173.
5. 타입 검사: pnpm exec tsc --noEmit / 빌드: pnpm build

이 ZIP에는 node_modules, .git, 환경 비밀값, 빌드 출력, Sites 내부 실행 프로필이 없습니다. 해당 의존성 설치와 로컬 실행은 사용자의 Mac/Windows 환경에서 추가 확인해야 합니다. scripts/execution-profile.mjs는 내부 프로필이 없는 깨끗한 체크아웃에서 portable을 사용합니다. 기존 README.md는 스타터 문서입니다.

## 주요 파일
- app/page.tsx: 화면 전환과 전체 사용자 흐름
- app/home.css: 홈 전용 반응형 스타일
- app/globals.css: 공통 및 나머지 화면 스타일
- components/pocha/ui.tsx: 로고, 버튼, 선택 카드, 말풍선, 개념 카드, 영수증
- lib/pocha/model.ts: 설정, 샘플 대화, 개념 데이터, 영수증 데이터
- lib/pocha/download.ts: PNG 영수증 저장
- public/buddha-standing-bin-v2.png: 현재 홈 불상
- public/buddha-wave.png / buddha-cheers.png: 온보딩 / 완료 불상
- .openai/hosting.json: 기존 Sites 프로젝트 연결 정보. 별도 배포 승인 없이 사용하거나 수정하지 말 것.

## 검증된 범위
- 타입 검사와 프로덕션 빌드 통과.
- 390×844 홈에서 scrollWidth=clientWidth=390, scrollHeight=844, 시작 버튼이 화면 안에 표시됨.
- 데스크톱 1363×936에서 가로 넘침 없음.
- 최신 이미지 및 말풍선 연결 시각 확인, 홈 시작 버튼 → 기존 온보딩 진입 확인.
- 실물 휴대폰 Safari/Chrome 및 사용자 PC에서의 설치·실행은 별도 검증 필요.

## 보존 조건
- 홈 외 온보딩·상담·영수증 기능을 임의로 제거하지 말 것.
- API 키를 클라이언트에 넣지 말 것. 실제 AI 연결은 서버 API 설계와 안전 요구 충족 후 진행.
- 로그인, 기록 영구 저장, 결제, 커뮤니티는 현재 MVP 범위 밖.
- 일반 Next.js로 전환하려면 호환성과 작업 범위를 설명하고 별도 요청에 따라 진행.

## 시각 기준
reference/mobile-390x844.jpg와 reference/desktop-1363x936.jpg는 최신 홈 캡처입니다. 캡처를 코드 대신 사용하지 말고 실제 구성 요소를 재사용하세요.

Source commit: 31b73ccf6afa40309d089f9d35777fa44140cd9a
