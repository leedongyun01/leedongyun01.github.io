/**
 * Backend Developer Portfolio Interactive Logic for leedongyun01
 * Polished Design & Visual Enhancements
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

    // 2. Active Navbar Link & Back-to-Top Button on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top-btn');

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

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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

    // 4. Project Modal Data & Interactivity
    const modalData = {
        'collab': {
            title: 'CollabMate - 협업 관리 플랫폼',
            category: 'Node.js / Express.js / Socket.io / MySQL / React',
            architecture: `
                <div class="arch-box">
                    <div class="arch-box-title">Monorepo & Real-Time Socket Architecture</div>
                    <div class="arch-flow">
                        <div class="arch-node">React Client</div>
                        <div class="arch-arrow">⇄ (Socket.io)</div>
                        <div class="arch-node">Express Server</div>
                        <div class="arch-arrow">➔ (mysql2 Pool)</div>
                        <div class="arch-node">MySQL DB</div>
                        <div class="arch-arrow">➔ (.env Auth)</div>
                        <div class="arch-node">AWS EC2 / RDS</div>
                    </div>
                </div>
            `,
            description: `
                <h3 class="modal-section-h3">핵심 백엔드 엔지니어링 포인트</h3>
                <ul class="modal-list">
                    <li><strong>Socket.io 양방향 실시간 동기화:</strong> 팀원 간 실시간 이벤트 메세징 및 동시 프로젝트 상태 갱신을 위해 Socket.io 이벤트를 연결하고 브로드캐스팅 파이프라인을 설계했습니다.</li>
                    <li><strong>JWT 인증 & Axios Interceptor:</strong> 토큰 기반 인증 방식을 구축하고, 클라이언트 요청 시 헤더에 토큰을 자동으로 주입하는 미들웨어 인증 처리를 완성했습니다.</li>
                    <li><strong>환경 분리 (.env) & Monorepo:</strong> 단일 코드베이스에서 로컬(Localhost) 및 AWS EC2/RDS 서버 배포 환경을 동적으로 전환 지원하도록 환경변수 시스템을 구축했습니다.</li>
                </ul>

                <h3 class="modal-section-h3">기술 스택 상세</h3>
                <ul class="modal-list">
                    <li>Backend: Node.js, Express.js, Socket.io, mysql2 Connection Pool</li>
                    <li>Database: MySQL, JWT Auth, dotenv</li>
                    <li>Frontend: React.js, Axios, Monorepo Architecture</li>
                </ul>
            `
        },
        'gifttrip': {
            title: 'GiftTrip - AI 기반 맞춤형 여행 일정 추천 서비스',
            category: 'Node.js / Express / OpenAI API / TTL Cache / Nodemailer',
            architecture: `
                <div class="arch-box">
                    <div class="arch-box-title">AI Recommendation Engine & Mailing Pipeline</div>
                    <div class="arch-flow">
                        <div class="arch-node">Vite/React Client</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">Express API Server</div>
                        <div class="arch-arrow">➔ (ReviewEngine TTL Cache)</div>
                        <div class="arch-node">OpenAI LLM API</div>
                        <div class="arch-arrow">➔</div>
                        <div class="arch-node">Nodemailer (PDF Export)</div>
                    </div>
                </div>
            `,
            description: `
                <h3 class="modal-section-h3">핵심 백엔드 엔지니어링 포인트</h3>
                <ul class="modal-list">
                    <li><strong>`ReviewEngine.cjs` TTL 스마트 캐싱:</strong> OpenAI LLM API 호출 지연 시간과 비용을 최소화하기 위해 캐싱 엔지니어링을 적용, 자주 조회되는 여행 코스 요청의 Response Time을 80% 단축했습니다.</li>
                    <li><strong>PDF 생성 & 이메일 발송 파이프라인:</strong> 생성된 맞춤형 일정을 PDF 파일로 변환하여 사용자의 이메일로 비동기 전송하는 Nodemailer 파이프라인을 구축했습니다.</li>
                    <li><strong>글로벌 10개국 추천 엔진:</strong> 국가별 비자, 준비물, 예산, 여행 동행자 옵션을 계층화하여 알고리즘 및 LLM 프롬프트에 동적으로 바인딩했습니다.</li>
                </ul>

                <h3 class="modal-section-h3">기술 스택 상세</h3>
                <ul class="modal-list">
                    <li>Backend: Node.js, Express.js, OpenAI GPT-4 API</li>
                    <li>Optimization & Pipeline: ReviewEngine.cjs (TTL Caching), Nodemailer, PDF Generator</li>
                    <li>Frontend: React.js, Vite, Tailwind CSS</li>
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
                <h3 class="modal-section-h3">핵심 백엔드 엔지니어링 포인트</h3>
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
