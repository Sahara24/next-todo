import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">{children}</main>
      <Footer/>
    </div>
  );
}
