import LanguageIcon from "/images/Language.svg";
import { useState } from "react";

export function Language({ lang, setLang }) {
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'EN' },
        { code: 'jp', label: 'JP' },
        { code: 'id', label: 'ID' }
    ];

    return (
        <>
            <style>{`
                .language-toolbar {
                    background: linear-gradient(135deg, rgba(128,128,128,0.1), rgba(128,128,128,0));
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 45px;
                    border: 1px solid rgba(255,255,255,0.18);
                    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);
                    transition: height 0.3s ease-in-out;
                    overflow: hidden;
                }
                .active-lang {
                    color: rgba(253, 232, 255, 1);
                    text-decoration: underline;
                }
               
            `}</style>

            <div
                className="fixed z-50 top-6 right-6 w-16 language-toolbar flex flex-col items-center gap-6 justify-start pt-3"
                style={{ height: isOpen ? '230px' : '64px' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <img src={LanguageIcon} className="h-10 shrink-0 cursor-pointer" alt="Language Selector" />

                {isOpen && (
                    <div className="flex flex-col items-center gap-6">
                        {languages.map((l) => (
                            <div
                                key={l.code}
                                className={`text-xl font-bold cursor-pointer transition-all duration-200 hover:scale-[1.2] hover:text-[#FDE8FF] ${lang === l.code ? 'text-[#FDE8FF] underline' : 'text-white'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLang(l.code);
                                    setIsOpen(false);
                                }}
                            >
                                {l.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
