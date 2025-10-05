// Dummy content for standards
const standardsData = {
  risk: {
    title: "Risk Management",
    pmbok: "PMBOK 7 emphasizes risk identification, qualitative and quantitative analysis, and continuous monitoring.",
    prince2: "PRINCE2 integrates risk management into themes, focusing on risk ownership and tolerance.",
    iso: "ISO 21500/21502 highlights risk as part of project context and requires a documented risk management approach."
  },
  stakeholders: {
    title: "Stakeholder Engagement",
    pmbok: "PMBOK 7: Stakeholder engagement is a key performance domain with strategies for communication and involvement.",
    prince2: "PRINCE2: Stakeholders are managed via defined roles and responsibilities within governance structure.",
    iso: "ISO: Emphasizes stakeholder needs in defining objectives and success criteria."
  },
  planning: {
    title: "Planning / Tailoring",
    pmbok: "PMBOK 7 uses adaptive and predictive planning approaches depending on project environment.",
    prince2: "PRINCE2 relies on product-based planning technique ensuring clarity of deliverables.",
    iso: "ISO standards promote tailoring planning methods to organizational strategy and context."
  }
};

// Store bookmarks
let bookmarks = [];

// Page navigation
function showSection(sectionId) {
  document.querySelectorAll(".content").forEach(sec => sec.style.display = "none");
  document.getElementById(sectionId).style.display = "block";
}

// Search functionality
function searchStandards() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  if (!query) return;

  const matches = Object.keys(standardsData).filter(topic =>
    topic.includes(query) ||
    standardsData[topic].title.toLowerCase().includes(query) ||
    standardsData[topic].pmbok.toLowerCase().includes(query) ||
    standardsData[topic].prince2.toLowerCase().includes(query) ||
    standardsData[topic].iso.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    resultsContainer.innerHTML = `<p>No results found for "${query}".</p>`;
    return;
  }

  matches.forEach(topic => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <a href="#" style="font-weight:bold;text-decoration:none;color:#3498db">${standardsData[topic].title}</a><br>
      <b>PMBOK:</b> ${standardsData[topic].pmbok}<br>
      <b>PRINCE2:</b> ${standardsData[topic].prince2}<br>
      <b>ISO:</b> ${standardsData[topic].iso}<br>
      <button class="bookmark-btn" onclick='addBookmark("${topic}")'>Bookmark</button>
    `;

    // Clickable search link
    div.querySelector("a").addEventListener("click", e => {
      e.preventDefault();
      showSection("comparison");
      scrollToTopic(topic);
      updateInsights(topic);
    });

    resultsContainer.appendChild(div);
  });
}

// Build Comparison Table
function buildComparison() {
  const container = document.getElementById("comparisonContainer");
  container.innerHTML = "";

  if (!standardsData) return;

  let tableHTML = `<table>
    <thead>
      <tr>
        <th>Topic</th>
        <th>PMBOK 7</th>
        <th>PRINCE2</th>
        <th>ISO 21500/21502</th>
      </tr>
    </thead>
    <tbody>`;

  Object.keys(standardsData).forEach(topic => {
    const item = standardsData[topic];
    tableHTML += `
      <tr id="row-${topic}">
        <td>${item.title}</td>
        <td>${item.pmbok}</td>
        <td>${item.prince2}</td>
        <td>${item.iso}</td>
      </tr>
    `;
  });

  tableHTML += `</tbody></table>`;
  container.innerHTML = tableHTML;
}

// Scroll to topic in comparison table
function scrollToTopic(topic) {
  const row = document.getElementById(`row-${topic}`);
  if (row) {
    row.scrollIntoView({ behavior: "smooth", block: "center" });
    row.style.backgroundColor = "#eaf6ff";
    setTimeout(() => row.style.backgroundColor = "", 1500);
  }
}

// Insights Dashboard
function updateInsights(topic = "") {
  const similarities = [];
  const differences = [];
  const unique = [];

  if (!topic) {
    similarities.push("All three emphasize risk, stakeholder, and governance.");
    differences.push("PRINCE2 is process-heavy, PMBOK is principle-driven, ISO is high-level guidance.");
    unique.push("PRINCE2 has themes and roles, PMBOK focuses on value delivery, ISO links project/program/portfolio management.");
  } else if (standardsData[topic]) {
    if (topic === "risk") {
      similarities.push("All standards require risk management to be documented.");
      differences.push("PMBOK focuses on continuous monitoring, PRINCE2 on ownership, ISO on context.");
      unique.push("PRINCE2 uniquely defines 'risk tolerance'.");
    } else if (topic === "stakeholders") {
      similarities.push("All standards emphasize importance of stakeholder engagement.");
      differences.push("PMBOK focuses on strategies, PRINCE2 on governance, ISO on needs/objectives.");
      unique.push("PMBOK uniquely defines 'engagement strategies'.");
    } else if (topic === "planning") {
      similarities.push("All require planning adapted to project type.");
      differences.push("PMBOK uses adaptive/predictive, PRINCE2 product-based, ISO context-driven.");
      unique.push("PRINCE2 uniquely enforces 'product-based planning'.");
    }
  }

  document.getElementById("similarities").innerHTML = similarities.map(s => `<li>${s}</li>`).join("");
  document.getElementById("differences").innerHTML = differences.map(d => `<li>${d}</li>`).join("");
  document.getElementById("unique").innerHTML = unique.map(u => `<li>${u}</li>`).join("");
}

// Bookmark
function addBookmark(topic) {
  if (!bookmarks.includes(topic)) {
    bookmarks.push(topic);
    renderBookmarks();
  }
}

// Render bookmark panel
function renderBookmarks() {
  const container = document.getElementById("bookmarkContainer");
  if (!container) return;
  container.innerHTML = "";

  bookmarks.forEach(topic => {
    const btn = document.createElement("button");
    btn.textContent = standardsData[topic].title;
    btn.style.margin = "0.2rem";
    btn.onclick = () => {
      showSection("comparison");
      scrollToTopic(topic);
      updateInsights(topic);
    };
    container.appendChild(btn);
  });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  buildComparison();
  updateInsights();
});





















// Process Generator Function
function generateProcess() {
  const type = document.getElementById('projectType').value;
  const size = document.getElementById('projectSize').value;
  const focusCheckboxes = document.querySelectorAll('input[name="focus"]:checked');
  const focusAreas = Array.from(focusCheckboxes).map(cb => cb.value);
  
  const output = document.getElementById('processOutput');
  
  // Generate recommendations based on inputs
  const recommendations = generateRecommendations(type, size, focusAreas);
  
  output.innerHTML = `
    <div class="process-recommendation">
      <h3>🎯 Recommended Process for ${getTypeLabel(type)} ${getSizeLabel(size)} Project</h3>
      
      <div class="standard-highlight">
        <h4>📋 Overall Approach:</h4>
        <p>${recommendations.approach}</p>
      </div>
      
      <div class="standard-highlight">
        <h4>🔄 Key Processes:</h4>
        <ul>
          ${recommendations.processes.map(process => `<li>${process}</li>`).join('')}
        </ul>
      </div>
      
      <div class="standard-highlight">
        <h4>📚 Standards Integration:</h4>
        <p><strong>PMBOK 7:</strong> ${recommendations.pmbok}</p>
        <p><strong>PRINCE2:</strong> ${recommendations.prince2}</p>
        <p><strong>ISO 21500:</strong> ${recommendations.iso}</p>
      </div>
      
      ${focusAreas.length > 0 ? `
        <div class="standard-highlight">
          <h4>⭐ Focus Area Recommendations:</h4>
          <ul>
            ${recommendations.focusRecommendations.map(rec => `<li>${rec}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `;
}

// Helper functions
function getTypeLabel(type) {
  const labels = {
    agile: "Agile/Iterative",
    waterfall: "Waterfall/Predictive", 
    hybrid: "Hybrid",
    research: "Research & Development"
  };
  return labels[type];
}

function getSizeLabel(size) {
  const labels = {
    small: "Small",
    medium: "Medium", 
    large: "Large"
  };
  return labels[size];
}

function generateRecommendations(type, size, focusAreas) {
  // Process recommendations database
  const recommendations = {
    agile: {
      approach: "Iterative development with frequent deliverables and continuous feedback",
      processes: [
        "Sprint planning and iterative delivery cycles",
        "Daily stand-ups and continuous stakeholder engagement",
        "Adaptive planning with regular retrospectives"
      ],
      pmbok: "Use adaptive project life cycle and delivery performance domain",
      prince2: "Apply PRINCE2 Agile with flexible stage boundaries",
      iso: "Implement iterative planning and continuous improvement cycles"
    },
    waterfall: {
      approach: "Sequential phase-based approach with formal stage gates",
      processes: [
        "Comprehensive upfront planning and requirements gathering",
        "Sequential phase completion with formal approvals",
        "Detailed documentation and change control procedures"
      ],
      pmbok: "Apply predictive life cycle and comprehensive planning",
      prince2: "Use staged delivery with formal project board reviews", 
      iso: "Follow sequential project phases with defined deliverables"
    },
    hybrid: {
      approach: "Blended approach combining predictive planning with adaptive execution",
      processes: [
        "High-level predictive planning with adaptive detailed planning",
        "Flexible stage gates with iterative development cycles",
        "Integrated change control with regular review points"
      ],
      pmbok: "Combine predictive and adaptive approaches based on project needs",
      prince2: "Tailor processes with agile delivery within staged framework",
      iso: "Apply flexible methodology selection based on project characteristics"
    },
    research: {
      approach: "Exploratory approach with emphasis on learning and adaptation",
      processes: [
        "Experimental iterations with knowledge management focus",
        "Flexible scope with regular feasibility assessments",
        "Stakeholder collaboration and knowledge sharing sessions"
      ],
      pmbok: "Focus on uncertainty performance domain and adaptive planning",
      prince2: "Use exception planning and flexible business case management",
      iso: "Apply exploratory project management with emphasis on learning"
    }
  };
  
  const baseRec = recommendations[type];
  
  // Add focus area specific recommendations
  const focusRecs = {
    risk: "Implement continuous risk review and adaptive risk responses",
    stakeholder: "Use collaborative stakeholder engagement with regular feedback loops", 
    quality: "Apply iterative quality gates and continuous validation",
    change: "Implement flexible change control with streamlined approval processes"
  };
  
  const focusRecommendations = focusAreas.map(area => focusRecs[area] || "");
  
  return {
    ...baseRec,
    focusRecommendations: focusRecommendations.filter(rec => rec !== "")
  };
}