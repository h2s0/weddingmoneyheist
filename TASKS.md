# TASKS.md

# Portfolio Dashboard Development Tasks

## 공통 작업 원칙

* `design/`에 존재하는 UI와 동작을 우선 구현한다.
* `design/`에 없는 기능은 임의로 추가하지 않는다.
* tooltip, modal, animation, filter, sorting, search, pagination 등은 design/ 또는 SPEC.md/TASKS.md에 명시된 경우에만 구현한다.
* 사용성에 꼭 필요하다고 판단되는 경우에도 먼저 작업 계획에 이유를 적고 최소 범위로 구현한다.
* 기능 추가보다 디자인 재현과 안정적인 구조를 우선한다.

## Phase 1 — 프로젝트 초기화

* [ ] pnpm 기반 프로젝트 생성
* [ ] React + TypeScript + Vite 설정
* [ ] Tailwind CSS 설정
* [ ] ESLint / Prettier 설정
* [ ] path alias 설정
* [ ] 기본 폴더 구조 생성
* [ ] dark mode 설정
* [ ] 기본 디자인 토큰 설정

완료 조건:

* pnpm dev 실행 가능
* pnpm build 성공
* pnpm lint 성공
* pnpm typecheck 성공

---

## Phase 2 — 디자인 시스템 구축

* [ ] CSS Variables 정의
* [ ] color token 정의
* [ ] radius token 정의
* [ ] shadow token 정의
* [ ] typography scale 정의
* [ ] 공통 Card component 구현
* [ ] 공통 Button component 구현
* [ ] WidgetCard 구조 구현

완료 조건:

* light/dark mode 정상 동작
* design/ 레퍼런스와 시각적 방향 일치

---

## Phase 3 — 타입 & Mock 데이터 구축

* [ ] PortfolioSummary 타입 정의
* [ ] Holding 타입 정의
* [ ] Transaction 타입 정의
* [ ] EquityCurvePoint 타입 정의
* [ ] DashboardWidget 타입 정의
* [ ] mock portfolio data 생성
* [ ] mock holdings 생성
* [ ] mock transactions 생성
* [ ] formatter 유틸 구현

완료 조건:

* mock 데이터 기반 렌더링 가능
* any 사용 없음

---

## Phase 4 — Dashboard Grid 구현

* [ ] react-grid-layout 설정
* [ ] responsive breakpoint 설정
* [ ] widget drag handle 구현
* [ ] widget resize 구현
* [ ] layout persistence 구현
* [ ] layout reset 구현

완료 조건:

* desktop/tablet/mobile 동작
* widget overflow 없음

---

## Phase 5 — Portfolio Summary Widget

* [ ] summary widget UI 구현
* [ ] 수익률 스타일링 구현
* [ ] gain/loss color 처리
* [ ] loading state 구현
* [ ] empty state 구현
* [ ] error state 구현

완료 조건:

* mock 데이터 연결 완료
* dark mode 정상 동작

---

## Phase 6 — Holdings Widget

* [ ] holdings table 구현
* [ ] responsive table 처리
* [ ] 수익률 표시 구현
* [ ] 비중 표시 구현
* [ ] overflow 처리
* [ ] empty state 구현

완료 조건:

* mobile 대응 완료
* overflow 없음

---

## Phase 7 — Transactions Widget

* [ ] 거래 내역 리스트 구현
* [ ] 날짜 formatter 적용
* [ ] 매수/매도 스타일 분리
* [ ] 메모 UI 구현
* [ ] empty state 구현

완료 조건:

* 가독성 검증 완료
* dark mode 정상 동작

---

## Phase 8 — Equity Curve Chart

* [ ] Recharts line chart 구현
* [ ] 기간 필터 구현
* [ ] tooltip 구현
* [ ] responsive chart 처리
* [ ] loading state 구현

완료 조건:

* chart overflow 없음
* mobile readability 확보

---

## Phase 9 — Theme & UX Polish

* [ ] theme persistence 구현
* [ ] animation polish
* [ ] hover interaction 개선
* [ ] focus state 개선
* [ ] accessibility 개선
* [ ] touch interaction 개선

완료 조건:

* keyboard navigation 가능
* contrast 문제 없음

---

## Phase 10 — API Layer 준비

* [ ] query hook 구조 정리
* [ ] API abstraction 작성
* [ ] mock → API 교체 가능한 구조 정리
* [ ] websocket 구조 설계

완료 조건:

* 실제 API 교체 가능한 상태
* 관심사 분리 유지

---

## Final QA

* [ ] pnpm lint
* [ ] pnpm typecheck
* [ ] pnpm build
* [ ] dark mode QA
* [ ] responsive QA
* [ ] accessibility QA
* [ ] performance QA

최종 완료 조건:

* production build 성공
* 모바일 사용 가능
* design/ 방향성과 일치
* mock 기반 전체 동작 가능
