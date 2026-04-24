// Bluum Training Feed — TikTok-style vertical scroll training app

const TRAINING_DATA = [
  {
    id: 1,
    topic: "Company Overview",
    title: "Who Is Bluum?",
    desc: "North America's largest learning catalyst — 30+ years transforming K-20 education through technology. We make it easy for schools to plan, buy, use, and support the tools that transform learning.",
    videoType: "youtube",
    videoId: "LaiWO3hGkFU", // Bluum company overview on YouTube
    link: "https://www.bluum.com/",
    linkLabel: "Learn More at Bluum.com"
  },
  {
    id: 2,
    topic: "Interactive Displays",
    title: "Interactive Displays: Bringing Lessons to Life",
    desc: "Touchscreen displays and dynamic teaching tools combine intuitive hardware and software designed for today's classrooms. Interactive displays increase student engagement by 3x vs. traditional whiteboards.",
    videoType: "youtube",
    videoId: "JqrFjjH_3qA", // Interactive display related
    link: "https://www.bluum.com/solutions/interactive",
    linkLabel: "Explore Interactive Solutions"
  },
  {
    id: 3,
    topic: "STEM Labs",
    title: "Building STEM Labs That Actually Work",
    desc: "Hands-on STEM labs and maker spaces help students engage in problem-solving and critical thinking. The key? Start with curriculum goals, not the tech. Here's how to plan one that teachers will actually use.",
    videoType: "youtube",
    videoId: "bR2uvC1MoEo",
    link: "https://www.bluum.com/solutions/stem",
    linkLabel: "STEM Solutions Overview"
  },
  {
    id: 4,
    topic: "Esports",
    title: "Esports in Schools — More Than Gaming",
    desc: "Student growth through gaming, teamwork, and competition. Schools with esports programs see improved attendance, higher GPAs, and stronger school pride. Here's what's actually needed to build one.",
    videoType: "youtube",
    videoId: "HIiNwKQkhhQ",
    link: "https://www.bluum.com/solutions/esports",
    linkLabel: "Bluum Esports Solutions"
  },
  {
    id: 5,
    topic: "Sales Playbook",
    title: "The Bluum Sales Framework",
    desc: "Every successful Bluum rep starts with the customer's outcome, not the product. Use this 3-step framework: Listen → Connect → Solve. Know the categories: A/V, Devices, STEM, Esports.",
    videoType: "youtube",
    videoId: "dZBailF9TbQ",
    link: "https://www.bluum.com/solutions",
    linkLabel: "All Solutions"
  },
  {
    id: 6,
    topic: "K-12 Market",
    title: "K-12 Market Snapshot — What Districts Actually Buy",
    desc: "~$13B+ annual EdTech market in K-12. Top spend categories: devices (40%), infrastructure (25%), software (20%), A/V (15%). Districts prioritize durability, support, and educator training — not just price.",
    videoType: "youtube",
    videoId: "oRDDsA3Pbs8",
    link: "https://www.bluum.com/",
    linkLabel: "Bluum Solutions"
  },
  {
    id: 7,
    topic: "Device Category",
    title: "Device Deals: How to Qualify Fast",
    desc: "When a district says they need devices, your first 3 questions should be: 1) What grade levels? 2) Managed or unmanaged? 3) Funding source — E-Rate, ESSER, or general fund? Get these right and you'll close faster.",
    videoType: "youtube",
    videoId: "FzDKy6w-GPQ",
    link: "https://www.bluum.com/",
    linkLabel: "Get Started"
  },
  {
    id: 8,
    topic: "A/V Systems",
    title: "A/V Sales — Start With the Room Purpose",
    desc: "Before quoting any A/V system, ask: Is this room for instruction, collaboration, or presentation? The answer changes everything — from display size to microphone placement to control systems.",
    videoType: "youtube",
    videoId: "WDgQDGM7zZQ",
    link: "https://www.bluum.com/solutions",
    linkLabel: "A/V Solutions"
  }
];

const TOPICS = ["All", ...new Set(TRAINING_DATA.map(d => d.topic))];

let currentFilter = "All";
let currentIndex = 0;

// ── SVG Icons ───────────────────────────────────────────────
const icons = {
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`,
  pause: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  scroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`,
  chevron: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`
};

function getFilteredData() {
  if (currentFilter === "All") return TRAINING_DATA;
  return TRAINING_DATA.filter(d => d.topic === currentFilter);
}

// ── Render ─────────────────────────────────────────────────
function renderApp() {
  const data = getFilteredData();
  const app = document.getElementById("app");

  app.innerHTML = `
    ${renderTopBar()}
    ${renderFilterBar()}
    <div class="feed-container" id="feed">
      ${data.map((item, i) => renderCard(item, i)).join("")}
    </div>
    ${renderProgressDots(data.length)}
    ${renderBottomNav()}
  `;

  bindEvents(data);
  observeVideos();
  applyFilter(currentFilter);
}

function renderTopBar() {
  return `
    <div class="top-bar">
      <div class="logo">
        <span class="logo-dot"></span>
        Bluum Training
      </div>
      <div class="badge">Internal</div>
    </div>
  `;
}

function renderFilterBar() {
  return `
    <div class="filter-bar" id="filterBar">
      ${TOPICS.map(t => `
        <div class="filter-pill${t === currentFilter ? " active" : ""}" data-topic="${t}">
          ${t}
        </div>
      `).join("")}
    </div>
  `;
}

function renderCard(item, index) {
  const youtubeUrl = `https://www.youtube.com/embed/${item.videoId}?autoplay=0&mute=1&enablejsapi=1&playsinline=1`;
  return `
    <div class="video-card" data-index="${index}">
      <div class="video-placeholder">
        <div class="placeholder-icon">
          ${icons.play}
        </div>
      </div>
      <iframe
        class="video-frame"
        src="${youtubeUrl}"
        data-src="${youtubeUrl}"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        style="display:none;"
        loading="lazy"
      ></iframe>

      <div class="card-content">
        <span class="topic-tag">${item.topic}</span>
        <div class="card-title">${item.title}</div>
        <div class="card-desc">${item.desc}</div>
        <a href="${item.link}" target="_blank" rel="noopener" class="card-link">
          ${icons.link}
          ${item.linkLabel}
        </a>
      </div>

      <div class="action-row">
        <div class="action-btn" data-action="like">
          ${icons.heart}
          <span>Like</span>
        </div>
        <div class="action-btn" data-action="save">
          ${icons.bookmark}
          <span>Save</span>
        </div>
        <div class="action-btn" data-action="share">
          ${icons.share}
          <span>Share</span>
        </div>
      </div>

      <div class="counter">${index + 1} / ${getFilteredData().length}</div>
    </div>
  `;
}

function renderProgressDots(count) {
  return `
    <div class="progress-dots" id="progressDots">
      ${Array.from({length: count}, (_, i) =>
        `<div class="dot${i === 0 ? " active" : ""}" data-index="${i}"></div>`
      ).join("")}
    </div>
  `;
}

function renderBottomNav() {
  return `
    <div class="bottom-nav">
      <div class="nav-hint">
        ${icons.scroll}
        Scroll to navigate
      </div>
    </div>
  `;
}

// ── Events ─────────────────────────────────────────────────
function bindEvents(data) {
  // Scroll to card on dot click
  document.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.index);
      scrollToIndex(idx);
    });
  });

  // Filter pills
  document.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      currentFilter = pill.dataset.topic;
      applyFilter(currentFilter);
      renderApp();
    });
  });

  // Action buttons
  document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;
      btn.style.transform = "scale(1.3)";
      setTimeout(() => btn.style.transform = "", 200);
      // Visual feedback only in prototype
    });
  });

  // Scroll → update active dot + load video
  const feed = document.getElementById("feed");
  feed.addEventListener("scroll", () => {
    const cards = feed.querySelectorAll(".video-card");
    const scrollTop = feed.scrollTop;
    const cardHeight = feed.clientHeight;
    const idx = Math.round(scrollTop / cardHeight);
    if (idx !== currentIndex && cards[idx]) {
      currentIndex = idx;
      updateActiveDot(idx);
      loadVisibleVideo(idx);
      pauseOtherVideos(idx);
    }
  });
}

function scrollToIndex(idx) {
  const feed = document.getElementById("feed");
  const cardHeight = feed.clientHeight;
  feed.scrollTo({ top: idx * cardHeight, behavior: "smooth" });
}

function updateActiveDot(idx) {
  document.querySelectorAll(".dot").forEach((d, i) => {
    d.classList.toggle("active", i === idx);
  });
}

function loadVisibleVideo(idx) {
  const cards = document.querySelectorAll(".video-card");
  const card = cards[idx];
  if (!card) return;
  const iframe = card.querySelector("iframe");
  if (iframe && iframe.style.display === "none") {
    iframe.style.display = "block";
    const placeholder = card.querySelector(".video-placeholder");
    if (placeholder) placeholder.style.display = "none";
  }
}

function pauseOtherVideos(activeIdx) {
  document.querySelectorAll("iframe").forEach((iframe, i) => {
    if (i !== activeIdx) {
      try {
        const src = iframe.src;
        iframe.src = src; // resets/pauses by reloading
        iframe.style.display = "none";
      } catch(e) {}
    }
  });
}

// Intersection observer for videos
function observeVideos() {
  const feed = document.getElementById("feed");
  const cards = feed.querySelectorAll(".video-card");

  // Load first card's video immediately
  if (cards[0]) {
    const iframe = cards[0].querySelector("iframe");
    if (iframe) {
      iframe.style.display = "block";
      const placeholder = cards[0].querySelector(".video-placeholder");
      if (placeholder) placeholder.style.display = "none";
    }
  }

  // Tap to play/pause
  cards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".card-link") || e.target.closest(".action-btn") || e.target.closest(".filter-pill")) return;
      const iframe = card.querySelector("iframe");
      if (!iframe || iframe.style.display === "none") return;
      // Can't really control YT iframe without API, but we can toggle placeholder
    });
  });
}

function applyFilter(topic) {
  currentFilter = topic;
  document.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.topic === topic);
  });
}

// ── Boot ───────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", renderApp);
