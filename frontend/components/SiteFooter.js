export default function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="site-footer">
      <p>© {year} Modern Commerce. Built with Next.js, Express, and MongoDB.</p>
      <div>
        <a href="mailto:hello@moderncommerce.studio">Support</a>
        <a href="#">Privacy</a>
        <a href="#">Returns</a>
      </div>
    </footer>
  )
}

