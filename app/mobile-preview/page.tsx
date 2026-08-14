export default function MobilePreview() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "24px",
        display: "grid",
        placeItems: "center",
        background: "#dfe8e9",
      }}
    >
      <iframe
        src="/"
        title="SAWAMO モバイルプレビュー"
        style={{
          display: "block",
          width: "390px",
          maxWidth: "100%",
          height: "844px",
          maxHeight: "calc(100vh - 48px)",
          border: "1px solid rgba(0, 91, 105, 0.2)",
          borderRadius: "24px",
          background: "white",
          boxShadow: "0 20px 60px rgba(0, 72, 84, 0.18)",
        }}
      />
    </main>
  );
}
