/**
 * Eclipse Documentation UI Application
 */

class EclipseDocumentationApp {
    constructor() {
        this.state = {
            currentClass: null,
            navigationState: 'home', // 'home', 'class', 'method'
            documentationData: {},
            allMethods: [],
            searchTimeout: null
        };

        this.cache = {
            elements: new Map(),
            content: new Map()
        };

        this.init();
    }

    /**
     * Initialize application
     */
    async init() {
        try {
            this.cacheElements();
            this.setupEventListeners();
            await this.loadDocumentationStructure();
            this.setupSearch();
        } catch (error) {
            console.error('Failed to initialize Eclipse Documentation UI:', error);
            this.showError('Failed to load documentation. Please try refreshing the page.');
        }
    }

    /**
     * Cache frequently used DOM elements
     */
    cacheElements() {
        const elements = [
            'homeContent', 'dynamicContent', 'markdownContent',
            'classesList', 'methodsList', 'backButton',
            'classItems', 'methodItems', 'methodsTitle',
            'classOverview', 'searchInput', 'searchResults'
        ];

        elements.forEach(id => {
            this.cache.elements.set(id, document.getElementById(id));
        });
    }

    /**
     * Get cached element
     */
    getElement(id) {
        return this.cache.elements.get(id) || document.getElementById(id);
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Back button
        this.getElement('backButton').onclick = () => this.goBack();

        // Hide search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.getElement('searchResults').classList.add('hidden');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.getElement('searchResults').classList.add('hidden');
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.getElement('searchInput').focus();
            }
        });
    }

    /**
     * Load documentation structure
     */
    async loadDocumentationStructure() {
        try {
            const response = await fetch('./index.md');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const mainIndexContent = await response.text();

            const classMatches = mainIndexContent.match(/- \[(.*?)\]\((.*?)\) \((\d+) methods\)/g);

            if (!classMatches) {
                throw new Error('No class matches found in index.md');
            }

            // Load each class in parallel for better performance
            const classPromises = classMatches.map(match => this.loadClassData(match));
            await Promise.all(classPromises);

            this.renderClassesOverview();
            this.renderClassesSidebar();

        } catch (error) {
            console.error('Error loading documentation structure:', error);
            await this.loadFallbackStructure();
        }
    }

    /**
     * Load individual class data
     */
    async loadClassData(match) {
        const parts = match.match(/- \[(.*?)\]\((.*?)\) \((\d+) methods\)/);
        if (!parts) return;
        
        const [, className, path, methodCount] = parts;
        
        try {
            const classIndexResponse = await fetch(path);
            
            if (!classIndexResponse.ok) {
                console.warn(`Failed to load ${path}: ${classIndexResponse.status}`);
                return;
            }
            
            const classIndexContent = await classIndexResponse.text();
            
            const methods = {};
            const methodMatches = classIndexContent.match(/\| \[(.*?)\]\((.*?)\) \| (.*?) \|/g);
            
            if (methodMatches) {
                for (const methodMatch of methodMatches) {
                    const methodParts = methodMatch.match(/\| \[(.*?)\]\((.*?)\) \| (.*?) \|/);
                    if (methodParts) {
                        const [, methodName, methodPath, methodDesc] = methodParts;
                        
                        const basePath = path.replace('/index.md', '');
                        const cleanMethodPath = methodPath.startsWith('./') ? methodPath.substring(2) : methodPath;
                        
                        methods[methodName] = {
                            path: `${basePath}/${cleanMethodPath}`,
                            description: methodDesc
                        };
                    }
                }
            }
            
            this.state.documentationData[className] = {
                path: path,
                methodCount: parseInt(methodCount),
                methods: methods
            };
            
            // Add methods to global search index
            Object.keys(methods).forEach(methodName => {
                this.state.allMethods.push({
                    className: className,
                    methodName: methodName,
                    description: methods[methodName].description,
                    path: methods[methodName].path
                });
            });
            
        } catch (classError) {
            console.error(`Error loading class ${className}:`, classError);
        }
    }

    /**
     * Fallback structure detection
     */
    async loadFallbackStructure() {       
        const knownClasses = ['Player', 'Creature', 'GameObject', 'Item', 'Global'];
        
        const classPromises = knownClasses.map(async className => {
            try {
                const classPath = `./${className}/index.md`;
                const response = await fetch(classPath);
                
                if (response.ok) {
                    const content = await response.text();
                    const methodMatches = content.match(/\| \[(.*?)\]\((.*?)\) \| (.*?) \|/g) || [];
                    
                    const methods = {};
                    methodMatches.forEach(match => {
                        const parts = match.match(/\| \[(.*?)\]\((.*?)\) \| (.*?) \|/);
                        if (parts) {
                            const [, methodName, methodPath, methodDesc] = parts;
                            methods[methodName] = {
                                path: `./${className}/${methodPath.replace('./', '')}`,
                                description: methodDesc
                            };
                        }
                    });
                    
                    this.state.documentationData[className] = {
                        path: classPath,
                        methodCount: Object.keys(methods).length,
                        methods: methods
                    };
                    
                    Object.keys(methods).forEach(methodName => {
                        this.state.allMethods.push({
                            className: className,
                            methodName: methodName,
                            description: methods[methodName].description,
                            path: methods[methodName].path
                        });
                    });
                }
            } catch (error) {
                console.warn(`Failed to load fallback for ${className}:`, error);
            }
        });
        
        await Promise.all(classPromises);
        this.renderClassesOverview();
        this.renderClassesSidebar();
    }

    /**
     * Render classes overview on home page
     */
    renderClassesOverview() {
        const container = this.getElement('classOverview');
        if (!container) return;
        
        container.innerHTML = '';
        
        Object.entries(this.state.documentationData).forEach(([className, data]) => {
            const card = document.createElement('div');
            card.className = 'class-card';
            card.onclick = () => this.showClassMethods(className);
            
            card.innerHTML = `
                <h3>${this.escapeHtml(className)}</h3>
                <p>${data.methodCount} methods available</p>
            `;
            
            container.appendChild(card);
        });
    }

    /**
     * Render sidebar class navigation
     */
    renderClassesSidebar() {
        const container = this.getElement('classItems');
        if (!container) return;
        
        container.innerHTML = '';
        
        Object.entries(this.state.documentationData).forEach(([className, data]) => {
            const item = document.createElement('div');
            item.className = 'nav-item';
            item.onclick = () => this.showClassMethods(className);
            item.textContent = className + ' (' + data.methodCount + ')';
            container.appendChild(item);
        });
    }

    /**
     * Show methods for a specific class
     */
    showClassMethods(className) {
        this.state.currentClass = className;
        const data = this.state.documentationData[className];
        
        if (!data) return;
        
        this.state.navigationState = 'class';
        
        // Hide home content, show sidebar methods
        this.getElement('homeContent').classList.add('hidden');
        this.getElement('dynamicContent').classList.add('hidden');
        this.getElement('classesList').classList.add('hidden');
        this.getElement('methodsList').classList.remove('hidden');
        this.getElement('backButton').classList.remove('hidden');
        
        // Update methods title
        const methodsTitle = this.getElement('methodsTitle');
        if (methodsTitle) {
            methodsTitle.textContent = `${className} Methods`;
        }
        
        // Render method list
        this.renderMethodsList(data);
        
        // Show class overview by default
        this.showClassOverview(className, data);
    }

    /**
     * Render methods list in sidebar
     */
    renderMethodsList(data) {
        const container = this.getElement('methodItems');
        if (!container) return;
        
        container.innerHTML = '';
        
        Object.entries(data.methods).forEach(([methodName, methodData]) => {
            const item = document.createElement('div');
            item.className = 'nav-item';
            item.onclick = (e) => this.showMethodDocumentation(methodData.path, methodName, e.target);
            item.textContent = methodName;
            container.appendChild(item);
        });
    }

    /**
     * Show class overview (list of methods in main content)
     */
    showClassOverview(className, data) {
        const methodsTable = Object.entries(data.methods).map(([methodName, methodData]) => {
            const cleanDesc = this.cleanMarkdownLinks(methodData.description || 'No description available');
            
            return `<tr class="clickable-row" onclick="app.showMethodDocumentation('${methodData.path}', '${methodName}')">
                <td><span class="method-link">${this.escapeHtml(methodName)}</span></td>
                <td>${this.escapeHtml(cleanDesc)}</td>
            </tr>`;
        }).join('');
        
        const overview = `
            <h1>${this.escapeHtml(className)} Methods</h1>
            <p>This page contains all available methods for the <code>${this.escapeHtml(className)}</code> class in Eclipse Lua scripting.</p>
            <h2>Available Methods</h2>
            <table>
                <tr><th>Method</th><th>Description</th></tr>
                ${methodsTable}
            </table>
        `;
        
        this.getElement('markdownContent').innerHTML = overview;
        this.getElement('dynamicContent').classList.remove('hidden');
    }

    /**
     * Show documentation for a specific method
     */
    async showMethodDocumentation(path, methodName, clickedElement = null) {
        try {            
            this.state.navigationState = 'method';
            
            // Check cache first
            let markdownContent = this.cache.content.get(path);
            
            if (!markdownContent) {
                const response = await fetch(path);
                if (!response.ok) {
                    throw new Error(`Failed to load ${path}: ${response.status}`);
                }
                
                markdownContent = await response.text();
                this.cache.content.set(path, markdownContent);
            }
            
            const htmlContent = this.parseMarkdown(markdownContent);
            
            this.getElement('markdownContent').innerHTML = htmlContent;
            this.getElement('dynamicContent').classList.remove('hidden');
            
            // Update active states
            document.querySelectorAll('#methodItems .nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // If no clicked element provided, find the matching method in sidebar
            if (clickedElement) {
                clickedElement.classList.add('active');
            } else {
                // Find the sidebar item that matches this method name
                const sidebarItems = document.querySelectorAll('#methodItems .nav-item');
                sidebarItems.forEach(item => {
                    if (item.textContent.trim() === methodName) {
                        item.classList.add('active');
                    }
                });
            }
            
        } catch (error) {
            console.error('Error loading method documentation:', error);
            this.getElement('markdownContent').innerHTML = `
                <h1>Error</h1>
                <p>Failed to load documentation for ${this.escapeHtml(methodName)}.</p>
                <p>Path: ${this.escapeHtml(path)}</p>
                <p>Error: ${this.escapeHtml(error.message)}</p>
            `;
            this.getElement('dynamicContent').classList.remove('hidden');
        }
    }

    /**
     * Handle internal link navigation
     */
    handleInternalLink(url) {        
        if (url === './index.md') {
            if (this.state.currentClass && this.state.documentationData[this.state.currentClass]) {
                this.showClassOverview(this.state.currentClass, this.state.documentationData[this.state.currentClass]);
            }
        } else if (url.startsWith('../')) {
            const parts = url.split('/');
            if (parts.length >= 2) {
                const className = parts[1];
                
                if (this.state.documentationData[className]) {
                    this.showClassMethods(className);
                } else {
                    const foundClass = Object.keys(this.state.documentationData).find(key => 
                        key.toLowerCase() === className.toLowerCase()
                    );
                    if (foundClass) {
                        this.showClassMethods(foundClass);
                    } else {
                        console.error('Class not available in current documentation');
                    }
                }
            }
        } else if (url.startsWith('./')) {
            const methodName = url.replace('./', '').replace('.md', '');
            if (this.state.currentClass && this.state.documentationData[this.state.currentClass]) {
                const methodData = Object.entries(this.state.documentationData[this.state.currentClass].methods).find(
                    ([name]) => name.toLowerCase() === methodName.toLowerCase()
                );
                if (methodData) {
                    const [realMethodName, realMethodData] = methodData;
                    this.showMethodDocumentation(realMethodData.path, realMethodName);
                }
            }
        }
    }

    /**
     * Go back navigation
     */
    goBack() {
        
        if (this.state.navigationState === 'method') {
            if (this.state.currentClass && this.state.documentationData[this.state.currentClass]) {
                this.showClassOverview(this.state.currentClass, this.state.documentationData[this.state.currentClass]);
                this.state.navigationState = 'class';
                
                document.querySelectorAll('#methodItems .nav-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        } else if (this.state.navigationState === 'class') {
            this.state.currentClass = null;
            this.state.navigationState = 'home';
            
            this.getElement('homeContent').classList.remove('hidden');
            this.getElement('dynamicContent').classList.add('hidden');
            this.getElement('classesList').classList.remove('hidden');
            this.getElement('methodsList').classList.add('hidden');
            this.getElement('backButton').classList.add('hidden');
            
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
        } else {
            this.state.currentClass = null;
            this.state.navigationState = 'home';
            
            this.getElement('homeContent').classList.remove('hidden');
            this.getElement('dynamicContent').classList.add('hidden');
            this.getElement('classesList').classList.remove('hidden');
            this.getElement('methodsList').classList.add('hidden');
            this.getElement('backButton').classList.add('hidden');
            
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
        }
    }

    /**
     * Setup search functionality
     */
    setupSearch() {
        const searchInput = this.getElement('searchInput');
        const searchResults = this.getElement('searchResults');
        
        if (!searchInput || !searchResults) return;
        
        searchInput.addEventListener('input', (e) => {
            clearTimeout(this.state.searchTimeout);
            const query = e.target.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.classList.add('hidden');
                return;
            }
            
            this.state.searchTimeout = setTimeout(() => {
                const results = this.state.allMethods.filter(method => 
                    method.methodName.toLowerCase().includes(query) ||
                    method.className.toLowerCase().includes(query) ||
                    method.description.toLowerCase().includes(query)
                ).slice(0, 8);
                
                if (results.length > 0) {
                    searchResults.innerHTML = results.map(result => `
                        <div class="search-result-item" onclick="app.navigateToMethod('${result.className}', '${result.methodName}', '${result.path}')">
                            <div class="search-result-title">${this.escapeHtml(result.className)}.${this.escapeHtml(result.methodName)}()</div>
                            <div class="search-result-desc">${this.escapeHtml(result.description)}</div>
                        </div>
                    `).join('');
                    searchResults.classList.remove('hidden');
                } else {
                    searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
                    searchResults.classList.remove('hidden');
                }
            }, 300);
        });
    }

    /**
     * Navigate to specific method from search
     */
    async navigateToMethod(className, methodName, path) {
        this.getElement('searchResults').classList.add('hidden');
        this.getElement('searchInput').value = '';
        
        this.showClassMethods(className);
        
        setTimeout(() => {
            this.showMethodDocumentation(path, methodName);
        }, 100);
    }

    /**
     * Simple markdown parser with performance optimizations
     */
    parseMarkdown(markdown) {
        let html = markdown;
        
        // Protect code blocks first
        const codeBlocks = [];
        html = html.replace(/```(\w+)?\n?([^`]*)```/gim, (match, lang, code) => {
            const index = codeBlocks.length;
            const cleanCode = code.trim();
            codeBlocks.push(`<pre><code>${this.escapeHtml(cleanCode)}</code></pre>`);
            return `__CODEBLOCK_${index}__`;
        });
        
        // Protect inline code
        const inlineCode = [];
        html = html.replace(/`([^`]+)`/gim, (match, code) => {
            const index = inlineCode.length;
            inlineCode.push(`<code>${this.escapeHtml(code)}</code>`);
            return `__INLINECODE_${index}__`;
        });
        
        // Headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Tables
        const tableRegex = /\|(.+)\|\n\|[-\s\|]+\|\n((\|.+\|\n?)*)/gim;
        html = html.replace(tableRegex, (match, header, body) => {
            const headerCells = header.split('|').map(cell => cell.trim()).filter(cell => cell);
            const headerRow = '<tr>' + headerCells.map(cell => `<th>${cell}</th>`).join('') + '</tr>';
            
            const bodyRows = body.split('\n').filter(row => row.trim()).map(row => {
                const cells = row.split('|').map(cell => cell.trim()).filter(cell => cell);
                return '<tr>' + cells.map(cell => `<td>${cell}</td>`).join('') + '</tr>';
            }).join('');
            
            return `<table>${headerRow}${bodyRows}</table>`;
        });
        
        // Bold and Italic
        html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
        html = html.replace(/\*([^*\s]+(?:\s+[^*\s]+)*)\*/gim, '<em>$1</em>');
        
        // Links with click handling
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, (match, text, url) => {
            if (url.startsWith('../') || url.startsWith('./')) {
                const cleanUrl = this.escapeHtml(url);
                return `<a href="javascript:void(0)" onclick="app.handleInternalLink('${cleanUrl}')" style="color: var(--accent); text-decoration: underline; cursor: pointer;">${text}</a>`;
            } else {
                return `<a href="${url}" target="_blank">${text}</a>`;
            }
        });
        
        // Lists
        const lines = html.split('\n');
        let inList = false;
        let processedLines = [];
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const listMatch = line.match(/^- (.+)$/);
            
            if (listMatch) {
                if (!inList) {
                    processedLines.push('<ul>');
                    inList = true;
                }
                processedLines.push(`<li>${listMatch[1]}</li>`);
            } else {
                if (inList && line.trim() === '') {
                    continue;
                } else if (inList) {
                    processedLines.push('</ul>');
                    inList = false;
                }
                processedLines.push(line);
            }
        }
        
        if (inList) {
            processedLines.push('</ul>');
        }
        
        html = processedLines.join('\n');
        
        // Paragraphs
        html = html.replace(/\n\n+/gim, '</p><p>');
        html = '<p>' + html + '</p>';
        
        // Clean up
        html = html.replace(/<p><\/p>/gim, '');
        html = html.replace(/<p>(<[^>]+>)/gim, '$1');
        html = html.replace(/(<\/[^>]+>)<\/p>/gim, '$1');
        
        // Restore code blocks and inline code
        codeBlocks.forEach((block, index) => {
            html = html.replace(`__CODEBLOCK_${index}__`, block);
        });
        inlineCode.forEach((code, index) => {
            html = html.replace(`__INLINECODE_${index}__`, code);
        });
        
        return html;
    }

    /**
     * Utility functions
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    cleanMarkdownLinks(text) {
        return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-secondary);
            border: 1px solid #ff6b6b;
            color: #ff6b6b;
            padding: 1rem;
            border-radius: var(--radius-md);
            z-index: 1000;
            max-width: 300px;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => errorDiv.remove(), 5000);
    }
}

// Initialize application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new EclipseDocumentationApp();
});

// Global function for onclick handlers
window.app = app;