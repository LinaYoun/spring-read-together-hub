# Spring Read Together Hub - 디자인 가이드

## 1. 개요

본 문서는 'Spring Read Together Hub' 프로젝트의 UI 디자인 가이드라인을 정의합니다. 일관된 사용자 경험을 제공하기 위해 색상 팔레트, 타이포그래피, 주요 스타일링 접근 방식을 기술합니다.

## 2. 색상 팔레트 (Color Palette)

프로젝트는 `shadcn/ui`의 `slate`를 기본 색상 테마로 사용하며, CSS 변수를 통해 관리됩니다. 추가적으로 독서 동아리의 분위기를 살린 'bookish' 커스텀 팔레트를 사용합니다.

### 2.1 테마 색상 (HSL 기반 - `slate` 테마)

다음은 `src/index.css`에 정의된 핵심 테마 색상의 HSL 값입니다.

- **Background**: `hsl(35 38% 95%)` - 기본 배경색
- **Foreground**: `hsl(0 59% 20%)` - 기본 전경색 (텍스트 등)
- **Card**: `hsl(35 38% 95%)` - 카드 배경색
- **Card Foreground**: `hsl(0 59% 20%)` - 카드 전경색
- **Popover**: `hsl(35 38% 95%)` - 팝오버 배경색
- **Popover Foreground**: `hsl(0 59% 20%)` - 팝오버 전경색
- **Primary**: `hsl(0 41% 39%)` - 주요 상호작용 색상 (버튼 등)
- **Primary Foreground**: `hsl(35 38% 95%)` - Primary 색상 위의 전경색
- **Secondary**: `hsl(0 23% 46%)` - 보조 상호작용 색상
- **Secondary Foreground**: `hsl(35 38% 95%)` - Secondary 색상 위의 전경색
- **Muted**: `hsl(35 25% 88%)` - 덜 강조되는 요소의 배경색
- **Muted Foreground**: `hsl(0 23% 30%)` - Muted 배경 위의 전경색
- **Accent**: `hsl(0 33% 49%)` - 강조 색상
- **Accent Foreground**: `hsl(35 38% 95%)` - Accent 색상 위의 전경색
- **Destructive**: `hsl(0 84% 60%)` - 삭제/경고 등 파괴적인 액션 색상
- **Destructive Foreground**: `hsl(35 38% 95%)` - Destructive 색상 위의 전경색
- **Border**: `hsl(0 23% 80%)` - 테두리 색상
- **Input**: `hsl(0 23% 80%)` - 입력 필드 테두리/배경 관련 색상
- **Ring**: `hsl(0 41% 39%)` - 포커스 링 등 외곽선 강조 색상

### 2.2 커스텀 "Bookish" 팔레트

`tailwind.config.ts`에 정의된 커스텀 색상입니다. 주로 웹사이트의 전반적인 분위기를 조성하는 데 사용됩니다.

- **`bookish-maroon`**: `#8B3A3A` (어두운 적갈색) - 헤딩, 리본 등에 사용
- **`bookish-cream`**: `#FFF8E7` (크림색) - 기본 `body` 배경
- **`bookish-dark`**: `#5A2626` (매우 어두운 적갈색) - 기본 `body` 텍스트
- **`bookish-accent`**: `#A65353` (중간톤 적갈색)
- **`bookish-light`**: `#F2E8D5` (밝은 베이지색)

### 2.3 사이드바 전용 색상 (HSL 기반)

`tailwind.config.ts`의 `sidebar` 키를 통해 정의되며, CSS 변수 (`--sidebar-background` 등)로 참조됩니다. 구체적인 HSL 값은 전역 CSS에 정의된 기본 테마 색상에서 파생될 수 있습니다.

- `sidebar-background`
- `sidebar-foreground`
- `sidebar-primary`
- `sidebar-primary-foreground`
- `sidebar-accent`
- `sidebar-accent-foreground`
- `sidebar-border`
- `sidebar-ring`

## 3. 타이포그래피 (Typography)

### 3.1 폰트 패밀리

Google Fonts를 통해 두 가지 주요 폰트 패밀리를 가져와 사용합니다.

- **Serif**: `Playfair Display` (Georgia, serif 폴백)
  - 주로 헤딩(`h1`-`h6`)에 사용되며, `bookish-maroon` 색상과 함께 고전적이고 우아한 느낌을 줍니다.
- **Sans-serif**: `Raleway` (sans-serif 폴백)
  - 주로 본문 텍스트에 사용되며, `bookish-dark` 색상과 함께 가독성을 높입니다.

### 3.2 기본 스타일

- **Body**: `bookish-cream` 배경색, `bookish-dark` 텍스트 색상, `Raleway` 폰트가 기본으로 적용됩니다.
- **Headings (`h1`-`h6`)**: `Playfair Display` 폰트와 `bookish-maroon` 색상이 적용됩니다.

## 4. 레이아웃 및 간격 (Layout & Spacing)

- **Container**: 중앙 정렬되며, 기본 패딩은 `2rem`, 최대 너비는 `1400px` (`2xl` 브레이크포인트)로 설정됩니다.
- **Border Radius**: CSS 변수 `--radius` (기본값 `0.5rem`)를 기반으로 `lg`, `md`, `sm` 크기가 정의됩니다.
  - `lg`: `var(--radius)`
  - `md`: `calc(var(--radius) - 2px)`
  - `sm`: `calc(var(--radius) - 4px)`

## 5. 주요 스타일링 접근 방식

- **Tailwind CSS**: 핵심 스타일링 프레임워크로 사용됩니다. 유틸리티 클래스 기반의 빠른 UI 개발을 지원합니다.
- **shadcn/ui**: UI 컴포넌트 라이브러리로, `slate`를 기본 색상 테마(`baseColor`)로 사용하며, CSS 변수를 통해 커스터마이징됩니다.
- **CSS 변수**: `src/index.css`에서 HSL 기반의 색상 변수와 `--radius` 같은 크기 변수를 정의하여 전역적으로 일관된 스타일을 유지합니다.
- **전역 스타일**: `src/index.css`의 `@layer base`를 통해 HTML 요소의 기본 스타일(body, headings 등)을 재정의하고, 커스텀 유틸리티 클래스(`.ribbon`, `.page-border`)를 추가합니다.
- **애니메이션**: `tailwindcss-animate` 플러그인을 사용하여 아코디언 등의 애니메이션 효과를 구현합니다.

## 6. 참고 파일

- `tailwind.config.ts`
- `components.json`
- `src/index.css` 