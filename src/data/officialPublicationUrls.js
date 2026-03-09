// Official publication URLs mapping
// Maps publication titles to their official journal/conference/OpenReview URLs

export const officialPublicationUrls = {
    // 2024/2025
    "Deceptive learning in histopathology": "https://onlinelibrary.wiley.com/doi/10.1111/his.15180",
    "Better artificial intelligence does not mean better models of biology": "https://www.cell.com/trends/cognitive-sciences/fulltext/S1364-6613(25)00349-3",

    // 2025
    "Enhancing deep neural networks through complex-valued representations and Kuramoto synchronization dynamics": "https://openreview.net/forum?id=zx6QGmBL43",
    "Beyond adversarial robustness: Breaking the robustness-alignment trade-off in object recognition": "https://openreview.net/forum?id=oe1TzWGFjs",
    "Tracking objects that change in appearance with phase synchrony": "https://openreview.net/forum?id=m2gVfgWYDO",
    "The 3D-PC: A benchmark for visual perspective taking in humans and machines": "https://openreview.net/forum?id=UIFAJZ22ZF",
    "Local vs distributed representations: What is the right basis for interpretability?": "https://arxiv.org/abs/2411.03993",

    // 2023
    "Learning sparse prototypes for crowd perception": "https://ieeexplore.ieee.org/document/10096000",

    // 2022
    "The challenge of appearance-free object tracking with feedforward neural networks": "https://arxiv.org/abs/2110.02772",

    // 2007
    "Robust object recognition with cortex-like mechanisms": "https://ieeexplore.ieee.org/document/4069258",
    "A feedforward architecture accounts for rapid categorization": "https://www.pnas.org/doi/10.1073/pnas.0700622104",
    "A quantitative theory of immediate visual recognition": "https://www.sciencedirect.com/science/article/pii/S0079612306650058",
};

const _titleToUrlLower = Object.fromEntries(
    Object.entries(officialPublicationUrls).map(([k, v]) => [k.toLowerCase(), v])
);

export const getOfficialPublicationUrl = (title) => {
    return officialPublicationUrls[title] ?? _titleToUrlLower[title?.toLowerCase()] ?? null;
};
