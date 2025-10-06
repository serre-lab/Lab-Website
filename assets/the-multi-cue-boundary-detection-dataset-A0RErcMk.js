const e=`# Multi-Cue Boundary Detection Dataset

A dataset of stereo video sequences for studying the interaction of multiple early visual cues (luminance, color, stereo, motion) during boundary detection in natural scenes.

## Overview

This dataset was created to study how different visual cues interact during boundary detection in challenging natural scenes. It consists of short binocular video sequences captured using a consumer-grade Fujifilm stereo camera, featuring diverse locations and seasonal conditions to minimize biases.

## Dataset Specifications

- **Scenes**: 100 natural scenes
- **Format**: Binocular video sequences (left and right views)
- **Sequence length**: 10 frames per scene
- **Frame rate**: 30 fps
- **Resolution**: 1280 × 720 pixels
- **Locations**: University campuses, street scenes, and parks
- **Conditions**: Multiple seasons and appearances

## Visual Cues Included

The dataset enables study of four early visual cues:

- **Luminance** (brightness/intensity)
- **Color** (chromatic information)
- **Stereo** (depth from binocular disparity)
- **Motion** (temporal changes across frames)

## Ground Truth Annotations

Two sets of hand-annotations were collected for the last video frame of the left image for every scene:

- **Object boundaries**: Contours defining visible surface regions
- **Lower-level edges**: Detailed edge annotations

Annotations were performed by undergraduate students at Brown University using custom Java software. Annotators followed Martin, Fowlkes, and Malik (2004) guidelines to segment images into 2-30 regions of approximately equal importance.

[![Representative frames](/images/resources/multicue/dataset_lowfi-907x1024.png)](/images/resources/multicue/dataset_lowfi.png)
*Representative frames from the dataset with boundary annotations averaged across subjects. Darker lines indicate higher human agreement. Annotated contours are dilated for display purposes.*

## Downloads

- **Dataset**: [multicue-dataset.tar.bz2](https://drive.google.com/uc?export=download&id=1OugiFy_f20hnIwaao9d05o-3buGYLsNo) (~3.4 GB)

## Citation

Please cite the following paper when using this dataset:

Mély, D.A., Kim, J., McGill, M., Guo, Y., & Serre, T. (2016). A systematic comparison between visual cues for boundary detection. *Vision Research*, 120, 93-107.

[PubMed](http://www.ncbi.nlm.nih.gov/pubmed/26748113)

## License

This dataset is licensed under a [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/).`;export{e as default};
