import { useState, useRef, useCallback } from "react";
import { MarkdownEditor } from "./components/MarkdownEditor";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { useI18n } from "./i18n/i18n";
import "./App.css";

function App() {
  const { t, locale, setLocale } = useI18n();
  const [content, setContent] = useState(t("welcome.content"));
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);
  const contentRef = useRef(content);

  // Update ref when content changes
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    contentRef.current = newContent;
    if (!isModified) {
      setIsModified(true);
    }
  }, [isModified]);

  // Open file
  const handleOpen = async () => {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          { name: "Markdown", extensions: ["md", "markdown", "mdown", "mkd"] },
          { name: "Text", extensions: ["txt"] },
          { name: "All Files", extensions: ["*"] },
        ],
      });

      if (selected && typeof selected === "string") {
        const fileContent = await readTextFile(selected);
        setContent(fileContent);
        contentRef.current = fileContent;
        setCurrentFile(selected);
        setIsModified(false);
      }
    } catch (error) {
      console.error("Error opening file:", error);
      alert(t("error.openFile") + error);
    }
  };

  // Save file
  const handleSave = async () => {
    try {
      if (currentFile) {
        await writeTextFile(currentFile, contentRef.current);
        setIsModified(false);
      } else {
        await handleSaveAs();
      }
    } catch (error) {
      console.error("Error saving file:", error);
      alert(t("error.saveFile") + error);
    }
  };

  // Save as new file
  const handleSaveAs = async () => {
    try {
      const filePath = await save({
        filters: [
          { name: "Markdown", extensions: ["md"] },
          { name: "Text", extensions: ["txt"] },
          { name: "All Files", extensions: ["*"] },
        ],
        defaultPath: "untitled.md",
      });

      if (filePath) {
        await writeTextFile(filePath, contentRef.current);
        setCurrentFile(filePath);
        setIsModified(false);
      }
    } catch (error) {
      console.error("Error saving file:", error);
      alert(t("error.saveFile") + error);
    }
  };

  // Create new file
  const handleNew = () => {
    if (isModified) {
      const confirm = window.confirm(t("confirm.unsavedChanges"));
      if (!confirm) return;
    }
    setContent("");
    contentRef.current = "";
    setCurrentFile(null);
    setIsModified(false);
  };

  // Get filename from path
  const getFileName = (path: string | null) => {
    if (!path) return t("untitled");
    const parts = path.split(/[/\\]/);
    return parts[parts.length - 1];
  };

  // Toggle language
  const toggleLocale = () => {
    setLocale(locale === "zh-CN" ? "en-US" : "zh-CN");
  };

  return (
    <div className="app">
      <div className="titlebar">
        <div className="titlebar-left">
          <span className="app-title">MdEditor</span>
          <span className="file-name">
            {getFileName(currentFile)}
            {isModified && " *"}
          </span>
        </div>
        <div className="titlebar-menu">
          <div className="menu-item">
            <span>{t("menu.file")}</span>
            <div className="menu-dropdown">
              <button onClick={handleNew}>{t("menu.new")}</button>
              <button onClick={handleOpen}>{t("menu.open")}</button>
              <div className="menu-divider" />
              <button onClick={handleSave}>{t("menu.save")}</button>
              <button onClick={handleSaveAs}>{t("menu.saveAs")}</button>
            </div>
          </div>
          <div className="menu-item">
            <span>{t("menu.help")}</span>
            <div className="menu-dropdown">
              <button onClick={() => setContent(t("welcome.content"))}>{t("menu.welcome")}</button>
              <div className="menu-divider" />
              <button onClick={() => alert(t("about.message"))}>
                {t("menu.about")}
              </button>
            </div>
          </div>
        </div>
        <div className="titlebar-right">
          <button className="locale-toggle" onClick={toggleLocale} title="Switch Language">
            🌐 {locale === "zh-CN" ? "中" : "EN"}
          </button>
          <span className="save-status">{isModified ? t("status.unsaved") : t("status.saved")}</span>
        </div>
      </div>
      
      <MarkdownEditor 
        initialContent={content} 
        onChange={handleContentChange}
      />
    </div>
  );
}

export default App;
