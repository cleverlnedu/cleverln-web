'use client';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import './navbar.css';
import Image from "next/image";

const Navbar = () => {
    const [searchType, setSearchType] = useState('Courses');
    const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const searchOptions = ['Courses', 'Hire Talent', 'Get Hired'];
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const handleMouseEnter = (menu: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setActiveDropdown(menu);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
    };

    useEffect(() => {
        return () => {
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
            }
        };
    }, []);

    return (
        <header className="site-nav">
            <div className="site-nav__wrapper">
                {isMobileMenuOpen && (
  <div className="mobile-menu">
    <Link href="/courses">Courses</Link>
    <Link href="/hire">Hire Talent</Link>
    <Link href="/opportunities">Get Hired</Link>
    <Link href="/community">Community</Link>
    <Link href="/login" className="mobile-login">Log in</Link>
  </div>
)}
                {/* Hamburger Menu (Mobile) */}
                <button 
                className="site-nav-burger"
  aria-label="Toggle mobile menu"
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <span> Explore Courses</span>
                    <span>Hire Talent</span>
                    <span>Get Hired</span>
                    <span>Join Community</span>
                </button>

                {/* Logo */}
                <div className="site-nav__logo">
                    <Link href="/">
                    <Image src="/logo.jpg" alt="MM Miles Logo" width={90} height={27} priority /> 
                    </Link>
                </div>
                
                

                {/* Search Bar */}
                <div className="site-nav-search">
                    <div className="site-nav-search__wrapper">
                        
                        <input
                            className="site-nav-search__input"
                            type="text"
                            placeholder="What are you looking for?"
                            autoComplete="off"
                            autoCapitalize="off"
                        />

                        {/* Search Type Dropdown */}
                        <div className="site-nav-search__dropdown">
                            <button
                                className="site-nav-search__dropdown-trigger"
                                onClick={() => setIsSearchDropdownOpen(!isSearchDropdownOpen)}
                                type="button"
                            >
                                <span>{searchType}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                            {isSearchDropdownOpen && (
                                <div className="site-nav-search__dropdown-menu">
                                    {searchOptions.map((option) => (
                                        <button
                                            key={option}
                                            className={`site-nav-search__dropdown-item ${searchType === option ? 'active' : ''}`}
                                            onClick={() => {
                                                setSearchType(option);
                                                setIsSearchDropdownOpen(false);
                                            }}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Search Button */}
                        <button className="site-nav-search__btn" aria-label="Search">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Main Navigation */}
                <nav className="site-nav-main" role="navigation">
                    <ul className="site-nav-main__list">
                        {/* Courses */}
                        <li
                            className="site-nav-main__item"
                            onMouseEnter={() => handleMouseEnter('explore')}
                            onMouseLeave={handleMouseLeave}
                        >
                          <Link href="/courses" className="site-nav-main__link"> Explore Courses </Link>
                            
                        </li>

                        {/* Hire Talent */}
                        <li
                            className="site-nav-main__item"
                            onMouseEnter={() => handleMouseEnter('hire')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link href="/hire" className="site-nav-main__link"> Hire Talent</Link>
                            
                        </li>

                        {/* Get Hired */}
                        <li
                            className="site-nav-main__item"
                            onMouseEnter={() => handleMouseEnter('jobs')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link href="/opportunities" className="site-nav-main__link">Get Hired</Link>
                            
                        </li>
                   
                        {/* Community */}
                        <li
                            className="site-nav-main__item"
                            onMouseEnter={() => handleMouseEnter('community')}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link href="/stories" className="site-nav-main__link">Join Community</Link>
                            
                        </li>
                    </ul>
                </nav>

                {/* Actions (Login/Signup) */}
                <div className="site-nav__actions">
                    <button 
                     className="site-nav-icon-actions__item site-nav-search-mobile-btn"
                     onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"></path>
                        </svg>
                    </button>

                    
                    <Link href="/session/new" className="site-nav__login">Log in</Link>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
