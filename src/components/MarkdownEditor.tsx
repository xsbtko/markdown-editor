import { useState, useCallback, useRef, useEffect } from 'react';
import { useI18n } from '../i18n/i18n';
import { marked } from 'marked';
import hljs from 'highlight.js';
import katex from 'katex';
import 'highlight.js/styles/github.css';
import 'katex/dist/katex.min.css';
import './MarkdownEditor.css';

// Configure marked with highlight.js
marked.setOptions({
  breaks: true,
  gfm: true,
  async: false,
});

// Custom renderer for better Typora-like experience
const renderer = new marked.Renderer();

// Override code block rendering with syntax highlighting
renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
  const validLanguage = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language: validLanguage }).value;
  return `<pre><code class="hljs language-${validLanguage}">${highlighted}</code></pre>`;
};

renderer.codespan = ({ text }: { text: string }) => {
  return `<code class="inline-code">${text}</code>`;
};

marked.use({ renderer });

// LaTeX formula placeholder counter
let formulaCounter = 0;
const formulaMap = new Map<string, string>();

// Extract and replace LaTeX formulas with placeholders
function extractFormulas(text: string): string {
  formulaCounter = 0;
  formulaMap.clear();
  
  // Replace block formulas ($$...$$)
  text = text.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
    const placeholder = `<!--LATEX_BLOCK_${formulaCounter}-->`;
    formulaMap.set(placeholder, match);
    formulaCounter++;
    return placeholder;
  });
  
  // Replace inline formulas ($...$) - but not $$...$$
  text = text.replace(/(?<!\$)\$(?!\$)[^\$\n]+?(?<!\$)\$(?!\$)/g, (match) => {
    const placeholder = `<!--LATEX_INLINE_${formulaCounter}-->`;
    formulaMap.set(placeholder, match);
    formulaCounter++;
    return placeholder;
  });
  
  return text;
}

// Render LaTeX formulas using KaTeX
function renderFormulas(html: string): string {
  formulaMap.forEach((formula, placeholder) => {
    try {
      let rendered: string;
      
      if (formula.startsWith('$$') && formula.endsWith('$$')) {
        // Block formula
        const cleanFormula = formula.slice(2, -2).trim();
        rendered = katex.renderToString(cleanFormula, {
          displayMode: true,
          throwOnError: false,
          strict: false,
        });
      } else {
        // Inline formula
        const cleanFormula = formula.slice(1, -1).trim();
        rendered = katex.renderToString(cleanFormula, {
          displayMode: false,
          throwOnError: false,
          strict: false,
        });
      }
      
      html = html.replace(placeholder, rendered);
    } catch (error) {
      console.error('KaTeX render error:', error);
      html = html.replace(placeholder, `<span class="katex-error">${formula}</span>`);
    }
  });
  
  return html;
}

interface MarkdownEditorProps {
  initialContent?: string;
  onChange?: (content: string) => void;
}

export function MarkdownEditor({ initialContent = '', onChange }: MarkdownEditorProps) {
  const { t } = useI18n();
  const [htmlContent, setHtmlContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  // Use ref for content to avoid controlled textarea (preserves native undo stack)
  const contentRef = useRef(initialContent);
  // Separate state for status bar display only
  const [charCount, setCharCount] = useState(initialContent.length);
  const [wordCount, setWordCount] = useState(initialContent.split(/\s+/).filter(w => w.length > 0).length);
  const [lineCount, setLineCount] = useState(initialContent.split('\n').length);

  // Convert markdown to HTML with LaTeX support
  const updatePreview = useCallback((text: string) => {
    const textWithPlaceholders = extractFormulas(text);
    let html = marked.parse(textWithPlaceholders) as string;
    html = renderFormulas(html);
    setHtmlContent(html);
  }, []);

  // Update status bar counts
  const updateStats = useCallback((text: string) => {
    setCharCount(text.length);
    setWordCount(text.split(/\s+/).filter(w => w.length > 0).length);
    setLineCount(text.split('\n').length);
  }, []);

  // Initialize preview
  useEffect(() => {
    contentRef.current = initialContent;
    updatePreview(initialContent);
    updateStats(initialContent);
    // Sync textarea value when initialContent changes from parent
    if (textareaRef.current && textareaRef.current.value !== initialContent) {
      textareaRef.current.value = initialContent;
    }
  }, [initialContent, updatePreview, updateStats]);

  // Sync content from textarea (handles typing, undo, redo, paste, etc.)
  const syncFromTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const newContent = textarea.value;
    contentRef.current = newContent;
    updateStats(newContent);
    updatePreview(newContent);
    onChange?.(newContent);
  }, [onChange, updatePreview, updateStats]);

  // Handle all input events (typing, undo, redo, paste, cut, execCommand)
  const handleInput = useCallback(() => {
    setIsTyping(true);
    syncFromTextarea();
    setTimeout(() => setIsTyping(false), 100);
  }, [syncFromTextarea]);

  // Sync scroll between textarea and preview
  const handleScroll = () => {
    if (previewRef.current && textareaRef.current) {
      const percentage = textareaRef.current.scrollTop / 
        (textareaRef.current.scrollHeight - textareaRef.current.clientHeight);
      previewRef.current.scrollTop = percentage * 
        (previewRef.current.scrollHeight - previewRef.current.clientHeight);
    }
  };

  // Insert markdown syntax at cursor position (supports native undo via Cmd+Z / Ctrl+Z)
  const insertMarkdown = (syntax: string, wrap: boolean = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.focus();

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);

    let insertText: string;
    let newCursorPos: number;

    if (wrap && selectedText) {
      insertText = syntax + selectedText + syntax;
      newCursorPos = start + insertText.length;
    } else {
      insertText = syntax;
      newCursorPos = start + syntax.length;
    }

    // Use execCommand to preserve native undo stack
    textarea.setSelectionRange(start, end);
    document.execCommand('insertText', false, insertText);

    // The 'input' event handler will sync state automatically
    // Just restore cursor position
    setTimeout(() => {
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          insertMarkdown('**', true);
          break;
        case 'i':
          e.preventDefault();
          insertMarkdown('*', true);
          break;
        case 'k':
          e.preventDefault();
          insertMarkdown('`', true);
          break;
      }
    }
  };

  return (
    <div className="markdown-editor">
      <div className="toolbar">
        <button onClick={() => insertMarkdown('# ', false)} title={t('toolbar.h1')}>H1</button>
        <button onClick={() => insertMarkdown('## ', false)} title={t('toolbar.h2')}>H2</button>
        <button onClick={() => insertMarkdown('### ', false)} title={t('toolbar.h3')}>H3</button>
        <div className="divider" />
        <button onClick={() => insertMarkdown('**', true)} title={t('toolbar.bold')}><strong>B</strong></button>
        <button onClick={() => insertMarkdown('*', true)} title={t('toolbar.italic')}><em>I</em></button>
        <button onClick={() => insertMarkdown('~~', true)} title={t('toolbar.strikethrough')}><s>S</s></button>
        <div className="divider" />
        <button onClick={() => insertMarkdown('- ', false)} title={t('toolbar.unorderedList')}>• List</button>
        <button onClick={() => insertMarkdown('1. ', false)} title={t('toolbar.orderedList')}>1. List</button>
        <button onClick={() => insertMarkdown('- [ ] ', false)} title={t('toolbar.taskList')}>☐ Task</button>
        <div className="divider" />
        <button onClick={() => insertMarkdown('> ', false)} title={t('toolbar.quote')}>" Quote</button>
        <button onClick={() => insertMarkdown('```\n\n```', false)} title={t('toolbar.codeBlock')}>{`{ }`}</button>
        <button onClick={() => insertMarkdown('$', true)} title={t('toolbar.inlineMath')}>∑</button>
        <button onClick={() => insertMarkdown('$$\n\n$$', false)} title={t('toolbar.blockMath')}>∫</button>
        <div className="divider" />
        <button onClick={() => insertMarkdown('[', false)} title={t('toolbar.link')}>🔗</button>
        <button onClick={() => insertMarkdown('![alt](url)', false)} title={t('toolbar.image')}>🖼️</button>
        <div className="divider" />
        <button onClick={() => insertMarkdown('---\n', false)} title={t('toolbar.hr')}>—</button>
        <button onClick={() => insertMarkdown('| Header | Header |\n|--------|--------|\n| Cell   | Cell   |', false)} title={t('toolbar.table')}>⊞</button>
      </div>
      
      <div className="editor-container">
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          defaultValue={initialContent}
          onInput={handleInput}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          placeholder={t('editor.placeholder')}
          spellCheck={false}
        />
        <div 
          ref={previewRef}
          className={`editor-preview ${isTyping ? 'typing' : ''}`}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
      
      <div className="status-bar">
        <span>{charCount} {t('status.chars')}</span>
        <span>{wordCount} {t('status.words')}</span>
        <span>{lineCount} {t('status.lines')}</span>
      </div>
    </div>
  );
}

export default MarkdownEditor;

