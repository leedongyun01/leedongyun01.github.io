/**
 * Backend Developer Portfolio Interactive Logic for leedongyun01
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });

        // Close menu when clicking links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-open');
            });
        });
    }

    // 2. Active Navbar Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Project Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 4. Project Modal Data & Interactivity for leedongyun01 Repos
    const modalData = {
        'pai': {
            title: 'ProbeAI - 자율형 AI 리서치 엔진 & 파이프라인',
            category: 'Next.js 15 / Vercel AI SDK / Supabase / Tavily API',
            architecture: `
                <div class="arch-box">
                    <div class="arch-box-title">5-Stage Agent Orchestration Architecture</div>
                    <div class="arch-flow">
                        <div class="arch-node">1. Analyzer</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">2. Planner</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">3. Research Engine (Tavily)</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">4. Synthesizer</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">5. Visualizer</div>
                    </div>
                </div>
            `,
            description: `
                <h3 class="modal-section-h3">핵심 엔지니어링 및 기술적 의사결정</h3>
                <ul class="modal-list">
                    <li><strong>에이전트 경쟁 상태(Race Condition) 해결:</strong> 복잡한 리서치 중 Supabase 비동기 타이밍 이슈로 상태가 덮어써지는 현상을 분석했습니다. 유효 상태 전이 맵(LEGAL_TRANSITIONS)을 `lib/orchestrator.ts`에 구축하여 검증 로직으로 해결했습니다.</li>
                    <li><strong>LLM 환각(Hallucination) 방지:</strong> 수집된 웹 데이터 간의 모순을 식별하는 2-Pass 합성 엔진 및 출처 ID 유효성을 전수 검사하는 Citation Validator 후처리기를 제작했습니다.</li>
                    <li><strong>컨텍스트 윈도우(Context Window) 최적화:</strong> 대용량 웹 스크래핑 결과물에서 불필요한 태그/공백을 제거하는 전처리를 거쳐 토큰 비용 절감 및 렌더링 속도를 대폭 개선했습니다.</li>
                </ul>

                <h3 class="modal-section-h3">기술 스택 상세</h3>
                <ul class="modal-list">
                    <li>Next.js 15+ (App Router), TypeScript, Vercel AI SDK</li>
                    <li>Supabase (PostgreSQL, Row Level Security, Auth)</li>
                    <li>Tavily Search API, Mermaid.js, Tailwind CSS</li>
                </ul>
            `
        },
        'careercraft': {
            title: 'CareerCraft - AI 기반 휘발성 포트폴리오 빌더',
            category: 'Next.js / Zustand / @dnd-kit / jsPDF',
            architecture: `
                <div class="arch-box">
                    <div class="arch-box-title">Client-Side Zero-Database Architecture</div>
                    <div class="arch-flow">
                        <div class="arch-node">User Input Form</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">Zustand State Store</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">LocalStorage (Auto Save)</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">html2canvas + jsPDF</div>
                    </div>
                </div>
            `,
            description: `
                <h3 class="modal-section-h3">핵심 엔지니어링 및 기술적 의사결정</h3>
                <ul class="modal-list">
                    <li><strong>보안 중심 No-DB 설계:</strong> 개인 이력 데이터가 서버 DB로 누출되는 리스크를 원천 차단하기 위해 100% 브라우저 메모리 및 LocalStorage 기반 아키텍처를 도입했습니다.</li>
                    <li><strong>실시간 WYSIWYG 드래그 앤 드롭:</strong> `@dnd-kit`을 활용하여 인적사항, 프로젝트, 경력 등 자유로운 섹션 재배치 및 실시간 테마 프리셋 연동을 구현했습니다.</li>
                    <li><strong>고해상도 렌더링 PDF 내보내기:</strong> Base64 인코딩 및 이미지 캔버스 처리를 결합하여 브라우저 환경에서도 인쇄 품질 수준의 A4 PDF 작성을 실현했습니다.</li>
                </ul>

                <h3 class="modal-section-h3">기술 스택 상세</h3>
                <ul class="modal-list">
                    <li>Next.js, TypeScript, Zustand State Engine</li>
                    <li>@dnd-kit/core, jsPDF, html2canvas, Tailwind CSS</li>
                </ul>
            `
        },
        'newscuration': {
            title: 'NewsCurationPortal - 뉴스 수집 & 큐레이션 포털 API',
            category: 'PHP / MySQL / Data Aggregation / REST API',
            architecture: `
                <div class="arch-box">
                    <div class="arch-box-title">Data Ingestion & Serving Pipeline</div>
                    <div class="arch-flow">
                        <div class="arch-node">News Data Crawling</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">Parsing & Deduplication</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">MySQL Storage</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">RESTful API Endpoints</div>
                    </div>
                </div>
            `,
            description: `
                <h3 class="modal-section-h3">핵심 엔지니어링 및 기술적 의사결정</h3>
                <ul class="modal-list">
                    <li><strong>뉴스 데이터 정제 파이프라인:</strong> 여러 출처의 뉴스 수집 시 중복 기사를 분류하고 카테고리별 키워드 태깅을 자동화했습니다.</li>
                    <li><strong>안정적인 API 엔드포인트:</strong> 파라미터 기반 필터링 및 카테고리별 큐레이션 REST API 구조를 정립했습니다.</li>
                </ul>

                <h3 class="modal-section-h3">기술 스택 상세</h3>
                <ul class="modal-list">
                    <li>PHP, MySQL, RESTful API Architecture</li>
                </ul>
            `
        }
    };

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project');
            const data = modalData[projectId];

            if (data && modalBody && modal) {
                modalBody.innerHTML = `
                    <div class="modal-meta"><span class="badge">${data.category}</span></div>
                    <h2 class="modal-title">${data.title}</h2>
                    ${data.architecture}
                    ${data.description}
                `;
                modal.classList.add('active');
                if (window.lucide) {
                    lucide.createIcons();
                }
            }
        });
    });

    if (modalCloseBtn && modal) {
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // 5. Copy Email Functionality
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');
    const toast = document.getElementById('toast');

    if (copyEmailBtn && emailText && toast) {
        copyEmailBtn.addEventListener('click', () => {
            const textToCopy = emailText.innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                showToast('이메일 주소가 클립보드에 복사되었습니다.');
            }).catch(err => {
                showToast('복사에 실패했습니다. 수동으로 복사해주세요.');
            });
        });
    }

    function showToast(message) {
        const toastMsg = document.getElementById('toast-message');
        if (toastMsg) toastMsg.innerText = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 6. Dynamic Year Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.innerText = new Date().getFullYear();
    }
});
