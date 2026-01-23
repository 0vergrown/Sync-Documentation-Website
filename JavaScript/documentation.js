document.addEventListener("DOMContentLoaded", async function() {
    // Elements
    const sidebarMenu = document.getElementById("sidebar-menu");
    const markdownContent = document.getElementById("markdownContent");
    const headersMenu = document.getElementById("headers-menu");
    const breadcrumb = document.getElementById("breadcrumb");
    const searchInput = document.getElementById("searchInput");
    const leftSidebarToggle = document.getElementById("leftSidebarToggle");
    const rightSidebarToggle = document.getElementById("rightSidebarToggle");
    const leftSidebar = document.querySelector(".left-sidebar");
    const rightSidebar = document.querySelector(".right-sidebar");
    const quickLinks = document.querySelectorAll(".quick-link");
    const editOnGitHub = document.getElementById("editOnGitHub");
    const printPage = document.getElementById("printPage");
    const prevNextLinks = document.getElementById("prevNextLinks");
    
    // Documentation structure and state
    let fileStructure = {};
    let currentFile = {};
    let searchIndex = [];
    
    // Configuration
    const GITHUB_REPO = "https://github.com/0vergrown/Sync";
    const GITHUB_DOCS_PATH = "/";

    // Folder icons mapping
    const folderIcons = {
        'getting_started': 'fas fa-rocket',
        'power_types': 'fas fa-bolt',
        'entity_actions': 'fas fa-play',
        'bientity_actions': 'fas fa-exchange-alt',
        'entity_conditions': 'fas fa-sliders-h',
        'bientity_conditions': 'fas fa-code-branch',
        'block_actions': 'fas fa-cube',
        'api_reference': 'fas fa-book'
    };

    // Helper functions
    function capitalizeAndFormat(str) {
        return str
            .replace(/^\d+_/, "")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase());
    }

    function slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w\-]+/g, '')
            .replace(/\-\-+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');
    }

    // Get icon for folder
    function getIconForFolder(folder) {
        return folderIcons[folder] || 'fas fa-folder';
    }

    // Determine the correct file path for GitHub Pages
    function getMarkdownFilePath(folder, fileName) {
        // Try different path patterns for GitHub Pages
        // Since GitHub Pages serves from root, we need relative paths
        return `${folder}/${fileName}`;
    }

    // Generate quick links HTML from file structure
    function generateQuickLinks() {
        if (!fileStructure || Object.keys(fileStructure).length === 0) {
            return `
                <div class="quick-links">
                    <a href="#" class="quick-link" data-folder="getting_started" data-file="introduction.md">
                        <i class="fas fa-rocket"></i>
                        <span>Getting Started</span>
                    </a>
                    <a href="#" class="quick-link" data-folder="power_types" data-file="index.md">
                        <i class="fas fa-bolt"></i>
                        <span>Power Types</span>
                    </a>
                    <a href="#" class="quick-link" data-folder="entity_conditions" data-file="index.md">
                        <i class="fas fa-sliders-h"></i>
                        <span>Entity Conditions</span>
                    </a>
                    <a href="#" class="quick-link" data-folder="entity_actions" data-file="index.md">
                        <i class="fas fa-play"></i>
                        <span>Entity Actions</span>
                    </a>
                </div>
            `;
        }

        let html = '<div class="quick-links">';

        for (const folder in fileStructure) {
            if (fileStructure[folder] && fileStructure[folder].length > 0) {
                const iconClass = getIconForFolder(folder);
                const displayName = capitalizeAndFormat(folder);

                // Find the main file (index.md or first file)
                let mainFile = 'index.md';
                if (!fileStructure[folder].includes('index.md') && fileStructure[folder].length > 0) {
                    mainFile = fileStructure[folder][0];
                }

                html += `
                    <a href="#" class="quick-link" data-folder="${folder}" data-file="${mainFile}">
                        <i class="${iconClass}"></i>
                        <span>${displayName}</span>
                    </a>
                `;
            }
        }

        html += '</div>';
        return html;
    }

    // Smooth scrolling function
    function addSmoothScrolling() {
        const anchorLinks = markdownContent.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Update URL hash without scrolling
                    window.history.replaceState(null, null, `#${targetId}`);
                }
            });
        });
    }

    // Smooth scroll to specific element
    function smoothScrollTo(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });

            // Update URL hash
            window.history.replaceState(null, null, `#${targetId}`);
        }
    }

    // Update active TOC link
    function updateActiveTOCLink(activeId) {
        const tocLinks = headersMenu.querySelectorAll("a");
        tocLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${activeId}`) {
                link.classList.add("active");
            }
        });
    }

    // Observe header visibility for TOC highlighting
    function observeHeaderVisibility() {
        const headers = markdownContent.querySelectorAll("h1, h2, h3, h4");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateActiveTOCLink(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-100px 0px -66% 0px",
                threshold: 0
            }
        );

        headers.forEach(header => observer.observe(header));
    }

    // Initialize
    async function init() {
        await loadSidebar();
        await loadMarkdownFromQuery();
        setupEventListeners();
        buildSearchIndex();
    }

    // Load sidebar navigation
    async function loadSidebar() {
        try {
            const response = await fetch("assets/data/documentation_file_structure.json");
            if (!response.ok) throw new Error("Failed to fetch file structure");

            fileStructure = await response.json();

            // Clear existing content
            sidebarMenu.innerHTML = "";

            // Build navigation tree
            for (const folder in fileStructure) {
                const folderItem = document.createElement("li");
                folderItem.textContent = capitalizeAndFormat(folder);
                folderItem.classList.add("folder");
                folderItem.dataset.folder = folder;

                // Add toggle button
                const toggle = document.createElement("span");
                toggle.className = "toggle";
                toggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
                folderItem.appendChild(toggle);

                // Toggle collapse/expand
                folderItem.addEventListener("click", (e) => {
                    if (e.target === toggle || e.target === toggle.querySelector("i")) {
                        folderItem.classList.toggle("collapsed");
                    }
                });

                sidebarMenu.appendChild(folderItem);

                // Create sublist
                const sublist = document.createElement("ul");
                fileStructure[folder].forEach((file) => {
                    const fileItem = document.createElement("li");
                    const fileName = file.replace(".md", "");
                    fileItem.textContent = capitalizeAndFormat(fileName);
                    fileItem.classList.add("file-item");
                    fileItem.dataset.folder = folder;
                    fileItem.dataset.file = file;
                    fileItem.onclick = () => loadMarkdown(folder, file);
                    sublist.appendChild(fileItem);
                });
                sidebarMenu.appendChild(sublist);
            }
        } catch (error) {
            console.error("Error loading sidebar:", error);
            sidebarMenu.innerHTML = "<li class='error'>Failed to load navigation. Please try again later.</li>";
        }
    }

    // Load markdown content
    async function loadMarkdown(folder, fileName, updateHistory = true) {
        // Use the correct path for GitHub Pages
        const filePath = getMarkdownFilePath(folder, fileName);

        try {
            // Show loading state
            markdownContent.innerHTML = `
                <div class="loading">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Loading documentation...</p>
                </div>
            `;

            console.log(`Loading markdown from: ${filePath}`);

            const response = await fetch(filePath);
            if (!response.ok) {
                // Try alternative paths
                const alternativePaths = [
                    `${folder}/${fileName}`,                    // Main path
                    `docs/${folder}/${fileName}`,              // Docs folder
                    `markdown/${folder}/${fileName}`,          // Markdown folder
                    `documentation/${folder}/${fileName}`,     // Documentation folder
                    fileName,                                   // Root level
                    `${folder}.md`                             // Folder as file
                ];

                let markdownText = null;

                // Try each alternative path
                for (const path of alternativePaths) {
                    if (path === filePath) continue; // Skip the already tried path

                    try {
                        console.log(`Trying alternative path: ${path}`);
                        const altResponse = await fetch(path);
                        if (altResponse.ok) {
                            markdownText = await altResponse.text();
                            console.log(`Found file at: ${path}`);
                            break;
                        }
                    } catch (altError) {
                        console.log(`Failed to load from ${path}:`, altError.message);
                        continue;
                    }
                }

                if (!markdownText) {
                    throw new Error(`File not found. Tried: ${filePath} and alternatives`);
                }

                // Process the markdown text
                await processMarkdownContent(markdownText, folder, fileName);
            } else {
                const markdownText = await response.text();
                await processMarkdownContent(markdownText, folder, fileName);
            }

            // Update URL without reload
            if (updateHistory) {
                const url = new URL(window.location);
                url.searchParams.set('file', `${folder}/${fileName}`);
                window.history.pushState({ folder, fileName }, '', url);
            }

            // Update prev/next links
            updatePrevNextLinks(folder, fileName);

        } catch (error) {
            console.error("Error loading markdown:", error);
            markdownContent.innerHTML = `
                <div class="error">
                    <h2>Error Loading Content</h2>
                    <p>Failed to load "${fileName}" from "${folder}".</p>
                    <p><strong>Error:</strong> ${error.message}</p>
                    <div style="margin-top: 20px;">
                        <p><strong>Available categories:</strong></p>
                        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;">
                            ${Object.keys(fileStructure).map(cat =>
                                `<button onclick="loadMarkdown('${cat}', 'index.md')" class="btn btn-primary" style="padding: 5px 10px; margin: 2px;">
                                    ${capitalizeAndFormat(cat)}
                                </button>`
                            ).join('')}
                        </div>
                    </div>
                    <button onclick="showWelcomeMessage()" class="btn btn-primary" style="margin-top: 20px;">
                        <i class="fas fa-home"></i> Return to Home
                    </button>
                </div>
            `;
        }
    }

    // Process markdown content after fetching
    async function processMarkdownContent(markdownText, folder, fileName) {
        // Parse frontmatter if present
        let metadata = {};
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
        const match = markdownText.match(frontmatterRegex);

        if (match) {
            markdownText = markdownText.replace(frontmatterRegex, "");
            match[1].split("\n").forEach(line => {
                const [key, ...value] = line.split(":");
                if (key && value) {
                    metadata[key.trim()] = value.join(":").trim();
                }
            });
        }

        // Update current file info
        currentFile = {
            folder,
            fileName,
            title: metadata.title || capitalizeAndFormat(fileName.replace(".md", "")),
            lastUpdated: metadata.lastUpdated || "Today",
            version: metadata.version || "1.0.0"
        };

        // Update page title
        document.title = `${currentFile.title} - Sync Documentation`;

        // Update metadata display
        document.getElementById("lastUpdated").textContent = currentFile.lastUpdated;
        document.getElementById("docVersion").textContent = currentFile.version;

        // Update breadcrumb
        updateBreadcrumb(folder, fileName);

        // Update GitHub edit link
        updateGitHubLink(folder, fileName);

        // Render markdown
        markdownContent.innerHTML = marked.parse(markdownText);

        // Post-process rendered content
        postProcessContent();

        // Update active file in sidebar
        highlightActiveFile(folder, fileName);
    }

    // Show welcome message
    function showWelcomeMessage() {
        const quickLinksHTML = generateQuickLinks();

        markdownContent.innerHTML = `
            <div class="welcome-message">
                <h1>Sync Documentation</h1>
                <p>Welcome to the Sync documentation. Select a category below or browse from the sidebar to get started.</p>
                ${quickLinksHTML}
            </div>
        `;

        // Attach event listeners to quick links
        document.querySelectorAll('.quick-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const folder = link.dataset.folder;
                const file = link.dataset.file;
                if (folder && file) {
                    loadMarkdown(folder, file);
                }
            });
        });
    }

    // Post-process rendered markdown content
    function postProcessContent() {
        // Add IDs to headers for linking
        const headers = markdownContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
        headers.forEach(header => {
            if (!header.id) {
                header.id = slugify(header.textContent);
            }

            // Add anchor links to headers
            const anchor = document.createElement("a");
            anchor.href = `#${header.id}`;
            anchor.className = "header-anchor";
            anchor.innerHTML = '<i class="fas fa-link"></i>';
            anchor.title = "Direct link to this section";
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScrollTo(header.id);
            });
            header.appendChild(anchor);
        });

        // Add copy buttons to code blocks
        addCopyButtonsToCodeBlocks();

        // Add syntax highlighting classes
        addSyntaxHighlighting();

        // Make tables responsive
        makeTablesResponsive();

        // Update table of contents
        updateTableOfContents();

        // Add smooth scrolling to anchor links
        addSmoothScrolling();
    }

    // Add copy buttons to code blocks
    function addCopyButtonsToCodeBlocks() {
        const codeBlocks = markdownContent.querySelectorAll("pre");
        codeBlocks.forEach((block) => {
            // Don't add button if one already exists
            if (block.querySelector(".copy-button")) return;

            const copyButton = document.createElement("button");
            copyButton.className = "copy-button";
            copyButton.innerHTML = '<i class="fas fa-copy"></i>';
            copyButton.title = "Copy code";
            block.appendChild(copyButton);

            copyButton.onclick = async () => {
                const code = block.querySelector("code")?.textContent || block.textContent;
                try {
                    await navigator.clipboard.writeText(code);

                    // Show success feedback
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    copyButton.title = "Copied!";

                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                        copyButton.title = "Copy code";
                    }, 2000);
                } catch (err) {
                    console.error("Failed to copy: ", err);
                    copyButton.innerHTML = '<i class="fas fa-times"></i>';
                    copyButton.title = "Failed to copy";

                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
                        copyButton.title = "Copy code";
                    }, 2000);
                }
            };
        });
    }

    // Add basic syntax highlighting classes
    function addSyntaxHighlighting() {
        const codeBlocks = markdownContent.querySelectorAll("pre code");
        codeBlocks.forEach(block => {
            // Check if it's JSON
            if (block.textContent.trim().startsWith("{") || block.textContent.trim().startsWith("[")) {
                block.classList.add("language-json");
            }
            // Check if it's JavaScript
            else if (block.textContent.includes("function") || block.textContent.includes("const") ||
                     block.textContent.includes("let") || block.textContent.includes("var")) {
                block.classList.add("language-javascript");
            }
        });
    }

    // Make tables responsive
    function makeTablesResponsive() {
        const tables = markdownContent.querySelectorAll("table");
        tables.forEach(table => {
            const wrapper = document.createElement("div");
            wrapper.className = "table-wrapper";
            wrapper.style.overflowX = "auto";
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }

    // Update table of contents
    function updateTableOfContents() {
        headersMenu.innerHTML = "";
        const headers = markdownContent.querySelectorAll("h1, h2, h3, h4");

        if (headers.length === 0) {
            headersMenu.innerHTML = "<li>No headers in this document</li>";
            return;
        }

        headers.forEach(header => {
            const listItem = document.createElement("li");
            listItem.className = `header-${header.tagName.toLowerCase()}`;

            const link = document.createElement("a");
            link.href = `#${header.id}`;
            link.textContent = header.textContent.replace(/¶$/, ""); // Remove anchor symbol
            link.onclick = (e) => {
                e.preventDefault();
                smoothScrollTo(header.id);
                updateActiveTOCLink(header.id);
            };

            listItem.appendChild(link);
            headersMenu.appendChild(listItem);
        });

        // Observe header visibility for active TOC link
        observeHeaderVisibility();
    }

    // Update breadcrumb
    function updateBreadcrumb(folder, fileName) {
        breadcrumb.innerHTML = `
            <a href="documentation.html">Documentation</a>
            <i class="fas fa-chevron-right"></i>
            <span>${capitalizeAndFormat(folder)}</span>
            <i class="fas fa-chevron-right"></i>
            <span>${capitalizeAndFormat(fileName.replace(".md", ""))}</span>
        `;
    }

    // Update GitHub edit link
    function updateGitHubLink(folder, fileName) {
        if (editOnGitHub) {
            // Try to guess the correct path in the repository
            const possiblePaths = [
                `docs/${folder}/${fileName}`,
                `documentation/${folder}/${fileName}`,
                `markdown/${folder}/${fileName}`,
                `${folder}/${fileName}`
            ];

            const editUrl = `${GITHUB_REPO}/blob/main/${possiblePaths[0]}`;
            editOnGitHub.onclick = () => window.open(editUrl, "_blank");
        }
    }

    // Update previous/next links
    function updatePrevNextLinks(folder, fileName) {
        if (!prevNextLinks || !fileStructure) return;

        // Find all files in a flat array
        const allFiles = [];
        for (const folderName in fileStructure) {
            fileStructure[folderName].forEach(file => {
                allFiles.push({
                    folder: folderName,
                    file: file,
                    name: capitalizeAndFormat(file.replace(".md", ""))
                });
            });
        }

        // Find current file index
        const currentIndex = allFiles.findIndex(f =>
            f.folder === folder && f.file === fileName
        );

        prevNextLinks.innerHTML = "";

        // Previous link
        if (currentIndex > 0) {
            const prevFile = allFiles[currentIndex - 1];
            const prevLink = document.createElement("a");
            prevLink.className = "prev";
            prevLink.href = "#";
            prevLink.innerHTML = `
                <i class="fas fa-arrow-left"></i>
                <div>
                    <span class="label">Previous</span>
                    <span class="title">${prevFile.name}</span>
                </div>
            `;
            prevLink.onclick = (e) => {
                e.preventDefault();
                loadMarkdown(prevFile.folder, prevFile.file);
            };
            prevNextLinks.appendChild(prevLink);
        }

        // Next link
        if (currentIndex < allFiles.length - 1) {
            const nextFile = allFiles[currentIndex + 1];
            const nextLink = document.createElement("a");
            nextLink.className = "next";
            nextLink.href = "#";
            nextLink.innerHTML = `
                <div>
                    <span class="label">Next</span>
                    <span class="title">${nextFile.name}</span>
                </div>
                <i class="fas fa-arrow-right"></i>
            `;
            nextLink.onclick = (e) => {
                e.preventDefault();
                loadMarkdown(nextFile.folder, nextFile.file);
            };
            prevNextLinks.appendChild(nextLink);
        }
    }

    // Highlight active file in sidebar
    function highlightActiveFile(folder, fileName) {
        const fileItems = document.querySelectorAll(".file-item");
        fileItems.forEach((item) => item.classList.remove("active"));

        const activeFileItem = document.querySelector(
            `.file-item[data-folder="${folder}"][data-file="${fileName}"]`
        );

        if (activeFileItem) {
            activeFileItem.classList.add("active");

            // Expand parent folder if collapsed
            const folderItem = activeFileItem.closest("ul").previousElementSibling;
            if (folderItem && folderItem.classList.contains("folder")) {
                folderItem.classList.remove("collapsed");
            }

            // Scroll into view
            activeFileItem.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }

    // Load markdown from URL query parameter
    async function loadMarkdownFromQuery() {
        const params = new URLSearchParams(window.location.search);
        const filePath = params.get("file");

        if (filePath) {
            const [folder, fileName] = filePath.split("/");
            if (folder && fileName) {
                await loadMarkdown(folder, fileName, false);
                return;
            }
        }

        // Show welcome message with all categories
        showWelcomeMessage();
    }

    // Build search index
    function buildSearchIndex() {
        searchIndex = [];
        for (const folder in fileStructure) {
            fileStructure[folder].forEach(file => {
                const fileName = file.replace(".md", "");
                searchIndex.push({
                    folder,
                    file,
                    name: capitalizeAndFormat(fileName),
                    searchText: `${capitalizeAndFormat(folder)} ${capitalizeAndFormat(fileName)}`.toLowerCase()
                });
            });
        }
    }

    // Handle search
    function handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();

        if (!query) {
            // Reset to normal view
            const allItems = document.querySelectorAll(".file-item, .folder");
            allItems.forEach(item => {
                item.style.display = "";
                if (item.classList.contains("folder")) {
                    item.classList.remove("collapsed");
                }
            });
            return;
        }

        // Filter files
        const filteredFiles = searchIndex.filter(item =>
            item.searchText.includes(query)
        );

        // Hide/show items
        const allItems = document.querySelectorAll(".file-item, .folder");
        allItems.forEach(item => {
            item.style.display = "none";
        });

        // Show matching files and their folders
        filteredFiles.forEach(file => {
            const folderItem = document.querySelector(`.folder[data-folder="${file.folder}"]`);
            const fileItem = document.querySelector(`.file-item[data-folder="${file.folder}"][data-file="${file.file}"]`);

            if (folderItem) {
                folderItem.style.display = "";
                folderItem.classList.remove("collapsed");
                const folderSublist = folderItem.nextElementSibling;
                if (folderSublist) {
                    folderSublist.style.display = "";
                }
            }

            if (fileItem) {
                fileItem.style.display = "";
            }
        });
    }

    // Debounce function for search
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Setup event listeners
    function setupEventListeners() {
        // Search functionality
        if (searchInput) {
            searchInput.addEventListener("input", debounce(handleSearch, 300));
        }

        // Quick links in welcome message (will be attached dynamically)

        // Sidebar toggles
        if (leftSidebarToggle) {
            leftSidebarToggle.addEventListener("click", () => {
                leftSidebar.classList.toggle("active");
            });
        }

        if (rightSidebarToggle) {
            rightSidebarToggle.addEventListener("click", () => {
                rightSidebar.classList.toggle("active");
            });
        }

        // Print functionality
        if (printPage) {
            printPage.addEventListener("click", () => {
                window.print();
            });
        }

        // Close sidebars when clicking outside on mobile
        document.addEventListener("click", (e) => {
            if (window.innerWidth <= 1024) {
                if (leftSidebar && !leftSidebar.contains(e.target) && leftSidebarToggle && !leftSidebarToggle.contains(e.target)) {
                    leftSidebar.classList.remove("active");
                }
                if (rightSidebar && !rightSidebar.contains(e.target) && rightSidebarToggle && !rightSidebarToggle.contains(e.target)) {
                    rightSidebar.classList.remove("active");
                }
            }
        });

        // Handle browser back/forward
        window.addEventListener("popstate", (event) => {
            if (event.state) {
                loadMarkdown(event.state.folder, event.state.fileName, false);
            } else {
                loadMarkdownFromQuery();
            }
        });
    }

    // Initialize
    init();

    // Expose showWelcomeMessage globally for error recovery
    window.showWelcomeMessage = showWelcomeMessage;
});