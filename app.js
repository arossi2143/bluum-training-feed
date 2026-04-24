// Bluum Training Feed — TikTok-style vertical scroll
// Tap card → inline YouTube player, audio plays, stays in feed

const TRAINING_DATA = [
  { id:1, topic:"Company Overview", title:"Who Is Bluum?", desc:"North America's largest learning catalyst — 30+ years transforming K-20 education through technology. We make it easy for schools to plan, buy, use, and support the tools that transform learning.", youtubeId:"LaiWO3hGkFU", link:"https://www.bluum.com/", linkLabel:"Learn More at Bluum.com" },
  { id:2, topic:"Interactive Displays", title:"Interactive Displays: Bringing Lessons to Life", desc:"Touchscreen displays and dynamic teaching tools combine intuitive hardware and software designed for today's classrooms.", youtubeId:"0gL1fkJYcV8", link:"https://www.bluum.com/solutions/interactive", linkLabel:"Explore Interactive Solutions" },
  { id:3, topic:"STEM Labs", title:"Building STEM Labs That Actually Work", desc:"Hands-on STEM labs and maker spaces help students engage in problem-solving and critical thinking. Start with curriculum goals, not the tech.", youtubeId:"WxEX7zCC1_w", link:"https://www.bluum.com/solutions/stem", linkLabel:"STEM Solutions Overview" },
  { id:4, topic:"Esports", title:"Esports in Schools — More Than Gaming", desc:"Student growth through gaming, teamwork, and competition. Schools with esports programs see improved attendance, higher GPAs, and stronger school pride.", youtubeId:"COaKia8-oI4", link:"https://www.bluum.com/solutions/esports", linkLabel:"Bluum Esports Solutions" },
  { id:5, topic:"Sales Playbook", title:"The Bluum Sales Framework", desc:"Every successful Bluum rep starts with the customer's outcome, not the product. 3-step framework: Listen → Connect → Solve.", youtubeId:"OtSuLekKkJ8", link:"https://www.bluum.com/solutions", linkLabel:"All Solutions" },
  { id:6, topic:"K-12 Market", title:"K-12 Market Snapshot — What Districts Actually Buy", desc:"~$13B+ annual EdTech market in K-12. Devices (40%), infrastructure (25%), software (20%), A/V (15%).", youtubeId:"wbTIilYTQ7o", link:"https://www.bluum.com/", linkLabel:"Bluum Solutions" },
  { id:7, topic:"Device Category", title:"Device Deals: How to Qualify Fast", desc:"When a district needs devices: 1) What grade levels? 2) Managed or unmanaged? 3) Funding source — E-Rate, ESSER, or general fund?", youtubeId:"CjxpOnpjQk8", link:"https://www.bluum.com/", linkLabel:"Get Started" },
  { id:8, topic:"A/V Systems", title:"A/V Sales — Start With the Room Purpose", desc:"Before quoting any A/V system: Is this room for instruction, collaboration, or presentation? That changes everything.", youtubeId:"wOApgEm1-W8", link:"https://www.bluum.com/solutions", linkLabel:"A/V Solutions" }
];

const TOPICS = ["All", ...new Set(TRAINING_DATA.map(d => d.topic))];
let currentFilter = "All";
let currentIndex = 0;
let players = {};       // itemId → YT.Player instance
let ytApiReady = false;

const icons = {
  play:`<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" fill="rgba(0,0,0,0.5)"/><path d="M10 8l6 4-6 4V8z" fill="#fff"/></svg>`,
  heart:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
  share:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`,
  bookmark:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`,
  link:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  scroll:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>`
};

// ── YouTube IFrame API ──────────────────────────────────────
function onYouTubeIframeAPIReady() {
  ytApiReady = true;
}

const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
document.head.appendChild(tag);

// ── Render ─────────────────────────────────────────────────
function renderApp() {
  const data = getFilteredData();
  document.getElementById("app").innerHTML = `
    <div class="top-bar">
      <div class="logo"><span class="logo-dot"></span>Bluum Training</div>
      <div class="badge">Internal</div>
    </div>
    <div class="filter-bar">
      ${TOPICS.map(t => `<div class="filter-pill${t===currentFilter?" active":""}" data-topic="${t}">${t}</div>`).join("")}
    </div>
    <div class="feed-container" id="feed">
      ${data.map((item, i) => `
        <div class="video-card" data-index="${i}" data-id="${item.id}" data-yt="${item.youtubeId}">
          <div class="player-wrap" id="wrap-${item.id}">
            <div class="yt-thumb" id="thumb-${item.id}" style="background-image:url('https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg')">
              <div class="play-ring">${icons.play}</div>
              <div class="tap-label">Tap to play</div>
            </div>
          </div>
          <div class="card-overlay"></div>
          <div class="card-content">
            <span class="topic-tag">${item.topic}</span>
            <div class="card-title">${item.title}</div>
            <div class="card-desc">${item.desc}</div>
            <a href="${item.link}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation()">
              ${icons.link} ${item.linkLabel}
            </a>
          </div>
          <div class="action-row">
            <div class="action-btn">${icons.heart}<span>Like</span></div>
            <div class="action-btn">${icons.bookmark}<span>Save</span></div>
            <div class="action-btn">${icons.share}<span>Share</span></div>
          </div>
          <div class="counter">${i+1} / ${data.length}</div>
        </div>
      `).join("")}
    </div>
    <div class="progress-dots">
      ${data.map((_,i) => `<div class="dot${i===0?" active":""}" data-index="${i}"></div>`).join("")}
    </div>
    <div class="bottom-nav">
      <div class="nav-hint">${icons.scroll} Scroll &amp; tap to play inline</div>
    </div>
  `;
  bindEvents(data);
  // Auto-load first player
  if (ytApiReady) createPlayer(data[0].id, data[0].youtubeId, false);
}

function getFilteredData() {
  return currentFilter === "All" ? TRAINING_DATA : TRAINING_DATA.filter(d => d.topic === currentFilter);
}

// ── Player ─────────────────────────────────────────────────
function createPlayer(itemId, ytId, autoplay) {
  if (!ytApiReady) {
    setTimeout(() => createPlayer(itemId, ytId, autoplay), 200);
    return;
  }
  const wrap = document.getElementById(`wrap-${itemId}`);
  const thumb = document.getElementById(`thumb-${itemId}`);
  if (!wrap) return;

  wrap.innerHTML = `<div id="yt-${itemId}" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;transition:opacity 0.3s;"></div>`;

  const player = new YT.Player(`yt-${itemId}`, {
    videoId: ytId,
    playerVars: { autoplay: autoplay?1:0, mute: 1, controls: 0, modestbranding: 1, rel: 0, showinfo: 0, playsinline: 1, loop: 1, playlist: ytId },
    events: {
      onReady: (e) => {
        players[itemId] = e.target;
        if (!autoplay) e.target.mute();
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.ENDED) e.target.playVideo();
      }
    }
  });
}

function showPlayer(itemId) {
  const wrap = document.getElementById(`wrap-${itemId}`);
  const thumb = document.getElementById(`thumb-${itemId}`);
  if (!wrap || !players[itemId]) return;

  // Show player
  const iframe = wrap.querySelector('iframe');
  if (iframe) iframe.style.opacity = '1';
  if (thumb) thumb.style.opacity = '0';

  // Unmute and play
  try {
    players[itemId].unMute();
    players[itemId].playVideo();
  } catch(e) {}
}

function pauseAllPlayers() {
  Object.entries(players).forEach(([id, p]) => {
    try { p.pauseVideo(); } catch(e) {}
  });
}

// ── Events ─────────────────────────────────────────────────
function bindEvents(data) {
  const feed = document.getElementById("feed");

  // Scroll → update dot + load visible player + pause others
  feed.addEventListener("scroll", () => {
    const idx = Math.round(feed.scrollTop / feed.clientHeight);
    if (idx !== currentIndex) {
      // Pause previous
      const prev = data[currentIndex];
      if (prev && players[prev.id]) {
        try { players[prev.id].pauseVideo(); } catch(e) {}
      }
      currentIndex = idx;
      document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === idx));
      // Load + auto-play new
      const item = data[idx];
      if (item) {
        if (!players[item.id]) createPlayer(item.id, item.youtubeId, true);
        else showPlayer(item.id);
      }
    }
  });

  // Filter pills
  document.querySelectorAll(".filter-pill").forEach(p => {
    p.addEventListener("click", () => {
      pauseAllPlayers();
      currentFilter = p.dataset.topic;
      currentIndex = 0;
      renderApp();
    });
  });

  // Card tap → show + play player (user gesture = audio allowed)
  document.querySelectorAll(".video-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".card-link") || e.target.closest(".action-btn") || e.target.closest(".filter-pill")) return;
      const item = data[currentIndex];
      if (!item) return;
      if (!players[item.id]) {
        createPlayer(item.id, item.youtubeId, true);
        setTimeout(() => showPlayer(item.id), 800);
      } else {
        showPlayer(item.id);
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

  // Dot click
  document.querySelectorAll(".dot").forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.dataset.index);
      feed.scrollTo({ top: idx * feed.clientHeight, behavior: "smooth" });
    });
  });
}

document.addEventListener("DOMContentLoaded", renderApp);
