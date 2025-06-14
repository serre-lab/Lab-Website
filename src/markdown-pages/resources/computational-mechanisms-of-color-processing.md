[< back to Resources](https://serre-lab.clps.brown.edu/resources/)

# Computational mechanisms of color processing

The goal of this project is to study the computational mechanisms underlying color processing in the primate brain. In recent work we have developed a novel framework for the joint processing of color and shape information in natural images [ECCV’12]. A hierarchical non-linear spatio-chromatic operator yields spatial and chromatic opponent channels, which mimics processing in the primate visual cortex. We have extended two popular object recognition systems (our very own hierarchical model of visual processing and a classical bag-of-word approach based on the SIFT descriptor) to incorporate color information along with shape information.

## Neurophysiology background

**Luminance neurons** have distinct “ON” and “OFF” subfields and are selective to orientations (and high spatial frequency) thus contribute to edge detection.

**Single-Opponent (SO) neurons** have distinct “ON” and “OFF” subfields (with different cone inputs). They exhibit little or weak orientation selectivity but strong selectivity to color regions.

**Double-Opponent (DO) neurons** lack “ON” and “OFF” subfields. They are selective for both color and orientation (as well as spatial frequency), and thought to influence the perception of form.

[![Fig. 1](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/image003-1024x583.jpg)](http://serre-lab.clps.brown.edu/resource/computational-mechanisms-of-color-processing/image003/)  
**Fig. 1.** Receptive fields (RFs) for luminance (A), single-opponent (color-preferring, B), and double-opponent (color-luminance, C) neurons.

## Insights from neuroscience

- Chromatic and spatial information should be represented jointly as done in the primate visual cortex
- Dedicated neural circuits for contrast gain controls play key role in color constancy.

## Approach

[![Fig. 2](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/image004-1024x289.jpg)](http://serre-lab.clps.brown.edu/resource/computational-mechanisms-of-color-processing/image004/)  
**Fig. 2.** Proposed spatio-chromatic opponent image descriptors. Top: Individual R, G, B color channels are first convolved with a center and a surround filter at orientation, phase, and scale *s*. The corresponding color channels are further combined and rectified by half-squaring followed by divisive normalization **(I)**. This yields eight chromatic SO channels organized in four pairs (e.g., R+G- shown here and R-G+). In stage **II**, an oriented filter (with both excitatory and inhibitory subunits) is further applied on each SO channel, followed by half-squaring rectification and summation over phases and opponent pairs to yield four spatio-chromatic DO channels that are invariant to figure-ground reversal (e.g., RG).

**(1) Spatio-chromatic sensitivity function**

The response of an SO (S1) unit is obtained by considering the dot-product between an image patch and the spatio-chromatic sensitivity function.

[![Fig. 3](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/image009.jpg)](http://serre-lab.clps.brown.edu/resource/computational-mechanisms-of-color-processing/image009/)  
**Fig. 3.** Spatial sensitivity distributions for each individual color component. These are obtained by isolating the positive/negative subunits from linear oriented filters to form excitatory/inhibitory center or surround structures.

**(2) From Single-Opponent to Double-Opponent units**

DO (S1) model unit responses are obtained by filtering SO channels with the spatial sensitivity function:

Note: unlike the SO stage, the convolution here is only 2D and contains both center and surround (excitatory/inhibitory) subunits (in the SO computation excitatory and inhibitory subunits are applied on separate color components). With this difference in mind, the spatial sensitivity function used at the DO stage is the same as the one used at the SO stage but in the general case any filter with excitatory and inhibitory components could be used.

**(3) Non-linear operations**

[![Fig. 4](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/image012.jpg)](http://serre-lab.clps.brown.edu/resource/computational-mechanisms-of-color-processing/image012/)

**Example:**

[![Fig. 5](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/image013-1024x310.jpg)](http://serre-lab.clps.brown.edu/resource/computational-mechanisms-of-color-processing/image013/)  
**Fig. 4.** Processing by the SO and DO color channels. A. Original image. B. SO maps. C. DO maps (after max over all dimensions for display).

## Sample results

We have evaluated our approach on four systems:

- SIFT-based bag-of-words approach
- HMAX model
- GIST algorithm for natural scene categorization
- BSDS500 for contour detection

**Object recognition**

**Table 1.** Recognition performance on the soccer team and 17-category flower datasets. Classification accuracy is reported for each feature type (data in parenthesis correspond to the original performance reported in [3, 4] using the same features as in a bag-of-words scheme.)

| Method           | Color      | Shape      | Both      | Color      | Shape      | Both      |
|------------------|------------|------------|-----------|------------|------------|-----------|
|                  | **Soccer team** |            |           | **Flower** |            |           |
| Hue/SIFT         | 69 (67)    | 43 (43)    | 73 (73)   | 58 (40)    | 65 (65)    | 77 (79)   |
| Opp/SIFT         | 69 (65)    | 43 (43)    | 74 (72)   | 57 (39)    | 65 (65)    | 74 (79)   |
| **SOSIFT/DOSIFT**| **82**     | **66**     | **83**    | **68**     | **69**     | **79**    |
| **SOHMAX/DOHMAX**| **87**     | **76**     | **89**    | **77**     | **73**     | **83**    |

**Table 2.** Recognition performance on PASCAL VOC 2007 dataset. Performance corresponds to the mean average precision (AP) over all 20 classes. Performance (in parenthesis) corresponds to the best performance reported in [5, 6].

| Method         | SIFT   | HueSIFT | OpponentSIFT | CSIFT  | **SODOSIFT** | **SODOHMAX** |
|----------------|--------|---------|--------------|--------|--------------|--------------|
| AP             | 40 (38.4) | 41      | 43 (42.5)     | 43 (44.0) | **46.5** (33.3/39.8) | **46.8** (30.1/36.4) |

**Table 3.** On the need for non-linear circuits: Recognition performance on the soccer team and PASCAL VOC 2007 datasets with and without rectification or divisive normalization stages for the SO (left) and DO (right) SIFT descriptors.

| Method                | Soccer team | PASCAL VOC 2007 |
|-----------------------|-------------|-----------------|
| **Full model**        | 82.0/66.0   | 33.3/39.8       |
| Without half-squaring | 62.0/60.0   | 30.3/36.7       |
| Without normalization | 70.0/53.0   | 32.9/40.7       |

**Table 4.** All parameters used here are directly constrained by neuroscience data (k = 1 and σ = 0.225 turned out to perform best for the SO (left) and DO (right) SIFT descriptors).

| Dataset         | 0.01   | 0.1    | 0.5    | 1      | 0.1    | 2.5    | 5      | 8      |
|-----------------|--------|--------|--------|--------|--------|--------|--------|--------|
| **Soccer team** | 76/61  | 80/61  | 80/66  | 80/59  | 78/68  | 80/65  | 78/62  | 79/66  |
| **PASCAL VOC 2007** | 28.6/34.3 | 31.7/35.6 | 31.4/39.4 | 32.8/41.0 | 30.8/34.3 | 30.8/36.9 | 30.6/36.1 | 30.5/36.1 |

## Scene categorization

**Table 5.** Recognition performance on scene categorization.

| Method      | GIST  | RGBGIST | SOGIST | DOGIST | SODOGIST |
|-------------|-------|---------|--------|--------|----------|
| Accuracy    | 83.5  | 84.1    | 70.5   | 85.9   | **87.1** |

[![Fig. 6](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/image015.jpg)](http://serre-lab.clps.brown.edu/resource/computational-mechanisms-of-color-processing/image015/)  
**Fig. 6.** Classification performance of SO/DO/gray-GIST on 8-category scenes dataset broken down by category.

## Contour detection

[![Fig. 7](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/image016-1024x382.jpg)](http://serre-lab.clps.brown.edu/resource/computational-mechanisms-of-color-processing/image016/)  
**Fig. 7.** Contour detection on BSDS500. (A) Representative examples obtained using the original texton maps and our proposed color extensions. From left to right: original images, color-texton map (SOTG) and texton map (TG). (B) Precision-recall curves on BSDS500, comparing the original grayscale texture channel with the full Berkeley system [7] which combines brightness, color, and texture cues against our color-texture cue.

## Source code

Sample code is available on the lab [github](https://github.com/serre-lab/color_hmax) repository.

## Relevant publication

[ECCV’12] Zhang, J., Barhomi, Y., Serre, T. A new biologically inspired color image descriptor. In: Proceedings of the IEEE Conference on European Conference on Computer Vision (ECCV), Florence, Italy, 2012. [pdf](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/09/proof-eccv2012-color.pdf) [slides](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/10/eccv_poster_color_v2.pdf)

## Additional references

1. Johnson, E.N., Hawken, M.J., Shapley, R.: The orientation selectivity of color-responsive neurons in macaque V1. The Journal of Neuroscience, 2008.
2. Conway, B.R.: Spatial structure of cone inputs to color cells in alert macaque primary visual cortex (V-1). The Journal of Neuroscience, 2001.
3. van de Weijer, J., Schmid, C.: Coloring local feature extraction. In: ECCV, 2006
4. van de Weijer, J., Schmid, C.: Applying color names to image description. In: ICIP, 2007.
5. van de Sande, K.E.A., Gevers, T., Snoek, C.G.M.: Evaluating color descriptors for object and scene recognition. TPAMI, 2010.
6. van de Sande, K.E., Gevers, T., Snoek, C.G.: Color descriptors for object category recognition. In: CGIV, 2008.
7. Arbelaez, P., Maire, M., Fowlkes, C., Malik, J.: Contour detection and hierarchical image segmentation. TPAMI, 2010.
8. Serre, T., Wolf, L., Bileschi, S.M., Riesenhuber, M., Poggio, T.: Robust object recognition with cortex-like mechanisms. TPAMI, 2007.