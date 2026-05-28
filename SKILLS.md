# SKILLS.md

# 개발 워크플로우 & 구현 패턴

이 문서는 반복적으로 사용하는 구현 방식, 리뷰 흐름, 작업 패턴을 정의한다.

AGENTS.md가 규칙과 정책 중심이라면,
SKILLS.md는 실제 구현 방법과 작업 흐름 중심으로 사용한다.

---

# Skill — 작업 시작 워크플로우

코딩을 시작하기 전에 반드시 아래 순서로 진행한다.

1. 작업 목표 요약
2. 영향 받는 파일 식별
3. 필요한 타입 정의 식별
4. 리스크 식별
5. 구현 순서 제안
6. 재사용 가능한 구조 여부 검토

즉시 코딩부터 시작하지 않는다.

---

# Skill — 디자인 레퍼런스 분석

사용 시점:

* UI 구현 시작 시
* 위젯 구현 시
* 테마 작업 시
* 디자인 토큰 생성 시

작업 순서:

1. design/ 폴더 파일 분석
2. 컬러 팔레트 정리
3. spacing 패턴 정리
4. 카드 구조 분석
5. typography 방향 분석
6. interaction 패턴 분석
7. React + TypeScript 기반으로 재구현

정리해야 하는 항목:

* 사용 색상
* radius
* shadow
* spacing scale
* typography scale
* widget 구조
* animation 패턴
* dark mode 구조

주의사항:

* 기존 구현 코드를 직접 복사하지 않는다
* 기존 architecture를 재사용하지 않는다
* global script를 재사용하지 않는다

---

# Skill — 타입 정의 워크플로우

UI 구현 전에 타입을 먼저 정의한다.

작업 순서:

1. API 데이터 shape 정의
2. UI 데이터 shape 정의
3. nullable 여부 정의
4. formatter 필요 여부 확인
5. mock data shape 정의

필요 시:

* API 타입
* UI 타입
* ViewModel 타입

을 분리한다.

예시:

* PortfolioSummary
* Holding
* Transaction
* EquityCurvePoint
* DashboardWidget

---

# Skill — Mock Data Pattern

초기 구현은 mock 데이터 기반으로 진행한다.

mock 데이터는:

* 실제 Kiwoom 응답과 유사한 구조
* 현실적인 숫자 범위
* 다양한 상태 포함

을 만족해야 한다.

반드시 포함:

* 정상 데이터
* 빈 데이터
* loading 상태
* error 상태

mock 데이터는 mocks/ 내부에서 관리한다.

---

# Skill — Query Hook Pattern

서버 데이터 접근은 반드시 query hook을 통해 수행한다.

컴포넌트 내부에서 직접 fetch하지 않는다.

예시:

* usePortfolioSummaryQuery
* useHoldingsQuery
* useTransactionsQuery
* useEquityCurveQuery

권장 구조:

```txt
api/
hooks/query/
```

query hook은:

* query key
* stale handling
* caching
* loading state
* error state

를 함께 관리해야 한다.

---

# Skill — Zustand Store Pattern

Zustand는 UI 상태 전용으로 사용한다.

store는 작고 명확하게 유지한다.

권장 예시:

* useThemeStore
* useDashboardLayoutStore
* useWidgetPreferenceStore

지양:

* giant store
* unrelated state mixing
* server data 저장

selector 사용으로 unnecessary rerender를 최소화한다.

---

# Skill — Formatter Pattern

숫자 및 문자열 포맷팅 로직은 컴포넌트 내부에 작성하지 않는다.

반드시 lib/formatters 로 분리한다.

예시:

* formatCurrency
* formatPercent
* formatSignedNumber
* formatCompactNumber
* formatDate

UI는 formatting 결과만 사용한다.

---

# Skill — Widget 구현 워크플로우

위젯 구현 시 아래 순서를 따른다.

1. widget type 정의
2. mock data 연결
3. formatter 연결
4. query hook 연결
5. presentation component 구현
6. loading state 구현
7. empty state 구현
8. error state 구현
9. responsive 검증
10. dark mode 검증

위젯은 반드시:

* 독립적이어야 한다
* layout-independent 해야 한다
* 직접 fetch하지 않는다
* 비즈니스 로직을 포함하지 않는다

---

# Skill — Widget Composition Pattern

위젯은 공통 구조를 재사용한다.

권장 구조:

```txt
WidgetCard
 ├── WidgetHeader
 ├── WidgetContent
 ├── WidgetFooter
 ├── WidgetLoading
 ├── WidgetEmpty
 └── WidgetError
```

공통 스타일과 spacing은 재사용 가능해야 한다.

---

# Skill — Theme Token Pattern

색상은 CSS Variables 기반으로 관리한다.

예시:

```css
--color-background
--color-card
--color-border
--color-muted
--color-profit
--color-loss
```

Tailwind config와 연결해서 사용한다.

금지:

* 하드코딩된 hex color
* 컴포넌트별 개별 색상 정의
* 중복 spacing 값

---

# Skill — React Grid Layout 구현 패턴

react-grid-layout은 반드시 안정적으로 동작해야 한다.

검증 항목:

* stable widget id
* drag handle 정상 동작
* resize 정상 동작
* responsive breakpoint 정상 동작
* overflow 없음
* layout persistence 동작
* mobile layout 정상 동작

전체 카드 드래그 대신 drag handle 사용을 우선한다.

---

# Skill — 반응형 구현 패턴

반응형은 desktop-first가 아니라 usability-first 기준으로 구현한다.

반드시 검증:

* desktop
* tablet
* mobile

확인 항목:

* overflow 여부
* typography 가독성
* touch interaction
* spacing 유지
* widget stacking
* chart readability

---

# Skill — 접근성 검토 패턴

반드시 확인:

* keyboard navigation
* focus visibility
* semantic HTML
* aria-label
* contrast
* touch-friendly control size

버튼은 반드시 semantic button 사용을 우선한다.

---

# Skill — 성능 검토 패턴

검토 항목:

* expensive calculation memoization
* unnecessary rerender 여부
* inline object recreation 여부
* stable reference 여부
* lazy loading 필요 여부
* oversized parent rerender 여부

차트 데이터 계산은 memoization을 우선 고려한다.

---

# Skill — 아키텍처 검토 패턴

작업 완료 전 반드시 확인:

* 관심사 분리
* dependency direction
* folder structure
* component responsibility
* reusable structure
* API/UI separation
* circular import 여부

비즈니스 로직은 UI component 내부에 두지 않는다.

---

# Skill — 리팩토링 패턴

리팩토링은 기능이 안정적으로 동작한 이후 진행한다.

목표:

* duplication 제거
* prop drilling 감소
* readability 향상
* maintainability 향상
* component responsibility 정리

과도한 abstraction은 피한다.

---

# Skill — QA 워크플로우

commit 전 반드시 실행:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

반드시 확인:

* console error 없음
* dark mode 정상 동작
* responsive 정상 동작
* loading state 존재
* empty state 존재
* error state 존재
* accessibility 문제 없음

실패 상태에서는 commit하지 않는다.

---

# Skill — Commit Workflow

작업 순서:

1. 변경 파일 리뷰
2. verification command 실행
3. 실패 수정
4. conventional commit 생성
5. 변경 사항 요약
6. 검증 결과 출력

권장:

* 작은 단위 commit
* 기능 단위 commit
* 리뷰 가능한 크기 유지

---

# Skill — PR Review Workflow

작업 종료 전 반드시 설명:

1. 무엇이 변경되었는가
2. 왜 변경했는가
3. 어떤 아키텍처 결정을 내렸는가
4. 어떤 tradeoff가 있었는가
5. 향후 개선 가능 사항

단순 구현 설명이 아니라 의사결정까지 설명한다.
