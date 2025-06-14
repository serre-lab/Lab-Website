const e=`[< back to Resources](https://serre-lab.clps.brown.edu/resources/)

# HMDB: a large human motion database

- [Evaluation](#evaluation)
- [Download](#download)
- [Illustration of the 51 Actions](#illustration-of-the-51-actions)
- [Introduction](#introduction)
- [Citation](#citation)
- [Dataset](#dataset-meta-labels-statistics-and-stabilization)
- [Other action recognition benchmark](#other-action-recognition-benchmark)
- [About the page](#about-the-page)

## Evaluation

Current benchmarks provided by [actionrecognition.net](http://actionrecognition.net):

*(See the [evaluation page](http://actionrecognition.net/files/embedEval.php?emid=5;&eid=21) for up-to-date results.)*

## Download

### Video Database

- [HMDB51](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_org.rar) – About 2GB for a total of 7,000 clips distributed in 51 action classes.
- [Stabilized HMDB51](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_sta.rar) – Same number of clips and classes as HMDB51, with a mask in \`[video_name].form\` for each clip (readable in Matlab).
- [README](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/stabilized_readme.txt)
- [Bounding boxes (INRIA)](http://lear.inrialpes.fr/people/wang/improved_trajectories)

### HOG/HOF (STIP) features

- [STIP features for the HMDB51](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_org_stips.rar) (~3.5GB)
- [STIP features for the stabilized HMDB51](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/hmdb51_sta_stips.rar) (~2.9GB)
- [STIP binaries](http://www.irisa.fr/vista/Equipe/People/Laptev/download.html)

### Three splits

- [Three splits for the HMDB51](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/test_train_splits.rar)
- [README](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/split_readme.txt)

[![Creative Commons License](https://i.creativecommons.org/l/by/4.0/88x31.png)](http://creativecommons.org/licenses/by/4.0/)  
HMDB by [H. Kuehne, H. Jhuang, E. Garrote, T. Poggio, T. Serre](http://serre-lab.clps.brown.edu/resource/hmdb-a-large-human-motion-database/) is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).  
Based on a work at [serre-lab.clps.brown.edu](http://serre-lab.clps.brown.edu/resource/hmdb-a-large-human-motion-database/).

### Code

C2 benchmark: [https://github.com/hueihan/Action_Recognition](https://github.com/hueihan/Action_Recognition)

## Illustration of the 51 Actions

| ![HMDB_snapshot1](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/HMDB_snapshot1-300x225.png) | ![HMDB_snapshot2](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/HMDB_snapshot2-300x225.png) |
|:--:|:--:|

## Introduction

With nearly one billion online videos viewed everyday, an emerging new frontier in computer vision research is recognition and search in video. While much effort has been devoted to the collection and annotation of large scalable static image datasets containing thousands of image categories, human action datasets lack far behind. Here we introduce HMDB collected from various sources, mostly from movies, and a small proportion from public databases such as the Prelinger archive, YouTube and Google videos. The dataset contains 6849 clips divided into 51 action categories, each containing a minimum of 101 clips. The actions categories can be grouped in five types:

1. General facial actions: smile, laugh, chew, talk.
2. Facial actions with object manipulation: smoke, eat, drink.
3. General body movements: cartwheel, clap hands, climb, climb stairs, dive, fall on the floor, backhand flip, handstand, jump, pull up, push up, run, sit down, sit up, somersault, stand up, turn, walk, wave.
4. Body movements with object interaction: brush hair, catch, draw sword, dribble, golf, hit something, kick ball, pick, pour, push something, ride bike, ride horse, shoot ball, shoot bow, shoot gun, swing baseball bat, sword exercise, throw.
5. Body movements for human interaction: fencing, hug, kick someone, kiss, punch, shake hands, sword fight.

## Citation

If you use HMDB, please cite:

> H. Kuehne, H. Jhuang, E. Garrote, T. Poggio, and T. Serre. HMDB: A Large Video Database for Human Motion Recognition. ICCV, 2011. [PDF](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/Kuehne_etal_iccv11.pdf) [Bibtex](http://serre-lab.clps.brown.edu/wp-content/uploads/2013/10/Kuehne_etal_iccv11.bib)

For STIP features:

> I. Laptev, M. Marszalek, C. Schmid, and B. Rozenfeld. Learning Realistic Human Actions From Movies. CVPR, 2008. [PDF](http://www.irisa.fr/vista/Papers/2008_cvpr_laptev.pdf)

For C2 features:

> H. Jhuang, T. Serre, L. Wolf, and T. Poggio. A Biologically Inspired System for Action Recognition. ICCV, 2007. [PDF](http://ps.is.tue.mpg.de/publications/46/get_file)

## Dataset, meta labels, statistics and stabilization

### Meta labels

Each clip is annotated with an action label and meta-labels describing properties such as:

- **Visible body parts:** head (h), upper body (u), full body (f), lower body (l)
- **Camera motion:** motion (cm), static (nm)
- **Camera viewpoint:** front (fr), back (ba), left (le), right (ri)
- **Number of people:** single (np1), two (np2), three (np3)
- **Video quality:** good (goo), medium (med), ok (bad)

### Statistics

| ![ActionCategories](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/ActionCategories-187x300.jpg) | ![BodyPart](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/BodyPart-187x300.jpg) | ![CameraMotion](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/CameraMotion-187x300.jpg) | ![CameraPosition1](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/CameraPosition1-187x300.jpg) |
|:--:|:--:|:--:|:--:|

| ![ClipQuality](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/ClipQuality-187x300.jpg) | ![Duration](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/Duration-187x300.jpg) | ![Duration_count](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/Duration_count-187x300.jpg) |
|:--:|:--:|:--:|

### Video Stabilization

To remove camera motion, standard image stitching techniques were used to align frames of a clip. These techniques estimate a background plane by detecting and matching salient features in adjacent frames, using a distance measure that includes both absolute pixel differences and the Euclidean distance of detected points. RANSAC is used to estimate the geometric transformation between frames, and frames are warped and combined to achieve a stabilized clip.

| Original imgs | Stabilized imgs |
|:--:|:--:|
| ![00001](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00001-300x225.jpg) | ![00002](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00002-300x154.jpg) |
| ![00020](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00020-300x225.jpg) | ![00021](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00021-300x154.jpg) |
| ![00050](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00050-300x225.jpg) | ![00051](http://serre-lab.clps.brown.edu/wp-content/uploads/2012/08/00051-300x154.jpg) |

## Other action recognition benchmark

- **KTH Dataset**: [KTH Dataset](http://www.nada.kth.se/cvap/actions/) – 6 actions, 100 clips per action.
- **Weizmann Dataset**: [Weizmann Dataset](http://www.wisdom.weizmann.ac.il/~vision/SpaceTimeActions.html) – 10 actions, 9 clips per action.
- **Hollywood Human Actions Set**: [Hollywood](http://www.irisa.fr/vista/actions/) – 8 actions, 60–140 clips per class.
- **Hollywood2 Human Actions Set**: [Hollywood2](http://pascal.inrialpes.fr/hollywood2) – 12 actions, 61–278 clips per class.
- **UCF group datasets**: [UCF group](http://server.cs.ucf.edu/~vision/data.html) – UCF Sports, UCF YouTube, UCF50, etc.

| Dataset      | Year | # Actions | # Clips per Action |
|--------------|------|-----------|--------------------|
| KTH          | 2004 | 6         | 10                 |
| Weizmann     | 2005 | 9         | 9                  |
| IXMAS        | 2006 | 11        | 33                 |
| Hollywood    | 2008 | 8         | 30–140             |
| UCF Sports   | 2009 | 9         | 14–35              |
| Hollywood2   | 2009 | 12        | 61–278             |
| UCF YouTube  | 2009 | 11        | 100                |
| MSR          | 2009 | 3         | 14–25              |
| Olympic      | 2010 | 16        | 50                 |
| UCF50        | 2010 | 50        | min. 100           |
| HMDB51       | 2011 | 51        | min. 101           |

## About the page

**Contact:**  
For questions about the datasets and benchmarks, please contact Hueihan Jhuang (hueihan.jhuang [at] tuebingen.mpg.de).

**Log:**
- 19/11/2013 update the evaluation page with more benchmarks
- 22/04/2013 update the evaluation page with more benchmarks
- 12/03/2012 second version of the web page, update the evaluation with more benchmarks
- 10/25/2011 add readme for the stabilized videos
- 09/24/2011 add readme for the three splits and reference to HOG/HOF
- 09/01/2011 upload images for statistics, clip, three splits, HOG/HOF features
- 07/29/2011 first version of the web page`;export{e as default};
