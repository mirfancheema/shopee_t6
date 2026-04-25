import TopAppBar from '../components/layout/TopAppBar';
import BottomNav from '../components/layout/BottomNav';

export default function NotificationsScreen() {
  return (
    <>
      <TopAppBar variant="back" title="Notifications" />
      <main className="pt-14 pb-20 min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center gap-3 px-6 text-center">
        <span className="material-symbols-outlined text-[56px] text-on-surface-variant">notifications_off</span>
        <h2 className="text-h2 text-on-surface font-bold">No notifications</h2>
        <p className="text-body-md text-on-surface-variant">You're all caught up! New order updates and promotions will appear here.</p>
      </main>
      <BottomNav />
    </>
  );
}
