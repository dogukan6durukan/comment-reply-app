export default function IconBtn({ Icon, isActive, color, children, ...props }) {
  return (
    <button className={`btn icon-btn ${isActive ? "icon-btn-active" : ""}`} 
    {...props}>
      <span className={`${children != null ? "mr-1" : ""} ${color || ""}`}>
        <Icon />
      </span>
      {children}
    </button>
  );
}
