# SPEC.md

# Portfolio Dashboard Product Specification

---

# 1. 제품 목적

이 프로젝트는 아버지의 주식 포트폴리오를 쉽고 안정적으로 조회하기 위한 개인용 대시보드이다.

투자 추천 서비스가 아니다.

목표:

* 현재 자산 현황을 한눈에 보기 쉽게 제공
* 부모님 세대도 이해 가능한 UI 제공
* 감성적이고 부드러운 UX 유지
* 복잡한 트레이딩 UI 지양

---

# 2. 디자인 기준

최종 UI는 design/ 폴더의 디자인을 최대한 동일하게 재현한다.

다만 기존 코드를 복사하지 않는다.

허용:

* 디자인 재현
* 동일한 레이아웃
* 동일한 시각적 구조
* 동일한 interaction 흐름

금지:

* 기존 architecture 재사용
* global script 재사용
* inline Babel 재사용

---

# 3. 공통 UI 원칙

우선순위:

1. 단순함
2. 가독성
3. 안정감
4. 친근함

다음 스타일은 지양한다:

* 공격적인 트레이딩 UI
* 과도한 animation
* crypto 스타일
* 복잡한 hover interaction
* 전문가용 HTS 느낌

---

# 4. 디자인 기반 구현 원칙

design/에 존재하는 UI와 interaction을 우선 구현한다.

design/에 없는 기능은 임의로 추가하지 않는다.

다음 기능은 명시된 경우에만 구현한다:

* tooltip
* modal
* animation
* filter
* sorting
* search
* dropdown
* pagination

추가가 필요하면 최소 범위로 구현한다.

---

# 5. Dashboard Layout

대시보드는 widget 기반 구조를 사용한다.

필수 기능:

* widget drag
* widget resize
* responsive layout
* layout persistence
* layout reset

drag는 drag handle 기반으로 동작한다.

---

# 6. Portfolio Summary Widget

표시 항목:

* 총 자산
* 평가 손익
* 수익률
* 예수금

필수 상태:

* loading
* empty
* error

수익/손실은 색상으로 구분한다.

---

# 7. Holdings Widget

표시 항목:

* 종목명
* 현재가
* 평가금액
* 손익
* 수익률
* 비중

테이블 overflow가 발생하지 않아야 한다.

모바일에서는 가독성을 우선한다.

---

# 8. Transactions Widget

거래 기록은 시간순으로 정렬한다.

표시 항목:

* 날짜
* 매수/매도
* 종목명
* 수량
* 가격
* 메모

매수/매도는 시각적으로 구분한다.

---

# 9. Equity Curve Chart

차트는 Recharts 기반으로 구현한다.

지원 필터:

* 1주
* 1개월
* 3개월
* 전체

design/에 없는 interaction은 추가하지 않는다.

---

# 10. Theme

지원:

* light mode
* dark mode

theme는 localStorage에 저장한다.

---

# 11. Data Rules

초기 구현은 mock data 기반으로 진행한다.

실제 API 연동 전까지는:

* Kiwoom 스타일 데이터 구조 유지
* realistic mock data 사용

mock data는:

* 정상 상태
* 빈 상태
* loading 상태
* error 상태

를 포함해야 한다.

---

# 12. Accessibility

필수:

* keyboard navigation
* focus visibility
* semantic HTML
* readable contrast

부모님 세대 기준의 readability를 우선한다.

---

# 13. Responsive

지원:

* desktop
* tablet
* mobile

작은 화면에서도:

* overflow 없음
* widget 사용 가능
* chart 가독성 유지

를 만족해야 한다.

---

# 14. 성능 기준

불필요한 rerender를 최소화한다.

차트 계산은 memoization을 우선 고려한다.

layout 변경 시 전체 rerender를 피한다.
