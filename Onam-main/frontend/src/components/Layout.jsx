import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  
  // Smooth scroll to top helper function (only used for manual scrolling)
  const smoothScrollToTop = useCallback(() => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    })
  }, [])

  // Convert pathname to section ID for Navbar compatibility
  const currentSection = useMemo(() => {
    const path = location.pathname
    if (path === '/') return 'home'
    return 'home'
  }, [location.pathname])

  // Helper function to scroll to a section element
  const scrollToElement = useCallback((elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      const yOffset = -80 // Offset for fixed navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({ 
        top: y,
        behavior: 'smooth'
      })
    }
  }, [])

  // Navigation handler for Navbar - smart scrolling based on context
  const scrollToSection = useCallback((sectionId) => {
    // Sections that are on the home page (scroll navigation)
    const homePageSections = ['home', 'sadya', 'events', 'memories', 'explore']
    
    // If it's a home page section
    if (homePageSections.includes(sectionId)) {
      const elementId = sectionId === 'home' ? 'home' : sectionId
      
      // If we're already on home page, scroll directly to section
      if (location.pathname === '/') {
        scrollToElement(elementId)
      } else {
        // Navigate to home first, then scroll to section after navigation
        navigate('/')
        // Use a longer delay to ensure DOM is ready
        setTimeout(() => {
          scrollToElement(elementId)
        }, 300)
      }
    }
  }, [location.pathname, navigate, scrollToElement])

  // Determine if we're on home page (no top padding needed for hero section)
  const isHomePage = location.pathname === '/'
  const isRitualsPage = location.pathname === '/rituals'
  const isShoppingPage = location.pathname === '/shopping'

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-red-50 overflow-x-hidden">
      {!isRitualsPage && !isShoppingPage && <Navbar currentSection={currentSection} scrollToSection={scrollToSection} />}
      <main className={isHomePage ? '' : (isRitualsPage || isShoppingPage) ? '' : 'pt-16'}>
        <Outlet />
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  )
}

export default Layout

