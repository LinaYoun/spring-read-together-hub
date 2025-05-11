# 영어 원서 읽기 동아리 Spring 홈페이지 PRD

## 1. 개요 (Introduction)

### 1.1 TL;DR
본 문서는 영어 원서 읽기 동아리 Spring을 위한 홈페이지 구축 프로젝트의 요구사항 정의서입니다.  
핵심 목표는 동아리 활동 정보의 비대칭 해소, 회원 참여도 향상, 운영 및 관리 업무의 자동화입니다.  
커뮤니티 기능, 자료 공유, 일정 관리를 중심으로 개발됩니다.

### 1.2 문제 정의 (Problem Statement)
- 비공식 채널(카톡, 메신저 등)에 정보가 파편화되어 있어 혼란 발생
- 신규 회원 적응 어려움
- 운영진의 과도한 수동 업무 부담
- 회원 참여도 저하

### 1.3 목표 (Goals)
#### 비즈니스 목표
- 운영 자동화로 관리 효율성 30% 이상 증가
- 정보 체계화로 신규 회원 적응도 증가

#### 사용자 목표
- 모든 활동 정보를 한 플랫폼에서 쉽게 확인
- 자유로운 소통과 소속감 증진
- 자신이 참여한 활동 기록 조회

#### 비목표 (Non-Goals)
- 실시간 채팅, 결제 시스템, 푸시 알림
- 비밀번호 변경/찾기 기능
- 고도화된 권한 시스템 (3단계만 적용)

---

## 2. 사용자 (Users)

| 사용자 그룹       | 주요 권한 및 기능 요약                                          |
|------------------|-------------------------------------------------------------|
| 동아리 회원       | 대부분의 기능 이용 가능 (게시판, 자료실, 일정 확인 등)               |
| 잠재 회원         | 공개 정보(소개 페이지 등)만 열람 가능                             |
| 사서 (Librarian) | 일정 등록/수정/삭제 가능. 회원 삭제 권한 있음                       |
| 관리자 (Admin)   | 전체 기능 제어 가능 (회원 관리, 콘텐츠 관리, 사서 계정 관리 등, 회원 삭제 권한만 없음)       |

---

## 3. 사용자 경험 (UX Flow)

### 3.1 회원 가입 및 승인
1. 잠재 회원이 가입 신청 양식 작성 후 제출
2. 관리자는 관리자 페이지에서 승인/반려
3. 승인 시 로그인 가능 상태 부여

### 3.2 일정 관리
1. 관리자/사서 로그인 후 일정 추가
2. 상세 정보 입력 → 저장
3. 일반 회원은 일정 열람만 가능

### 3.3 자료 공유
1. 로그인 후 자료 업로드 or 게시글 작성
2. 파일 첨부 및 저장
3. 목록 검색, 열람, 다운로드 가능

### 3.4 수다방
1. 짧은 글 작성 후 등록
2. 댓글 작성 가능
3. 본인 글/댓글 수정·삭제 가능
4. UI는 채팅 창처럼 리스트에서 모든 글 확인 가능

---

## 4. 기능 요구사항 (Functional Requirements)

### 4.1 회원 관리
- 가입 신청 양식 (이름, ID, 비밀번호, 이메일, 휴대폰 번호 필수, 가입 암호 'test123', 사서/일반회원 구분)
- 관리자 승인/반려 기능
- 로그인 후 자신의 정보 수정 기능(관리자와 회원 본인만 수정 가능)
- 회원 목록 및 실명(ID) 표시

### 4.2 콘텐츠 관리
- 소개 페이지(동아리 소개, 읽은 책 리스트, 표지, 사진)
- 게시판 (자유게시판, 독서후기 등의 목적)
- 자료실 (문서, 이미지, 동영상 각각 따로 제작)
- 공지사항 및 중요 정보 게시

### 4.3 캘린더 및 일정 관리
- 월/주/일별 보기 캘린더
- 일정 등록/수정/삭제 (관리자/사서)
- 일정 상세 정보 팝업

### 4.4 소통 기능
- 회원 연락망 조회
- 회원 가입 신청 시 관리자에게 이메일 발신 기능
- 수다방 (3줄 제한, 댓글 포함)

### 4.5 관리자 기능
- 관리자 페이지 전용 로그인
- 회원/콘텐츠/일정 관리 기능
- 관리자 아이디/암호는 'admin/admin'

---

## 5. 비기능 요구사항(시스템 보안)

### 5.1 Session ID Generation
- Use cryptographically secure random values  
- Session Storage: Securely store session data server-side  
- Secure Transmission: Transmit session IDs via secure cookies  
- Session Expiration: Implement both idle and absolute timeouts

### 5.2 Password Management
- Use a strong, modern hashing algorithm designed specifically for passwords: Argon2id
- Salt Management:  Always use a unique salt for each password 
- Let the hashing library handle salt generation and storage 

### 5.3 Secure Login Endpoint Implementation.
- HTTPS Only: Enforce HTTPS for all authentication traffic  
- CSRF Protection: Implement anti-CSRF tokens for login forms  
- Same-Site Cookies: Use SameSite=Lax or Strict for cookies  
- Secure and HttpOnly Flags: Set these flags on authentication cookies  
- Content Security Policy: Implement CSP headers to prevent XSS attacks

### 5.4 Types of Rate Limiting 
- Fixed Window Limiting: 5 per minute

---

## 6. 사용자 내러티브 (User Narrative)

> "신입들이 뭘 해야 할지 몰라요. 회장님은 다 수동으로 관리하고 있고요. 이 웹사이트가 있다면 소개 페이지로 쉽게 이해하고, 가입 신청도 가능하고, 자료랑 사진도 한눈에 보일 거예요. 수다방에서 질문하고, 자료실에서 필요한 것 찾아보면 더 편하고 즐거운 동아리 활동이 될 거예요!"

---

## 7. 성공 지표 (Success Metrics)

| 항목                | 목표 수치                        |
|---------------------|-------------------------------|
| 일정 등록 활성도      | 월 2건 이상                    |
| 수다방 활성도        | 주 7건 이상 (일 1회)            |
| 게시판 활성도        | 월 신규 글 20건 이상              |
| 소개 페이지 체류 시간 | 평균 2분 이상                    |

---

## 8. 기술 고려사항 (Technical Considerations)

- **권한 관리**: 4단계 권한 (관리자, 사서, 회원, 비회원)
- **파일 업로드**: 최대 동영상 500MB 제한
- **반응형 웹**: 다양한 기기 대응
- **이메일 발송**: 고정 관리자 주소 사용(00@gmail.com)
- **기술 스택**: 
- **배포 전략**: 서버 호스팅 및 릴리스 방식 고려

---

## 9. 개발 마일스톤 (Milestones & Sequencing)

1. **요구사항 확정 및 설계** (1주)
2. **회원 관리 기능 개발** (2주)
3. **콘텐츠 관리 기능 개발** (3주)
4. **일정 관리 기능 개발** (4주)
5. **소통 기능 개발** (5주)
6. **관리자 기능 및 통합 테스트** (6주)
7. **베타 테스트 및 운영 개시** (7주)

---

## 10. 제약사항 (Constraints)

- 비밀번호 변경 불가(test123으로 고정)
- 관리자 이메일 주소 고정
- 사용자명은 `실명 (아이디)` 형식
- 수다방 글자 수 제한 (3줄)
- 회원 탈퇴 기능 없음

---

## 11. 향후 고려사항 (Future Considerations)

- 비밀번호 찾기, 탈퇴 절차 개선
- 일정/공지 알림 기능
- 댓글 고도화 (대댓글, 수정 이력 등)
- 통합 검색 기능
- 회원별 활동 기록 기능
- 모바일 앱 개발