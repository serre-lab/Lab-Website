# HMDB: A Large Human Motion Database

**A comprehensive video dataset for human action recognition containing 6,849 clips across 51 action categories.**

---

## Overview

HMDB (Human Motion Database) is one of the most widely-used benchmarks for human action recognition research. Collected from movies and public databases including the Prelinger archive, YouTube, and Google videos, it provides a challenging testbed for video understanding algorithms with rich annotations and diverse video content.

### Key Statistics
- **51 action categories** spanning facial actions, body movements, and human interactions
- **6,849 video clips** with minimum 101 clips per category
- **Detailed annotations** including body parts, camera motion, viewpoint, and quality
- **Standard evaluation splits** for reproducible benchmarking
- **Licensed under Creative Commons BY 4.0**


---

## Action Categories

### 51 Actions Across 5 Types

The dataset spans a comprehensive range of human activities organized into five semantic categories:

#### 1. 😊 General Facial Actions
`smile` • `laugh` • `chew` • `talk`

#### 2. 🍽️ Facial Actions with Object Manipulation
`smoke` • `eat` • `drink`

#### 3. 🤸 General Body Movements
`cartwheel` • `clap hands` • `climb` • `climb stairs` • `dive` • `fall on floor` • `backhand flip` • `handstand` • `jump` • `pull up` • `push up` • `run` • `sit down` • `sit up` • `somersault` • `stand up` • `turn` • `walk` • `wave`

#### 4. ⚽ Body Movements with Object Interaction
`brush hair` • `catch` • `draw sword` • `dribble` • `golf` • `hit something` • `kick ball` • `pick` • `pour` • `push something` • `ride bike` • `ride horse` • `shoot ball` • `shoot bow` • `shoot gun` • `swing baseball` • `sword exercise` • `throw`

#### 5. 🤝 Body Movements for Human Interaction
`fencing` • `hug` • `kick someone` • `kiss` • `punch` • `shake hands` • `sword fight`

### Visual Examples

| ![HMDB Snapshot 1](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/HMDB_snapshot1-300x225.png) | ![HMDB Snapshot 2](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/HMDB_snapshot2-300x225.png) |
|:--:|:--:|
| *Sample actions from HMDB51* | *Diverse activities and viewpoints* |

---

## Citation

### Primary Citation

If you use HMDB in your research, please cite:

```bibtex
H. Kuehne, H. Jhuang, E. Garrote, T. Poggio, and T. Serre
HMDB: A Large Video Database for Human Motion Recognition
International Conference on Computer Vision (ICCV), 2011
```

📄 [**Download Paper (PDF)**](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/Kuehne_etal_iccv11.pdf) | 📋 [BibTeX](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/Kuehne_etal_iccv11.bib)

### Additional Citations

**For STIP Features:**
```
I. Laptev, M. Marszalek, C. Schmid, and B. Rozenfeld
Learning Realistic Human Actions From Movies
CVPR, 2008
```
📄 [PDF](http://www.irisa.fr/vista/Papers/2008_cvpr_laptev.pdf)

**For C2 Features:**
```
H. Jhuang, T. Serre, L. Wolf, and T. Poggio
A Biologically Inspired System for Action Recognition
ICCV, 2007
```
📄 [PDF](http://ps.is.tue.mpg.de/publications/46/get_file)

---

## Dataset Annotations & Technical Details

### Rich Meta-Annotations

Each video clip includes comprehensive annotations beyond the action label:

| Annotation Type | Values | Description |
|----------------|---------|-------------|
| **Visible Body Parts** | head (h), upper body (u), full body (f), lower body (l) | Which body parts are visible in the clip |
| **Camera Motion** | motion (cm), static (nm) | Whether the camera is moving or stationary |
| **Camera Viewpoint** | front (fr), back (ba), left (le), right (ri) | Camera angle relative to subject |
| **Number of People** | single (np1), two (np2), three (np3) | How many people are in the scene |
| **Video Quality** | good (goo), medium (med), ok (bad) | Overall video quality rating |

### Dataset Statistics

The following visualizations show the distribution of various properties across HMDB51:

| ![Action Categories](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/ActionCategories-187x300.jpg) | ![Body Part](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/BodyPart-187x300.jpg) | ![Camera Motion](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/CameraMotion-187x300.jpg) | ![Camera Position](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/CameraPosition1-187x300.jpg) |
|:--:|:--:|:--:|:--:|
| *Action distribution* | *Body parts visible* | *Camera motion* | *Camera viewpoint* |

| ![Clip Quality](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/ClipQuality-187x300.jpg) | ![Duration](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/Duration-187x300.jpg) | ![Duration Count](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/Duration_count-187x300.jpg) |
|:--:|:--:|:--:|
| *Video quality* | *Clip duration* | *Duration histogram* |

### Video Stabilization

We provide camera-stabilized versions of all clips using standard image stitching techniques. The stabilization process:

1. **Feature Detection:** Identifies salient features in adjacent frames
2. **Feature Matching:** Uses distance measures combining pixel differences and Euclidean distance
3. **Transformation Estimation:** Applies RANSAC to estimate geometric transformations
4. **Frame Alignment:** Warps and combines frames to remove camera motion

#### Stabilization Examples

| Original | Stabilized |
|:--------:|:----------:|
| ![Before 1](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00001-300x225.jpg) | ![After 1](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00002-300x154.jpg) |
| ![Before 2](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00020-300x225.jpg) | ![After 2](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00021-300x154.jpg) |
| ![Before 3](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00050-300x225.jpg) | ![After 3](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00051-300x154.jpg) |

---

## Comparison with Other Benchmarks

### Related Action Recognition Datasets

- **[KTH Dataset](http://www.nada.kth.se/cvap/actions/)** – 6 actions, controlled lab setting
- **[Weizmann Dataset](http://www.wisdom.weizmann.ac.il/~vision/SpaceTimeActions.html)** – 10 actions, 9 subjects
- **[Hollywood](http://www.irisa.fr/vista/actions/)** – 8 actions from movies
- **[Hollywood2](http://pascal.inrialpes.fr/hollywood2)** – 12 actions, larger scale
- **[UCF Datasets](http://server.cs.ucf.edu/~vision/data.html)** – Sports, YouTube, UCF50

### Dataset Scale Comparison

| Dataset | Year | # Actions | # Clips/Action | Total Clips | Source |
|---------|------|-----------|----------------|-------------|---------|
| KTH | 2004 | 6 | ~100 | ~600 | Lab |
| Weizmann | 2005 | 9 | ~10 | ~90 | Lab |
| IXMAS | 2006 | 11 | ~33 | ~360 | Lab |
| Hollywood | 2008 | 8 | 60–140 | ~800 | Movies |
| UCF Sports | 2009 | 9 | 14–35 | ~200 | Sports |
| Hollywood2 | 2009 | 12 | 61–278 | ~1,700 | Movies |
| UCF YouTube | 2009 | 11 | 100 | ~1,100 | YouTube |
| MSR | 2009 | 3 | 14–25 | ~70 | Lab |
| Olympic | 2010 | 16 | 50 | ~800 | Sports |
| UCF50 | 2010 | 50 | min. 100 | ~5,000 | YouTube |
| **HMDB51** | **2011** | **51** | **min. 101** | **~6,850** | **Movies+Web** |

*HMDB51 provided one of the largest and most diverse action recognition benchmarks at the time of release, with realistic "in-the-wild" video content.*

---

## Contact & Updates

**Questions?**  
For inquiries about the dataset and benchmarks, contact:  
Hueihan Jhuang (hueihan.jhuang [at] tuebingen.mpg.de)

**Version History:**
- **2013-11-19** – Updated evaluation with additional benchmarks
- **2013-04-22** – Expanded benchmark comparisons
- **2012-03-12** – Second version, enhanced evaluation page
- **2011-10-25** – Added stabilized video documentation
- **2011-09-24** – Added split documentation and HOG/HOF references
- **2011-09-01** – Uploaded statistics and feature visualizations
- **2011-07-29** – Initial release