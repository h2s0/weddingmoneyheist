# 프로젝트 개발 지시서

## 목표

아빠의 주식 포트폴리오를 보기 쉽게 관리하는 웹 대시보드를 새로 개발한다.  
기존 코드는 직접 마이그레이션하지 않는다.

design/ 폴더의 구현 코드는 복사하지 않지만,
최종 UI/UX는 design/ 폴더의 디자인을 최대한 동일하게 재현한다.

즉:

디자인은 최대한 동일하게 구현
아키텍처와 코드는 현대적인 React/TypeScript 기반으로 새로 작성

## 기술 스택

## Package Manager

이 프로젝트는 pnpm 기반으로 관리한다.

```bash
pnpm install
pnpm dev
```

---

## 개발 원칙

* 서버 상태는 TanStack Query 사용
* UI 상태는 Zustand 사용
* UI는 목데이터 기반으로 먼저 구현
* 실제 Kiwoom API는 이후 교체 가능하도록 분리

### Frontend
- React
- TypeScript
- Vite 또는 Next.js
- Tailwind CSS
- react-grid-layout
- Recharts
- Zustand
- TanStack Query

### Backend
- NestJS 또는 FastAPI
- PostgreSQL
- Redis
- WebSocket 또는 SSE
- Kiwoom OpenAPI 연동

## 핵심 기능

1. 포트폴리오 요약
   - 원금
   - 현재 평가액
   - 예수금
   - 총 손익
   - 수익률

2. 보유 종목
   - 종목명
   - 티커
   - 보유 수량
   - 평균 매수가
   - 현재가
   - 평가금액
   - 손익
   - 수익률
   - 비중

3. 매매 기록
   - 날짜
   - 매수/매도
   - 종목명
   - 수량
   - 가격
   - 메모

4. 수익률 차트
   - 기간별 평가금액 추이
   - 1주 / 1개월 / 3개월 / 전체 필터

5. 위젯 레이아웃
   - `react-grid-layout` 사용
   - 위젯 이동 가능
   - 위젯 크기 조절 가능
   - 레이아웃 저장
   - 초기화 기능

6. 테마
   - 라이트 모드
   - 다크 모드
   - 로컬 저장

## 개발 방향

처음에는 목데이터 기반으로 UI를 완성한다.  
이후 API 연동 구조를 분리해서 실제 키움 OpenAPI 데이터로 교체할 수 있게 만든다.

## 폴더 구조 예시

```txt
src/
  app/
  components/
    dashboard/
    widgets/
    layout/
    common/
  stores/
  hooks/
  api/
  types/
  styles/
  mocks/
design/
  app.jsx
  data.jsx
  index.html
  widgets.jsx
```
  
### 주의사항
design/ 폴더의 코드는 복사하지 말고 디자인 방향만 참고한다.
새 프로젝트는 TypeScript 기반으로 작성한다.
위젯 컴포넌트는 독립적으로 재사용 가능하게 만든다.
데이터 타입을 먼저 정의하고 UI를 구현한다.
실제 API가 없을 때는 mocks/ 데이터를 사용한다.
투자 자문처럼 보이는 문구는 피하고, 단순 조회/관리 서비스로 표현한다.