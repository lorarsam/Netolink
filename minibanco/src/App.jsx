const navItems = ['Dashboard', 'Accounts', 'Transactions', 'Wealth', 'Settings']

const activities = [
  { name: 'Acme Corp Salary', meta: 'Income - Today, 09:00 AM', amount: '+$4,250.00', tone: 'text-teal' },
  { name: 'Bistro Element', meta: 'Dining - Yesterday, 08:30 PM', amount: '-$124.50', tone: 'text-ink' },
  { name: 'Apple Store', meta: 'Electronics - Oct 24, 2023', amount: '-$999.00', tone: 'text-ink' },
  { name: 'Transfer to Sarah M.', meta: 'Peer Transfer - Oct 22, 2023', amount: '-$50.00', tone: 'text-ink' },
]

const recipients = ['Elena Chen', 'Marcus Thorne', 'Sarah Jenkins']

const transactions = [
  {
    name: 'Bistro Element',
    id: 'TXN-002931-884',
    date: 'Oct 24, 2023',
    time: '02:45 PM',
    status: 'Completed',
    amount: '-$124.50',
    tone: 'text-ink',
    open: true,
  },
  {
    name: 'Acme Corp',
    id: 'ID: ACC-0044',
    date: 'Oct 22, 2023',
    time: '10:12 AM',
    status: 'Completed',
    amount: '+$4,250.00',
    tone: 'text-teal',
  },
  {
    name: 'Amazon Web Services',
    id: 'cloud-billing@amazon.com',
    date: 'Oct 21, 2023',
    time: '08:00 AM',
    status: 'Pending',
    amount: '-$890.22',
    tone: 'text-ink',
  },
  {
    name: 'The Daily Grind',
    id: 'ID: UDG-9921',
    date: 'Oct 20, 2023',
    time: '09:15 AM',
    status: 'Completed',
    amount: '-$12.00',
    tone: 'text-ink',
  },
]

function Icon({ children, className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}

function BankIcon({ className = 'h-5 w-5' }) {
  return (
    <Icon className={className}>
      <path d="M3 10h18" />
      <path d="M5 10v8" />
      <path d="M9 10v8" />
      <path d="M15 10v8" />
      <path d="M19 10v8" />
      <path d="M4 18h16" />
      <path d="m12 3 8 5H4l8-5Z" />
    </Icon>
  )
}

function Sidebar() {
  return (
    <aside className="flex w-full flex-col justify-between bg-brand p-5 text-white lg:min-h-screen lg:w-64">
      <div>
        <div className="mb-8 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-brand">
            <BankIcon />
          </span>
          <div>
            <p className="text-sm font-bold leading-tight">Netolink</p>
            <p className="text-xs text-white/80">Digital Banking</p>
          </div>
        </div>

        <nav className="grid gap-2 sm:grid-cols-5 lg:grid-cols-1">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`rounded-full px-4 py-3 text-sm font-semibold transition ${
                item === 'Dashboard' || item === 'Transactions'
                  ? 'bg-white text-brand shadow-soft'
                  : 'text-white/85 hover:bg-white/15'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      <button className="mt-8 hidden text-left text-sm font-semibold text-white/80 hover:text-white lg:block">Logout</button>
    </aside>
  )
}

function Topbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-cream-soft px-5 py-4 lg:px-8">
      <div className="flex items-center gap-6">
        <h1 className="text-xl font-bold text-brand-dark">Workspace</h1>
        <div className="hidden items-center gap-5 text-xs font-bold text-ink-muted sm:flex">
          <span className="border-b-2 border-brand pb-1 text-brand-dark">Overview</span>
          <span>Reports</span>
          <span>Analytics</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <label className="hidden rounded-full bg-cream-field px-4 py-2 text-xs text-ink-muted md:block">
          Search...
        </label>
        <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-sm">?</span>
        <img className="h-9 w-9 rounded-full object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80" alt="User profile" />
      </div>
    </header>
  )
}

function LoginCard() {
  return (
    <section className="grid min-h-screen place-items-center bg-brand p-6 text-ink">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center gap-2 text-white">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-white text-brand"><BankIcon className="h-4 w-4" /></span>
          <span className="font-bold">Netolink</span>
        </div>

        <div className="rounded-3xl bg-white p-8 shadow-card">
          <h2 className="text-center text-3xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-center text-sm text-ink-muted">Sign in to continue to your digital bank.</p>

          <form className="mt-7 grid gap-4">
            <label className="grid gap-2 text-xs font-bold text-ink-soft">
              Email Address
              <input className="rounded-xl bg-cream-field px-4 py-3 text-sm outline-none ring-brand/40 placeholder:text-ink-muted focus:ring-2" placeholder="Enter your email" />
            </label>

            <label className="grid gap-2 text-xs font-bold text-ink-soft">
              <span className="flex justify-between"><span>Password</span><a className="text-brand" href="#login">Forgot password?</a></span>
              <input className="rounded-xl bg-cream-field px-4 py-3 text-sm outline-none ring-brand/40 placeholder:text-ink-muted focus:ring-2" placeholder="Enter your password" type="password" />
            </label>

            <button className="mt-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:bg-brand-dark" type="button">
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-ink-muted">Don't have an account? <a className="font-bold text-brand" href="#register">Sign up</a></p>
        </div>
      </div>
    </section>
  )
}

function Dashboard() {
  return (
    <section id="dashboard" className="grid gap-6">
      <div className="rounded-3xl border border-line bg-cream-card p-6 shadow-card">
        <p className="text-xs font-bold uppercase tracking-widest text-ink-muted">Total Balance</p>
        <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-5xl font-black tracking-tight">$48,250.00</p>
            <p className="mt-2 text-xs font-semibold text-ink-muted">**** 4209  |  NLB.89 8727 1234 5678 90</p>
          </div>
          <div className="flex gap-3">
            <button className="rounded-full bg-brand px-5 py-3 text-sm font-bold text-white">Deposit</button>
            <button className="rounded-full border border-line px-5 py-3 text-sm font-bold text-brand">Transfer</button>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <SummaryCard title="Monthly Income" amount="$12,450.00" accent="bg-teal" />
        <SummaryCard title="Monthly Expenses" amount="$4,120.00" accent="bg-brand" />
        <div className="rounded-2xl border border-line bg-cream-card p-5 shadow-soft">
          <p className="text-sm font-bold text-ink-muted">Savings Goal</p>
          <p className="mt-4 text-3xl font-black">68%</p>
          <div className="mt-4 h-2 rounded-full bg-cream-field"><div className="h-2 w-2/3 rounded-full bg-teal" /></div>
        </div>
      </div>

      <div className="rounded-3xl border border-line bg-cream-card p-6 shadow-card">
        <div className="mb-5 flex justify-between"><h2 className="text-xl font-bold">Recent Activity</h2><a className="text-sm font-bold text-brand" href="#history">View All</a></div>
        <div className="grid gap-4">
          {activities.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-4 rounded-2xl p-2 hover:bg-cream-soft">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-mint text-teal">↓</span>
                <div><p className="font-bold">{item.name}</p><p className="text-xs text-ink-muted">{item.meta}</p></div>
              </div>
              <p className={`font-black ${item.tone}`}>{item.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SummaryCard({ title, amount, accent }) {
  return (
    <div className="rounded-2xl border border-line bg-cream-card p-5 shadow-soft">
      <p className="text-sm font-bold text-ink-muted">{title}</p>
      <p className="mt-4 text-3xl font-black">{amount}</p>
      <div className="mt-4 flex h-8 items-end gap-2">
        {[35, 48, 43, 62, 56, 70].map((height, index) => <span key={index} className={`${accent} w-full rounded-full`} style={{ height: `${height}%` }} />)}
      </div>
    </div>
  )
}

function TransferPanel() {
  return (
    <section id="transactions" className="relative grid gap-6 rounded-[2rem] bg-white p-6 shadow-card lg:p-10">
      <div>
        <h2 className="text-3xl font-black">Transfer Money</h2>
        <p className="mt-2 text-sm text-ink-muted">Send money instantly to another registered Netolink account.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="grid gap-4">
          <label className="text-xs font-bold text-ink-soft">Recipient</label>
          <input className="rounded-2xl bg-cream-field px-5 py-4 outline-none ring-brand/30 focus:ring-2" placeholder="Search name or email" />
          <div className="flex items-center justify-between rounded-2xl bg-cream-field p-4">
            <div className="flex items-center gap-3">
              <img className="h-12 w-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" alt="James Robertson" />
              <div><p className="font-bold">James Robertson</p><p className="text-xs text-ink-muted">james.r@example.com</p></div>
            </div>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-teal">Active</span>
          </div>
        </div>

        <div className="grid content-start gap-4">
          <label className="text-xs font-bold text-ink-soft">Amount</label>
          <div className="rounded-2xl bg-cream-field px-5 py-4 text-4xl font-black text-ink-muted">$ 0.00</div>
          <p className="text-xs font-semibold text-ink-muted">Available Balance: $12,450.00</p>
        </div>
      </div>

      <label className="grid gap-3 text-xs font-bold text-ink-soft">
        Description (Optional)
        <textarea className="min-h-28 rounded-2xl bg-cream-field px-5 py-4 text-sm outline-none ring-brand/30 focus:ring-2" placeholder="What is this transfer for?" />
      </label>

      <div className="rounded-2xl bg-cream-field p-5">
        <p className="mb-4 font-bold">Transfer Summary</p>
        {['Sender Main Checking', 'Recipient James Robertson', 'Amount $0.00', 'Fee $0.00'].map((row) => (
          <div key={row} className="flex justify-between py-2 text-sm text-ink-soft"><span>{row.split(' ').slice(0, -1).join(' ')}</span><strong>{row.split(' ').at(-1)}</strong></div>
        ))}
        <div className="mt-3 flex justify-between border-t border-line pt-4 font-black text-brand"><span>Total</span><span>$0.00</span></div>
      </div>

      <button className="rounded-full bg-brand py-4 text-sm font-black text-white hover:bg-brand-dark">Transfer Money</button>
      <RecentRecipients />
      <ConfirmModal />
    </section>
  )
}

function ConfirmModal() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden place-items-center rounded-[2rem] bg-ink/35 backdrop-blur-sm xl:grid">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-card">
        <h3 className="text-xl font-bold">Confirm Transfer</h3>
        <p className="mt-2 text-sm text-ink-muted">Please review the details below before confirming.</p>
        <img className="mx-auto mt-8 h-16 w-16 rounded-full object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80" alt="James Robertson" />
        <p className="mt-3 font-bold">James Robertson</p>
        <div className="mt-6 rounded-2xl bg-cream-field p-5 text-sm">
          <div className="flex justify-between py-2"><span>Amount</span><strong>$0.00</strong></div>
          <div className="flex justify-between py-2"><span>Fee</span><strong>$0.00</strong></div>
          <div className="flex justify-between py-2"><span>Remaining Balance</span><strong>$12,450.00</strong></div>
        </div>
        <button className="mt-6 w-full rounded-full bg-brand py-3 text-sm font-black text-white">Confirm Transfer</button>
        <button className="mt-4 text-sm font-bold text-ink-muted">Cancel</button>
      </div>
    </div>
  )
}

function SuccessPanel() {
  return (
    <section className="rounded-[2rem] bg-white p-8 text-center shadow-card lg:p-12">
      <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-teal/20 text-4xl font-black text-teal">✓</span>
      <h2 className="mt-6 text-3xl font-black">Transfer Successful</h2>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted">The amount has been successfully sent to James Robertson. The transaction has been recorded in your history.</p>
      <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-cream-field p-5 text-left">
        {['Recipient James Robertson', 'Amount $0.00', 'Date October 24, 2023', 'Transaction ID #TRX-982341'].map((row) => (
          <div key={row} className="flex justify-between py-2 text-sm"><span className="text-ink-muted">{row.split(' ')[0]}</span><strong>{row.split(' ').slice(1).join(' ')}</strong></div>
        ))}
      </div>
      <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
        <button className="rounded-full bg-brand py-3 text-sm font-black text-white">Go to Dashboard</button>
        <button className="rounded-full border border-brand py-3 text-sm font-black text-brand">Make Another Transfer</button>
      </div>
      <RecentRecipients />
    </section>
  )
}

function RecentRecipients() {
  return (
    <div className="mt-4 rounded-2xl border border-line bg-cream-card p-5">
      <div className="mb-4 flex justify-between"><p className="font-bold">Recent Recipients</p><a className="text-sm font-bold text-brand" href="#all">View All</a></div>
      <div className="flex flex-wrap gap-3">
        {recipients.map((recipient, index) => (
          <span key={recipient} className="rounded-xl bg-cream-field px-4 py-3 text-sm font-bold">{index + 1}. {recipient}</span>
        ))}
      </div>
    </div>
  )
}

function HistoryPanel() {
  return (
    <section id="history" className="rounded-[2rem] bg-cream-soft p-6 shadow-card lg:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div><h2 className="text-4xl font-black">Transaction History</h2><p className="mt-2 max-w-lg text-ink-muted">Review every incoming and outgoing transfer associated with your account.</p></div>
        <div className="grid grid-cols-3 overflow-hidden rounded-2xl bg-white shadow-soft">
          <Stat label="Total" value="1,240" />
          <Stat label="Incoming" value="+$24,000" tone="text-teal" />
          <Stat label="Outgoing" value="-$11,550" tone="text-brand" />
        </div>
      </div>

      <div className="my-7 flex flex-wrap gap-3 text-sm font-bold text-ink-muted">
        <span className="rounded-full bg-white px-4 py-3">Search by recipient, sender or reference</span>
        <span className="rounded-full bg-white px-4 py-3">Type: All</span>
        <span className="rounded-full bg-white px-4 py-3">Date: Last 30 days</span>
        <span className="rounded-full bg-white px-4 py-3 text-brand">Clear Filters</span>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
        <div className="grid grid-cols-[1fr_auto_auto] gap-4 border-b border-line px-5 py-4 text-xs font-black uppercase tracking-widest text-ink-muted md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <span>Transaction</span><span className="hidden md:block">Date & Time</span><span>Status</span><span className="text-right">Amount</span>
        </div>
        {transactions.map((transaction) => <TransactionRow key={transaction.name} transaction={transaction} />)}
      </div>
    </section>
  )
}

function Stat({ label, value, tone = 'text-ink' }) {
  return <div className="border-r border-line px-5 py-4 last:border-r-0"><p className="text-xs font-black uppercase text-ink-muted">{label}</p><p className={`mt-1 text-lg font-black ${tone}`}>{value}</p></div>
}

function TransactionRow({ transaction }) {
  return (
    <div className={`${transaction.open ? 'bg-blush' : 'bg-white'} border-b border-line last:border-b-0`}>
      <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-5 py-5 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div><p className="font-black">{transaction.name}</p><p className="text-xs text-ink-muted">{transaction.id}</p></div>
        <div className="hidden text-sm md:block"><p>{transaction.date}</p><p className="text-xs text-ink-muted">{transaction.time}</p></div>
        <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-black uppercase text-brand-dark">{transaction.status}</span>
        <p className={`text-right font-black ${transaction.tone}`}>{transaction.amount}</p>
      </div>
      {transaction.open && <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">Business catering for quarterly strategy review session. Expenses allocated to Operations department.</p>}
    </div>
  )
}

function BankingApp() {
  return (
    <div className="min-h-screen bg-cream text-ink lg:flex">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Topbar />
        <div className="grid gap-8 p-5 lg:p-8">
          <Dashboard />
          <TransferPanel />
          <SuccessPanel />
          <HistoryPanel />
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <>
      <LoginCard />
      <BankingApp />
    </>
  )
}
