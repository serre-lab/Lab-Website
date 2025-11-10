import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://serre.lab.brown.edu';

// Page metadata mapping
const pageMetadata: Record<string, { title: string; description: string }> = {
    '/': {
        title: 'Serre Lab | Brown University',
        description: 'The Serre Lab at Brown University conducts cutting-edge research in computational neuroscience and NeuroAI, focusing on visual recognition, deep learning, attention, and brain mechanisms underlying object recognition using behavioral, imaging, and physiological techniques.'
    },
    '/research': {
        title: 'Research | Serre Lab',
        description: 'Research in computational neuroscience and NeuroAI at the Serre Lab, focusing on visual recognition, deep learning, attention mechanisms, and brain-inspired artificial intelligence.'
    },
    '/publications': {
        title: 'Publications | Serre Lab',
        description: 'Publications from the Serre Lab at Brown University, including research papers on computational neuroscience, NeuroAI, visual recognition, deep learning, and brain mechanisms.'
    },
    '/people': {
        title: 'People | Serre Lab',
        description: 'Meet the researchers, students, and team members of the Serre Lab at Brown University, working on computational neuroscience and NeuroAI research.'
    },
    '/resources': {
        title: 'Resources | Serre Lab',
        description: 'Resources from the Serre Lab including datasets, tools, tutorials, and educational materials for computational neuroscience and NeuroAI research.'
    },
    '/sci-comm': {
        title: 'Media & Science Communication | Serre Lab',
        description: 'Media coverage, talks, and science communication from the Serre Lab at Brown University, sharing research in computational neuroscience and NeuroAI.'
    }
};

/**
 * Get page title from path, with fallback for markdown pages
 */
function getPageTitle(path: string): string {
    if (pageMetadata[path]) {
        return pageMetadata[path].title;
    }
    // For markdown pages, generate title from path
    if (path.startsWith('/resources/')) {
        const pageName = path.replace('/resources/', '').replace(/-/g, ' ');
        return `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} | Serre Lab Resources`;
    }
    return 'Serre Lab | Brown University';
}

/**
 * Get page description from path, with fallback
 */
function getPageDescription(path: string): string {
    if (pageMetadata[path]) {
        return pageMetadata[path].description;
    }
    // Default description for markdown pages
    if (path.startsWith('/resources/')) {
        return 'Resource page from the Serre Lab at Brown University, providing information and tools for computational neuroscience and NeuroAI research.';
    }
    return 'The Serre Lab at Brown University conducts cutting-edge research in computational neuroscience and NeuroAI.';
}

/**
 * Component that dynamically updates canonical URL, page title, and meta tags based on current route
 */
export function SEOHead() {
    const location = useLocation();
    
    useEffect(() => {
        // Get the current path (hash routing)
        const path = location.pathname;
        
        // Build canonical URL
        const canonicalUrl = path === '/' 
            ? `${BASE_URL}/` 
            : `${BASE_URL}/#${path}`;
        
        // Get page metadata
        const title = getPageTitle(path);
        const description = getPageDescription(path);
        
        // Update document title
        document.title = title;
        
        // Update or create canonical link tag
        let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        canonicalLink.setAttribute('href', canonicalUrl);
        
        // Update meta description
        let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.setAttribute('name', 'description');
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description);
        
        // Update og:url meta tag
        let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
        if (!ogUrl) {
            ogUrl = document.createElement('meta');
            ogUrl.setAttribute('property', 'og:url');
            document.head.appendChild(ogUrl);
        }
        ogUrl.setAttribute('content', canonicalUrl);
        
        // Update og:title meta tag
        let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement;
        if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute('content', title);
        
        // Update og:description meta tag
        let ogDescription = document.querySelector('meta[property="og:description"]') as HTMLMetaElement;
        if (!ogDescription) {
            ogDescription = document.createElement('meta');
            ogDescription.setAttribute('property', 'og:description');
            document.head.appendChild(ogDescription);
        }
        ogDescription.setAttribute('content', description);
        
        // Update twitter:url meta tag
        let twitterUrl = document.querySelector('meta[property="twitter:url"]') as HTMLMetaElement;
        if (!twitterUrl) {
            twitterUrl = document.createElement('meta');
            twitterUrl.setAttribute('property', 'twitter:url');
            document.head.appendChild(twitterUrl);
        }
        twitterUrl.setAttribute('content', canonicalUrl);
        
        // Update twitter:title meta tag
        let twitterTitle = document.querySelector('meta[property="twitter:title"]') as HTMLMetaElement;
        if (!twitterTitle) {
            twitterTitle = document.createElement('meta');
            twitterTitle.setAttribute('property', 'twitter:title');
            document.head.appendChild(twitterTitle);
        }
        twitterTitle.setAttribute('content', title);
        
        // Update twitter:description meta tag
        let twitterDescription = document.querySelector('meta[property="twitter:description"]') as HTMLMetaElement;
        if (!twitterDescription) {
            twitterDescription = document.createElement('meta');
            twitterDescription.setAttribute('property', 'twitter:description');
            document.head.appendChild(twitterDescription);
        }
        twitterDescription.setAttribute('content', description);
        
    }, [location.pathname]);
    
    // This component doesn't render anything
    return null;
}

