import React, { useState } from 'react';
import { 
  Bell, 
  Home, 
  Gamepad2, 
  User, 
  Droplets, 
  Leaf, 
  Sun,
  PiggyBank,
  ChevronRight,
  Bug,
  Clock,
  SprayCan,
  Ghost,
  Camera,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
type Tab = 'home' | 'game' | 'mypage';
type Role = 'none' | 'adopter' | 'caregiver';

// --- Shared Components ---

const TreeAsset = ({ scale = 1 }: { scale?: number }) => (
  <div style={{ transform: `scale(${scale})` }} className="relative flex flex-col items-center justify-end">
    {/* Canopy: 3 stacked circles */}
    <div className="relative mb-[-20px] z-10">
      <div className="w-24 h-24 bg-brand-dark-green rounded-full shadow-sm"></div>
      <div className="w-28 h-28 bg-brand-dark-green rounded-full shadow-sm absolute -bottom-10 -left-10"></div>
      <div className="w-28 h-28 bg-brand-dark-green rounded-full shadow-sm absolute -bottom-10 -right-10"></div>
    </div>
    {/* Trunk */}
    <div className="w-8 h-44 bg-brand-brown rounded-t-lg"></div>
  </div>
);

const PigAsset = ({ size = 'md' }: { size?: 'sm' | 'md' }) => {
  const dimensions = size === 'sm' ? 'w-12 h-10' : 'w-16 h-14';
  return (
    <motion.div 
      className={`relative ${dimensions}`}
      animate={{ rotate: [3, -3, 3] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Body */}
      <div className="w-full h-full bg-brand-pink rounded-full relative shadow-sm border border-brand-pink/50">
        {/* Ears */}
        <div className="absolute -top-1 left-2 w-4 h-4 bg-brand-pink rounded-full"></div>
        <div className="absolute -top-1 right-2 w-4 h-4 bg-brand-pink rounded-full"></div>
        
        {/* Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-slate-800 rounded-full"></div>
          </div>
          {/* Snout */}
          <div className="w-5 h-3 bg-white/40 rounded-full flex items-center justify-center gap-1">
            <div className="w-0.5 h-1 bg-brand-pink rounded-full"></div>
            <div className="w-0.5 h-1 bg-brand-pink rounded-full"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TopBar = () => (
  <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-50">
    <div className="flex items-center gap-2">
      <div className="bg-brand-pink p-1 rounded-lg">
        <PiggyBank size={18} className="text-white" fill="white" />
      </div>
      <span className="text-xl font-bold font-rounded text-brand-pink">Pig.Fig.</span>
    </div>
    <div className="relative">
      <Bell size={24} className="text-brand-pink" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
    </div>
  </header>
);

// --- Screen Components ---

const HomeScreen = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-full flex flex-col relative overflow-hidden"
  >
    <div className="flex-1 flex flex-col pt-16 pb-2">
      <div className="px-6 mt-[10px] mb-1">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-brand-pink/90 backdrop-blur-sm px-5 py-1.5 rounded-full flex justify-center shadow-md mx-auto max-w-fit"
        >
          <span className="text-white text-[11px] font-medium">3일 동안 자리를 비웠더니...</span>
        </motion.div>
      </div>

      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
        <div className="relative z-0 flex items-end mb-8 pt-10">
          <TreeAsset scale={1.2} />
        </div>

        <div className="absolute bottom-[22%] left-1/2 -translate-x-[75px] z-20">
          <div className="relative">
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute -top-10 -right-2 bg-white px-3 py-1 rounded-xl rounded-bl-none shadow-sm border border-gray-100 whitespace-nowrap"
            >
              <span className="text-[10px] font-bold text-gray-800">꿀꿀~ 내가 왔다!</span>
            </motion.div>
            <PigAsset size="sm" />
          </div>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {[
            { icon: <Droplets className="text-blue-400" />, label: '물주기' },
            { icon: <Leaf className="text-brand-green" />, label: '영양제' },
            { icon: <Sun className="text-yellow-500" />, label: '햇빛' }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-0.5"
            >
              <button className="w-10 h-10 bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center">
                {React.cloneElement(item.icon as React.ReactElement, { size: 18 })}
              </button>
              <span className="text-[9px] font-medium text-gray-500">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="px-5 mb-2">
        <div className="bg-white/70 backdrop-blur-md p-3.5 rounded-[2rem] border border-white shadow-lg">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="text-sm font-bold text-gray-800">나의 무화과</span>
            <span className="text-sm">🌱</span>
          </div>
          
          <div className="relative">
            <div className="h-3 bg-gray-200/50 rounded-full overflow-hidden border border-gray-100">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                className="h-full bg-brand-green"
              />
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-[9px] font-bold text-gray-400">3/5단계</span>
            </div>
          </div>
          
          <p className="text-center text-[9px] text-gray-400 font-medium">마지막 케어: 오늘</p>
        </div>
      </div>
    </div>
  </motion.div>
);

interface GameCardProps {
  title: string;
  subtitle: string;
  badge: { text: string, color: string };
  icon: React.ReactNode;
  borderColor: string;
}

const GameCard = ({ title, subtitle, badge, icon, borderColor }: GameCardProps) => (
  <div className={`bg-white rounded-2xl p-3 flex flex-col items-center text-center shadow-sm border ${borderColor} h-full`}>
    <div className="h-12 flex items-center justify-center mb-1">
      {icon}
    </div>
    <h3 className="text-[12px] font-extrabold text-slate-800 mb-0.5">{title}</h3>
    <p className="text-[10px] text-gray-400 leading-tight mb-2 px-1 line-clamp-2">{subtitle}</p>
    <div className="mt-auto w-full flex justify-end">
      <span className={`text-[9px] px-1.5 py-0.5 rounded-full text-white font-medium ${badge.color}`}>
        {badge.text}
      </span>
    </div>
  </div>
);

const GamesScreen = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex-1 flex flex-col h-full overflow-hidden pt-16"
  >
    <div className="flex-1 px-4 pb-2 flex flex-col">
      <div className="mb-4 text-center">
        <h2 className="text-[18px] font-extrabold text-brand-pink mb-0.5">🎮 Pig.Fig. 게임</h2>
        <p className="text-brand-green text-[11px] font-bold">게임으로 아이템을 모아 돼지를 쫓아내세요!</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4 shrink min-h-0">
        <GameCard 
          title="돼지 풍선 터뜨리기"
          subtitle="풍선을 터뜨려 아이템 획득!"
          badge={{ text: '쉬움', color: 'bg-brand-green' }}
          icon={<div className="scale-100"><PigAsset size="sm" /></div>}
          borderColor="border-brand-pink/30"
        />
        <GameCard 
          title="무화과 퀴즈"
          subtitle="무화과 상식 퀴즈 도전!"
          badge={{ text: '보통', color: 'bg-[#A8C87A]' }}
          icon={<div className="relative"><Leaf className="text-brand-green" size={32} /><span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">?</span></div>}
          borderColor="border-brand-green/30"
        />
        <GameCard 
          title="해충 잡기"
          subtitle="해충을 빠르게 잡아라!"
          badge={{ text: '보통', color: 'bg-[#A8C87A]' }}
          icon={<Bug className="text-brand-brown" size={36} />}
          borderColor="border-brand-pink/30"
        />
        <GameCard 
          title="물주기 타이밍"
          subtitle="정확한 타이밍에 물을 주세요!"
          badge={{ text: '어려움', color: 'bg-brand-pink' }}
          icon={<div className="relative"><Droplets className="text-blue-400" size={36} /><Clock className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80" size={16} /></div>}
          borderColor="border-brand-green/30"
        />
      </div>

      <div className="bg-white rounded-2xl p-3 flex items-center justify-between shadow-sm border border-gray-100 mb-2">
        <span className="text-[11px] font-bold text-brand-green">보유 아이템</span>
        <div className="flex items-center gap-4">
          {[
            { icon: <SprayCan size={18} className="text-brand-pink" />, count: 2 },
            { icon: <Ghost size={18} className="text-brand-brown" />, count: 1 },
            { icon: <Leaf size={18} className="text-brand-green" />, count: 3 }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center font-rounded">
                {item.icon}
              </div>
              <div className="absolute -top-1 -right-1 bg-brand-pink text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const MyPageScreen = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex-1 flex flex-col pt-16 h-full overflow-hidden"
  >
    <div className="flex-1 px-4 py-3 space-y-3 flex flex-col">
      <div className="bg-white rounded-3xl p-3 flex flex-col items-center shadow-sm border border-gray-100">
        <div className="w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center shadow-inner mb-2">
          <User size={24} className="text-white opacity-90" />
        </div>
        <h2 className="text-sm font-extrabold text-slate-800 mb-1">김입양</h2>
        <div className="bg-[#E8F5E3] px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="text-brand-green text-[10px] font-bold">입양 중: 1그루</span>
          <span className="text-[10px]">🌱</span>
        </div>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 shrink min-h-0">
        {[
          { icon: '📸', label: '성장 타임라인', color: 'bg-brand-pink' },
          { icon: '🎁', label: '수령 / 기부 선택', color: 'bg-brand-green' },
          { icon: '📜', label: '기부 인증서', color: 'bg-brand-pink' },
          { icon: '🤖', label: 'AI 챗봇 (무화과 Q&A)', color: 'bg-brand-green' },
          { icon: '🔔', label: '알림 설정', color: 'bg-brand-pink' },
          { icon: '📋', label: '입양 내역', color: 'bg-brand-green' }
        ].map((item, i, arr) => (
          <div 
            key={i} 
            className={`flex items-center px-4 h-11 active:bg-gray-50 transition-colors cursor-pointer ${i !== arr.length - 1 ? 'border-b border-[#F0F0F0]' : ''}`}
          >
            <div className={`w-7 h-7 ${item.color} rounded-full flex items-center justify-center text-sm`}>
              {item.icon}
            </div>
            <span className="flex-1 ml-3 text-[13px] font-bold text-slate-700">{item.label}</span>
            <ChevronRight size={16} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const PruningScreen = ({ onComplete }: { onComplete: () => void; key?: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-screen w-screen bg-white relative flex flex-col font-sans overflow-hidden"
  >
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-beige/20 rounded-full blur-3xl"></div>
    </div>

    <TopBar />
    
    <div className="flex-1 flex flex-col items-center pt-24 px-6 z-10">
      <div className="flex items-center gap-1.5 mb-6">
        <div className="w-2.5 h-2.5 bg-brand-pink rounded-full"></div>
        <span className="text-[11px] font-bold text-brand-pink tracking-tight">STEP 1/1</span>
      </div>

      <h1 className="text-2xl font-extrabold text-brand-pink mb-2 font-rounded">첫 가지치기를 해주세요!</h1>
      <p className="text-brand-green text-sm font-medium mb-12">꾹 눌러서 가지를 잘라보세요</p>

      <div className="relative flex-1 w-full flex items-center justify-center">
        <div className="relative h-64 w-2">
          <div className="absolute inset-0 bg-brand-brown rounded-full shadow-sm"></div>
          <button 
            onClick={onComplete}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center cursor-pointer group"
          >
            <div className="absolute inset-0 bg-brand-pink/30 rounded-full animate-ping"></div>
            <div className="absolute w-6 h-6 bg-brand-pink rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
            
            <motion.div 
              animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-10 text-3xl"
              style={{ left: '100px', transform: 'rotate(90deg)' }}
            >
              ✂️
            </motion.div>
          </button>
          <div className="absolute -left-7 top-16 rotate-[-90deg] scale-110">🌱</div>
          <div className="absolute -right-7 bottom-16 rotate-[90deg] scale-110">🌱</div>
        </div>
      </div>

      <div className="pb-16">
        <p className="text-gray-400 text-xs font-medium text-center">처음 한 번만 하는 특별한 인터랙션이에요 🌿</p>
      </div>
    </div>
  </motion.div>
);

const RoleSelectionScreen = ({ onSelect }: { onSelect: (role: 'adopter' | 'caregiver') => void; key?: string }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="h-screen w-screen bg-brand-beige relative flex flex-col font-sans overflow-hidden"
  >
    <TopBar />
    
    <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16">
      <div className="flex flex-col items-center mb-10">
        <div className="relative w-20 h-20 mb-5">
          <div className="w-full h-full bg-brand-pink rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <PigAsset size="md" />
            <div className="absolute -top-1 -right-1">
              <Leaf size={24} className="text-brand-green fill-brand-green" />
            </div>
          </div>
        </div>
        <h1 className="text-[22px] font-extrabold text-slate-800 mb-2 font-rounded">어떤 역할로 시작할까요?</h1>
        <p className="text-gray-500 text-[13px]">나에게 맞는 역할을 선택해주세요</p>
      </div>

      <div className="w-full space-y-4 max-w-sm">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('adopter')}
          className="w-full bg-white rounded-[24px] p-6 flex flex-col text-left shadow-sm border-l-[4px] border-brand-pink relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-brand-pink/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🌱</span>
          </div>
          <h2 className="text-lg font-bold text-brand-pink mb-1">입양자</h2>
          <p className="text-gray-400 text-[12px] mb-4">무화과를 입양하고 성장을 지켜봐요</p>
          <div className="self-end text-brand-pink text-[12px] font-bold">시작하기 →</div>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('caregiver')}
          className="w-full bg-white rounded-[24px] p-6 flex flex-col text-left shadow-sm border-l-[4px] border-brand-green relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">👨‍🌾</span>
          </div>
          <h2 className="text-lg font-bold text-brand-green mb-1">재배자</h2>
          <p className="text-gray-400 text-[12px] mb-4">무화과를 직접 키우고 돌봐요</p>
          <div className="self-end text-brand-green text-[12px] font-bold">시작하기 →</div>
        </motion.button>
      </div>

      <div className="mt-12 flex flex-col items-center gap-1 opacity-60">
        <p className="text-gray-500 text-[11px]">역할은 나중에 변경할 수 없어요</p>
        <span className="text-gray-400 text-[10px]">v1.0.0</span>
      </div>
    </div>
  </motion.div>
);

const CaregiverAnalysisScreen = ({ onBack }: { onBack: () => void; key?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="h-full flex flex-col pt-20 pb-2 overflow-hidden"
  >
    <div className="px-5 mb-2 flex items-center justify-between">
      <div>
        <h2 className="text-[15px] font-extrabold text-slate-800 tracking-tight">🔬 묘목 상태 분석</h2>
        <p className="text-brand-green text-[11px] font-medium leading-tight">AI가 묘목 상태를 자동으로 분석해요</p>
      </div>
      <button onClick={onBack} className="text-gray-400 text-[10px] font-bold">닫기</button>
    </div>

    <div className="flex-1 px-4 space-y-2 overflow-hidden flex flex-col">
      {/* Analyzed Photo Display */}
      <div className="bg-white rounded-2xl h-24 relative flex items-center justify-center overflow-hidden border border-gray-100 shadow-sm mx-1">
        <div className="opacity-60 scale-50 pt-4">
          <TreeAsset scale={0.6} />
        </div>
        {/* Scan Line Animation */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-0.5 bg-brand-green/30 shadow-[0_0_10px_rgba(125,200,122,0.5)] z-20"
        />
        <div className="absolute top-2 right-2 bg-brand-green text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
          분석 완료 ✓
        </div>
        <div className="absolute bottom-2 left-2 flex items-center gap-1 opacity-60">
          <div className="w-3.5 h-3.5 bg-orange-400 rounded-sm flex items-center justify-center text-[8px] text-white font-black italic">TF</div>
          <span className="text-gray-500 text-[8px] font-bold">TensorFlow</span>
        </div>
      </div>

      {/* Status Tags Section */}
      <div className="space-y-1.5">
        <h3 className="text-[12px] font-bold text-slate-800 ml-1">분석 결과</h3>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="bg-white border border-brand-green/30 text-brand-green text-[10px] font-bold px-2 py-1.5 rounded-xl flex items-center gap-1 opacity-50">
             ✓ 정상
          </div>
          <div className="bg-white border border-brand-pink/30 text-brand-pink text-[10px] font-bold px-2 py-1.5 rounded-xl flex items-center gap-1 opacity-50">
             ✓ 수분부족
          </div>
          <div className="bg-white border border-brand-pink/30 text-brand-pink text-[10px] font-bold px-2 py-1.5 rounded-xl flex items-center gap-1 opacity-50">
             ✓ 과습
          </div>
          <div className="bg-brand-pink text-white text-[10px] font-bold px-2 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
             ⚠ 조명이상
          </div>
        </div>
      </div>

      {/* AI Report Card */}
      <div className="bg-[#FFF5F7] rounded-2xl p-3 border border-brand-pink/10 border-l-[4px] border-l-brand-pink mx-1 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="space-y-1.5 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="text-xs">✨</div>
              <span className="text-[12px] font-extrabold text-slate-800">AI 분석 리포트</span>
            </div>
            <span className="text-gray-400 text-[8px]">2026.05.08 10:23</span>
          </div>
          
          <div className="h-[1px] bg-[#FFE0E6] w-full" />

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-[10px] font-bold">감지된 이상</span>
            <div className="bg-brand-pink text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">
              ⚠ 조명이상
            </div>
          </div>

          <div className="overflow-hidden">
            <h4 className="text-brand-pink font-bold text-[11px] leading-tight">조명이상이 감지되었습니다.</h4>
          </div>

          <div className="space-y-1">
            <h5 className="text-brand-green font-bold text-[11px]">권장 조치</h5>
            <div className="space-y-1">
              {[
                "보광등 위치 30cm 조정",
                "조도: 2000~3000 lux",
                "재촬영 후 업로드"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-green/20 flex items-center justify-center mt-0.5 shrink-0">
                    <div className="w-1 h-1 bg-brand-green rounded-full"></div>
                  </div>
                  <span className="text-gray-500 text-[10px] leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-end gap-1 opacity-60">
          <span className="text-gray-400 text-[8px] italic font-serif">powered by Gemini</span>
          <div className="text-[8px]">✨</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const CaregiverDashboard = ({ onSelectSeedling }: { onSelectSeedling: (id: string) => void }) => (
  <div className="h-full flex flex-col pt-20 pb-2 overflow-hidden">
    {/* Summary Stat Cards Row */}
    <div className="grid grid-cols-3 gap-2 px-4 mb-3">
      {[
        { value: "12", label: "담당 묘목", color: "text-brand-green" },
        { value: "3", label: "완성 임박", color: "text-brand-pink" },
        { value: "1", label: "이상 감지", color: "text-orange-400" }
      ].map((stat, i) => (
        <div key={i} className="bg-white rounded-2xl p-2 flex flex-col items-center justify-center shadow-sm border border-gray-50">
          <span className={`text-[16px] font-extrabold ${stat.color}`}>{stat.value}</span>
          <span className="text-gray-400 text-[9px] whitespace-nowrap">{stat.label}</span>
        </div>
      ))}
    </div>

    {/* Seedling List Header */}
    <div className="px-4 mb-2">
      <h2 className="text-[13px] font-extrabold text-slate-800">담당 묘목 목록</h2>
    </div>

    {/* Seedling List */}
    <div className="flex-1 px-4 space-y-1.5 overflow-hidden flex flex-col">
      {[
        { id: "#001", adopter: "김입양", step: "3/5", status: "정상", statusColor: "bg-brand-green" },
        { id: "#002", adopter: "이돌봄", step: "4/5", status: "정상", statusColor: "bg-brand-green" },
        { id: "#003", adopter: "박관리", step: "2/5", status: "주의", statusColor: "bg-brand-pink" }
      ].map((seedling, i) => (
        <button 
          key={i} 
          onClick={() => onSelectSeedling(seedling.id)}
          className="bg-white rounded-2xl p-2.5 flex items-center gap-2.5 shadow-sm border border-gray-50 text-left active:bg-gray-50 transition-colors"
        >
          <div className="w-9 h-9 bg-brand-green/20 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
            <div className="scale-40 translate-y-2">
              <TreeAsset scale={0.4} />
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-[12px] font-bold text-slate-800 truncate">무화과 {seedling.id}</h3>
              <div className={`${seedling.statusColor} text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold ml-auto`}>
                {seedling.status}
              </div>
            </div>
            <p className="text-gray-400 text-[9px] mb-1">입양자: {seedling.adopter}</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand-green w-3/5"></div>
              </div>
              <span className="text-[9px] font-bold text-brand-green shrink-0">{seedling.step}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const CaregiverCheckScreen = () => (
  <div className="h-full flex flex-col pt-20 pb-2 overflow-hidden">
    <div className="px-5 mb-2">
      <h2 className="text-[15px] font-extrabold text-slate-800">🌡 환경 점검</h2>
      <p className="text-brand-green text-[11px] font-medium leading-tight">재배지 방문 시 수치를 입력해주세요</p>
    </div>

    <div className="flex-1 px-4 space-y-1.5 overflow-hidden flex flex-col mb-2">
      {[
        { 
          label: "온도", 
          value: "16°C", 
          status: "정상", 
          bgColor: "bg-orange-50", 
          icon: <Sun className="text-orange-400" size={18} />, 
          statusColor: "bg-brand-green" 
        },
        { 
          label: "습도", 
          value: "82%", 
          status: "주의", 
          bgColor: "bg-blue-50", 
          icon: <Droplets className="text-blue-400" size={18} />, 
          statusColor: "bg-brand-pink" 
        },
        { 
          label: "조도", 
          value: "낮음", 
          status: "주의", 
          bgColor: "bg-yellow-50", 
          icon: <Sun className="text-yellow-400" size={18} />, 
          statusColor: "bg-brand-pink" 
        }
      ].map((item, i) => (
        <div key={i} className="bg-white rounded-2xl p-2.5 flex items-center shadow-sm border border-gray-50">
          <div className={`w-8 h-8 ${item.bgColor} rounded-full flex items-center justify-center mr-2.5`}>
            {item.icon}
          </div>
          <div className="flex-1">
            <span className="text-gray-400 text-[10px] font-bold">{item.label}</span>
            <div className="text-[16px] font-extrabold text-slate-800 leading-none">{item.value}</div>
          </div>
          <div className={`${item.statusColor} text-white text-[9px] px-2 py-0.5 rounded-full font-bold`}>
            {item.status}
          </div>
        </div>
      ))}

      {/* AI Diagnosis Result Card */}
      <div className="bg-[#FFF5F7] rounded-2xl p-3 border border-brand-pink/10 border-l-[4px] border-l-brand-pink mt-1">
        <div className="flex items-center gap-1 mb-1.5">
          <div className="text-sm">✨</div>
          <span className="text-[12px] font-bold text-slate-800">Gemini 진단 결과</span>
        </div>
        <p className="text-gray-500 text-[11px] leading-relaxed">
          조도가 기준치 이하입니다. LED 보광등을 켜주세요.<br />
          현재 습도도 높아 통풍을 권장합니다.
        </p>
      </div>
    </div>

    <div className="px-4 mb-1">
      <button className="w-full bg-brand-green py-3 rounded-2xl text-white font-bold text-[14px] shadow-md active:scale-[0.98] transition-transform">
        조치 완료
      </button>
    </div>
  </div>
);

const CaregiverLogScreen = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="h-full flex flex-col pt-20 pb-2 overflow-hidden"
  >
    <div className="px-5 mb-2">
      <h2 className="text-[15px] font-extrabold text-slate-800">📋 오늘의 일지</h2>
      <p className="text-brand-green text-[11px] font-medium">입양자에게 성장 기록을 전달해요</p>
    </div>

    <div className="flex-1 px-4 space-y-2 overflow-hidden pb-2 flex flex-col overflow-y-hidden">
      {/* Photo Upload Area */}
      <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm">
        <div className="border-2 border-dashed border-gray-100 rounded-xl h-24 flex flex-col items-center justify-center gap-1 cursor-pointer active:bg-gray-50 transition-colors">
          <Camera size={24} className="text-brand-green" />
          <div className="flex flex-col items-center">
            <span className="text-[12px] font-bold text-brand-green">사진 추가하기</span>
            <span className="text-gray-400 text-[10px]">묘목 상태를 찍어 업로드해주세요</span>
          </div>
        </div>
      </div>

      {/* Growth Stage Selector */}
      <div className="space-y-1.5">
        <h3 className="text-[12px] font-bold text-slate-800 ml-1">성장 단계</h3>
        <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          {['새싹', '잎 성장 중', '가지 발달', '묘목 완성'].map((stage) => (
            <button 
              key={stage}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-colors ${
                stage === '잎 성장 중' 
                ? 'bg-brand-green text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-gray-400'
              }`}
            >
              {stage}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input Area */}
      <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex-1 min-h-[80px] relative overflow-hidden">
        <textarea 
          className="w-full h-full text-[12px] text-slate-700 bg-transparent resize-none outline-none italic placeholder:text-gray-300"
          placeholder="오늘의 성장 기록을 남겨주세요..."
        />
      </div>

      <button className="w-full bg-brand-pink py-3 rounded-2xl text-white font-bold text-[14px] shadow-md active:scale-[0.98] transition-transform">
        입양자에게 전달하기
      </button>
    </div>
  </motion.div>
);

const CaregiverHomeScreen = () => {
  const [caregiverTab, setCaregiverTab] = useState('home');
  const [viewingSeedlingId, setViewingSeedlingId] = useState<string | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col h-full overflow-hidden"
    >
      <AnimatePresence mode="wait">
        {caregiverTab === 'home' ? (
          viewingSeedlingId ? (
            <CaregiverAnalysisScreen 
              key="analysis" 
              onBack={() => setViewingSeedlingId(null)} 
            />
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <CaregiverDashboard onSelectSeedling={setViewingSeedlingId} />
            </motion.div>
          )
        ) : caregiverTab === 'check' ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <CaregiverCheckScreen />
          </motion.div>
        ) : (
          <CaregiverLogScreen key="log" />
        )}
      </AnimatePresence>

      {/* Caregiver Navigation Bar */}
      <nav className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-[100] pb-2">
        <button 
          onClick={() => setCaregiverTab('home')}
          className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
        >
          <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${caregiverTab === 'home' ? 'opacity-100' : 'opacity-0'}`} />
          <Home size={22} strokeWidth={2.5} className={caregiverTab === 'home' ? 'text-brand-green' : 'text-gray-300'} />
          <span className={`text-[10px] font-extrabold ${caregiverTab === 'home' ? 'text-brand-green' : 'text-gray-400'}`}>홈</span>
        </button>
        
        <button 
          onClick={() => setCaregiverTab('log')}
          className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
        >
          <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${caregiverTab === 'log' ? 'opacity-100' : 'opacity-0'}`} />
          <span className={`text-2xl ${caregiverTab === 'log' ? 'grayscale-0' : 'grayscale opacity-50'}`}>📋</span>
          <span className={`text-[10px] font-extrabold ${caregiverTab === 'log' ? 'text-brand-green' : 'text-gray-400'}`}>일지</span>
        </button>

        <button 
          onClick={() => setCaregiverTab('check')}
          className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
        >
          <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${caregiverTab === 'check' ? 'opacity-100' : 'opacity-0'}`} />
          <span className={`text-2xl ${caregiverTab === 'check' ? 'grayscale-0' : 'grayscale opacity-50'}`}>🌡️</span>
          <span className={`text-[10px] font-extrabold ${caregiverTab === 'check' ? 'text-brand-green' : 'text-gray-400'}`}>환경점검</span>
        </button>
      </nav>
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [hasPruned, setHasPruned] = useState(false);
  const [role, setRole] = useState<Role>('none');

  return (
    <div id="app-container" className="h-screen w-screen bg-brand-beige flex flex-col font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {role === 'none' && (
          <RoleSelectionScreen key="role-select" onSelect={setRole} />
        )}
        
        {role === 'adopter' && !hasPruned && (
          <PruningScreen key="pruning" onComplete={() => setHasPruned(true)} />
        )}

        {role === 'adopter' && hasPruned && (
          <motion.div 
            key="adopter-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TopBar />
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'home' && <HomeScreen key="home" />}
                {activeTab === 'game' && <GamesScreen key="game" />}
                {activeTab === 'mypage' && <MyPageScreen key="mypage" />}
              </AnimatePresence>
            </div>

            <nav className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-[100] pb-2">
              <button 
                onClick={() => setActiveTab('home')}
                className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
              >
                <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${activeTab === 'home' ? 'opacity-100' : 'opacity-0'}`} />
                <Home size={22} strokeWidth={2.5} className={activeTab === 'home' ? 'text-brand-green' : 'text-gray-300'} />
                <span className={`text-[10px] font-extrabold ${activeTab === 'home' ? 'text-brand-green' : 'text-gray-400'}`}>홈</span>
              </button>
              
              <button 
                onClick={() => setActiveTab('game')}
                className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
              >
                <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${activeTab === 'game' ? 'opacity-100' : 'opacity-0'}`} />
                <Gamepad2 size={24} strokeWidth={2.5} className={activeTab === 'game' ? 'text-brand-green' : 'text-gray-300'} />
                <span className={`text-[10px] font-extrabold ${activeTab === 'game' ? 'text-brand-green' : 'text-gray-400'}`}>게임</span>
              </button>

              <button 
                onClick={() => setActiveTab('mypage')}
                className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
              >
                <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${activeTab === 'mypage' ? 'opacity-100' : 'opacity-0'}`} />
                <User size={22} strokeWidth={2.5} className={activeTab === 'mypage' ? 'text-brand-green' : 'text-gray-300'} />
                <span className={`text-[10px] font-extrabold ${activeTab === 'mypage' ? 'text-brand-green' : 'text-gray-400'}`}>마이페이지</span>
              </button>
            </nav>
          </motion.div>
        )}

        {role === 'caregiver' && (
          <motion.div 
            key="caregiver-main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            <TopBar />
            <CaregiverHomeScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
