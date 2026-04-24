// Bluum Training Feed — TikTok-style vertical scroll training app
// Uses YouTube IFrame API for inline audio playback on tap

const TRAINING_DATA = [
  {
    id: 1,
    topic: "Company Overview",
    title: "Who Is Bluum?",
    desc: "North America's largest learning catalyst — 30+ years transforming K-20 education through technology. We make it easy for schools to plan, buy, use, and support the tools that transform learning.",
    youtubeId: "LaiWO3hGkFU",
    link: "https://www.bluum.com/",
    linkLabel: "Learn More at Bluum.com"
  },
  {
    id: 2,
    topic: "Interactive Displays",
    title: "Interactive Displays: Bringing Lessons to Life",
    desc: "Touchscreen displays and dynamic teaching tools combine intuitive hardware and software designed for today's classrooms. Interactive displays increase student engagement by 3x vs. traditional whiteboards.",
    youtubeId: "0gL1fkJYcV8",
    link: "https://www.bluum.com/solutions/interactive",
    linkLabel: "Explore Interactive Solutions"
  },
  {
    id: 3,
    topic: "STEM Labs",
    title: "Building STEM Labs That Actually Work",
    desc: "Hands-on STEM labs and maker spaces help students engage in problem-solving and critical thinking. The key? Start with curriculum goals, not the tech. Here's how to plan one that teachers will actually use.",
    youtubeId: "WxEX7zCC1_w",
    link: "https://www.bluum.com/solutions/stem",
    linkLabel: "STEM Solutions Overview"
  },
  {
    id: 4,
    topic: "Esports",
    title: "Esports in Schools — More Than Gaming",
    desc: "Student growth through gaming, teamwork, and competition. Schools with esports programs see improved attendance, higher GPAs, and stronger school pride. Here's what's actually needed to build one.",
    youtubeId: "COaKia8-oI4",
    link: "https://www.bluum.com/solutions/esports",
    linkLabel: "Bluum Esports Solutions"
  },
  {
    id: 5,
    topic: "Sales Playbook",
    title: "The Bluum Sales Framework",
    desc: "Every successful Bluum rep starts with the customer's outcome, not the product. Use this 3-step framework: Listen → Connect → Solve. Know the categories: A/V, Devices, STEM, Esports.",
    youtubeId: "OtSuLekKkJ8",
    link: "https://www.bluum.com/solutions",
    linkLabel: "All Solutions"
  },
  {
    id: 6,
    topic: "K-12 Market",
    title: "K-12 Market Snapshot — What Districts Actually Buy",
    desc: "~$13B+ annual EdTech market in K-12. Top spend categories: devices (40%), infrastructure (25%), software (20%), A/V (15%). Districts prioritize durability, support, and educator training — not just price.",
    youtubeId: "wbTIilYTQ7o",
    link: "https://www.bluum.com/",
    linkLabel: "Bluum Solutions"
  },
  {
    id: 7,
    topic: "Device Category",
    title: "Device Deals: How to Qualify Fast",
    desc: "When a district says they need devices, your first 3 questions should be: 1) What grade levels? 2) Managed or unmanaged? 3) Funding source — E-Rate, ESSER, or general fund? Get these right and you'll close faster.",
    youtubeId: "CjxpOnpjQk8",
    link: "https://www.bluum.com/",
    linkLabel: "Get Started"
  },
  {
    id: 8,
    topic: "A/V Systems",
    title: "A/V Sales — Start With the Room Purpose",
    desc: "Before quoting any A/V system, ask: Is this room for instruction, collaboration, or presentation? The answer changes everything — from display size to microphone placement to control systems.",
    youtubeId: "wOApgEm1-W8",
    link: "https://www.bluum.com/solutions",
    linkLabel: "A/V Solutions"
  }
];

const TOPICS = ["All", ...new Set(TRAINING_DATA.map(d => d.topic))];

let currentFilter = "All";
let currentIndex = 0;
let players = {};
let activePlayerId = null;
let isMuted = true;

// ── Icons ──────────────────────────────────────────────────
const icons = {
  play: `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)"/><path d="M10 8l6 4-6 4V8z" fill="#fff"/></svg>`,
  mute: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
  unmute: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  share: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
  link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  scroll: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`
};

// ── YouTube IFrame API ──────────────────────────────────────
let ytApiReady = false;
let ytApiCallbacks = [];

function onYouTubeIframeAPIReady() {
  ytApiReady = true;
  ytApiCallbacks.forEach(cb => cb());
  ytApiCallbacks = [];
}

function waitForYtApi(callback) {
  if (ytApiReady) {
    callback();
  } else {
    ytApiCallbacks.push(callback);
  }
}

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
  loadVisiblePlayer(currentIndex);
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
  return `
    <div class="video-card" data-index="${index}" data-id="${item.id}" data-yt="${item.youtubeId}">
      <div class="player-wrap" id="player-wrap-${item.id}">
        <div class="yt-placeholder" id="yt-placeholder-${item.id}">
          <div class="play-ring">
            ${icons.play}
          </div>
          <div class="tap-label">Tap to play</div>
        </div>
      </div>

      <div class="card-overlay"></div>

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
        Scroll &amp; tap cards to play audio
      </div>
    </div>
  `;
}

// ── YouTube Player Setup ────────────────────────────────────
function createPlayer(itemId, ytId, autoplay) {
  waitForYtApi(() => {
    const container = document.getElementById(`player-wrap-${itemId}`);
    const placeholder = document.getElementById(`yt-placeholder-${itemId}`);
    if (!container) return;

    // Clear any existing player in this container
    container.innerHTML = '';

    const playerDiv = document.createElement('div');
    playerDiv.id = `yt-player-${itemId}`;
    container.appendChild(playerDiv);

    const player = new YT.Player(`yt-player-${itemId}`, {
      videoId: ytId,
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: autoplay ? 1 : 0,
        mute: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        playsinline: 1,
        loop: 1,
        playlist: ytId
      },
      events: {
        onReady: (event) => {
          players[itemId] = event.target;
          event.target.mute();
          if (autoplay) {
            event.target.playVideo();
            if (placeholder) placeholder.style.display = "none";
          }
        },
        onStateChange: (event) => {
          if (event.data === YT.PlayerState.ENDED) {
            event.target.playVideo();
          }
        }
      }
    });
  });
}

function loadVisiblePlayer(idx) {
  const data = getFilteredData();
  if (!data[idx]) return;
  const item = data[idx];
  createPlayer(item.id, item.youtubeId, true);
}

function pauseAllPlayers() {
  Object.values(players).forEach(p => {
    try { p.pauseVideo(); } catch(e) {}
  });
}

function unmuteActivePlayer() {
  const data = getFilteredData();
  const item = data[currentIndex];
  if (!item || !players[item.id]) return;
  try {
    players[item.id].unMute();
    players[item.id].playVideo();
    isMuted = false;
  } catch(e) {}
}

// ── Events ─────────────────────────────────────────────────
function bindEvents(data) {
  // Scroll → update active dot + load player
  const feed = document.getElementById("feed");
  feed.addEventListener("scroll", () => {
    const cardHeight = feed.clientHeight;
    const scrollTop = feed.scrollTop;
    const idx = Math.round(scrollTop / cardHeight);
    if (idx !== currentIndex) {
      currentIndex = idx;
      updateActiveDot(idx);
      pauseAllPlayers();
      const item = getFilteredData()[idx];
      if (item) createPlayer(item.id, item.youtubeId, true);
    }
  });

  // Dot click → scroll to card
  document.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.index);
      scrollToIndex(idx);
    });
  });

  // Filter pills
  document.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      pauseAllPlayers();
      currentFilter = pill.dataset.topic;
      currentIndex = 0;
      renderApp();
    });
  });

  // Card tap → unmute and play
  document.querySelectorAll(".video-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (
        e.target.closest(".card-link") ||
        e.target.closest(".action-btn") ||
        e.target.closest(".filter-pill")
      ) return;

      // Unmute and play
      const data = getFilteredData();
      const item = data[currentIndex];
      if (item && players[item.id]) {
        try {
          players[item.id].unMute();
          players[item.id].playVideo();
        } catch(e) {}
      }
    });
  });

  // Action buttons
  document.querySelectorAll(".action-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(1.3)";
      setTimeout(() => btn.style.transform = "", 200);
    });
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

function applyFilter() {
  document.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.topic === currentFilter);
  });
}

// ── Boot ───────────────────────────────────────────────────
// Load YouTube IFrame API
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScript = document.getElementsByTagName('script')[0];
firstScript.parentNode.insertBefore(tag, firstScript);

document.addEventListener("DOMContentLoaded", () => {
  // Small delay to let DOM settle
  setTimeout(renderApp, 50);
});
