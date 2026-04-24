// Bluum Training Feed — TikTok-style vertical scroll
// Tap card → inline YouTube player, audio plays, stays in feed

const TRAINING_DATA = [
  { id:1, topic:"Company Overview", title:"Who Is Bluum?", desc:"North America's largest learning catalyst — 30+ years transforming K-20 education through technology. We make it easy for schools to plan, buy, use, and support the tools that transform learning.", youtubeId:"LaiWO3hGkFU", link:"https://www.bluum.com/", linkLabel:"Learn More at Bluum.com" },
  { id:2, topic:"Google", title:"Go BIG with Google for Education", desc:"The Google wave in education keeps gaining momentum. Chromebooks, Google Workspace, and Classroom are the backbone of modern K-12 schools. Here's how to position Google solutions for your districts.", youtubeId:"2YfAvQrO03c", link:"https://edu.google.com/", linkLabel:"Google for Education" },
  { id:3, topic:"Lenovo", title:"Lenovo Chromebooks — Built for Education", desc:"Secure, easy to manage, and affordable. Lenovo Chromebooks with Google Education Upgrade are designed to support learners, educators, and IT teams. 50 million students and educators already use them worldwide.", youtubeId:"FP9IN1AOlnc", link:"https://www.lenovo.com/education", linkLabel:"Lenovo Education" },
  { id:4, topic:"Lenovo", title:"Smarter K-12 with Lenovo", desc:"Innovative technology transforming classrooms across North America. Lenovo's K-12 education solutions cover devices, infrastructure, and support — everything a district needs to modernize.", youtubeId:"-OoqBSjxbLI", link:"https://www.lenovo.com/education", linkLabel:"Lenovo Education" },
  { id:5, topic:"Samsung", title:"Samsung Interactive Display — Plan & Teach", desc:"Samsung's Interactive Display helps teachers plan and teach engaging lessons. Built for K-12 with an intuitive interface, digital whiteboard, and classroom-ready features teachers actually use.", youtubeId:"3WfcUFdRt9o", link:"https://www.samsung.com/business/", linkLabel:"Samsung Business" },
  { id:6, topic:"Samsung", title:"Samsung Interactive Display — Three Ways to Teach", desc:"One lesson, three ways. Samsung's Interactive Display supports the way teachers work today — flexible, collaborative, and easy to use. Great demo piece for district presentations.", youtubeId:"UiSBeBHF_VE", link:"https://www.samsung.com/business/", linkLabel:"Samsung Business" },
  { id:7, topic:"Promethean", title:"Promethean — Transform Your Classrooms", desc:"Promethean creates learning and collaboration tools that engage students and bring out the brilliance in everyone. The ActivPanel is one of the most requested interactive displays in K-12.", youtubeId:"tmu-TLrgUvE", link:"https://www.prometheanworld.com/", linkLabel:"Promethean" },
  { id:8, topic:"Promethean", title:"Promethean ActivPanel 10 — Next Gen Interactive Tech", desc:"The latest ActivPanel 10 combines premium hardware with Promethean's ActivSuite software — designed to transform collaboration in any K-12 or higher ed classroom.", youtubeId:"-5XiL2dCNf0", link:"https://www.prometheanworld.com/", linkLabel:"Promethean" },
  { id:9, topic:"Newline", title:"Introducing the Q Pro Elite Series!", desc:"Meet the Q Pro Elite — Newline's flagship interactive display built for modern classrooms and collaboration spaces. This overview covers the key features and capabilities that make it a top choice for K-12 and higher ed.", youtubeId:"qQv9HLvqwDk", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:10, topic:"Newline", title:"Introducing the Newline AI Remote Control!", desc:"The Newline AI Remote Control brings intelligent voice control and streamlined navigation to your Q Pro Elite display. Learn how it enhances the interactive display experience for teachers and presenters.", youtubeId:"CT6LxrYWvhI", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:11, topic:"Newline", title:"Q Pro Elite: Powering on your Display", desc:"Step-by-step guide to powering on your Q Pro Elite interactive display. Learn the correct startup sequence and what to expect on first boot.", youtubeId:"zvE8O_6Jq3E", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:12, topic:"Newline", title:"Q Pro Elite: Enabling your Side Toolbars", desc:"Customize your teaching workflow by enabling and configuring the side toolbars on your Q Pro Elite. These shortcuts give you quick access to the tools you use most.", youtubeId:"67xjP2VrEZI", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:13, topic:"Newline", title:"Q Pro Elite: Customizing your Power Management Settings", desc:"Reduce energy consumption and extend display life with proper power management settings. This tutorial covers sleep modes, scheduling, and auto-shutoff options.", youtubeId:"ELWw7GT2o4Q", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:14, topic:"Newline", title:"Q Pro Elite: Resizing your Touch Keyboard", desc:"Make the on-screen keyboard work better for your workflow by resizing it to fit your needs. Useful for annotation, data entry, and collaborative sessions.", youtubeId:"2oz0pavq_6g", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:15, topic:"Newline", title:"Q Pro Elite: Changing the 24-Hour Time Format", desc:"Switch between 12-hour and 24-hour time formats on your Q Pro Elite display. Quick preference adjustment for global or U.S.-based users.", youtubeId:"YX9_OArEe18", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:16, topic:"Newline", title:"Q Pro Elite: Customizing your Home Screen", desc:"Make your Q Pro Elite feel like yours — personalize the home screen with your favorite apps, frequently used tools, and district-branded content for a seamless start every time.", youtubeId:"3QdQ0in-V3U", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:17, topic:"Newline", title:"Q Pro Elite: Using and Customizing the Quick Access Menu", desc:"The Quick Access Menu is your command center for common actions. Learn how to access it instantly and customize it with your most-used tools and settings.", youtubeId:"oo_5K6Q2i_0", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:18, topic:"Newline", title:"Q Pro Elite: Toolbar Overview and Customization", desc:"Get familiar with the Q Pro Elite toolbar and learn how to arrange it for maximum efficiency. Customize which tools appear and where they sit on screen.", youtubeId:"oDIvuR0rllA", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:19, topic:"Newline", title:"Q Pro + Q Pro Elite: New Annotation Tool Features!", desc:"Compare the annotation tools available on the Q Pro and Q Pro Elite — the new features on the Elite model give teachers more ways to mark up, highlight, and collaborate on screen.", youtubeId:"HsYxBw65zcE", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:20, topic:"Newline", title:"Q Pro Elite: Writing using Object Recognition", desc:"The Q Pro Elite's object recognition lets you automatically distinguish between finger touches and pen strokes, enabling natural simultaneous writing and gesture control.", youtubeId:"Fv6a79rCC6I", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:21, topic:"Newline", title:"Q Pro Elite: Signing In and Out of Google Drive", desc:"Connect your Google account to access Drive files directly on your Q Pro Elite. Learn how to sign in, browse files, and sign out when you're done — keeping your data secure.", youtubeId:"LCy8LT3IVTM", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:22, topic:"Newline", title:"Q Pro Elite: Installing and Managing Apps", desc:"Discover how to install, update, and manage apps on your Q Pro Elite. Whether you're adding educational apps or productivity tools, this guide covers the basics.", youtubeId:"abRElNzvjkc", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:23, topic:"Newline", title:"Q Pro Elite: Using the Screen Record Feature", desc:"Record everything on your Q Pro Elite display — lessons, presentations, and collaborative sessions — directly from the panel. Great for student review and professional development.", youtubeId:"NjzGav_aG5Q", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:24, topic:"Newline", title:"Q Pro Elite: Using Split Screen", desc:"Run two apps side by side with Split Screen mode. Connect with students, demonstrate content, and reference notes simultaneously without switching between windows.", youtubeId:"lA0dATVDzfQ", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:25, topic:"Newline", title:"Q Pro Elite: Disable and Re-Enable Touch Functionality", desc:"Need to lock the screen temporarily? Learn how to disable and re-enable touch functionality on the Q Pro Elite — useful during presentations, videos, or when cleaning the display.", youtubeId:"oKWU8iKmWuc", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" },
  { id:26, topic:"Newline", title:"Q Pro Elite: Using a USB-A Document Camera", desc:"Connect a USB document camera to your Q Pro Elite to display physical documents, textbooks, and 3D objects live on screen. Perfect for demonstrating lab work, art, and more.", youtubeId:"0dXA0raRB-I", link:"https://newline-interactive.com/usa/products/q-pro-elite/", linkLabel:"Q Pro Elite at Newline" }
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
      <div class="nav-hint">${icons.scroll} Scroll — videos auto-play with audio</div>
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
        if (autoplay) {
          e.target.unMute();
          e.target.playVideo();
        } else {
          e.target.mute();
        }
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

  // Scroll → update dot + pause previous + auto-play current
  feed.addEventListener("scroll", () => {
    const idx = Math.round(feed.scrollTop / feed.clientHeight);
    if (idx !== currentIndex) {
      const prev = data[currentIndex];
      if (prev && players[prev.id]) {
        try { players[prev.id].pauseVideo(); } catch(e) {}
      }
      currentIndex = idx;
      document.querySelectorAll(".dot").forEach((d, i) => d.classList.toggle("active", i === idx));
      const item = data[idx];
      if (item) {
        if (!players[item.id]) createPlayer(item.id, item.youtubeId, true);
        else {
          showPlayer(item.id);
        }
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

  // Card tap → toggle play/pause
  document.querySelectorAll(".video-card").forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".card-link") || e.target.closest(".action-btn") || e.target.closest(".filter-pill")) return;
      const item = data[currentIndex];
      if (!item || !players[item.id]) return;
      try {
        const state = players[item.id].getPlayerState();
        if (state === YT.PlayerState.PLAYING) {
          players[item.id].pauseVideo();
        } else {
          players[item.id].playVideo();
        }
      } catch(e) {}
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
