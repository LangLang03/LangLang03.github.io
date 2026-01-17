class Term {
    constructor(data, type) {
        this.id = data.id;
        this.term = data.term;
        this.definition = data.definition;
        this.type = data.type;
        this.category = data.category;
        this.name = data.name;
        this.description = data.description;
        this.keywords = data.keywords;
        this.path = data.path;
        this.source = type;
    }
    
    getHtml() {
        return `<span class="glossary-term" data-term-definition="${this.definition}">${this.term}</span>`;
    }
    
    isEqual(otherTerm) {
        return this.term && otherTerm.term && this.term.toLowerCase() === otherTerm.term.toLowerCase();
    }
}

class GlossaryManager {
    constructor() {
        this.globalTerms = [];
        this.localTerms = [];
        this.conflictTerms = [];
    }
    
    addTerm(term, type) {
        if (type === 'global') {
            this.globalTerms.push(term);
        } else {
            this.localTerms.push(term);
        }
    }
    
    mergeTerms() {
        const termMap = new Map();
        
        this.globalTerms.forEach(globalTerm => {
            if (globalTerm.term) {
                termMap.set(globalTerm.term.toLowerCase(), { global: globalTerm, local: null });
            }
        });
        
        this.localTerms.forEach(localTerm => {
            if (localTerm.term) {
                const key = localTerm.term.toLowerCase();
                if (termMap.has(key)) {
                    const existing = termMap.get(key);
                    termMap.set(key, { global: existing.global, local: localTerm });
                } else {
                    termMap.set(key, { global: null, local: localTerm });
                }
            }
        });
        
        return termMap;
    }
    
    getConflictTerms() {
        const termMap = this.mergeTerms();
        const conflictTerms = [];
        
        termMap.forEach((terms, key) => {
            if (terms.global && terms.local) {
                conflictTerms.push({ global: terms.global, local: terms.local });
            }
        });
        
        return conflictTerms;
    }
    
    getNonConflictGlobalTerms() {
        const termMap = this.mergeTerms();
        const nonConflictGlobalTerms = [];
        
        termMap.forEach((terms, key) => {
            if (terms.global && !terms.local) {
                nonConflictGlobalTerms.push(terms.global);
            }
        });
        
        return nonConflictGlobalTerms;
    }
    
    getNonConflictLocalTerms() {
        const termMap = this.mergeTerms();
        const nonConflictLocalTerms = [];
        
        termMap.forEach((terms, key) => {
            if (terms.local && !terms.global) {
                nonConflictLocalTerms.push(terms.local);
            }
        });
        
        return nonConflictLocalTerms;
    }
}

function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    const savedTheme = getCookie('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '亮色模式' : '暗色模式';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        setCookie('theme', newTheme, 365);
        themeToggle.textContent = newTheme === 'dark' ? '亮色模式' : '暗色模式';
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];
    
    if (modal && modalImg && closeBtn) {
        document.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG' && e.target.parentElement.className === 'photo-item') {
                modal.style.display = 'block';
                modalImg.src = e.target.src;
                document.body.style.overflow = 'hidden';
            }
        });
        
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

function loadEntries(url, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.entries && data.entries.length > 0) {
                container.innerHTML = '';
                data.entries.forEach(entry => {
                    const entryCard = document.createElement('div');
                    entryCard.className = 'entry-card';
                    
                    let keywordsHtml = '';
                    if (entry.keywords && entry.keywords.length > 0) {
                        keywordsHtml = '<div class="entry-keywords">';
                        entry.keywords.forEach(keyword => {
                            keywordsHtml += `<span class="keyword">${keyword}</span>`;
                        });
                        keywordsHtml += '</div>';
                    }
                    
                    entryCard.innerHTML = `
                        <h3>${entry.name}</h3>
                        <div class="entry-category">${entry.category}</div>
                        <div class="entry-description">${entry.description}</div>
                        ${keywordsHtml}
                    `;
                    
                    if (entry.path) {
                        entryCard.addEventListener('click', () => {
                            window.location.href = entry.path;
                        });
                    }
                    
                    container.appendChild(entryCard);
                });
            } else {
                container.innerHTML = '<p>暂无词条数据</p>';
            }
        })
        .catch(error => {
            console.error('加载词条失败:', error);
            container.innerHTML = '<p class="dirty">加载词条失败，请稍后重试</p>';
        });
}

function highlightTerms(text, terms) {
    let highlightedText = text;
    if (terms && Array.isArray(terms) && terms.length > 0) {
        const validTerms = terms.filter(term => term && term.term && term.definition && typeof term.term === 'string');
        
        const sortedTerms = validTerms.sort((a, b) => {
            const aLength = a.term ? a.term.length : 0;
            const bLength = b.term ? b.term.length : 0;
            return bLength - aLength;
        });
        let result = highlightedText;
        
        sortedTerms.forEach(term => {
            const regex = new RegExp(`(?<!<[^>]*?)${escapeRegExp(term.term)}(?!.*?>)`, 'g');
            result = result.replace(regex, `<span class="term" data-term-definition="${term.definition}">${term.term}</span>`);
        });
        
        highlightedText = result;
    }
    return highlightedText;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function loadGlossary(urls, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const termUrls = typeof urls === 'string' ? [urls] : urls;
    const fetchPromises = termUrls.map(url => {
        return fetch(url)
            .then(response => response.json())
            .catch(error => {
                console.error(`加载术语表失败: ${url}`, error);
                return { entries: [] };
            });
    });
    Promise.all(fetchPromises)
        .then(results => {
            const glossaryManager = new GlossaryManager();
            results.forEach((result, index) => {
                if (result.entries && result.entries.length > 0) {
                    const type = index === 0 ? 'global' : 'local';
                    console.log(`${type === 'global' ? '全局' : '局部'}术语表条目数量:`, result.entries.length);
                    result.entries.forEach(entry => {
                        if (entry.term) {
                            const term = new Term(entry, type);
                            glossaryManager.addTerm(term, type);
                            if (entry.term.toLowerCase() === 'gpl协议') {
                                console.log(`${type === 'global' ? '全局' : '局部'}GPL协议:`, entry.definition);
                            }
                        }
                    });
                }
            });
            const conflictTerms = glossaryManager.getConflictTerms();
            
            console.log('冲突术语数量:', conflictTerms.length);
            console.log('冲突术语:', conflictTerms);
            const gplConflict = conflictTerms.find(terms => terms.global && terms.global.term.toLowerCase() === 'gpl协议');
            if (gplConflict) {
                console.log('GPL协议冲突:', {
                    global: gplConflict.global.definition,
                    local: gplConflict.local.definition
                });
            } else {
                console.log('未检测到GPL协议冲突');
            }
            const nonConflictGlobalTerms = glossaryManager.getNonConflictGlobalTerms();
            const nonConflictLocalTerms = glossaryManager.getNonConflictLocalTerms();
            let glossaryHtml = '';
            if (conflictTerms.length > 0) {
                glossaryHtml += '<div class="entry-card conflict-card">';
                glossaryHtml += '<h3>冲突术语</h3>';
                glossaryHtml += '<ul>';
                
                conflictTerms.forEach(terms => {
                    glossaryHtml += '<li class="conflict-term">';
                    glossaryHtml += `<span class="glossary-term">${terms.global.term}</span>`;
                    glossaryHtml += '<div class="conflict-container">';
                    glossaryHtml += '<div class="global-term">';
                    glossaryHtml += '<div class="term-label">全局术语</div>';
                    glossaryHtml += `<div class="term-definition">${terms.global.definition}</div>`;
                    glossaryHtml += '</div>';
                    glossaryHtml += '<div class="term-separator"></div>';
                    glossaryHtml += '<div class="local-term">';
                    glossaryHtml += '<div class="term-label">局部术语</div>';
                    glossaryHtml += `<div class="term-definition">${terms.local.definition}</div>`;
                    glossaryHtml += '</div>';
                    glossaryHtml += '</div>';
                    glossaryHtml += '</li>';
                });
                
                glossaryHtml += '</ul>';
                glossaryHtml += '</div>';
            }
            if (nonConflictGlobalTerms.length > 0) {
                glossaryHtml += '<div class="entry-card">';
                glossaryHtml += '<h3>全局术语</h3>';
                glossaryHtml += '<ul>';
                const globalTermsByCategory = {};
                nonConflictGlobalTerms.forEach(term => {
                    const category = term.category || '未分类';
                    if (!globalTermsByCategory[category]) {
                        globalTermsByCategory[category] = [];
                    }
                    globalTermsByCategory[category].push(term);
                });
                for (const category in globalTermsByCategory) {
                    glossaryHtml += `<li><strong>${category}：</strong></li>`;
                    globalTermsByCategory[category].forEach(term => {
                        glossaryHtml += `<li style="margin-left: 2em;"><span class="glossary-term">${term.term}</span>：${term.definition}</li>`;
                    });
                }
                glossaryHtml += '</ul>';
                glossaryHtml += '</div>';
            }
            if (nonConflictLocalTerms.length > 0) {
                glossaryHtml += '<div class="entry-card">';
                glossaryHtml += '<h3>局部术语</h3>';
                glossaryHtml += '<ul>';
                const localTermsByCategory = {};
                nonConflictLocalTerms.forEach(term => {
                    const category = term.category || '未分类';
                    if (!localTermsByCategory[category]) {
                        localTermsByCategory[category] = [];
                    }
                    localTermsByCategory[category].push(term);
                });
                for (const category in localTermsByCategory) {
                    glossaryHtml += `<li><strong>${category}：</strong></li>`;
                    localTermsByCategory[category].forEach(term => {
                        glossaryHtml += `<li style="margin-left: 2em;"><span class="glossary-term">${term.term}</span>：${term.definition}</li>`;
                    });
                }
                glossaryHtml += '</ul>';
                glossaryHtml += '</div>';
            }
            if (glossaryHtml === '') {
                glossaryHtml = '<p>暂无术语数据</p>';
            }
            container.innerHTML = glossaryHtml;
        })
        .catch(error => {
            console.error('加载术语表失败:', error);
            container.innerHTML = '<p class="dirty">加载术语表失败，请稍后重试</p>';
        });
}

function highlightPageTerms(urls) {
    
    const termUrls = typeof urls === 'string' ? [urls] : urls;
    
    
    const fetchPromises = termUrls.map(url => {
        return fetch(url)
            .then(response => response.json())
            .catch(error => {
                console.error(`加载术语表失败: ${url}`, error);
                return { entries: [] };
            });
    });
    
    
    Promise.all(fetchPromises)
        .then(results => {
            
            const glossaryManager = new GlossaryManager();
            
            
            results.forEach((result, index) => {
                if (result.entries && result.entries.length > 0) {
                    
                    const type = index === 0 ? 'global' : 'local';
                    
                    result.entries.forEach(entry => {
                        
                        if (entry.term) {
                            const term = new Term(entry, type);
                            glossaryManager.addTerm(term, type);
                        }
                    });
                }
            });
            
            
            const conflictTerms = glossaryManager.getConflictTerms();
            
            
            const nonConflictGlobalTerms = glossaryManager.getNonConflictGlobalTerms();
            const nonConflictLocalTerms = glossaryManager.getNonConflictLocalTerms();
            
            
            const allTerms = [];
            
            
            allTerms.push(...nonConflictGlobalTerms);
            allTerms.push(...nonConflictLocalTerms);
            
            
            conflictTerms.forEach(terms => {
                
                
                const mergedTerm = new Term({
                    ...terms.global,
                    
                    definition: `全局定义：${terms.global.definition}\n局部定义：${terms.local.definition}`
                }, 'global');
                allTerms.push(mergedTerm);
            });
            
            if (allTerms.length > 0) {
                
                const elements = document.querySelectorAll('.content p, .content h2, .content h3, .content li, .chat-content, .chat-user');
                elements.forEach(element => {
                    element.innerHTML = highlightTerms(element.innerHTML, allTerms);
                });
            }
        });
}


function autoLoadTerms() {
    
    const path = window.location.pathname;
    
    
    const rootTermsUrl = '/entries.json';
    
    
    const match = path.match(/\/s\/([^\/]+)/);
    if (match) {
        const godId = match[1];
        
        highlightPageTerms([rootTermsUrl, `/s/${godId}/entries.json`]);
    } else {
        
        highlightPageTerms(rootTermsUrl);
    }
}


function generateStatusBanner() {
    
    const path = window.location.pathname;
    
    
    fetch('/info.json')
        .then(response => response.json())
        .then(data => {
            
            const god = data.gods.find(god => god.id === 'webide');
            if (god) {
                
                const currentSection = god.sections.find(section => section.path === path);
                if (currentSection) {
                    
                    const banner = document.createElement('div');
                    banner.className = 'status-banner';
                    
                    
                    let aiStatus = '';
                    let verifiedStatus = '';
                    
                    if (currentSection.ai) {
                        aiStatus = '<span class="status-item ai"><i class="fas fa-robot"></i>AI创作</span>';
                    }
                    
                    if (currentSection.data_verified) {
                        verifiedStatus = '<span class="status-item verified"><i class="fas fa-check-circle"></i>数据属实</span>';
                    } else {
                        verifiedStatus = '<span class="status-item not-verified"><i class="fas fa-exclamation-triangle"></i>数据真实性未证明</span>';
                    }
                    
                    
                    banner.innerHTML = `
                        <div class="status-info">
                            ${aiStatus}
                            ${verifiedStatus}
                        </div>
                        <button class="status-toggle" onclick="toggleStatusDetails(this)"><i class="fas fa-chevron-down"></i></button>
                    `;
                    
                    
                    const content = document.querySelector('.content');
                    if (content) {
                        const firstChild = content.firstChild;
                        content.insertBefore(banner, firstChild.nextSibling);
                    }
                }
            }
        })
        .catch(error => {
            console.error('加载状态信息失败:', error);
        });
}


function toggleStatusDetails(button) {
    const banner = button.parentElement;
    const details = banner.querySelector('.status-details');
    
    if (details) {
        
        if (details.style.display === 'none') {
            details.style.display = 'block';
            button.innerHTML = '<i class="fas fa-chevron-up"></i>';
        } else {
            details.style.display = 'none';
            button.innerHTML = '<i class="fas fa-chevron-down"></i>';
        }
    }
}


function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    if (!searchInput || !searchButton) return;
    
    
        function performSearch(query) {
            if (!query.trim()) {
                
                const resultsContainer = document.getElementById('search-results');
                if (resultsContainer) {
                    resultsContainer.remove();
                }
                return;
            }
            
            
            fetch('/info.json')
                .then(response => response.json())
                .then(data => {
                    const searchResults = [];
                    const lowerQuery = query.toLowerCase();
                    
                    
                    data.gods.forEach(god => {
                        if (god.name.toLowerCase().includes(lowerQuery) || 
                            god.description.toLowerCase().includes(lowerQuery) ||
                            (god.keywords && god.keywords.some(keyword => keyword.toLowerCase().includes(lowerQuery)))) {
                            searchResults.push({
                                type: 'god',
                                id: god.id,
                                name: god.name,
                                description: god.description,
                                path: god.path,
                                index: god.index
                            });
                        }
                    });
                    
                    
                    displaySearchResults(searchResults, query);
                })
                .catch(error => {
                    console.error('搜索失败:', error);
                });
        }
    
    
    function displaySearchResults(results, query) {
        let resultsContainer = document.getElementById('search-results');
        
        
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'search-results';
            resultsContainer.className = 'search-results';
            
            
            const content = document.querySelector('.content');
            if (content) {
                const firstSection = content.querySelector('.section');
                if (firstSection) {
                    content.insertBefore(resultsContainer, firstSection);
                } else {
                    content.appendChild(resultsContainer);
                }
            }
        }
        
        
        let html = `<h2>搜索结果："${query}" (${results.length} 个结果)</h2>`;
        
        if (results.length === 0) {
            html += '<p>未找到相关结果</p>';
        } else {
            results.forEach(result => {
                if (result.type === 'god') {
                    html += `
                        <div class="search-result-item">
                            <div class="search-result-type">神人</div>
                            <h3><a href="${result.path}/list.html">${result.name}</a></h3>
                            <p>${result.description}</p>
                            <div class="god-index">神人指数：${result.index}</div>
                        </div>
                    `;
                } else if (result.type === 'entry') {
                    html += `
                        <div class="search-result-item">
                            <div class="search-result-type">条目</div>
                            <h3><a href="${result.godPath}/list.html#entry-${result.id}">${result.title}</a></h3>
                            <p>${result.content.slice(0, 150)}${result.content.length > 150 ? '...' : ''}</p>
                            <div class="entry-date">${result.date} | <a href="${result.godPath}/list.html">${result.godName}</a></div>
                        </div>
                    `;
                }
            });
        }
        
        resultsContainer.innerHTML = html;
    }
    
    
    searchButton.addEventListener('click', () => {
        performSearch(searchInput.value);
    });
    
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch(searchInput.value);
        }
    });
}


document.addEventListener('DOMContentLoaded', initSearch);