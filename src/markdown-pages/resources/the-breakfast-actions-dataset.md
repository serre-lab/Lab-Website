# The Breakfast Actions Dataset

A comprehensive dataset of breakfast preparation activities performed by 52 different individuals in 18 different kitchens, designed to reflect real-world recognition scenarios.

## Introduction

A common problem in computer vision is the applicability of algorithms developed on meticulously controlled datasets to real-world problems, such as unscripted, uncontrolled videos with natural lighting, viewpoints and environments. With the advancements in feature descriptors and generative methods in action recognition, a need for comprehensive datasets that reflect the variability of real-world recognition scenarios has emerged.

This dataset comprises 10 actions related to breakfast preparation, performed by 52 different individuals in 18 different kitchens. The dataset is to-date one of the largest fully annotated datasets available. One of the main motivations for the proposed recording setup "in the wild" as opposed to a single controlled lab environment is for the dataset to more closely reflect real-world conditions as it pertains to the monitoring and analysis of daily activities.

## Dataset Specifications

- **Participants**: 52 different individuals
- **Locations**: 18 different kitchens
- **Cameras**: 3-5 cameras per location (uncalibrated, varying positions)
- **Total recording**: ~77 hours of video (>4 million frames)
- **Camera types**: Webcams, industry cameras (Prosilica GE680C), stereo camera (BumbleBee)
- **Resolution**: 320×240 pixels (down-sampled)
- **Frame rate**: 15 fps
- **Data augmentation**: Videos mirrored from laterally-positioned cameras

## Action Categories

The dataset includes 10 breakfast preparation activities:

1. **Coffee** (n=200)
2. **Orange juice** (n=187)
3. **Chocolate milk** (n=224)
4. **Tea** (n=223)
5. **Bowl of cereals** (n=214)
6. **Fried eggs** (n=198)
7. **Pancakes** (n=173)
8. **Fruit salad** (n=185)
9. **Sandwich** (n=197)
10. **Scrambled eggs** (n=188)

## Downloads

### Videos
- **Main file**: BreakfastII_15fps_qvga_sync.tar.gz (3.6 GB)
- **Multipart files**: Available in 6 parts for easier downloading

### Pre-computed Features
- **Dense trajectories**: dense_traj_all.rar (~220GB) or split into 4 parts
- **Frame-based features**: breakfast_data.tar.gz (~1GB) - reduced FV (64 dim)
- **I3D features**: bf_kinetics_feat.tar.gz (27.7 GB) - RGB and flow (2048 dim)

### Segmentation Data
- **Coarse segmentation**: segmentation_coarse.tar.gz
- **Fine segmentation**: segmentation_fine.tar.gz

### Train/Test Splits
- **s1**: P03 – P15
- **s2**: P16 – P28
- **s3**: P29 – P41
- **s4**: P42 – P54

## Citation

Please cite the following papers when using this dataset:

**Primary paper:**
```
H. Kuehne, A. B. Arslan and T. Serre. The Language of Actions: Recovering the Syntax and Semantics of Goal-Directed Human Activities. CVPR, 2014.
```

**Follow-up work:**
```
H. Kuehne, J. Gall and T. Serre. An end-to-end generative framework for video segmentation and recognition. WACV, 2016.
```

## Current Benchmarks

### Fully Supervised Learning
- **Activity Classification**: Classify full videos according to the 10 activity classes
- **Temporal Segmentation**: Detect and classify the 48 action units within videos

### Weakly Supervised Learning
- **Temporal Alignment**: Detect actions given transcripts at test time
- **Temporal Segmentation**: Detect and classify 48 action units without transcripts

## Code and Resources

- **Current system**: Available on [GitHub](https://github.com/hildekuehne/HTK_actionRecognition)
- **MATLAB demo**: Previous demo bundle available for action recognition

## License

This dataset is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Contact

For questions about the dataset and benchmarks, please contact Hilde Kuehne (kuehne [@] ibm . com).

## Acknowledgments

This work was supported by ONR grant (N000141110743) and NSF early career award (IIS-1252951) to TS. Additional support was provided by the Robert J. and Nancy D. Carney Fund for Scientific Innovation and the Center for Computation and Visualization (CCV). HK was funded by the Quaero Programme and OSEO, the French State agency for innovation.
