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
  Camera,
  Gift,
  Scroll,
  MessageSquare,
  Settings,
  ClipboardList,
  SprayCan,
  Ghost
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Constants ---
type Tab = 'home' | 'game' | 'mypage';

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
    <TopBar />
    
    {/* Content Container: Tightly spaced flex column */}
    <div className="flex-1 flex flex-col pt-16 pb-2">
      {/* Alert Banner - Positioned 5px below top bar */}
      <div className="px-6 mt-[10px] mb-1">
        <motion.div 
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-brand-pink/90 backdrop-blur-sm px-5 py-1.5 rounded-full flex justify-center shadow-md mx-auto max-w-fit"
        >
          <span className="text-white text-[11px] font-medium">3일 동안 자리를 비웠더니...</span>
        </motion.div>
      </div>

      {/* Tree & Pig Interaction Area - Scaled up tree to 1.5x */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
        {/* Tree container with 1.5x scale */}
        <div className="relative z-0 flex items-end mb-8 pt-10">
          <TreeAsset scale={1.2} />
        </div>

        {/* Pig character at base - repositioned for 1.5x tree scale */}
        <div className="absolute bottom-[22%] left-1/2 -translate-x-[75px] z-20">
          <div className="relative">
            {/* Speech Bubble */}
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

        {/* Side Action Buttons - Scaled down */}
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

      {/* Bottom Status Panel - Compressed padding/margins */}
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
    className="flex-1 flex flex-col h-full overflow-hidden"
  >
    <TopBar />
    
    <div className="flex-1 pt-20 px-4 pb-2 flex flex-col">
      {/* In-page Heading */}
      <div className="mb-4 text-center">
        <h2 className="text-[18px] font-extrabold text-brand-pink mb-0.5">🎮 Pig.Fig. 게임</h2>
        <p className="text-brand-green text-[11px] font-bold">게임으로 아이템을 모아 돼지를 쫓아내세요!</p>
      </div>

      {/* Game Grid - Scaled to fit */}
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

      {/* Inventory Strip - Fixed height component */}
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
    <TopBar />
    
    <div className="flex-1 px-4 py-3 space-y-3 flex flex-col">
      {/* Profile Card - Scaled down */}
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

      {/* Menu List - Scaled down rows and icons */}
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
    {/* Bokeh Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-pink/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-beige/20 rounded-full blur-3xl"></div>
    </div>

    <TopBar />
    
    <div className="flex-1 flex flex-col items-center pt-24 px-6 z-10">
      {/* Step Indicator */}
      <div className="flex items-center gap-1.5 mb-6">
        <div className="w-2.5 h-2.5 bg-brand-pink rounded-full"></div>
        <span className="text-[11px] font-bold text-brand-pink tracking-tight">STEP 1/1</span>
      </div>

      <h1 className="text-2xl font-extrabold text-brand-pink mb-2 font-rounded">첫 가지치기를 해주세요!</h1>
      <p className="text-brand-green text-sm font-medium mb-12">꾹 눌러서 가지를 잘라보세요</p>

      {/* Branch Illustration with Interaction */}
      <div className="relative flex-1 w-full flex items-center justify-center">
        <div className="relative h-64 w-2">
          {/* Main Branch */}
          <div className="absolute inset-0 bg-brand-brown rounded-full shadow-sm"></div>
          
          {/* The Pruning Point */}
          <button 
            onClick={onComplete}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center cursor-pointer group"
          >
            {/* Glowing Pulse */}
            <div className="absolute inset-0 bg-brand-pink/30 rounded-full animate-ping"></div>
            <div className="absolute w-6 h-6 bg-brand-pink rounded-full shadow-lg group-hover:scale-110 transition-transform"></div>
            
            {/* Scissor Emoji floating */}
            <motion.div 
              animate={{ y: [0, -5, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute -top-10 text-3xl"
              style={{ left: '100px', transform: 'rotate(90deg)' }}
            >
              ✂️
            </motion.div>
          </button>
          
          {/* Decorative Leaves */}
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

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [hasPruned, setHasPruned] = useState(false);

  return (
    <div id="app-container" className="h-screen w-screen bg-brand-beige flex flex-col font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasPruned ? (
          <PruningScreen key="onboarding" onComplete={() => setHasPruned(true)} />
        ) : (
          <motion.div 
            key="main-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Main Content Area */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'home' && <HomeScreen key="home" />}
                {activeTab === 'game' && <GamesScreen key="game" />}
                {activeTab === 'mypage' && <MyPageScreen key="mypage" />}
              </AnimatePresence>
            </div>

            {/* Bottom Navigation */}
            <nav className="h-20 bg-white border-t border-gray-100 flex items-center justify-around px-2 z-[100] pb-2">
              <button 
                onClick={() => setActiveTab('home')}
                className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
              >
                <Home size={22} strokeWidth={2.5} className={activeTab === 'home' ? 'text-brand-green' : 'text-gray-300'} />
                <span className={`text-[10px] font-extrabold ${activeTab === 'home' ? 'text-brand-green' : 'text-gray-400'}`}>홈</span>
                <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${activeTab === 'home' ? 'opacity-100' : 'opacity-0'}`} />
              </button>
              
              <button 
                onClick={() => setActiveTab('game')}
                className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
              >
                <Gamepad2 size={24} strokeWidth={2.5} className={activeTab === 'game' ? 'text-brand-green' : 'text-gray-300'} />
                <span className={`text-[10px] font-extrabold ${activeTab === 'game' ? 'text-brand-green' : 'text-gray-400'}`}>게임</span>
                <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${activeTab === 'game' ? 'opacity-100' : 'opacity-0'}`} />
              </button>

              <button 
                onClick={() => setActiveTab('mypage')}
                className="flex flex-col items-center gap-1.5 flex-1 relative h-full justify-center"
              >
                <User size={22} strokeWidth={2.5} className={activeTab === 'mypage' ? 'text-brand-green' : 'text-gray-300'} />
                <span className={`text-[10px] font-extrabold ${activeTab === 'mypage' ? 'text-brand-green' : 'text-gray-400'}`}>마이페이지</span>
                <div className={`absolute top-0 w-8 h-0.5 bg-brand-green rounded-full transition-opacity ${activeTab === 'mypage' ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
