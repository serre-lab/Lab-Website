const e=`# The Breakfast Actions Dataset

A comprehensive dataset of breakfast preparation activities performed by 52 different individuals in 18 different kitchens, designed to reflect real-world recognition scenarios.

## Overview

This dataset comprises 10 actions related to breakfast preparation, performed by 52 different individuals in 18 different kitchens. The dataset is to-date one of the largest fully annotated datasets available, designed to reflect real-world conditions for monitoring and analysis of daily activities.

## Dataset Specifications

- **Participants**: 52 different individuals
- **Locations**: 18 different kitchens  
- **Total recording**: ~77 hours of video (>4 million frames)
- **Resolution**: 320×240 pixels (down-sampled)
- **Frame rate**: 15 fps
- **Camera setup**: 3-5 uncalibrated cameras per location

## Action Categories

The dataset includes 10 breakfast preparation activities:

- Coffee (n=200)
- Orange juice (n=187) 
- Chocolate milk (n=224)
- Tea (n=223)
- Bowl of cereals (n=214)
- Fried eggs (n=198)
- Pancakes (n=173)
- Fruit salad (n=185)
- Sandwich (n=197)
- Scrambled eggs (n=188)

## Downloads

### Videos
> **Note**: Video files are currently being migrated to new hosting. Please contact the lab for access.

### Pre-computed Features
- **Dense trajectories**: Available as split files for easier downloading:
  - [dense_traj_all_s1.tar.gz](https://www.dropbox.com/s/mfz8pe7jerlj54g/dense_traj_all_s1.tar.gz?dl=1) (~37GB)
  - [dense_traj_all_s2.tar.gz](https://www.dropbox.com/s/l25u0jbmi62jwjp/dense_traj_all_s2.tar.gz?dl=1) (~57GB)
  - [dense_traj_all_s3.tar.gz](https://www.dropbox.com/s/0j7enp6cjq2r8jd/dense_traj_all_s3.tar.gz?dl=1) (~42GB)
  - [dense_traj_all_s4.tar.gz](https://www.dropbox.com/s/0ynhovye29ygha7/dense_traj_all_s4.tar.gz?dl=1) (~75GB)

> **Note**: Frame-based features, I3D features, and segmentation data are currently being migrated to new hosting. Please contact the lab for access.

### Code and Documentation
- **MATLAB demo**: [demo_bundle.rar](/datasets/breakfast/demo_bundle.rar) - *Available locally*

### Train/Test Splits
The dataset includes predefined splits for evaluation:
- **s1**: P03 – P15
- **s2**: P16 – P28  
- **s3**: P29 – P41
- **s4**: P42 – P54

> **Note**: Large files are hosted externally on Dropbox or other services. Please contact the lab for access to external files.

## Citation

Please cite the following papers when using this dataset:

**Primary paper:**
H. Kuehne, A. B. Arslan and T. Serre. The Language of Actions: Recovering the Syntax and Semantics of Goal-Directed Human Activities. *CVPR*, 2014.

**Follow-up work:**
H. Kuehne, J. Gall and T. Serre. An end-to-end generative framework for video segmentation and recognition. *WACV*, 2016.

## Current Benchmarks

### Fully Supervised Learning
- **Activity Classification**: Classify full videos according to the 10 activity classes
- **Temporal Segmentation**: Detect and classify the 48 action units within videos

### Weakly Supervised Learning  
- **Temporal Alignment**: Detect actions given transcripts at test time
- **Temporal Segmentation**: Detect and classify 48 action units without transcripts

## Code and Resources

- **Current system**: Available on [GitHub](https://github.com/hildekuehne/HTK_actionRecognition)
- **MATLAB demo**: [Previous demo bundle](/datasets/breakfast/demo_bundle.rar) available for action recognition

## License

This dataset is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).

## Contact

For questions about the dataset and benchmarks, please contact Hilde Kuehne (kuehne [@] ibm . com).

`;export{e as default};
