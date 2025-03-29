const SlidePage = ({ children, zIndex = 4 }) => {
  return (
    <div
      style={{
        zIndex: zIndex,
      }}
    >
      {children}
    </div>
  );
};

export default SlidePage;
