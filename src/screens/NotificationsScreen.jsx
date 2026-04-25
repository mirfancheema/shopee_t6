import { useState } from 'react';
import { Link } from 'react-router-dom';
import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';

const allNotifications = [
  {
    id: 'n01',
    type: 'order',
    icon: 'local_shipping',
    iconBg: 'bg-tertiary-container',
    iconColor: 'text-on-tertiary-container',
    title: 'Your order is on the way!',
    body: 'Order #SG2026041234 has been picked up and is en route to you. Estimated delivery: today by 8pm.',
    time: '2 min ago',
    unread: true,
    to: '/profile',
  },
  {
    id: 'n02',
    type: 'promo',
    icon: 'sell',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    title: 'Flash Sale starts in 1 hour!',
    body: 'Deals up to 90% off on Electronics, Fashion & more. Set a reminder now.',
    time: '15 min ago',
    unread: true,
    to: '/deals',
  },
  {
    id: 'n03',
    type: 'voucher',
    icon: 'local_activity',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-on-primary-fixed-variant',
    title: 'You have a new voucher!',
    body: '$10 off your next purchase with min. spend $50. Expires in 3 days.',
    time: '1 hr ago',
    unread: true,
    to: '/deals',
  },
  {
    id: 'n04',
    type: 'order',
    icon: 'check_circle',
    iconBg: 'bg-tertiary',
    iconColor: 'text-on-tertiary',
    title: 'Order delivered successfully',
    body: 'Order #SG2026040987 has been delivered. How was your experience? Leave a review.',
    time: 'Yesterday',
    unread: false,
    to: '/profile',
  },
  {
    id: 'n05',
    type: 'promo',
    icon: 'workspace_premium',
    iconBg: 'bg-secondary-fixed',
    iconColor: 'text-on-secondary-fixed-variant',
    title: "You're close to Gold tier!",
    body: 'Spend $38 more to unlock Gold Member benefits — exclusive deals, priority shipping & more.',
    time: 'Yesterday',
    unread: false,
    to: '/deals',
  },
  {
    id: 'n06',
    type: 'system',
    icon: 'verified_user',
    iconBg: 'bg-surface-container-high',
    iconColor: 'text-on-surface-variant',
    title: 'Authenticity guarantee activated',
    body: 'Your recent purchase of "Premium Noise Cancelling Headphones" is covered by Shopee\'s Authenticity Guarantee.',
    time: '2 days ago',
    unread: false,
    to: '/product/p01',
  },
  {
    id: 'n07',
    type: 'promo',
    icon: 'bolt',
    iconBg: 'bg-error-container',
    iconColor: 'text-on-error-container',
    title: 'Items in your cart are selling fast!',
    body: 'Only 3 left in stock: Aura Pro Noise Cancelling Earbuds. Complete your purchase before it\'s gone.',
    time: '3 days ago',
    unread: false,
    to: '/cart',
  },
];

const tabs = ['All', 'Orders', 'Promotions'];

export default function NotificationsScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const [readIds, setReadIds] = useState(new Set());

  const markRead = (id) => setReadIds(prev => new Set([...prev, id]));
  const markAllRead = () => setReadIds(new Set(allNotifications.map(n => n.id)));

  const filtered = allNotifications.filter(n => {
    if (activeTab === 'Orders')     return n.type === 'order';
    if (activeTab === 'Promotions') return n.type === 'promo' || n.type === 'voucher';
    return true;
  });

  const unreadCount = allNotifications.filter(n => n.unread && !readIds.has(n.id)).length;

  return (
    <>
      <header className="flex items-center justify-between px-4 h-14 w-full max-w-[430px] fixed top-0 z-50 bg-white shadow-sm border-b border-zinc-100 pt-safe">
        <h1 className="text-h2 text-on-surface font-bold">Notifications</h1>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-primary text-label-sm font-semibold active:opacity-70"
          >
            Mark all read
          </button>
        )}
      </header>

      <main className="pt-14 pb-20 min-h-screen bg-[#F5F5F5]">
        {/* Tabs */}
        <div className="flex bg-white border-b border-surface-container sticky top-14 z-30">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-label-sm font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3 px-6 text-center">
            <span className="material-symbols-outlined text-[48px] text-on-surface-variant">notifications_off</span>
            <p className="text-body-lg text-on-surface font-semibold">No notifications here</p>
            <p className="text-body-md text-on-surface-variant">Check back later for updates.</p>
          </div>
        ) : (
          <div className="bg-white mt-2">
            {filtered.map((n, i) => {
              const isUnread = n.unread && !readIds.has(n.id);
              return (
                <Link
                  key={n.id}
                  to={n.to}
                  onClick={() => markRead(n.id)}
                  className={`flex gap-3 px-4 py-3 active:bg-surface-container-low ${
                    i < filtered.length - 1 ? 'border-b border-surface-container' : ''
                  } ${isUnread ? 'bg-primary-fixed/30' : ''}`}
                >
                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${n.iconBg}`}>
                    <span
                      className={`material-symbols-outlined text-[22px] ${n.iconColor}`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {n.icon}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-body-md leading-tight ${isUnread ? 'font-semibold text-on-surface' : 'font-medium text-on-surface'}`}>
                        {n.title}
                      </p>
                      {isUnread && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-caption text-on-surface-variant mt-0.5 line-clamp-2 leading-relaxed">
                      {n.body}
                    </p>
                    <p className="text-caption text-outline mt-1">{n.time}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
