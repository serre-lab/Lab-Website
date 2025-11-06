import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://serre.lab.brown.edu';

/**
 * Component that dynamically updates canonical URL and meta tags based on current route
 */
export function SEOHead() {
    const location = useLocation();
    
    useEffect(() => {
        // Get the current path (hash routing)
        const path = location.pathname;
        
        // Build canonical URL
        const canonicalUrl = path === '/' 
            ? `${BASE_URL}/` 
            : `${BASE_URL}#${path}`;
        
        // Update or create canonical link tag
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonicalUrl);
        
        // Update og:url meta tag
        let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
        if (!ogUrl) {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute('content', canonicalUrl);
        
        // Update twitter:url meta tag
        let twitterUrl = document.querySelector('meta[property="twitter:url"]') as HTMLMetaElement;
        if (!twitterUrl) {
            twitterUrl = document.createElement('meta');
            twitterUrl.setAttribute('property', 'twitter:url');
            document.head.appendChild(twitterUrl);
        }
        twitterUrl.setAttribute('content', canonicalUrl);
        
    }, [location.pathname]);
    
    // This component doesn't render anything
    return null;
}

