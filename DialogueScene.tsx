import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MessageCircle, 
  ChevronRight, 
  Lightbulb,
  Cpu,
  Briefcase,
  Play
} from 'lucide-react';

interface DialogueLine {
  speaker: 'Gor' | 'Gayane';
  text: string;
  translation: string;
  highlight?: string;
  icon?: React.ReactNode;
}

const DIALOGUE: DialogueLine[] = [
  { 
    speaker: 'Gor', 
    text: "¡Hola Gayane! ¿Cómo estás?", 
    translation: "Ողջույն Գայանե: Ինչպե՞ս ես:" 
  },
  { 
    speaker: 'Gayane', 
    text: "Hola Gor. No muy bien. Mi teléfono es viejo.", 
    translation: "Ողջույն Գոռ: Ոչ այնքան լավ: Հեռախոսս հին է:" 
  },
  { 
    speaker: 'Gor', 
    text: "¿Por qué? ¿El teléfono no funciona?", 
    translation: "Ինչո՞ւ: Հեռախոսը չի՞ աշխատում (ֆունկցիոնիրում):",
    highlight: "funciona",
    icon: <Cpu className="text-blue-500" size={20} />
  },
  { 
    speaker: 'Gayane', 
    text: "No, el teléfono no funciona hoy. ¿Me ayudas?", 
    translation: "Ոչ, հեռախոսը չի աշխատում այսօր: Կօգնե՞ս ինձ:",
    highlight: "funciona",
    icon: <Cpu className="text-blue-500" size={20} />
  },
  { 
    speaker: 'Gor', 
    text: "¡Sí! Yo te ayudo. Yo trabajo ahora.", 
    translation: "Այո: Ես կօգնեմ քեզ: Ես հիմա աշխատում եմ ('trabajar'):",
    highlight: "trabajo",
    icon: <Briefcase className="text-orange-500" size={20} />
  },
  { 
    speaker: 'Gayane', 
    text: "Gracias. Las personas trabajan.", 
    translation: "Շնորհակալություն: Մարդիկ աշխատում են ('trabajar'):",
    highlight: "trabajan",
    icon: <Briefcase className="text-orange-500" size={20} />
  },
  { 
    speaker: 'Gor', 
    text: "Y las máquinas funcionan. ¡Es fácil!", 
    translation: "Իսկ մեքենաները ֆունկցիոնիրում են ('funcionar'): Հեշտ է:",
    highlight: "funcionan",
    icon: <Cpu className="text-blue-500" size={20} />
  },
  { 
    speaker: 'Gayane', 
    text: "¡Perfecto! El español es muy divertido.", 
    translation: "Կատարյալ է: Իսպաներենը շատ զվարճալի է:" 
  }
];

const CharacterAvatar = ({ variant, isSpeaking }: { variant: 'Gor' | 'Gayane', isSpeaking: boolean }) => {
  const isGor = variant === 'Gor';
  return (
    <div className={`flex flex-col items-center gap-3 transition-transform duration-500 ${isSpeaking ? 'scale-110' : 'scale-90 opacity-40'}`}>
      <div className={`w-32 h-32 rounded-3xl border-8 ${isSpeaking ? 'border-slate-900 ring-4 ring-white shadow-2xl' : 'border-slate-200'} bg-white flex items-center justify-center relative overflow-hidden`}>
        <div className={`absolute inset-0 ${isGor ? 'bg-indigo-50' : 'bg-rose-50'}`} />
        <User size={80} className={isGor ? 'text-indigo-600' : 'text-rose-500'} strokeWidth={1} />
        {isSpeaking && (
           <motion.div 
             animate={{ scale: [1, 1.2, 1] }} 
             transition={{ repeat: Infinity, duration: 1.5 }}
             className="absolute top-2 right-2"
           >
              <MessageCircle size={24} className={isGor ? 'text-indigo-400' : 'text-rose-300'} />
           </motion.div>
        )}
      </div>
      <span className={`text-sm font-black uppercase tracking-widest px-4 py-1 rounded-full ${isGor ? 'bg-indigo-600 text-white' : 'bg-rose-500 text-white'}`}>
        {variant}
      </span>
    </div>
  );
};

export default function DialogueScene() {
  const [step, setStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentLine = DIALOGUE[step];

  const next = () => {
    if (step < DIALOGUE.length - 1) {
      setStep(s => s + 1);
    } else {
      setStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 p-4 md:p-8 flex flex-col items-center justify-center">
      
      {/* Header Info */}
      <div className="mb-12 text-center space-y-2">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="bg-slate-900 p-2 rounded-xl text-white">
             <Lightbulb size={24} />
          </div>
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Trabajar vs Funcionar</h1>
        </div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">¡Aprende con Gor y Gayane!</p>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border-b-[12px] border-slate-200 relative overflow-hidden">
        
        {/* Visual Tip */}
        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="flex items-center gap-4 bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <div className="bg-orange-500 p-3 rounded-xl text-white">
                 <Briefcase size={20} />
              </div>
              <div>
                 <p className="text-xs font-black uppercase text-orange-900">Trabajar</p>
                 <p className="text-[10px] text-orange-700">Personas (Մարդիկ)</p>
              </div>
           </div>
           <div className="flex items-center gap-4 bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <div className="bg-blue-600 p-3 rounded-xl text-white">
                 <Cpu size={20} />
              </div>
              <div>
                 <p className="text-xs font-black uppercase text-blue-900">Funcionar</p>
                 <p className="text-[10px] text-blue-700">Cosas/Máquinas (Իրեր/Մեքենաներ)</p>
              </div>
           </div>
        </div>

        {/* Stage */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
          <CharacterAvatar variant="Gor" isSpeaking={currentLine.speaker === 'Gor'} />
          <div className="hidden md:block text-slate-200">
             <ChevronRight size={48} strokeWidth={1} />
          </div>
          <CharacterAvatar variant="Gayane" isSpeaking={currentLine.speaker === 'Gayane'} />
        </div>

        {/* Dialogue Bubble */}
        <div className="relative">
           <AnimatePresence mode="wait">
             <motion.div 
               key={step}
               initial={{ opacity: 0, scale: 0.95, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: -10 }}
               className={`p-8 rounded-[2.5rem] shadow-xl border-4 min-h-[140px] flex flex-col justify-center relative
                 ${currentLine.speaker === 'Gor' ? 'border-indigo-100 bg-indigo-50' : 'border-rose-100 bg-rose-50'}
               `}
             >
                {/* Text Bubble Notch */}
                <div className={`absolute -top-4 w-8 h-8 rotate-45 border-t-4 border-l-4 
                  ${currentLine.speaker === 'Gor' ? 'left-12 bg-indigo-50 border-indigo-100' : 'right-12 bg-rose-50 border-rose-100'}
                `} />

                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl md:text-2xl font-black leading-tight">
                      {currentLine.text.split(' ').map((word, i) => (
                        <span key={i} className={word.toLowerCase().includes(currentLine.highlight || '___') ? 'text-indigo-600 underline decoration-slate-900/10' : ''}>
                          {word}{' '}
                        </span>
                      ))}
                    </h3>
                    {currentLine.icon && (
                      <div className="bg-white p-2 rounded-xl shadow-sm ring-1 ring-black/5">
                        {currentLine.icon}
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-bold text-slate-400 italic">
                    {currentLine.translation}
                  </p>
                </div>
             </motion.div>
           </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 mb-8 flex gap-1 justify-center">
           {DIALOGUE.map((_, i) => (
             <div key={i} className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-slate-900' : 'w-2 bg-slate-200'}`} />
           ))}
        </div>

        {/* Controls */}
        <button 
          onClick={next}
          className="w-full py-6 bg-slate-900 text-white rounded-[2rem] font-black uppercase text-lg shadow-xl hover:bg-slate-800 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
        >
          {step === DIALOGUE.length - 1 ? (
             <>REPETIR DIÁLOGO <ChevronRight className="group-hover:translate-x-1 transition-transform" /></>
          ) : (
             <>SIGUIENTE <ChevronRight className="group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>

      </div>

      <footer className="mt-8 text-[10px] font-black uppercase tracking-[1em] opacity-20 select-none">
        Aprendiendo con Gor y Gayane v1.0
      </footer>

    </div>
  );
}
