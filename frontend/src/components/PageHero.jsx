export default function PageHero({ title, subtitle, badge }) {
  return (
    <div className="page-hero">
      <div className="container page-hero-content">
        {badge && <span className="page-hero-badge">{badge}</span>}
        <h1 className="page-hero-title">{title}</h1>
        {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
      </div>
    </div>
  )
}
