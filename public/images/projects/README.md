# Project Preview Images

This directory contains preview images for featured projects displayed on the home page.

## Required Image Files:

1. **clickme-preview.jpg** - ClickMe game preview
   - Screenshot of the ClickMe interface
   - Recommended: Capture during gameplay showing the annotation interface
   - Source: http://clickme.clps.brown.edu

2. **harmonizer-preview.jpg** - Neural Harmonizer preview
   - Visualization showing human-AI alignment
   - Recommended: The gradient alignment comparison or trade-off graph
   - Source: https://serre-lab.github.io/Harmonization/

3. **objectlens-preview.jpg** - ObjectLens (LENS) preview
   - Visualization of ImageNet model explanations
   - Recommended: Screenshot showing the interactive tool with saliency maps
   - Source: https://lens.visualize.ai/

4. **leaflens-preview.jpg** - LeafLens preview
   - Visualization of plant species identification
   - Recommended: Screenshot showing cleared leaf with attention maps
   - Source: https://leaf-lens.visualize.ai/

## Image Specifications:

- **Format**: JPG or PNG
- **Dimensions**: 800x600px or similar landscape aspect ratio (4:3 or 16:9)
- **Aspect Ratio**: Will be displayed at ~4:3 in a 180px height container
- **File Size**: Under 200KB per image (optimize for web)
- **Content**: Clear, high-quality screenshots that represent the project
- **Style**: Professional screenshots showing the interface/visualizations in action

## Tips for Screenshots:

1. **ClickMe**: Capture during an active game showing the clicking interface and an image
2. **Harmonizer**: Use one of the figures from the paper/website (gradient comparison or performance graph)
3. **ObjectLens/LeafLens**: Screenshots of the interactive tool with interesting examples

## Fallback:

If images are not available, the cards will show a gray placeholder background (#f0f0f0). The site will still function normally, but visual previews significantly improve engagement.

## Usage:

These images are displayed at the top of each featured project card with:
- 180px fixed height
- Full width of card
- `object-fit: cover` to maintain aspect ratio
- Zoom effect on hover (scale 1.05)
- Smooth transitions

## How to Add Images:

1. Take screenshots from the respective project websites
2. Crop/resize to ~800x600px landscape orientation
3. Optimize file size (use tools like TinyPNG or ImageOptim)
4. Save with the exact filenames listed above
5. Place in this directory
6. The site will automatically display them (hot reload in dev mode)

