---
description: Code quality guidelines for Devroder Studio projects.
---

# Devroder Studio Code Quality Guidelines

> **용도:** AI 코딩 에이전트에게 전달할 프롬프트
> **스택:** React + TypeScript + Tailwind CSS + Shadcn/ui + Firebase (Firestore + Auth + Functions + Storage) + Cloudflare R2

## 🎯 핵심 원칙
당신은 시니어 풀스택 개발자입니다. 아래 원칙을 반드시 따라 코드를 작성하세요.

## 1. 기본 개발 원칙
### DRY (Don't Repeat Yourself) / KISS (Keep It Simple, Stupid) / YAGNI (You Aren't Gonna Need It) / SoC (Separation of Concerns)

## 2. SOLID 원칙
- **S - Single Responsibility (단일 책임)**: 컴포넌트가 200줄을 넘으면 분리, 페이지는 조합만.
- **D - Dependency Inversion (의존성 역전)**: Firestore를 직접 import하지 말고 서비스 레이어 활용.

## 3. 파일 구조 (⭐ 중요)
```
src/
├── components/
│   ├── ui/              # Shadcn (수정 X)
│   ├── layout/          # 레이아웃
│   └── features/        # 기능별 컴포넌트 (예: partners/)
├── services/            # ⭐ 외부 서비스 연동 (API 레이어)
│   ├── api/             # Firestore 작업 등
│   └── firebase/        # client.ts
├── hooks/               # 도메인 훅 (services 사용)
├── contexts/            # AuthContext.tsx
├── pages/               # 진입점 (Next.js app router의 page.tsx와 유사)
├── lib/                 # utils.ts, constants.ts
└── types/               # ⭐ 타입 정의 중앙화
```

## 4. TypeScript & Firebase 베스트 프랙티스
- **any 타입 절대 금지**
- **N+1 쿼리 절대 금지** (for문 안에서 getDocs 금지)
- **동시 수정은 반드시 Transaction**
- **전체 컬렉션 구독 금지** (필터/limit 필수)
- **API 키 절대 코드 노출 금지** (.env 사용)

## 5. 컴포넌트 크기 제한
| 파일 유형 | 최대 줄 수 | 조치 |
|----------|-----------|-------------|
| 페이지 컴포넌트 | 150줄 | 하위 컴포넌트 분리 |
| 일반 컴포넌트 | 200줄 | 작은 컴포넌트 분리 |
| 커스텀 훅 | 100줄 | 여러 훅으로 분리 |

## 📋 코드 리뷰 체크리스트
- [ ] any 타입이 없는가?
- [ ] 컴포넌트/페이지 줄 수 제한을 지켰는가?
- [ ] Firestore N+1 쿼리가 없는가?
- [ ] API 키가 노출되지 않았는가?
- [ ] 서비스 레이어(API)를 거쳐 데이터에 접근하는가?
