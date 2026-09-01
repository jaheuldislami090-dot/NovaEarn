"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const telegramUser = window.Telegram?.WebApp?.initDataUnsafe?.user;

    if (!telegramUser?.id) {
      setLoading(false);
      return;
    }

    fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: telegramUser
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("User connection error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="app">
        <div className="header">
          <div>
            <h1>🚀 NovaEarn</h1>
            <p>Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="header">
        <div>
          <h1>🚀 NovaEarn</h1>
          <p>
            {user?.first_name
              ? `Welcome, ${user.first_name}!`
              : "Earn more, do more"}
          </p>
        </div>

        <div className="avatar">👤</div>
      </header>

      <section className="balance-card">
        <p>Your Balance</p>
        <h2>৳{Number(user?.balance || 0).toFixed(2)}</h2>

        <div className="balance-info">
          <span>
            Today: ৳0.00
          </span>

          <span>
            Referral: ৳{Number(user?.referral_balance || 0).toFixed(2)}
          </span>
        </div>
      </section>

      <section className="content">
        <h2 className="section-title">Earn Money</h2>

        <div className="menu-card">
          <div className="icon">📋</div>
          <div>
            <h3>Complete Tasks</h3>
            <p>Complete available tasks and earn rewards</p>
          </div>
        </div>

        <div className="task-card">
          <span>📺</span>
          <div>
            <h3>Watch Ads</h3>
            <p>Watch advertisements and earn money</p>
          </div>
        </div>

        <div className="task-card">
          <span>👥</span>
          <div>
            <h3>Refer Friends</h3>
            <p>Invite friends and earn referral rewards</p>
          </div>
        </div>

        <div className="join-box">
          <h3>📢 Join Our Channel</h3>

          <p>
            Join our official Telegram channel to receive
            updates and rewards.
          </p>

          <button>Join Channel</button>

          <button className="verify-button">
            Verify Membership
          </button>
        </div>
      </section>

      <nav className="bottom-nav">
        <button className="active">
          <span>🏠</span>
          Home
        </button>

        <button>
          <span>💰</span>
          Earn
        </button>

        <button>
          <span>👥</span>
          Referral
        </button>

        <button>
          <span>👤</span>
          Profile
        </button>
      </nav>
    </main>
  );
}
