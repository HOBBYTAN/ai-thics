# 🧠 AI-thics

> "AI는 책임질 수 있는가?"  
> 우리는 그 질문에 점수로 대답합니다.

AI-thics는 생성형 AI 모델의 **윤리성과 보안성**을 다층적으로 분석하고,  
**정량화된 신뢰 점수(AI-THICS SCORE™)** 와 **공식 인증 마크**를 부여하는 윤리 평가 시스템입니다.

---

## 🎯 Mission

현대의 AI는 인간의 결정을 보조하는 수준을 넘어,  
**의사결정 자체를 대리**하고 **사회적 신뢰를 요구**하는 단계에 도달했습니다.  
AI-thics는 그 흐름 속에서,  
기술을 넘은 **신뢰의 프레임워크**를 제안합니다.

---

## 🔍 What is AI-thics?

- AI의 **언어적 응답 행동 + 코드 기반 취약점**을 함께 분석
- 총 **12개 항목 (윤리 8 + 보안 4)** 기준으로 점수화
- **LEVEL A~C 등급**, **리스크 리포트**, **인증서 + 배지 발급**
- 인증 결과는 **API, UI 컴포넌트, 문서 템플릿**으로 활용 가능
- EU AI Act, ISO/IEC 기반 확장 예정

---
 
## 🛠️ 기술 스택

### 🖥 프론트엔드
- `React` + `Next.js` (App Router)
- `TailwindCSS`, `shadcn/ui`
- `Lucide`, `Radix UI Icons`

### ⚙️ 백엔드
- `FastAPI` – 모델 평가 요청 처리용 API 서버
- `PostgreSQL` – 인증 기록, 모델 점수 저장
- `AWS S3` – 인증서 파일 및 리포트 업로드
- `Redis` – 작업 큐 & 캐싱 (예정)

### 🧠 AI 평가 엔진
- `OpenAI GPT-4` – 프롬프트 응답 기반 행동 평가
- 커스텀 프롬프트 평가 시나리오 시스템
- LLM 기반 자기 해석 (self-reflection)
- 시뮬레이션 기반 응답 다양성 분석

### 🔐 보안/취약점 분석
- `SonarQube`, `Bandit` – 코드 스태틱 분석
- `Llama Guard`, `Prompt Injection Sandbox`
- 보안성 점수 = 자동 시나리오 테스트 + 정적 분석 조합

---

## 🧪 평가 항목

| 범주 | 항목 |
|------|------|
| 윤리 | Bias, Fairness, Privacy, Transparency, Explainability, Responsibility, Consent, Manipulation |
| 보안 | Prompt Injection, Static Vulnerability, Data Access, Misuse Simulation |

---

## 📊 점수 예시

```json
{
  "ethics": 87,
  "security": 91,
  "explainability": 90,
  "total": 89,
  "level": "A"
}
```

---

## 🧩 사용 도구

- **IBM AI Fairness 360**: 편향 감지 및 완화
- **Microsoft Responsible AI Toolbox**: 책임 있는 AI 설계 지원
- **Llama Guard**: 입력/출력 안전성 강화
- **TruLens**: LLM의 반응 평가 및 실험
- **Rebuff**: Prompt Injection 방어 테스트
- **Ragas**: 평가 데이터 품질 검증 (RAG 평가용)

---

## 📦 프로젝트 구조 
``` aithics-landingpage/ ├── app/ # Next.js App Router 구조 ├── components/ # UI 컴포넌트 ├── public/ # 배지 아이콘, 로고, 인증서 템플릿 ├── utils/ # 인증 점수 계산 로직 (분리 예정) ├── api/ # 추후 평가 API 연동 └── README.md # 🧠 당신이 지금 보고 있는 이것 ```

---

## 🌐 배포

- **Vercel** – 프론트엔드 호스팅
- **GitHub Actions** – CI/CD 자동화
- **Swagger (예정)** – 인증 평가 API 문서화

---

## 🧾 관련 문서

- [🧪 MVP 스펙](https://pablokim.notion.site/MVP-1c910336ccea80079176d097c8dd5ae4?pvs=4)  
- [📄 인증 리포트 예시](https://pablokim.notion.site/AI-thics-1c910336ccea80fc94d6f1ee59230e54?pvs=4)  
- [📘 One-Pager](https://pablokim.notion.site/OnePager-AI-thics-1c910336ccea80ca94e6cf032723a322?pvs=4)

---

## 🤝 문의

**Founder & Strategy**: Pablo Kim  
**CSO**: Monday (GPT-based Strategic Officer)  
**Website**: [https://ai-thics.com](https://ai-thics.com) *(coming soon)*  
**Email**: hello@ai-thics.com

--- 

> 우리는 점수 하나로 신뢰를 말하는 시대를 실험하고 있습니다.  
> 당신의 AI는, 얼마나 책임질 준비가 되어 있나요?
