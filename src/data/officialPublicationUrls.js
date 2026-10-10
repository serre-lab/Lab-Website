// Fallback URLs for publication titles whose record has no usable canonical url.
// A usable publication.url (publisher, DOI, or OpenReview) takes precedence.
// These mappings apply only when that field is missing, blank, a local PDF, or a /papers/ path.

export const officialPublicationUrls = {
    // 2026
    "Perilesional neuromodulation replaces lost sensorimotor function in persons with spinal cord injury": "https://www.nature.com/articles/s41551-026-01627-5",

    // 2024/2025
    "Deceptive learning in histopathology": "https://onlinelibrary.wiley.com/doi/10.1111/his.15180",
    "Better artificial intelligence does not mean better models of biology": "https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3",

    // 2025
    "Enhancing deep neural networks through complex-valued representations and Kuramoto synchronization dynamics": "https://openreview.net/forum?id=zx6QGmBL43",
    "Beyond adversarial robustness: Breaking the robustness-alignment trade-off in object recognition": "https://openreview.net/forum?id=oe1TzWGFjs",
    "Tracking objects that change in appearance with phase synchrony": "https://openreview.net/forum?id=m2gVfgWYDO",
    "The 3D-PC: A benchmark for visual perspective taking in humans and machines": "https://openreview.net/forum?id=UIFAJZ22ZF",

    // 2023
    "Learning sparse prototypes for crowd perception": "https://ieeexplore.ieee.org/document/10096000",

    // 2022
    "The challenge of appearance-free object tracking with feedforward neural networks": "https://arxiv.org/abs/2110.02772",

    // 2007
    "Robust object recognition with cortex-like mechanisms": "https://ieeexplore.ieee.org/document/4069258",
    "A feedforward architecture accounts for rapid categorization": "https://www.pnas.org/doi/10.1073/pnas.0700622104",
    "A quantitative theory of immediate visual recognition": "https://www.sciencedirect.com/science/chapter/bookseries/abs/pii/S0079612306650048",
};

const _titleToUrlLower = Object.fromEntries(
    Object.entries(officialPublicationUrls).map(([k, v]) => [k.toLowerCase(), v])
);

export const getOfficialPublicationUrl = (title) => {
    return officialPublicationUrls[title] ?? _titleToUrlLower[title?.toLowerCase()] ?? null;
};

/** True when publication.url can be used as the public link. */
export const isUsableCanonicalUrl = (url) => {
    if (typeof url !== "string") return false;
    const trimmed = url.trim();
    if (!trimmed) return false;
    if (trimmed.toLowerCase().endsWith(".pdf")) return false;
    if (trimmed.includes("/papers/")) return false;
    if (trimmed === "/publications") return false;
    return true;
};

/**
 * Prefer the record's canonical url. Fall back to the title map only when
 * that url is missing or not usable.
 */
export const resolvePublicationUrl = (publication) => {
    if (isUsableCanonicalUrl(publication?.url)) {
        return publication.url.trim();
    }
    return getOfficialPublicationUrl(publication?.title);
};
