import { Link } from 'react-router-dom';
import BottomNav from '../components/layout/BottomNav';
import { userProfile } from '../data/mockData';

// DEF-005: replace all '#' stubs with real or nearest-available routes
const orderSteps = [
  { icon: 'payments',       label: 'To Pay',     count: userProfile.toPay,     to: '/checkout' },
  { icon: 'local_shipping', label: 'To Ship',    count: userProfile.toShip,    to: '/notifications' },
  { icon: 'inventory_2',    label: 'To Receive', count: userProfile.toReceive, to: '/notifications' },
  { icon: 'rate_review',    label: 'To Review',  count: userProfile.toReview,  to: '/notifications' },
];

const menuItems = [
  { icon: 'workspace_premium',    label: 'Shopee Rewards', desc: 'View your rewards & tier benefits', to: '/deals' },
  { icon: 'storefront',           label: 'My Shop',         desc: 'Manage your listings',              to: '/notifications' },
  { icon: 'account_balance_wallet', label: 'ShopeePay',    desc: userProfile.shopeePay + ' available', to: '/notifications' },
  { icon: 'monetization_on',      label: 'Shopee Coins',   desc: `${userProfile.coins.toLocaleString()} coins`, to: '/deals' },
  { icon: 'local_activity',       label: 'Vouchers',       desc: `${userProfile.voucherCount} vouchers available`, to: '/deals' },
  { icon: 'help',                 label: 'Help Centre',    desc: 'Get support',                       to: '/notifications' },
  { icon: 'settings',             label: 'Settings',       desc: '',                                  to: '/notifications' },
];

export default function MyProfileScreen() {
  return (
    <>
      <main className="pb-20 min-h-screen bg-[#F5F5F5]">
        {/* Gradient Header */}
        <section className="bg-gradient-to-b from-primary to-primary-container pt-safe">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <h1 className="text-h2 text-on-primary font-bold">My Profile</h1>
            <div className="flex gap-2">
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 active:opacity-70" aria-label="Chat">
                <span className="material-symbols-outlined text-white text-[20px]">chat</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 active:opacity-70" aria-label="Settings">
                <span className="material-symbols-outlined text-white text-[20px]">settings</span>
              </button>
            </div>
          </div>

          {/* Avatar + Info */}
          <div className="flex items-center gap-4 px-4 pb-4">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-16 h-16 rounded-full border-2 border-white object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-[14px]">edit</span>
              </div>
            </div>
            <div>
              <h2 className="text-h2 text-white font-bold">{userProfile.name}</h2>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-secondary-container text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                <span className="text-label-sm text-white/90">{userProfile.tier}</span>
              </div>
              <div className="flex gap-4 mt-1">
                <span className="text-caption text-white/80">
                  <strong className="text-white">{userProfile.followers}</strong> Followers
                </span>
                <span className="text-caption text-white/80">
                  <strong className="text-white">{userProfile.following}</strong> Following
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Wallet Bento */}
        <section className="mx-3 -mt-4 mb-4 bg-white rounded-xl shadow-sm p-4 grid grid-cols-3 gap-3">
          {[
            { icon: 'account_balance_wallet', label: 'ShopeePay', value: userProfile.shopeePay, color: 'text-primary' },
            { icon: 'credit_card', label: 'PayLater', value: userProfile.shopeePayLater, color: 'text-on-surface' },
            { icon: 'monetization_on', label: 'Coins', value: userProfile.coins.toLocaleString(), color: 'text-secondary' },
          ].map((item) => (
            <button key={item.label} aria-label={`${item.label}: ${item.value}`} className="flex flex-col items-center gap-1 active:opacity-70">
              <span className={`material-symbols-outlined ${item.color} text-[22px]`}>{item.icon}</span>
              <span className={`text-h3 font-bold ${item.color}`}>{item.value}</span>
              <span className="text-caption text-on-surface-variant">{item.label}</span>
            </button>
          ))}
        </section>

        {/* My Orders */}
        <section className="bg-white mb-2 px-3 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-h3 text-on-surface font-bold">My Orders</h2>
            <Link to="/notifications" className="text-primary text-label-sm flex items-center">
              See all <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>
          <div className="flex justify-around">
            {orderSteps.map((step) => (
              <Link key={step.label} to={step.to} className="flex flex-col items-center gap-1 active:opacity-70">
                <div className="relative">
                  <span className="material-symbols-outlined text-on-surface text-[26px]">{step.icon}</span>
                  {step.count > 0 && (
                    <span className="absolute -top-1 -right-2 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {step.count}
                    </span>
                  )}
                </div>
                <span className="text-caption text-on-surface-variant text-center">{step.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Menu Items */}
        <section className="bg-white mb-2">
          {menuItems.map((item, i) => (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-3 active:bg-surface-container-low ${i < menuItems.length - 1 ? 'border-b border-surface-container' : ''}`}
            >
              <span className="material-symbols-outlined text-on-surface-variant text-[22px]">{item.icon}</span>
              <div className="flex-1">
                <p className="text-body-md text-on-surface font-medium">{item.label}</p>
                {item.desc && <p className="text-caption text-on-surface-variant">{item.desc}</p>}
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>
            </Link>
          ))}
        </section>
      </main>

      <BottomNav />
    </>
  );
}
