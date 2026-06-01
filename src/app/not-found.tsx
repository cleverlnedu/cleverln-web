import Link from 'next/link';
import Image from 'next/image';
import './not-found.css';

export default function NotFound() {
    return (
        <div className="notFoundWrapper">
            {/* Background Ambience */}
            <div className="backgroundAmbience">
                <div className="blob blob1"></div>
                <div className="blob blob2"></div>
                <div className="blob blob3"></div>
            </div>

            <div className="content">
                {/* Left Side: Content & Navigation */}
                <div className="leftSide">
                    <h1 className="oops">Oops!</h1>
                    <h2 className="highlightTitle">Something went wrong...</h2>
                    <p className="description">
                        Even the cleverest foxes get lost in the server room.
                        This page is currently MIA (Missing In Action).
                    </p>

                    <div className="navLinks">
                        <Link href="/shots/popular" className="navItem">
                            <span className="navIcon">🎓</span>
                            Explore Courses
                        </Link>
                        <Link href="/jobs" className="navItem">
                            <span className="navIcon">💼</span>
                            Search Internships
                        </Link>
                        <Link href="/stories" className="navItem">
                            <span className="navIcon">🌐</span>
                            Community Forum
                        </Link>
                        <Link href="/help" className="navItem">
                            <span className="navIcon">💬</span>
                            Send Support Request
                        </Link>
                    </div>

                    <div className="actions">
                        <Link href="/" className="homeBtn">
                            Back to Knowledge Base
                        </Link>
                    </div>
                </div>

                {/* Right Side: Visuals */}
                <div className="rightSide">
                    <div className="big404Text">404</div>
                    <div className="imageContainer">
                        <Image
                            src="/images/404-meme.png"
                            alt="404 Not Found Illustration"
                            width={500}
                            height={500}
                            className="illustration"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
